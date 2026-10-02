import type { Metadata } from "next";
import Link from "next/link";
import WorkArchive from "@/components/WorkArchive";

export const metadata: Metadata = {
  title: "전체 작업",
  description: "운영 중인 제품부터 개인 실험까지, Todari의 프로젝트와 담당 역할을 살펴보세요.",
  alternates: { canonical: "https://todari.dev/works" },
};

export default function WorksPage() {
  return (
    <main>
      <header className="paper-grid px-5 py-10 text-[#17151c] md:px-10">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-sm font-black text-[#5b38b9]">← 포트폴리오 홈</Link>
          <h1 className="mt-6 text-4xl font-black">전체 작업과 실험</h1>
          <p className="mt-4 leading-7">운영 중인 제품부터 개인 실험까지, 프로젝트와 담당 역할을 확인하세요.</p>
          <a href="#works" className="mt-4 inline-block font-bold underline underline-offset-4">프로젝트 목록으로 바로 이동 ↓</a>
        </div>
      </header>
      <WorkArchive />
    </main>
  );
}
