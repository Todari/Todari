import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkExperiences from "@/components/WorkExperiences";
import { services } from "@/data/services";
import { workExperiences } from "@/data/work-experiences";

const projects = services.filter(({ id }) => id !== "forcletter" && id !== "geo");

type ProjectPageProps = { params: Promise<{ project: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ id }) => ({ project: id }));
}

async function getProject(params: Promise<{ project: string }>) {
  const { project } = await params;
  const service = projects.find(({ id }) => id === project);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const service = await getProject(params);
  return {
    title: `${service.title} · 작업과 해결 과정`,
    description: workExperiences[service.id][0].change,
    alternates: { canonical: `https://todari.dev${service.caseStudy}` },
  };
}

export default async function ProjectWorkPage({ params }: ProjectPageProps) {
  const service = await getProject(params);

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#17151c]">
      <header className="paper-grid border-b-2 border-[#17151c] px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          <Link href="/works" className="text-sm font-bold text-[#5b38b9] underline-offset-4 hover:underline">
            ← 전체 작업
          </Link>
          <p className="mt-8 flex flex-wrap items-center gap-2 text-xs font-bold text-[#5d5565]">
            <span className="rounded-full border border-[#17151c] bg-[#fffaf0] px-2.5 py-1">{service.status}</span>
            <span>{service.period}</span>
          </p>
          <h1 className="mt-4 [overflow-wrap:anywhere] text-4xl font-black tracking-tight md:text-6xl">{service.title}</h1>
          <p className="mt-4 max-w-2xl break-keep text-lg leading-7">{service.description}</p>
          <p className="mt-4 break-keep text-sm leading-6 text-[#5d5565]">
            <span className="font-black text-[#17151c]">맡은 역할</span> · {service.role}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[#5b38b9]">
            {service.url && <a href={service.url} className="underline underline-offset-4">{service.linkLabel ?? "서비스 보기"} ↗</a>}
            {service.publicRepository && service.publicRepository !== service.url && (
              <a href={service.publicRepository} className="underline underline-offset-4">공개 코드 ↗</a>
            )}
          </div>
        </div>
      </header>
      <div className="mx-auto box-content max-w-4xl px-5 py-10 md:px-10 md:py-14">
        <WorkExperiences experiences={workExperiences[service.id]} />
      </div>
    </main>
  );
}
