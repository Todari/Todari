import Link from "next/link";

const operatingCases = [
  {
    href: "/work/forcletter#geo-loop",
    topic: "검색 유입 · GEO",
    title: "어떤 글을 고치고, 언제 이전 글로 되돌릴까?",
    body: "실제 검색어가 연결된 글부터 고쳤습니다. 클릭이 많은 글은 28일을 기다려 복원 여부를 판단했습니다. 포크레터 글을 인용하면서 서비스명은 생략한 AI 답변을 발견한 뒤에는 글의 답 문장도 바꿨습니다.",
  },
  {
    href: "/writing/marketing-reels-pipeline",
    topic: "광고 소재 제작",
    title: "캠페인 한 건만 보이는데 대본은 원고료를 비교한다고 했습니다",
    body: "실제 제품 화면과 대사를 대조한 뒤 음성을 만들도록 했습니다. 11월 2일 국내 제작에서는 불일치 6건 중 5건을 고쳤고, 소재 5편의 배속별 검토본 10개를 29분 6초에 만들었습니다.",
  },
  {
    href: "/writing/ad-attribution-cohort",
    topic: "광고 예산 · 유입 분석",
    title: "몇 달 전 가입한 사람이 오늘 광고의 신규 성과로 잡혔습니다",
    body: "뒤늦은 첫 계정 연결이 가입 당시 비어 있던 유입 기록을 채운다는 점을 찾아 가입 후 24시간까지만 빈 값을 채웠습니다. 소재별 예산을 비교할 때는 가입 후 14일 동안 결제를 관찰한 집단만 집계했습니다.",
  },
] as const;

export function ForcletterOperations() {
  return (
    <section id="growth-operations" aria-labelledby="operations-heading" className="mx-auto mt-7 max-w-4xl px-4 text-slate-900 sm:mt-10 sm:px-6">
      <h2 id="operations-heading" className="mb-2.5 text-[22px] font-bold tracking-tight sm:mb-3 sm:text-[26px]">포크레터의 검색 유입과 광고 운영</h2>
      <ul className="divide-y divide-slate-200 rounded-[20px] bg-white px-[18px] shadow-[0_3px_18px_#0f172a08] sm:px-6">
        {operatingCases.map(({ href, topic, title, body }) => (
          <li key={href}>
            <Link href={href} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-sm py-4">
              <div>
                <p className="text-xs font-semibold text-[#2347b7]">{topic}</p>
                <h3 className="mt-1 break-keep text-[17px] leading-snug font-bold group-hover:text-[#2347b7]">{title}</h3>
                <p className="mt-1 max-w-3xl break-keep text-sm leading-6 text-slate-700">{body}</p>
              </div>
              <span aria-hidden="true" className="text-lg text-slate-500">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MakerProfile() {
  return (
    <div className="mx-auto max-w-4xl space-y-5 px-4 pt-4 pb-9 text-slate-900 sm:px-6">
      <section id="about" tabIndex={-1} aria-labelledby="about-heading" className="scroll-mt-5 rounded-[20px] bg-white px-[18px] py-5 sm:px-6">
        <h2 id="about-heading" className="text-[18px] font-bold">토다리 소개</h2>
        <p className="mt-2 max-w-2xl break-keep text-sm leading-6 text-slate-700">미피랩스에서 서비스 기획과 디자인을 시작했습니다. 지금은 링카이브에서 포크레터의 기획과 웹·앱 개발, 배포 후 운영을 맡고 있습니다.</p>
        <dl className="mt-4 divide-y divide-slate-200 border-y border-slate-200 text-sm">
          {[
            ["링카이브", "포크레터 기획·개발·운영", "2025.09 – 현재"],
            ["우아한테크코스", "6기 프론트엔드", "2024.02 – 2024.12"],
            ["미피랩스", "서비스 기획·디자인", "2022.01 – 2023.07"],
          ].map(([name, role, period]) => (
            <div key={name} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 py-3">
              <dt><strong>{name}</strong> <span className="text-slate-600">· {role}</span></dt>
              <dd className="text-xs tabular-nums text-slate-600">{period}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-2 flex flex-wrap gap-x-5 text-[13px] font-semibold text-[#2347b7] [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a:hover]:underline">
          <a href="https://github.com/Todari">GitHub ↗</a>
          <a href="https://www.youtube.com/watch?v=Pdi-zj761bM">디자인 시스템 발표 ↗</a>
          <a href="https://www.youtube.com/watch?v=6z_UKO8uWus">Figma 강의 ↗</a>
        </div>
      </section>
      <section id="woosuta" aria-labelledby="woosuta-heading" className="scroll-mt-5 rounded-[20px] bg-white px-[18px] py-5 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h2 id="woosuta-heading" className="text-[18px] font-bold">우수타 · 우리끼리 수다 타임</h2>
          <a href="https://www.youtube.com/@우리끼리수다타임" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#2347b7] hover:underline">채널 전체 보기 ↗</a>
        </div>
        <p className="mb-3 break-keep text-sm leading-6 text-slate-700">동료 개발자들과 부트캠프 이후의 경험을 나누는 팟캐스트를 기획하고 진행했습니다.</p>
        <ul className="divide-y divide-slate-200 border-t border-slate-200">
          {[
            ["EP5. 부트캠프는 아직 유효한가?!", "https://youtu.be/k2JIKx44L5M"],
            ["EP3. 우리에게 수다가 필요한 이유", "https://youtu.be/007QtdQTLBo"],
            ["EP2. 그동안 어떻게 지냈나요?", "https://youtu.be/_jlNYmb6NAU"],
          ].map(([title, href]) => (
            <li key={href}><a href={href} className="flex min-h-11 items-center justify-between gap-3 py-2 text-sm font-semibold text-[#2347b7] hover:underline">{title}<span aria-hidden="true">↗</span></a></li>
          ))}
        </ul>
      </section>
      <section id="contact" tabIndex={-1} aria-labelledby="contact-heading" className="flex scroll-mt-5 flex-wrap items-center justify-between gap-3 rounded-[20px] bg-white px-[18px] py-5 sm:px-6">
        <div>
          <h2 id="contact-heading" className="text-[18px] font-bold">연락</h2>
          <p className="mt-1 text-sm text-slate-600">프로덕트 엔지니어 포지션과 제품 개발 협업</p>
        </div>
        <a href="mailto:hello@todari.dev" className="inline-flex min-h-11 items-center rounded-xl bg-[#eef3ff] px-4 text-sm font-bold text-[#2347b7] hover:bg-blue-100">hello@todari.dev</a>
      </section>
    </div>
  );
}
