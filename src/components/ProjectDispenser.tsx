"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import { ACESFilmicToneMapping, Group, MathUtils } from "three";
import { ServiceToy } from "@/components/ServiceToys";
import { services } from "@/data/services";
import styles from "./ProjectExplorer.module.css";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(sync: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", sync);
  return () => media.removeEventListener("change", sync);
}

function hasWebGL() {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return gl !== null;
  } catch {
    return false;
  }
}

function StageUnavailable() {
  return <p className="sr-only" role="status">3D 모델을 정지 이미지로 표시합니다.</p>;
}

class StageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <StageUnavailable /> : this.props.children;
  }
}

function Scene({ activeIndex, onSelect, reducedMotion, pointer }: {
  activeIndex: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
  pointer: RefObject<{ x: number; y: number }>;
}) {
  const { camera, gl, invalidate, size } = useThree();
  const modelRef = useRef<Group>(null);
  const service = services[activeIndex];

  useLayoutEffect(() => {
    const distance = Math.max(1, (size.height / size.width) * 0.95);
    camera.position.set(0, 3.6 * distance, 12.8 * distance);
    camera.lookAt(0, 0.2, 0);
    invalidate();
  }, [activeIndex, camera, invalidate, size]);

  useFrame(({ clock }, delta) => {
    const model = modelRef.current;
    if (!model || reducedMotion) return;
    model.rotation.y = MathUtils.damp(model.rotation.y, -0.18 + pointer.current.x * 0.5, 6, delta);
    model.rotation.x = MathUtils.damp(model.rotation.x, -pointer.current.y * 0.1, 6, delta);
    model.position.y = MathUtils.damp(model.position.y, 0.65 + Math.sin(clock.elapsedTime * 1.4) * 0.1, 5, delta);
  });

  return (
    <>
      <hemisphereLight args={["#f8fbff", "#899fc3", 2.15]} />
      <directionalLight position={[-4, 7, 6]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[5, 4, -5]} intensity={1.3} color="#c5d9ff" />
      <group ref={modelRef} position={[0, 0.65, 0]} rotation={[0, -0.18, 0]} scale={1.12} key={`${service.id}-${reducedMotion}`}>
        <ServiceToy serviceId={service.id} color={service.color} />
      </group>
      <RoundedBox args={[6.55, 0.62, 3.65]} radius={0.28} smoothness={4} position={[0, -1.38, 0]}>
        <meshStandardMaterial color="#bccbe3" roughness={0.43} metalness={0.16} />
      </RoundedBox>
      <RoundedBox args={[6.38, 0.14, 3.48]} radius={0.06} smoothness={4} position={[0, -1.04, 0]}>
        <meshStandardMaterial color="#e2eaf7" roughness={0.34} metalness={0.12} />
      </RoundedBox>
      <RoundedBox args={[6.6, 0.17, 1.32]} radius={0.08} smoothness={4} position={[0, -1.86, 2.13]}>
        <meshStandardMaterial color="#9cafd0" roughness={0.54} />
      </RoundedBox>
      {services.map((project, index) => {
        const selected = index === activeIndex;
        return (
          <RoundedBox
            key={project.id}
            args={[0.41, selected ? 0.26 : 0.16, 0.78]}
            radius={0.07}
            smoothness={3}
            position={[(index - (services.length - 1) / 2) * 0.48, selected ? -1.66 : -1.72, 2.15]}
            onPointerOver={(event) => {
              event.stopPropagation();
              gl.domElement.style.cursor = "pointer";
            }}
            onPointerOut={() => { gl.domElement.style.cursor = ""; }}
            onClick={(event) => {
              event.stopPropagation();
              if (event.delta < 8) onSelect(index);
            }}
          >
            <meshStandardMaterial color={selected ? project.color : "#e1e8f4"} roughness={0.44} />
          </RoundedBox>
        );
      })}
    </>
  );
}

export default function ProjectDispenser({ activeIndex, onSelect, inView }: {
  activeIndex: number;
  inView: boolean;
  onSelect: (index: number) => void;
}) {
  const [available, setAvailable] = useState(hasWebGL);
  const [ready, setReady] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, () => window.matchMedia(motionQuery).matches, () => false);
  const pointer = useRef({ x: 0, y: 0 });
  const gestureStart = useRef<{ x: number; y: number } | null>(null);
  const lastWheel = useRef(-Infinity);

  if (!available) return <StageUnavailable />;

  return (
    <div
      className={styles.canvas}
      data-ready={ready}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: (event.clientX - bounds.left) / bounds.width * 2 - 1,
          y: (event.clientY - bounds.top) / bounds.height * 2 - 1,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
        gestureStart.current = null;
      }}
      onPointerDown={(event) => {
        if (event.isPrimary && event.button === 0) gestureStart.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        if (!event.isPrimary) return;
        const start = gestureStart.current;
        gestureStart.current = null;
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) > Math.max(48, Math.abs(dy) * 1.25)) {
          onSelect(activeIndex + (dx < 0 ? 1 : -1));
        }
      }}
      onPointerCancel={() => { gestureStart.current = null; }}
      onWheel={(event) => {
        if (Math.abs(event.deltaX) < 25 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
        const now = performance.now();
        if (now - lastWheel.current < 350) return;
        lastWheel.current = now;
        onSelect(activeIndex + (event.deltaX > 0 ? 1 : -1));
      }}
    >
      <StageBoundary>
        <Canvas
          camera={{ position: [0, 3.6, 12.8], fov: 37, near: 0.1, far: 60 }}
          dpr={[1, 1.5]}
          aria-hidden="true"
          frameloop={inView && !reducedMotion ? "always" : "demand"}
          gl={{ antialias: true, alpha: true, toneMapping: ACESFilmicToneMapping }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", () => setAvailable(false), { once: true });
            setReady(true);
          }}
        >
          <Scene activeIndex={activeIndex} onSelect={onSelect} pointer={pointer} reducedMotion={reducedMotion} />
        </Canvas>
      </StageBoundary>
    </div>
  );
}
