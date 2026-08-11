import type { Metadata } from "next";
import { ArticleShell, Callout, Code, H2, P } from "../shell";

export const metadata: Metadata = {
  title: "떨어져 있는 기기들의 박자를 하나로 맞추기",
  description:
    "합주용 실시간 메트로놈 '메트로놈들'의 시계 동기화 — RTT 중앙값 오프셋 추정과 Web Audio 50ms 선행 스케줄링을 코드로 설명합니다.",
};

export default function Page() {
  return (
    <ArticleShell
      label="REALTIME SYNC · 메트로놈들"
      title="떨어져 있는 기기들의 박자를 하나로 맞추기"
      date="2026.08"
      intro="메트로놈들은 여러 연주자가 각자의 이어폰으로 같은 클릭을 듣는 합주용 메트로놈입니다. 요구사항은 한 문장인데 — '모두에게 같은 박자' — 그 밑에는 서로 다른 세 개의 시계와 네트워크 지연이 숨어 있습니다. 이 글은 그 문제를 어떻게 쪼갰는지에 대한 기록입니다."
    >
      <H2>문제는 하나가 아니라 세 개의 시계다</H2>
      <P>
        기기마다 벽시계(Date.now)가 다르고, 서버의 시계도 다르며, 소리를 실제로
        내는 Web Audio의 하드웨어 클록은 그 둘과 또 다릅니다. 여기에 네트워크
        지연까지 얹히면 &quot;서버가 지금 틱을 보냈다&quot;는 정보만으로는 절대
        같은 순간에 소리 낼 수 없습니다. 그래서 문제를 둘로 쪼갰습니다 —{" "}
        <strong>① 서버 시각과 내 시각의 차이(오프셋)를 알아내기, ② 알아낸
        시각에 정확히 소리 내기.</strong> 판단은 벽시계로, 재생은 오디오
        클록으로. 두 세계를 섞지 않는 것이 설계의 뼈대입니다.
      </P>

      <H2>① 오프셋 추정 — 평균이 아니라 중앙값</H2>
      <P>
        오프셋 추정은 NTP의 축소판입니다. 클라이언트가 자기 시각을 실어 핑을
        보내면 서버가 자기 시각을 실어 돌려주고, 왕복 시간(RTT)의 절반만큼
        보정해 차이를 계산합니다.
      </P>
      <Code>{`// 5회 측정, 200ms 간격
const rtt = clientReceiveTime - data.clientSendTime;
const offset = data.serverTime - (data.clientSendTime + rtt / 2);
offsets.push(offset);

// 다섯 표본을 정렬해 '중앙값'을 채택한다
offsets.sort((a, b) => a - b);
clockOffsetRef.current = offsets[Math.floor(offsets.length / 2)];`}</Code>
      <P>
        핵심 판단은 마지막 두 줄입니다. 평균이 아니라 중앙값. 와이파이 RTT는
        정규분포가 아니라 가끔 수백 ms짜리 스파이크가 섞이는 꼬리 분포라,
        평균을 쓰면 스파이크 한 방이 오프셋 전체를 끌고 갑니다. 중앙값은 다섯
        표본 중 두 개가 튀어도 흔들리지 않습니다. 접속 중에도 주기적으로
        재동기화해 시계 표류(drift)를 따라잡습니다.
      </P>

      <H2>② 재생 — setTimeout이 아니라 50ms 선행 스케줄링</H2>
      <P>
        오프셋을 알았으니 &quot;서버 기준 T 시각에 클릭&quot;을 로컬 시각으로
        환산할 수 있습니다. 그런데 그 시각에 setTimeout으로 소리를 내면 다시
        어긋납니다. 자바스크립트 타이머는 메인 스레드 사정에 따라 수십 ms씩
        밀리니까요. 해법은 Web Audio의 표준 패턴인 선행 스케줄링(lookahead)
        입니다.
      </P>
      <Code>{`private readonly scheduleAheadSec = 0.05; // 50ms 앞서 예약

// 짧은 주기로 돌며, 50ms 안에 도래할 노트를
// 오디오 클록의 절대 시각으로 '미리' 예약해 둔다
while (this.nextNoteTimeSec <= nowAudio + this.scheduleAheadSec) {
  this.scheduleClick(this.nextNoteTimeSec);
  this.advanceToNextNote();
}`}</Code>
      <P>
        타이머는 &quot;예약을 거는 일&quot;만 하고, 실제 발음 시각은 오디오
        하드웨어 클록이 지킵니다. 타이머가 10ms 밀려도 예약은 이미 50ms 앞서
        걸려 있으니 소리는 정시에 납니다. 네트워크의 불확실성은 오프셋
        추정에서, 런타임의 불확실성은 선행 스케줄링에서 — 각자 자기 층에서
        흡수됩니다.
      </P>

      <H2>③ 현실 — iOS와 재접속이 남긴 숙제</H2>
      <P>
        설계가 끝나도 현실이 남습니다. iOS는 사용자 제스처 없이 오디오를
        시작할 수 없어 활성화 흐름이 따로 필요하고, 재접속하면 방 상태
        동기화와 시간 동기화가 경합합니다. 이 경합들은 이벤트가 어느 순서로
        와도 같은 상태에 도달하는 복구 가능한 상태 전이로 정리했습니다.
        끊겼다 돌아온 연주자는 다시 5회 핑부터 시작해 조용히 박자에
        합류합니다.
      </P>

      <Callout>
        요약 — ① 실시간 동기화 문제는 &quot;시계가 몇 개인지&quot; 세는 데서
        시작한다. ② 네트워크 표본에는 평균 대신 중앙값. ③ 소리는 벽시계가
        아니라 오디오 클록에 예약한다. ④ 남는 건 언제나 iOS와 재접속이다.
      </Callout>
    </ArticleShell>
  );
}
