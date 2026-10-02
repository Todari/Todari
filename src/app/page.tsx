import SpaceJourneyWrapper from "@/components/SpaceJourneyWrapper";
import MakerProfile from "@/components/MakerProfile";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">Todari · 아이디어를 꺼내, 쓰이는 제품으로.</h1>
      <SpaceJourneyWrapper />
      <section className="paper-grid border-b-[3px] border-[#17151c] px-5 py-10 text-[#17151c] md:px-10 md:py-16" aria-labelledby="selected-heading">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-black tracking-tight">Todari · 토다리</p>
            <nav aria-label="주요 메뉴" className="flex flex-wrap gap-5 text-sm font-bold">
              <a href="#about" className="underline-offset-4 hover:underline">소개</a>
              <a href="/works" className="underline-offset-4 hover:underline">전체 작업</a>
              <Link href="/writing" className="underline-offset-4 hover:underline">기술 글</Link>
              <a href="#contact" className="underline-offset-4 hover:underline">연락</a>
            </nav>
          </div>
          <div id="selected-work" className="mt-12 scroll-mt-6">
            <h2 id="selected-heading" className="text-2xl font-black md:text-4xl">만든 다음, 여기까지 다뤘습니다.</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Link href="/work/forcletter" className="neo-card bg-[#fffaf0] p-6 transition-transform hover:-translate-y-1">
                <p className="text-xs font-bold text-[#5b38b9]">01 · FORCLETTER · 제품 운영</p>
                <h3 className="mt-3 text-2xl font-black">월 활성 크리에이터 1,900+</h3>
                <p className="mt-3 text-sm leading-6 text-[#5d5565]">1인 기획·디자인·풀스택·운영. 연동 계정 4,800여 개의 토큰 만료와 외부 API 장애를 복구 가능한 상태로 설계했습니다.</p>
                <p className="mt-3 text-xs text-[#5d5565]">Forcletter 운영 실측 · 2026-08</p>
                <span className="mt-5 inline-block text-sm font-black text-[#5b38b9]">제품과 담당 범위 살펴보기 →</span>
              </Link>
              <Link href="/writing/geo-aggregation-memory" className="neo-card bg-[#67e8f9] p-6 transition-transform hover:-translate-y-1">
                <p className="text-xs font-bold text-[#17151c]">02 · GEO DASHBOARD · 성능 개선</p>
                <h3 className="mt-3 text-2xl font-black">1.97GB → 0.59GB</h3>
                <p className="mt-3 text-sm leading-6 text-[#463f4c]">75만 멘션 집계의 로딩 구조를 바꿔 메모리를 줄였습니다. 운영 DB에서 기존 계산과 결과가 같은지 대조했습니다.</p>
                <p className="mt-3 text-xs text-[#463f4c]">한 브랜드·30일 범위 계산 · 2026-09-28</p>
                <span className="mt-5 inline-block text-sm font-black">원인 분석과 검증 과정 읽기 →</span>
              </Link>
              <Link href="/writing/metronome-clock-sync" className="neo-card bg-[#fffaf0] p-6 transition-transform hover:-translate-y-1">
                <p className="text-xs font-bold text-[#5b38b9]">03 · 메트로놈들 · 실시간 프론트엔드</p>
                <h3 className="mt-3 text-2xl font-black">여러 기기, 하나의 박자</h3>
                <p className="mt-3 text-sm leading-6 text-[#5d5565]">합주하는 사람들의 기기마다 다른 시계와 네트워크 지연을 다뤘습니다. 서버 시각 보정과 Web Audio 예약 재생을 분리했습니다.</p>
                <p className="mt-3 text-xs text-[#5d5565]">직접 설계·개발 · WebSocket · Web Audio</p>
                <span className="mt-5 inline-block text-sm font-black text-[#5b38b9]">시계 동기화 설계 읽기 →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <MakerProfile />
    </main>
  );
}
