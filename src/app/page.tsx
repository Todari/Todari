import Link from "next/link";
import MakerProfile from "@/components/MakerProfile";
import SelectedWork from "@/components/SelectedWork";
import SpaceJourneyWrapper from "@/components/SpaceJourneyWrapper";

const workSteps = [
  { title: "문제를 정하고", detail: "기획 · 우선순위 · 사용자 흐름", color: "#dfff4f" },
  { title: "화면으로 옮기고", detail: "디자인 · 프론트엔드 · 접근성", color: "#67e8f9" },
  { title: "제품으로 연결하고", detail: "서버 · 데이터 · AI 실행 경계", color: "#ff79bd" },
  { title: "운영하며 개선합니다", detail: "배포 · 장애 복구 · 검증", color: "#a78bfa" },
] as const;

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Link
        href="#selected-work"
        className="fixed -top-24 left-4 z-50 rounded-xl border-2 border-[#17151c] bg-[#dfff4f] px-5 py-3 font-bold text-[#17151c] focus:top-3"
      >
        대표 사례로 바로 가기
      </Link>
      <header className="border-b-[3px] border-[#17151c] bg-[#17151c] px-5 py-5 text-[#fffaf0] md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <Link href="/" className="text-3xl font-black leading-none tracking-[-0.065em]">Todari</Link>
          <nav aria-label="주요 메뉴" className="flex flex-wrap items-center gap-5 text-xs font-bold md:gap-7 md:text-sm">
            <Link href="#selected-work" className="py-2 hover:underline">대표 작업</Link>
            <Link href="#projects" className="py-2 hover:underline">3D 프로젝트</Link>
            <Link href="#about" className="py-2 hover:underline">소개</Link>
            <Link href="/writing" className="py-2 hover:underline">기술 글</Link>
            <Link href="#contact" className="py-2 text-[#dfff4f] hover:underline">연락</Link>
          </nav>
        </div>
      </header>

      <section className="paper-grid border-b-[3px] border-[#17151c] px-5 py-14 text-[#17151c] md:px-10 md:py-20" aria-labelledby="intro-heading">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="neo-label rotate-[-1deg] bg-[#dfff4f] px-4 py-2 text-xs font-black md:text-sm">
              Product engineer · Frontend developer
            </p>
            <h1 id="intro-heading" className="mt-7 text-[clamp(2.2rem,4.6vw,4rem)] font-black leading-[1.3] tracking-[-0.065em] [word-break:keep-all]">
              기획의 질문부터,<br />제품의 다음 개선까지.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#5d5565] [word-break:keep-all]">
              안녕하세요, 토다리입니다. 기획·디자인에서 출발해 화면과 시스템을 직접 만들고, 출시 이후의 운영과 개선까지 맡습니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href="#selected-work" className="neo-button rounded-xl bg-[#dfff4f] px-5 py-3.5 text-sm font-black">대표 사례 읽기 ↓</Link>
              <Link href="#projects" className="py-3 text-sm font-bold text-[#5b38b9] underline underline-offset-4">3D로 프로젝트 꺼내보기</Link>
            </div>
          </div>
          <div className="neo-card ink-dots p-6 text-[#fffaf0] md:p-8">
            <h2 className="text-lg font-black">제가 연결하는 일</h2>
            <ol className="mt-6 space-y-3">
              {workSteps.map((step, index) => (
                <li key={step.title} className="flex items-center gap-4 rounded-xl border-2 border-[#17151c] p-4 text-[#17151c]" style={{ backgroundColor: step.color }}>
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#17151c] bg-[#fffaf0] font-mono text-xs font-black">{index + 1}</span>
                  <div><p className="font-black">{step.title}</p><p className="mt-1 text-xs leading-5">{step.detail}</p></div>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-xs leading-6 text-[#d6cedd]">아래 사례에서 제가 맡은 범위와 실제 판단을 확인할 수 있습니다.</p>
          </div>
        </div>
      </section>

      <SelectedWork />
      <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-4 bg-[#272138]">
        <div className="border-y-[3px] border-[#17151c] bg-[#17151c] px-5 py-8 text-[#fffaf0] md:px-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-5">
            <div><h2 id="projects-heading" className="text-2xl font-black md:text-3xl">다른 프로젝트도 꺼내보세요.</h2><p className="mt-3 text-sm leading-6 text-[#d6cedd]">작은 불편에서 시작한 제품과 실험을 3D로 둘러볼 수 있습니다.</p></div>
            <Link href="/works" className="neo-button rounded-xl bg-[#fffaf0] px-5 py-3 text-sm font-black text-[#17151c]">전체 작업 목록 →</Link>
          </div>
        </div>
        <SpaceJourneyWrapper />
      </section>
      <MakerProfile />
    </main>
  );
}
