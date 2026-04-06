"use client";

import dynamic from "next/dynamic";

const SolarSystem = dynamic(() => import("./SolarSystem"), { ssr: false });

export default function SpaceJourneyWrapper() {
  return <SolarSystem />;
}
