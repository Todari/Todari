import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "운영 중인 시스템에서 내린 기술 판단을 기록합니다. 장애 복구, 토큰 상태 머신, 무중단 배포, 대용량 시계열, 실시간 동기화.",
};

const posts = [
  {
    slug: "ec2-oom-incident",
    label: "INCIDENT RESPONSE · TODARI OPS",
    title: "새벽 3시의 OOM을 시스템으로 되돌리기",
    description:
      "복구는 재부팅 한 줄이었습니다. 진짜 작업은 스왑과 경보, CloudWatch 자동 복구까지, 같은 장애가 사람 없이 끝나게 만드는 일이었습니다.",
  },
  {
    slug: "token-lifecycle",
    label: "EXTERNAL API AT SCALE · FORCLETTER",
    title: "토큰 4,800개의 수명주기",
    description:
      "토큰 값이 아니라 상태가 진실입니다. 외부 장애가 사용자의 의도를 덮어쓰지 못하게 만든 상태 머신과 서킷 브레이커 이야기.",
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
      "계정 4,800여 개의 메트릭이 5,000만 행으로 자라는 동안 스키마와 인덱스, JSON 컬럼 백필에서 내린 판단들을 정리했습니다.",
  },
  {
    slug: "metronome-clock-sync",
    label: "REALTIME SYNC · 메트로놈들",
    title: "떨어져 있는 기기들의 박자를 하나로 맞추기",
    description:
      "시계 세 개와 네트워크 지연 위에서 같은 클릭을 재생하기. RTT 중앙값으로 오프셋을 추정하고 Web Audio에 50ms 앞서 예약합니다.",
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
          실제로 돌아가는 시스템에서 내린 기술 판단과 그 이유를 씁니다. 모든
          수치와 코드는 운영 중인 코드베이스 기준입니다.
        </p>
        <ul className="mt-12 space-y-5">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="block rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-6 shadow-[8px_8px_0_#17151c] transition-transform hover:-translate-y-1 md:p-7"
              >
                <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#17151c]/40">
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
