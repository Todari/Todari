import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell, Callout, Code, H2, P } from "../shell";

const title = "스냅샷 약 4,800만 행에서 게시물별 최신 지표 읽기";

export const metadata: Metadata = {
  title,
  description:
    "게시물 12개의 누적 지표를 읽기 위해 스냅샷 5,845행을 정렬하던 쿼리를 MAX(periodEnd)와 유니크 키 조인으로 바꾼 과정입니다.",
};

export default function Page() {
  return (
    <ArticleShell
      label="MYSQL · FORCLETTER"
      title={title}
      date="2026.10"
      intro="포크레터 게시물 목록에는 게시물마다 최신 누적 지표 한 건이 필요했습니다. 그런데 한 페이지의 게시물 12개를 가져올 때 지표 테이블에서 과거 스냅샷 5,845행을 읽어 정렬했습니다. 접속이 몰린 날에는 DB 연결 대기열이 넘쳐 웹훅 처리와 지표 저장까지 실패했습니다."
      sourceNote="근거는 포크레터 내부 저장소의 8월 테이블 감사(84588cab3), 9월 지원자 조회 개선(d5e278cc7), 10월 1일 목록 쿼리 변경(824e56cd3)입니다. 조회 수치는 당시 기록이며 현재 운영 DB의 응답 시간은 별도 측정이 필요합니다."
    >
      <Callout>
        2026년 8월 테이블 감사에는 미디어 지표 스냅샷이 약 4,800만 행, 인덱스 15.9GB를 포함해 총 30.6GB로 기록돼 있습니다.
        행 수는 당시 기록에 집계 방법이 남아 있지 않아 대략적인 규모로 표기했습니다.
      </Callout>

      <H2>한 번의 조회가 게시물 12개의 이력을 모두 읽었다</H2>
      <P>
        게시물마다 최신 지표를 한 번씩 조회하던 N+1을 줄이려고 게시물 ID를 모아 한 쿼리로 조회했습니다.
        이 쿼리는 해당 ID의 누적 스냅샷을 전부 시간 역순으로 정렬했고, 애플리케이션은 게시물별 첫 행만 취했습니다.
        쿼리 수는 줄었지만 목록에 필요한 지표 수와 DB가 반환하는 행 수가 따로 움직였습니다.
      </P>
      <P>
        9월에는 광고주 지원자 목록의 지표 집계가 쿼리 시간 제한에 걸려 목록 전체가 실패했습니다.
        최근 30일 내 게시물 중 계정당 20개로 집계 대상을 제한하고, 지표 조회가 실패해도 지원자 목록을 반환하도록 바꿨습니다.
        여기서 도입한 최신 행 조회를 10월에 일반 게시물 목록에도 적용했습니다.
      </P>

      <H2>최신 시각을 먼저 찾고 필요한 행만 조인</H2>
      <P>
        게시물별로 <code>MAX(periodEnd)</code>를 계산한 뒤 해당 시각의 누적 행에서 <code>reach</code>와 <code>likes</code>를 읽습니다.
        아래는 목록 조회에서 필요한 컬럼만 남긴 예입니다.
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
        10월 1일 변경 기록의 한 사례에서 기존 쿼리는 5,845행을 읽고 <code>filesort</code>로 정렬했습니다. 변경 후에는 인덱스 항목 115개와 테이블 행 12개를 읽었습니다.
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
