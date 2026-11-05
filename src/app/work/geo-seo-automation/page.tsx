import type { Metadata } from "next";
import Link from "next/link";
import { H2, P } from "../../writing/shell";

export const metadata: Metadata = {
  title: "AiBright·CMS · GEO/SEO 콘텐츠 자동화",
  description: "AI 검색 관측에서 개선 액션, 콘텐츠 생성·검수·발행, CMS 반영과 재측정으로 이어지는 AiBright·CMS 자동화 설계 사례입니다.",
  alternates: { canonical: "https://todari.dev/work/geo-seo-automation" },
};

export default function GeoSeoAutomationPage() {
  return (
    <main className="paper-grid min-h-screen px-5 py-12 text-[#17151c] md:px-10 md:py-20">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-black text-[#5b38b9]">← 포트폴리오 홈</Link>
        <p className="mt-10 text-xs font-black tracking-widest text-[#5b38b9]">SELECTED WORK · AIBRIGHT / CMS</p>
        <h1 className="mt-4 text-balance break-keep text-4xl font-black leading-tight tracking-tight md:text-6xl">관측한 검색 신호를<br />다음 콘텐츠 작업으로.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8">AI 답변에 브랜드가 나오는지 확인하는 일과 실제 콘텐츠를 고치는 일 사이에는 간격이 있습니다. AiBright의 관측·개선 액션, 콘텐츠 CMS의 제작·검수·발행, 고객 사이트 CMS의 반영 흐름을 설계하고 구현했습니다.</p>
        <dl className="mt-8 grid gap-4 rounded-2xl border-[3px] border-[#17151c] bg-[#fffaf0] p-6 text-sm md:grid-cols-2">
          <div><dt className="font-black">담당 범위</dt><dd className="mt-2 leading-6">제품 흐름 설계 · 풀스택 개발 · 데이터 수집·콘텐츠 자동화</dd></div>
          <div><dt className="font-black">확인 기준</dt><dd className="mt-2 leading-6">2026-11-05 · 공개 제품 소개와 현재 구현 대조</dd></div>
        </dl>
        <a href="https://aibright.ai" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-bold text-[#5b38b9] underline underline-offset-4">AiBright 공개 서비스 보기 ↗</a>
        <ol aria-label="검색과 콘텐츠 개선 흐름" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01 관측", "질문·답변·인용 출처"],
            ["02 판단", "근거가 연결된 개선안"],
            ["03 반영", "콘텐츠 제작·검수·게시"],
            ["04 재측정", "새 관측과 전후 비교"],
          ].map(([title, detail]) => (
            <li key={title} className="neo-card bg-[#67e8f9] p-5"><p className="font-black">{title}</p><p className="mt-2 text-sm leading-6">{detail}</p></li>
          ))}
        </ol>
        <div className="mt-12 space-y-6">
          <H2>AiBright · 같은 질문을 관측하고 판단 근거를 남기기</H2>
          <P>네이버와 ChatGPT·Gemini·Google의 AI 답변에서 브랜드·제품 언급, 인용 출처와 관측 시점을 수집합니다. 수집 누락을 브랜드가 언급되지 않은 결과와 구분하고, 수치에서 원문 답변과 근거 질문으로 돌아갈 수 있게 했습니다.</P>
          <P>경쟁사만 등장하는 질문이나 자사 출처가 부족한 지점을 콘텐츠 개선 액션으로 연결합니다. 반영 전후를 비교할 때 같은 관측을 두 번 세지 않도록 새 측정 여부를 확인합니다. 수집한 답변 안의 노출 변화와 실제 매출 효과는 별개의 판단입니다.</P>

          <section id="content-cms" className="scroll-mt-8 space-y-6">
            <H2>미디어 CMS · 생성과 사실 검수를 분리하기</H2>
            <P>주제·질문을 작업 큐에 넣으면 별도 워커가 본문, Q&amp;A, 출처, SEO/GEO 정보와 이미지를 생성합니다. 창을 닫아도 작업이 이어지며, 생성과는 별도의 검수 단계에서 주장·수치·출처를 다시 확인합니다. 설정된 검수 모델과 품질 검사를 통과하지 못한 글은 수정 단계로 돌아갑니다.</P>
            <P>에디터 승인과 예약 발행을 지원하고, 자동 발행을 켠 예약 콘텐츠는 품질 검사·출처 접근성·발행 한도 등의 조건을 확인합니다. 조건을 충족하지 못하면 수정하거나 사람에게 검토를 넘깁니다. 발행 응답이 유실됐을 때는 같은 글을 다시 보내기 전에 공개 문서를 대조하도록 복구 경로를 뒀습니다.</P>
          </section>

          <H2>AiBright CMS · 개선안을 초안과 할 일로 넘기기</H2>
          <P>고객 사이트를 위한 별도 CMS에는 AiBright의 콘텐츠 브리프를 비공개 초안으로, 기존 페이지 보강은 할 일로 전달합니다. 같은 액션을 다시 보내도 작업이 중복 생성되지 않도록 하고, 에디터가 게시하거나 반영을 표시하면 AiBright에 상태를 돌려주는 연결을 구현했습니다.</P>
          <P>CMS에서 반영됐다는 신호를 검색 성과가 좋아졌다는 판정으로 바꾸지는 않습니다. 사이트별 공개 URL 추적과 실제 반영 후 효과 검증은 후속 확인 범위로 남아 있습니다. 미디어의 콘텐츠 생성 CMS와 고객 사이트의 편집 CMS는 목적이 다른 별도 시스템입니다.</P>

          <div className="neo-card bg-[#dfff4f] p-6">
            <h2 className="text-xl font-black">자동화의 결과를 구분합니다.</h2>
            <p className="mt-3 text-sm leading-7">콘텐츠 생성, 검수 통과, 사이트 반영, 검색 지표 변화를 각각 확인합니다. 이 사례는 그 흐름을 구현한 경험을 다룹니다. 콘텐츠 반영 이후의 노출·유입 변화는 새 관측과 충분한 비교 기간을 확보해 검증할 과제입니다.</p>
          </div>
          <Link href="/writing/geo-aggregation-memory" className="inline-block font-bold text-[#5b38b9] underline underline-offset-4">관련 기술 글 · GEO 집계 메모리 개선 →</Link>
        </div>
        <footer className="mt-16 flex flex-wrap gap-6 border-t-2 border-[#17151c] pt-8 font-bold text-[#5b38b9]">
          <Link href="/works">← 전체 작업</Link>
          <a href="mailto:hello@todari.dev">hello@todari.dev ↗</a>
        </footer>
      </article>
    </main>
  );
}
