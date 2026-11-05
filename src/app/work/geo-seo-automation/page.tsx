import type { Metadata } from "next";
import Link from "next/link";
import { H2, P } from "../../writing/shell";

export const metadata: Metadata = {
  title: "AiBright·CMS · GEO/SEO 콘텐츠 자동화",
  description: "수집 실패와 미노출을 구분하고, 검색 개선안을 CMS 초안·할 일로 전달하며, 생성·검수·발행 복구를 설계한 사례입니다.",
  alternates: { canonical: "https://todari.dev/work/geo-seo-automation" },
};

export default function GeoSeoAutomationPage() {
  return (
    <main className="paper-grid min-h-screen px-5 py-12 text-[#17151c] md:px-10 md:py-20">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-black text-[#5b38b9]">← 포트폴리오 홈</Link>
        <p className="mt-10 text-xs font-black tracking-widest text-[#5b38b9]">SELECTED WORK · AIBRIGHT / CMS</p>
        <h1 className="mt-4 text-balance break-keep text-4xl font-black leading-tight tracking-tight md:text-6xl">AI 검색 보고서와<br />콘텐츠 실행 사이를 줄이기.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8">브랜드가 AI 답변에 안 보인다는 보고서만으로는 담당자가 무엇을 고칠지 결정하기 어렵습니다. 원문과 수집 상태를 근거로 개선안을 만들고, 이를 CMS의 편집 작업으로 전달하도록 설계했습니다. 별도 미디어 CMS에서는 콘텐츠 제작·검수·발행과 실패 복구를 맡았습니다.</p>
        <dl className="mt-8 grid gap-4 rounded-2xl border-[3px] border-[#17151c] bg-[#fffaf0] p-6 text-sm md:grid-cols-2">
          <div><dt className="font-black">담당 범위</dt><dd className="mt-2 leading-6">제품 흐름 설계 · 풀스택 개발 · 데이터 수집·콘텐츠 자동화</dd></div>
          <div><dt className="font-black">확인 기준</dt><dd className="mt-2 leading-6">2026-11-05 · 구현·병합 기록·고객 CMS 배포 결과 확인</dd></div>
        </dl>
        <a href="https://aibright.ai" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-bold text-[#5b38b9] underline underline-offset-4">AiBright 공개 서비스 보기 ↗</a>
        <ol aria-label="검색과 콘텐츠 개선 흐름" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01 관측", "질문·답변·인용 출처"],
            ["02 판단", "근거가 연결된 개선안"],
            ["03 실행", "초안·할 일 · 검수·발행"],
            ["04 효과 확인", "실반영·새 관측 검증은 후속"],
          ].map(([title, detail]) => (
            <li key={title} className="neo-card bg-[#67e8f9] p-5"><p className="font-black">{title}</p><p className="mt-2 text-sm leading-6">{detail}</p></li>
          ))}
        </ol>
        <div className="mt-12 space-y-6">
          <H2>결정 1 · 수집 실패를 브랜드 미노출로 세지 않기</H2>
          <P>네이버와 ChatGPT·Gemini·Google의 AI 답변에서 브랜드·제품 언급, 인용 출처와 관측 시점을 수집합니다. 수집 누락을 브랜드가 언급되지 않은 결과와 구분하고, 수치에서 원문 답변과 근거 질문으로 돌아갈 수 있게 했습니다.</P>
          <P>담당자가 개선 대상을 고를 수 있도록 경쟁사만 등장한 질문과 자사 출처가 부족한 질문에서 콘텐츠 작업을 만듭니다. 전후 비교에는 같은 관측을 재사용하지 않도록 새 측정 여부를 확인합니다. 이 설계의 목적은 잘못된 측정으로 작업 우선순위를 정하는 일을 막는 것입니다.</P>

          <section id="content-cms" className="scroll-mt-8 space-y-6">
            <H2>결정 2 · 생성기가 자기 결과의 검수자까지 맡지 않도록</H2>
            <P>주제·질문을 작업 큐에 넣으면 별도 워커가 본문, Q&amp;A, 출처, SEO/GEO 정보와 이미지를 생성합니다. 창을 닫아도 작업이 이어지며, 생성과는 별도의 검수 단계에서 주장·수치·출처를 다시 확인합니다. 설정된 검수 모델과 품질 검사를 통과하지 못한 글은 수정 단계로 돌아갑니다.</P>
            <P>에디터 승인과 예약 발행을 지원하고, 자동 발행을 켠 예약 콘텐츠는 품질 검사·출처 접근성·발행 한도 등의 조건을 확인합니다. 조건을 충족하지 못하면 수정하거나 사람에게 검토를 넘깁니다. 발행 응답이 유실됐을 때는 같은 글을 다시 보내기 전에 공개 문서를 대조하도록 복구 경로를 뒀습니다.</P>
          </section>

          <H2>결정 3 · 개선안을 다시 입력하지 않고 편집 작업으로 전달하기</H2>
          <P>고객 사이트를 위한 별도 CMS에는 AiBright의 콘텐츠 브리프를 비공개 초안으로, 기존 페이지 보강은 할 일로 전달합니다. 같은 액션을 다시 보내도 작업이 중복 생성되지 않도록 하고, 에디터가 게시하거나 반영을 표시하면 AiBright에 상태를 돌려주는 연결을 구현했습니다.</P>
          <P>2026-11-05에는 고객 CMS의 공개 URL 규칙 설정과 배포 성공을 확인했습니다. 완료 콜백은 작업 상태를 전달하지만 실제 공개 URL까지 보내지는 않습니다. 따라서 사이트에 결과물이 도달했는지와 검색 효과가 바뀌었는지는 추가 확인이 필요합니다. 미디어 생성 CMS와 고객 사이트 편집 CMS는 별도 시스템입니다.</P>

          <div className="neo-card bg-[#dfff4f] p-6">
            <h2 className="text-xl font-black">구현·배포와 사업 효과의 현재 상태</h2>
            <p className="mt-3 text-sm leading-7">확인한 결과는 관측 근거를 편집 작업으로 넘기는 연동, 생성·독립 검수·발행 복구 구현, 고객 CMS 배포입니다. 고객 사이트의 실제 반영과 노출·유입·매출 변화는 아직 성과로 제시하지 않습니다.</p>
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
