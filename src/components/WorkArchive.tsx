import { services, type Service } from "@/data/services";

const statusTone = {
  "운영 중": "bg-[#dfff4f]",
  "개선 중": "bg-[#67e8f9]",
  "개발 중": "bg-[#ff79bd]",
  "점검 중": "bg-[#ffd166]",
} as const;

function WorkCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-6 transition-transform duration-200 hover:-translate-y-1 md:p-8 ${
        index % 2 === 0 ? "lg:rotate-[-0.5deg]" : "lg:rotate-[0.5deg]"
      }`}
      style={{ boxShadow: `8px 8px 0 ${service.color}` }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#17151c 1.4px, transparent 1.4px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-7 flex items-start justify-between gap-4">
          <span
            className="inline-flex h-10 items-center justify-center rounded-xl border-2 border-[#17151c] px-3 font-mono text-[9px] font-black tracking-[0.12em] shadow-[3px_3px_0_#17151c]"
            style={{ backgroundColor: service.color }}
          >
            PROJECT {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-wrap justify-end gap-2">
            <span
              className={`rounded-full border-2 border-[#17151c] px-2.5 py-1 text-[10px] font-black ${statusTone[service.status]}`}
            >
              {service.status}
            </span>
            <span className="rounded-full border-2 border-[#17151c] bg-white px-2.5 py-1 font-mono text-[10px] font-bold">
              {service.period}
            </span>
          </div>
        </div>

        <p className="mb-2 text-sm font-black" style={{ color: service.color }}>
          {service.subtitle}
        </p>
        <h3 className="text-3xl font-black tracking-[-0.045em] md:text-4xl">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[#5d5565]">
          {service.description}
        </p>

        <dl className="mt-5 divide-y-2 divide-[#17151c]/10 border-y-2 border-[#17151c]/15">
          {service.evidence.map((item, evidenceIndex) => (
            <div
              key={item.label}
              className="grid grid-cols-[4.5rem_1fr] gap-3 py-3"
            >
              <dt
                className="h-fit whitespace-nowrap rounded-md border border-[#17151c] px-1.5 py-1 text-center font-mono text-[9px] font-black tracking-[0.08em]"
                style={{
                  backgroundColor: ["#ff79bd", "#67e8f9", "#dfff4f"][
                    evidenceIndex
                  ],
                }}
              >
                {item.label}
              </dt>
              <dd className="text-sm font-medium leading-6 text-[#463f4c]">
                {item.text}
              </dd>
            </div>
          ))}
        </dl>

        <dl className="mt-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <dt className="w-12 shrink-0 font-mono text-[10px] font-black tracking-widest text-[#17151c]/40">
              OWNED
            </dt>
            <dd className="text-sm font-medium text-[#463f4c]">{service.role}</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[#17151c]/20 bg-[#efe7d8] px-2 py-1 font-mono text-[10px] font-bold text-[#544c5c]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          {service.url ? (
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#17151c] px-4 py-2.5 text-sm font-black text-[#17151c] shadow-[4px_4px_0_#17151c] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
              style={{ backgroundColor: service.color }}
            >
              {service.linkLabel ?? "서비스 보기"}
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="inline-flex items-center rounded-xl border-2 border-[#17151c] bg-[#17151c] px-4 py-2.5 font-mono text-[10px] font-black tracking-[0.1em] text-[#fffaf0]">
              PRIVATE WORK · 일부 정보 비공개
            </span>
          )}
          {service.repository && service.repository !== service.url && (
            <a
              href={service.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#17151c] bg-[#fffaf0] px-4 py-2.5 text-sm font-black shadow-[3px_3px_0_#17151c] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function WorkArchive() {
  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="relative z-20 overflow-hidden border-t-[3px] border-[#17151c] bg-[#a78bfa] px-5 py-24 text-[#17151c] md:px-10 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-36 h-64 w-64 rotate-[-12deg] rounded-full opacity-20"
        style={{
          backgroundImage: "radial-gradient(#17151c 1.4px, transparent 1.4px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-[42rem] h-44 w-44 rotate-12 rounded-3xl border-[3px] border-[#17151c] bg-[#dfff4f] opacity-80"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl md:mb-20">
          <p className="mb-6 inline-flex rotate-[-2deg] items-center rounded-full border-2 border-[#17151c] bg-[#ff79bd] px-4 py-2 font-mono text-[10px] font-black tracking-[0.22em] shadow-[3px_3px_0_#17151c] md:text-xs">
            ALL WORKS · 01—{String(services.length).padStart(2, "0")}
          </p>
          <h2
            id="works-heading"
            className="text-balance text-4xl font-black leading-[1.05] tracking-[-0.055em] md:text-6xl"
          >
            질문을 제품으로 바꾸고,
            <br />
            운영하며 다음 답을 찾습니다.
          </h2>
          <p className="mt-8 max-w-2xl rotate-[0.5deg] rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-5 text-base leading-7 text-[#544c5c] shadow-[8px_8px_0_#17151c] md:p-6 md:text-lg">
            기술적 깊이와 제품의 재미를 따로 나누지 않습니다. 서로 다른
            문제를 구조화하고, 실제 서비스로 출시하고, 운영에서 발견한
            실패를 다음 개선으로 연결한 {services.length}개의 프로젝트입니다.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {services.map((service, index) => (
            <WorkCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div
          className="mt-20 grid gap-8 rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#17151c] p-7 text-[#fffaf0] shadow-[8px_8px_0_#17151c] md:grid-cols-[1fr_auto] md:items-end md:p-10"
          style={{
            backgroundImage: "radial-gradient(rgba(255,250,240,.17) 1.2px, transparent 1.4px)",
            backgroundSize: "22px 22px",
          }}
        >
          <div>
            <p className="inline-flex rotate-[-1deg] items-center rounded-full border-2 border-[#17151c] bg-[#67e8f9] px-4 py-2 font-mono text-[10px] font-black tracking-[0.2em] text-[#17151c] shadow-[3px_3px_0_#17151c] md:text-xs">
              CONTINUE EXPLORING
            </p>
            <p className="mt-6 max-w-xl text-2xl font-black leading-snug md:text-3xl">
              더 궁금한 문제와 함께 만들 제품이 있다면 이야기해 주세요.
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
              href="#space-journey"
              className="rounded-xl border-2 border-[#fffaf0] bg-[#17151c] px-5 py-3 text-sm font-bold text-[#fffaf0] shadow-[4px_4px_0_rgba(255,250,240,.28)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              3D 디스펜서로 돌아가기 ↑
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
