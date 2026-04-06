"use client";

import { motion } from "framer-motion";

export default function TickerAccent({ color }: { color: string }) {
  const path =
    "M0,60 L30,55 L60,62 L90,45 L120,50 L150,30 L180,38 L210,22 L240,28 L270,15 L300,20 L330,8 L360,12";

  return (
    <svg viewBox="0 0 360 80" className="w-full h-full" fill="none">
      {/* Grid lines */}
      {[20, 40, 60].map((y) => (
        <line
          key={y}
          x1={0}
          y1={y}
          x2={360}
          y2={y}
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={0.05}
        />
      ))}

      {/* Area fill */}
      <motion.path
        d={path + " L360,80 L0,80 Z"}
        fill={color}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Line */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* End dot */}
      <motion.circle
        cx={360}
        cy={12}
        r={4}
        fill={color}
        initial={{ scale: 0 }}
        whileInView={{ scale: [0, 1.5, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 2 }}
      />

      {/* Pulse on end dot */}
      <motion.circle
        cx={360}
        cy={12}
        r={4}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        initial={{ scale: 1, opacity: 0 }}
        whileInView={{
          scale: [1, 3],
          opacity: [0.5, 0],
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
          delay: 2.2,
          repeat: Infinity,
        }}
      />
    </svg>
  );
}
