const journey = [
  {
    step: "01",
    title: "Service Planning",
    description:
      "1년 반 동안 사용자와 비즈니스의 문제를 정의하고, 개발자·디자이너와 같은 목표를 바라보는 법을 배웠습니다.",
  },
  {
    step: "02",
    title: "UI / UX Design",
    description:
      "아이디어를 화면과 흐름으로 구체화하기 위해 정보 구조와 인터페이스를 직접 설계하기 시작했습니다.",
  },
  {
    step: "03",
    title: "Frontend",
    description:
      "사용자가 실제로 만지는 경험을 끝까지 책임지고 싶어 React와 TypeScript를 익혀 개발자가 되었습니다.",
  },
  {
    step: "04",
    title: "AI-native Building",
    description:
      "지금은 AI를 학습 파트너이자 실행 도구로 활용해 백엔드·데이터·운영까지 문제 해결의 반경을 넓히고 있습니다.",
  },
] as const;

const strengths = [
  {
    label: "PROBLEM FIRST",
    title: "직무보다 문제를 먼저 봅니다.",
    description:
      "기획, 디자인, 개발 중 어느 한 영역의 답을 먼저 정하지 않습니다. 사용자와 팀이 겪는 문제를 이해하고 가장 실용적인 해법을 선택합니다.",
  },
  {
    label: "LEARN BY SHIPPING",
    title: "필요한 지식은 만들며 익힙니다.",
    description:
      "Web Audio, 실시간 동기화, 데이터 수집, 배포처럼 낯선 기술도 작은 가설과 검증 가능한 제품으로 빠르게 바꿉니다.",
  },
  {
    label: "AI AS LEVERAGE",
    title: "AI로 사고와 실행의 폭을 넓힙니다.",
    description:
      "문제·맥락·완료 기준을 먼저 설계하고 AI와 함께 탐색·구현합니다. 마지막 판단은 테스트, 실제 운영 데이터, 사용자 경험으로 검증합니다.",
  },
] as const;

const evidence = [
  {
    label: "DESIGN → SYSTEM",
    title: "React Pixel UI",
    description:
      "픽셀 아트라는 시각적 아이디어를 어떤 CSS에도 적용할 수 있는 React 라이브러리로 일반화했습니다.",
    facts: ["npm 패키지 배포", "회귀 테스트 122개", "PNG 출력 30–100× 최적화"],
    href: "https://github.com/Todari/react-pixel-ui",
  },
  {
    label: "LEARN → OPERATE",
    title: "메트로놈들",
    description:
      "Web Audio와 Socket.IO를 익혀 여러 기기의 박자를 맞추고, 운영 중 발견한 iOS 오디오·시계 보정 레이스를 반복해서 해결했습니다.",
    facts: ["다중 클라이언트 동기화", "iOS 오디오 호환", "실서비스 운영"],
    href: "https://github.com/Todari/metro-nomedeul",
  },
  {
    label: "PRODUCT → DELIVERY",
    title: "행동대장",
    description:
      "가입 없이 정산하는 제품 흐름과 UI를 만드는 데서 시작해, 이후 인증·분석·배포와 데이터 무결성 문제까지 책임 범위를 넓혔습니다.",
    facts: ["팀 제품 개발", "UI/UX·프론트엔드", "운영·배포 개선"],
    href: "https://github.com/Todari/2024-haeng-dong",
  },
  {
    label: "AI → WORKFLOW",
    title: "Todari Ops",
    description:
      "여러 서비스의 Sentry·CI·Vercel 알림을 AI 코드 세션, 사전 진단, 배포 후 점검, 지식 기록으로 연결한 개인 운영 시스템입니다.",
    facts: ["실패 자동 진단", "배포 smoke check", "지식 플라이휠"],
    href: undefined,
  },
] as const;

export default function MakerProfile() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-20 overflow-hidden bg-[#0b0b18] px-5 py-24 md:px-10 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(59,130,246,.18), transparent 28%), radial-gradient(circle at 88% 72%, rgba(168,85,247,.16), transparent 32%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <div>
            <p className="mb-5 font-mono text-xs tracking-[0.28em] text-cyan-300">
              ABOUT TODARI
            </p>
            <h2
              id="about-heading"
              className="text-balance text-4xl font-semibold leading-tight tracking-[-0.045em] text-white md:text-6xl"
            >
              기획에서 시작해,
              <br />
              필요한 기술을 배우며
              <br />
              제품을 만듭니다.
            </h2>
          </div>

          <div className="self-end">
            <p className="text-lg font-medium leading-8 text-white/85 md:text-xl">
              안녕하세요. 서비스 기획자로 첫 커리어를 시작해 디자인과
              프론트엔드를 익혀 개발자가 된 Todari입니다.
            </p>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
              서로 다른 분야의 지식을 빠르게 연결하고, 낯선 문제에도 필요한
              것을 배워 실제로 작동하는 답을 만드는 것이 강점입니다. 지금은
              AI를 잘 질문하고 검증하는 협업자로 활용해 혼자서도 더 넓은
              문제를 끝까지 해결하고 있습니다.
            </p>
          </div>
        </div>

        <ol className="mt-16 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] md:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {journey.map((item) => (
            <li
              key={item.step}
              className="border-b border-white/10 p-6 last:border-b-0 md:odd:border-r md:[&:nth-child(3)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span className="font-mono text-xs text-white/30">
                {item.step}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-24">
          <p className="font-mono text-xs tracking-[0.28em] text-violet-300">
            HOW I SOLVE
          </p>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {strengths.map((strength) => (
              <article
                key={strength.label}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-7"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/35">
                  {strength.label}
                </p>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.025em] text-white">
                  {strength.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                  {strength.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.28em] text-cyan-300">
                EVIDENCE, NOT CLAIMS
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
                배움은 결과물로 증명합니다.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--text-secondary)]">
              서로 다른 문제를 만날 때마다 필요한 기술을 선택했고, 출시 후
              발견한 문제까지 고치며 제 것으로 만들었습니다.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {evidence.map((item) => {
              const content = (
                <>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-white/35">
                    {item.label}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.facts.map((fact) => (
                      <li
                        key={fact}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/60"
                      >
                        {fact}
                      </li>
                    ))}
                  </ul>
                  {item.href && (
                    <span className="mt-7 inline-flex text-sm font-medium text-cyan-300">
                      코드와 기록 보기 ↗
                    </span>
                  )}
                </>
              );

              return item.href ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition-colors hover:border-cyan-300/25 hover:bg-white/[0.045]"
                >
                  {content}
                </a>
              ) : (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.025] p-7"
                >
                  {content}
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-24 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-violet-300">
                LET&apos;S TALK
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-5xl">
                문제를 함께 정의하고,
                <br />
                빠르게 제품으로 검증할 팀을 찾습니다.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] md:text-base">
                프로덕트 엔지니어·프론트엔드 포지션과 제품을 처음부터 함께
                만드는 협업 제안을 열어두고 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:rhymint@gmail.com?subject=Todari를%20보고%20연락드립니다"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#090914] transition-transform hover:-translate-y-0.5"
              >
                이메일 보내기 ↗
              </a>
              <a
                href="https://github.com/Todari"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white/75 transition-colors hover:border-white/30 hover:text-white"
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
