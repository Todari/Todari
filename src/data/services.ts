export interface Service {
  id: string;
  title: string;
  subtitle: string;
  question: string;
  description: string;
  url: string;
  linkLabel?: string;
  repository?: string;
  status: "운영 중" | "개선 중" | "점검 중";
  period: string;
  role: string;
  tags: string[];
  color: string;
  gradient: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "forcletter",
    title: "Forcletter",
    subtitle: "AI 크리에이터 분석 플랫폼",
    question: "숫자뿐인 분석을 AI가 실제 조언으로 바꿀 수 있을까?",
    description:
      "인스타그램 크리에이터를 위한 AI 기반 분석 플랫폼. AI 에이전트 '포키'가 자연어로 계정을 분석해 드립니다.",
    url: "https://forcreator.co.kr",
    status: "운영 중",
    period: "2025 — NOW",
    role: "제품 설계 · 프론트엔드 · AI 활용",
    tags: ["Next.js", "NestJS", "AI Agent"],
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-600",
    icon: "📊",
  },
  {
    id: "haengdong",
    title: "행동대장",
    subtitle: "쉽고 빠른 모임 정산",
    question: "사람이 계속 바뀌는 모임도 가입 없이 정산할 수 있을까?",
    description:
      "여행·모임 비용을 쉽게 정산하세요. 가입 없이 바로 시작, 구성원 변동에도 자동 재계산.",
    url: "https://haengdong.todari.dev",
    repository: "https://github.com/Todari/2024-haeng-dong",
    status: "운영 중",
    period: "2024",
    role: "서비스 기획 · UI/UX · 프론트엔드",
    tags: ["React", "TypeScript", "PWA"],
    color: "#a855f7",
    gradient: "from-purple-500 to-fuchsia-600",
    icon: "💰",
  },
  {
    id: "dakbal",
    title: "닭발 헌터",
    subtitle: "엽떡 닭발 재고 파인더",
    question: "지금 닭발을 파는 가장 가까운 엽떡은 어디일까?",
    description:
      "동대문엽기떡볶이 전국 지점 중 지금 닭발을 파는 곳을 지도로 확인. 매장별 메뉴 판매 여부를 PAYCO 주문 데이터로 추적합니다.",
    url: "https://dakbal.pro",
    status: "운영 중",
    period: "2026 — NOW",
    role: "문제 정의 · UI/UX · 제품 구현",
    tags: ["Next.js", "Map", "Data"],
    color: "#e11d48",
    gradient: "from-rose-600 to-red-700",
    icon: "🍗",
  },
  {
    id: "react-pixel-ui",
    title: "React Pixel UI",
    subtitle: "픽셀 아트 UI 라이브러리",
    question: "픽셀 아트 감성을 재사용 가능한 UI로 만들 수 있을까?",
    description:
      "CSS 기반 픽셀 아트 스타일의 React UI 컴포넌트 라이브러리. 레트로 감성의 인터페이스를 손쉽게 구현할 수 있습니다.",
    url: "https://react-pixel-ui.vercel.app",
    repository: "https://github.com/Todari/react-pixel-ui",
    status: "개선 중",
    period: "2024 — NOW",
    role: "UI 시스템 · 프론트엔드",
    tags: ["React", "TypeScript", "Storybook"],
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-600",
    icon: "🎮",
  },
  {
    id: "metronomdeul",
    title: "메트로놈들",
    subtitle: "함께 맞추는 박자",
    question: "멀리 떨어진 연주자들이 같은 박자를 들을 수 있을까?",
    description:
      "여러 연주자가 네트워크를 통해 동일한 박자에 동기화하는 실시간 협업 메트로놈.",
    url: "https://metronomdeul.site",
    repository: "https://github.com/Todari/metro-nomedeul",
    status: "운영 중",
    period: "2025 — NOW",
    role: "기획 · 프론트엔드 · 실시간 시스템",
    tags: ["React", "WebSocket", "Web Audio"],
    color: "#f97316",
    gradient: "from-orange-500 to-amber-600",
    icon: "🎵",
  },
  {
    id: "trade-tower",
    title: "Trade Tower",
    subtitle: "AI 자동매매 플랫폼",
    question: "여러 AI가 토론하면 더 나은 매매 결정을 내릴까?",
    description:
      "8개 AI 에이전트가 합의 기반으로 매매 결정을 내리는 한국 주식 자동매매 플랫폼.",
    url: "https://trade-tower.vercel.app",
    repository: "https://github.com/yeouido-penthouse-cattower/trade-tower",
    status: "개선 중",
    period: "2025 — NOW",
    role: "제품 설계 · 프론트엔드 · AI 협업",
    tags: ["NestJS", "Next.js", "Multi-Agent"],
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-600",
    icon: "📈",
  },
  {
    id: "lovetype",
    title: "LVTI",
    subtitle: "연애 성격 유형 테스트",
    question: "연애할 때 드러나는 나만의 성격 유형은 무엇일까?",
    description:
      "32개 질문으로 알아보는 16가지 연애 유형. 나의 연애 성격을 4가지 차원으로 분석해 드립니다.",
    url: "https://lvti.my",
    repository: "https://github.com/Todari/lovetype",
    status: "운영 중",
    period: "2024 — NOW",
    role: "서비스 기획 · UI/UX · 프론트엔드",
    tags: ["Next.js", "TypeScript", "Analytics"],
    color: "#ef4444",
    gradient: "from-red-500 to-rose-600",
    icon: "💕",
  },
];
