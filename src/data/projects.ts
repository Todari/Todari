export interface Highlight {
  category: "backend" | "frontend" | "infra" | "ai" | "design" | "dx";
  text: string;
}

export interface Project {
  title: string;
  subtitle: string;
  period: string;
  role: string;
  description: string;
  contribution: string;
  highlights: Highlight[];
  tags: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: "Forcletter",
    subtitle: "인스타그램 크리에이터 분석 & AI 에이전트 플랫폼",
    period: "2025.01 ~",
    role: "백엔드 개발 · 기획 · AI 설계",
    description:
      "인스타그램 크리에이터를 위한 AI 기반 분석 플랫폼입니다. Iconosquare, Hootsuite 등 기존 도구가 대시보드 수준에 머무는 반면, AI 에이전트 '포키'는 자연어로 계정 분석 결과를 해석해 주는 것이 핵심 차별점입니다. 단순한 ChatGPT 래퍼가 아닌, 의도 분류 → 데이터 수집 → 사전 분석 → LLM 호출 → 응답 검증의 다단계 파이프라인으로 설계했으며, LLM이 직접 수치를 생성하지 않고 실제 계정 데이터를 구조화해 사전 주입함으로써 환각을 구조적으로 차단하는 접근을 택했습니다.",
    contribution:
      "서비스 기획 단계부터 참여해 IA, 사용자 플로우, 에러 핸들링 가이드를 포함한 서비스 블루프린트를 작성했습니다. AI 에이전트 아키텍처 전체와 백엔드 전반을 담당했으며, Claude Code를 적극 활용한 태스크 기반 개발 워크플로우를 도입해 25건 이상의 기능을 문서화→설계→구현→검증 사이클로 진행했습니다.",
    highlights: [
      {
        category: "ai",
        text: "응답 검증을 '제약 충족 문제'로 모델링 — 의도별로 검증 규칙을 분리하고(예: ACCOUNT_STATUS는 수치 ≥2개 + 비교 ≥1개 필수, CONTENT_IDEAS는 데이터 부재 허용), 실패 시 부족한 데이터 유형을 역추론해 자동 보충 후 재생성하는 리페어 루프 설계. 품질 점수(penalty matrix: 기술 유출 -35pt, 수치 누락 -18pt 등)를 메시지 메타데이터에 기록해 프롬프트 개선의 정량적 피드백 루프 구축",
      },
      {
        category: "ai",
        text: "LLM 컨텍스트 윈도우 최적화 — 첫 턴은 풀 시스템 프롬프트(~500토큰, Few-shot 포함), 이후 턴은 경량 프롬프트(~200토큰, 규칙만)로 전환해 대화 가능 턴 수를 15→30턴으로 확장. 사전 분석 서비스가 원시 메트릭을 언어적 요약으로 압축(1000→200토큰)해 LLM의 연산 부담을 코드로 전가",
      },
      {
        category: "backend",
        text: "Instagram API 할당량 최적화를 위한 게시물 수명 기반 차등 수집 — 0~3일: 10분(참여율 급변기), 3~14일: 3시간(안정화기), 14일+: 1일(정체기). 수집 누락 감지 데몬이 10일 이상 갭을 자동 백필하며, 단순 재시도가 아닌 에러 유형별 차등 전략(rate_limited → 60~300초 랜덤 백오프, token_invalid → 즉시 무효화 후 스킵)으로 할당량 낭비 방지",
      },
      {
        category: "backend",
        text: "마이크로서비스가 아닌 모놀리스를 선택한 이유 — AI 컨텍스트 빌더가 스냅샷 테이블에서 읽은 데이터가 UI에 표시된 데이터와 동일해야 하는 일관성 요구사항, 사용량 카운터의 동시성 제어(분산 카운터 대신 단일 DB atomic increment), 피처 추출→예측 모델 간 스냅샷 정합성 보장이 결정적 요인",
      },
      {
        category: "design",
        text: "한국 크리에이터 시장 특화 설계 — 카카오 알림톡을 단순 알림이 아닌 리텐션 채널로 활용(한국 SMB 92%가 카카오 비즈 메시징 사용). 주간 AI 리포트를 크리에이터 활동 시간대에 맞춰 발송하고, 딥링크 + UTM으로 전환 퍼널 추적. 광고 단가 예측 모델(v3)로 한국 인플루언서 시장의 가격 불투명성 문제를 해결",
      },
      {
        category: "backend",
        text: "사용량 기반 과금의 엣지 케이스 처리 — 월 중간 플랜 변경 시 잔여 일수 기반 비례 정산을 단일 트랜잭션으로 처리, 다운그레이드는 현 주기 종료 시점에 예약(pendingPlanId)해 '다운그레이드→즉시 업그레이드' 환불 루프 방지, 결제일을 28일로 정규화해 2월 31일 누락 버그 원천 차단",
      },
    ],
    tags: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "Turborepo",
      "Gemini / OpenAI",
      "TypeORM",
      "MySQL",
      "Docker",
      "Grafana",
      "Kakao Alimtalk",
    ],
    github: "https://github.com",
  },
  {
    title: "행동대장",
    subtitle: "모임 정산 웹 애플리케이션",
    period: "2024.07 ~ 2024.12",
    role: "풀스택 개발 · 기획 · 디자인 시스템",
    description:
      "여행·모임 비용을 쉽게 정산할 수 있는 웹 앱입니다. Splitwise가 '사람 간 빚 관계' 중심인 반면, 행동대장은 '같은 구성원이 함께한 구간(Step)'을 단위로 정산하는 것이 핵심 차이입니다. 참여자가 바뀌는 복수 결제 상황에서 구성원 조합이 동일한 결제들을 자동으로 그루핑하고, 고정/비고정 금액 혼합 분배와 인원 변동 시 연쇄 재계산을 처리합니다. 회원 가입 없이 비밀번호만으로 즉시 정산을 시작할 수 있는 '게스트 우선' 접근으로 사용 마찰을 최소화했습니다.",
    contribution:
      "서비스 기획부터 백엔드 설계, 커스텀 디자인 시스템 구축까지 전 과정에 참여했습니다. 정산 알고리즘을 모노레포 공유 패키지로 분리해 프론트엔드-백엔드 양쪽에서 동일한 로직을 사용하도록 설계했으며, Claude를 활용한 cmux 멀티 에이전트 개발 프레임워크를 문서화해 실시간 로그 분석, 브라우저 디버깅, 배포 검증을 AI에 위임하는 워크플로우를 구축했습니다.",
    highlights: [
      {
        category: "backend",
        text: "'Step' 개념 설계 — 동일한 구성원 조합의 결제들을 자동 그루핑해 정산 단위를 생성. 인원 삭제 시 해당 멤버의 BillDetail 제거 → 남은 인원으로 금액 재분배 → 참여자 0명이 된 결제 자동 삭제까지 연쇄 처리를 단일 트랜잭션으로 원자적 실행. 재분배 시 모든 isFixed 플래그를 해제해 수학적 제약 조건 변경을 반영",
      },
      {
        category: "backend",
        text: "이벤트 토큰을 무상태 공유 키로 활용 — 256비트 엔트로피 랜덤 토큰이 URL 공유와 ID 열거 공격 방지를 동시 달성. 게스트 JWT에 eventToken을 스코프로 포함시켜 '이벤트 A의 관리자이면서 이벤트 B의 참여자'인 교차 권한 모델 구현. 카카오 OAuth 토큰은 검증 후 폐기(저장 안 함)해 토큰 탈취 리스크 제거",
      },
      {
        category: "frontend",
        text: "isFixed 패턴으로 실시간 분배 편집 — 사용자가 특정 금액을 고정하면 나머지를 비고정 인원에게 자동 재분배, 마지막 비고정 멤버는 편집 차단해 '합계 ≠ 총액' 상태를 구조적으로 방지. 서버 왕복 없이 프론트엔드에서 동일 알고리즘(공유 패키지)으로 즉시 반영",
      },
      {
        category: "frontend",
        text: "React Query의 invalidate vs remove를 데이터 생명주기에 따라 구분 — 항상 화면에 노출되는 Reports는 invalidate(즉시 재요청), 편집 페이지 전용인 BillDetails는 remove(캐시 제거만)로 불필요한 API 호출 방지. 멤버 삭제 후 서버 측 연쇄 삭제로 사라진 결제가 캐시에 남는 고스트 데이터 문제를 remove로 해결",
      },
      {
        category: "design",
        text: "커스텀 디자인 시스템(HDesign)에서 EditableAmount 컴포넌트의 가변 너비 패턴 — 숨겨진 span의 getBoundingClientRect로 렌더링된 숫자 폭을 측정하고 input 너비를 동적 조절. MUI/Chakra의 고정 너비 input이 정산 앱의 다양한 금액 자릿수에 부적합한 문제를 해결",
      },
      {
        category: "dx",
        text: "Claude + tmux 기반 멀티 에이전트 개발 프레임워크 설계 — Orchestrator Claude가 Backend/QA/DevOps 에이전트에 태스크를 분배하고, 각 에이전트가 독립 tmux 패인에서 capture-pane(로그 읽기), browser snapshot(DOM 캡처), send-panel(명령 실행)을 수행. AI를 '코파일럿'이 아닌 개발 환경의 일급 시스템으로 통합한 워크플로우",
      },
    ],
    tags: [
      "React",
      "NestJS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Webpack",
      "Docker",
      "Zustand",
      "Emotion",
      "Storybook",
    ],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "메트로놈들",
    subtitle: "실시간 협업 메트로놈 — 함께 맞추는 박자",
    period: "2025.02 ~ 2025.03",
    role: "풀스택 개발 · 기획 · 디자인",
    description:
      "여러 연주자가 네트워크를 통해 동일한 박자에 동기화하는 실시간 협업 메트로놈입니다. 기존 메트로놈 앱이 '같은 BPM 숫자를 공유'하는 수준에 머무는 반면, 서버 기준 시각 동기화 프로토콜로 실제 재생 타이밍까지 맞추는 것이 핵심 차별점입니다. JavaScript의 setTimeout이 ~15-30ms의 지터를 가지는 한계를 Web Audio API의 하드웨어 기반 AudioContext.currentTime으로 우회해, 오디오 스케줄링을 JS 이벤트 루프에서 완전히 분리했습니다.",
    contribution:
      "서비스 기획, 시스템 아키텍처, UI 디자인, 풀스택 개발을 전담했습니다. 아키텍처 문서와 기능 설계서를 작성하며 각 버전(v2.2 → v3.4)마다 기술적 의사결정을 기록했고, AI를 활용한 동기화 프로토콜 설계 검토와 오디오 엔진 최적화 리서치를 적극 병행했습니다.",
    highlights: [
      {
        category: "backend",
        text: "이중 동기화 브로드캐스트를 '점진적 수렴(graceful degradation)' 관점에서 설계 — 5초 주기 일반 동기화는 패킷 손실 복구와 재접속 클라이언트 앵커링 담당, 비트 경계 정밀 동기화는 두 앵커 사이의 누적 드리프트 보정 담당. 한쪽이 실패해도 다른 쪽이 최소한의 동기를 유지하는 이중화 구조",
      },
      {
        category: "frontend",
        text: "전송 지연 보정 알고리즘 — 클라이언트가 (현재시각 - 서버발송시각)으로 네트워크 지연을 역산하고, 서버 경과시간에 보정값을 더해 실제 비트 위치를 재계산. 보정 임계값을 비트 간격의 10%로 설정해 템포에 비례하는 적응형 필터링 구현(120BPM에서 50ms, 240BPM에서 25ms). 2비트 이상 벗어난 보정은 네트워크 이상값으로 판단해 무시",
      },
      {
        category: "frontend",
        text: "pendingSync 패턴으로 오디오 스케줄링과 서버 동기화 간 경쟁 조건 해결 — 서버 메시지가 비동기로 도착해도 pendingSync 버퍼에 저장하고, 다음 scheduleNextBeat() 호출 시 원자적으로 적용. JS 싱글 스레드 실행 보장을 활용한 상태 머신 패턴으로 이중 스케줄링(같은 비트를 두 번 재생)을 구조적으로 방지",
      },
      {
        category: "frontend",
        text: "템포 변경 시 이전/새 템포 비율로 남은 시간을 환산해 비트 위치를 보존 — 연주자가 체감하는 '흐름 끊김' 방지. 탭 템포는 최근 4회 탭 간격을 평균하는데, 2회는 오탭에 민감하고 8회는 반응이 느려 연주자 UX 연구에서 3~5회가 최적이라는 근거에 기반",
      },
      {
        category: "backend",
        text: "WebSocket 메시지 큐의 중복 제거(dedup) 전략 — 오프라인 중 changeTempo(120)→changeTempo(121)→changeTempo(122) 발생 시 마지막 값만 유지해, 재연결 후 3개를 순차 전송해 연주자가 템포 점프(120→121→122)를 겪는 문제 방지. 큐 TTL 30초로 재연결 후 오래된 상태 전송을 차단",
      },
      {
        category: "design",
        text: "ScrollPicker 가상화 — 200개 BPM 값 중 화면에 보이는 8~10개만 렌더링해 DOM 노드 95% 감소. 모멘텀 스크롤 중 매 프레임(60fps)마다 가시 범위를 재계산하되, onChange는 16ms 디바운싱해 서버 브로드캐스트 폭주 방지. easeOutCubic 감속 곡선으로 물리적 관성감 구현",
      },
    ],
    tags: [
      "React",
      "NestJS",
      "TypeScript",
      "Socket.IO",
      "Web Audio API",
      "Prisma",
      "PostgreSQL",
      "PandaCSS",
      "Turborepo",
    ],
    github: "https://github.com",
    demo: "https://example.com",
  },
];

export const categoryLabels: Record<string, string> = {
  backend: "Backend",
  frontend: "Frontend",
  infra: "Infra",
  ai: "AI",
  design: "Design",
  dx: "DX",
};

export const categoryColors: Record<string, string> = {
  backend: "var(--accent-blue)",
  frontend: "var(--accent-cyan)",
  infra: "var(--accent-purple)",
  ai: "#f59e0b",
  design: "#ec4899",
  dx: "#10b981",
};

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "MySQL",
  "Prisma",
  "TypeORM",
  "Docker",
  "AWS",
  "Tailwind CSS",
  "Turborepo",
  "Socket.IO",
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { name: "Email", url: "mailto:hello@example.com", icon: "email" },
];
