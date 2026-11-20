import Image from "next/image";
import Link from "next/link";
import MakerProfile, { ForcletterOperations } from "@/components/MakerProfile";
import PortfolioDecisions from "@/components/PortfolioDecisions";
import SelectedWork from "@/components/SelectedWork";
import SpaceJourneyWrapper from "@/components/SpaceJourneyWrapper";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="text-slate-900 outline-none">
      <a href="#decisions" className="fixed -top-24 left-4 z-50 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white focus:top-3">
        대표 사례로 바로 가기
      </a>
      <header className="mx-auto max-w-4xl px-4 pt-5 sm:px-6 sm:pt-9">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <a href="#about" aria-label="토다리 프로필" title="토다리 프로필" className="grid size-14 shrink-0 place-items-center rounded-full bg-white/75 shadow-[0_1px_5px_#0f172a12] hover:bg-white sm:size-[68px]">
            <Image src="/work/home/todari.jpg" width={60} height={60} alt="" className="size-12 rounded-full object-cover sm:size-[60px]" />
          </a>
          <div>
            <h1 className="text-[30px] leading-none font-bold tracking-tight sm:text-[38px]">토다리</h1>
            <p className="mt-1.5 text-sm font-semibold text-slate-600 sm:text-base">링카이브 프로덕트 엔지니어</p>
          </div>
          <a href="#projects" aria-label="전체 서비스 3D 탐색" title="전체 서비스 3D 탐색" className="ml-auto grid size-11 shrink-0 place-items-center rounded-full bg-white/65 text-slate-800 shadow-[0_1px_5px_#0f172a12] hover:bg-white">
            <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round">
              <path d="M12 2.3 21 7.4v9.2l-9 5.1-9-5.1V7.4zM3.4 7.6 12 12.4l8.6-4.8M12 12.4v9M7.5 4.8l9 5" />
            </svg>
          </a>
        </div>
        <p className="mt-3 max-w-2xl break-keep text-sm leading-6 text-slate-700 sm:text-[15px]">
          포크레터와 AiBright에서 데이터 수집부터 사용자가 보는 리포트까지 개발합니다. 최신 지표 하나를 읽는 데 과거 데이터가 얼마나 필요한지, 메모리를 줄여도 집계 결과가 같은지 직접 확인하며 병목을 고쳤습니다.
        </p>
        <div className="flex flex-wrap items-center gap-x-6">
          <Link href="/writing" className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-[#2347b7] underline-offset-4 hover:underline focus-visible:outline-2">기술 글 모아보기 <span className="ml-1" aria-hidden="true">›</span></Link>
          <Link href="/works#history" className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-[#2347b7] underline-offset-4 hover:underline focus-visible:outline-2">2022–2026 개발 기록 <span className="ml-1" aria-hidden="true">›</span></Link>
        </div>
      </header>
      <PortfolioDecisions />
      <SelectedWork />
      <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-4 pt-6 sm:pt-9">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-4 px-4 pb-1 sm:px-6">
          <h2 id="projects-heading" className="text-[22px] font-bold tracking-tight sm:text-[26px]">전체 서비스</h2>
          <Link href="/works" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#2347b7] underline-offset-4 hover:underline">목록으로 보기 <span aria-hidden="true">›</span></Link>
        </div>
        <SpaceJourneyWrapper />
      </section>
      <ForcletterOperations />
      <MakerProfile />
    </main>
  );
}
