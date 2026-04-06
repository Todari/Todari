"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import type { Service } from "@/data/services";
import ServiceMockup from "./mockups";

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

export default function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const brightness = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const springBrightness = useSpring(brightness, { stiffness: 200, damping: 20 });

  const glowOpacity = useTransform(springBrightness, [0, 1], [0, 0.15]);

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    rotateX.set(-y * 8);
    rotateY.set(x * 8);
    brightness.set(1);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    brightness.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: 1000,
        }}
        className="relative glass-strong p-8 md:p-10 cursor-pointer group"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            opacity: glowOpacity,
            background: `radial-gradient(circle at 50% 50%, ${service.color}, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-8">
          {/* Text content */}
          <div className="flex-1 min-w-0">
            {/* Icon + Title */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{service.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                  {service.title}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: service.color }}
                >
                  {service.subtitle}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8">
              {service.description}
            </p>

            {/* CTA */}
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
                boxShadow: `0 4px 20px ${service.color}33`,
              }}
            >
              서비스 방문하기
              <ArrowIcon />
            </a>
          </div>

          {/* Mockup */}
          <div className="shrink-0 hidden md:flex items-center justify-center">
            <div className="transition-transform duration-300 group-hover:scale-[1.03]">
              <ServiceMockup serviceId={service.id} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
