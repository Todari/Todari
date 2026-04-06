"use client";

import AnimatedSection from "./AnimatedSection";
import { skills } from "@/data/projects";

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text inline-block">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] rounded-full mb-12" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile area */}
          <AnimatedSection delay={0.1}>
            <div className="neu p-8">
              <div className="neu-inset w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                <span className="text-6xl">&#128075;</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed text-center">
                사용자 경험을 중시하는 개발자입니다. 클린 코드와 직관적인 인터페이스를
                만드는 것을 좋아하며, 새로운 기술을 배우고 적용하는 것에 열정을 가지고
                있습니다.
              </p>
            </div>
          </AnimatedSection>

          {/* Skills */}
          <AnimatedSection delay={0.2}>
            <h3 className="text-xl font-semibold mb-6 text-[var(--text-primary)]">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={skill}
                  className="neu-btn px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
