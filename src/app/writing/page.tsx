import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "운영 중인 시스템에서 내린 기술 판단을 기록합니다. 릴스 제작 자동화, 앱·웹 호환성, 광고 어트리뷰션, 메모리 최적화, 장애 복구, 토큰 상태 머신, 무중단 배포, 대용량 시계열, 실시간 동기화.",
  alternates: { canonical: "https://todari.dev/writing" },
};

const posts = [
  {
    slug: "marketing-reels-pipeline",
    label: "MARKETING AUTOMATION · FORCLETTER",
    title: "광고 릴스를 검토본까지 자동으로 만들기",
    description:
      "광고 소구·대본에서 제품 화면 촬영·음성·자막·편집까지 연결했습니다. 단계별 재개와 검토 기록을 두고, 검토본 제작과 광고 집행을 나눈 과정입니다.",
  },
  {
    slug: "native-web-layout-compatibility",
    label: "MOBILE · WEB COMPATIBILITY · FORCLETTER",
    title: "앱과 웹의 업데이트 시차를 다루는 법",
    description:
      "아이폰 듀오에서 탭·포키·빠른 실행의 관계를 맞췄습니다. 앱과 웹이 따로 업데이트되는 상황을 CSS 변수의 기본값과 양쪽 호환 경로로 다룬 과정입니다.",
  },
  {
    slug: "geo-aggregation-memory",
    label: "PERFORMANCE · GEO DASHBOARD",
    title: "75만 멘션 집계를 2.5GB 컨테이너 안에 넣기",
    description:
      "반복 재시작을 정규식 컴파일, 계산 동시 실행, 멘션 객체 복제로 나눠 진단했습니다. 로딩 구조를 바꾸고 결과를 대조한 2026-09 기록이며, 메모리 관측치의 측정 한계도 함께 남겼습니다.",
  },
  {
    slug: "ad-attribution-cohort",
    label: "AD ATTRIBUTION · FORCLETTER",
    title: "광고가 데려온 가입자를 서버 기준으로 다시 세기",
    description:
      "광고 플랫폼의 전환과 서버의 가입은 기준이 달라 더할 수 없습니다. 가입 채널을 서버에서 판정하고, 숫자가 부족하면 결론을 보류하고, 운영 데이터에서 찾은 오귀속을 막은 과정입니다.",
  },
  {
    slug: "ec2-oom-incident",
    label: "INCIDENT RESPONSE · TODARI OPS",
    title: "새벽 3시의 OOM을 시스템으로 되돌리기",
    description:
      "수동 재부팅으로 복구한 뒤 스왑·임계 경보·CloudWatch 복구 동작을 설정했습니다. 재발 시험과 근본 원인 제거가 남은 사고 대응 기록입니다.",
  },
  {
    slug: "token-lifecycle",
    label: "EXTERNAL API AT SCALE · FORCLETTER",
    title: "토큰 4,800개의 수명주기",
    description:
      "일시적인 외부 API 장애와 사용자 연결 해제에 서로 다른 복구 경로를 둔 상태 머신. 제목의 4,800개는 2026-08 당시 규모입니다.",
  },
  {
    slug: "bluegreen-on-one-ec2",
    label: "ZERO-DOWNTIME OPS · FORCLETTER",
    title: "단일 EC2에서 blue-green 무중단 배포 직접 만들기",
    description:
      "실패한 배포의 기본값을 무해로 만드는 헬스체크 게이트, Nginx upstream 스위치, 태그 기반 롤백으로 구성했습니다.",
  },
  {
    slug: "snapshot-50m-rows",
    label: "DATA AT SCALE · FORCLETTER",
    title: "5,000만 행 시계열을 일상 조회가 가능한 상태로 유지하기",
    description:
      "스키마·복합 인덱스·JSON 컬럼 백필에서 내린 판단을 정리했습니다. 4,800여 계정·5,000만 행은 2026-08 작성 당시 규모입니다.",
  },
  {
    slug: "metronome-clock-sync",
    label: "REALTIME SYNC · 메트로놈들",
    title: "떨어져 있는 기기들의 박자를 하나로 맞추기",
    description:
      "서버 시각 보정과 Web Audio 선행 예약을 분리한 설계입니다. 50ms는 선행 예약 시간이며 기기 사이에서 달성한 동기화 오차를 뜻하지 않습니다.",
  },
] as const;

export default function Page() {
  return (
    <main
      className="min-h-screen bg-[#fffaf0] px-5 py-16 text-[#17151c] md:px-10 md:py-24"
      style={{
        backgroundImage:
          "linear-gradient(rgba(23,21,28,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(23,21,28,.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="font-mono text-[11px] font-black tracking-[0.18em] text-[#5b38b9]"
        >
          ← TODARI.DEV
        </Link>
        <p className="mt-8 inline-flex rotate-[-1deg] items-center rounded-full border-2 border-[#17151c] bg-[#67e8f9] px-4 py-2 font-mono text-[10px] font-black tracking-[0.2em] shadow-[3px_3px_0_#17151c]">
          WRITING
        </p>
        <h1 className="mt-6 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          운영에서 내린 판단을 기록합니다.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#5d5565]">
          실제로 돌아가는 시스템에서 내린 기술 판단과 그 이유를 씁니다.
          수치와 구현은 각 글에 표시한 작성·확인 시점을 기준으로 합니다.
        </p>
        <ul className="mt-12 space-y-5">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="block rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-6 shadow-[8px_8px_0_#17151c] transition-transform hover:-translate-y-1 md:p-7"
              >
                <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#17151c]/70">
                  {post.label}
                </p>
                <h2 className="mt-3 text-xl font-black tracking-[-0.02em] md:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#5d5565]">
                  {post.description}
                </p>
                <span className="mt-4 inline-flex text-sm font-black text-[#5b38b9]">
                  읽기 ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
