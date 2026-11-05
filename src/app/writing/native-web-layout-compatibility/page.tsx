import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell, Callout, H2, P } from "../shell";

export const metadata: Metadata = {
  title: "앱과 웹의 업데이트 시차를 다루는 법",
  description:
    "포크레터 아이폰 듀오 대응에서 탭·포키·빠른 실행의 배치를 맞추고, 앱과 웹의 업데이트 시차를 CSS 변수의 기본값과 호환 경로로 다룬 과정입니다.",
  alternates: {
    canonical: "https://todari.dev/writing/native-web-layout-compatibility",
  },
};

export default function Page() {
  return (
    <ArticleShell
      label="MOBILE · WEB COMPATIBILITY · FORCLETTER"
      title="앱과 웹의 업데이트 시차를 다루는 법"
      date="2026.11.05"
      sourceNote="이 글은 병합된 구현 변경, 당시 검증 기록과 공개 앱 릴리스 안내를 대조해 작성했습니다. 궁금한 점은 편하게 연락 주세요."
      intro="포크레터의 아이폰 듀오 대응은 화면을 넓히는 일에서 끝나지 않았습니다. 네이티브 탭과 웹의 빠른 실행 버튼이 함께 놓이는 화면에서, 폰과 듀오의 조작 방식을 맞추고 서로 다른 시점에 업데이트되는 앱과 웹도 함께 고려해야 했습니다."
    >
      <H2>버튼의 좌표보다 관계를 먼저 맞췄다</H2>
      <P>
        일반 아이폰에서는 포키 버튼 옆에 탭이 있고, 빠른 실행 버튼은 포키
        위의 본문 쪽에 놓입니다. 듀오의 옆 막대로 옮길 때도 이 관계가
        유지돼야 했습니다. 탭을 세로로 쌓는 과정에서 빠른 실행까지 막대
        안에 넣으면 같은 제품인데도 사용자가 버튼을 찾는 방식이 달라집니다.
      </P>
      <P>
        그래서 옆 막대 아래에 포키를 두고, 바로 위에 탭을 배치했습니다.
        빠른 실행과 글쓰기 같은 문맥별 버튼은 포키 왼쪽의 본문 쪽으로
        옮겼습니다. 버튼 크기와 간격도 폰과 맞춰 방향이 달라져도 익숙한
        조작 관계를 유지했습니다.
      </P>

      <H2>앱이 차지한 공간을 웹에도 알려줘야 했다</H2>
      <P>
        탭과 일부 버튼은 네이티브가 그리고, 빠른 실행 목록 등은 웹이
        그립니다. 각자 화면 끝에서 같은 거리만 띄우면 서로 겹칩니다.
        앱이 옆 막대의 폭과 버튼 위치를 계산하고 CSS 변수로 전달해,
        웹의 버튼과 패널도 같은 공간 기준을 쓰도록 했습니다.
      </P>
      <P>
        웹의 빠른 실행 목록은 버튼 위에 열되 헤더와 상태 표시 영역을
        침범하지 않도록 높이를 제한했습니다. 웹 하단에 고정 버튼이 있는
        화면에서는 문맥별 버튼의 위치도 함께 올렸습니다.
      </P>

      <H2>새 앱과 새 웹만 맞으면 충분하지 않다</H2>
      <P>
        웹을 배포하는 시점과 사용자의 앱에 OTA 업데이트가 적용되는 시점은
        다릅니다. 새 좌표 변수만 읽도록 웹을 바꾸면 예전 앱에서는 값이
        없습니다. 반대로 앱이 기존 변수의 의미를 버리면 아직 예전 웹을
        보고 있는 화면에서 버튼이 탭과 겹칠 수 있습니다.
      </P>
      <Callout>
        새 웹은 새 위치 변수가 없으면 기존 위치 계산으로 돌아갑니다.
        새 앱은 예전 웹이 읽는 변수도 계속 제공해 탭 영역을 피하게 합니다.
        양쪽의 호환 경로를 두고 웹 릴리스 뒤 앱 OTA를 배포하는 순서로 정리했습니다.
      </Callout>

      <H2>확인한 범위와 남은 범위를 구분한다</H2>
      <P>
        11월 4일 변경 기록에서는 앱 타입 검사와 테스트 58개 통과,
        같은 번들을 듀오·일반 아이폰 시뮬레이터에 넣은 비교 캡처를
        확인했습니다. App Store 0.1.10 출시 노트에도 듀오 화면과 옆 막대
        대응이 안내돼 있습니다. 시뮬레이터 검증과 공개 출시 기록이 모든
        사용자의 기기에서 최신 OTA 적용을 보장하는 것은 아닙니다.
      </P>
      <P>
        반응형 화면에서는 크기별 배치뿐 아니라 앱과 웹이 공유하는 값의
        의미도 유지해야 합니다. 이번 변경은 그 계약에 기본값을 두어
        업데이트가 동시에 도착하지 않는 상황을 다룬 사례입니다.
      </P>
      <a href="https://apps.apple.com/kr/app/id6758508512" target="_blank" rel="noopener noreferrer" className="inline-block font-bold text-[#5b38b9] underline underline-offset-4">
        App Store 공개 출시 기록 ↗
      </a>
      <p className="text-xs leading-6 text-[#5d5565]">출시 노트와 2026-11-04 병합된 앱·웹 변경을 2026-11-05에 대조했습니다. 테스트 수는 당시 변경 기록의 결과입니다.</p>
      <Link href="/work/forcletter" className="inline-block font-bold text-[#5b38b9] underline underline-offset-4">
        포크레터 제품과 담당 범위 보기 →
      </Link>
    </ArticleShell>
  );
}
