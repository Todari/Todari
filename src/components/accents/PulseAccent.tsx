"use client";

import { motion } from "framer-motion";

export default function PulseAccent({ color }: { color: string }) {
  return (
    <svg viewBox="-60 -60 120 120" className="w-full h-full">
      {/* Ripples */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={0}
          cy={0}
          r={10}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          initial={{ r: 10, opacity: 0.6 }}
          animate={{
            r: [10, 45],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.66,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Center beat dot */}
      <motion.circle
        cx={0}
        cy={0}
        r={8}
        fill={color}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 0,
          ease: "easeInOut",
        }}
      />

      {/* Beat lines */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI * 2) / 4;
        const x1 = Math.cos(angle) * 16;
        const y1 = Math.sin(angle) * 16;
        const x2 = Math.cos(angle) * 24;
        const y2 = Math.sin(angle) * 24;
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              x2: [x2, x2 * 1.3, x2],
              y2: [y2, y2 * 1.3, y2],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.125,
            }}
          />
        );
      })}
    </svg>
  );
}
