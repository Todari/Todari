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
    title: "Product Operations & Growth",
    description:
      "출시 이후 검색 발견성, 사용자 행동, 운영 오류를 함께 관측합니다. SEO·GEO·GA4·Search Console·서치어드바이저의 신호를 다음 제품 판단과 개선으로 연결합니다.",
  },
] as const;

const capabilityColors = ["#dfff4f", "#67e8f9", "#ff79bd", "#a78bfa"] as const;

const productOperatingLoop = [
  {
    step: "01",
    label: "DEFINE",
    title: "문제와 성공 기준",
    description:
      "PO 경험을 바탕으로 고객·사업 문제를 가설과 KPI로 바꾸고, 지금 검증할 범위와 우선순위를 정합니다.",
    signals: ["Problem", "Hypothesis", "KPI"],
    color: "#dfff4f",
  },
  {
    step: "02",
    label: "SHIP",
    title: "직접 제품으로 출시",
    description:
      "UX와 도메인 흐름부터 클라이언트·서버·데이터·배포까지 연결해 실제 사용 가능한 제품으로 만듭니다.",
    signals: ["UX", "System", "Delivery"],
    color: "#67e8f9",
  },
  {
    step: "03",
    label: "MEASURE",
    title: "발견성과 행동을 관측",
    description:
      "GA4의 이벤트·퍼널, Search Console·서치어드바이저의 색인·검색 신호, GEO의 AI 답변·인용 흐름을 함께 봅니다.",
    signals: ["GA4", "SEO · GEO", "Search Signals"],
    color: "#ff79bd",
  },
  {
    step: "04",
    label: "IMPROVE",
    title: "다음 판단으로 환류",
    description:
      "검색 노출·제품 퍼널·운영 오류에서 얻은 신호를 백로그, 실험, 자동화로 바꿔 다음 개선까지 이어갑니다.",
    signals: ["Backlog", "Experiment", "Automation"],
    color: "#a78bfa",
  },
] as const;

const engineeringLoop = [
  { step: "01", label: "CONTEXT", color: "#67e8f9" },
  { step: "02", label: "AI BUILD", color: "#ff79bd" },
  { step: "03", label: "VERIFY", color: "#dfff4f" },
  { step: "04", label: "CI / CD", color: "#a78bfa" },
  { step: "05", label: "SMOKE", color: "#67e8f9" },
  { step: "06", label: "OPS", color: "#ff79bd" },
] as const;

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
    label: "EXTERNAL API AT SCALE",
    title: "수천 계정의 외부 API를 정책 안에서 운영합니다.",
    constraint:
      "4,800여 개 인스타그램 계정의 수집과 DM·댓글 자동 실행을, 토큰 만료와 Meta 정책·레이트리밋이라는 통제 불가능한 조건 위에서 운영해야 했습니다.",
    decision:
      "웹훅 서명 검증 → 이벤트 분류 → 모더레이션·자동 DM 실행의 단일 인입 파이프라인을 만들고, 토큰 상태 머신과 서킷 브레이커로 외부 장애가 사용자 의도 상태를 덮어쓰지 못하게 격리했습니다.",
    facts: ["IG 계정 4,800+ 연동", "자동 DM 8.8만+ 건", "댓글 535만 건 수집"],
    href: "https://forcreator.co.kr",
    linkLabel: "Forcletter · 서비스 보기",
  },
  {
    label: "DATA AT SCALE",
    title: "5,000만 행 시계열을 일상 조회가 가능한 상태로 유지합니다.",
    constraint:
      "계정·미디어 메트릭을 주기 수집하면 스냅샷 테이블이 수천만 행으로 자라고, 통계·리포트 조회는 매일 그 위에서 돌아야 했습니다.",
    decision:
      "35개 크론 잡이 중복 실행 락 아래에서 수집하고, 조회 패턴에 맞춘 복합 인덱스와 기간 집계 쿼리로 성장·활성·리텐션 통계를 운영 DB에서 직접 제공합니다.",
    facts: ["메트릭 스냅샷 5,000만+ 행", "복합 인덱스 설계", "크론 잡 35개 · 실행 락"],
    href: "https://forcreator.co.kr",
    linkLabel: "Forcletter · 서비스 보기",
  },
  {
    label: "ZERO-DOWNTIME OPS",
    title: "배포와 장애 대응이 사용자에게 보이지 않게 합니다.",
    constraint:
      "단일 EC2 위의 운영 서비스라 배포 중단이 곧 사용자 장애였고, 경보가 없거나 너무 많으면 실제 사고를 놓치게 됩니다.",
    decision:
      "비활성 슬롯 기동 → 헬스체크 → Nginx upstream 전환의 blue-green 배포를 직접 구축했습니다. Loki·Grafana 관측성 위에 등급·스로틀 정책이 있는 Slack 경보와 fail-closed Sentry 브리지로 장애 신호를 관리합니다.",
    facts: ["Blue-green 무중단 배포", "Loki·Grafana 관측성", "경보 등급·스로틀 정책"],
    href: "https://forcreator.co.kr",
    linkLabel: "Forcletter · 서비스 보기",
  },
  {
    label: "DELIVERY PIPELINE",
    title: "커밋부터 배포·롤백까지 재현 가능하게 만듭니다.",
    constraint:
      "웹·관리자·모바일 앱·API·스케줄러가 한 모노레포에서 서로 다른 대상(Vercel·EC2 컨테이너)으로 나가야 했고, 프로덕션 반영은 언제든 되돌릴 수 있어야 했습니다.",
    decision:
      "CI 검증을 통과한 커밋만 GHCR 이미지로 빌드해 환경별 EC2에 배포합니다. 프로덕션은 승인 게이트를 거치고, 모든 배포가 이미지 태그 기반이라 같은 스크립트로 특정 태그로의 롤백이 가능합니다.",
    facts: ["GitHub Actions → GHCR → EC2", "프로덕션 승인 게이트", "태그 기반 배포·롤백"],
    href: "https://forcreator.co.kr",
    linkLabel: "Forcletter · 서비스 보기",
  },
  {
    label: "PAYMENTS & IDEMPOTENCY",
    title: "돈이 오가는 흐름은 멱등하게 설계합니다.",
    constraint:
      "구독 결제·환불·쿠폰 이벤트가 웹훅으로 비동기 도착하고, 재시도와 중복 이벤트가 이중 청구나 이중 환불로 이어지면 안 됐습니다.",
    decision:
      "결제·환불 이벤트를 단일 웹훅 인입점에서 분류해 처리하고, 환불 실행은 멱등 키 테이블로 중복을 차단했습니다. 결제 이력과 구독 상태를 분리해 상태 전이를 추적 가능하게 유지합니다.",
    facts: ["정기결제 웹훅 처리", "환불 멱등 키 설계", "결제 이력·구독 상태 분리"],
    href: "https://forcreator.co.kr",
    linkLabel: "Forcletter · 서비스 보기",
  },
  {
    label: "AI PRODUCT ENGINEERING",
    title: "AI의 판단과 실행 사이에 경계를 설계합니다.",
    constraint:
      "AI 에이전트가 계정 분석을 넘어 DM 발송 같은 실행까지 다루면, 잘못된 호출 하나가 실제 사용자에게 그대로 도달합니다.",
    decision:
      "도구 레지스트리로 조회와 실행을 분리하고, 실행형 액션은 1회용·TTL·소유자 고정의 무결성 경계를 가진 승인 큐를 통과해야만 수행됩니다. LLM은 멀티 프로바이더 추상화 뒤에 두고 few-shot 예제를 데이터로 관리합니다.",
    facts: ["실행 승인 큐 · 1회용·TTL", "도구 레지스트리 분리", "멀티 프로바이더 LLM 계층"],
    href: "https://forcreator.co.kr",
    linkLabel: "Forcletter · 서비스 보기",
  },
  {
    label: "INCIDENT RESPONSE",
    title: "장애는 복구로 끝내지 않고 시스템으로 되돌립니다.",
    constraint:
      "서비스 10여 개가 올라간 단일 EC2가 새벽 메모리 포화(OOM)로 응답 불능이 됐고, 사람이 자는 시간이라 감지도 복구도 늦었습니다.",
    decision:
      "복구 후 원인(스왑 없는 메모리 포화)을 제거하고, 메모리·스왑 임계 조기 경보와 CloudWatch 상태 검사 실패 시 자동 재부팅·복구, 재부팅 감지 통지까지 붙여 같은 장애가 사람 없이 끝나도록 만들었습니다.",
    facts: ["새벽 OOM → 원인 제거", "CloudWatch 자동 복구", "임계 조기 경보·재부팅 통지"],
    href: "https://github.com/Todari/todari-ops",
    linkLabel: "Todari Ops · 공개 코드 보기",
  },
  {
    label: "REALTIME SYNC",
    title: "떨어져 있는 기기들의 박자를 하나로 맞춥니다.",
    constraint:
      "네트워크 지연과 서로 다른 오디오 시계를 가진 기기들이 각자의 이어폰에서 같은 클릭을 재생해야 했습니다.",
    decision:
      "RTT/2 표본의 중앙값으로 서버 시각 오프셋을 추정하고, Web Audio 50ms 선행 스케줄링으로 네트워크와 재생을 분리했습니다. iOS 오디오 활성화·재접속·방 상태 동기화의 경합은 복구 가능한 상태 전이로 정리했습니다.",
    facts: ["RTT 중앙값 오프셋 추정", "50ms 선행 스케줄링", "재접속·iOS 복구"],
    href: "https://github.com/Todari/metro-nomedeul",
    linkLabel: "메트로놈들 · 공개 코드 보기",
  },
  {
    label: "FRONTEND INFRA",
    title: "프레임워크를 깨지 않는 렌더링 계층을 설계합니다.",
    constraint:
      "기존 DOM과 CSS 레이아웃을 훼손하지 않으면서 배경·테두리·모서리·그림자를 픽셀 아트로 변환해야 했습니다.",
    decision:
      "Canvas 없이 clip-path 폴리곤과 합성 PNG 데이터 URL로 변환 계층을 설계해 SSR을 유지했습니다. RGBA 그라디언트는 의존성 없는 deflate 인코더로 직접 압축하고, 테마·hover·focus·크기 변화는 자동으로 재계산됩니다.",
    facts: ["npm 패키지 배포", "회귀 테스트 161개", "PNG 출력 30–100× 최적화"],
    href: "https://github.com/Todari/react-pixel-ui",
    linkLabel: "React Pixel UI · 공개 코드 보기",
  },
  {
    label: "VERIFIED EXECUTION",
    title: "실행이 위험한 시스템은 검증 체계부터 만듭니다.",
    constraint:
      "실시간 틱과 호가 데이터에서 판단을 만들되, 잘못된 진입·중복 주문·연결 단절이 실제 실행으로 번지지 않게 제어해야 했습니다.",
    decision:
      "규칙 기반 엔진을 중심에 두고 LLM은 제한적인 VETO로 격리했습니다. 결정론적 룰 선택기와 데이 리플레이 시뮬레이터로 라이브·시뮬레이션 동형성을 검증하고, 드리프트 감지와 킬 스위치로 실행을 제어합니다.",
    facts: ["결정론적 룰 + LLM VETO", "데이 리플레이 백테스트", "드리프트 감지·Kill Switch"],
    href: "https://trade-tower.vercel.app",
    linkLabel: "Trade Tower · 프로젝트 보기",
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
              실시간·데이터 시스템과 AI 개발 하네스를 설계하고 운영하면서,
              작은 불편과 호기심도 직접 제품으로 검증하는 Product Engineer
              Todari입니다.
            </p>
            <p className="mt-5 text-base leading-7 text-[#5d5565]">
              PO로 문제와 성공 기준을 정의하고, 도메인 흐름·상태 전이·API
              계약을 직접 제품으로 구현합니다. 출시 후에는 검색 발견성,
              사용자 행동, 장애와 배포 신호를 관측해 다음 제품 판단과
              개선으로 되돌립니다.
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
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="inline-flex rotate-[1deg] items-center rounded-full border-2 border-[#17151c] bg-[#dfff4f] px-4 py-2 font-mono text-[10px] font-black tracking-[0.2em] shadow-[3px_3px_0_#17151c] md:text-xs">
                WHAT I OWN · PRODUCT OPERATING LOOP
              </p>
              <h2 className="mt-6 text-balance text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-6xl">
                출시가 끝이 아니라,
                <br />
                다음 판단이 시작되도록 만듭니다.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#5d5565] lg:justify-self-end">
              PO로 문제와 우선순위를 정의하고, 개발자로 제품을 출시하며,
              SEO·GEO·GA4·Search Console·네이버 서치어드바이저의 신호로
              발견 가능성과 사용자 흐름을 계속 개선합니다.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {productOperatingLoop.map((item) => (
              <li
                key={item.step}
                className="flex min-h-[20rem] flex-col rounded-[1.25rem] border-[3px] border-[#17151c] p-6 shadow-[7px_7px_0_#17151c]"
                style={{ backgroundColor: item.color }}
              >
                <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-black tracking-[0.16em]">
                  <span>{item.step}</span>
                  <span className="rounded-full border-2 border-[#17151c] bg-[#fffaf0] px-3 py-1.5">
                    {item.label}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-black tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#463f4c]">
                  {item.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {item.signals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-md border-2 border-[#17151c]/70 bg-[#fffaf0]/80 px-2.5 py-1 font-mono text-[9px] font-black tracking-[0.04em]"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-7 shadow-[7px_7px_0_#67e8f9]">
              <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#17151c]/50">
                OPERATING EVIDENCE 01 · GEO DASHBOARD
              </p>
              <h3 className="mt-4 text-2xl font-black tracking-[-0.035em]">
                검색과 AI 답변 속 브랜드 가시성을 행동으로 바꿉니다.
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#544c5c]">
                검색 노출과 AI 답변의 인용·출처·질문별 성과를 정규화하고,
                상태 → 원인 → 다음 행동으로 이어지는 모니터링 흐름을
                설계했습니다.
              </p>
            </article>

            <article className="rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#ffcae5] p-7 shadow-[7px_7px_0_#a78bfa]">
              <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#17151c]/50">
                OPERATING EVIDENCE 02 · TODARI.DEV
              </p>
              <h3 className="mt-4 text-2xl font-black tracking-[-0.035em]">
                제품·검색·배포 신호를 한 운영 루프로 연결합니다.
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#544c5c]">
                메타데이터·canonical·JSON-LD·sitemap, GA 이벤트,
                Search Console·서치어드바이저의 색인과 검색 가시성,
                배포·오류 신호를 함께 관리하며 개선점을 찾습니다.
              </p>
            </article>
          </div>
        </div>

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
                Claude·Codex가 코드를 생성하는 데서 끝나지 않도록, 레포
                컨텍스트 주입부터 검증·배포·운영 신호까지 하나의 자동화
                흐름으로 연결했습니다.
              </p>
            </div>

            <div className="rounded-[1rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-4 text-[#17151c] shadow-[6px_6px_0_#5d4c7d] md:p-6">
              <p className="font-mono text-[9px] font-black tracking-[0.18em] text-[#17151c]/45">
                AI → AUTOMATION → OPERATIONS
              </p>
              <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {engineeringLoop.map((item) => (
                  <li
                    key={item.step}
                    className="rounded-xl border-2 border-[#17151c] px-2 py-3 text-center shadow-[3px_3px_0_#17151c]"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="block font-mono text-[8px] font-black tracking-[0.08em] text-[#17151c]/45">
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
                    {item.linkLabel} ↗
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
