"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const questions = [
  { text: "주식, AI한테 맡기면 어떨까?", color: "#06b6d4" },
  { text: "모임 정산, 아직도 계산기 쓰세요?", color: "#3b82f6" },
  { text: "합주할 때 박자가 안 맞으면?", color: "#a855f7" },
  { text: "내 인스타, AI가 분석해준다면?", color: "#f59e0b" },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const current = questions[index].text;

    if (phase === "typing") {
      if (displayText.length < current.length) {
        const timer = setTimeout(
          () => setDisplayText(current.slice(0, displayText.length + 1)),
          50
        );
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("pause"), 2000);
      return () => clearTimeout(timer);
    }

    if (phase === "pause") {
      setPhase("deleting");
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        const timer = setTimeout(
          () => setDisplayText(displayText.slice(0, -1)),
          25
        );
        return () => clearTimeout(timer);
      }
      setIndex((prev) => (prev + 1) % questions.length);
      setPhase("typing");
    }
  }, [displayText, phase, index]);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-10 gradient-text"
          >
            Todari
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="h-16 md:h-20 flex items-center justify-center mb-12"
          >
            <span className="text-2xl md:text-4xl font-semibold">
              <span style={{ color: questions[index].color }}>
                {displayText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[3px] h-[1.1em] ml-1 align-middle rounded-full"
                style={{ backgroundColor: questions[index].color }}
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-[var(--text-secondary)] text-base mb-10"
          >
            그래서 직접 만들었습니다
          </motion.p>

          <motion.a
            href="#services"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="neu-btn px-8 py-4 text-sm font-medium gradient-text inline-block"
          >
            어떤 서비스들인지 보기
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-[var(--glass-border)] flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-purple)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
