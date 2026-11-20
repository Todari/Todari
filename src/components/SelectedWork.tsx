import Link from "next/link";
import { workExperiences } from "@/data/work-experiences";
import styles from "./SelectedWork.module.css";

const cardClass = "min-w-0 rounded-[22px] border border-slate-900/5 bg-white/95 p-[18px] shadow-[0_3px_18px_#0f172a08] sm:p-6";
const evidenceLink = "inline-flex min-h-11 w-fit items-center gap-1 rounded-sm text-sm font-semibold text-[#2347b7] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4";

const reports = [
  {
    project: "forcletter",
    id: "forcletter-case",
    name: "포크레터",
    label: "포크레터 · AI 에이전트 실행",
    date: "2026-10-02",
    dateLabel: "CI 검증",
    sourceLabel: "비공개 PR #1094 검증 기록",
    detail: "/work/forcletter#poki-action-execution",
    evidenceTitle: "회귀 테스트",
    summary: "포키가 작업을 적용한 뒤 완료 기록만 실패하면 같은 카드가 다시 실행될 수 있었습니다. 실행 선점을 유지하고 결과 저장만 재시도하도록 했습니다.",
    steps: [
      { label: "승인된 카드", value: "작업 호출 1회" },
      { label: "완료 기록 실패", value: "결과 저장만 재시도" },
      { label: "저장 계속 실패", value: "성공 응답 유지 · 이력은 대기" },
    ],
    verification: "병합 전 CI에서 모의 저장소에 오류를 주입했습니다. 실행이 먼저 선점하면 취소가 최신 상태를 반환하는지도 확인했습니다. 결과 저장이 세 번 실패하면 카드 이력이 나중에 만료될 수 있습니다.",
  },
  {
    project: "geo",
    id: "geo-case",
    name: "AiBright",
    label: "AiBright · AI 검색 답변 분석",
    date: "2026-09-28",
    dateLabel: "측정",
    sourceLabel: "SQL과 객체 공유 검증",
    detail: "/work/geo-seo-automation#aggregation-memory",
    evidenceTitle: "로컬 PostgreSQL에서 확인한 객체 공유",
    summary: "같은 멘션 값이 답변마다 별도 객체로 만들어졌습니다. 답변별 등장 횟수는 유지하고, 값이 같으면 객체 하나를 공유하도록 바꿨습니다.",
    steps: [
      { label: "입력", value: "답변 둘에 멘션 5개와 3개" },
      { label: "AI 탭", value: "객체 5개 공유 · 등장 8건 유지" },
      { label: "브리핑", value: "객체 3개 공유 · 등장 8건 유지" },
    ],
    verification: "당시 로더와 PostgreSQL 16에서 같은 입력을 읽어 등장 순서·중복 횟수·객체 참조를 검사했습니다. 쇼핑은 상품 ID까지 구분해 서로 다른 객체 5개를 유지했습니다.",
  },
  {
    project: "metronomdeul",
    id: "metronomdeul-case",
    name: "메트로놈들",
    label: "메트로놈들 · 합주 박자 동기화",
    date: "2026-10-01",
    dateLabel: "병합",
    sourceLabel: "PR #12",
    detail: "/work/metronomdeul#first-beat",
    evidenceTitle: "첫 박 동기화 회귀 검사",
    summary: "재생을 누른 기기의 첫 두 박 간격이 업로드 지연만큼 늘었습니다. 기기가 시작한 첫 박 시각을 서버 시계로 바꿔 전체 박자의 기준으로 삼았습니다.",
    steps: [
      { label: "120 BPM", value: "정상 박 간격 500ms" },
      { label: "수정 전 재현", value: "재생 기기의 첫 두 박 간격 539ms" },
      { label: "가상 시계", value: "첫 박부터 서버 박자 기준 ±2ms" },
    ],
    verification: "가상 시계에서 박의 누락과 중복도 검사했습니다. PR에 서버 테스트 24개 통과를 기록했습니다. 실기기와 블루투스 이어폰은 PR 검증 범위에 포함되지 않았습니다.",
  },
  {
    project: "haengdong",
    id: "haengdong-case",
    name: "행동대장",
    label: "행동대장 · 개인 포크의 정산 검증",
    date: "2026-09-21",
    dateLabel: "병합",
    sourceLabel: "PR #8",
    detail: "/work/haengdong#bill-member-boundary",
    evidenceTitle: "회귀 테스트",
    summary: "합계가 맞아도 다른 행사 멤버나 중복 멤버가 섞일 수 있었습니다. 생성과 수정 모두 같은 트랜잭션에서 멤버를 먼저 검사하도록 했습니다.",
    steps: [
      { label: "기존 정산", value: "청구 상세가 저장된 상태" },
      { label: "상세 수정 요청", value: "합계 10,000원 일치 · 다른 행사 멤버 포함" },
      { label: "검증 결과", value: "요청 거절 · 기존 상세 삭제 호출 0회" },
    ],
    verification: "생성과 수정에서 중복 멤버도 거절하고, 정상 요청은 저장과 같은 트랜잭션에서 멤버를 조회하는지 검사했습니다. 병합 PR에 서버 테스트 46개와 타입 검사 통과를 기록했습니다.",
  },
] as const;

function Chevron() {
  return <span aria-hidden="true" className="text-base leading-none">›</span>;
}

export default function SelectedWork() {
  return (
    <section id="selected-work" tabIndex={-1} aria-labelledby="selected-heading" className={`${styles.deck} mx-auto max-w-4xl scroll-mt-4 px-4 text-slate-900 outline-none sm:px-6`}>
      <h2 id="selected-heading" className="mt-7 text-[22px] font-bold tracking-tight sm:mt-10 sm:text-[26px]">구현과 회귀 테스트</h2>
      <nav aria-label="대표 사례 선택" className="py-2">
        <div className="grid grid-cols-4 gap-0.5 rounded-2xl bg-slate-900/8 p-1 backdrop-blur-md">
          {reports.map(({ id, name }) => (
            <a key={id} href={`#${id}`} aria-controls={id} className={`${styles.selector} flex min-h-11 min-w-0 items-center justify-center rounded-xl px-1 text-center text-[13px] font-semibold text-slate-700 hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2347b7] sm:text-sm`}>
              {name}
              <span className={`${styles.activeLabel} sr-only`}> · 선택됨</span>
            </a>
          ))}
        </div>
      </nav>

      <div className={styles.cases}>
        {reports.map(({ id, project, label, date, dateLabel, sourceLabel, detail, evidenceTitle, summary, steps, verification }) => {
          const [experience] = workExperiences[project];
          const [primary] = experience.sources;
          const [first, second, outcome] = steps;

          return (
            <article id={id} key={id} data-case={project} tabIndex={-1} aria-labelledby={`${id}-heading`} className={`${styles.panel} ${cardClass} scroll-mt-20 outline-none`}>
              <div>
                <p className="text-xs font-semibold text-[#2347b7]">{label}</p>
                <h3 id={`${id}-heading`} className="mt-2 break-keep text-[23px] leading-tight font-bold tracking-tight sm:text-[27px]">{experience.title}</h3>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-4">
                <div className="flex flex-wrap gap-x-4">
                  {primary.href.startsWith("/") ? (
                    <Link href={primary.href} className={evidenceLink}>{sourceLabel} <Chevron /></Link>
                  ) : (
                    <a href={primary.href} className={evidenceLink}>{sourceLabel} <span aria-hidden="true">↗</span></a>
                  )}
                  {primary.href !== detail && <Link href={detail} className={evidenceLink}>프로젝트 사례 <Chevron /></Link>}
                </div>
                <p className="pb-2 text-xs text-slate-600 sm:pb-0"><time dateTime={date}>{date.replaceAll("-", ".")}</time> {dateLabel} · Todari 작성</p>
              </div>

              <p className="max-w-[66ch] break-keep text-sm leading-6 text-slate-700 sm:text-[15px]">{summary}</p>

              <figure className="mt-4">
                <figcaption className="mb-2 text-xs font-semibold text-slate-600">{evidenceTitle}</figcaption>
                <ol role="list" className="grid gap-2 sm:grid-cols-[1fr_1fr_1.2fr]">
                  {[first, second].map(({ label, value }) => (
                    <li key={label} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-x-2 rounded-xl bg-slate-100/85 px-3 py-2.5 text-[13px] leading-5 sm:block sm:px-4 sm:py-3">
                      <span className="font-semibold text-slate-600">{label}</span>
                      <span className="block break-keep text-slate-800 sm:mt-1">{value}</span>
                    </li>
                  ))}
                  <li className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-x-2 rounded-xl bg-[#e9f1ff] px-3 py-2.5 text-[13px] leading-5 text-[#163c91] sm:block sm:px-4 sm:py-3">
                    <span className="font-semibold">{outcome.label}</span>
                    <strong className="block break-keep font-bold sm:mt-1">{outcome.value}</strong>
                  </li>
                </ol>
              </figure>

              <dl className="mt-3 grid gap-1 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-3">
                <dt className="text-[13px] leading-[22px] font-bold">검증 범위</dt>
                <dd className="max-w-[72ch] break-keep text-[13px] leading-[22px] text-slate-700">{verification}</dd>
              </dl>
            </article>
          );
        })}
      </div>

      <details className="group mt-3 rounded-2xl border border-slate-900/5 bg-white/95 px-[18px] sm:px-6">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-sm font-semibold text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2347b7] [&::-webkit-details-marker]:hidden">
          판단과 출처
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4 text-[#2347b7] group-open:rotate-180">
            <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div className={styles.sources}>
          {reports.map(({ project, label }) => {
            const [experience] = workExperiences[project];
            const [, ...sources] = experience.sources;

            return (
              <section key={project} data-case={project} aria-label={`${label}의 판단과 출처`} className={styles.sourcePanel}>
                <dl className="divide-y divide-slate-900/8 border-t border-slate-900/8">
                  <div className="grid gap-1 py-3 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-3">
                    <dt className="text-sm font-bold">문제</dt>
                    <dd className="break-keep text-sm leading-6 text-slate-700">{experience.problem}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-3">
                    <dt className="text-sm font-bold">판단</dt>
                    <dd className="break-keep text-sm leading-6 text-slate-700">{experience.change}</dd>
                  </div>
                </dl>
                {sources.length > 0 && (
                  <div className="flex flex-wrap gap-x-5 border-t border-slate-900/8 pb-2">
                    {sources.map(({ label, href }) => href.startsWith("/") ? (
                      <Link key={href} href={href} className={evidenceLink}>{label} <Chevron /></Link>
                    ) : (
                      <a key={href} href={href} className={evidenceLink}>{label} <span aria-hidden="true">↗</span></a>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </details>

      <div className="mt-1 flex justify-end">
        <Link href="/works" className={evidenceLink}>전체 작업 보기 <Chevron /></Link>
      </div>
    </section>
  );
}
