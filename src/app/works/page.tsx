import type { Metadata } from "next";
import Link from "next/link";
import WorkArchive from "@/components/WorkArchive";

export const metadata: Metadata = {
  title: "프로젝트별 작업",
  description: "Todari의 프로젝트별 담당 역할과 버그 수정, 기능 구현, 성능 개선 기록입니다.",
  alternates: { canonical: "https://todari.dev/works" },
};

export default function WorksPage() {
  return (
    <main>
      <header className="paper-grid px-5 py-10 text-[#17151c] md:px-10">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-sm font-black text-[#5b38b9]">← 포트폴리오 홈</Link>
          <h1 className="mt-6 text-4xl font-black">프로젝트별 작업</h1>
          <p className="mt-4 leading-7">프로젝트마다 제가 맡은 역할과 해결한 문제를 정리했습니다. 출처를 열면 관련 PR, 커밋, 기술 글을 볼 수 있습니다.</p>
          <a href="#works" className="mt-4 inline-block font-bold underline underline-offset-4">프로젝트 목록으로 바로 이동 ↓</a>
        </div>
      </header>
      <WorkArchive />
    </main>
  );
}
