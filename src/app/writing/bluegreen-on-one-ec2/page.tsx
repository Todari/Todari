import type { Metadata } from "next";
import { ArticleShell, Code, H2, P } from "../shell";

export const metadata: Metadata = {
  title: "단일 EC2에서 blue-green 무중단 배포 직접 만들기",
  description:
    "PaaS 없이 EC2 한 대에서 무중단 배포를 만든 기록. 슬롯 전환, 헬스체크 게이트, Nginx upstream 스위치, 태그 기반 롤백으로 구성했습니다.",
};

export default function Page() {
  return (
    <ArticleShell
      label="ZERO-DOWNTIME OPS · FORCLETTER"
      title="단일 EC2에서 blue-green 무중단 배포 직접 만들기"
      date="2026.08"
      intro="포크레터 API를 배포할 때 기존 컨테이너를 먼저 내리면 새 버전이 준비될 때까지 수십 초간 요청을 처리할 수 없었습니다. 단일 EC2 안에 두 배포 슬롯을 두고, 새 버전을 검증한 뒤 Nginx에서 트래픽을 전환하도록 바꿨습니다."
    >
      <H2>비활성 슬롯에서 검증한 뒤 트래픽 전환</H2>
      <P>
        같은 API를 api-blue와 api-green 두 슬롯으로 정의했습니다. 현재 슬롯은 요청을 계속 처리하고, 비활성 슬롯에서 새 이미지의 기동과 헬스체크를 마칩니다.
      </P>
      <Code>{`# deploy-bluegreen.sh의 골격
1. 현재 활성 슬롯 확인 (.deploy-slot 파일)
2. 비활성 슬롯에 새 이미지 pull, 컨테이너 기동
3. 헬스체크 통과까지 대기 (타임아웃 300초)
   실패하면 여기서 중단. 트래픽은 여전히 이전 슬롯에 있다
4. Nginx upstream 설정 교체, nginx -t && nginx -s reload
5. 이전 슬롯 정지, .deploy-slot 갱신`}</Code>
      <P>
        헬스체크가 300초 안에 통과하지 못하면 기존 슬롯이 계속 요청을 받습니다. 통과한 경우에도 nginx -t로 새 설정을 검사한 다음 리로드합니다. 이전 슬롯은 트래픽 전환 후에 내립니다.
      </P>

      <H2>이미지 태그로 롤백 경로 재사용</H2>
      <P>
        CI를 통과한 커밋의 이미지를 GHCR에 태그로 보관합니다. 배포 스크립트가 이미지 태그를 입력받기 때문에, 복구할 때도 이전 태그로 동일한 검증과 전환 절차를 실행합니다.
      </P>
      <Code>{`# 롤백 = 이전 태그를 지정한 평범한 배포
./scripts/deploy-from-tag.sh --api-tag <어제의-태그>`}</Code>
      <P>
        이 경로로 복원하는 단위는 API 컨테이너 이미지입니다. DB 스키마와 이미 기록된 데이터는 별도로 호환성을 판단해야 합니다.
      </P>

      <H2>프로덕션 승인과 외부 응답 확인</H2>
      <P>
        스테이징은 dev 브랜치 푸시로 배포합니다. 프로덕션은 GitHub environment에서 승인한 뒤 선택한 태그를 배포합니다.
      </P>
      <P>
        전환 후에는 봇이 실제 프로덕션 URL에 요청을 보내고 결과를 Discord로 전달합니다. 이 검사는 새 컨테이너의 내부 헬스체크 이후, 외부 요청이 전환된 경로까지 도달하는지 확인합니다.
      </P>

      <H2>단일 호스트가 감당하는 장애 범위</H2>
      <P>
        이 구성은 한 호스트에서 애플리케이션 교체 중 생기는 중단을 다룹니다. 두 슬롯이 메모리와 호스트를 공유하므로, 배포 중 두 버전을 함께 띄울 여유가 필요하고 EC2 자체의 장애는 두 슬롯에 동시에 영향을 줍니다.
      </P>
    </ArticleShell>
  );
}
