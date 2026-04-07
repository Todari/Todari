"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import { trackEvent } from "@/lib/analytics";

// ── Questions for typing hero ───────────────────────────────
const questions = [
  { text: "내 인스타, AI가 분석해준다면?", color: "#3b82f6" },
  { text: "모임 정산, 아직도 계산기 쓰세요?", color: "#a855f7" },
  { text: "UI를 픽셀 아트로 만들 수 있다면?", color: "#ec4899" },
  { text: "주식, AI한테 맡기면 어떨까?", color: "#06b6d4" },
  { text: "합주할 때 박자가 안 맞으면?", color: "#f97316" },
  { text: "친구 생일, 온라인으로 축하할 수 있다면?", color: "#22c55e" },
  { text: "내 연애 유형이 궁금하다면?", color: "#ef4444" },
];

// ── Planet configs ──────────────────────────────────────────
type PlanetFeature = "data-ring" | "moons" | "pixel" | "multi-ring" | "pulse" | "sparkle" | "twin";

const PLANETS = [
  { orbit: 8,    size: 0.7,  speed: 0.14, startAngle: 0.0, tilt: 0.3, hasRing: false, feature: "data-ring" as PlanetFeature },
  { orbit: 11.5, size: 0.9,  speed: 0.10, startAngle: 1.2, tilt: 0.5, hasRing: false, feature: "moons" as PlanetFeature },
  { orbit: 15,   size: 0.6,  speed: 0.18, startAngle: 2.5, tilt: 0.2, hasRing: false, feature: "pixel" as PlanetFeature },
  { orbit: 18.5, size: 0.75, speed: 0.08, startAngle: 3.8, tilt: 0.4, hasRing: false, feature: "multi-ring" as PlanetFeature },
  { orbit: 22,   size: 0.6,  speed: 0.12, startAngle: 5.0, tilt: 0.3, hasRing: false, feature: "pulse" as PlanetFeature },
  { orbit: 25.5, size: 0.65, speed: 0.09, startAngle: 0.8, tilt: 0.35, hasRing: false, feature: "sparkle" as PlanetFeature },
  { orbit: 29,   size: 0.55, speed: 0.15, startAngle: 4.2, tilt: 0.15, hasRing: false, feature: "twin" as PlanetFeature },
];

// ── Textures ────────────────────────────────────────────────

function useCircleTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 32;
    c.height = 32;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, "rgba(255,255,255,0.8)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(c);
  }, []);
}

function makeGlowTexture(color: string, softness = 0.5) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const col = new THREE.Color(color);
  const r = Math.round(col.r * 255),
    g = Math.round(col.g * 255),
    b = Math.round(col.b * 255);
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, `rgba(${r},${g},${b},0.8)`);
  grad.addColorStop(softness * 0.4, `rgba(${r},${g},${b},0.25)`);
  grad.addColorStop(softness, `rgba(${r},${g},${b},0.05)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

// Pseudo-random from seed
function seededRand(seed: number, n: number) {
  const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Procedural planet color texture
function makePlanetTexture(color: string, seed: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const c = new THREE.Color(color);

  // Base with horizontal bands
  for (let y = 0; y < 256; y++) {
    const band =
      Math.sin(y * 0.12 + seed * 3) * 0.25 +
      Math.sin(y * 0.05 + seed * 7) * 0.15 +
      Math.sin(y * 0.22 + seed) * 0.08;
    const cr = Math.max(0, Math.min(255, Math.round(c.r * 255 * (1 + band))));
    const cg = Math.max(0, Math.min(255, Math.round(c.g * 255 * (1 + band))));
    const cb = Math.max(0, Math.min(255, Math.round(c.b * 255 * (1 + band))));
    ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
    ctx.fillRect(0, y, 512, 1);
  }

  // Surface features
  for (let i = 0; i < 60; i++) {
    const cx = seededRand(seed, i) * 512;
    const cy = seededRand(seed, i + 100) * 256;
    const r = 2 + seededRand(seed, i + 200) * 16;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    const dark = seededRand(seed, i + 300) > 0.5;
    ctx.fillStyle = dark
      ? `rgba(0,0,0,${0.06 + seededRand(seed, i + 400) * 0.12})`
      : `rgba(255,255,255,${0.04 + seededRand(seed, i + 500) * 0.08})`;
    ctx.fill();
  }

  // Storm / cloud streaks
  for (let i = 0; i < 8; i++) {
    const y = seededRand(seed, i + 600) * 256;
    ctx.strokeStyle = `rgba(255,255,255,${0.03 + seededRand(seed, i + 700) * 0.06})`;
    ctx.lineWidth = 1 + seededRand(seed, i + 800) * 4;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < 512; x += 30) {
      ctx.lineTo(x, y + (seededRand(seed, x + i * 50) - 0.5) * 10);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

// Bump texture for surface detail
function makeBumpTexture(seed: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 256, 128);

  for (let i = 0; i < 80; i++) {
    const cx = seededRand(seed, i + 900) * 256;
    const cy = seededRand(seed, i + 1000) * 128;
    const r = 1 + seededRand(seed, i + 1100) * 10;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = seededRand(seed, i + 1200) > 0.5 ? "#666" : "#999";
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

// ── Stars (multi-layer) ─────────────────────────────────────

function Stars() {
  const ref1 = useRef<THREE.Points>(null);
  const ref2 = useRef<THREE.Points>(null);
  const circleMap = useCircleTexture();

  const far = useMemo(() => {
    const pos = new Float32Array(6000 * 3);
    for (let i = 0; i < 6000; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 80 + Math.random() * 140;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const near = useMemo(() => {
    const pos = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 40 + Math.random() * 50;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ref1.current) ref1.current.rotation.y = t * 0.0008;
    if (ref2.current) ref2.current.rotation.y = -t * 0.002;
  });

  return (
    <>
      <points ref={ref1} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[far, 3]} count={6000} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.3} color="#dde4ff" transparent opacity={0.9} sizeAttenuation map={circleMap} alphaMap={circleMap} depthWrite={false} />
      </points>
      <points ref={ref2} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[near, 3]} count={1500} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.5} color="#ffffff" transparent opacity={0.6} sizeAttenuation map={circleMap} alphaMap={circleMap} depthWrite={false} />
      </points>
    </>
  );
}

// ── Nebula ──────────────────────────────────────────────────

function NebulaCloud({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const map = useMemo(() => makeGlowTexture(color, 0.8), [color]);
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial map={map} transparent opacity={0.06} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

// ── Sun ─────────────────────────────────────────────────────

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowMaps = useMemo(() => ({
    inner: makeGlowTexture("#ffcc44", 0.5),
    mid: makeGlowTexture("#ff8800", 0.7),
    outer: makeGlowTexture("#ffeecc", 0.3),
  }), []);

  useFrame(({ clock }) => {
    if (meshRef.current) meshRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.5) * 0.03);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#fff4d6" />
      </mesh>
      <sprite scale={[14, 14, 1]}>
        <spriteMaterial map={glowMaps.inner} transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite scale={[22, 22, 1]}>
        <spriteMaterial map={glowMaps.mid} transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite scale={[35, 35, 1]}>
        <spriteMaterial map={glowMaps.outer} transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <pointLight color="#ffcc88" intensity={80} distance={120} />
      <pointLight color="#ffffff" intensity={30} distance={80} />
    </group>
  );
}

// ── Orbit Ring ──────────────────────────────────────────────

function OrbitRing({ radius, color, active }: { radius: number; color: string; active: boolean }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, active ? 0.025 : 0.012, 4, 192]} />
      <meshBasicMaterial color={active ? color : "#1e293b"} transparent opacity={active ? 0.6 : 0.08} depthWrite={false} />
    </mesh>
  );
}

// ── Planet ───────────────────────────────────────────────────

function Planet({
  config, service, index, active, positionsRef, onClick,
}: {
  config: (typeof PLANETS)[0];
  service: (typeof services)[0];
  index: number;
  active: boolean;
  positionsRef: React.MutableRefObject<THREE.Vector3[]>;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(config.startAngle);

  const glowMap = useMemo(() => makeGlowTexture(service.color, 0.5), [service.color]);
  const colorTex = useMemo(() => makePlanetTexture(service.color, index + 1), [service.color, index]);
  const bumpTex = useMemo(() => makeBumpTexture(index + 1), [index]);

  useFrame(() => {
    if (!groupRef.current || !meshRef.current) return;
    angleRef.current += config.speed * 0.005;
    const x = Math.cos(angleRef.current) * config.orbit;
    const z = Math.sin(angleRef.current) * config.orbit;
    const y = Math.sin(angleRef.current * 1.5) * config.tilt;
    groupRef.current.position.set(x, y, z);
    meshRef.current.rotation.y += 0.005;
    positionsRef.current[index].set(x, y, z);
  });

  // Feature-specific refs
  const featureRef = useRef<THREE.Group>(null);
  const pulseRef = useRef(0);
  const circleMap = useCircleTexture();

  // Sparkle particle positions for Bir-th-day
  const sparklePositions = useMemo(() => {
    if (config.feature !== "sparkle") return new Float32Array(0);
    const count = 80;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = config.size * (1.5 + Math.random() * 2);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [config.feature, config.size]);

  // Data ring positions for Forcletter
  const dataRingPositions = useMemo(() => {
    if (config.feature !== "data-ring") return new Float32Array(0);
    const count = 60;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = config.size * 2 + (seededRand(index, i) - 0.5) * 0.3;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (seededRand(index, i + 100) - 0.5) * 0.3;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    return pos;
  }, [config.feature, config.size, index]);

  useFrame(({ clock }) => {
    if (!groupRef.current || !meshRef.current) return;
    angleRef.current += config.speed * 0.005;
    const x = Math.cos(angleRef.current) * config.orbit;
    const z = Math.sin(angleRef.current) * config.orbit;
    const y = Math.sin(angleRef.current * 1.5) * config.tilt;
    groupRef.current.position.set(x, y, z);
    positionsRef.current[index].set(x, y, z);

    // Feature animations
    if (config.feature === "pixel") {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.001;
    } else {
      meshRef.current.rotation.y += 0.005;
    }

    if (config.feature === "pulse") {
      pulseRef.current = clock.elapsedTime;
      const beat = 1 + Math.abs(Math.sin(clock.elapsedTime * 3)) * 0.12;
      meshRef.current.scale.setScalar(beat);
    }

    if (featureRef.current) {
      if (config.feature === "data-ring") {
        featureRef.current.rotation.y = clock.elapsedTime * 0.8;
        featureRef.current.rotation.x = 0.5;
      } else if (config.feature === "moons") {
        featureRef.current.rotation.y = clock.elapsedTime * 0.4;
      } else if (config.feature === "sparkle") {
        featureRef.current.rotation.y = clock.elapsedTime * 0.15;
        featureRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
      } else if (config.feature === "twin") {
        featureRef.current.rotation.y = clock.elapsedTime * 0.6;
      }
    }
  });

  const isPixel = config.feature === "pixel";

  return (
    <group
      ref={groupRef}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "default"; }}
    >
      {/* Planet body */}
      <mesh ref={meshRef}>
        {isPixel
          ? <boxGeometry args={[config.size * 1.4, config.size * 1.4, config.size * 1.4]} />
          : <sphereGeometry args={[config.size, 48, 48]} />
        }
        <meshStandardMaterial
          map={colorTex}
          bumpMap={bumpTex}
          bumpScale={0.02}
          emissive={service.color}
          emissiveIntensity={active ? 0.5 : 0.12}
          roughness={0.65}
          metalness={0.1}
        />
      </mesh>

      {/* Atmospheric rim */}
      {!isPixel && (
        <mesh scale={[1.06, 1.06, 1.06]}>
          <sphereGeometry args={[config.size, 32, 32]} />
          <meshBasicMaterial color={service.color} transparent opacity={active ? 0.2 : 0.08} side={THREE.BackSide} />
        </mesh>
      )}

      {/* Atmosphere glow */}
      <sprite scale={[config.size * 5, config.size * 5, 1]}>
        <spriteMaterial map={glowMap} transparent opacity={active ? 0.7 : 0.25} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>

      {/* ── Feature: data-ring (Forcletter) ── */}
      {config.feature === "data-ring" && (
        <group ref={featureRef}>
          <points frustumCulled={false}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[dataRingPositions, 3]} count={60} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.08} color={service.color} transparent opacity={0.9} sizeAttenuation map={circleMap} alphaMap={circleMap} depthWrite={false} blending={THREE.AdditiveBlending} />
          </points>
        </group>
      )}

      {/* ── Feature: moons (행동대장) ── */}
      {config.feature === "moons" && (
        <group ref={featureRef}>
          {[0, 2.1, 4.2].map((offset, mi) => (
            <mesh key={mi} position={[
              Math.cos(offset) * config.size * 2.2,
              (mi - 1) * 0.2,
              Math.sin(offset) * config.size * 2.2
            ]}>
              <sphereGeometry args={[config.size * 0.18, 16, 16]} />
              <meshStandardMaterial color={service.color} emissive={service.color} emissiveIntensity={0.3} />
            </mesh>
          ))}
        </group>
      )}

      {/* ── Feature: multi-ring (Trade Tower) ── */}
      {config.feature === "multi-ring" && (
        <>
          <mesh rotation={[Math.PI * 0.4, 0.1, 0]}>
            <torusGeometry args={[config.size * 1.7, 0.03, 4, 80]} />
            <meshBasicMaterial color={service.color} transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[Math.PI * 0.35, 0.3, 0.1]}>
            <torusGeometry args={[config.size * 2.1, 0.02, 4, 80]} />
            <meshBasicMaterial color={service.color} transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[Math.PI * 0.45, -0.1, 0.2]}>
            <torusGeometry args={[config.size * 2.5, 0.015, 4, 80]} />
            <meshBasicMaterial color={service.color} transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
        </>
      )}

      {/* ── Feature: sparkle (Bir-th-day) ── */}
      {config.feature === "sparkle" && (
        <group ref={featureRef}>
          <points frustumCulled={false}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[sparklePositions, 3]} count={80} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.12} color={service.color} transparent opacity={0.8} sizeAttenuation map={circleMap} alphaMap={circleMap} depthWrite={false} blending={THREE.AdditiveBlending} />
          </points>
        </group>
      )}

      {/* ── Feature: twin (LVTI) ── */}
      {config.feature === "twin" && (
        <group ref={featureRef}>
          <mesh position={[config.size * 1.8, 0, 0]}>
            <sphereGeometry args={[config.size * 0.4, 24, 24]} />
            <meshStandardMaterial color="#ff6b8a" emissive="#ff4466" emissiveIntensity={0.4} roughness={0.5} />
          </mesh>
        </group>
      )}

      <pointLight color={service.color} intensity={active ? 5 : 0.6} distance={12} />
    </group>
  );
}

// ── Camera ──────────────────────────────────────────────────

function CameraController({
  scrollProgress, positions, mouse,
}: {
  scrollProgress: number;
  positions: React.MutableRefObject<THREE.Vector3[]>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 28, 52));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ clock }) => {
    let goalPos: THREE.Vector3;
    let goalLook: THREE.Vector3;

    const mx = mouse.current.x;
    const my = mouse.current.y;

    const scrollRange = services.length + 0.5;
    const section = scrollProgress * scrollRange;

    if (section < 0.7) {
      // Hero: auto-orbiting overview
      const t = clock.elapsedTime * 0.05;
      goalPos = new THREE.Vector3(
        Math.sin(t) * 50 + mx * 4,
        26 + Math.sin(t * 0.5) * 3 + my * 2,
        Math.cos(t) * 50 + mx * 0.5
      );
      goalLook = new THREE.Vector3(0, 0, 0);
    } else {
      // Scroll-based planet tour — each planet has a unique camera angle
      const CAMERA_OFFSETS: [number, number, number][] = [
        [0, 1, 6],       // Forcletter: 정면
        [6, 3, 1],       // 행동대장: 오른쪽 위
        [-5, 0, 4],      // React Pixel UI: 왼쪽
        [0, 6, 2],       // Trade Tower: 위에서
        [4, -2, 4],      // 메트로놈들: 오른쪽 아래
        [-4, 3, 4],      // Bir-th-day: 왼쪽 위
        [5, 2, -3],      // LVTI: 오른쪽 뒤
      ];

      const planetFloat = section - 1;
      const idx = Math.min(Math.round(planetFloat), services.length - 1);
      const pp = positions.current[idx];

      if (pp && pp.lengthSq() > 0) {
        const offset = CAMERA_OFFSETS[idx] || [0, 1, 6];
        goalPos = pp.clone().add(new THREE.Vector3(offset[0], offset[1], offset[2]));
        goalLook = pp.clone();
        goalPos.x += mx * 0.4;
        goalPos.y += my * 0.3;
      } else {
        goalPos = new THREE.Vector3(0, 28, 52);
        goalLook = new THREE.Vector3(0, 0, 0);
      }
    }

    const speed = scrollProgress < 0.07 ? 0.012 : 0.025;
    currentPos.current.lerp(goalPos, speed);
    currentLook.current.lerp(goalLook, speed);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}

// ── 3D Scene ────────────────────────────────────────────────

function Scene({
  scrollProgress, activeIndex, onClickPlanet, positionsRef, mouseRef,
}: {
  scrollProgress: number;
  activeIndex: number;
  onClickPlanet: (i: number) => void;
  positionsRef: React.MutableRefObject<THREE.Vector3[]>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <>
      <ambientLight intensity={0.04} />
      <Stars />
      <NebulaCloud position={[-60, 20, -80]} color="#6366f1" scale={70} />
      <NebulaCloud position={[70, -15, -60]} color="#a855f7" scale={55} />
      <NebulaCloud position={[0, 40, -100]} color="#0ea5e9" scale={80} />
      <NebulaCloud position={[-40, -30, 70]} color="#ec4899" scale={50} />
      <Sun />

      {services.map((service, i) => {
        const config = PLANETS[i];
        if (!config) return null;
        return (
          <group key={service.id}>
            <OrbitRing radius={config.orbit} color={service.color} active={activeIndex === i} />
            <Planet
              config={config}
              service={service}
              index={i}
              active={activeIndex === i}
              positionsRef={positionsRef}
              onClick={() => onClickPlanet(i)}
            />
          </group>
        );
      })}

      <CameraController scrollProgress={scrollProgress} positions={positionsRef} mouse={mouseRef} />
    </>
  );
}

// ── HTML: Typing Hero ───────────────────────────────────────

function TypingHero() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const current = questions[index].text;
    if (phase === "typing") {
      if (displayText.length < current.length) {
        const t = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 50);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pause"), 2000);
      return () => clearTimeout(t);
    }
    if (phase === "pause") {
      setPhase("deleting");
    }
    if (phase === "deleting") {
      if (displayText.length > 0) {
        const t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 25);
        return () => clearTimeout(t);
      }
      setIndex((p) => (p + 1) % questions.length);
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

// ── HTML: Service Overlay ───────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block ml-1.5">
      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceOverlay({ scrollProgress }: { scrollProgress: number }) {
  const scrollRange = services.length + 0.5;
  const section = scrollProgress * scrollRange;
  // planetFloat: 0 = at planet 0, 1 = at planet 1, etc.
  const planetFloat = section - 1;

  return (
    <>
      {services.map((service, i) => {
        const dist = Math.abs(planetFloat - i);
        const opacity = Math.max(0, 1 - dist * 1.5);
        if (opacity <= 0) return null;

        const side = i % 2 === 0 ? "left" : "right";
        const tx = (1 - opacity) * (side === "left" ? -40 : 40);

        return (
          <div
            key={service.id}
            className={`absolute inset-0 flex pointer-events-none items-end pb-[8%] justify-center md:items-center md:pb-0 ${side === "left" ? "md:justify-start md:pl-[5%]" : "md:justify-end md:pr-[5%]"}`}
            style={{ opacity }}
          >
            <div
              className="max-w-[90vw] md:max-w-md pointer-events-auto rounded-2xl p-6 md:p-8"
              style={{
                transform: `translateX(${tx}px)`,
                textAlign: side === "right" ? "right" : "left",
                background: "rgba(6,6,20,0.85)",
                border: `1px solid ${service.color}22`,
              }}
            >
              <span className="text-4xl md:text-5xl block mb-3 md:mb-4">{service.icon}</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2">{service.title}</h2>
              <p className="text-base md:text-lg font-medium mb-2 md:mb-4" style={{ color: service.color }}>{service.subtitle}</p>
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-5 md:mb-8">{service.description}</p>
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_service_link', { service_id: service.id, service_title: service.title, service_url: service.url })}
                className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}bb)`, boxShadow: `0 0 30px ${service.color}44` }}
              >
                방문하기
                <ArrowIcon />
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}

// ── HTML: Legend ─────────────────────────────────────────────

function Legend({
  activeIndex, onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
      {services.map((service, i) => {
        const active = activeIndex === i;
        return (
          <button
            key={service.id}
            onClick={() => onSelect(i)}
            className="cursor-pointer"
          >
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-150"
              style={{
                backgroundColor: active ? service.color : "rgba(255,255,255,0.15)",
                boxShadow: active ? `0 0 12px ${service.color}` : "none",
                transform: active ? "scale(1.6)" : undefined,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────

export default function SolarSystem() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<THREE.Vector3[]>(services.map(() => new THREE.Vector3()));
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current) return;
      const scrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollable = (hero + planets + buffer) - viewport = (1+N+0.5) - 1 = N+0.5
  const scrollRange = services.length + 0.5;

  // Active planet index based on scroll (snap-aligned)
  const activeIndex = useMemo(() => {
    // Each section is 1/scrollRange of scroll
    const section = scrollProgress * scrollRange;
    if (section < 0.7) return -1; // Still in hero
    const idx = Math.round(section - 1);
    return Math.max(0, Math.min(idx, services.length - 1));
  }, [scrollProgress, scrollRange]);

  // Section visibility tracking (fire once per section per page load)
  const viewedSectionsRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (activeIndex === -1) {
      if (!viewedSectionsRef.current.has('hero')) {
        viewedSectionsRef.current.add('hero');
        trackEvent('view_section', { section_name: 'hero' });
      }
      return;
    }
    const sectionName = services[activeIndex]?.id;
    if (sectionName && !viewedSectionsRef.current.has(sectionName)) {
      viewedSectionsRef.current.add(sectionName);
      trackEvent('view_section', { section_name: sectionName });
    }
  }, [activeIndex]);

  // Click legend → scroll to snap section
  const scrollToIndex = useCallback((i: number) => {
    window.scrollTo({ top: (i + 1) * window.innerHeight, behavior: "smooth" });
  }, []);

  // Click planet in 3D → scroll to it
  const handleClickPlanet = useCallback((i: number) => {
    scrollToIndex(i);
  }, [scrollToIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  const heroSection = scrollProgress * scrollRange;
  const heroOpacity = Math.max(0, 1 - heroSection * 2);

  return (
    <div ref={containerRef}>
      {/* Snap target sections — create scroll height + snap points */}
      <div style={{ height: "100vh", scrollSnapAlign: "start" }} />
      {services.map((s) => (
        <div key={s.id} style={{ height: "100vh", scrollSnapAlign: "start" }} />
      ))}
      <div style={{ height: "50vh" }} />

      <div className="fixed inset-0" onMouseMove={handleMouseMove}>
        <Canvas
          camera={{ position: [0, 28, 52], fov: 55, near: 0.1, far: 500 }}
          gl={{ antialias: true, alpha: false }}
        >
          <Scene
            scrollProgress={scrollProgress}
            activeIndex={activeIndex}
            onClickPlanet={handleClickPlanet}
            positionsRef={positionsRef}
            mouseRef={mouseRef}
          />
        </Canvas>

        {/* Hero */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ opacity: heroOpacity }}>
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-10">Todari</h1>
          <TypingHero />
          <p className="text-[var(--text-secondary)] text-sm mt-10 mb-6">그래서 직접 만들었습니다</p>
          <div className="animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-secondary)]">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>

        {/* Service overlay */}
        {heroSection > 0.5 && <ServiceOverlay scrollProgress={scrollProgress} />}

        {/* Legend */}
        <Legend activeIndex={activeIndex} onSelect={scrollToIndex} />

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-50">
          <div className="h-full" style={{ width: `${scrollProgress * 100}%`, background: "linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)" }} />
        </div>
      </div>
    </div>
  );
}
