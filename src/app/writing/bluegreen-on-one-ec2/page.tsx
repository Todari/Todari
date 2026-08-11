import type { Metadata } from "next";
import { ArticleShell, Callout, Code, H2, P } from "../shell";

export const metadata: Metadata = {
  title: "단일 EC2에서 blue-green 무중단 배포 직접 만들기",
  description:
    "PaaS 없이 EC2 한 대에서 무중단 배포를 구현한 기록 — 슬롯 전환, 헬스체크 게이트, Nginx upstream 스위치, 태그 기반 롤백.",
};

export default function Page() {
  return (
    <ArticleShell
      label="ZERO-DOWNTIME OPS · FORCLETTER"
      title="단일 EC2에서 blue-green 무중단 배포 직접 만들기"
      date="2026.08"
      intro="포크레터 API는 EC2 한 대의 도커 컨테이너로 돌아갑니다. 처음의 배포는 '컨테이너 내리고 새로 올리기'였고, 그 몇십 초는 그대로 사용자 장애였습니다. PaaS로 도망가는 대신 blue-green을 직접 만들었습니다 — 생각보다 작은 부품 네 개면 됩니다."
    >
      <H2>구조 — 슬롯 두 개와 스위치 하나</H2>
      <P>
        같은 API 컨테이너를 <code>api-blue</code>, <code>api-green</code> 두
        슬롯으로 정의하고, Nginx가 그중 하나만 upstream으로 바라봅니다.
        배포는 &quot;서비스 교체&quot;가 아니라 &quot;스위치 전환&quot;이
        됩니다.
      </P>
      <Code>{`# deploy-bluegreen.sh의 골격
1. 현재 활성 슬롯 확인 (.deploy-slot 파일)
2. 비활성 슬롯에 새 이미지 pull → 컨테이너 기동
3. 헬스체크 통과까지 대기 (타임아웃 300초)
   → 실패하면 여기서 중단: 트래픽은 여전히 이전 슬롯에
4. Nginx upstream 설정 교체 → nginx -t && nginx -s reload
5. 이전 슬롯 정지, .deploy-slot 갱신`}</Code>
      <P>
        핵심은 3번이 <strong>게이트</strong>라는 점입니다. 새 버전이 뜨지
        못하면 전환 자체가 일어나지 않으니, 실패한 배포의 기본값이
        &quot;장애&quot;가 아니라 &quot;아무 일도 없음&quot;이 됩니다. 그리고
        4번의 <code>nginx -t</code> — 설정을 리로드하기 전에 반드시 검증부터.
        전환 스위치가 고장 나면 슬롯이 둘이어도 소용없기 때문입니다.
      </P>

      <H2>롤백은 기능이 아니라 성질이다</H2>
      <P>
        배포 단위를 &quot;git 브랜치의 최신&quot;이 아니라{" "}
        <strong>이미지 태그</strong>로 잡았습니다. CI를 통과한 커밋만 GHCR에
        태그된 이미지로 올라가고, 배포 스크립트는 태그를 인자로 받습니다.
        그러면 롤백이라는 별도 기능이 필요 없어집니다 — 롤백은 그냥{" "}
        <em>이전 태그로의 배포</em>니까요. 같은 스크립트, 같은 헬스체크
        게이트, 같은 전환. 되돌리는 경로가 나아가는 경로와 동일할 때 새벽의
        롤백도 무섭지 않습니다.
      </P>
      <Code>{`# 롤백 = 이전 태그를 지정한 평범한 배포
./scripts/deploy-from-tag.sh --api-tag <어제의-태그>`}</Code>

      <H2>사람은 어디에 남는가</H2>
      <P>
        스테이징은 dev 브랜치 푸시로 자동 배포되지만, 프로덕션은 GitHub
        environment의 승인 게이트를 거칩니다. 자동화의 목적은 사람을 없애는
        게 아니라 사람의 개입 지점을 <strong>가장 값싼 순간</strong> —
        실행 전 승인 버튼 — 으로 옮기는 것이라고 생각합니다. 배포가 나간
        뒤에는 봇이 실제 프로덕션 URL을 스모크 체크해 Discord로 결과를
        알립니다. &quot;배포 성공&quot;은 CI의 말이 아니라 프로덕션 응답으로
        확인합니다.
      </P>

      <Callout>
        요약 — ① blue-green의 본질은 슬롯 2개가 아니라 &quot;실패한 배포의
        기본값을 무해로 만드는 게이트&quot;다. ② 롤백을 기능으로 만들지 말고
        태그 기반 배포의 성질로 얻어라. ③ 사람의 개입은 없애지 말고 가장 싼
        지점(사전 승인)으로 옮겨라. ④ 배포 성공의 기준은 CI가 아니라
        프로덕션의 응답이다.
      </Callout>

      <H2>한 대짜리 인프라를 변호하며</H2>
      <P>
        &quot;그냥 PaaS 쓰지 그랬냐&quot;는 질문은 정당합니다. 하지만 이
        규모(단일 서비스, 예측 가능한 트래픽)에서 EC2 한 대 + 직접 만든
        blue-green은 PaaS 대비 비용이 몇 분의 일이고, 배포 파이프라인의 모든
        단계를 제가 설명할 수 있습니다. 인프라를 옮겨야 할 트래픽이 오면
        옮길 겁니다 — 그때도 &quot;무엇을 자동화하고 어디에 게이트를
        둘지&quot;라는 이 글의 판단은 그대로 가져갈 수 있습니다.
      </P>
    </ArticleShell>
  );
}
