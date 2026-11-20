import type { Metadata } from "next";
import Link from "next/link";
import { workExperiences } from "@/data/work-experiences";
import WorkArchive from "@/components/WorkArchive";

export const metadata: Metadata = {
  title: "프로젝트별 작업",
  description: "토다리의 프로젝트별 담당 역할, 제약, 기술적 판단과 검증 기록입니다.",
  alternates: { canonical: "https://todari.dev/works" },
};

const engineeringTopics = [
  {
    title: "대시보드는 언제 이전 통계를 보여줘도 되는가?",
    summary: "포크레터에서는 배포로 서버가 교체될 때마다 통계를 다시 계산했습니다. AiBright에서는 수집 결과가 새로 공개될 때마다 탭이 느려졌습니다. 두 서비스 모두 이전 값을 먼저 보여주되, AiBright에서는 측정 설정이 바뀌면 같은 화면도 새로 계산합니다.",
    cases: [
      { label: "포크레터 · Redis 보관 기한과 SQL 실행 한도", href: "/work/forcletter#admin-stats-cache" },
      { label: "AiBright · 화면의 캐시 키와 데이터 버전", href: "/work/geo-seo-automation#dashboard-publication-cache" },
    ],
  },
  {
    title: "새 버전에 트래픽을 보내기 전에 무엇을 검증할까?",
    summary: "포크레터에서는 새 컬럼이 없어 사용자 정보 조회가 실패한 뒤, DB 변경과 새 컨테이너의 헬스 체크를 마쳐야 Nginx가 트래픽을 넘기게 했습니다. 메트로놈들에서는 GitHub Actions가 검증한 커밋과 EC2의 커밋이 일치해야 Docker 이미지를 빌드합니다.",
    cases: [
      { label: "포크레터 · 절반만 적용된 마이그레이션 재실행", href: "/work/forcletter#schema-before-deploy" },
      { label: "포크레터 · Nginx 전환과 이미지 태그 롤백", href: "/writing/bluegreen-on-one-ec2" },
      { label: "메트로놈들 · GitHub Actions 커밋 대조와 DB 헬스 체크", href: "/work/metronomdeul#verified-server-deploy" },
    ],
  },
  {
    title: "중간에 끊긴 배치는 어디서 다시 시작해야 할까?",
    summary: "포크레터에서는 지난번에 끝까지 훑은 계정과 중간에 멈춘 계정을 구분해야 했습니다. AiBright에서는 큐가 등록을 끝내고 응답만 잃을 수 있어 완료된 작업의 ID를 하루 동안 보존했습니다.",
    cases: [
      { label: "포크레터 · 24시간을 넘긴 수집 배치", href: "/work/forcletter#instagram-collection-cadence" },
      { label: "AiBright · BullMQ 등록 4회, 실제 실행 2회", href: "/work/geo-seo-automation#scheduled-enqueue-retry" },
    ],
  },
  {
    title: "요청 한 번이 DB와 합주 방에 만드는 부하는 어디서 줄일까?",
    summary: "포크레터에서는 게시물 12개의 최신 지표를 읽기 위해 5,845행을 정렬했습니다. 메트로놈들에서는 한 연주자가 바꾼 템포가 방 전체에 전달됐습니다. 각각 DB가 읽는 범위와 연주자 한 명이 보낼 수 있는 이벤트 수를 제한했습니다.",
    cases: [
      { label: "포크레터 · MySQL에서 최신 행을 찾는 인덱스 조회 계획", href: "/writing/snapshot-50m-rows" },
      { label: "메트로놈들 · 연주자와 이벤트별 토큰 버킷", href: "/work/metronomdeul#tempo-event-budget" },
    ],
  },
  {
    title: "행사를 바꾸거나 요청이 실패하면 어떤 화면을 유지해야 할까?",
    summary: "행동대장에서는 주소가 바뀌어도 이전 행사의 정산이 보였고, 처리할 수 없는 오류가 나도 원래 화면이 남았습니다. 조회 결과를 공유하는 범위는 행사 ID로, 실패 후 화면을 유지할지는 업무 오류 코드로 결정했습니다.",
    cases: [
      { label: "행동대장 · 행사 ID로 분리한 React Query 캐시", href: "/work/haengdong#event-scoped-query-cache" },
      { label: "행동대장 · 토스트와 오류 화면을 나눈 팀 PR", href: "/work/haengdong#query-error-boundaries" },
    ],
  },
  {
    title: "운영자가 바로 확인해야 할 경보는 무엇인가?",
    summary: "메모리 부족으로 서버가 새벽에 멈췄지만 장애를 발견한 건 아침이었습니다. 복구 후 메모리와 스왑이 임계값을 넘을 때 알리도록 했습니다. 행동대장에서는 반대로 iOS 인앱 브라우저가 주입한 오류를 식별해 앱 예외와 함께 집계되는 잡음을 줄였습니다.",
    cases: [
      { label: "서버 운영 · EC2 메모리 장애와 경보 기준", href: "/writing/ec2-oom-incident" },
      { label: "행동대장 · Sentry 인앱 브라우저 오류 필터", href: "/work/haengdong#error-tracking" },
    ],
  },
];

const history = [
  { date: "2022-11", project: "Go 이미지 제작 도구", title: "캐릭터 이미지와 속성표를 같은 조합으로 생성", detail: "레이어를 골라 이미지와 메타데이터를 함께 만들었습니다. 당시 저장한 CSV에는 5개 등급에 60개씩, 서로 다른 조합 300개가 남아 있습니다.", href: "https://github.com/Todari/go-generative-pfp/tree/88224c76f776301675e6068a5e6e77f4d143faed" },
  { date: "2023-06", project: "HGT", title: "Flutter 채팅 시제품에서 매칭된 두 사람의 대화 기록으로", detail: "처음에는 Firestore에서 방별 메시지를 구독했습니다. 2026년에는 접속을 끊은 상대도 나중에 대화를 읽을 수 있게 서버 저장과 실시간 전달을 분리했습니다.", href: "/work/hgt#chat-history-and-delivery" },
  { date: "2024-07", project: "행동대장", title: "공통 UI를 npm으로 배포했다가 패키지 경계를 재검토", detail: "컴포넌트를 고칠 때마다 앱 팀이 배포를 기다렸습니다. 로컬 연결 시제품을 만들어 비교했고, 팀은 공통 UI를 앱 안으로 옮겼습니다.", href: "/work/haengdong#design-package-release-coupling" },
  { date: "2025-03", project: "메트로놈들", title: "첫 Go 서버에서 템포가 바뀌면 합주 기준도 초기화됐습니다", detail: "다음 버전에서는 지금까지 연주한 박 수를 보존했습니다. 2.5박에서 템포를 절반으로 낮춰도 다음 박이 올 시간을 계산할 수 있습니다.", href: "/work/metronomdeul#live-tempo-phase" },
  { date: "2025-11", project: "포크레터", title: "가입을 마친 사용자도 Instagram 연결부터 이어갈 수 있게", detail: "카카오 로그인과 Instagram 연결을 각각 추적했습니다. 다시 방문하면 마지막으로 마친 단계에 맞춰 연결 안내나 대시보드로 돌아갑니다.", href: "/work/forcletter#first-instagram-onboarding" },
  { date: "2026-01", project: "포크레터", title: "피드와 릴스의 원고료를 각각 어디까지 추정할 수 있을까?", detail: "운영자 화면에서 모델별 추정값을 비교했습니다. 사용자가 적은 가격에는 희망가도 섞일 수 있어 실제 계약가 예측 정확도로 공표할 근거는 부족했습니다.", href: "/work/forcletter#creator-ad-price-model" },
  { date: "2026-06", project: "AiBright", title: "경쟁사와 같은 시점의 검색 결과에서 노출을 비교", detail: "한 번 조회한 결과에서 도메인별 순위를 계산했습니다. 이후 AI 검색으로 확장하면서 후보에는 올랐지만 답변에 인용되지 않은 출처까지 구분했습니다.", href: "/work/geo-seo-automation#serp-shared-observation" },
];

export default function WorksPage() {
  const projects = Object.values(workExperiences);
  const total = projects.reduce((count, work) => count + work.length, 0);
  return (
    <main className="mx-auto min-h-screen max-w-[74rem] px-4 pb-16 pt-10 text-[#172238] sm:px-8 sm:pt-16">
      <header className="mb-7 border-b border-[#bfcadd] pb-5 sm:mb-8 sm:pb-6">
        <h1 className="text-4xl font-bold leading-none tracking-[-0.045em] sm:text-5xl">프로젝트</h1>
        <p className="mt-3 break-keep text-sm leading-relaxed text-[#49556a] sm:text-base">
          {projects.length}개 프로젝트에서 직접 구현하고 고친 작업 {total}건입니다. 각 기록에서 당시 제약, 선택한 방법과 검증 결과를 읽을 수 있습니다.
        </p>
        <a href="#works" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-[#2347b7] hover:underline">프로젝트 목록으로 이동 ↓</a>
      </header>
      <section id="engineering" aria-labelledby="engineering-heading" className="mb-10 scroll-mt-6">
        <h2 id="engineering-heading" className="text-2xl font-bold tracking-tight">기술 주제별 사례</h2>
        <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
          {engineeringTopics.map(({ title, summary, cases }) => (
            <li key={title} className="border-t border-[#cdd5e1] py-4">
              <h3 className="break-keep text-lg font-bold leading-snug text-[#192d53]">{title}</h3>
              <p className="mt-2 max-w-prose break-keep text-sm leading-6 text-slate-700">{summary}</p>
              <ul className="mt-2">
                {cases.map(({ href, label }) => (
                  <li key={href}><Link href={href} className="inline-flex min-h-11 items-center gap-1 rounded-sm text-sm font-semibold text-[#2347b7] underline-offset-4 hover:underline focus-visible:outline-2">{label} <span aria-hidden="true">›</span></Link></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <section id="history" aria-labelledby="history-heading" className="mb-10 scroll-mt-6">
        <h2 id="history-heading" className="text-2xl font-bold tracking-tight">연도별 개발 기록</h2>
        <ol className="mt-3 grid gap-x-8 sm:grid-cols-2">
          {history.map(({ date, project, title, detail, href }) => (
            <li key={date} className="border-t border-[#cdd5e1] py-4">
              <p className="text-xs font-semibold text-slate-600"><time dateTime={date}>{date.replace("-", ".")}</time> · {project}</p>
              <Link href={href} className="mt-1.5 block w-fit break-keep rounded-sm text-lg font-bold leading-snug text-[#192d53] underline-offset-4 hover:underline focus-visible:outline-2">{title} <span aria-hidden="true">{href.startsWith("/") ? "›" : "↗"}</span></Link>
              <p className="mt-1.5 max-w-prose break-keep text-sm leading-6 text-slate-700">{detail}</p>
            </li>
          ))}
        </ol>
      </section>
      <WorkArchive />
    </main>
  );
}
