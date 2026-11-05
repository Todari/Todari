import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function Decision({ label, children }: { label: string; children: ReactNode }) {
  return <div className="grid gap-1.5 sm:grid-cols-[5rem_1fr] sm:gap-4"><dt className="text-xs font-black leading-6">{label}</dt><dd className="text-sm leading-7 text-[#5d5565] [word-break:keep-all]">{children}</dd></div>;
}

const technicalCases = [
  {
    label: "프론트엔드 · 앱과 웹",
    title: "서로 다른 버전도 같은 화면을 쓰도록.",
    description: "네이티브 탭과 웹 버튼의 위치 기준을 맞추고, 앱과 웹의 업데이트 시차를 CSS 변수의 기본값과 호환 경로로 다뤘습니다.",
    href: "/writing/native-web-layout-compatibility",
    link: "앱·웹 호환 설계 읽기",
    color: "#ffcae5",
  },
  {
    label: "AI 자동화 · 포크레터 마케팅",
    title: "광고 소구에서 릴스 검토본까지.",
    description: "대본·제품 화면 촬영·음성·자막·편집을 연결하고, 단계별 결과를 저장해 멈춘 지점부터 다시 시작하도록 했습니다.",
    href: "/writing/marketing-reels-pipeline",
    link: "릴스 제작 파이프라인 읽기",
    color: "#dfff4f",
  },
] as const;

export default function SelectedWork() {
  return (
    <section id="selected-work" tabIndex={-1} aria-labelledby="selected-heading" className="paper-grid scroll-mt-5 px-5 py-14 text-[#17151c] outline-none md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-sm font-black text-[#5b38b9]">대표 작업</p><h2 id="selected-heading" className="mt-3 text-3xl font-black leading-tight tracking-[-0.045em] md:text-4xl">어떤 문제를 맡았고,<br />어떤 판단을 했는지.</h2></div>
          <p className="max-w-sm text-sm leading-7 text-[#5d5565]">제품을 만든 범위와 결정, 확인한 결과를 먼저 정리했습니다. 자세한 구현과 근거는 각 사례로 이어집니다.</p>
        </div>

        <article id="forcletter-case" className="neo-card mt-10 grid overflow-hidden bg-[#fffaf0] lg:grid-cols-[1.1fr_1fr]">
          <div className="p-6 md:p-9">
            <p className="text-sm font-black text-[#5b38b9]">Forcletter · 링카이브 · 2025.09 — 현재</p>
            <h3 className="mt-5 text-2xl font-black leading-snug tracking-[-0.045em] md:text-3xl">크리에이터의 반복 업무를<br />하나의 제품으로.</h3>
            <p className="mt-4 text-sm leading-7 text-[#5d5565]">채널 분석, 자동 DM, 멀티링크와 AI 포키를 연결한 크리에이터 운영 도구입니다.</p>
            <dl className="mt-6 space-y-5">
              <Decision label="내 역할">1인 기획·디자인·풀스택 개발·운영, AI 에이전트 설계</Decision>
              <Decision label="중요한 결정">AI 제안과 실제 실행 사이에 사용자 확인을 두고, 외부 API 장애와 사용자의 연결 해제를 서로 다른 상태로 다뤘습니다.</Decision>
              <Decision label="확인한 결과">웹·앱·관리자 도구를 출시·운영했습니다. 다채널 리포트와 릴스 검토본 제작까지 구현했습니다.</Decision>
            </dl>
            <Link href="/work/forcletter" className="neo-button mt-7 inline-flex rounded-xl bg-[#dfff4f] px-5 py-3 text-sm font-black">제품과 판단 근거 읽기 →</Link>
          </div>
          <div className="flex flex-col justify-center border-t-[3px] border-[#17151c] bg-[#a78bfa] p-6 lg:border-t-0 lg:border-l-[3px] md:p-8">
            <div className="flex items-start justify-center gap-4">
              <Image src="/work/forcletter/product-1.jpg" width={221} height={480} sizes="(max-width: 600px) 36vw, 190px" alt="포크레터 자동 DM 설정을 소개하는 공개 앱 화면" className="h-auto w-[42%] max-w-[190px] rotate-[-3deg] rounded-2xl border-[3px] border-[#17151c] shadow-[5px_5px_0_#17151c]" />
              <Image src="/work/forcletter/product-2.jpg" width={221} height={480} sizes="(max-width: 600px) 36vw, 190px" alt="포크레터 AI 멀티링크 제작을 소개하는 공개 앱 화면" className="mt-7 h-auto w-[42%] max-w-[190px] rotate-[3deg] rounded-2xl border-[3px] border-[#17151c] shadow-[5px_5px_0_#17151c]" />
            </div>
            <p className="mt-5 text-center text-[11px] font-bold leading-5">App Store 공개 소개 이미지 · 시연 데이터</p>
            <div className="mt-6 rounded-xl border-2 border-[#17151c] bg-[#fffaf0] p-5">
              <p className="text-2xl font-black">가입 회원 약 1.38만</p>
              <p className="mt-2 text-xs leading-6 text-[#5d5565]">2026-11-05 공개 홈페이지 표시 13,846+ 기준.<br />탈퇴하지 않은 가입 회원이며 월 활성 수치와 다릅니다.</p>
              <a href="https://forcreator.co.kr" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block py-1 text-xs font-bold text-[#5b38b9] underline underline-offset-4">공개 출처 확인 ↗</a>
            </div>
          </div>
        </article>

        <article id="geo-case" className="neo-card mt-8 grid overflow-hidden bg-[#fffaf0] lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 flex flex-col justify-center border-t-[3px] border-[#17151c] bg-[#67e8f9] p-6 lg:order-1 lg:border-t-0 lg:border-r-[3px] md:p-8" aria-label="AiBright와 두 CMS의 연결 흐름">
            <div className="rounded-2xl border-[3px] border-[#17151c] bg-[#17151c] p-6 text-[#fffaf0] shadow-[5px_5px_0_#5b38b9]">
              <p className="font-black text-[#67e8f9]">AiBright</p><p className="mt-3 text-2xl font-black leading-snug">AI 답변 속 브랜드와<br />인용 출처를 관측</p>
            </div>
            <p aria-hidden="true" className="py-3 text-center text-2xl font-black">↓</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border-2 border-[#17151c] bg-[#fffaf0] p-4 shadow-[4px_4px_0_#17151c]"><p className="text-xs font-black">미디어 CMS</p><p className="mt-3 text-sm font-bold leading-6">콘텐츠 생성<br />독립 검수·발행</p></div>
              <div className="rounded-xl border-2 border-[#17151c] bg-[#dfff4f] p-4 shadow-[4px_4px_0_#17151c]"><p className="text-xs font-black">고객 사이트 CMS</p><p className="mt-3 text-sm font-bold leading-6">개선안을<br />초안·할 일로 전달</p></div>
            </div>
            <p className="mt-6 text-center text-xs font-bold leading-6">반영 상태를 확인하고, 새 관측으로 다시 판단</p>
          </div>
          <div className="order-1 p-6 lg:order-2 md:p-9">
            <p className="text-sm font-black text-[#5b38b9]">AiBright & CMS · GEO / SEO 자동화</p>
            <h3 className="mt-5 text-2xl font-black leading-snug tracking-[-0.045em] md:text-3xl">검색의 신호를<br />다음 콘텐츠 작업으로.</h3>
            <dl className="mt-6 space-y-5">
              <Decision label="내 역할">제품 흐름 설계, 풀스택 개발, 수집·콘텐츠 자동화</Decision>
              <Decision label="중요한 결정">수집 누락과 미노출을 구분하고, 생성과 사실 검수를 분리했습니다. 두 CMS의 목적과 반영 상태도 각각 다룹니다.</Decision>
              <Decision label="확인한 결과">관측·개선 액션, 생성·검수·조건부 발행과 별도 CMS의 초안·할 일 연동을 구현했습니다.</Decision>
            </dl>
            <p className="mt-5 text-xs leading-6 text-[#5d5565]">2026-11-05 구현 확인. 고객 사이트 반영과 검색 효과는 별도 검증 범위입니다.</p>
            <Link href="/work/geo-seo-automation" className="neo-button mt-6 inline-flex rounded-xl bg-[#67e8f9] px-5 py-3 text-sm font-black">시스템과 판단 근거 읽기 →</Link>
          </div>
        </article>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4"><h3 className="text-2xl font-black tracking-tight">화면의 깊이부터 반복 업무의 자동화까지.</h3><Link href="/writing" className="py-2 text-sm font-bold text-[#5b38b9] underline underline-offset-4">모든 기술 글 보기 →</Link></div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {technicalCases.map((item) => (
            <article key={item.href} className="neo-card flex flex-col p-6 md:p-8" style={{ backgroundColor: item.color }}>
              <p className="text-xs font-black">{item.label}</p><h4 className="mt-4 text-2xl font-black leading-snug tracking-[-0.035em]">{item.title}</h4><p className="mt-4 flex-1 text-sm leading-7 text-[#463f4c]">{item.description}</p>
              <Link href={item.href} className="mt-5 inline-block py-2 text-sm font-black underline underline-offset-4">{item.link} →</Link>
            </article>
          ))}
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link href="/writing/geo-aggregation-memory" className="rounded-xl border-2 border-[#17151c] bg-[#fffaf0] p-5 text-sm font-bold leading-6">성능과 데이터 · 75만 멘션 집계의 메모리 문제 →</Link>
          <Link href="/writing/metronome-clock-sync" className="rounded-xl border-2 border-[#17151c] bg-[#fffaf0] p-5 text-sm font-bold leading-6">실시간 프론트엔드 · 여러 기기의 시계와 오디오 동기화 →</Link>
        </div>
      </div>
    </section>
  );
}
