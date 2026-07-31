"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

function ToyboxLoading() {
  return (
    <div className="relative flex h-[100svh] min-h-[44rem] items-center justify-center overflow-hidden bg-[#272138] px-5 text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#fffaf0 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative">
          <p className="mb-5 inline-flex rotate-[-2deg] rounded-full border-2 border-[#17151c] bg-[#dfff4f] px-4 py-2 font-mono text-[9px] font-black tracking-[0.18em] text-[#17151c] shadow-[3px_3px_0_#17151c] md:text-xs">
            PRODUCT ENGINEER · AI AUTOMATION · SERVICE BUILDER
          </p>
          <p className="gradient-text text-6xl font-black tracking-[-0.075em] md:text-8xl lg:text-9xl">
            Todari
          </p>
          <p className="mx-auto mt-8 w-fit rounded-full border-2 border-[#17151c] bg-[#fffaf0] px-4 py-2 font-mono text-[10px] font-black text-[#17151c] shadow-[3px_3px_0_#17151c]">
            3D PROJECT DISPENSER LOADING
          </p>
        </div>
    </div>
  );
}

const ProjectDispenser = dynamic(() => import("./ProjectDispenser"), {
  ssr: false,
  loading: ToyboxLoading,
});

export default function SpaceJourneyWrapper() {
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    const shouldStartAtHero =
      !window.location.hash && navigation?.type !== "back_forward";

    if (shouldStartAtHero) {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    }

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return <ProjectDispenser />;
}
