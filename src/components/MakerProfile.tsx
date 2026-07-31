const capabilities = [
  {
    step: "01",
    title: "Product Architecture",
    description:
      "불명확한 요구사항을 도메인 흐름과 상태 전이로 구조화하고, 제품·클라이언트·서버의 책임 경계를 설계합니다.",
  },
  {
    step: "02",
    title: "Frontend Systems",
    description:
      "인터랙션 구현을 넘어 재사용 가능한 UI 추상화, 성능, 접근성, 테스트 가능한 상태 구조를 함께 다룹니다.",
  },
  {
    step: "03",
    title: "Realtime & Data",
    description:
      "WebSocket·Web Audio·외부 API·데이터 수집처럼 시간과 정합성이 중요한 흐름을 안정적인 파이프라인으로 만듭니다.",
  },
  {
    step: "04",
    title: "Operations & Recovery",
    description:
      "배포 후 로그·지표·알림으로 상태를 관측하고, 실패·재시도·복구 경로와 반복 운영을 자동화합니다.",
  },
] as const;

const capabilityColors = ["#dfff4f", "#67e8f9", "#ff79bd", "#a78bfa"] as const;

const principles = [
  {
    label: "ENGINEERING DEPTH",
    title: "실패와 복구까지 시스템의 일부로 봅니다.",
    description:
      "정상 흐름만 구현하지 않습니다. 데이터 정합성, 경계 조건, 재시도, 복구, 관측 가능성을 설계에 포함하고 운영에서 발견한 실패를 테스트와 가드레일로 되돌립니다.",
  },
  {
    label: "PRODUCT INSTINCT",
    title: "작은 불편도 실제 제품으로 검증합니다.",
    description:
      "거창한 아이디어를 기다리지 않습니다. 일상의 문제를 검증 가능한 범위로 줄이고, 직접 출시해 사용 가능성과 기술적 비용을 확인합니다.",
  },
] as const;

const principleColors = ["#fffaf0", "#ffcae5"] as const;

const caseStudies = [
  {
    label: "PRODUCT PLATFORM",
    title: "Forcletter",
    constraint:
      "Instagram 데이터 조회, 반복 DM·댓글 업무, AI 실행과 정기 리포트를 하나의 크리에이터 운영 흐름으로 연결해야 했습니다.",
    decision:
      "웹·API·앱·스케줄러의 책임을 분리하고, 외부 플랫폼 연동과 AI Function Calling이 명시적인 실행 경계를 통과하도록 구성했습니다.",
    facts: ["Meta Graph API", "AI Function Calling", "Web·API·App·Scheduler"],
    href: "https://forcreator.co.kr",
  },
  {
    label: "FRONTEND INFRA",
    title: "React Pixel UI",
    constraint:
      "기존 DOM과 CSS 레이아웃을 훼손하지 않으면서 배경·테두리·모서리·그림자를 픽셀 아트로 변환해야 했습니다.",
    decision:
      "Canvas 대신 CSS 변환 계층을 설계해 SSR을 유지하고, 테마·hover·focus·크기 변화가 자동으로 다시 계산되도록 만들었습니다.",
    facts: ["npm 패키지 배포", "회귀 테스트 122개", "PNG 출력 30–100× 최적화"],
    href: "https://github.com/Todari/react-pixel-ui",
  },
  {
    label: "REALTIME SYSTEM",
    title: "메트로놈들",
    constraint:
      "네트워크 지연과 서로 다른 오디오 시계를 가진 기기들이 각자의 이어폰에서 같은 클릭을 재생해야 했습니다.",
    decision:
      "서버 시각 보정과 Web Audio 선행 스케줄링을 분리하고, iOS 오디오 활성화·재접속·방 상태 동기화의 경합을 복구 가능한 흐름으로 정리했습니다.",
    facts: ["시계 오프셋 보정", "Web Audio 스케줄링", "재접속·iOS 복구"],
    href: "https://github.com/Todari/metro-nomedeul",
  },
  {
    label: "EVENT-DRIVEN PIPELINE",
    title: "Trade Tower",
    constraint:
      "실시간 틱과 호가 데이터에서 판단을 만들되, 잘못된 진입·중복 주문·연결 단절이 실제 실행으로 번지지 않게 제어해야 했습니다.",
    decision:
      "규칙 기반 Tick Engine을 중심에 두고 LLM은 제한적인 VETO로 격리했습니다. 진입·청산 정책, 다층 리스크 게이트, 주문 검증과 복구를 명시적인 단계로 분리했습니다.",
    facts: ["WebSocket Tick Engine", "Live·Simulation parity", "Risk·Kill Switch"],
    href: "https://github.com/yeouido-penthouse-cattower/trade-tower",
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
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <div>
            <p className="mb-6 inline-flex rotate-[-2deg] items-center rounded-full border-2 border-[#17151c] bg-[#67e8f9] px-4 py-2 font-mono text-[10px] font-black tracking-[0.22em] shadow-[3px_3px_0_#17151c] md:text-xs">
              ABOUT TODARI
            </p>
            <h2
              id="about-heading"
              className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.055em] md:text-6xl"
            >
              제품의 불확실성을
              <br />
              <span className="relative inline-block">
                구조화하고,
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 -z-10 h-3 w-full rotate-[-1deg] bg-[#dfff4f]"
                />
              </span>
              <br />
              운영 가능한 시스템으로 완성합니다.
            </h2>
          </div>

          <div className="self-end rotate-[1deg] rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-6 shadow-[8px_8px_0_#17151c] md:p-8">
            <p className="text-lg font-black leading-8 md:text-xl">
              실시간·데이터·자동화 시스템을 설계하고 운영하면서, 작은
              불편과 호기심도 직접 제품으로 검증하는 Product Engineer
              Todari입니다.
            </p>
            <p className="mt-5 text-base leading-7 text-[#5d5565]">
              화면 구현에 그치지 않고 도메인 흐름, 상태 전이, API 계약,
              장애 복구와 배포 후 관측성까지 제품의 전체 수명주기를
              다룹니다. 요구사항은 검증 가능한 범위로 구조화하고, 운영에서
              발견한 실패는 재현 가능한 테스트와 가드레일로 되돌립니다.
            </p>
          </div>
        </div>

        <ol className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {capabilities.map((item, index) => (
            <li
              key={item.step}
              className={`rounded-[1.25rem] border-[3px] border-[#17151c] p-6 shadow-[8px_8px_0_#17151c] ${
                index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
              }`}
              style={{ backgroundColor: capabilityColors[index] }}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#17151c] bg-[#fffaf0] font-mono text-xs font-black">
                {item.step}
              </span>
              <h3 className="mt-5 text-lg font-black">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#463f4c]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-24">
          <p className="inline-flex rotate-[1deg] items-center rounded-full border-2 border-[#17151c] bg-[#ff79bd] px-4 py-2 font-mono text-[10px] font-black tracking-[0.22em] shadow-[3px_3px_0_#17151c] md:text-xs">
            TWO SIDES, ONE PRACTICE
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {principles.map((principle, index) => (
              <article
                key={principle.label}
                className="rounded-[1.25rem] border-[3px] border-[#17151c] p-7 shadow-[8px_8px_0_#17151c]"
                style={{ backgroundColor: principleColors[index] }}
              >
                <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#17151c]/50">
                  {principle.label}
                </p>
                <h3 className="mt-5 text-2xl font-black tracking-[-0.035em]">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#544c5c]">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex rotate-[-1deg] items-center rounded-full border-2 border-[#17151c] bg-[#dfff4f] px-4 py-2 font-mono text-[10px] font-black tracking-[0.22em] shadow-[3px_3px_0_#17151c] md:text-xs">
                EVIDENCE, NOT CLAIMS
              </p>
              <h2 className="mt-6 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                기술적 판단은 운영 결과로 증명합니다.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#5d5565]">
              사용한 기술보다 어떤 제약을 발견했고, 어떤 경계를 설계했으며,
              실패를 어떻게 시스템에 되돌렸는지를 기록합니다.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {caseStudies.map((item) => {
              const content = (
                <>
                  <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#17151c]/40">
                    {item.label}
                  </p>
                  <h3 className="mt-4 text-2xl font-black">
                    {item.title}
                  </h3>
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="font-mono text-[9px] font-black tracking-[0.16em] text-[#17151c]/40">
                        CONSTRAINT
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-[#5d5565]">
                        {item.constraint}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[9px] font-black tracking-[0.16em] text-[#17151c]/40">
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
                    코드와 기록 보기 ↗
                  </span>
                </>
              );

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-7 shadow-[8px_8px_0_#17151c] transition-transform hover:-translate-y-1"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>

        <div
          className="mt-24 overflow-hidden rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#17151c] p-7 text-[#fffaf0] shadow-[8px_8px_0_#17151c] md:p-10"
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
                만드는 협업 제안을 열어두고 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:hello@todari.dev?subject=Todari를%20보고%20연락드립니다"
                className="rounded-xl border-2 border-[#17151c] bg-[#dfff4f] px-5 py-3 text-sm font-black text-[#17151c] shadow-[4px_4px_0_#17151c] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
              >
                이메일 보내기 ↗
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
