import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { services, type Service } from "@/data/services";
import { workExperiences } from "@/data/work-experiences";
import { ExperienceSources } from "./WorkExperiences";

const spotlightProjects: Service["id"][] = ["haengdong", "metronomdeul", "pin-to-gather"];

function Decision({ label, children }: { label: string; children: ReactNode }) {
  return <div className="grid gap-1.5 sm:grid-cols-[5rem_1fr] sm:gap-4"><dt className="text-xs font-black leading-6">{label}</dt><dd className="text-sm leading-7 text-[#5d5565] [word-break:keep-all]">{children}</dd></div>;
}

export default function SelectedWork() {
  return (
    <section id="selected-work" tabIndex={-1} aria-labelledby="selected-heading" className="paper-grid scroll-mt-5 px-5 py-14 text-[#17151c] outline-none md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 id="selected-heading" className="text-3xl font-black leading-tight tracking-[-0.045em] md:text-4xl">대표 사례</h2>

        <article id="forcletter-case" className="neo-card mt-7 grid scroll-mt-8 overflow-hidden bg-[#fffaf0] lg:grid-cols-[1.1fr_1fr]">
          <div className="p-6 md:p-9">
            <p className="text-sm font-black text-[#5b38b9]">포크레터 · 제품 설계와 운영</p>
            <h3 className="mt-4 break-keep text-2xl font-black leading-snug tracking-[-0.045em] md:text-3xl">채널 리포트에서 자동 DM 설정까지 한곳에서</h3>
            <dl className="mt-6 space-y-5">
              <Decision label="내 역할">1인 기획·디자인·풀스택 개발·운영, AI 에이전트 설계</Decision>
              <Decision label="설계 판단">인스타그램·유튜브 리포트를 사용자별로 묶고, 포키가 자동 DM이나 프로필 링크 설정을 바꾸기 전에 사용자 확인을 거치게 했습니다.</Decision>
              <Decision label="운영 설계">채널 연결 해제와 일시적인 API 실패를 구분하고, 앱과 웹의 배포 순서가 달라도 탭과 버튼 배치를 유지하도록 했습니다.</Decision>
            </dl>
            <Link href="/work/forcletter" className="neo-button mt-7 inline-flex rounded-xl bg-[#dfff4f] px-5 py-3 text-sm font-black">포크레터 사례 읽기 →</Link>
          </div>
          <div className="flex flex-col justify-center border-t-[3px] border-[#17151c] bg-[#a78bfa] p-6 lg:border-t-0 lg:border-l-[3px] md:p-8">
            <div className="flex items-start justify-center gap-4">
              <Image src="/work/forcletter/product-1.jpg" width={221} height={480} sizes="(max-width: 600px) 36vw, 190px" alt="포크레터 자동 DM 설정을 소개하는 공개 앱 화면" className="h-auto w-[42%] max-w-[190px] rotate-[-3deg] rounded-2xl border-[3px] border-[#17151c] shadow-[5px_5px_0_#17151c]" />
              <Image src="/work/forcletter/product-2.jpg" width={221} height={480} sizes="(max-width: 600px) 36vw, 190px" alt="포크레터 AI 멀티링크 제작을 소개하는 공개 앱 화면" className="mt-7 h-auto w-[42%] max-w-[190px] rotate-[3deg] rounded-2xl border-[3px] border-[#17151c] shadow-[5px_5px_0_#17151c]" />
            </div>
            <p className="mt-5 text-center text-[11px] font-bold leading-5">App Store 공개 소개 이미지 · 시연 데이터</p>
            <div className="mt-6 rounded-xl border-2 border-[#17151c] bg-[#fffaf0] p-5">
              <p className="text-2xl font-black">가입 계정 13,847+</p>
              <p className="mt-2 text-xs leading-6 text-[#5d5565]">2026-11-05 공개 홈페이지 기준 · 탈퇴 계정 제외</p>
              <a href="https://forcreator.co.kr" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block py-1 text-xs font-bold text-[#5b38b9] underline underline-offset-4">공개 출처 확인 ↗</a>
            </div>
          </div>
        </article>

        <article id="geo-case" className="neo-card mt-8 grid scroll-mt-8 overflow-hidden bg-[#fffaf0] lg:grid-cols-[1fr_1.1fr]">
          <div className="p-6 md:p-9 lg:col-start-2 lg:row-start-1">
            <p className="text-sm font-black text-[#5b38b9]">AiBright · AI 검색 데이터와 콘텐츠 검수</p>
            <h3 className="mt-4 break-keep text-2xl font-black leading-snug tracking-[-0.045em] md:text-3xl">AI 답변의 근거를 편집 작업으로</h3>
            <dl className="mt-6 space-y-5">
              <Decision label="내 역할">제품 흐름 설계, 풀스택 개발, 수집·콘텐츠 자동화</Decision>
              <Decision label="설계 판단">수집 실패와 브랜드 미노출을 구분해 개선안에서 질문·답변 원문과 인용 출처를 확인할 수 있게 했습니다.</Decision>
              <Decision label="확인 범위">고객 CMS에 초안·할 일을 전달하는 연동을 배포했습니다. 공개 사이트 반영과 검색 효과는 후속 검증 범위입니다.</Decision>
            </dl>
            <Link href="/work/geo-seo-automation" className="neo-button mt-7 inline-flex rounded-xl bg-[#67e8f9] px-5 py-3 text-sm font-black">AiBright 사례 읽기 →</Link>
          </div>
          <div className="grid content-center gap-4 border-t-[3px] border-[#17151c] bg-[#67e8f9] p-6 md:p-8 lg:col-start-1 lg:row-start-1 lg:border-t-0 lg:border-r-[3px]">
            <div className="rounded-xl border-2 border-[#17151c] bg-[#17151c] p-5 text-[#fffaf0]">
              <p className="text-xs font-black text-[#67e8f9]">AiBright → 고객 사이트 CMS</p>
              <p className="mt-2 break-keep text-base font-black leading-snug">근거 질문에서 초안과 편집 할 일로</p>
            </div>
            <div className="rounded-xl border-2 border-[#17151c] bg-[#fffaf0] p-5 shadow-[4px_4px_0_#17151c]">
              <p className="text-xs font-black text-[#5b38b9]">별도 미디어 CMS</p>
              <p className="mt-2 break-keep text-base font-black leading-snug">생성 → 주장·출처 독립 검수 → 조건부 발행</p>
            </div>
          </div>
        </article>

        <article id="jeongpyo-case" className="neo-card mt-8 grid scroll-mt-8 overflow-hidden bg-[#fffaf0] lg:grid-cols-[1.1fr_1fr]">
          <div className="p-6 md:p-9">
            <p className="text-sm font-black text-[#5b38b9]">이정표 · KBO 티켓 정가 양도</p>
            <h3 className="mt-4 break-keep text-2xl font-black leading-snug tracking-[-0.045em] md:text-3xl">티켓 양도에서 가격 입력을 없애다</h3>
            <dl className="mt-6 space-y-5">
              <Decision label="내 역할">제품 설계, 풀스택 개발, 거래 운영 흐름 설계</Decision>
              <Decision label="설계 판단">가격 입력란을 없애 판매자가 웃돈을 붙일 수 없게 했습니다. 경기와 좌석 등급을 고르면 서버가 구단 판매가 기준으로 정가를 산정합니다.</Decision>
              <Decision label="확인 범위">잠실 베타 알림을 받고 있습니다. 실제 팬 간 거래는 베타에서 검증할 예정입니다.</Decision>
            </dl>
            <Link href="/work/jeongpyo" className="neo-button mt-7 inline-flex rounded-xl bg-[#ffcae5] px-5 py-3 text-sm font-black">이정표 사례 읽기 →</Link>
          </div>
          <div className="grid content-center gap-4 border-t-[3px] border-[#17151c] bg-[#ffcae5] p-6 md:p-8 lg:border-t-0 lg:border-l-[3px]">
            <ol aria-label="정가 산정 흐름" className="grid overflow-hidden rounded-xl border-2 border-[#17151c] bg-[#fffaf0] shadow-[4px_4px_0_#17151c] sm:grid-cols-2">
              <li className="p-5">
                <p className="text-xs font-black text-[#5b38b9]">판매자</p>
                <p className="mt-2 font-black">경기·좌석 등급 선택</p>
              </li>
              <li className="border-t-2 border-[#17151c] bg-[#dfff4f] p-5 sm:border-t-0 sm:border-l-2">
                <p className="text-xs font-black text-[#5b38b9]">서버</p>
                <p className="mt-2 font-black">구단 판매가로 정가 산정</p>
              </li>
            </ol>
            <a href="https://jeongpyo.com" target="_blank" rel="noopener noreferrer" className="justify-self-start py-2 text-xs font-black text-[#5b38b9] underline underline-offset-4">공개 양도 절차와 잠실 베타 ↗</a>
          </div>
        </article>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-2xl font-black tracking-tight">팀과 개인 프로젝트에서 해결한 일</h3>
          <Link href="/works" className="neo-button rounded-xl bg-[#dfff4f] px-4 py-2.5 text-sm font-black">{services.length}개 프로젝트 보기 →</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {spotlightProjects.map((id) => {
            const project = services.find((service) => service.id === id);
            if (!project) return null;
            const [experience] = workExperiences[id];

            return (
              <article key={id} className="rounded-xl border-2 border-[#17151c] bg-[#fffaf0] p-5">
                <p className="text-xs font-bold text-[#5b38b9]">{project.title} · {experience.category}</p>
                <h4 className="mt-3 break-keep text-lg font-black leading-snug">
                  <Link href={`${project.caseStudy}#${experience.id}`} className="underline-offset-4 hover:underline">{experience.title} →</Link>
                </h4>
                <ExperienceSources experience={experience} />
              </article>
            );
          })}
        </div>

        <nav aria-label="관련 기술 글" className="mt-8 flex flex-wrap gap-x-5 gap-y-1 border-t border-[#17151c]/20 pt-4 text-sm font-bold text-[#5b38b9] [&_a]:py-2 [&_a]:underline [&_a]:underline-offset-4">
          <Link href="/writing/native-web-layout-compatibility">앱·웹 호환 설계 →</Link>
          <Link href="/writing/marketing-reels-pipeline">릴스 제작 파이프라인 →</Link>
          <Link href="/writing">모든 기술 글 →</Link>
        </nav>
      </div>
    </section>
  );
}
