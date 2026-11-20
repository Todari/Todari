import type { Metadata } from "next";
import { CasePrinciple } from "@/components/WorkExperiences";
import { ArticleShell, Code, H2, P } from "../shell";

const title = "120 BPM에서 첫 두 박만 늦어진 이유";
export const metadata: Metadata = {
  title,
  description: "실제 메트로놈 클라이언트에 가상 시계와 네트워크 지연을 주고, 첫 두 박의 간격을 수정 전후로 비교했습니다. 박의 기준 시각, 오프셋 추정, Web Audio 예약의 역할을 설명합니다.",
  alternates: { canonical: "/writing/metronome-clock-sync" },
};

export default function Page() {
  return (
    <ArticleShell
      label="메트로놈들 · 실시간 오디오 동기화"
      title={title}
      date="2026.10 수정 · 2026.11 재현"
      intro="합주에서 재생을 누른 사람에게 첫 클릭은 즉시 들려야 합니다. 그런데 첫 두 박 사이만 늘어졌습니다. 120 BPM으로 고정하고 업로드에 40ms가 걸리게 하자 첫 간격은 539ms, 그다음부터는 정확히 500ms였습니다."
    >
      <H2>첫 박과 두 번째 박의 출발점이 달랐습니다</H2>
      <P>
        시작 기기는 자체 시계로 첫 박을 예약합니다. 서버는 시작 요청을 받은 시각을 방의 첫 박으로 기록하고 다른 기기에 전파했습니다.
        시작 기기마저 두 번째 박부터 그 기준으로 옮겨가면서 첫 구간에만 전송 시간이 더해졌습니다. 타이머를 더 자주 실행해도 두 기준점 사이의 차이는 그대로입니다.
      </P>
      <P>
        모든 기기가 서버 응답을 기다리면 기준을 하나로 만들 수 있지만, 재생을 누른 사람도 왕복 지연을 기다려야 합니다.
        로컬 재생을 유지하고, 시작 기기가 사용한 첫 박의 기준 시각을 서버 시계로 환산해 요청에 실었습니다.
        서버는 제안값과 수신 시각의 차이가 1초 이내면 제안을 채택합니다. 값이 없거나 범위를 벗어나면 수신 시각을 사용합니다. 크게 어긋난 기기 한 대가 방 전체의 기준을 옮기는 범위를 이렇게 제한했습니다.
      </P>

      <H2>업로드만 바꿔 수정 전후를 비교했습니다</H2>
      <P>
        PR #12의 가상 시계에서 수정 직전과 병합 시점의 실제 클라이언트를 각각 실행했습니다. 템포는 120 BPM, 다운로드는 30ms, 서버와 로컬 시계 차이는 37ms로 고정했습니다.
        Web Audio의 오실레이터에 전달한 예약 시각을 읽어 첫 두 클릭의 간격을 구했습니다.
      </P>
      <table className="w-full table-fixed border-collapse text-left text-sm tabular-nums">
        <caption className="pb-2 text-left font-semibold">업로드 지연에 따른 첫 두 박의 예약 간격</caption>
        <thead className="border-y border-slate-200 bg-slate-50">
          <tr><th scope="col" className="p-2.5">업로드 지연</th><th scope="col" className="p-2.5">수정 전</th><th scope="col" className="p-2.5">수정 후</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-200 border-b border-slate-200">
          {[[0, 499, 500], [40, 539, 500], [120, 619, 500]].map(([upload, before, after]) => (
            <tr key={upload}><th scope="row" className="p-2.5 font-medium">{upload}ms</th><td className="p-2.5">{before}ms</td><td className="p-2.5 font-bold text-[#2347b7]">{after}ms</td></tr>
          ))}
        </tbody>
      </table>
      <P>
        로컬 첫 클릭은 시작 기준보다 1ms 뒤에 예약됩니다. 수정 전 업로드가 0ms여도 첫 간격이 499ms였던 이유입니다.
        수정 후 기본 조건에서 7개 클릭은 서버 기준 1, 501, 1001ms부터 3001ms까지 이어졌습니다. 테스트는 박의 누락·중복과 각 예약 시각의 ±2ms 범위를 검사합니다.
        측정 대상은 시작 기기의 예약 시각입니다. 실제 기기 간 소리 차이를 알려면 각 출력 장치의 지연까지 측정해야 합니다.
      </P>
      <a href="https://github.com/Todari/metro-nomedeul/blob/1d2edeefa3ad43fa9528e4c4a6f9876bc2b9d003/scripts/metronome-sync-check.mjs" className="font-semibold underline underline-offset-4">가상 시계와 클릭 누락·중복 회귀 검사 ↗</a>

      <H2>서버 시각을 추정하고, 오디오 시계에 예약합니다</H2>
      <P>
        방에 들어오는 기기에는 서버와의 시계 차이를 이미 알고 있다는 실험 조건이 없습니다. 핑을 보내고 응답을 받은 중간 시각을 서버가 응답한 순간으로 추정합니다.
        200ms 간격으로 다섯 번 표본을 모아 계산한 오프셋의 중앙값을 씁니다.
      </P>
      <Code>{`왕복 시간 = 수신 시각 − 송신 시각
추정 오프셋 = 서버 응답 시각 − (송신 시각 + 왕복 시간 / 2)
로컬 박 기준 = 서버 박 기준 − 추정 오프셋`}</Code>
      <P>
        중앙값은 일시적으로 늦은 응답의 영향을 줄입니다. 매번 가는 데 40ms, 돌아오는 데 30ms가 걸리면 추정에는 여전히 약 5ms의 편향이 남습니다.
        위 실험에서는 시계 차이를 고정해 이 오차와 첫 박의 기준을 잘못 잡은 효과를 따로 볼 수 있었습니다.
      </P>
      <P>
        기기는 보정된 시각을 Web Audio 시계로 옮깁니다. 화면 프레임마다 앞으로 50ms 안에 올 클릭을 찾아 오디오 엔진에 절대 시각으로 예약합니다.
        한 프레임이 늦어도 이미 예약한 박은 제 시각을 유지합니다. 메인 스레드가 50ms보다 오래 멈추면 아직 예약하지 못한 박까지 지킬 수는 없습니다.
      </P>

      <H2>오디오가 시작되지 않아도 다음 시도를 허용합니다</H2>
      <P>
        iOS에서는 사용자 제스처 밖에서 요청한 오디오 재개가 끝나지 않을 수 있습니다. 재개를 무기한 기다리면 시작 중 플래그가 남아 재생 버튼을 다시 눌러도 동작하지 않습니다.
        제스처 안에서 오디오 컨텍스트를 먼저 깨우고 재개 대기에 상한을 뒀습니다. 회귀 검사에서는 끝나지 않는 Promise를 주입해 시작 호출이 반환되고 플래그가 풀리는지 확인합니다.
      </P>
      <a href="https://github.com/Todari/metro-nomedeul/pull/12" className="font-semibold underline underline-offset-4">시작 시각 전달과 iOS 재시도 수정 · PR #12 ↗</a>
      <CasePrinciple project="metronomdeul" />
    </ArticleShell>
  );
}
