"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const colors = ["#f59e0b", "#3b82f6", "#a855f7", "#06b6d4"];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "linear-gradient(90deg, #a855f7, #3b82f6)",
      `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
      `linear-gradient(90deg, ${colors[1]}, ${colors[2]})`,
      `linear-gradient(90deg, ${colors[2]}, ${colors[3]})`,
      `linear-gradient(90deg, ${colors[3]}, #a855f7)`,
    ]
  );

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{ scaleX: scrollYProgress, background }}
    />
  );
}
