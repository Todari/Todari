import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "운영 중인 시스템에서 내린 기술 판단을 기록합니다 — 대용량 시계열 설계, 실시간 시계 동기화.",
};

const posts = [
  {
    slug: "ec2-oom-incident",
    label: "INCIDENT RESPONSE · TODARI OPS",
    title: "새벽 3시의 OOM을 시스템으로 되돌리기",
    description:
      "복구는 재부팅 한 줄이었다. 진짜 작업은 그다음 — 스왑, 히스테리시스 경보, CloudWatch 자동 복구, 그리고 '죽은 서버의 알림' 문제를 뒤집어 푸는 것.",
  },
  {
    slug: "token-lifecycle",
    label: "EXTERNAL API AT SCALE · FORCLETTER",
    title: "토큰 4,800개의 수명주기 — 상태 머신과 서킷 브레이커",
    description:
      "토큰 값이 아니라 상태가 진실이다. 외부 장애가 사용자의 의도를 덮어쓰지 못하게 만드는 금지된 전이와, 경보 등급을 가르는 서킷 브레이커.",
  },
  {
    slug: "bluegreen-on-one-ec2",
    label: "ZERO-DOWNTIME OPS · FORCLETTER",
    title: "단일 EC2에서 blue-green 무중단 배포 직접 만들기",
    description:
      "실패한 배포의 기본값을 '무해'로 만드는 헬스체크 게이트, Nginx upstream 스위치, 그리고 기능이 아니라 성질로 얻는 태그 기반 롤백.",
  },
  {
    slug: "snapshot-50m-rows",
    label: "DATA AT SCALE · FORCLETTER",
    title: "5,000만 행 시계열을 일상 조회가 가능한 상태로 유지하기",
    description:
      "왜 스냅샷인가, 인덱스는 왜 두 개뿐인가, JSON 컬럼은 왜 버렸나 — 4,800개 계정의 메트릭이 5,000만 행으로 자라는 동안 내린 판단들.",
  },
  {
    slug: "metronome-clock-sync",
    label: "REALTIME SYNC · 메트로놈들",
    title: "떨어져 있는 기기들의 박자를 하나로 맞추기",
    description:
      "세 개의 시계와 네트워크 지연 위에서 같은 클릭을 재생하기 — RTT 중앙값 오프셋 추정과 Web Audio 50ms 선행 스케줄링.",
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
