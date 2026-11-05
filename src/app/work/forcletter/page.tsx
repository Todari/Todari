import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { H2, P } from "../../writing/shell";

export const metadata: Metadata = {
  title: "포크레터 · 다채널 운영과 AI 실행 설계",
  description: "다채널 리포트를 사용자 단위로 묶고, AI 실행 확인과 앱·웹 버전 호환을 설계한 포크레터 개발·운영 사례입니다.",
  alternates: { canonical: "https://todari.dev/work/forcletter" },
};

export default function ForcletterPage() {
  return (
    <main className="paper-grid min-h-screen px-5 py-12 text-[#17151c] md:px-10 md:py-20">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-black text-[#5b38b9]">← 포트폴리오 홈</Link>
        <p className="mt-10 text-xs font-black tracking-widest text-[#5b38b9]">SELECTED WORK · FORCLETTER</p>
        <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">분석·댓글 응대·링크 관리를<br />하나의 운영 도구로.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8">크리에이터는 콘텐츠를 만든 뒤에도 채널 성과를 확인하고, 댓글에 링크를 보내고, 프로필 링크를 고쳐야 합니다. 이 반복 작업을 처리하는 웹·앱·관리자 도구와 AI 포키의 기획·디자인·개발·운영을 맡았습니다.</p>
        <dl className="mt-8 grid gap-4 rounded-2xl border-[3px] border-[#17151c] bg-[#fffaf0] p-6 text-sm md:grid-cols-2">
          <div><dt className="font-black">기간</dt><dd className="mt-2">2025.09 — 현재 · Linkive</dd></div>
          <div><dt className="font-black">내 담당 범위</dt><dd className="mt-2 leading-6">1인 기획·디자인·풀스택 개발·운영, AI 에이전트 설계</dd></div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold text-[#5b38b9]">
          <a href="https://forcreator.co.kr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">서비스 방문 ↗</a>
          <a href="https://apps.apple.com/kr/app/id6758508512" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">App Store ↗</a>
        </div>
        <div className="mt-12 space-y-6">
          <H2>제품 문제 · 채널이 늘수록 반복되는 운영 작업</H2>
          <P>사용자가 확인해야 할 채널별 알림과 따로 바꿔야 할 설정이 늘어나는 문제를 다뤘습니다. 분석 결과를 보여주는 데서 멈추지 않고, 사용자 확인을 거쳐 자동 DM·멀티링크·캠페인 작업을 실행하는 제품 흐름으로 설계했습니다.</P>
          <div className="grid grid-cols-3 items-start gap-3 md:gap-6">
            <Image src="/work/forcletter/product-1.jpg" width={221} height={480} alt="댓글 키워드와 전송 메시지를 설정하는 자동 DM 공개 소개 화면" className="h-auto w-full rounded-xl" sizes="(max-width: 768px) 30vw, 280px" />
            <Image src="/work/forcletter/product-2.jpg" width={221} height={480} alt="AI로 프로필 링크 페이지를 만드는 공개 소개 화면" className="h-auto w-full rounded-xl" sizes="(max-width: 768px) 30vw, 280px" />
            <Image src="/work/forcletter/product-3.jpg" width={221} height={480} alt="브랜드 광고 제안 목록을 보여주는 공개 소개 화면" className="h-auto w-full rounded-xl" sizes="(max-width: 768px) 30vw, 280px" />
          </div>
          <p className="text-xs leading-6 text-[#5d5565]">App Store 공개 소개 이미지 · 제품 소개용 시연 데이터. 고객의 실측 성과 화면이 아닙니다.</p>
          <H2>결정 1 · 채널 수만큼 늘던 리포트를 사람당 한 통으로</H2>
          <P>인스타그램 계정과 유튜브 채널을 사용자 단위로 묶었습니다. 채널별 발송 목록을 만드는 대신 한 사람의 채널 묶음을 만든 뒤 리포트를 생성합니다. 사용자는 여러 알림을 찾아다니지 않고 채널별 변화를 한 리포트에서 비교할 수 있습니다.</P>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="neo-card bg-[#67e8f9] p-6">
              <h3 className="font-black">구현 · 채널을 먼저 묶고 리포트 생성</h3>
              <p className="mt-3 text-sm leading-7">채널 이름과 플랫폼을 함께 표시하고, 유튜브는 최근 7일과 이전 7일의 값을 비교합니다. 서로 다른 채널의 변화가 섞여 보이지 않도록 했습니다.</p>
            </div>
            <div className="neo-card bg-[#fffaf0] p-6">
              <h3 className="font-black">결정 2 · 분석과 실제 변경 사이의 확인</h3>
              <p className="mt-3 text-sm leading-7">포키가 제안한 자동 DM 설정·멀티링크 편집·캠페인 지원은 실행 전에 확인 카드를 거칩니다. 자연어 요청이 실제 계정 변경으로 이어지는 지점에 사용자의 승인을 뒀습니다.</p>
            </div>
          </div>
          <Link href="/writing/native-web-layout-compatibility" className="neo-card block bg-[#dfff4f] p-6">
            <h3 className="font-black">결정 3 · 앱과 웹의 업데이트 순서가 달라도 동작하도록</h3>
            <p className="mt-3 text-sm leading-7">새 웹은 구 앱의 위치 변수를 기본값으로 사용하고, 새 앱은 구 웹의 변수도 유지합니다. 네이티브 탭과 웹 버튼의 좌표 계약으로 혼합 버전의 배치를 다뤘습니다.</p>
            <span className="mt-4 inline-block text-sm font-bold text-[#5b38b9]">앱·웹 호환 설계 읽기 →</span>
          </Link>
          <p className="text-xs leading-6 text-[#5d5565]">통합 리포트와 앱·웹 호환은 2026-11-04 병합 기록을 11-05에 재확인했습니다. Instagram·YouTube는 공개 지원, Threads·TikTok은 지원 예정입니다.</p>
          <H2>마케팅 제작 · 실패한 단계만 다시 실행하는 파이프라인</H2>
          <P>광고 성과·제품 근거를 바탕으로 소구와 대본을 만들고, 촬영용 계정의 제품 UI 조작·녹화, 화면과 대사 대조, 음성·자막·편집을 하나의 제작 흐름으로 연결했습니다. 단계별 결과를 남겨 실패한 지점부터 재개하고, 어드민·Discord에서 검토본과 제작 상태를 확인할 수 있게 했습니다.</P>
          <P>2026-11-02(KST) 실행의 제작 작업 성공과 검토 산출물 존재를 확인했습니다. 구현상 완료한 단계를 재사용할 수 있지만, 제작 시간·비용 절감률이나 광고 전환율 변화는 아직 측정 근거가 없습니다.</P>
          <Link href="/writing/marketing-reels-pipeline" className="inline-block font-bold text-[#5b38b9] underline underline-offset-4">릴스 제작 파이프라인과 검증 범위 읽기 →</Link>
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
          <H2>확인 가능한 규모 · 공개 가입 계정 수</H2>
          <div className="neo-card bg-[#dfff4f] p-6">
            <p className="text-3xl font-black">13,847+</p>
            <p className="mt-3 text-sm leading-7">2026-11-05 공개 홈페이지 표시. 탈퇴하지 않은 가입 계정 수이며, 월 활성·유료 고객 수나 제 작업에 따른 증가분을 뜻하지 않습니다. 홈페이지는 캐시된 값을 표시합니다.</p>
          </div>
          <details className="rounded-xl border-2 border-[#17151c] p-5">
            <summary className="cursor-pointer font-bold">이전 운영 기록 · 2026-10-12 스냅샷</summary>
            <p className="mt-4 text-sm leading-7">당시 직전 30일 활성 크리에이터 2,700+명, 자동 DM 약 4.3만 건을 처리한 기록입니다. 이번에 다시 집계하지 않았으므로 현재 규모를 대신하는 숫자로 사용하지 않습니다. 새 수치를 공개하려면 동일한 집계 정의와 측정 기간, 공개 범위를 먼저 확인해야 합니다.</p>
          </details>
          <H2>사업 판단 · 광고 가입 이후의 사용까지 비교하기</H2>
          <P>광고별 가입자를 서버 유입 정보와 연결하고, 가입 후 14일 관찰이 끝난 코호트의 채널 연결·핵심 기능 사용·결제를 비교하도록 만들었습니다. 기존 회원의 뒤늦은 채널 연결이 신규 광고 가입으로 기록되던 문제에는 가입 후 기록 시간 제한을 뒀습니다. 이 사례의 결과는 판단에 쓰는 데이터의 기준을 바로잡은 것입니다.</P>
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
