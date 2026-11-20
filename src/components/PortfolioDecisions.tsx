import Link from "next/link";
import { forcletterEngineeringCases } from "@/data/forcletter-engineering";
import { aggregationDecision, forcletterDesignDecisions, haengdongAllocationDecision, metronomeSyncDecision } from "@/data/portfolio-decisions";

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
      <h2 id="decisions-heading" className="mb-2.5 text-[22px] font-bold tracking-tight sm:mb-3 sm:text-[26px]">대표 설계 사례</h2>
      <article className="grid items-center gap-x-6 rounded-[22px] border border-slate-900/5 bg-white/95 px-[18px] pt-4 pb-1 shadow-[0_3px_18px_#0f172a08] sm:px-5 sm:pt-5 md:grid-cols-[minmax(0,1fr)_15rem]">
        <div>
          <p className="text-[13px] font-semibold text-[#2347b7]">포크레터 · 데이터 모델링과 MySQL</p>
          <h3 className="mt-1.5 break-keep text-[24px] leading-snug font-bold tracking-tight sm:text-[28px]">게시물 지표를 JSON에 담았다가 숫자 컬럼으로 옮긴 이유</h3>
          <p className="mt-2.5 break-keep text-sm leading-6 text-slate-700">처음엔 릴스와 피드의 지표가 달랐고 화면은 한 게시물의 지표를 통째로 읽었습니다. 수집 시각마다 JSON 한 행을 저장하면 Meta가 지표를 바꿀 때마다 테이블을 고칠 필요가 없었습니다.</p>
          <p className="mt-2 break-keep text-sm leading-6 text-slate-800">여러 게시물의 성과를 SQL로 비교하면서 선택이 달라졌습니다. 고정 지표는 숫자 컬럼으로 옮기고 기존 화면에는 같은 객체를 돌려줬습니다. 이력이 쌓인 뒤에는 초반 성장 곡선을 보존하기 위해 목록이 읽는 행만 줄였습니다.</p>
          <div className="flex flex-wrap gap-x-4">
            <Link href="/writing/snapshot-50m-rows" className={evidenceLink}>세 가지 저장 방식과 이관 과정 <span aria-hidden="true">›</span></Link>
          </div>
        </div>
        <figure className="my-3 rounded-xl bg-[#eef3ff] px-4 py-3.5 text-[#183775]">
          <figcaption className="mb-2 text-sm font-bold">게시물 지표 설계 이력</figcaption>
          <dl className="divide-y divide-[#d5dff5] text-sm">
            <div className="py-2"><dt className="text-xs">2025년 12월 · 수집</dt><dd className="mt-1 font-semibold">한 시점의 지표를 JSON에 저장</dd></div>
            <div className="py-2"><dt className="text-xs">2026년 2월 · 분석</dt><dd className="mt-1 font-semibold">고정 지표를 숫자 컬럼으로 이관</dd></div>
            <div className="pt-2"><dt className="text-xs">2026년 10월 · 목록 조회</dt><dd className="mt-1 font-semibold">게시물 12개 조회 시 5,845행 정렬을 없애고 인덱스 115항목과 본문 12행 읽기</dd></div>
          </dl>
        </figure>
      </article>

      <section id="forcletter-engineering" aria-labelledby="forcletter-engineering-heading" className="mt-3 scroll-mt-4 rounded-[22px] border border-slate-900/5 bg-white/95 px-[18px] pt-2 pb-4 shadow-[0_3px_18px_#0f172a08] sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4">
          <h3 id="forcletter-engineering-heading" className="py-2 text-xl font-bold tracking-tight">포크레터의 모델과 수집 시스템</h3>
          <Link href="/work/forcletter#experiences" className={evidenceLink}>포크레터 작업 전체 <span aria-hidden="true">›</span></Link>
        </div>
        <ul className="grid gap-x-6 sm:grid-cols-2">
          {forcletterDesignDecisions.map(({ context, title, choice, slug }) => (
            <li key={slug} className="border-t border-slate-200">
              <Link href={`/writing/${slug}`} className="group block rounded-sm py-3 focus-visible:outline-2 focus-visible:outline-offset-2">
                <p className="text-xs font-semibold text-[#2347b7]">{context}</p>
                <h4 className="mt-1 break-keep text-base leading-6 font-bold tracking-tight group-hover:underline">{title} <span aria-hidden="true" className="text-[#2347b7]">›</span></h4>
                <p className="mt-1 break-keep text-sm leading-6 text-slate-600">{choice}</p>
              </Link>
            </li>
          ))}
        </ul>
        <details className="border-t border-slate-200">
          <summary className="w-fit cursor-pointer py-3 text-sm font-semibold text-[#2347b7]">관련 구현과 회귀 테스트</summary>
          <ul>
            {forcletterEngineeringCases.map(({ id, title }) => (
              <li key={id}><Link href={`/work/forcletter#${id}`} className={evidenceLink}>{title} ›</Link></li>
            ))}
            <li><Link href="/work/forcletter#poki-action-execution" className={evidenceLink}>AI 작업의 중복 실행 방지 ›</Link></li>
            <li><Link href="/work/forcletter#admin-stats-cache" className={evidenceLink}>배포 직후 통계 캐시 복구 ›</Link></li>
          </ul>
        </details>
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
