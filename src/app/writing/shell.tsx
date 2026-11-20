import Link from "next/link";
import type { ReactNode } from "react";

export function ArticleShell({
  label,
  title,
  date,
  intro,
  sourceNote,
  children,
}: {
  label: string;
  title: string;
  date: string;
  intro: string;
  sourceNote?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pt-3 pb-10 text-slate-900 sm:px-6">
      <nav aria-label="글 탐색" className="relative mb-3 flex min-h-11 items-center justify-center">
        <Link href="/writing" className="absolute left-0 inline-flex min-h-11 items-center gap-1 rounded-sm px-1 text-sm font-semibold text-[#2347b7]">
          <span aria-hidden="true" className="text-xl">‹</span> 글 목록
        </Link>
        <span className="text-base font-bold">기술 글</span>
      </nav>
      <article className="rounded-[20px] bg-white px-[18px] py-6 sm:p-9">
        <header className="border-b border-slate-200 pb-5">
          <p className="text-xs font-semibold tracking-wide text-slate-600">{label}</p>
          <h1 className="mt-2 max-w-2xl break-keep text-[25px] font-bold leading-tight tracking-tight sm:text-[32px]">
            {title}
          </h1>
          <p className="mt-4 text-sm text-slate-600">{date} · TODARI</p>
          <p className="mt-4 break-keep text-base leading-7 text-slate-700">{intro}</p>
        </header>
        <div className="article-body mt-8 space-y-5 [&>h2]:mt-12 [&>a]:text-blue-700">{children}</div>
        <footer className="mt-12 border-t border-slate-200 pt-6">
          {sourceNote && <p className="text-sm leading-6 text-slate-600">{sourceNote}</p>}
          <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold text-blue-700 underline-offset-4 [&>a]:underline">
            <Link href="/">TODARI.DEV</Link>
            <a href="mailto:hello@todari.dev">hello@todari.dev</a>
          </div>
        </footer>
      </article>
    </main>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="break-keep text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="break-keep text-base leading-8 text-slate-700">{children}</p>;
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-xs leading-6 text-slate-50">
      <code>{children}</code>
    </pre>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm font-semibold leading-7 text-slate-800">
      {children}
    </div>
  );
}
