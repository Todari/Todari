import type { Metadata } from "next";
import Link from "next/link";
import WorkExperiences from "@/components/WorkExperiences";
import { H2, P } from "../../writing/shell";

export const metadata: Metadata = {
  title: "AiBright · 집계 메모리와 CMS 재측정",
  description: "75만 건의 멘션을 압축해 답변별 집계 결과를 보존하고, CMS 반영 뒤 새 검색 관측을 확인하도록 설계한 AiBright 사례입니다.",
  alternates: { canonical: "https://todari.dev/work/geo-seo-automation" },
};

const articleLink = "font-semibold text-[#2347b7] hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2";

export default function GeoSeoAutomationPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-16 pt-4 text-slate-900 sm:px-6">
      <article>
        <header className="pb-6">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-slate-200 pb-2">
            <Link href="/works" className="inline-flex min-h-11 w-fit items-center gap-1 rounded-full px-2 text-sm font-semibold text-[#2347b7] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2">
              <span aria-hidden="true">‹</span> 전체 작업
            </Link>
            <h1 className="text-base font-semibold tracking-tight">AiBright</h1>
          </div>
          <p className="mt-6 break-keep text-2xl font-bold leading-tight tracking-tight sm:text-[28px]">75만 멘션을 집계하고, CMS 반영 뒤 새로 측정하기</p>
          <p className="mt-3 break-keep text-sm leading-7 text-slate-700">AiBright는 네이버와 ChatGPT·Gemini·Google의 AI 답변에서 브랜드 언급과 인용 출처를 관측합니다. 수집·집계와 개선안의 편집 흐름을 설계하고 풀스택 개발을 맡았습니다.</p>
          <nav aria-label="AiBright 관련 링크" className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <a href="https://aibright.ai" target="_blank" rel="noopener noreferrer" className={articleLink}>AiBright 공개 서비스 ↗</a>
            <a href="#customer-cms" className={articleLink}>고객 CMS 연동 ↓</a>
            <a href="#content-cms" className={articleLink}>미디어 CMS 제작 ↓</a>
            <a href="#experiences" className={articleLink}>작업과 해결 과정 ↓</a>
          </nav>
        </header>

        <section aria-labelledby="engineering-title">
          <h2 id="engineering-title" className="mb-2 px-2 text-sm font-semibold text-slate-600">설계와 검증</h2>
          <div className="divide-y divide-slate-200 rounded-[20px] border border-slate-200 bg-white px-4 sm:px-6">
            <section className="space-y-3 py-5">
              <h3 className="break-keep text-lg font-semibold tracking-tight">답변별 중복은 보존하고, 반복되는 멘션 값만 공유</h3>
              <p className="break-keep text-sm leading-7 text-slate-700">여러 수집이 동시에 끝나 캐시 예열이 겹치면 2.5GB 웹 컨테이너가 재시작됐습니다. 상세 계산을 직렬화한 뒤에도 한 브랜드의 30일치 멘션 75만 건을 읽는 계산 하나가 약 2GB를 썼습니다. PostgreSQL에서 멘션 값 조합에 공통 ID를 붙이고, 답변별 배열에는 원본 행 ID 기준 순서와 중복을 보존했습니다. Node에서는 같은 ID를 가리키는 답변들이 멘션 객체 하나를 공유합니다.</p>
              <p className="break-keep text-sm leading-7 text-slate-700">2026년 9월 단일 브랜드 30일치 계산에서 <strong>1.97GB → 0.59GB</strong>를 기록했습니다. 측정 지표와 실행 환경은 당시 함께 기록하지 않았습니다. 운영 DB의 집계 결과 대조에서는 동순위 상품 한 쌍의 순서만 달랐습니다. 로컬 PostgreSQL에서도 당시 로더를 실행해 답변마다 중복 횟수와 순서가 유지되고 같은 값은 객체 하나를 공유하는지 확인했습니다.</p>
              <p className="break-keep text-sm leading-7 text-slate-700">후속 코드에서는 사용자 지정 필터의 상세 계산을 한 번에 하나씩 실행하고 최대 4건을 대기시킵니다. 건당 20초를 가정해 실행 중인 작업까지 최대 100초를 배정하고, 120초 프록시 제한 안에서 조회와 렌더링 시간을 확보하는 기준입니다. 기본 화면과 예열은 대기 상한에서 제외됩니다.</p>
              <Link href="/writing/geo-aggregation-memory" className={`${articleLink} inline-block text-sm`}>GEO 집계 메모리 개선과 검증 →</Link>
            </section>
            <section id="customer-cms" className="scroll-mt-8 space-y-3 py-5">
              <h3 className="break-keep text-lg font-semibold tracking-tight">CMS 반영 시각과 검색 재측정 시각을 따로 기록</h3>
              <p className="break-keep text-sm leading-7 text-slate-700">새 글은 비공개 초안으로, 기존 페이지 보강은 편집 할 일로 보냅니다. 같은 액션 ID를 다시 보내면 처음 만든 작업을 돌려주므로, 응답이 끊겨도 같은 액션을 재시도할 수 있습니다. CMS에서 게시하거나 반영 표시를 하면 해당 브랜드의 액션에 반영 시각을 남깁니다.</p>
              <p className="break-keep text-sm leading-7 text-slate-700">네이버 지표 액션은 기준 시각 이후 유효한 관측이 도착해야 사람이 완료할 수 있습니다. 답변 영역이 없었던 정상 관측은 새 측정에 포함하고 수집 실패는 제외합니다. 2026년 11월 5일 고객 CMS 배포와 공개 URL 규칙 설정을 확인했습니다. 콜백에는 공개 URL이 없어 실제 페이지 반영과 재측정 후 노출 변화는 별도로 확인해야 합니다.</p>
            </section>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <H2>어떤 질문을 고칠지는 답변 원문으로 확인했습니다</H2>
          <P>경쟁사만 등장하거나 자사 출처가 부족한 질문을 개선 후보로 보여주고, 집계에서 질문과 답변 원문까지 돌아갈 수 있게 했습니다. 수집 상태를 구분해 외부 수집 장애가 브랜드 미노출로 계산되는 일을 막았습니다.</P>
        </section>

        <section id="content-cms" className="mt-12 scroll-mt-8 space-y-4 border-t border-slate-200 pt-8">
          <H2>미디어 CMS에서는 생성, 검수, 발행을 단계로 나눴습니다</H2>
          <P>고객 사이트 편집 CMS와 별도로, 미디어 제작 CMS에서는 주제와 질문을 큐에 넣고 워커가 본문·Q&amp;A·출처·SEO/GEO 정보·이미지를 생성합니다. 작성자가 창을 닫아도 작업이 이어집니다. 생성 결과를 별도 검수 단계에 보내 주장·수치·출처를 다시 확인하고, 설정된 검수 모델과 품질 검사를 통과하지 못하면 수정 단계로 돌립니다.</P>
          <P>에디터 승인과 예약 발행을 지원합니다. 자동 발행을 켠 콘텐츠도 품질 검사, 출처 접근성, 발행 한도를 충족해야 합니다. 조건에 걸리면 수정하거나 사람이 검토합니다. 발행에 성공하고 응답만 유실될 수 있어서, 재시도 전에 공개 문서와 대조해 중복 발행을 피하도록 복구 경로를 뒀습니다.</P>
        </section>

        <div className="mt-12 rounded-[20px] border border-slate-200 bg-white p-5 md:p-7">
          <WorkExperiences project="geo" />
        </div>
        <footer className="mt-12 flex flex-wrap gap-6 border-t border-slate-200 pt-6 text-sm">
          <Link href="/works" className={articleLink}>← 전체 작업</Link>
          <a href="mailto:hello@todari.dev" className={articleLink}>hello@todari.dev ↗</a>
        </footer>
      </article>
    </main>
  );
}
