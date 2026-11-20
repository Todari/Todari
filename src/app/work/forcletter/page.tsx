import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WorkExperiences from "@/components/WorkExperiences";
import { H2, P } from "../../writing/shell";

export const metadata: Metadata = {
  title: "포크레터 · 채널 분석, AI 에이전트, 캠페인 정산과 모바일 앱",
  description: "채널 성과 지표의 저장 방식을 바꾼 이유, 크리에이터 광고 제안가의 평가 기준, 수집 워커를 분리한 뒤 달라진 배포 구조를 소개합니다.",
  alternates: { canonical: "https://todari.dev/work/forcletter" },
};

const articleLink = "font-semibold text-[#2347b7] hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2";

export default function ForcletterPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-16 pt-4 text-slate-900 sm:px-6">
      <article>
        <header className="pb-6">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-slate-200 pb-2">
            <Link href="/works" className="inline-flex min-h-11 w-fit items-center gap-1 rounded-full px-2 text-sm font-semibold text-[#2347b7] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2">
              <span aria-hidden="true">‹</span> 전체 작업
            </Link>
            <h1 className="text-base font-semibold tracking-tight">포크레터</h1>
          </div>
          <p className="mt-6 break-keep text-2xl font-bold leading-tight tracking-tight sm:text-[28px]">크리에이터의 성과를 어떻게 저장하고, 단가를 추정하고, 수집을 계속할까?</p>
          <p className="mt-3 break-keep text-sm leading-7 text-slate-700">크리에이터의 채널 리포트, 댓글 자동 DM, 브랜드 캠페인을 지원하는 Linkive 서비스입니다. 2025년 9월부터 1인 기획·디자인·풀스택 개발·운영과 AI 에이전트 설계를 맡았습니다.</p>
          <nav aria-label="포크레터 관련 링크" className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <a href="#experiences" className={articleLink}>기술 작업과 검증 ↓</a>
            <a href="https://forcreator.co.kr" target="_blank" rel="noopener noreferrer" className={articleLink}>서비스 ↗</a>
            <a href="https://apps.apple.com/kr/app/id6758508512" target="_blank" rel="noopener noreferrer" className={articleLink}>App Store ↗</a>
            <Link href="/writing/snapshot-50m-rows" className={articleLink}>지표 저장과 조회 →</Link>
            <Link href="/writing/creator-price-estimates" className={articleLink}>광고 제안가 추정과 평가 →</Link>
            <Link href="/writing/bluegreen-on-one-ec2#collector-cutover" className={articleLink}>수집 워커의 배포 순서 →</Link>
            <a href="#poki-action-execution" className={articleLink}>AI 작업 실행 ↓</a>
            <Link href="/writing/auto-dm-recovery" className={articleLink}>댓글 DM 장애 대응 →</Link>
            <a href="#reels" className={articleLink}>댓글 자동 DM 릴스 ↓</a>
            <a href="#geo-loop" className={articleLink}>검색·AI 답변 개선 ↓</a>
          </nav>
        </header>

        <section aria-labelledby="engineering-title">
          <h2 id="engineering-title" className="mb-2 px-2 text-sm font-semibold text-slate-600">설계와 검증</h2>
          <div className="divide-y divide-slate-200 rounded-[20px] border border-slate-200 bg-white px-4 sm:px-6">
            <section className="space-y-3 py-5">
              <h3 className="break-keep text-lg font-semibold tracking-tight">게시물 지표를 모으는 방식과 화면에서 읽는 방식은 따로 바뀌었습니다</h3>
              <p className="break-keep text-sm leading-7 text-slate-700">처음에는 게시물마다 다른 지표를 JSON 한 행에 저장했습니다. 이후 SQL 집계를 위해 고정 지표를 숫자 컬럼으로 옮겼습니다. 그래도 목록 한 페이지에서 과거 값 5,845행을 정렬하는 비용은 남았습니다. 게시물별 최신 누적 시각을 먼저 찾고 본문을 유니크 키로 읽도록 바꾸자, 같은 12개 게시물을 조회한 변경 기록에 인덱스 항목 115개와 테이블 행 12개가 남았습니다.</p>
              <Link href="/writing/snapshot-50m-rows" className={`${articleLink} inline-block text-sm`}>저장 방식 세 가지와 최신값 조회의 실행계획 →</Link>
            </section>
            <section id="poki-action-execution" aria-labelledby="poki-action-title" className="scroll-mt-8 space-y-3 py-5">
              <h3 id="poki-action-title" className="break-keep text-lg font-semibold tracking-tight">AI 작업이 성공했는데 결과 기록만 실패했을 때</h3>
              <p className="break-keep text-sm leading-7 text-slate-700">포키는 자동 DM 규칙처럼 설정을 바꾸는 작업을 확인 카드로 준비합니다. 기존에는 작업을 적용한 뒤 완료 이력을 쓰다가 DB 오류가 나면, 실행 실패와 같은 경로로 들어가 선점이 풀렸습니다. 같은 카드를 다시 누르면 이미 반영한 작업이 한 번 더 실행될 수 있었습니다.</p>
              <p className="break-keep text-sm leading-7 text-slate-700">서버가 <strong>대기 중이고 아직 선점되지 않은 카드</strong>만 조건부로 갱신하도록 실행과 취소의 조건을 맞췄습니다. 실행이 먼저 선점하면 취소는 현재 상태를 다시 읽어 반환합니다. 작업이 성공하면 <strong>결과 저장을 최대 세 번</strong> 시도합니다. 모두 실패하면 사용자에게 작업 성공을 돌려주고, 선점을 유지하면서 저장 오류를 로그에 남깁니다. 이때 실제 작업은 끝났어도 카드 이력은 대기 상태로 남다가 만료될 수 있습니다.</p>
              <p className="break-keep text-sm leading-7 text-slate-700">2026년 10월 2일 병합 전 CI에서 내부 단위 테스트가 통과했습니다. 모의 저장소에서 첫 쓰기만 실패하면 작업을 한 번만 호출하는지, 쓰기가 계속 실패하면 성공 응답과 선점이 유지되는지 확인했습니다. 실행이 먼저 선점하면 취소가 최신 상태를 반환하는 경우도 검증했습니다.</p>
            </section>
            <section className="space-y-3 py-5">
              <h3 className="break-keep text-lg font-semibold tracking-tight">첫 Instagram 연결이 오래된 가입의 유입 정보를 바꾸던 문제</h3>
              <p className="break-keep text-sm leading-7 text-slate-700">기존 회원이 광고를 보고 돌아와 처음 Instagram을 연결하면, 비어 있던 광고 ID가 채워져 날짜 제한이 없는 광고별 가입자 목록에 섞였습니다. 공통 저장 경로에서 <strong>가입 후 24시간</strong>을 넘긴 호출에는 유입 정보를 채우지 않도록 했습니다. 24시간은 가입 시각부터 서버에 유입을 기록하는 호출까지 잽니다.</p>
              <p className="break-keep text-sm leading-7 text-slate-700">예산을 비교할 때는 <strong>가입 후 14일</strong>이 지난 회원만 묶어 그 기간의 실제 결제를 셉니다. 늦게 연결한 기존 회원을 신규 성과에서 빼는 대신, 가입 다음 날이 지나 처음 연결한 신규 회원의 유입 정보도 일부 놓칠 수 있습니다.</p>
              <Link href="/writing/ad-attribution-cohort" className={`${articleLink} inline-block text-sm`}>가입·활성화 측정의 기준과 한계 →</Link>
            </section>
            <section className="space-y-3 py-5">
              <h3 className="break-keep text-lg font-semibold tracking-tight">네이티브 탭과 웹 버튼이 자리를 함께 계산하도록</h3>
              <p className="break-keep text-sm leading-7 text-slate-700">듀오 화면에서 탭은 네이티브, 빠른 실행 목록은 웹이 그립니다. 앱이 옆 막대 폭과 버튼 위치를 CSS 변수로 전달하고 웹은 그 위치를 기준으로 목록 바닥과 최대 높이를 계산하도록 맞췄습니다. 새 웹은 위치 변수가 없는 구 앱에서 기존 막대 기준으로 돌아가고, 새 앱은 구 웹이 읽는 막대 위쪽 기준값도 계속 전달했습니다.</p>
              <p className="break-keep text-sm leading-7 text-slate-700">2026년 11월 4일 변경에서 앱 테스트 58개와 듀오·일반 아이폰 시뮬레이터 캡처를 확인했습니다. App Store 0.1.10 출시 노트에 대응이 안내됐으며, 개별 기기의 OTA 적용 시점은 확인 범위 밖입니다.</p>
              <Link href="/writing/native-web-layout-compatibility" className={`${articleLink} inline-block text-sm`}>앱·웹 호환 설계와 검증 →</Link>
            </section>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <H2>보고서는 사용자 단위로 묶고, 비교는 채널별로 유지했습니다</H2>
          <P>채널마다 리포트를 보내면 구현은 단순하지만 연동할수록 같은 사람이 받는 알림이 늘어납니다. Instagram 계정과 YouTube 채널을 사용자 단위로 먼저 묶어 한 통을 만들되, 리포트 안에서는 플랫폼과 채널을 표시해 어느 채널의 지표가 바뀌었는지 확인할 수 있게 했습니다. YouTube는 최근 7일과 그 이전 7일을 비교합니다.</P>
          <figure className="mt-6 rounded-[20px] border border-slate-200 bg-white p-3 md:p-5">
            <div className="grid grid-cols-3 items-start gap-3 md:gap-5">
              <Image src="/work/forcletter/product-1.jpg" width={221} height={480} alt="댓글 키워드와 전송 메시지를 설정하는 자동 DM 공개 소개 화면" className="h-auto w-full rounded-lg" sizes="(max-width: 768px) 30vw, 260px" />
              <Image src="/work/forcletter/product-2.jpg" width={221} height={480} alt="AI로 프로필 링크 페이지를 만드는 공개 소개 화면" className="h-auto w-full rounded-lg" sizes="(max-width: 768px) 30vw, 260px" />
              <Image src="/work/forcletter/product-3.jpg" width={221} height={480} alt="브랜드 광고 제안 목록을 보여주는 공개 소개 화면" className="h-auto w-full rounded-lg" sizes="(max-width: 768px) 30vw, 260px" />
            </div>
            <figcaption className="mt-4 text-xs leading-6 text-slate-600">App Store 공개 소개 이미지입니다. 화면에 보이는 값은 제품 시연용 데이터입니다.</figcaption>
          </figure>
          <p className="text-sm leading-6 text-slate-600">통합 리포트와 앱·웹 호환은 2026년 11월 4일 병합 기록을 다음 날 대조했습니다. 당시 Instagram과 YouTube는 공개 지원 범위였으며, Threads와 TikTok은 지원 예정이었습니다.</p>
        </section>

        <section id="dm-volume" aria-labelledby="volume-heading" className="scroll-mt-5 rounded-[20px] border border-slate-200 bg-white px-[18px] py-4 text-sm sm:px-6">
          <h2 id="volume-heading" className="font-semibold">운영 규모와 집계 기준</h2>
          <p className="mt-2 break-keep leading-6 text-slate-700">2026년 10월 12일 운영 집계에서 직전 30일간 자동 DM은 약 4.3만 건, 활성 크리에이터는 2,700명 이상이었습니다.</p>
          <p className="mt-1 break-keep text-xs leading-5 text-slate-600">11월 5일 홈페이지에 표시한 13,847개 이상은 탈퇴를 제외한 누적 가입 계정 수입니다.</p>
        </section>

        <div className="mt-12 rounded-[20px] border border-slate-200 bg-white p-5 md:p-7">
          <WorkExperiences project="forcletter" />
        </div>

        <section id="reels" aria-labelledby="reels-title" className="mt-12 scroll-mt-8 rounded-[20px] border border-slate-200 bg-white p-5 md:p-7">
          <h2 id="reels-title" className="break-keep text-2xl font-bold tracking-tight md:text-3xl">댓글 자동 DM 릴스와 제작 자동화</h2>
          <div className="mt-6 grid items-start gap-7 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
            <figure className="mx-auto w-full max-w-60 sm:mx-0">
              <video
                aria-label="포크레터 댓글 자동 DM 소개 릴스"
                className="aspect-[9/16] w-full rounded-xl bg-slate-900 object-contain"
                controls
                playsInline
                preload="none"
                poster="/work/forcletter/reel-poster.webp"
                width={1080}
                height={1920}
              >
                <source src="/work/forcletter/reel-auto-dm.mp4" type="video/mp4" />
                <a href="/work/forcletter/reel-auto-dm.mp4">댓글 자동 DM 영상 파일 열기</a>
              </video>
              <figcaption className="mt-2 text-xs leading-5 text-slate-600">2026년 9월 공개 제품 데모 편집본 · 17초 · 자막·무음</figcaption>
            </figure>
            <div className="space-y-5 break-keep text-sm leading-7 text-slate-700">
              <div>
                <h3 className="font-bold text-slate-900">제품 화면이 보여줄 수 있는 약속만 담기</h3>
                <p className="mt-1">링크를 반복해서 보내는 상황을 첫 장면으로 잡았습니다. 공식 제품 데모의 설정 카드를 확대해 댓글 키워드와 발송 문구를 함께 보여 주고, 자막으로 어떤 댓글에 안내가 나가는지 설명했습니다.</p>
                <a href="https://forcreator.co.kr/instagram-auto-dm" target="_blank" rel="noopener noreferrer" className={articleLink}>댓글 자동 DM 제품 근거 ↗</a>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h3 className="font-bold text-slate-900">소재 제작을 재개하고 광고 집행 기준을 따로 두었습니다</h3>
                <p className="mt-1">후속 파이프라인은 촬영 프레임과 대본을 대조한 뒤 음성과 편집을 만들고, 해결하지 못한 불일치는 검토본에 표시합니다. 촬영용 계정과 쓰기 제한을 두고 단계별 산출물을 저장해, 한 편의 편집이 실패했을 때 완료한 촬영과 음성을 재사용할 수 있게 했습니다.</p>
                <p className="mt-2">11월 2일 국내 크리에이터용 소재 5편을 29분 6초 만에 제작했습니다. 배속별 검토본은 10개였고 이 실행에서 게시한 편은 0편이었습니다. 게재와 예산은 별도 어드민 설정에서 관리합니다.</p>
              </div>
              <Link href="/writing/marketing-reels-pipeline" className={articleLink}>릴스 제작 단계와 검증 범위 →</Link>
            </div>
          </div>
        </section>

        <section id="geo-loop" aria-labelledby="geo-loop-title" className="mt-12 scroll-mt-8 rounded-[20px] border border-slate-200 bg-white p-5 md:p-7">
          <h2 id="geo-loop-title" className="break-keep text-2xl font-bold tracking-tight md:text-3xl">검색과 AI 답변을 보고 포크레터 글을 고쳤습니다</h2>
          <div className="mt-5 space-y-5 break-keep text-sm leading-7 text-slate-700">
            <div>
              <h3 className="font-bold text-slate-900">이미 검색되는 글부터 보강했습니다</h3>
              <p className="mt-1">Google Search Console에서 최근 28일간 확정된 검색어와 실제 노출 페이지를 연결했습니다. 같은 질문에 이미 노출된 글이 있으면 그 글을 보강하고, 다루지 않은 질문에만 새 글을 제안합니다. 한국어 블로그를 대상으로, 별도 AI 검증에서 원문과 검색 근거로 주장을 확인하고 구조와 링크 검사까지 통과한 글을 게시합니다.</p>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <h3 className="font-bold text-slate-900">변화가 쌓일 때까지 기다리고, 악화하면 복원합니다</h3>
              <p className="mt-1">2026년 10월 27일부터 후보 글이 모두 관찰 대기에 들어가 새로 게시한 변경이 없었습니다. 10월 30일에는 보통 14일치 검색 데이터가 쌓이면 재검토하고, 직전 28일간 클릭이 100회 이상인 글은 28일을 기다리도록 바꿨습니다.</p>
              <p className="mt-2">게시 당일을 빼고 전후 7·14·28일의 클릭과 노출을 비교합니다. 사이트 전체의 클릭 변화와 작은 표본에서 생기는 변동을 고려합니다. 클릭이 줄고 같은 노출에서 기대한 클릭 수도 뚜렷이 밑돌 때 자동 변경을 되돌립니다. 그 사이 사람이 편집한 글은 그대로 둡니다.</p>
              <p className="mt-2">당시 글 두 편에 기준을 대입했습니다. 클릭률까지 떨어진 글은 복원 후보가 됐고, 노출만 줄어든 글은 유지 대상이었습니다. 같은 글의 전후 비교에는 계절과 검색 수요 변화도 섞이므로, 이 기록으로 확인한 것은 복원 기준의 동작까지입니다.</p>
              <a href="https://support.google.com/webmasters/answer/7042828?hl=ko" className={articleLink}>Google Search Console의 노출·클릭 정의 ↗</a>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <h3 className="font-bold text-slate-900">AI가 발췌하는 답 문장도 확인했습니다</h3>
              <p className="mt-1">11월 9일 AiBright 측정에서 포크레터 글을 출처로 쓰면서 서비스명은 생략한 AI 답변을 확인했습니다. 사용법과 자주 묻는 질문의 답이 따로 인용되는 사례를 보고, 실제로 포크레터 기능이 답에 도움이 되는 곳에서 서비스명을 함께 설명하도록 초안 작성과 자동 수정, 검수 기준을 바꿨습니다.</p>
              <a href="https://forcreator.co.kr/blog" target="_blank" rel="noopener noreferrer" className={`${articleLink} mt-2 inline-block`}>포크레터 공개 블로그 ↗</a>
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-4 border-t border-slate-200 pt-8">
          <H2>복구할 때도 사용자의 의사와 서비스 상태를 보존했습니다</H2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">연결 해제는 사용자의 의사로 기록</h3>
              <p className="mt-2 break-keep text-sm leading-7 text-slate-700">잠깐의 API 오류로 토큰을 만료 처리하면 잘못된 재연동 안내가 갈 수 있습니다. 명확한 영구 오류에서만 만료를 기록하고, 사용자가 끊은 계정에는 API 호출과 안내를 중단합니다. 외부 장애가 넓게 퍼지면 회로 차단으로 재시도 부담을 줄입니다.</p>
              <Link href="/writing/token-lifecycle" className={articleLink}>토큰 수명주기 설계 →</Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">정상 응답을 확인한 뒤 배포 전환</h3>
              <p className="mt-2 break-keep text-sm leading-7 text-slate-700">단일 EC2에서 비활성 슬롯에 새 이미지부터 띄웁니다. 상태 검사에 실패하면 이전 슬롯이 트래픽을 계속 받습니다. 롤백도 이전 이미지 태그로 같은 배포 경로를 사용하고, 전환 뒤에는 실제 공개 URL을 확인합니다.</p>
              <Link href="/writing/bluegreen-on-one-ec2" className={articleLink}>단일 EC2 블루그린 배포 →</Link>
            </div>
          </div>
        </section>

        <footer className="mt-12 flex flex-wrap gap-6 border-t border-slate-200 pt-6 text-sm">
          <Link href="/works" className={articleLink}>← 전체 작업</Link>
          <a href="mailto:hello@todari.dev" className={articleLink}>hello@todari.dev ↗</a>
        </footer>
      </article>
    </main>
  );
}
