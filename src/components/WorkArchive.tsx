import Link from "next/link";
import { services, type Service } from "@/data/services";
import { workExperiences } from "@/data/work-experiences";
import { ExperienceSources } from "./WorkExperiences";

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
  const experiences = workExperiences[service.id];
  const [featured] = experiences;

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
        <div className="mb-5 flex flex-wrap gap-2">
          <span className={`rounded-full border-2 border-[#17151c] px-2.5 py-1 text-xs font-bold ${statusTone[service.status]}`}>
            {service.status}
          </span>
          <span className="rounded-full border-2 border-[#17151c] bg-white px-2.5 py-1 font-mono text-xs font-bold">
            {service.period}
          </span>
        </div>

        <p className="mb-2 text-sm font-bold text-[#5d5565]">
          {service.subtitle}
        </p>
        <h3 className="text-3xl font-black tracking-[-0.045em] md:text-4xl">
          {service.title}
        </h3>
        <dl className="mt-4 rounded-lg border border-[#17151c]/15 bg-[#efe7d8] px-3 py-2">
          <dt className="text-[10px] font-black text-[#5d5565]">맡은 역할</dt>
          <dd className="mt-1 break-keep text-sm font-bold leading-6 text-[#463f4c]">{service.role}</dd>
        </dl>
        <p className="mt-3 text-sm leading-6 text-[#5d5565]">
          {service.description}
        </p>

        <div className="mt-5 border-y border-[#17151c]/20 py-5">
          <p className="text-xs font-bold text-[#5b38b9]">{featured.category}</p>
          <h4 className="mt-2 break-keep text-lg font-black leading-snug">
            <Link href={`${service.caseStudy}#${featured.id}`} className="underline-offset-4 hover:underline">
              {featured.title}
            </Link>
          </h4>
          <p className="mt-2 break-keep text-sm leading-6 text-[#463f4c] [overflow-wrap:anywhere]">{featured.change}</p>
          <ExperienceSources experience={featured} />
        </div>

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
          <Link
            href={service.caseStudy}
            aria-label={`${service.title} 작업 ${experiences.length}건 보기`}
            className="neo-button inline-flex items-center gap-2 rounded-xl bg-[#dfff4f] px-4 py-2.5 text-sm font-black"
          >
            작업 {experiences.length}건 보기 <span aria-hidden="true">→</span>
          </Link>
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
          {service.publicRepository &&
            service.publicRepository !== service.url && (
            <a
              href={service.publicRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#17151c] bg-[#fffaf0] px-4 py-2.5 text-sm font-black shadow-[3px_3px_0_#17151c] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              공개 코드
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
      className="relative z-20 overflow-hidden border-t-[3px] border-[#17151c] bg-[#a78bfa] px-5 py-12 text-[#17151c] md:px-10 md:py-16"
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
        <h2 id="works-heading" className="sr-only">업데이트와 개선 사례</h2>
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
            <Link
              href="/"
              className="rounded-xl border-2 border-[#fffaf0] bg-[#17151c] px-5 py-3 text-sm font-bold text-[#fffaf0] shadow-[4px_4px_0_rgba(255,250,240,.28)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              3D 디스펜서로 돌아가기 ↑
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
