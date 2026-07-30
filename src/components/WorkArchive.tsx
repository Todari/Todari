import { services } from "@/data/services";

const statusTone = {
  "운영 중": "text-emerald-300 bg-emerald-400/10 border-emerald-300/20",
  "개선 중": "text-sky-300 bg-sky-400/10 border-sky-300/20",
  "점검 중": "text-amber-300 bg-amber-400/10 border-amber-300/20",
} as const;

export default function WorkArchive() {
  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="relative z-20 overflow-hidden border-t border-white/10 bg-[#070711] px-5 py-24 md:px-10 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 18% 0%, rgba(168,85,247,.28), transparent 42%), radial-gradient(circle at 82% 10%, rgba(6,182,212,.18), transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl md:mb-20">
          <p className="mb-5 font-mono text-xs tracking-[0.28em] text-violet-300">
            ALL WORKS · 01—07
          </p>
          <h2
            id="works-heading"
            className="text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-6xl"
          >
            질문을 제품으로 바꾸고,
            <br />
            운영하며 다음 답을 찾습니다.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--text-secondary)] md:text-lg">
            Todari는 완성된 결과만 진열하는 포트폴리오보다, 질문이 실제
            서비스가 되는 과정과 낯선 기술을 배워 해결한 흔적을 함께 모은
            작업 아카이브에 가깝습니다.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.055] md:p-8"
            >
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-20"
                style={{ backgroundColor: service.color }}
              />

              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border text-xl"
                      style={{
                        backgroundColor: `${service.color}14`,
                        borderColor: `${service.color}33`,
                      }}
                    >
                      {service.icon}
                    </span>
                    <span className="font-mono text-xs text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusTone[service.status]}`}
                    >
                      {service.status}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/55">
                      {service.period}
                    </span>
                  </div>
                </div>

                <p
                  className="mb-3 text-sm font-medium"
                  style={{ color: service.color }}
                >
                  {service.subtitle}
                </p>
                <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-5 text-lg font-medium leading-7 text-white/85">
                  “{service.question}”
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  {service.description}
                </p>

                <dl className="mt-7 border-t border-white/10 pt-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <dt className="w-12 shrink-0 font-mono text-[10px] tracking-widest text-white/35">
                      ROLE
                    </dt>
                    <dd className="text-sm text-white/70">{service.role}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/[0.055] px-2 py-1 font-mono text-[10px] text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}, ${service.color}b8)`,
                    }}
                  >
                    {service.linkLabel ?? "서비스 보기"}
                    <span aria-hidden="true">↗</span>
                  </a>
                  {service.repository && service.repository !== service.url && (
                    <a
                      href={service.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
                    >
                      GitHub
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.24em] text-cyan-300">
              CONTINUE EXPLORING
            </p>
            <p className="mt-4 max-w-xl text-2xl font-medium leading-snug text-white md:text-3xl">
              더 궁금한 문제와 함께 만들 제품이 있다면 이야기해 주세요.
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
              href="#space-journey"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              우주 여행으로 돌아가기 ↑
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
