import ForcletterMockup from "./ForcletterMockup";
import HaengdongMockup from "./HaengdongMockup";
import MetronomdeulMockup from "./MetronomdeulMockup";
import TradeTowerMockup from "./TradeTowerMockup";

const mockups: Record<string, React.ComponentType> = {
  forcletter: ForcletterMockup,
  haengdong: HaengdongMockup,
  metronomdeul: MetronomdeulMockup,
  "trade-tower": TradeTowerMockup,
};

export default function ServiceMockup({ serviceId }: { serviceId: string }) {
  const Component = mockups[serviceId];
  if (!Component) return null;
  return <Component />;
}
