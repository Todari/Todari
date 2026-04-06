"use client";

import { motion } from "framer-motion";

export default function SplitAccent({ color }: { color: string }) {
  const coins = [
    { x: 0, y: 0, delay: 0, targetX: -50, targetY: -40 },
    { x: 0, y: 0, delay: 0.1, targetX: 50, targetY: -30 },
    { x: 0, y: 0, delay: 0.2, targetX: -30, targetY: 40 },
    { x: 0, y: 0, delay: 0.3, targetX: 40, targetY: 50 },
  ];

  return (
    <svg viewBox="-80 -60 160 120" className="w-full h-full">
      {/* Center circle */}
      <motion.circle
        cx={0}
        cy={0}
        r={16}
        fill={color}
        opacity={0.2}
        initial={{ scale: 1 }}
        whileInView={{ scale: [1, 1.3, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Splitting coins */}
      {coins.map((c, i) => (
        <motion.circle
          key={i}
          r={10}
          fill={color}
          opacity={0.6}
          initial={{ cx: 0, cy: 0, scale: 0 }}
          whileInView={{
            cx: c.targetX,
            cy: c.targetY,
            scale: [0, 1.2, 1],
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.5 + c.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Connecting lines */}
      {coins.map((c, i) => (
        <motion.line
          key={`l${i}`}
          x1={0}
          y1={0}
          stroke={color}
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.2}
          initial={{ x2: 0, y2: 0 }}
          whileInView={{ x2: c.targetX, y2: c.targetY }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 + c.delay }}
        />
      ))}
    </svg>
  );
}
