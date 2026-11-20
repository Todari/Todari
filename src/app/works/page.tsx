import type { Metadata } from "next";
import Link from "next/link";
import { workExperiences } from "@/data/work-experiences";
import WorkArchive from "@/components/WorkArchive";

export const metadata: Metadata = {
  title: "프로젝트별 작업",
  description: "토다리의 프로젝트별 담당 역할, 제약, 기술적 판단과 검증 기록입니다.",
  alternates: { canonical: "https://todari.dev/works" },
};

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
