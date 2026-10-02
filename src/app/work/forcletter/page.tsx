import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { H2, P } from "../../writing/shell";

export const metadata: Metadata = {
  title: "포크레터 · 기획부터 운영까지 | Todari",
  description: "크리에이터 SaaS 포크레터의 문제 정의, 1인 기획·디자인·풀스택 담당 범위, 운영 규모와 핵심 설계 판단을 정리했습니다.",
  alternates: { canonical: "https://todari.dev/work/forcletter" },
};

export default function ForcletterPage() {
  return (
    <main className="paper-grid min-h-screen px-5 py-12 text-[#17151c] md:px-10 md:py-20">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-black text-[#5b38b9]">← 포트폴리오 홈</Link>
        <p className="mt-10 text-xs font-black tracking-widest text-[#5b38b9]">SELECTED WORK · FORCLETTER</p>
        <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">크리에이터의 반복 업무를<br />제품으로 연결했습니다.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8">포크레터는 인스타그램 크리에이터를 위한 운영 도구입니다. 댓글 자동 DM, 프로필 링크, 광고 제안과 AI 운영 매니저 포키를 하나의 서비스로 제공합니다.</p>
        <dl className="mt-8 grid gap-4 rounded-2xl border-[3px] border-[#17151c] bg-[#fffaf0] p-6 text-sm md:grid-cols-2">
          <div><dt className="font-black">기간</dt><dd className="mt-2">2025.09 — 현재 · Linkive</dd></div>
          <div><dt className="font-black">내 담당 범위</dt><dd className="mt-2 leading-6">1인 기획·디자인·풀스택 개발·운영, AI 에이전트 설계</dd></div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold text-[#5b38b9]">
          <a href="https://forcreator.co.kr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">서비스 방문 ↗</a>
          <a href="https://apps.apple.com/kr/app/id6758508512" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">App Store ↗</a>
        </div>
        <div className="mt-12 space-y-6">
          <H2>문제 · 콘텐츠 밖에서도 운영은 계속됩니다</H2>
          <P>콘텐츠에 달린 댓글에 링크를 보내고, 프로필의 링크를 관리하고, 브랜드의 광고 제안을 확인하는 일은 반복됩니다. 이 작업들을 한 서비스에서 처리하고, 사용자가 자연어로 요청한 내용을 확인한 뒤 실행하는 흐름으로 연결했습니다.</P>
          <div className="grid grid-cols-3 items-start gap-3 md:gap-6">
            <Image src="/work/forcletter/product-1.jpg" width={221} height={480} alt="댓글 키워드와 전송 메시지를 설정하는 자동 DM 공개 소개 화면" className="h-auto w-full rounded-xl" sizes="(max-width: 768px) 30vw, 280px" />
            <Image src="/work/forcletter/product-2.jpg" width={221} height={480} alt="AI로 프로필 링크 페이지를 만드는 공개 소개 화면" className="h-auto w-full rounded-xl" sizes="(max-width: 768px) 30vw, 280px" />
            <Image src="/work/forcletter/product-3.jpg" width={221} height={480} alt="브랜드 광고 제안 목록을 보여주는 공개 소개 화면" className="h-auto w-full rounded-xl" sizes="(max-width: 768px) 30vw, 280px" />
          </div>
          <p className="text-xs leading-6 text-[#5d5565]">App Store 공개 소개 이미지 · 2026-10-02 확인. 제품 소개용 예시 화면이며, 실제 고객의 운영 데이터를 공개한 화면이 아닙니다.</p>
          <H2>담당 · 화면에서 배포 이후까지</H2>
          <P>기능의 문제 정의와 흐름 설계, UI 디자인, 프론트엔드·서버 구현, 배포와 장애 대응을 맡았습니다. 웹·모바일 앱·관리자 도구를 연결하고, 포키가 실행할 작업과 사용자 확인이 필요한 경계를 설계했습니다.</P>
          <H2>핵심 결정 · 실패해도 복구할 수 있는 운영</H2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/writing/token-lifecycle" className="neo-card bg-[#fffaf0] p-6">
              <h3 className="font-black">일시적 API 실패와 사용자 해제를 분리</h3>
              <p className="mt-3 text-sm leading-7">토큰 만료·일시 장애·직접 연결 해제는 복구 방식이 다릅니다. 하나의 연결 여부 값 대신 상태를 분리하고, 재시도와 회로 차단으로 외부 장애의 영향을 제어했습니다.</p>
              <span className="mt-4 inline-block text-sm font-bold text-[#5b38b9]">토큰 수명주기 설계 →</span>
            </Link>
            <Link href="/writing/bluegreen-on-one-ec2" className="neo-card bg-[#fffaf0] p-6">
              <h3 className="font-black">배포 성공과 서비스 정상 동작을 구분</h3>
              <p className="mt-3 text-sm leading-7">새 컨테이너의 상태를 확인한 뒤 트래픽을 전환하도록 구성했습니다. 문제가 생기면 이전 이미지로 돌아갈 수 있도록 배포와 롤백 경로를 함께 설계했습니다.</p>
              <span className="mt-4 inline-block text-sm font-bold text-[#5b38b9]">단일 EC2 블루그린 배포 →</span>
            </Link>
          </div>
          <H2>운영 규모 · 실제로 감당한 서비스의 크기</H2>
          <dl className="grid grid-cols-2 gap-4 rounded-2xl border-[3px] border-[#17151c] bg-[#dfff4f] p-6">
            <div><dt className="text-sm font-bold">최근 30일 활성 크리에이터</dt><dd className="mt-3 text-3xl font-black">1,900+</dd></div>
            <div><dt className="text-sm font-bold">최근 30일 자동 DM 실행</dt><dd className="mt-3 text-3xl font-black">약 3.8만</dd></div>
          </dl>
          <P>2026-08-04 운영 DB 실측을 바탕으로 반올림한 규모입니다. 현재 실시간 수치나 특정 기능의 도입 전후 성장률을 뜻하지 않습니다. 제가 맡은 제품이 어느 정도의 사용량을 처리했는지 보여주는 기준으로 사용합니다.</P>
          <H2>남은 과제 · 기능 실행이 사용자 가치로 이어지는가</H2>
          <P>실행 건수만으로 제품의 효과를 판단할 수는 없습니다. 광고 플랫폼 전환과 서버의 실제 가입을 구분하고, 가입 이후 활성화를 코호트로 연결했습니다. 측정 체계를 만든 사실과 매출·유지율을 개선했다는 주장은 구분하며, 표본이 부족할 때는 판단을 보류합니다.</P>
          <Link href="/writing/ad-attribution-cohort" className="inline-block font-bold text-[#5b38b9] underline underline-offset-4">가입·활성화 측정의 기준과 한계 읽기 →</Link>
        </div>
        <footer className="mt-16 flex flex-wrap gap-6 border-t-2 border-[#17151c] pt-8 font-bold text-[#5b38b9]">
          <Link href="/">← 다른 대표 사례 보기</Link>
          <a href="mailto:hello@todari.dev">hello@todari.dev ↗</a>
        </footer>
      </article>
    </main>
  );
}
