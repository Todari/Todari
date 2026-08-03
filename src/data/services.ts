export interface ServiceEvidence {
  label: string;
  text: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  question: string;
  description: string;
  evidence: [ServiceEvidence, ServiceEvidence, ServiceEvidence];
  url?: string;
  linkLabel?: string;
  /** Only add repositories that anonymous visitors can open. */
  publicRepository?: string;
  status: "운영 중" | "개선 중" | "개발 중" | "점검 중";
  period: string;
  role: string;
  tags: string[];
  color: string;
  gradient: string;
  /** Legacy views only. The active 3D dispenser uses product-specific geometry. */
  icon?: string;
}

export const services: Service[] = [
  {
    id: "forcletter",
    title: "Forcletter",
    subtitle: "인스타그램 인플루언서 올인원 툴",
    question: "인플루언서의 반복 업무를 한곳에서 운영할 수 있을까?",
    description:
      "계정·콘텐츠 인사이트, 댓글 자동 DM, 멀티링크, 광고 단가 예측과 AI 에이전트 포키를 연결한 인스타그램 인플루언서 운영 도구.",
    evidence: [
      {
        label: "운영 문제",
        text: "인플루언서는 계정 분석, 댓글·DM, 멀티링크와 광고 단가 관리를 서로 다른 도구에서 반복해야 했습니다.",
      },
      {
        label: "제품 구조",
        text: "계정 데이터와 운영 기능을 한곳에 모으고 AI 에이전트의 분석과 실제 실행 사이에 명시적인 도구 경계를 뒀습니다.",
      },
      {
        label: "제공 가치",
        text: "성과를 읽는 일과 후속 운영을 오가지 않고 하나의 제품 흐름에서 이어갈 수 있게 했습니다.",
      },
    ],
    url: "https://forcreator.co.kr",
    status: "운영 중",
    period: "2025 — NOW",
    role: "제품 설계 · 프론트엔드 · AI 에이전트",
    tags: ["Next.js", "NestJS", "AI Agent", "Instagram"],
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "jeongpyo",
    title: "이정표",
    subtitle: "KBO 티켓 팬투팬 정가 양도",
    question: "웃돈 없이 정가로 안전하게 야구 티켓을 양도할 수 있을까?",
    description:
      "가격 입력을 없애 경기·좌석 등급으로 정가를 서버가 자동 산정하고, 결제 보호·신고·제재·채팅 마스킹을 연결한 KBO 팬투팬 티켓 양도 플랫폼.",
    evidence: [
      {
        label: "시장 문제",
        text: "웃돈 거래를 막으면서도 팬이 안심하고 티켓을 넘길 수 있는 신뢰 장치가 필요했습니다.",
      },
      {
        label: "신뢰 설계",
        text: "경기·좌석 기준 정가를 서버에서 산정하고 거래 상태 머신에 결제 보호·취소·신고 흐름을 연결했습니다.",
      },
      {
        label: "현재 검증",
        text: "사용자 가격 입력 없는 거래 구조와 예외 상태를 구현하고 실제 팬 거래 시나리오를 검증하고 있습니다.",
      },
    ],
    url: "https://jeongpyo.com",
    status: "개발 중",
    period: "2026 — NOW",
    role: "제품 설계 · 풀스택 · 거래 운영",
    tags: ["Go", "React Native", "PostgreSQL", "State Machine"],
    color: "#3150ff",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "geo",
    title: "GEO Dashboard",
    subtitle: "검색·AI 답변 브랜드 가시성 모니터링",
    question: "검색과 AI 답변 속 브랜드 노출을 어떻게 다음 행동으로 연결할까?",
    description:
      "검색엔진과 AI 답변의 브랜드·제품 노출, 인용 출처와 질문별 성과를 수집하고 상태·원인·행동으로 연결한 사내 의사결정 대시보드. 보안상 식별 가능한 정보는 공개하지 않습니다.",
    evidence: [
      {
        label: "데이터 제약",
        text: "검색·AI 표면마다 지표의 분모가 다르고 원시 인용이 누적될수록 비교 정확도와 조회 비용이 함께 나빠졌습니다.",
      },
      {
        label: "시스템 설계",
        text: "표면별 지표 정의를 정규화하고 일별 집계 모델과 상태 → 원인 → 행동 중심의 정보 구조를 적용했습니다.",
      },
      {
        label: "운영 검증",
        text: "운영 데이터에서 가시성·인용·질문 성과를 같은 기준으로 비교하고 원인에서 다음 행동까지 추적했습니다.",
      },
    ],
    status: "운영 중",
    period: "2026 — NOW",
    role: "제품 설계 · 풀스택 · 데이터 운영",
    tags: ["Next.js", "PostgreSQL", "Data Pipeline", "GEO"],
    color: "#36d6e7",
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    id: "dakbal",
    title: "닭발 헌터",
    subtitle: "엽떡 닭발 판매 지점 탐색",
    question: "지금 닭발을 파는 가장 가까운 엽떡은 어디일까?",
    description:
      "전국 엽떡 지점의 요기요 메뉴 판매 상태를 수집해 숯불·국물, 통뼈·무뼈 종류별로 판매 지점을 지도에서 찾습니다.",
    evidence: [
      {
        label: "생활 문제",
        text: "엽떡 닭발을 먹고 싶어도 어느 지점에서 어떤 종류를 파는지 한 번에 확인할 방법이 없었습니다.",
      },
      {
        label: "제품 가설",
        text: "지점별 메뉴 표현과 판매 상태를 정규화해 지도에 모으면 가장 가까운 판매점을 빠르게 찾을 수 있다고 봤습니다.",
      },
      {
        label: "출시 결과",
        text: "닭발 종류와 현재 판매 여부로 전국 지점을 탐색할 수 있는 서비스를 출시해 운영하고 있습니다.",
      },
    ],
    url: "https://dakbal.pro",
    status: "운영 중",
    period: "2026 — NOW",
    role: "문제 정의 · UI/UX · 제품 구현",
    tags: ["Next.js", "Map", "Data"],
    color: "#e11d48",
    gradient: "from-rose-600 to-red-700",
  },
  {
    id: "haengdong",
    title: "행동대장",
    subtitle: "쉽고 빠른 모임 정산",
    question: "사람이 계속 바뀌는 모임도 가입 없이 정산할 수 있을까?",
    description:
      "여행·모임 비용을 쉽게 정산하세요. 가입 없이 바로 시작, 구성원 변동에도 자동 재계산.",
    evidence: [
      {
        label: "도메인 제약",
        text: "가입하지 않은 모임에서 구성원이 바뀌어도 기존 지출과 정산 금액이 깨지면 안 됐습니다.",
      },
      {
        label: "계산 설계",
        text: "지출 기록, 참여자와 계산 규칙을 분리하고 변경 시 전체 정산을 불변식에 따라 다시 계산했습니다.",
      },
      {
        label: "서비스 결과",
        text: "모임 중간에 사람이 추가·제외되어도 가입 없이 정산 결과가 자동으로 갱신되도록 운영하고 있습니다.",
      },
    ],
    url: "https://haengdong.todari.dev",
    publicRepository: "https://github.com/Todari/2024-haeng-dong",
    status: "운영 중",
    period: "2024",
    role: "서비스 기획 · UI/UX · 프론트엔드",
    tags: ["React", "TypeScript", "PWA"],
    color: "#a855f7",
    gradient: "from-purple-500 to-fuchsia-600",
  },
  {
    id: "metronomdeul",
    title: "메트로놈들",
    subtitle: "함께 맞추는 박자",
    question: "멀리 떨어진 연주자들이 같은 박자를 들을 수 있을까?",
    description:
      "여러 연주자가 네트워크를 통해 동일한 박자에 동기화하는 실시간 협업 메트로놈.",
    evidence: [
      {
        label: "기술 제약",
        text: "네트워크 지연과 서로 다른 기기 오디오 시계 때문에 같은 시각의 클릭도 다르게 들렸습니다.",
      },
      {
        label: "동기화 설계",
        text: "서버 시각 오프셋 보정과 Web Audio 선행 스케줄링을 분리하고 재접속 복구 경로를 설계했습니다.",
      },
      {
        label: "검증 근거",
        text: "모바일 실기기에서 시계 보정·재접속·iOS 오디오 활성화 경합을 재현하고 회귀 흐름으로 고정했습니다.",
      },
    ],
    url: "https://metronomdeul.site",
    publicRepository: "https://github.com/Todari/metro-nomedeul",
    status: "운영 중",
    period: "2025 — NOW",
    role: "기획 · 프론트엔드 · 실시간 시스템",
    tags: ["React", "WebSocket", "Web Audio"],
    color: "#f97316",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: "pin-to-gather",
    title: "핀투게더",
    subtitle: "함께 정하는 실시간 장소 보드",
    question: "여러 사람이 가입 없이 장소를 모으고 함께 결정할 수 있을까?",
    description:
      "공유 지도에서 장소를 수집·그룹화하고 참여자의 커서, 지도 뷰포트, 평가와 메모를 실시간으로 동기화하는 익명 협업 보드.",
    evidence: [
      {
        label: "협업 문제",
        text: "가입하지 않은 여러 사람이 같은 지도에서 장소를 모으고 의견을 합치는 과정이 메신저 대화에 흩어졌습니다.",
      },
      {
        label: "실시간 설계",
        text: "WebSocket presence와 원자적 부분 갱신을 분리하고 재연결 시 서버 상태를 다시 합치는 흐름을 만들었습니다.",
      },
      {
        label: "현재 상태",
        text: "익명 참여자의 장소 수집·평가·커서·지도 뷰 동기화를 구현하고 실제 모임 흐름을 검증하고 있습니다.",
      },
    ],
    url: "https://pintogather.todari.dev",
    publicRepository: "https://github.com/Todari/pin-to-gather",
    status: "개발 중",
    period: "2026 — NOW",
    role: "제품 설계 · 풀스택 · 실시간 협업",
    tags: ["Next.js", "Go", "WebSocket", "Naver Maps"],
    color: "#0f9f76",
    gradient: "from-emerald-500 to-blue-600",
  },
  {
    id: "react-pixel-ui",
    title: "React Pixel UI",
    subtitle: "어떤 CSS든 픽셀 아트로",
    question: "기존 UI의 CSS를 그대로 살려 픽셀 아트로 바꿀 수 있을까?",
    description:
      "React 요소를 <Pixel>로 감싸면 배경·모서리·테두리·그림자를 Canvas 없이 픽셀 아트로 변환하는 SSR 호환 라이브러리.",
    evidence: [
      {
        label: "표현 제약",
        text: "기존 DOM과 CSS, SSR과 상호작용 상태를 유지하면서 시각 표현만 픽셀 아트로 바꿔야 했습니다.",
      },
      {
        label: "변환 설계",
        text: "Canvas 대신 CSS 변환 계층을 만들고 크기·테마·hover·focus 변화에 맞춰 다시 계산하도록 설계했습니다.",
      },
      {
        label: "검증 근거",
        text: "SSR·다크 모드·상호작용 상태를 회귀 테스트로 고정하고 npm 패키지와 데모로 공개했습니다.",
      },
    ],
    url: "https://react-pixel-ui.vercel.app",
    publicRepository: "https://github.com/Todari/react-pixel-ui",
    status: "개선 중",
    period: "2024 — NOW",
    role: "UI 시스템 · 프론트엔드",
    tags: ["React", "TypeScript", "CSS", "SSR"],
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: "trade-tower",
    title: "Trade Tower",
    subtitle: "틱 기반 자동매매 운영 시스템",
    question: "실시간 시장의 진입·리스크·실행을 일관되게 자동화할 수 있을까?",
    description:
      "한국 주식 WebSocket 틱 데이터를 규칙형 점수, 다층 리스크 관리와 주문 실행 파이프라인으로 처리하는 자동매매 플랫폼.",
    evidence: [
      {
        label: "운영 위험",
        text: "빠른 틱 흐름에서 잘못된 진입, 중복 주문과 연결 단절이 실제 주문으로 번지지 않아야 했습니다.",
      },
      {
        label: "실행 설계",
        text: "결정론적 Tick Engine과 다층 리스크 게이트를 중심에 두고 LLM은 제한적인 VETO 역할로 격리했습니다.",
      },
      {
        label: "검증 근거",
        text: "실시간과 시뮬레이션이 같은 판단·주문 경로를 사용하도록 맞추고 실패 시나리오를 실행 전 단계에서 검증했습니다.",
      },
    ],
    url: "https://trade-tower.vercel.app",
    status: "개선 중",
    period: "2025 — NOW",
    role: "제품 설계 · 풀스택 · 데이터 운영",
    tags: ["NestJS", "Next.js", "WebSocket", "Quant"],
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    id: "toksai",
    title: "톡사이",
    subtitle: "카카오톡 관계 신호 분석",
    question: "오래 쌓인 대화 속 관계의 신호를 재미있게 발견할 수 있을까?",
    description:
      "카카오톡 1:1 내보내기 파일을 파싱·샘플링해 관심 신호, 대화 습관, 타임라인과 케미를 분석하고 비공개 링크로 공유하는 AI 분석 서비스.",
    evidence: [
      {
        label: "사용자 호기심",
        text: "오래 쌓인 카카오톡 대화에서 둘 사이의 관심 신호와 관계 패턴을 재미있게 확인하고 싶었습니다.",
      },
      {
        label: "분석 가설",
        text: "전체 파일을 구조화한 뒤 문맥을 샘플링하면 대용량 대화에서도 일관된 관계 신호를 추출할 수 있다고 봤습니다.",
      },
      {
        label: "현재 상태",
        text: "파일 파싱·비동기 AI 분석·비공개 결과 공유를 구현하고 분석 결과의 납득 가능성을 검증하고 있습니다.",
      },
    ],
    url: "https://toksai.todari.dev",
    publicRepository: "https://github.com/Todari/toksai",
    status: "개발 중",
    period: "2026 — NOW",
    role: "제품 설계 · 풀스택 · AI 분석 파이프라인",
    tags: ["Next.js", "NestJS", "Gemini", "Prisma"],
    color: "#d99b00",
    gradient: "from-amber-500 to-rose-500",
  },
  {
    id: "lovetype",
    title: "LVTI",
    subtitle: "연애 성격 유형 테스트",
    question: "연애할 때 드러나는 나만의 성격 유형은 무엇일까?",
    description:
      "32개 질문으로 알아보는 16가지 연애 유형. 나의 연애 성격을 4가지 차원으로 분석해 드립니다.",
    evidence: [
      {
        label: "콘텐츠 가설",
        text: "일반 성격 유형이 아니라 연애 상황에 한정된 질문이라면 더 공감되는 결과를 만들 수 있다고 봤습니다.",
      },
      {
        label: "점수 모델",
        text: "32개 응답을 4개 차원의 결정론적 점수 규칙으로 계산하고 결과 생성은 클라이언트 중심으로 구성했습니다.",
      },
      {
        label: "서비스 결과",
        text: "개인 응답을 서버에 남기지 않고도 16가지 유형 결과를 즉시 만들고 공유하는 서비스를 운영하고 있습니다.",
      },
    ],
    url: "https://lvti.my",
    publicRepository: "https://github.com/Todari/lovetype",
    status: "운영 중",
    period: "2024 — NOW",
    role: "서비스 기획 · UI/UX · 프론트엔드",
    tags: ["Next.js", "TypeScript", "Analytics"],
    color: "#ef4444",
    gradient: "from-red-500 to-rose-600",
  },
  {
    id: "hgt",
    title: "HGT",
    subtitle: "홍익대 구성원 주간 1:1 매칭",
    question: "사진보다 취향과 키워드로 새로운 사람을 만날 수 있을까?",
    description:
      "홍익대학교 구성원 인증을 바탕으로 키워드 프로필을 만들고, 매주 새로운 한 사람과 실시간 대화로 연결하는 비공식 캠퍼스 매칭 서비스.",
    evidence: [
      {
        label: "신뢰 문제",
        text: "같은 학교 구성원이라는 최소한의 신뢰를 확보하면서 포털 자격증명은 서비스에 남기지 않아야 했습니다.",
      },
      {
        label: "매칭 설계",
        text: "휴면 사용자를 제외하고 선호·키워드 점수를 조합해 매주 한 명을 결정론적으로 연결하도록 구성했습니다.",
      },
      {
        label: "제품 구조",
        text: "Next.js·Capacitor 앱과 Hono API, PostgreSQL, WebSocket 채팅 계약을 하나의 TypeScript 모노레포에서 관리합니다.",
      },
    ],
    url: "https://hgt.todari.dev",
    publicRepository: "https://github.com/Todari/hgt",
    status: "개선 중",
    period: "2023 — NOW",
    role: "제품 설계 · 풀스택 · 모바일 앱",
    tags: ["Next.js", "Capacitor", "Hono", "WebSocket"],
    color: "#8b5cf6",
    gradient: "from-violet-500 to-fuchsia-600",
  },
];
