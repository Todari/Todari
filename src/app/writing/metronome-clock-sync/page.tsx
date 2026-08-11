import type { Metadata } from "next";
import { ArticleShell, Code, H2, P } from "../shell";

export const metadata: Metadata = {
  title: "떨어져 있는 기기들의 박자를 하나로 맞추기",
  description:
    "합주용 실시간 메트로놈을 만들며 겪은 시계 동기화 문제. RTT 중앙값으로 오프셋을 추정하고 Web Audio에 50ms 앞서 예약하는 방식으로 풀었습니다.",
};

export default function Page() {
  return (
    <ArticleShell
      label="REALTIME SYNC · 메트로놈들"
      title="떨어져 있는 기기들의 박자를 하나로 맞추기"
      date="2026.08"
      intro="메트로놈들은 여러 연주자가 각자의 이어폰으로 같은 클릭을 듣는 합주용 메트로놈입니다. 요구사항은 '모두에게 같은 박자' 한 문장인데, 그 밑에는 서로 다른 시계 세 개와 네트워크 지연이 숨어 있었습니다."
    >
      <H2>시계가 세 개다</H2>
      <P>
        기기마다 벽시계(Date.now)가 다르고, 서버의 시계도 다르고, 실제로
        소리를 내는 Web Audio의 하드웨어 클록은 그 둘과 또 다릅니다. 여기에
        네트워크 지연까지 얹히면, 서버가 지금 틱을 보냈다는 정보만으로는 같은
        순간에 소리를 낼 수 없습니다.
      </P>
      <P>
        그래서 문제를 둘로 쪼갰습니다. 먼저 서버 시각과 내 시각의
        차이(오프셋)를 알아내고, 그다음 알아낸 시각에 정확히 소리를 냅니다.
        판단은 벽시계로 하고 재생은 오디오 클록으로 합니다. 두 세계를 섞지
        않는 게 이 설계의 뼈대입니다.
      </P>

      <H2>오프셋 추정, 평균이 아니라 중앙값</H2>
      <P>
        오프셋 추정은 NTP의 축소판입니다. 클라이언트가 자기 시각을 실어 핑을
        보내면 서버가 자기 시각을 실어 돌려주고, 왕복 시간의 절반만큼 보정해서
        차이를 계산합니다.
      </P>
      <Code>{`// 5회 측정, 200ms 간격
const rtt = clientReceiveTime - data.clientSendTime;
const offset = data.serverTime - (data.clientSendTime + rtt / 2);
offsets.push(offset);

// 다섯 표본을 정렬해 중앙값을 채택한다
offsets.sort((a, b) => a - b);
clockOffsetRef.current = offsets[Math.floor(offsets.length / 2)];`}</Code>
      <P>
        중요한 판단은 마지막 두 줄입니다. 평균 대신 중앙값을 씁니다. 와이파이
        RTT는 정규분포가 아니라서 가끔 수백 ms짜리 스파이크가 섞입니다.
        평균을 쓰면 그 스파이크 한 방이 오프셋 전체를 끌고 가는데, 중앙값은
        다섯 표본 중 두 개가 튀어도 흔들리지 않습니다. 접속 중에도 주기적으로
        재동기화해서 시계가 흘러가는 것(drift)을 따라잡습니다.
      </P>

      <H2>재생, setTimeout이 아니라 50ms 선행 예약</H2>
      <P>
        오프셋을 알았으니 서버 기준 T 시각을 로컬 시각으로 환산할 수
        있습니다. 그런데 그 시각에 setTimeout으로 소리를 내면 다시
        어긋납니다. 자바스크립트 타이머는 메인 스레드 사정에 따라 수십 ms씩
        밀리기 때문입니다. 그래서 Web Audio의 표준 패턴인 선행
        스케줄링(lookahead)을 씁니다.
      </P>
      <Code>{`private readonly scheduleAheadSec = 0.05; // 50ms 앞서 예약

// 짧은 주기로 돌면서, 50ms 안에 도래할 노트를
// 오디오 클록의 절대 시각으로 미리 예약해 둔다
while (this.nextNoteTimeSec <= nowAudio + this.scheduleAheadSec) {
  this.scheduleClick(this.nextNoteTimeSec);
  this.advanceToNextNote();
}`}</Code>
      <P>
        타이머는 예약을 거는 일만 하고, 실제 발음 시각은 오디오 하드웨어
        클록이 지킵니다. 타이머가 10ms 밀려도 예약은 이미 50ms 앞서 걸려
        있으니 소리는 정시에 납니다. 네트워크의 불확실성은 오프셋 추정에서
        흡수하고, 런타임의 불확실성은 선행 예약에서 흡수합니다.
      </P>

      <H2>남는 건 iOS와 재접속</H2>
      <P>
        설계가 끝나도 현실이 남습니다. iOS는 사용자 제스처 없이 오디오를
        시작할 수 없어서 활성화 흐름을 따로 만들어야 했고, 재접속할 때는 방
        상태 동기화와 시간 동기화가 경합합니다. 이 경합은 이벤트가 어떤
        순서로 와도 같은 상태에 도달하도록 상태 전이를 정리해서 풀었습니다.
        끊겼다 돌아온 연주자는 다시 5회 핑부터 시작해서 조용히 박자에
        합류합니다.
      </P>
    </ArticleShell>
  );
}
