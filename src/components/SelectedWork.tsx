import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function Decision({ label, children }: { label: string; children: ReactNode }) {
  return <div className="grid gap-1.5 sm:grid-cols-[5rem_1fr] sm:gap-4"><dt className="text-xs font-black leading-6">{label}</dt><dd className="text-sm leading-7 text-[#5d5565] [word-break:keep-all]">{children}</dd></div>;
}

const technicalCases = [
  {
    label: "프론트엔드 · 앱과 웹",
    title: "앱과 웹의 출시 시차를 견디는 레이아웃 계약.",
    description: "앱과 웹은 동시에 배포되지 않습니다. 네이티브 탭과 웹 버튼의 위치 계약을 정하고, 새 변수의 기본값과 기존 변수 전달로 양쪽 업데이트 순서에 대응했습니다.",
    href: "/writing/native-web-layout-compatibility",
    link: "앱·웹 호환 설계 읽기",
    color: "#ffcae5",
  },
  {
    label: "AI 자동화 · 포크레터 마케팅",
    title: "실패한 클립 때문에 제작 전체를 다시 돌리지 않도록.",
    description: "소구·대본·제품 화면 촬영·음성·자막·편집을 자동화했습니다. 단계별 산출물과 상태를 저장해 재개하고, 생성 실패는 클립 단위로 격리합니다.",
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
          <div><p className="text-sm font-black text-[#5b38b9]">대표 작업</p><h2 id="selected-heading" className="mt-3 text-3xl font-black leading-tight tracking-[-0.045em] md:text-4xl">기능 목록보다,<br />해결한 병목과 선택한 설계.</h2></div>
          <p className="max-w-sm text-sm leading-7 text-[#5d5565]">사용자의 반복 작업, 잘못된 실행, 믿기 어려운 데이터. 각각의 문제에 어떤 경계를 두고 무엇을 구현했는지 정리했습니다.</p>
        </div>

        <article id="forcletter-case" className="neo-card mt-10 grid overflow-hidden bg-[#fffaf0] lg:grid-cols-[1.1fr_1fr]">
          <div className="p-6 md:p-9">
            <p className="text-sm font-black text-[#5b38b9]">Forcletter · 링카이브 · 2025.09 — 현재</p>
            <h3 className="mt-5 text-2xl font-black leading-snug tracking-[-0.045em] md:text-3xl">분석에서 실제 설정 변경까지,<br />크리에이터 운영을 제품화.</h3>
            <p className="mt-4 text-sm leading-7 text-[#5d5565]">채널 리포트를 읽고, 댓글에 링크를 보내고, 프로필 링크를 고치는 일을 웹·앱과 AI 포키에서 처리하도록 만들었습니다.</p>
            <dl className="mt-6 space-y-5">
              <Decision label="내 역할">1인 기획·디자인·풀스택 개발·운영, AI 에이전트 설계</Decision>
              <Decision label="설계 판단">포키의 실행은 사용자 확인을 거치게 하고, 일시적인 API 실패로 사용자가 해제한 연결 상태를 덮어쓰지 않도록 상태를 분리했습니다.</Decision>
              <Decision label="구현 결과">흩어진 채널 알림을 사용자별 통합 리포트로 묶었습니다. 웹·앱의 배포 순서가 달라도 탭과 버튼 배치를 유지하는 호환 경로를 추가했습니다.</Decision>
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
              <p className="text-2xl font-black">공개 가입 계정 13,847+</p>
              <p className="mt-2 text-xs leading-6 text-[#5d5565]">2026-11-05 공개 홈페이지 확인.<br />탈퇴 제외 가입 계정 수. 월 활성·유료 고객 수나 개인 기여에 따른 증가분을 뜻하지 않습니다.</p>
              <a href="https://forcreator.co.kr" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block py-1 text-xs font-bold text-[#5b38b9] underline underline-offset-4">공개 출처 확인 ↗</a>
            </div>
          </div>
        </article>

        <article id="geo-case" className="neo-card mt-8 grid overflow-hidden bg-[#fffaf0] lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 flex flex-col justify-center border-t-[3px] border-[#17151c] bg-[#67e8f9] p-6 lg:order-1 lg:border-t-0 lg:border-r-[3px] md:p-8" aria-label="AiBright와 고객 CMS 연동, 별도 미디어 CMS 제작 흐름">
            <div className="rounded-2xl border-[3px] border-[#17151c] bg-[#17151c] p-6 text-[#fffaf0] shadow-[5px_5px_0_#5b38b9]">
              <p className="font-black text-[#67e8f9]">AiBright</p><p className="mt-3 text-2xl font-black leading-snug">AI 답변 속 브랜드와<br />인용 출처를 관측</p>
            </div>
            <p aria-hidden="true" className="py-3 text-center text-2xl font-black">↓</p>
            <div className="rounded-xl border-2 border-[#17151c] bg-[#dfff4f] p-4 shadow-[4px_4px_0_#17151c]"><p className="text-xs font-black">고객 사이트 CMS</p><p className="mt-2 text-sm font-bold leading-6">개선안을 초안·할 일로 전달</p></div>
            <p className="mt-4 text-center text-xs font-bold leading-6">고객 CMS 배포 확인 · 실반영과 효과 측정은 후속</p>
            <div className="mt-6 rounded-xl border-2 border-[#17151c] bg-[#fffaf0] p-4 shadow-[4px_4px_0_#17151c]"><p className="text-xs font-black">별도 제작 시스템 · 미디어 CMS</p><p className="mt-2 text-sm font-bold leading-6">콘텐츠 생성 → 독립 검수 → 조건부 발행</p></div>
          </div>
          <div className="order-1 p-6 lg:order-2 md:p-9">
            <p className="text-sm font-black text-[#5b38b9]">AiBright & CMS · GEO / SEO 자동화</p>
            <h3 className="mt-5 text-2xl font-black leading-snug tracking-[-0.045em] md:text-3xl">AI 검색 보고서가<br />콘텐츠 작업으로 이어지도록.</h3>
            <dl className="mt-6 space-y-5">
              <Decision label="내 역할">제품 흐름 설계, 풀스택 개발, 수집·콘텐츠 자동화</Decision>
              <Decision label="설계 판단">수집 실패를 미노출로 세면 개선 대상부터 틀어집니다. 원문·시점·수집 상태를 남기고, 개선안을 근거 질문에 연결했습니다.</Decision>
              <Decision label="구현 결과">고객 CMS에 초안·할 일을 전달하고 중복 요청을 막았습니다. 별도 미디어 CMS에는 생성·독립 검수·조건부 발행·발행 응답 유실 시 복구를 구현했습니다.</Decision>
            </dl>
            <p className="mt-5 text-xs leading-6 text-[#5d5565]">2026-11-05 고객 CMS 배포 성공 확인. 실제 공개 URL의 전달·도달 확인과 검색 효과 측정은 남아 있습니다.</p>
            <Link href="/work/geo-seo-automation" className="neo-button mt-6 inline-flex rounded-xl bg-[#67e8f9] px-5 py-3 text-sm font-black">시스템과 판단 근거 읽기 →</Link>
          </div>
        </article>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4"><h3 className="text-2xl font-black tracking-tight">배포 시차와 재작업 비용을 설계로 다루기</h3><Link href="/writing" className="py-2 text-sm font-bold text-[#5b38b9] underline underline-offset-4">모든 기술 글 보기 →</Link></div>
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
