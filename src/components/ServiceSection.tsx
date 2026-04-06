"use client";

import { motion } from "framer-motion";
import type { Service } from "@/data/services";
import ChartAccent from "./accents/ChartAccent";
import SplitAccent from "./accents/SplitAccent";
import PulseAccent from "./accents/PulseAccent";
import TickerAccent from "./accents/TickerAccent";

const accents: Record<string, React.ComponentType<{ color: string }>> = {
  forcletter: ChartAccent,
  haengdong: SplitAccent,
  metronomdeul: PulseAccent,
  "trade-tower": TickerAccent,
};

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      className="inline-block ml-2 transition-transform group-hover:translate-x-1"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServiceSection({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Accent = accents[service.id];
  const isEven = index % 2 === 0;

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 snap-start relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.07]"
          style={{
            background: service.color,
            top: "50%",
            left: isEven ? "70%" : "30%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div
          className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
        >
          {/* Text */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, x: isEven ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-5xl mb-4 block">{service.icon}</span>

              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-2">
                {service.title}
              </h2>

              <p
                className="text-lg font-medium mb-6"
                style={{ color: service.color }}
              >
                {service.subtitle}
              </p>

              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10 max-w-lg">
                {service.description}
              </p>

              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${service.color}, ${service.color}bb)`,
                  boxShadow: `0 4px 30px ${service.color}33`,
                }}
              >
                서비스 방문하기
                <ArrowIcon />
              </a>
            </motion.div>
          </div>

          {/* Accent animation */}
          <motion.div
            className="w-48 h-48 md:w-64 md:h-64 shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {Accent && <Accent color={service.color} />}
          </motion.div>
        </div>
      </div>

      {/* Section number */}
      <motion.div
        className="absolute bottom-8 left-8 text-[120px] font-bold leading-none pointer-events-none select-none"
        style={{ color: service.color }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>
    </section>
  );
}
