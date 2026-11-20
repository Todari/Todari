import type { Metadata } from "next";
import Link from "next/link";
import { aggregationDecision, attributionDecision, forcletterDesignDecisions, recoveryDecision } from "@/data/portfolio-decisions";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "데이터베이스 조회 계획, 집계 메모리, 실시간 오디오 동기화와 장애 복구를 다룹니다. 당시 구현과 수정 전후의 검증 기록을 담았습니다.",
  alternates: { canonical: "https://todari.dev/writing" },
};

const posts = [
  {
    slug: "snapshot-50m-rows",
    label: "DATA AT SCALE · FORCLETTER",
    title: "게시물 지표를 JSON에 담았다가 숫자 컬럼으로 옮긴 이유",
    description:
      "처음 검토한 세 가지 저장 방식, 기존 응답을 유지한 이관, 이력을 보존하면서 최신값만 읽도록 바꾼 쿼리를 살펴봅니다.",
  },
  ...forcletterDesignDecisions.map(({ context, title, choice, slug }) => ({
    slug,
    label: context,
    title,
    description: choice,
  })),
  {
    slug: "geo-aggregation-memory",
    label: "PERFORMANCE · GEO DASHBOARD",
    title: "75만 멘션 집계를 2.5GB 컨테이너 안에 넣기",
    description:
      aggregationDecision.pressure,
  },
  {
    slug: "metronome-clock-sync",
    label: "REALTIME SYNC · 메트로놈들",
    title: "120 BPM에서 첫 두 박만 늦어진 이유",
    description:
      "시작 기기와 방의 박 기준이 달랐습니다. 업로드 지연 세 가지를 주고 첫 두 클릭의 간격을 수정 전후로 비교했습니다.",
  },
  {
    slug: "auto-dm-recovery",
    label: recoveryDecision.context,
    title: recoveryDecision.title,
    description: "같은 계정에서 나흘간 반복된 거절을 하나의 장애로 보고, 발송 결과가 불분명한 댓글과 다시 보내도 될 댓글을 구분한 과정입니다.",
  },
  {
    slug: "native-web-layout-compatibility",
    label: "MOBILE · WEB COMPATIBILITY · FORCLETTER",
    title: "앱과 웹의 업데이트 시차를 다루는 법",
    description:
      "아이폰 듀오에서 탭·포키·빠른 실행의 관계를 맞췄습니다. 앱과 웹이 따로 업데이트되는 상황을 CSS 변수의 기본값과 양쪽 호환 경로로 다룬 과정입니다.",
  },
  {
    slug: "token-lifecycle",
    label: "EXTERNAL API AT SCALE · FORCLETTER",
    title: "토큰 4,800개의 수명주기",
    description:
      "일시적인 외부 API 장애와 사용자 연결 해제에 서로 다른 복구 경로를 둔 상태 머신. 제목의 4,800개는 2026-08 당시 규모입니다.",
  },
  {
    slug: "ec2-oom-incident",
    label: "INCIDENT RESPONSE · TODARI OPS",
    title: "새벽 3시의 OOM을 시스템으로 되돌리기",
    description:
      "수동 재부팅으로 복구한 뒤 스왑·임계 경보·CloudWatch 복구 동작을 설정했습니다. 재발 시험과 근본 원인 제거가 남은 사고 대응 기록입니다.",
  },
  {
    slug: "ad-attribution-cohort",
    label: "AD ATTRIBUTION · FORCLETTER",
    title: "광고가 데려온 가입자를 서버 기준으로 다시 세기",
    description:
      attributionDecision.pressure,
  },
  {
    slug: "marketing-reels-pipeline",
    label: "MARKETING AUTOMATION · FORCLETTER",
    title: "광고 릴스를 검토본까지 자동으로 만들기",
    description:
      "광고 소구·대본에서 제품 화면 촬영·음성·자막·편집까지 연결했습니다. 단계별 재개와 검토 기록을 두고, 검토본 제작과 광고 집행을 나눈 과정입니다.",
  },
] as const;

export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-16 pt-4 text-slate-900 sm:px-6">
      <header className="pb-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-slate-200 pb-2">
          <Link href="/" className="inline-flex min-h-11 w-fit items-center gap-1 rounded-full px-2 text-sm font-semibold text-[#2347b7] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2">
            <span aria-hidden="true">‹</span> 홈
          </Link>
          <h1 className="text-base font-semibold tracking-tight">기술 글</h1>
        </div>
        <p className="mt-4 break-keep px-2 text-sm leading-7 text-slate-700">서비스를 만들 때 어떤 선택지가 있었고 운영하면서 무엇을 다시 설계했는지 기록했습니다. 당시의 코드, 측정값과 그 수치로 답할 수 있는 범위를 함께 담았습니다.</p>
      </header>
      <ul className="divide-y divide-slate-200 rounded-[20px] border border-slate-200 bg-white">
        {posts.map((post) => (
          <li key={post.slug} className="first:[&>a]:rounded-t-[20px] last:[&>a]:rounded-b-[20px]">
            <Link
              href={`/writing/${post.slug}`}
              className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-slate-50 focus-visible:relative focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#2347b7] sm:px-5"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-600">{post.label}</p>
                <h2 className="mt-1 break-keep text-base font-semibold tracking-tight text-[#2347b7] sm:text-lg">{post.title}</h2>
                <p className="mt-1 break-keep text-sm leading-6 text-slate-700">{post.description}</p>
              </div>
              <span aria-hidden="true" className="shrink-0 text-xl leading-none text-[#2347b7]">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
