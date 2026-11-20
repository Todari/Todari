import Link from "next/link";
import { forcletterEngineeringCases } from "@/data/forcletter-engineering";
import { aggregationDecision, haengdongAllocationDecision, metronomeSyncDecision } from "@/data/portfolio-decisions";

const decisions = [
  {
    ...aggregationDecision,
    more: { href: "/work/geo-seo-automation#scheduled-enqueue-retry", label: "큐 등록 응답이 사라졌을 때의 재시도" },
    related: { href: "/work/geo-seo-automation#comparable-answer-kpis", label: "질문 구성이 바뀐 두 기간의 노출률 비교" },
  },
  {
    ...metronomeSyncDecision,
    more: { href: "/work/metronomdeul#tempo-event-budget", label: "연주자별 템포 변경 한도" },
    related: { href: "/work/metronomdeul#live-tempo-phase", label: "2025년 첫 서버부터 재생 중 템포 변경까지" },
  },
  {
    context: "행동대장 · 개인 포크의 정산 트랜잭션",
    title: "멤버 삭제와 분담액 재계산을 한 트랜잭션에 묶은 이유",
    choice: "멤버를 지우면 분담 내역도 함께 지워졌습니다. 삭제 전에 영향받는 청구를 찾아 같은 트랜잭션에서 청구 총액을 남은 사람에게 다시 배분하고, 마지막 참여자가 빠진 청구를 삭제했습니다.",
    result: "모의 DB에서 수정 전에는 10,001원 중 6,000원만 남았습니다. 수정 후 두 사람은 5,000원과 5,001원을 부담합니다. 이때 기존에 고정한 분담액도 다시 계산됩니다.",
    href: "/work/haengdong#member-removal-settlement",
    more: { href: "/work/haengdong#query-error-boundaries", label: "조회·저장 실패 시 화면 복구" },
    linkLabel: "삭제 순서와 정산 합계 검증",
    related: { href: haengdongAllocationDecision.href, label: "원팀에서 구현한 고정 분담액 계산" },
  },
];
const evidenceLink = "inline-flex min-h-11 w-fit items-center gap-1 rounded-sm text-sm font-semibold text-[#2347b7] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4";

export default function PortfolioDecisions() {
  return (
    <section id="decisions" tabIndex={-1} aria-labelledby="decisions-heading" className="mx-auto mt-3 max-w-4xl scroll-mt-4 px-4 outline-none sm:mt-5 sm:px-6">
      <h2 id="decisions-heading" className="mb-2.5 text-[22px] font-bold tracking-tight sm:mb-3 sm:text-[26px]">대표 기술 사례</h2>
      <article className="grid items-center gap-x-6 rounded-[22px] border border-slate-900/5 bg-white/95 px-[18px] pt-4 pb-1 shadow-[0_3px_18px_#0f172a08] sm:px-5 sm:pt-5 md:grid-cols-[minmax(0,1fr)_15rem]">
        <div>
          <p className="text-[13px] font-semibold text-[#2347b7]">포크레터 · MySQL 시계열 조회</p>
          <h3 className="mt-1.5 break-keep text-[24px] leading-snug font-bold tracking-tight sm:text-[28px]">게시물 12개를 열 때 왜 5,845행을 읽었을까?</h3>
          <p className="mt-2.5 break-keep text-sm leading-6 text-slate-700">목록에는 게시물마다 최신 누적 지표 하나만 필요했습니다. 기존 쿼리는 과거 스냅샷을 전부 읽고 정렬한 뒤 애플리케이션에서 첫 행을 골랐습니다.</p>
          <p className="mt-2 break-keep text-sm leading-6 text-slate-800">각 게시물의 최신 누적 지표가 어느 시각에 있는지 인덱스에서 찾고, 그 행만 읽도록 바꿨습니다. 같은 시각의 일간 지표가 섞이는 경우까지 확인했습니다.</p>
          <div className="flex flex-wrap gap-x-4">
            <Link href="/writing/snapshot-50m-rows" className={evidenceLink}>조회 계획과 SQL 검증 <span aria-hidden="true">›</span></Link>
            <Link href="/work/forcletter#poki-action-execution" className={evidenceLink}>AI 작업의 중복 실행 방지 <span aria-hidden="true">›</span></Link>
            <Link href="/work/forcletter#admin-stats-cache" className={evidenceLink}>배포 직후 통계 캐시 복구 <span aria-hidden="true">›</span></Link>
          </div>
        </div>
        <figure className="my-3 rounded-xl bg-[#eef3ff] px-4 py-3.5 text-[#183775]">
          <figcaption className="mb-2 text-sm font-bold">동일한 게시물 12개 조회</figcaption>
          <dl className="divide-y divide-[#d5dff5] text-sm max-md:[&>div]:flex max-md:[&>div]:items-baseline max-md:[&>div]:justify-between max-md:[&>div]:gap-3 max-md:[&_dd]:text-sm">
            <div className="py-2"><dt>기존 조회</dt><dd className="mt-0.5 text-lg font-bold tabular-nums">5,845행 정렬</dd></div>
            <div className="py-2"><dt>변경 후 인덱스 탐색</dt><dd className="mt-0.5 font-bold">인덱스 항목 115개</dd></div>
            <div className="pt-2"><dt>변경 후 테이블 읽기</dt><dd className="mt-0.5 text-lg font-bold">12행</dd></div>
          </dl>
          <p className="mt-3 text-xs text-slate-600">2026.10.01 쿼리 변경 기록</p>
        </figure>
      </article>

      <section id="forcletter-engineering" aria-labelledby="forcletter-engineering-heading" className="mt-3 scroll-mt-4 rounded-[22px] border border-slate-900/5 bg-white/95 px-[18px] pt-2 pb-4 shadow-[0_3px_18px_#0f172a08] sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4">
          <h3 id="forcletter-engineering-heading" className="py-2 text-xl font-bold tracking-tight">포크레터 기술 사례</h3>
          <Link href="/work/forcletter#experiences" className={evidenceLink}>포크레터 작업 전체 <span aria-hidden="true">›</span></Link>
        </div>
        <ul className="grid gap-x-6 sm:grid-cols-2">
          {forcletterEngineeringCases.map(({ id, category, title, preview }) => (
            <li key={id} className="border-t border-slate-200">
              <Link href={`/work/forcletter#${id}`} className="group block rounded-sm py-3 focus-visible:outline-2 focus-visible:outline-offset-2">
                <p className="text-xs font-semibold text-[#2347b7]">{category}</p>
                <h4 className="mt-1 break-keep text-base leading-6 font-bold tracking-tight group-hover:underline">{title} <span aria-hidden="true" className="text-[#2347b7]">›</span></h4>
                <p className="mt-1 break-keep text-sm leading-6 text-slate-600">{preview}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ul role="list" className="mt-3 divide-y divide-slate-900/8 rounded-[22px] border border-slate-900/5 bg-white/95 px-[18px] shadow-[0_3px_18px_#0f172a08] sm:px-5">
        {decisions.map(({ context, title, choice, result, href, linkLabel, related, more }) => (
          <li key={href}>
            <article className="grid gap-x-6 gap-y-2 pt-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] md:pt-5">
              <header>
                <p className="text-[13px] font-semibold text-[#2347b7]">{context}</p>
                <h3 className="mt-1 break-keep text-[20px] leading-snug font-bold tracking-tight">{title}</h3>
              </header>
              <div className="min-w-0">
                <p className="break-keep text-sm leading-6 font-medium text-slate-800">{choice}</p>
                <p className="mt-1 break-keep text-sm leading-6 text-slate-600">{result}</p>
                <div className="flex flex-wrap gap-x-4">
                  <Link href={href} className={evidenceLink}>{linkLabel} <span aria-hidden="true">›</span></Link>
                  <Link href={related.href} className={evidenceLink}>{related.label} <span aria-hidden="true">›</span></Link>
                  <Link href={more.href} className={evidenceLink}>{more.label} <span aria-hidden="true">›</span></Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
