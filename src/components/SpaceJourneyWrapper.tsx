"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { rootMargin: "200px" });
    observer.observe(container);

    // Existing project links still open the corresponding 3D project.
    const requestedProject = services.some(
      (service) => `#${service.id}` === window.location.hash,
    );
    const frame = requestedProject ? window.requestAnimationFrame(() => {
      setVisible(true);
      container.scrollIntoView({ behavior: "instant", block: "start" });
    }) : null;

    return () => {
      observer.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={containerRef}>{visible ? <ProjectDispenser /> : <ToyboxLoading />}</div>;
}
