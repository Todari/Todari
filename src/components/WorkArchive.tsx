import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getProjectHighlight } from "@/data/project-highlights";
import { services, type Service } from "@/data/services";
import { workExperiences } from "@/data/work-experiences";
import styles from "./WorkArchive.module.css";

function WorkCard({ service }: { service: Service }) {
  const experiences = workExperiences[service.id];
  const { experience: featured, proof } = getProjectHighlight(service.id);
  const related = experiences.find((item) => item.id !== featured.id && "principle" in item);
  const pullRequest = featured.sources.find(({ href }) => href.includes("/pull/"));
  const source = pullRequest ?? featured.sources[0];

  return (
    <article className={styles.card} aria-labelledby={`work-${service.id}`}>
      <div className={styles.identity}>
        <Image
          className={styles.model}
          style={{ "--project-color": service.color } as CSSProperties}
          src={`/work/models/${service.id}.webp`}
          alt=""
          width={160}
          height={160}
          unoptimized
        />
        <div>
          <h3 id={`work-${service.id}`} className={styles.title}>
            <Link href={service.caseStudy}>{service.title}</Link>
          </h3>
          <p className={styles.subtitle}>{service.subtitle}</p>
        </div>
      </div>

      <div className={styles.featured}>
        <h4 className={styles.caseTitle}>
          <Link href={`${service.caseStudy}#${featured.id}`}>{featured.title}</Link>
        </h4>
        <p className={styles.proof}>{proof}</p>
        {related && (
          <Link className="mt-1 inline-flex w-fit items-baseline gap-1 py-2 text-sm font-semibold text-[#2347b7]" href={`${service.caseStudy}#${related.id}`}>
            {related.title} <span aria-hidden="true">›</span>
          </Link>
        )}
      </div>

      <div className={styles.actions}>
        <Link href={`${service.caseStudy}#experiences`} aria-label={`${service.title} 작업 ${experiences.length}건 보기`}>
          작업 {experiences.length}건 <span aria-hidden="true">→</span>
        </Link>
        {source ? (
          <Link href={source.href} aria-label={`${service.title} · ${source.label}`}>
            {pullRequest ? `${pullRequest.label.split(" · ")[0]} PR` : "근거"} <span aria-hidden="true">{source.href.startsWith("/") ? "›" : "↗"}</span>
          </Link>
        ) : (
          <p>근거 비공개</p>
        )}
        {service.url && (
          <a href={service.url} target="_blank" rel="noopener noreferrer" aria-label={`${service.title} 서비스 보기 (새 탭)`}>
            서비스 <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function WorkArchive() {
  return (
    <section id="works" aria-labelledby="works-heading" className="scroll-mt-6">
      <h2 id="works-heading" className="mb-3 text-2xl font-bold tracking-tight">프로젝트 목록</h2>
      <div className={styles.grid}>
        {services.map((service) => <WorkCard key={service.id} service={service} />)}
      </div>
      <div className={styles.footer}>
        <a href="mailto:hello@todari.dev?subject=Todari를%20보고%20연락드립니다">
          이메일 보내기 <span aria-hidden="true">↗</span>
        </a>
        <Link href="/">포트폴리오 홈 <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
