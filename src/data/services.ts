export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  color: string;
  gradient: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "forcletter",
    title: "Forcletter",
    subtitle: "AI 크리에이터 분석 플랫폼",
    description:
      "인스타그램 크리에이터를 위한 AI 기반 분석 플랫폼. AI 에이전트 '포키'가 자연어로 계정을 분석해 드립니다.",
    url: "https://forcreator.co.kr",
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-600",
    icon: "📊",
  },
  {
    id: "haengdong",
    title: "행동대장",
    subtitle: "쉽고 빠른 모임 정산",
    description:
      "여행·모임 비용을 쉽게 정산하세요. 가입 없이 바로 시작, 구성원 변동에도 자동 재계산.",
    url: "https://haengdong.pro",
    color: "#a855f7",
    gradient: "from-purple-500 to-fuchsia-600",
    icon: "💰",
  },
  {
    id: "react-pixel-ui",
    title: "React Pixel UI",
    subtitle: "픽셀 아트 UI 라이브러리",
    description:
      "CSS 기반 픽셀 아트 스타일의 React UI 컴포넌트 라이브러리. 레트로 감성의 인터페이스를 손쉽게 구현할 수 있습니다.",
    url: "https://react-pixel-ui.vercel.app",
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-600",
    icon: "🎮",
  },
  {
    id: "trade-tower",
    title: "Trade Tower",
    subtitle: "AI 자동매매 플랫폼",
    description:
      "8개 AI 에이전트가 합의 기반으로 매매 결정을 내리는 한국 주식 자동매매 플랫폼.",
    url: "https://trade-tower.vercel.app",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-600",
    icon: "📈",
  },
  {
    id: "metronomdeul",
    title: "메트로놈들",
    subtitle: "함께 맞추는 박자",
    description:
      "여러 연주자가 네트워크를 통해 동일한 박자에 동기화하는 실시간 협업 메트로놈.",
    url: "https://metronomdeul.site",
    color: "#f97316",
    gradient: "from-orange-500 to-amber-600",
    icon: "🎵",
  },
  {
    id: "lovetype",
    title: "LVTI",
    subtitle: "연애 성격 유형 테스트",
    description:
      "32개 질문으로 알아보는 16가지 연애 유형. 나의 연애 성격을 4가지 차원으로 분석해 드립니다.",
    url: "https://lvti.my",
    color: "#ef4444",
    gradient: "from-red-500 to-rose-600",
    icon: "💕",
  },
  {
    id: "hbd2me",
    title: "Bir-th-day",
    subtitle: "온라인 생일파티",
    description:
      "멀리 있어도 함께 축하할 수 있는 온라인 생일파티 서비스. 친구들과 특별한 생일을 만들어보세요.",
    url: "https://bir-th-day.site",
    color: "#22c55e",
    gradient: "from-green-500 to-emerald-600",
    icon: "🎂",
  },
];
