import Link from "next/link";
import type { WorkExperience } from "@/data/work-experiences";

export function ExperienceSources({ experience }: { experience: WorkExperience }) {
  if (experience.sources.length === 0) {
    return <p className="mt-4 text-xs text-[#5d5565]">구현 기록 비공개</p>;
  }

  return (
    <details className="mt-2">
      <summary className="w-fit cursor-pointer rounded-sm py-2 text-sm font-bold text-[#5b38b9] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
        출처 {experience.sources.length}개
        <span className="sr-only"> · {experience.title}</span>
      </summary>
      <ul className="mt-1 space-y-2 border-l-2 border-[#a78bfa] pl-4 text-sm leading-6">
        {experience.sources.map((source) => (
          <li key={source.href} className="[overflow-wrap:anywhere]">
            {source.href.startsWith("/") ? (
              <Link href={source.href} className="text-[#5b38b9] underline underline-offset-4">{source.label}</Link>
            ) : (
              <a href={source.href} className="text-[#5b38b9] underline underline-offset-4">{source.label}</a>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function WorkExperiences({ experiences }: { experiences: readonly WorkExperience[] }) {
  return (
    <section id="experiences" aria-labelledby="experiences-heading" className="scroll-mt-6">
      <h2 id="experiences-heading" className="text-3xl font-black tracking-tight">작업과 해결 과정</h2>
      <div className="mt-5 divide-y divide-[#17151c]/20 border-y border-[#17151c]/20">
        {experiences.map((experience) => (
          <article key={experience.id} id={experience.id} className="scroll-mt-6 py-7 md:grid md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-5">
            <p className="mb-2 text-sm font-bold text-[#5b38b9] md:mb-0 md:pt-1">{experience.category}</p>
            <div>
              <h3 className="break-keep text-xl font-black tracking-tight md:text-2xl">{experience.title}</h3>
              <dl className="mt-4 space-y-2 text-sm leading-7 text-[#463f4c] md:text-base">
                <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                  <dt className="font-bold text-[#17151c]">문제</dt>
                  <dd className="break-keep [overflow-wrap:anywhere]">{experience.problem}</dd>
                </div>
                <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                  <dt className="font-bold text-[#17151c]">변경</dt>
                  <dd className="break-keep [overflow-wrap:anywhere]">{experience.change}</dd>
                </div>
                {experience.verification && (
                  <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                    <dt className="font-bold text-[#17151c]">확인</dt>
                    <dd className="break-keep [overflow-wrap:anywhere]">{experience.verification}</dd>
                  </div>
                )}
              </dl>
              <ExperienceSources experience={experience} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
