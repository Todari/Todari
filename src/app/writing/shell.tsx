import Link from "next/link";
import type { ReactNode } from "react";

/** 기술 글 공용 셸 — 사이트의 네오브루탈리즘 문법(paper·ink·mono 라벨)을 따른다. */
export function ArticleShell({
  label,
  title,
  date,
  intro,
  children,
}: {
  label: string;
  title: string;
  date: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main
      className="min-h-screen bg-[#fffaf0] px-5 py-16 text-[#17151c] md:px-10 md:py-24"
      style={{
        backgroundImage:
          "linear-gradient(rgba(23,21,28,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(23,21,28,.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <article className="mx-auto max-w-3xl">
        <Link
          href="/writing"
          className="font-mono text-[11px] font-black tracking-[0.18em] text-[#5b38b9]"
        >
          ← WRITING
        </Link>
        <p className="mt-8 inline-flex rotate-[-1deg] items-center rounded-full border-2 border-[#17151c] bg-[#dfff4f] px-4 py-2 font-mono text-[10px] font-black tracking-[0.2em] shadow-[3px_3px_0_#17151c]">
          {label}
        </p>
        <h1 className="mt-6 text-3xl font-black leading-[1.15] tracking-[-0.04em] md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 font-mono text-[11px] font-bold tracking-[0.14em] text-[#17151c]/50">
          {date} · TODARI
        </p>
        <p className="mt-8 rounded-[1rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-5 text-[15px] font-bold leading-7 shadow-[6px_6px_0_#17151c]">
          {intro}
        </p>
        <div className="article-body mt-12 space-y-6">{children}</div>
        <footer className="mt-16 border-t-[3px] border-[#17151c] pt-8">
          <p className="text-sm leading-6 text-[#5d5565]">
            이 글의 내용은 실제 운영 중인 코드와 프로덕션 데이터를 기준으로
            작성했습니다. 궁금한 점은 편하게 연락 주세요.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://todari.dev"
              className="rounded-xl border-2 border-[#17151c] bg-[#dfff4f] px-4 py-2 text-sm font-black shadow-[3px_3px_0_#17151c]"
            >
              TODARI.DEV
            </a>
            <a
              href="mailto:hello@todari.dev"
              className="rounded-xl border-2 border-[#17151c] bg-[#fffaf0] px-4 py-2 text-sm font-black shadow-[3px_3px_0_#17151c]"
            >
              hello@todari.dev
            </a>
          </div>
        </footer>
      </article>
    </main>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="!mt-12 text-xl font-black tracking-[-0.02em] md:text-2xl">
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-8 text-[#3d3745]">{children}</p>;
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-[1rem] border-[3px] border-[#17151c] bg-[#17151c] p-5 font-mono text-[12.5px] leading-6 text-[#dfff4f] shadow-[6px_6px_0_rgba(23,21,28,.25)]">
      <code>{children}</code>
    </pre>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[1rem] border-[3px] border-[#17151c] bg-[#ffe9f4] p-5 text-[14px] font-bold leading-7 shadow-[5px_5px_0_#17151c]">
      {children}
    </div>
  );
}
