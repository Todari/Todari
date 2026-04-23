"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { services } from "@/data/services";

const questions = [
  { text: "내 인스타, AI가 분석해준다면?", color: "#f59e0b" },
  { text: "모임 정산, 아직도 계산기 쓰세요?", color: "#3b82f6" },
  { text: "엽떡 갔는데 닭발이 품절이라면?", color: "#e11d48" },
  { text: "UI를 픽셀 아트로 만들 수 있다면?", color: "#10b981" },
  { text: "합주할 때 박자가 안 맞으면?", color: "#a855f7" },
  { text: "주식, AI한테 맡기면 어떨까?", color: "#06b6d4" },
];

const STATION_SPACING = 50;
const TOTAL_DEPTH = STATION_SPACING * (services.length + 1);
// Create a circular texture for round stars
function useCircleTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.8)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);
}

// Layer 1: Background stars — ALWAYS follow the camera, guarantees visible starfield
function BackgroundStars() {
  const ref = useRef<THREE.Points>(null);
  const circleMap = useCircleTexture();
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 20 + Math.random() * 60;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ camera }) => {
    if (!ref.current) return;
    // Follow camera position so stars are always around it
    ref.current.position.copy(camera.position);
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#c7d2fe"
        transparent
        opacity={0.5}
        sizeAttenuation
        map={circleMap}
        alphaMap={circleMap}
        depthWrite={false}
      />
    </points>
  );
}

// Layer 2: Foreground streaking stars — fixed in world, fly past camera for motion feel
function StreamingStars() {
  const ref = useRef<THREE.Points>(null);
  const circleMap = useCircleTexture();
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = -(Math.random() * (TOTAL_DEPTH + 100));
    }
    return pos;
  }, []);

  useFrame(({ camera }) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.getAttribute("position");
    const cx = camera.position.x;
    const cy = camera.position.y;
    const cz = camera.position.z;

    for (let i = 0; i < count; i++) {
      const sx = posAttr.getX(i);
      const sy = posAttr.getY(i);
      const sz = posAttr.getZ(i);
      const dx = sx - cx, dy = sy - cy, dz = sz - cz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist > 60) {
        // Place in a sphere around camera, biased forward
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 5 + Math.random() * 40;
        posAttr.setX(i, cx + r * Math.sin(phi) * Math.cos(theta));
        posAttr.setY(i, cy + r * Math.sin(phi) * Math.sin(theta));
        posAttr.setZ(i, cz + r * Math.cos(phi));
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#e0e7ff"
        transparent
        opacity={0.8}
        sizeAttenuation
        map={circleMap}
        alphaMap={circleMap}
        depthWrite={false}
      />
    </points>
  );
}

// Soft glow sprite texture
function useGlowTexture(color: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const c = new THREE.Color(color);
    const r = Math.round(c.r * 255);
    const g = Math.round(c.g * 255);
    const b = Math.round(c.b * 255);
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, `rgba(${r},${g},${b},0.6)`);
    gradient.addColorStop(0.2, `rgba(${r},${g},${b},0.2)`);
    gradient.addColorStop(0.5, `rgba(${r},${g},${b},0.05)`);
    gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, [color]);
}

// Nebula station — soft glow + scattered particles
function Station({ z, color }: { z: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const circleMap = useCircleTexture();
  const glowMap = useGlowTexture(color);
  const particleCount = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u1 = Math.max(0.001, Math.random());
      const r = Math.sqrt(-2 * Math.log(u1)) * 0.8;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * r * 0.25;
      pos[i * 3 + 2] = r * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <group position={[0, 0, z]} ref={groupRef}>
      {/* Nebula particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={particleCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation
          map={circleMap}
          alphaMap={circleMap}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Core glow as sprite (always faces camera, no hard edges) */}
      <sprite scale={[6, 6, 1]}>
        <spriteMaterial
          map={glowMap}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* Light to illuminate nearby stars */}
      <pointLight color={color} intensity={3} distance={20} />
    </group>
  );
}

// Camera keyframes: [scrollProgress, cameraOffset, lookAtOffset]
// cameraOffset = position relative to focus point
// lookAtOffset = look target relative to focus point
// Each service has: approach → hold → transition out
// Transitions are wide (8% of scroll) so they feel slow and cinematic
const cameraKeyframes = [
  // ===== HERO: straight forward =====
  { at: 0.00, cam: [0, 0, 12],    look: [0, 0, -15] },

  // ===== Section 1 (Forcletter): forward view =====
  { at: 0.08, cam: [0, 0, 12],    look: [0, 0, -15] },
  { at: 0.14, cam: [0, 0, 12],    look: [0, 0, -15] },

  // ----- swing to RIGHT -----
  { at: 0.21, cam: [14, 1, 0],    look: [0, 0, -2] },

  // ===== Section 2 (행동대장): from right =====
  { at: 0.24, cam: [14, 1, 0],    look: [0, 0, -2] },
  { at: 0.30, cam: [14, 1, 0],    look: [0, 0, -2] },

  // ----- rise ABOVE -----
  { at: 0.37, cam: [0, 14, 2],    look: [0, 0, -2] },

  // ===== Section 3 (닭발 헌터): from above =====
  { at: 0.40, cam: [0, 14, 2],    look: [0, 0, -2] },
  { at: 0.46, cam: [0, 14, 2],    look: [0, 0, -2] },

  // ----- swing to LEFT -----
  { at: 0.53, cam: [-14, -1, 0],  look: [0, 0, -2] },

  // ===== Section 4 (React Pixel UI): from left =====
  { at: 0.56, cam: [-14, -1, 0],  look: [0, 0, -2] },
  { at: 0.61, cam: [-14, -1, 0],  look: [0, 0, -2] },

  // ----- back behind, low angle -----
  { at: 0.68, cam: [0, -2, 14],   look: [0, 0, -15] },

  // ===== Section 5 (메트로놈들): forward, low angle =====
  { at: 0.71, cam: [0, -2, 14],   look: [0, 0, -15] },
  { at: 0.76, cam: [0, -2, 14],   look: [0, 0, -15] },

  // ----- swing to RIGHT-UP diagonal -----
  { at: 0.83, cam: [10, 10, 2],   look: [0, 0, -2] },

  // ===== Section 6 (Trade Tower): diagonal view =====
  { at: 0.86, cam: [10, 10, 2],   look: [0, 0, -2] },
  { at: 0.91, cam: [10, 10, 2],   look: [0, 0, -2] },

  // ===== End =====
  { at: 1.00, cam: [0, 0, 12],    look: [0, 0, -15] },
];

function lerpKeyframes(progress: number) {
  let i = 0;
  while (i < cameraKeyframes.length - 1 && cameraKeyframes[i + 1].at <= progress) i++;
  const a = cameraKeyframes[i];
  const b = cameraKeyframes[Math.min(i + 1, cameraKeyframes.length - 1)];
  const range = b.at - a.at || 1;
  // Smoothstep for cinematic easing
  let t = Math.max(0, Math.min(1, (progress - a.at) / range));
  t = t * t * (3 - 2 * t);
  return {
    cam: a.cam.map((v, j) => v + (b.cam[j] - v) * t) as [number, number, number],
    look: a.look.map((v, j) => v + (b.look[j] - v) * t) as [number, number, number],
  };
}

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 12));
  const currentLook = useRef(new THREE.Vector3(0, 0, -10));

  useFrame(() => {
    const focusZ = -scrollProgress * TOTAL_DEPTH;
    const { cam, look } = lerpKeyframes(scrollProgress);

    const targetPos = new THREE.Vector3(cam[0], cam[1], focusZ + cam[2]);
    const targetLook = new THREE.Vector3(look[0], look[1], focusZ + look[2]);

    currentPos.current.lerp(targetPos, 0.035);
    currentLook.current.lerp(targetLook, 0.035);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.08} />

      <BackgroundStars />
      <StreamingStars />

      {services.map((service, i) => (
        <Station
          key={service.id}
          z={-(STATION_SPACING * (i + 1))}
          color={service.color}
        />
      ))}

      <CameraRig scrollProgress={scrollProgress} />
    </>
  );
}


function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="inline-block ml-2">
      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceOverlay({ scrollProgress }: { scrollProgress: number }) {
  const totalStations = services.length;
  const stationProgress = scrollProgress * (totalStations + 1);

  return (
    <>
      {services.map((service, i) => {
        const stationCenter = i + 1;
        const dist = Math.abs(stationProgress - stationCenter);
        const opacity = Math.max(0, 1 - dist * 2.5);
        if (opacity <= 0) return null;

        const side = i % 2 === 0 ? "left" : "right";
        const translateX = (1 - opacity) * (side === "left" ? -40 : 40);

        return (
          <div
            key={service.id}
            className={`absolute inset-0 flex items-center pointer-events-none ${
              side === "left" ? "justify-start pl-[6%]" : "justify-end pr-[6%]"
            }`}
            style={{ opacity }}
          >
            <div
              className="max-w-md pointer-events-auto"
              style={{
                transform: `translateX(${translateX}px)`,
                textAlign: side === "right" ? "right" : "left",
              }}
            >
              <span className="text-5xl block mb-4">{service.icon}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {service.title}
              </h2>
              <p className="text-lg font-medium mb-4" style={{ color: service.color }}>
                {service.subtitle}
              </p>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8">
                {service.description}
              </p>
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${service.color}, ${service.color}bb)`,
                  boxShadow: `0 0 30px ${service.color}44`,
                }}
              >
                서비스 방문하기
                <ArrowIcon />
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}

function BackgroundGlow({ scrollProgress }: { scrollProgress: number }) {
  const totalStations = services.length;
  const stationProgress = scrollProgress * (totalStations + 1);

  let color = "transparent";
  let opacity = 0;

  for (let i = 0; i < services.length; i++) {
    const dist = Math.abs(stationProgress - (i + 1));
    const o = Math.max(0, 1 - dist * 2);
    if (o > opacity) {
      opacity = o;
      color = services[i].color;
    }
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${color}18 0%, transparent 60%)`,
        opacity,
      }}
    />
  );
}

function ScrollIndicator({ scrollProgress }: { scrollProgress: number }) {
  const totalStations = services.length;
  const stationProgress = scrollProgress * (totalStations + 1);

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 z-20">
      {services.map((service, i) => {
        const active = Math.abs(stationProgress - (i + 1)) < 0.4;
        return (
          <div key={service.id} className="flex items-center gap-2">
            <span
              className="text-[10px] font-medium transition-all duration-300"
              style={{
                color: service.color,
                opacity: active ? 1 : 0,
                transform: active ? "translateX(0)" : "translateX(10px)",
              }}
            >
              {service.title}
            </span>
            <div
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: active ? service.color : "rgba(255,255,255,0.15)",
                boxShadow: active ? `0 0 12px ${service.color}` : "none",
                transform: active ? "scale(1.8)" : "scale(1)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function TypingHero() {
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
    <div className="h-14 md:h-16 flex items-center justify-center">
      <span className="text-2xl md:text-4xl font-semibold">
        <span style={{ color: questions[index].color }}>{displayText}</span>
        <span
          className="inline-block w-[3px] h-[1.1em] ml-1 align-middle rounded-full animate-pulse"
          style={{ backgroundColor: questions[index].color }}
        />
      </span>
    </div>
  );
}

export default function SpaceJourney() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current) return;
      const scrollable = containerRef.current.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
      setScrollProgress(progress);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollProgress * 15);

  return (
    <div
      ref={containerRef}
      style={{ height: `${(services.length + 2) * 100}vh` }}
    >
      <div className="fixed inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 70, near: 0.1, far: 400 }}
          gl={{ alpha: true, antialias: true }}
          style={{ position: "absolute", inset: 0, background: "transparent" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>

        <BackgroundGlow scrollProgress={scrollProgress} />

        {/* Hero */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: heroOpacity }}
        >
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-10">
            Todari
          </h1>
          <TypingHero />
          <p className="text-[var(--text-secondary)] text-sm mt-10 mb-6">
            그래서 직접 만들었습니다
          </p>
          <div className="animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-secondary)]">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>

        <ServiceOverlay scrollProgress={scrollProgress} />
        <ScrollIndicator scrollProgress={scrollProgress} />

        <div className="absolute top-0 left-0 right-0 h-[2px] z-50">
          <div
            className="h-full"
            style={{
              width: `${scrollProgress * 100}%`,
              background: "linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
