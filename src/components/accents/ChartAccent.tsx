"use client";

import { motion } from "framer-motion";

export default function ChartAccent({ color }: { color: string }) {
  const path = "M0,80 C30,70 60,40 90,55 C120,70 150,20 180,35 C210,50 240,10 270,25 C300,40 330,15 360,5";

  return (
    <svg viewBox="0 0 360 100" className="w-full h-full" fill="none">
      <motion.path
        d={path}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.path
        d={path}
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
        filter="url(#glow)"
      />
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
