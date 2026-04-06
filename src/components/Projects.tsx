"use client";

import AnimatedSection from "./AnimatedSection";
import GlassCard from "./GlassCard";
import {
  projects,
  categoryLabels,
  categoryColors,
  type Highlight,
} from "@/data/projects";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="inline-block ml-1"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CategoryBadge({ category }: { category: Highlight["category"] }) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded-md uppercase tracking-wider shrink-0"
      style={{
        color: categoryColors[category],
        border: `1px solid ${categoryColors[category]}33`,
        background: `${categoryColors[category]}10`,
      }}
    >
      {categoryLabels[category]}
    </span>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text inline-block">
            Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] rounded-full mb-16" />
        </AnimatedSection>

        <div className="flex flex-col gap-16">
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 0.1}>
              <GlassCard className="p-8 md:p-10" hover={false}>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                        {project.title}
                      </h3>
                      <span className="text-xs text-[var(--text-secondary)] font-mono">
                        {project.period}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--accent-cyan)] font-medium">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">
                      {project.role}
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neu-btn px-4 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        GitHub <ArrowIcon />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neu-btn px-4 py-2 text-xs gradient-text"
                      >
                        Demo <ArrowIcon />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Contribution */}
                <div className="neu-inset p-4 mb-6 rounded-xl">
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <span className="text-[var(--accent-purple)] font-semibold mr-1.5">
                      My Role
                    </span>
                    {project.contribution}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-4 font-semibold">
                    Technical Highlights
                  </h4>
                  <ul className="space-y-3">
                    {project.highlights.map((h) => (
                      <li key={h.text} className="flex items-start gap-3">
                        <CategoryBadge category={h.category} />
                        <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {h.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="neu-inset px-3 py-1 text-xs text-[var(--accent-cyan)] rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
