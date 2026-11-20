import Link from "next/link";
import { getProjectHighlight } from "@/data/project-highlights";
import type { Service } from "@/data/services";
import { workExperiences, type DesignReasoning, type WorkExperience } from "@/data/work-experiences";

const sourceLinkClass = "inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-[#2347b7] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4";

export function ExperienceSources({ experience }: { experience: WorkExperience }) {
  if (experience.sources.length === 0) {
    return <p className="mt-4 text-sm text-slate-600">구현 기록 비공개</p>;
  }

  const primary = experience.sources.find(({ href }) => href.includes("/pull/")) ?? experience.sources[0];
  const more = experience.sources.filter((source) => source !== primary);
  return (
    <div className="mt-2 flex flex-wrap items-baseline gap-x-5">
      <Link href={primary.href} className={sourceLinkClass}>{primary.label} {primary.href.startsWith("/") ? "›" : "↗"}</Link>
      {more.length > 0 && (
        <details>
          <summary className="w-fit cursor-pointer rounded-sm py-3 text-sm font-semibold text-slate-600 hover:underline focus-visible:outline-2">
            관련 근거 {more.length}개<span className="sr-only"> · {experience.title}</span>
          </summary>
          <ul className="border-l border-slate-200 pl-3">
            {more.map(({ href, label }) => (
              <li key={href}><Link href={href} className={sourceLinkClass}>{label} {href.startsWith("/") ? "›" : "↗"}</Link></li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export function CasePrinciple({ project }: { project: Service["id"] }) {
  return <DesignNote {...getProjectHighlight(project)} />;
}

function DesignNote({ principle, tradeoff, reference }: DesignReasoning) {
  return (
    <aside aria-label="설계 원리" className="my-4 rounded-xl bg-[#f1f5fb] px-4 py-3 text-sm leading-6 text-slate-700">
      <strong className="block break-keep text-slate-900">{principle}</strong>
      <p className="mt-1 break-keep">{tradeoff}</p>
      <a href={reference.href} className={sourceLinkClass}>{reference.label} ↗</a>
    </aside>
  );
}

export default function WorkExperiences({ project }: { project: Service["id"] }) {
  const experiences: readonly WorkExperience[] = workExperiences[project];
  const featured = getProjectHighlight(project).experience;
  return (
    <section id="experiences" aria-labelledby="experiences-heading" className="scroll-mt-6 text-slate-900">
      <h2 id="experiences-heading" className="text-3xl font-semibold tracking-tight">작업과 해결 과정</h2>
      <details className="mt-3 rounded-xl bg-[#f3f6fb] px-4 text-sm">
        <summary className="w-fit cursor-pointer py-3 font-semibold text-[#2347b7]">작업 {experiences.length}건 목차</summary>
        <ul className="divide-y divide-slate-200 border-t border-slate-200 pb-1">
          {experiences.map(({ id, title }) => (
            <li key={id}><a href={`#${id}`} className={sourceLinkClass}>{title}</a></li>
          ))}
        </ul>
      </details>
      <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
        {experiences.map((experience) => (
          <article key={experience.id} id={experience.id} className="scroll-mt-6 py-7 md:grid md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-5 md:py-9">
            <p className="mb-2 text-sm font-medium text-slate-600 md:mb-0 md:pt-1">{experience.category}</p>
            <div>
              <h3 className="break-keep text-xl font-semibold tracking-tight md:text-2xl">{experience.title}</h3>
              <dl className="mt-4 space-y-2 text-sm leading-7 text-slate-700 md:text-base">
                <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                  <dt className="font-semibold text-slate-900">제약</dt>
                  <dd className="break-keep [overflow-wrap:anywhere]">{experience.problem}</dd>
                </div>
                <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                  <dt className="font-semibold text-slate-900">판단</dt>
                  <dd className="break-keep [overflow-wrap:anywhere]">{experience.change}</dd>
                </div>
                {experience.verification && (
                  <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                    <dt className="font-semibold text-slate-900">검증</dt>
                    <dd className="break-keep [overflow-wrap:anywhere]">{experience.verification}</dd>
                  </div>
                )}
              </dl>
              {experience.principle !== undefined ? <DesignNote {...experience} /> : experience.id === featured.id && <CasePrinciple project={project} />}
              <ExperienceSources experience={experience} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
