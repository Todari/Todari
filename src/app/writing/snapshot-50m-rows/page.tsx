import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell, Callout, Code, H2, P } from "../shell";

const title = "게시물 지표를 JSON에 담았다가 숫자 컬럼으로 옮긴 이유";

export const metadata: Metadata = {
  title,
  alternates: { canonical: "/writing/snapshot-50m-rows" },
  description:
    "포크레터에서 지표를 JSON에 저장한 첫 설계, 기존 응답을 유지한 컬럼 이관, 게시물별 최신 행을 찾는 조회 개선을 설명합니다.",
};

export default function Page() {
  return (
    <ArticleShell
      label="MYSQL · FORCLETTER"
      title={title}
      date="2025.12–2026.10"
      intro="포크레터에서 게시물 성과를 처음 저장할 때는 도달, 좋아요, 릴스 재생 같은 지표를 스냅샷 한 행의 JSON에 담았습니다. 몇 달 뒤에는 같은 지표를 숫자 컬럼으로 옮기면서 기존 응답 형태를 유지했습니다. 테이블이 약 4,800만 행으로 커진 뒤에는 게시물 목록이 읽는 이력의 범위도 줄였습니다."
    >
      <H2>지표 세트가 달라도 스냅샷 한 행으로</H2>
      <P>
        처음에는 세 가지 저장 방식을 검토했습니다. 지표마다 별도 행을 두면 지표별로 인덱스를 걸 수 있지만, 스냅샷을 찍을 때마다 지표 수만큼 행이 생기고 화면용 값을 다시 모아야 합니다.
        숫자 컬럼을 미리 두면 SQL에서 집계하기 쉽지만, 콘텐츠 유형에 따라 빈 컬럼이 생기고 지표를 추가할 때마다 스키마를 바꿔야 합니다.
        JSON에 묶으면 한 행에서 전체 지표를 읽고 새 지표도 담을 수 있지만, 특정 지표만 읽거나 인덱싱하기는 어렵습니다.
      </P>
      <P>
        당시 화면은 게시물 지표 전체를 함께 읽었고, 피드·릴스·스토리에 따라 Meta가 제공하는 지표가 달랐습니다.
        그래서 게시물·날짜·집계 유형별 한 행에 JSON을 저장했습니다. 이후에는 하루 중 변화도 보여주기 위해 날짜 대신 스냅샷의 구간 종료 시각인 <code>periodEnd</code>를 키에 넣었습니다.
      </P>

      <H2>저장 형태를 바꾸고 기존 지표 객체를 유지</H2>
      <P>
        2026년 2월에는 SQL에서 도달이나 좋아요를 바로 읽고 집계할 수 있도록, 이름과 타입이 정해진 지표를 <code>reach</code>, <code>likes</code>, <code>videoViews</code> 같은 숫자 컬럼으로 옮겼습니다.
        국가나 연령대별 팔로워 수처럼 키가 달라지는 통계는 항목별 행으로 옮겼습니다.
      </P>
      <P>
        기존 목록과 상세 화면은 그대로 <code>metrics</code> 객체를 받을 수 있도록 엔티티의 접근자에서 컬럼을 다시 묶었습니다.
        <code>videoViews</code>는 응답에서 기존 키인 <code>video_views</code>로 돌아갑니다.
        수집한 값이 0이면 응답에 0을 남기고, 수집값이 비어 <code>NULL</code>이면 해당 키를 생략합니다.
      </P>
      <P>
        과거 행은 JSON에서 숫자 값을 추출해 새 컬럼이 <code>NULL</code>인 곳만 채웠습니다. <code>COALESCE</code>로 새 수집 경로가 이미 기록한 0도 보존했습니다.
        백필 SQL에는 대표 지표가 여전히 모두 비어 있는 행을 세는 점검 쿼리를 넣었습니다.
        옛 JSON 컬럼을 지우는 SQL은 3월에 별도로 추가하고, 큰 테이블을 변경할 때는 트래픽이 적은 시간에 실행하도록 기록했습니다.
      </P>

      <H2>최신 지표 한 건을 찾으려고 과거 이력을 읽었다</H2>
      <Callout>
        2026년 8월 테이블 감사에는 미디어 지표 스냅샷이 약 4,800만 행, 인덱스 15.9GB를 포함해 총 30.6GB로 기록돼 있습니다.
        행 수는 당시 기록에 집계 방법이 남아 있지 않아 대략적인 규모로 표기했습니다.
      </Callout>
      <P>
        목록은 게시물마다 최신 누적 지표 한 건을 보여줍니다. 게시물별로 쿼리를 한 번씩 보내던 방식을 한 쿼리로 합쳤지만,
        그 쿼리는 각 게시물의 누적 스냅샷을 전부 시간 역순으로 정렬했고 애플리케이션은 첫 행만 썼습니다.
        접속이 몰린 날에는 DB 연결 대기열이 넘쳐 웹훅 처리와 지표 저장도 실패했습니다.
      </P>
      <P>
        9월에는 광고주 지원자 목록에서 계정당 최근 30일 게시물 20개로 집계 대상을 제한하고,
        최신 누적 행의 <code>reach</code>와 <code>likes</code>만 읽었습니다. 지표 조회가 실패해도 지원자 목록은 반환하도록 했습니다.
        여기서 먼저 쓴 최신 행 조회를 10월에 일반 게시물 목록에도 적용했습니다.
      </P>

      <H2>최신 시각을 먼저 찾고 필요한 행만 조인</H2>
      <P>
        게시물별로 <code>MAX(periodEnd)</code>를 계산한 뒤 해당 시각의 누적 행을 조인합니다.
        일반 게시물 목록의 실제 코드는 스냅샷 엔티티를 읽고 <code>metrics</code> 접근자로 응답을 만듭니다.
        아래는 조인 방식을 보여주기 위해 조회 컬럼을 <code>reach</code>와 <code>likes</code>로 좁힌 SQL입니다.
      </P>
      <Code>{`SELECT s.mediaId, s.reach, s.likes
FROM instagram_media_metric_snapshot AS s
JOIN (
  SELECT mediaId, MAX(periodEnd) AS maxEnd
  FROM instagram_media_metric_snapshot
  WHERE mediaId IN (?, ?) AND period = 'lifetime'
  GROUP BY mediaId
) AS latest
  ON s.mediaId = latest.mediaId AND s.periodEnd = latest.maxEnd
WHERE s.period = 'lifetime';`}</Code>
      <P>
        집계에 쓰는 <code>(mediaId, period, periodEnd)</code> 인덱스는 게시물과 지표 종류가 정해진 범위 안에서 시각을 찾습니다.
        MAX 계산에 필요한 세 컬럼이 모두 인덱스에 있고, 도달과 좋아요 같은 본문 컬럼은 유니크 키 <code>(mediaId, periodEnd, period)</code>로 찾은 행에서 읽습니다.
        집계 쪽에서 실제로 건너뛰는 인덱스 구간은 실행계획으로 확인해야 합니다.{" "}
        <a className="underline underline-offset-4" href="https://dev.mysql.com/doc/refman/8.4/en/group-by-optimization.html">MySQL GROUP BY 최적화 문서</a>
      </P>
      <P>
        10월 1일 실행계획 기록에서 게시물 12개의 기존 쿼리는 5,845행을 읽고 <code>filesort</code>로 정렬했습니다. 변경 후에는 인덱스 항목 115개와 테이블 행 12개를 읽었습니다.
        응답의 스냅샷 행 수는 게시물 12개에서 최대 12개입니다. 이 상한은 조인 키의 유일성으로 보장되고, 실제 읽는 인덱스 항목 수는 대상 게시물과 실행계획에 따라 달라집니다.
      </P>

      <H2>같은 시각의 일별 행이 섞이지 않는지 확인</H2>
      <P>
        수집기는 같은 <code>(mediaId, periodEnd, period)</code>가 들어오면 기존 버킷을 갱신합니다.
        따라서 시각이 있는 누적 행은 그 조합당 하나입니다. 일별 행은 같은 시각에 존재할 수 있으므로 집계와 바깥 조인 양쪽에서 <code>lifetime</code> 조건이 필요합니다.
      </P>
      <Code>{`WITH snapshots AS (
  SELECT 'A' AS mediaId, 1 AS periodEnd, 'lifetime' AS period, 120 AS reach
  UNION ALL SELECT 'A', 2, 'lifetime', 100
  UNION ALL SELECT 'A', 2, 'day', 9
  UNION ALL SELECT 'B', 1, 'lifetime', 80
  UNION ALL SELECT 'B', 2, 'day', 11
), latest AS (
  SELECT mediaId, MAX(periodEnd) AS maxEnd
  FROM snapshots WHERE period = 'lifetime' GROUP BY mediaId
)
SELECT s.mediaId, s.reach
FROM snapshots AS s
JOIN latest ON s.mediaId = latest.mediaId AND s.periodEnd = latest.maxEnd
WHERE s.period = 'lifetime'
ORDER BY s.mediaId;
-- 결과: A | 100, B | 80`}</Code>
      <P>
        가상 데이터에서 A의 최신 누적 도달은 100입니다. 바깥 필터를 빼면 A의 같은 시각 일별 값 9도 반환됩니다.
        집계 안쪽 필터를 빼면 B에서 더 최근인 일별 시각이 선택돼 B의 누적 값 80이 누락됩니다.
        컨트롤러 회귀 테스트도 목록 조회가 전체 이력을 가져오는 경로로 돌아가지 않도록 <code>MAX(periodEnd)</code>와 게시물별 <code>GROUP BY</code> 호출을 검사합니다.
      </P>

      <H2>조회에 필요한 인덱스와 보존에 필요한 행</H2>
      <P>
        10월에는 기존 보조 인덱스 <code>(mediaId, periodEnd)</code>를 제거했습니다. 두 컬럼이 유니크 키 <code>(mediaId, periodEnd, period)</code>의 선두에 같은 순서로 있어 두 컬럼만 조건에 쓰는 조회도 그 키를 쓸 수 있었습니다.
        최신 누적값을 찾는 인덱스는 <code>period</code>를 먼저 고정할 수 있도록 순서를 유지했습니다.
      </P>
      <P>
        오래된 스냅샷을 3시간 간격으로 줄이는 안도 검토했습니다. 10월 재조사에서 당시 수집기가 게시 후 3~14일에는 이미 3시간, 14일 이후에는 하루 간격으로 저장하는 것을 확인했습니다.
        의미 있게 행을 줄이려면 초반 차트 해상도를 낮춰야 해 삭제를 보류했습니다. 목록에서 읽는 행을 줄이는 변경은 이력을 유지한 채 적용할 수 있었습니다.
      </P>
      <P>
        <Link href="/work/forcletter" className="underline underline-offset-4">포크레터 사례</Link>
      </P>
    </ArticleShell>
  );
}
