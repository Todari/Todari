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

const linkClass = "rounded-sm font-semibold text-[#2347b7] hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4";

export default async function ProjectWorkPage({ params }: ProjectPageProps) {
  const service = await getProject(params);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-16 pt-4 text-slate-900 sm:px-6">
      <header className="pb-5">
        <div className="grid grid-cols-[1fr_minmax(0,auto)_1fr] items-center gap-2 border-b border-slate-200 pb-2">
          <Link href="/works" className="inline-flex min-h-11 w-fit items-center gap-1 rounded-full px-2 text-sm font-semibold text-[#2347b7] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2">
            <span aria-hidden="true">‹</span> <span className="whitespace-nowrap">전체 작업</span>
          </Link>
          <h1 className="text-center text-base font-semibold tracking-tight [overflow-wrap:anywhere]">{service.title}</h1>
        </div>
        <div className="mt-4 max-w-2xl px-2">
          <p className="text-sm text-slate-600">{service.status} · {service.period}</p>
          <p className="mt-2 break-keep text-base leading-7 text-slate-800">{service.description}</p>
          <dl className="mt-3 break-keep text-sm leading-6">
            <dt className="font-semibold">담당 역할</dt>
            <dd className="text-slate-700">{service.role}</dd>
          </dl>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {service.url && (
              <a href={service.url} className={linkClass}>
                {service.linkLabel ?? "서비스 보기"} <span aria-hidden="true">↗</span>
              </a>
            )}
            {service.publicRepository && service.publicRepository !== service.url && (
              <a href={service.publicRepository} className={linkClass}>
                공개 코드 <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </header>
      <div className="rounded-[20px] border border-slate-200 bg-white px-4 py-5 sm:px-5">
        <WorkExperiences project={service.id} />
      </div>
    </main>
  );
}
