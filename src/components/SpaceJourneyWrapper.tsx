"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { getProjectHighlight } from "@/data/project-highlights";
import { services, type Service } from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import styles from "./ProjectExplorer.module.css";

const ProjectDispenser = dynamic(() => import("./ProjectDispenser"), {
  ssr: false,
});

const legacyProjectLinks = [
  { id: "jeongpyo-case", title: "이정표", caseStudy: "/work/jeongpyo" },
  { id: "toksai-case", title: "톡사이", caseStudy: "/work/toksai#attempt-owned-results" },
];

function subscribeToHash(sync: () => void) {
  window.addEventListener("hashchange", sync);
  window.addEventListener("popstate", sync);
  return () => {
    window.removeEventListener("hashchange", sync);
    window.removeEventListener("popstate", sync);
  };
}

function getHash() {
  return window.location.hash;
}

function getStageTitle(service: Service) {
  return service.id === "forcletter" ? "포크레터" : service.title;
}

function ProjectCase({ service, active }: { service: Service; active: boolean }) {
  const { experience, decision, proof, principle } = getProjectHighlight(service.id);
  const { publicRepository, url } = service;
  const pullRequestPrefix = `${publicRepository}/pull/`;
  const pullRequest = publicRepository && experience.sources.find(({ href }) =>
    href.startsWith(pullRequestPrefix) && /^\d+$/.test(href.slice(pullRequestPrefix.length)),
  );
  const headingId = `project-heading-${service.id}`;

  return (
    <article className={styles.case} aria-labelledby={headingId} inert={!active}>
      <div className={styles.caseContent}>
        <header>
          <h3 id={headingId}>{getStageTitle(service)}</h3>
          <p className={styles.subtitle}>{service.subtitle}</p>
        </header>
        <div className={styles.caseSummary}>
          <h4>{experience.title}</h4>
          <dl className={styles.caseRows}>
            <div><dt>설계 원리</dt><dd>{principle}</dd></div>
            <div><dt>판단</dt><dd>{decision}</dd></div>
            <div><dt>근거</dt><dd>{proof}</dd></div>
          </dl>
        </div>
      </div>
      <footer className={styles.caseFooter}>
        <Link href={`${service.caseStudy}#${experience.id}`} prefetch={active ? null : false} className={styles.casePrimary}>
          사례 자세히 보기 <Chevron />
        </Link>
        <div className={styles.caseSources}>
          <Link href={service.caseStudy} prefetch={active ? null : false}>프로젝트 소개</Link>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.serviceLink}
              onClick={() => trackEvent("click_service_link", {
                service_id: service.id,
                service_title: service.title,
                service_url: url,
              })}
            >
              {service.linkLabel ?? "서비스 보기"} <span aria-hidden="true">↗</span>
            </a>
          )}
          {pullRequest && (
            <a href={pullRequest.href} title={pullRequest.label} target="_blank" rel="noopener noreferrer" className={styles.prLink}>
              GitHub PR #{pullRequest.href.split("/").at(-1)} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </footer>
    </article>
  );
}

function Chevron({ left = false }: { left?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={left ? "m10 3-5 5 5 5" : "m6 3 5 5-5 5"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SpaceJourneyWrapper() {
  const hash = useSyncExternalStore(subscribeToHash, getHash, () => "");
  const activeIndex = Math.max(0, services.findIndex(({ id }) => `#${id}` === hash));
  const activeService = services[activeIndex];
  const stageRef = useRef<HTMLDivElement>(null);
  const viewed = useRef(new Set<string>());
  const [stageVisibility, setStageVisibility] = useState<"pending" | "active" | "idle">("pending");

  const selectProject = useCallback((index: number) => {
    const next = services[index];
    if (!next || window.location.hash === `#${next.id}`) return;
    window.history.pushState(null, "", `#${next.id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);

  useEffect(() => {
    const legacyProject = legacyProjectLinks.find(({ id }) => `#${id}` === hash);
    if (legacyProject) window.location.replace(legacyProject.caseStudy);
  }, [hash]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => {
      setStageVisibility((previous) => entry.isIntersecting ? "active" : previous === "pending" ? "pending" : "idle");
    }, { rootMargin: "160px" });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (stageVisibility !== "active" || viewed.current.has(activeService.id)) return;
    viewed.current.add(activeService.id);
    trackEvent("view_section", { section_name: activeService.id });
  }, [activeService.id, stageVisibility]);

  return (
    <div id="space-journey" className={styles.explorer}>
      {services.map(({ id }) => <span key={id} id={id} className={styles.anchor} aria-hidden="true" />)}
      {legacyProjectLinks.map(({ id, caseStudy, title }) => (
        <a key={id} id={id} href={caseStudy} className={styles.legacyProjectLink}>
          {title} 프로젝트 보기
        </a>
      ))}
      <noscript>
        <ul className={styles.fallbackProjects} aria-label="프로젝트 소개">
          {services.map((service) => (
            <li key={service.id}><a href={service.caseStudy}>{getStageTitle(service)}</a></li>
          ))}
        </ul>
      </noscript>
      <div
        className={styles.switcher}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          const buttons = Array.from(event.currentTarget.querySelectorAll("button"));
          const focusedIndex = buttons.findIndex((button) => button === event.target);
          const next = (focusedIndex < 0 ? activeIndex : focusedIndex) + (event.key === "ArrowLeft" ? -1 : 1);
          if (!buttons[next]) return;
          event.preventDefault();
          selectProject(next);
          if (focusedIndex >= 0) buttons[next].focus({ preventScroll: true });
        }}
      >
        <div className={styles.projectList} role="group" aria-label="프로젝트 선택">
          {services.map((service, index) => (
            <button
              key={service.id}
              type="button"
              aria-pressed={index === activeIndex}
              aria-controls="project-case"
              onClick={() => selectProject(index)}
            >
              <span className={styles.dot} style={{ backgroundColor: service.color }} aria-hidden="true" />
              {getStageTitle(service)}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <div ref={stageRef} className={styles.stage} style={{ "--project-color": activeService.color } as CSSProperties}>
          <Image
            src={`/work/models/${activeService.id}.webp`}
            alt=""
            fill
            sizes="(min-width: 768px) 22rem, 100vw"
            unoptimized
            className={styles.stagePoster}
          />
          {stageVisibility !== "pending" && (
            <ProjectDispenser activeIndex={activeIndex} onSelect={selectProject} inView={stageVisibility === "active"} />
          )}
          <div className={styles.projectArrows} role="group" aria-label="이전 또는 다음 프로젝트 선택">
            <button type="button" aria-label="이전 프로젝트" aria-controls="project-case" disabled={activeIndex === 0} onClick={() => selectProject(activeIndex - 1)}><Chevron left /></button>
            <button type="button" aria-label="다음 프로젝트" aria-controls="project-case" disabled={activeIndex === services.length - 1} onClick={() => selectProject(activeIndex + 1)}><Chevron /></button>
          </div>
        </div>
        <div id="project-case" className={styles.caseDeck}>
          {services.map((service, index) => (
            <ProjectCase key={service.id} service={service} active={index === activeIndex} />
          ))}
        </div>
      </div>
      <p className="sr-only" role="status">선택한 프로젝트 {getStageTitle(activeService)}</p>
    </div>
  );
}
