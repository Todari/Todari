import { CasePrinciple } from "@/components/WorkExperiences";
import type { Metadata } from "next";
import Link from "next/link";
import { recoveryDecision } from "@/data/portfolio-decisions";
import { ArticleShell, H2, P } from "../shell";

export const metadata: Metadata = {
  title: recoveryDecision.title,
  description: "댓글 자동 DM이 나흘간 약 620번 거절된 뒤, 수신자가 중복 메시지를 받지 않도록 복구 대상과 속도를 바꾼 운영 기록입니다.",
  alternates: { canonical: recoveryDecision.href },
};

export default function Page() {
  return (
    <ArticleShell
      label={recoveryDecision.context}
      title={recoveryDecision.title}
      date="2026.09–10"
      intro="크리에이터는 게시물에 댓글을 달면 DM으로 자료를 보내겠다고 약속합니다. 10월 8일부터 한 계정의 첫 답장이 나흘 동안 약 620번 거절됐습니다. 계정 연결은 유효했고, 서버는 댓글마다 같은 오류를 운영자에게 알리고 있었습니다."
      sourceNote="9월의 복구 구현과 회귀 테스트, 10월 8일 운영 기록, 10월 12일 제가 작성한 변경 두 건(비공개 PR #1169, #1174)을 대조했습니다. 약 620회는 같은 계정에서 집계한 거절 응답 횟수입니다."
    >
      <H2>같은 장애가 댓글 수만큼 커 보였습니다</H2>
      <P>
        댓글 하나가 실패하면 그 댓글을 조사하고 다시 보내는 게 자연스럽습니다. 하지만 이 계정에서는 발송 권한이 일시적으로 막혀 있었습니다. 운영자가 새 알림을 열 때마다 원인은 같았고, 그사이 자동화는 다음 댓글에도 거절될 요청을 보냈습니다.
      </P>
      <P>
        저는 이 응답을 발송 제한으로 분류하도록 바꿨습니다. 연속 거절이 확인된 게시물은 한 시간에 한 번 발송 가능 여부를 확인하고, 운영 알림은 계정별로 하루에 한 번 묶도록 했습니다. 크리에이터 화면에도 발송 제한을 안내했습니다. 운영자와 크리에이터가 같은 상황을 보고 움직일 수 있게 한 변경입니다.
      </P>
      <H2>다시 보낼 수 있는 건 어디까지인가</H2>
      <P>
        외부에서 DM을 보내고 우리 DB에 결과를 쓰는 일은 따로 일어납니다. 그사이 서버가 멈추면, 기록은 미완료여도 수신자는 이미 안내를 받았을 수 있습니다. 이때 복구 버튼 한 번으로 같은 사람에게 두 번째 메시지를 보낼 수 있었습니다.
      </P>
      <P>
        과거 실패를 자동 복구할 때는 명확한 거절 기록에서 출발했습니다. 댓글을 쓴 사람과 발송 규칙이 그대로인지, 이후에 더 최근 발송 기록이 생겼는지 대조합니다. 조건이 맞으면 원래 거절 기록에 연결된 복구 시도를 DB에 먼저 예약합니다. 워커 두 대가 집어도 같은 거절에 대한 복구는 한 번만 시작됩니다. 결과가 불명확하면 자동 반복을 멈추므로 일부 건은 운영자가 확인해야 합니다.
      </P>
      <H2>복구를 늦추는 비용을 받아들였습니다</H2>
      <P>
        이전에는 제한이 풀리면 최근 7일의 밀린 댓글을 5분마다 최대 50건씩 처리했습니다. 한 계정의 차단 직전 관측량을 보고, 저는 이 속도로 과거 요청을 몰아서 보내면 새 댓글의 답장까지 다시 막힐 수 있다고 판단했습니다. 복구 작업 전체가 한 주기에 검토하는 후보를 5건으로 줄였습니다. 오래 기다린 사람에게 답장이 더 늦어지는 비용은 남습니다.
      </P>
      <P>
        모의 발송 테스트에서 두 워커의 중복 예약, 이미 처리된 수신자 제외, 다음 주기와 서버 재시작 이후의 이어 처리를 확인했습니다. 50건에서 5건으로 바뀐 값은 복구 한도입니다. 변경 이후 실제 전달률과 재차단 빈도의 전후 비교는 당시 기록에 없습니다.
      </P>
      <Link href="/work/forcletter" className="inline-block font-semibold underline underline-offset-4">포크레터에서 맡은 기획·개발·운영 보기 →</Link>
      <CasePrinciple project="forcletter" />
    </ArticleShell>
  );
}
