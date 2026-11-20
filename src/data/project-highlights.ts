import type { Service } from "./services";
import { workExperiences, type DesignReasoning } from "./work-experiences";

type ProjectHighlight = DesignReasoning & {
  featuredId?: string;
  decision: string;
  proof: string;
};

const projectHighlights: Record<Service["id"], ProjectHighlight> = {
  forcletter: {
    featuredId: "dm-recovery",
    decision: "나흘간 약 620회의 거절이 기록됐습니다. 이미 안내를 받았을 수 있는 팔로워는 자동 재발송에서 제외했습니다.",
    proof: "차단이 풀려도 새 댓글까지 다시 막히지 않도록 밀린 답장의 복구 한도를 5분당 50건에서 5건으로 낮췄습니다.",
    principle: "재시도의 멱등성과 불확실한 발송 결과",
    tradeoff: "DM을 보낸 직후 서버가 멈추면 발송 여부를 알기 어렵습니다. 거절이 확인된 건만 복구하고 결과를 알 수 없는 건은 운영자 확인에 맡겨 중복 안내를 피했습니다.",
    reference: { label: "AWS Builders’ Library · 재시도와 멱등성", href: "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/" },
  },
  jeongpyo: {
    featuredId: "payment-reconciliation",
    decision: "승인 응답이 끊겨도 결제 여부를 다시 확인할 수 있게, 결제대행사에 요청하기 전에 복구 원장을 남겼습니다.",
    proof: "샌드박스 복구 로직은 주문번호·금액을 대조해 거래에 반영된 결제를 보호합니다. 취소 직후 저장이 실패해도 두 번 취소하지 않는지 모의 테스트로 확인했습니다.",
    principle: "보상 트랜잭션과 결제 대사",
    tradeoff: "결제대행사의 승인과 내부 거래 저장은 한 트랜잭션에 묶을 수 없어, 두 상태를 대조해 거래에 반영되지 않은 승인만 취소했습니다. 자동 복구는 샌드박스에 적용했고, 대조가 끝나지 않은 건은 운영 확인 대상으로 남겼습니다.",
    reference: { label: "Azure Architecture Center · 보상 트랜잭션", href: "https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction" },
  },
  geo: {
    decision: "답변별 멘션을 ID 배열로 읽고, 같은 ID의 객체는 Node에서 한 번만 만들어 공유했습니다.",
    proof: "한 브랜드의 30일치 약 75만 건에서 메모리 1.97→0.59GB를 관측했고, 운영 DB 집계 수치는 일치했습니다.",
    principle: "사전 인코딩과 객체 공유",
    tradeoff: "집계 코드가 멘션을 읽기만 해서 여러 답변이 한 객체를 공유할 수 있었습니다. DB에서 고유 값을 구하고 ID를 연결하는 쿼리를 추가하는 비용을 감수해 Node의 반복 할당을 줄였습니다.",
    reference: { label: "Apache Arrow 명세 · 사전 인코딩", href: "https://arrow.apache.org/docs/format/Columnar.html#dictionary-encoded-layout" },
  },
  dakbal: {
    decision: "같은 지점의 조회를 합쳐 60초간 재사용하고, 배치가 쓸 호출 예산을 시작 전에 확보했습니다.",
    proof: "모의 외부 조회 테스트 4개에서 초과 배치의 조회 0회와 조회 실패 뒤 예산 차감 유지를 확인했습니다.",
    principle: "동시 요청 병합과 호출 한도",
    tradeoff: "허용량을 넘긴 배치는 시작 전에 거절하고, 실패한 조회도 외부 API를 호출했으므로 예산에 포함했습니다. 이 한도는 프로세스마다 따로 계산됩니다.",
    reference: { label: "Go singleflight 문서 · 동시 요청 병합", href: "https://pkg.go.dev/golang.org/x/sync/singleflight#Group.Do" },
  },
  haengdong: {
    decision: "청구 생성·수정에서 행사 멤버와 중복 여부를 저장과 같은 트랜잭션에서 먼저 검사했습니다.",
    proof: "합계가 맞아도 타 행사·중복 멤버는 저장과 삭제를 막았고, 병합 PR에서 서버 테스트 46개가 통과했습니다.",
    principle: "도메인 불변식과 저장의 원자성",
    tradeoff: "멤버의 행사 소속은 서버에서 한 번 더 조회해야 알 수 있습니다. 검사를 쓰기 트랜잭션에 포함해 잘못된 요청이면 기존 청구 상세를 지우기 전에 중단했습니다.",
    reference: { label: "PostgreSQL 문서 · 트랜잭션의 원자성", href: "https://www.postgresql.org/docs/current/tutorial-transactions.html" },
  },
  metronomdeul: {
    decision: "재생을 누른 기기의 첫 박을 서버 시각으로 환산하고, 허용 범위 안에서 공통 기준으로 삼았습니다.",
    proof: "120 BPM 가상 시계에서 박의 누락·중복 없이 서버 박자와 2ms 이내로 맞는지 확인했습니다.",
    principle: "시계 동기화와 오디오 선행 예약",
    tradeoff: "네트워크 도착 시각의 편차를 피하려고 첫 박은 서버 시각으로 맞추고, 소리는 각 기기의 오디오 시계에 미리 예약했습니다. 테스트는 예약 시각을 비교했고 실제 기기의 오디오 출력 지연은 측정 범위 밖이었습니다.",
    reference: { label: "W3C Web Audio 명세 · 오디오 재생 시각", href: "https://www.w3.org/TR/webaudio-1.0/#dom-audioscheduledsourcenode-start" },
  },
  "pin-to-gather": {
    decision: "여행 기간 변경과 범위 밖 핀 해제를 같은 트랜잭션으로 묶고, 재연결 시 보드와 핀을 다시 읽었습니다.",
    proof: "지도 SDK를 대체한 Playwright 테스트는 재연결 뒤 누락된 변경과 화면 간 진행률 동기화를 확인합니다.",
    principle: "재연결 후 서버 상태로 동기화",
    tradeoff: "여행 계획 화면을 복구하는 데는 서버의 최신 일정과 핀 상태면 충분했습니다. 재연결 때 보드와 핀을 각각 다시 조회해 끊긴 동안의 변경을 반영했습니다.",
    reference: { label: "TanStack Query 문서 · 캐시 무효화와 재조회", href: "https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation" },
  },
  "react-pixel-ui": {
    featuredId: "compressed-pixel-output",
    decision: "픽셀 이미지에 많은 반복 무늬를 압축하고, 압축하면 오히려 커지는 입력은 원본 블록으로 저장했습니다. 사용하지 않는 이미지는 생성하지 않습니다.",
    proof: "150×100 단색 테스트에서 PNG 데이터 URL은 원시 픽셀 크기의 1/20 미만이었습니다. 무작위 픽셀은 표준 디코더로 풀어 색과 투명도가 정확히 복원되는지 확인했습니다.",
    principle: "무손실 압축과 비압축 블록",
    tradeoff: "반복이 적은 픽셀에서는 압축한 데이터가 더 커질 수 있습니다. 먼저 압축하는 연산을 감수하고, 압축 블록과 비압축 블록의 크기를 비교해 더 작은 쪽을 골랐습니다.",
    reference: { label: "RFC 1951 · DEFLATE 비압축 블록", href: "https://www.rfc-editor.org/rfc/rfc1951.html#section-3.2.4" },
  },
  "trade-tower": {
    decision: "모의투자 원장에 주문번호가 한 번만 나오고 증권사도 체결을 기록한 거래를 증권사 체결값으로 정정했습니다.",
    proof: "모의투자 4거래일의 체결 43건을 대조해 가격 차이 16건, 부분 체결로 인한 수량 차이 4건을 확인했습니다.",
    principle: "주문과 체결의 구분, 원장 대사",
    tradeoff: "부분 체결의 평균 가격과 수량은 주문 조건만으로 알 수 없어 증권사 체결 내역을 기준으로 삼았습니다. 양쪽의 체결 상태가 다르거나 내부 원장에 주문번호가 중복된 거래는 기록에 남겨 자동 정정 범위를 제한했습니다.",
    reference: { label: "FIX 표준 · 주문 상태와 누적 체결량", href: "https://www.fixtrading.org/wp-content/uploads/download-manager-files/Order-State-Changes.pdf#page=3" },
  },
  hgt: {
    decision: "이번 주에 짝이 정해진 사람을 빼고, 헝가리안 알고리즘으로 남은 일대일 조합의 점수 합을 최대화했습니다.",
    proof: "고정 행렬에서 최적 합계 17점·15점을 확인했고, DB 검증에는 같은 주 재실행 시 기존 3쌍 보존을 담았습니다.",
    principle: "최대 가중치 이분 매칭",
    tradeoff: "이미 알려준 짝은 재실행에도 유지해야 했습니다. 그 조합을 고정하고 아직 짝이 없는 후보만 최적화하므로, 신규 후보가 들어와도 주간 전체 조합을 다시 계산하지 않습니다.",
    reference: { label: "H. W. Kuhn (1955) · 헝가리안 알고리즘 원 논문", href: "https://onlinelibrary.wiley.com/doi/10.1002/nav.3800020109" },
  },
  toksai: {
    featuredId: "source-grounded-quotes",
    decision: "AI가 따옴표 안에 넣은 문장을 실제 대화 한 건과 대조합니다. 근거가 없으면 타임라인에서는 인용만 걷어내고, 그 인용에 의존한 하이라이트는 통째로 제외합니다.",
    proof: "모델이 가짜 인용 두 건을 반환하는 테스트에서 둘 다 제거됐고, 인용 없이도 성립하는 타임라인 항목은 보존됐습니다.",
    principle: "문자열 정규화와 인용 검증",
    tradeoff: "유니코드 표기와 공백 차이를 정리하면 한 메시지 안에 인용 문자열이 있는지 검사할 수 있습니다. 대조 범위는 문자열의 존재까지이며, 화자 귀속과 맥락은 별도의 검증이 필요합니다.",
    reference: { label: "Unicode 표준 부속서 #15 · 문자열 정규화", href: "https://unicode.org/reports/tr15/#Norm_Forms" },
  },
  lovetype: {
    featuredId: "static-type-results",
    decision: "32개 응답은 기기에 저장해 이어서 풀 수 있게 하고, 공유 주소에는 네 글자의 유형 코드만 담았습니다.",
    proof: "같은 결과 링크를 열어도 해당 유형을 재현하는 답안이 기기에 있을 때만 개인 점수를 표시합니다. 링크를 받은 사람은 16종 중 해당 유형의 설명을 읽습니다.",
    principle: "정적 결과 페이지와 브라우저 저장소",
    tradeoff: "공유할 유형이 16개로 정해져 있어 유형별 페이지를 빌드할 때 만들 수 있었습니다. 응답을 브라우저에 보관하는 방식이라 브라우저 데이터를 지우면 개인 점수를 복원할 수 없습니다.",
    reference: { label: "Next.js 문서 · 빌드 시 동적 경로 생성", href: "https://nextjs.org/docs/app/api-reference/functions/generate-static-params" },
  },
};

export function getProjectHighlight(id: Service["id"]) {
  const { featuredId, ...highlight } = projectHighlights[id];
  const experiences = workExperiences[id];
  const experience = experiences.find((item) => item.id === featuredId) ?? experiences[0];
  return { experience, ...highlight };
}
