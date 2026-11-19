import Image from "next/image";
import Link from "next/link";
import MakerProfile from "@/components/MakerProfile";
import SelectedWork from "@/components/SelectedWork";
import SpaceJourneyWrapper from "@/components/SpaceJourneyWrapper";

const recentWork = [
  {
    title: "포크레터 · 댓글 자동 DM",
    decision: "링크를 요청하는 댓글에 자동으로 답할 수 있도록, 댓글 키워드와 보낼 메시지를 한 규칙으로 묶었습니다.",
    image: "/work/home/forcletter-auto-dm.webp",
    alt: "‘링크’ 댓글에 자동으로 보낼 메시지를 설정한 포크레터 앱 화면",
    caption: "App Store 공개 시연 화면",
    mediaClassName: "bg-[#dbeafe] object-cover object-top",
    href: "/work/forcletter",
    linkLabel: "포크레터 제품 사례 →",
  },
  {
    title: "포크레터 · 릴스 제작 자동화",
    decision: "댓글 키워드와 보낼 메시지를 확인하는 장면을 골라, 자동 DM 설정을 17초 자막 영상으로 보여줬습니다.",
    image: "/work/forcletter/reel-poster.webp",
    alt: "포크레터 댓글 자동 DM 확인 카드가 담긴 제품 데모 릴스 표지",
    caption: "제품 데모 릴스 · 17초",
    mediaClassName: "bg-[#0d1425] object-contain",
    video: true,
    href: "/work/forcletter#reels",
    linkLabel: "릴스 영상과 제작 과정 →",
  },
  {
    title: "이정표 · KBO 티켓 정가 양도",
    decision: "판매자가 경기와 좌석 등급을 고르면 서버가 구단 판매가로 정가를 계산하게 했습니다.",
    image: "/work/home/jeongpyo-face-value.webp",
    alt: "이정표 티켓 등록에서 성인 일반권 1매 18,000원, 2매 총 36,000원으로 자동 계산한 예시",
    caption: "앱 등록 화면 시연 · 2026.07",
    mediaClassName: "bg-[#e7edff] object-contain p-3 sm:p-4",
    href: "/work/jeongpyo#face-value",
    linkLabel: "이정표 정가 산정 사례 →",
  },
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

      <section className="paper-grid border-b-[3px] border-[#17151c] px-5 py-12 text-[#17151c] md:px-10 md:py-16" aria-labelledby="intro-heading">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black text-[#5b38b9]">토다리 · 제품 엔지니어</p>
          <h1 id="intro-heading" className="mt-4 max-w-5xl text-[clamp(2.15rem,5vw,4rem)] font-black leading-[1.19] tracking-[-0.065em] [word-break:keep-all]">
            기획·디자인에서 출발해,<br className="hidden sm:block" /> 제품을 만들고 운영합니다.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5d5565] [word-break:keep-all]">
            미피랩스에서 자율주행·블록체인 서비스의 기획과 디자인을 맡았고, 우아한테크코스 6기에서 프론트엔드를 공부했습니다. 지금은 링카이브에서 포크레터의 기획·디자인·풀스택 개발·운영을 맡고, AI를 제품 기능과 콘텐츠 제작에 연결하고 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="#selected-work" className="neo-button rounded-xl bg-[#dfff4f] px-5 py-3.5 text-sm font-black">대표 사례 읽기 ↓</Link>
            <Link href="/works" className="py-3 text-sm font-bold text-[#5b38b9] underline underline-offset-4">프로젝트별 작업 보기 →</Link>
          </div>
          <section className="mt-12 md:mt-14" aria-labelledby="recent-work-heading">
            <h2 id="recent-work-heading" className="text-xl font-black tracking-tight md:text-2xl">최근에 맡아 해결한 일</h2>
            <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentWork.map((work) => (
                <li key={work.title} className="neo-card relative flex min-w-0 flex-col overflow-hidden bg-[#fffaf0]">
                  <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[#17151c]">
                    <Image
                      src={work.image}
                      alt={work.alt}
                      fill
                      sizes="(min-width: 1232px) 368px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className={work.mediaClassName}
                    />
                    {"video" in work && (
                      <span aria-hidden="true" className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border-2 border-[#17151c] bg-[#dfff4f] text-base">▶</span>
                    )}
                  </div>
                  <div className="flex grow flex-col items-start p-5">
                    <p className="text-xs font-bold text-[#5d5565]">{work.caption}</p>
                    <h3 className="mt-2 text-lg font-black tracking-tight">{work.title}</h3>
                    <p className="mb-4 mt-2 text-sm leading-6 [word-break:keep-all]">{work.decision}</p>
                    <Link href={work.href} className="mt-auto py-1 text-sm font-black text-[#5b38b9] underline underline-offset-4 after:absolute after:inset-0">{work.linkLabel}</Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <SelectedWork />
      <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-4 bg-[#272138]">
        <div className="border-y-[3px] border-[#17151c] bg-[#17151c] px-5 py-8 text-[#fffaf0] md:px-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-5">
            <div><h2 id="projects-heading" className="text-2xl font-black md:text-3xl">직접 만든 제품과 기술 실험</h2><p className="mt-3 text-sm leading-6 text-[#d6cedd]">실시간 동기화, 정산, 지도 협업, UI 라이브러리의 제약과 설계를 살펴보세요.</p></div>
            <Link href="/works" className="neo-button rounded-xl bg-[#fffaf0] px-5 py-3 text-sm font-black text-[#17151c]">프로젝트별 작업 보기 →</Link>
          </div>
        </div>
        <SpaceJourneyWrapper />
      </section>
      <MakerProfile />
    </main>
  );
}
