import Link from "next/link";

const engineeringLoop = [
  { step: "01", label: "CONTEXT", color: "#67e8f9" },
  { step: "02", label: "AI BUILD", color: "#ff79bd" },
  { step: "03", label: "VERIFY", color: "#dfff4f" },
  { step: "04", label: "CI / CD", color: "#a78bfa" },
  { step: "05", label: "SMOKE", color: "#67e8f9" },
  { step: "06", label: "OPS", color: "#ff79bd" },
] as const;

const careers = [
  { period: "2015.03 — 2023.02", org: "홍익대학교", role: "토목공학과 졸업 · 학점 4.09/4.5" },
  {
    period: "2022.01 — 2023.07",
    org: "미피랩스",
    role: "자율주행·블록체인/NFT 서비스 기획·디자인. 자율주행 특허 출원 1건, KT 안다즈 협업",
  },
  { period: "2024.02 — 2024.12", org: "우아한테크코스", role: "6기 프론트엔드 수료" },
  {
    period: "2025.09 — 현재",
    org: "링카이브",
    role: "포크레터 1인 기획·디자인·풀스택·운영",
  },
] as const;

const caseStudies = [
  {
    label: "FORCLETTER · DATA MODELING",
    title: "시계열 조회 패턴을 인덱스와 수집 구조에 반영했습니다.",
    constraint: "주기 수집으로 커지는 메트릭 테이블을 통계 화면이 매번 조회해야 했습니다.",
    decision: "조회 범위에 맞춘 복합 인덱스와 기간 집계, 크론 중복 실행 락을 설계했습니다. JSON 컬럼 백필은 운영 데이터를 유지하며 진행했습니다.",
    facts: ["복합 인덱스 · 기간 집계", "2026-08 설계 기록"],
    href: "/writing/snapshot-50m-rows", linkLabel: "당시 규모와 설계 읽기",
  },
  {
    label: "FORCLETTER · DEPLOYMENT",
    title: "새 버전이 준비된 뒤에 트래픽을 넘깁니다.",
    constraint: "단일 EC2에서 기존 컨테이너를 먼저 내리는 배포는 사용자 요청을 끊었습니다.",
    decision: "비활성 슬롯을 띄워 헬스체크를 통과한 뒤 Nginx upstream을 전환합니다. 배포 단위를 이미지 태그로 고정해 이전 버전으로 돌아갈 경로도 만들었습니다.",
    facts: ["헬스체크 후 슬롯 전환", "태그 기반 롤백"],
    href: "/writing/bluegreen-on-one-ec2", linkLabel: "배포·롤백 설계 읽기",
  },
  {
    label: "FORCLETTER · AD ATTRIBUTION",
    title: "기존 회원의 재방문을 신규 광고 가입으로 세지 않도록.",
    constraint: "오래된 회원이 광고로 다시 방문해 처음 채널을 연결하면, 비어 있던 유입 정보가 채워져 신규 가입처럼 표시됐습니다.",
    decision: "서버의 공통 기록 함수에 가입 후 24시간 경계를 두었습니다. 광고 지출과 가입 코호트의 날짜 기준을 분리하고, 14일 관찰이 끝나지 않은 가입은 완료 표본에서 제외합니다.",
    facts: ["가입 후 기록 시간 제한", "관찰 완료 코호트 비교"],
    href: "/writing/ad-attribution-cohort", linkLabel: "오귀속 원인과 수정 읽기",
  },
  {
    label: "TODARI OPS · INCIDENT RESPONSE",
    title: "새벽 장애 뒤에 감지와 복구 경로를 추가했습니다.",
    constraint: "메모리 압박으로 인스턴스가 응답하지 않았고, 사람이 잠든 동안 장애를 알아차리지 못했습니다.",
    decision: "재부팅으로 복구한 뒤 스왑, 반복 알림을 억제하는 임계 경보, CloudWatch 복구 동작을 설정했습니다. 메모리 증가 원인의 제거와 재발 시 자동 복구 성공까지 검증한 것은 아닙니다.",
    facts: ["실제 사고 복구", "자동 복구 설정 · 재실패 시험 미확인"],
    href: "/writing/ec2-oom-incident", linkLabel: "대응과 남은 한계 읽기",
  },
  {
    label: "METRONOMDEUL · REALTIME SYNC",
    title: "네트워크 수신 시각과 오디오 재생 시각을 분리했습니다.",
    constraint: "기기마다 시계와 네트워크 지연이 달라, 메시지를 받자마자 소리를 내면 박자가 어긋납니다.",
    decision: "RTT 표본의 중앙값으로 서버 시각 차이를 추정하고 Web Audio에 미리 재생을 예약합니다. 재접속과 iOS 오디오 활성화의 상태 전이도 함께 다뤘습니다.",
    facts: ["시계 오프셋 추정", "선행 예약 ≠ 실측 동기화 오차"],
    href: "/writing/metronome-clock-sync", linkLabel: "시계·오디오 설계 읽기",
  },
  {
    label: "REACT PIXEL UI · FRONTEND LIBRARY",
    title: "DOM을 유지한 채 지원하는 CSS 속성을 픽셀로 렌더링합니다.",
    constraint: "픽셀 스타일을 적용해도 기존 레이아웃·이벤트·서버 렌더링을 사용할 수 있어야 했습니다.",
    decision: "clip-path와 PNG 데이터 URL로 배경·그라데이션·테두리·모서리·그림자를 변환합니다. 미지원 배경은 원본을 유지하고, 서버에서는 일반 요소를 렌더링한 뒤 hydration 이후 변환합니다.",
    facts: ["공개 React 라이브러리", "지원 속성·미지원 범위 문서화"],
    href: "https://github.com/Todari/react-pixel-ui", linkLabel: "공개 구현과 지원 범위 보기",
  },
] as const;

const talks = [
  {
    label: "PODCAST HOST",
    title: "우리끼리 수다 타임",
    description:
      "동료 개발자들과 다양한 주제로 이야기를 나누는 토크 채널을 직접 기획하고 호스트를 맡았습니다.",
    thumb: "k2JIKx44L5M",
    links: [
      { name: "EP5. 부트캠프는 아직 유효한가?!", href: "https://youtu.be/k2JIKx44L5M" },
      { name: "EP3. 우리에게 수다가 필요한 이유", href: "https://youtu.be/007QtdQTLBo" },
      { name: "EP2. 그동안 어떻게 지냈나요?", href: "https://youtu.be/_jlNYmb6NAU" },
      {
        name: "채널 전체 보기",
        href: "https://www.youtube.com/@%EC%9A%B0%EB%A6%AC%EB%81%BC%EB%A6%AC%EC%88%98%EB%8B%A4%ED%83%80%EC%9E%84",
      },
    ],
  },
  {
    label: "TECH TALK · 우아한테크코스",
    title: "테코톡 · 방과후 강의",
    description:
      "우아한테크코스에서 기술 주제를 골라 발표하고, 동료들을 위한 Figma 방과후 강의를 직접 열었습니다.",
    thumb: "Pdi-zj761bM",
    links: [
      { name: "10분 테코톡 — 토다리의 디자인시스템", href: "https://www.youtube.com/watch?v=Pdi-zj761bM" },
      { name: "방과후수업 — Figma 강의", href: "https://www.youtube.com/watch?v=6z_UKO8uWus" },
    ],
  },
  {
    label: "STUDY LEAD · HONGIK UNIV",
    title: "사운드 스터디",
    description:
      "사운드를 주제로 스터디를 진행하고 회차별 영상을 공개했습니다.",
    thumb: "dKBiqi0ph7g",
    links: [
      { name: "사운드 스터디 1주차", href: "https://youtu.be/dKBiqi0ph7g" },
      { name: "사운드 스터디 2주차", href: "https://youtu.be/2u2RFoJuIQk" },
    ],
  },
] as const;

export default function MakerProfile() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-20 overflow-hidden border-t-[3px] border-[#17151c] bg-[#fffaf0] px-5 py-24 text-[#17151c] md:px-10 md:py-32"
      style={{
        backgroundImage:
          "linear-gradient(rgba(23,21,28,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(23,21,28,.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-32 h-56 w-56 rotate-12 rounded-full opacity-20"
        style={{
          backgroundImage: "radial-gradient(#17151c 1.4px, transparent 1.4px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-[42rem] h-48 w-48 rotate-[-8deg] rounded-3xl border-[3px] border-[#17151c] bg-[#ff79bd] opacity-70"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-black tracking-widest text-[#5b38b9]">ABOUT TODARI</p>
          <h2 id="about-heading" className="mt-4 text-3xl font-black tracking-tight md:text-4xl">기획자·디자이너에서 제품 엔지니어로</h2>
          <p className="mt-5 text-base leading-7 text-[#5d5565]">기획·디자인 실무에서 시작해 우아한테크코스에서 프론트엔드를 공부했습니다. 지금은 포크레터의 기획·디자인·풀스택 개발과 운영을 맡고 있습니다.</p>
        </div>

        <div className="mt-12">
          <p className="font-mono text-[10px] font-black tracking-[0.22em] text-[#17151c]/70">
            CAREER
          </p>
          <ol className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[...careers].reverse().map((career) => (
              <li
                key={career.org}
                className="rounded-[1rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-4 shadow-[5px_5px_0_#17151c]"
              >
                <p className="font-mono text-[9px] font-black tracking-[0.14em] text-[#17151c]/70">
                  {career.period}
                </p>
                <p className="mt-1.5 text-base font-black">{career.org}</p>
                <p className="mt-1 text-xs leading-5 text-[#5d5565]">
                  {career.role}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <article className="mt-8 rounded-2xl border-[3px] border-[#17151c] bg-[#fffaf0] p-6 shadow-[5px_5px_0_#17151c]">
          <p className="text-xs font-black text-[#5b38b9]">TEAMWORK · 행동대장</p>
          <h3 className="mt-3 text-xl font-black">리뷰에서 발견한 접근성 문제를 구현에 반영했습니다.</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5d5565]">Carousel·BottomSheet의 키보드 접근성을 개선하던 중, 팀원이 슬라이드 변경을 스크린리더가 실제로 읽는지 질문했습니다. 기존 aria-label 방식의 한계를 확인하고 aria-live 안내 영역으로 수정했습니다. 포커스 애니메이션도 리뷰를 통해 제거하며 컴포넌트 간 동작을 통일했습니다.</p>
          <a href="https://github.com/woowacourse-teams/2024-haeng-dong/pull/984#discussion_r1938219295" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-black text-[#5b38b9] underline underline-offset-4">리뷰와 수정 기록 보기 ↗</a>
        </article>

        <details className="mt-10 rounded-2xl border-2 border-[#17151c] p-5 md:p-7">
          <summary className="cursor-pointer text-lg font-black">구현 근거와 운영 사례 더 보기</summary>
        <div className="mt-24 overflow-hidden rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#17151c] p-7 text-[#fffaf0] shadow-[8px_8px_0_#a78bfa] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <p className="inline-flex rotate-[-1deg] items-center rounded-full border-2 border-[#17151c] bg-[#a78bfa] px-4 py-2 font-mono text-[10px] font-black tracking-[0.2em] text-[#17151c] shadow-[3px_3px_0_#fffaf0] md:text-xs">
                HOW I SCALE IT · AI-NATIVE AUTOMATION
              </p>
              <h2 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-6xl">
                AI Development
                <br />
                Harness
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#d6cedd] md:text-base">
                AI 작업에서 현재 브랜치와 변경 상태를 놓치거나 검증을 생략하는
                문제에 대응했습니다. 공통 컨텍스트 주입과 검증 누락 감지,
                배포 후 스모크 체크를 공개 코드로 관리합니다.
              </p>
            </div>

            <div className="rounded-[1rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-4 text-[#17151c] shadow-[6px_6px_0_#5d4c7d] md:p-6">
              <p className="font-mono text-[9px] font-black tracking-[0.18em] text-[#17151c]/70">
                AI → AUTOMATION → OPERATIONS
              </p>
              <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {engineeringLoop.map((item) => (
                  <li
                    key={item.step}
                    className="rounded-xl border-2 border-[#17151c] px-2 py-3 text-center shadow-[3px_3px_0_#17151c]"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="block font-mono text-[8px] font-black tracking-[0.08em] text-[#17151c]/70">
                      {item.step}
                    </span>
                    <span className="mt-1 block font-mono text-[9px] font-black tracking-[0.06em]">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-[#fffaf0]/20 pt-8 md:grid-cols-3">
            <div className="rounded-xl border-2 border-[#fffaf0]/25 bg-[#fffaf0]/5 p-5">
              <p className="font-mono text-[9px] font-black tracking-[0.18em] text-[#67e8f9]">
                01 · AI DEVELOPMENT HARNESS
              </p>
              <p className="mt-3 text-sm leading-6 text-[#d6cedd]">
                세션 시작 시 repo map·git 상태·프로젝트 TODO·완료 기준을
                주입하고, 소스 편집 뒤 검증 누락을 자동으로 감지합니다.
              </p>
              <a
                href="https://github.com/Todari/workspace-ai-harness"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex font-mono text-[10px] font-black tracking-[0.12em] text-[#67e8f9] underline decoration-2 underline-offset-4"
              >
                PUBLIC REPOSITORY ↗
              </a>
            </div>
            <div className="rounded-xl border-2 border-[#fffaf0]/25 bg-[#fffaf0]/5 p-5">
              <p className="font-mono text-[9px] font-black tracking-[0.18em] text-[#ff79bd]">
                02 · DELIVERY AUTOMATION
              </p>
              <p className="mt-3 text-sm leading-6 text-[#d6cedd]">
                같은 `npm run verify`를 로컬과 GitHub Actions에서 실행하고,
                Vercel 프로덕션 배포 URL까지 자동으로 스모크 체크합니다.
              </p>
            </div>
            <div className="rounded-xl border-2 border-[#fffaf0]/25 bg-[#fffaf0]/5 p-5">
              <p className="font-mono text-[9px] font-black tracking-[0.18em] text-[#dfff4f]">
                03 · DISCORD OPS FEEDBACK
              </p>
              <p className="mt-3 text-sm leading-6 text-[#d6cedd]">
                CI·Vercel·Sentry 신호를 Discord에서 모으고 읽기 전용 사전
                진단과 `/code` 트리아지로 연결합니다. 복구는 사람이
                승인합니다.
              </p>
              <a
                href="https://github.com/Todari/todari-ops"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex font-mono text-[10px] font-black tracking-[0.12em] text-[#dfff4f] underline decoration-2 underline-offset-4"
              >
                PUBLIC REPOSITORY ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex rotate-[-1deg] items-center rounded-full border-2 border-[#17151c] bg-[#dfff4f] px-4 py-2 font-mono text-[10px] font-black tracking-[0.22em] shadow-[3px_3px_0_#17151c] md:text-xs">
                ENGINEERING DECISIONS
              </p>
              <h2 className="mt-6 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                무엇을 고쳤고, 어디까지 확인했는가.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#5d5565]">
              당시의 문제와 선택한 설계를 기록했습니다. 과거 글의 수치는
              작성 시점의 기록이며 현재 운영 규모를 뜻하지 않습니다.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {caseStudies.map((item) => {
              const content = (
                <>
                  <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#17151c]/70">
                    {item.label}
                  </p>
                  <h3 className="mt-4 text-2xl font-black">
                    {item.title}
                  </h3>
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="font-mono text-[9px] font-black tracking-[0.16em] text-[#17151c]/70">
                        CONSTRAINT
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-[#5d5565]">
                        {item.constraint}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[9px] font-black tracking-[0.16em] text-[#17151c]/70">
                        ENGINEERING DECISION
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-[#5d5565]">
                        {item.decision}
                      </dd>
                    </div>
                  </dl>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.facts.map((fact) => (
                      <li
                        key={fact}
                        className="rounded-full border-2 border-[#17151c] bg-white px-3 py-1.5 text-[11px] font-bold"
                      >
                        {fact}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 inline-flex text-sm font-black text-[#5b38b9]">
                    {item.linkLabel} ↗
                  </span>
                </>
              );

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-7 shadow-[8px_8px_0_#17151c] transition-transform hover:-translate-y-1"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>

        </details>

        <div className="mt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex rotate-[1deg] items-center rounded-full border-2 border-[#17151c] bg-[#67e8f9] px-4 py-2 font-mono text-[10px] font-black tracking-[0.22em] shadow-[3px_3px_0_#17151c] md:text-xs">
                SHARING &amp; TALKS
              </p>
              <h2 className="mt-6 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                기술 발표·강의·팟캐스트
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#5d5565]">
              디자인 시스템 발표, 동료를 위한 Figma 강의, 개발자 팟캐스트를
              진행했습니다. 영상에서 설명 방식과 협업 경험을 확인할 수 있습니다.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {talks.map((talk) => (
              <article
                key={talk.title}
                className="flex flex-col overflow-hidden rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0] shadow-[8px_8px_0_#17151c]"
              >
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#17151c]/70">
                    {talk.label}
                  </p>
                  <h3 className="mt-3 text-xl font-black">{talk.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5d5565]">
                    {talk.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {talk.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-[#5b38b9] hover:underline"
                        >
                          ▶ {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <a
            href="/writing"
            className="mt-5 flex flex-col gap-2 rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#dfff4f] p-6 shadow-[8px_8px_0_#17151c] transition-transform hover:-translate-y-1 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#17151c]/70">
                TECH WRITING
              </p>
              <p className="mt-2 text-lg font-black tracking-[-0.02em]">
                운영에서 내린 판단을 글로 씁니다. 장애 복구, 토큰 상태 머신,
                무중단 배포, 대용량 시계열, 실시간 동기화.
              </p>
            </div>
            <span className="shrink-0 rounded-xl border-2 border-[#17151c] bg-[#17151c] px-4 py-2 text-sm font-black text-[#fffaf0]">
              글 보러 가기 →
            </span>
          </a>
        </div>

        <div
          id="contact"
          className="mt-24 scroll-mt-6 overflow-hidden rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#17151c] p-7 text-[#fffaf0] shadow-[8px_8px_0_#17151c] md:p-10"
          style={{
            backgroundImage: "radial-gradient(rgba(255,250,240,.17) 1.2px, transparent 1.4px)",
            backgroundSize: "22px 22px",
          }}
        >
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="inline-flex rotate-[-1deg] items-center rounded-full border-2 border-[#17151c] bg-[#ff79bd] px-4 py-2 font-mono text-[10px] font-black tracking-[0.2em] text-[#17151c] shadow-[3px_3px_0_#17151c] md:text-xs">
                LET&apos;S TALK
              </p>
              <h2 className="mt-6 max-w-3xl text-3xl font-black leading-tight tracking-[-0.045em] md:text-5xl">
                문제를 함께 정의하고,
                <br />
                빠르게 제품으로 검증할 팀을 찾습니다.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#d6cedd] md:text-base">
                프로덕트 엔지니어·프론트엔드 포지션과 제품을 처음부터 함께
                만드는 협업 제안을 열어두고 있습니다. 해결하려는 문제와 기대하는 역할을
                함께 보내주시면 대화를 시작하기 좋습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:hello@todari.dev?subject=Todari를%20보고%20연락드립니다"
                className="rounded-xl border-2 border-[#17151c] bg-[#dfff4f] px-5 py-3 text-sm font-black text-[#17151c] shadow-[4px_4px_0_#17151c] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
              >
                hello@todari.dev ↗
              </a>
              <a
                href="https://github.com/Todari"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-2 border-[#fffaf0] bg-[#17151c] px-5 py-3 text-sm font-bold text-[#fffaf0] shadow-[4px_4px_0_rgba(255,250,240,.28)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
