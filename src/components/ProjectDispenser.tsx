"use client";

import { Edges } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { ServiceToy } from "@/components/ServiceToys";
import { services, type Service } from "@/data/services";
import { trackEvent } from "@/lib/analytics";

const INK = "#17151c";
const PAPER = "#fffaf0";
const LIME = "#dfff4f";
const PINK = "#ff79bd";
const CYAN = "#67e8f9";
const PURPLE = "#a78bfa";
const PROJECT_COUNT = services.length;

type Vec3 = [number, number, number];

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reducedMotion;
}

function OutlineMesh({
  color,
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  color: string;
  children: ReactNode;
  position?: Vec3;
  rotation?: Vec3;
  scale?: number | Vec3;
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      {children}
      <meshToonMaterial color={color} />
      <Edges color={INK} lineWidth={1.1} threshold={12} />
    </mesh>
  );
}

function seededRandom(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function ConfettiField({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const count = 220;
    const nextPositions = new Float32Array(count * 3);
    const nextColors = new Float32Array(count * 3);
    const palette = [LIME, PINK, CYAN, PURPLE, PAPER].map(
      (color) => new THREE.Color(color),
    );

    for (let index = 0; index < count; index += 1) {
      nextPositions[index * 3] = (seededRandom(index, 11) - 0.5) * 34;
      nextPositions[index * 3 + 1] = seededRandom(index, 23) * 21 - 6;
      nextPositions[index * 3 + 2] = seededRandom(index, 37) * 18 - 9;
      const color = palette[index % palette.length];
      nextColors[index * 3] = color.r;
      nextColors[index * 3 + 1] = color.g;
      nextColors[index * 3 + 2] = color.b;
    }

    return { positions: nextPositions, colors: nextColors };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current && !reducedMotion) {
      pointsRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.06;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.72}
        sizeAttenuation
      />
    </points>
  );
}

function CartridgeRack({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <group position={[0, -2.65, -2.1]}>
      {services.map((service, index) => {
        const x = (index - (PROJECT_COUNT - 1) / 2) * 1.08;
        const active = index === activeIndex;

        return (
          <group
            key={service.id}
            position={[x, active ? 0.16 : 0, active ? 0.5 : 0]}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(index);
            }}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <OutlineMesh color={active ? service.color : "#d8d0c4"}>
              <boxGeometry args={[0.82, active ? 1.05 : 0.8, 0.58]} />
            </OutlineMesh>
            <OutlineMesh
              color={active ? LIME : PAPER}
              position={[0, active ? 0.02 : -0.09, 0.33]}
            >
              <boxGeometry args={[0.38, 0.12, 0.08]} />
            </OutlineMesh>
          </group>
        );
      })}
    </group>
  );
}

function ProjectTray({
  service,
  activeIndex,
  pointer,
  reducedMotion,
}: {
  service: Service;
  activeIndex: number;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const trayRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.position.set(0, 0.75, -2.2);
    groupRef.current.scale.setScalar(0.76);
    groupRef.current.rotation.set(0.05, activeIndex % 2 ? 0.16 : -0.16, 0);
  }, [activeIndex]);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || !trayRef.current) return;

    const motionScale = reducedMotion ? 0 : 1;
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      1.05 + Math.sin(clock.elapsedTime * 0.85) * 0.06 * motionScale,
      5.5,
      delta,
    );
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      0,
      5.5,
      delta,
    );
    const nextScale = THREE.MathUtils.damp(
      groupRef.current.scale.x,
      1,
      5.5,
      delta,
    );
    groupRef.current.scale.setScalar(nextScale);
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      pointer.current.x * 0.13 * motionScale,
      4,
      delta,
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      0.03 - pointer.current.y * 0.04 * motionScale,
      4,
      delta,
    );
    trayRef.current.position.z = THREE.MathUtils.damp(
      trayRef.current.position.z,
      0,
      5,
      delta,
    );
  });

  return (
    <group ref={groupRef}>
      <group position={[0, -0.15, 0]} scale={1.04}>
        <ServiceToy serviceId={service.id} color={service.color} />
      </group>

      <group ref={trayRef} position={[0, -2.15, -1.4]}>
        <OutlineMesh color={PAPER}>
          <boxGeometry args={[6.25, 0.72, 4.6]} />
        </OutlineMesh>
        <OutlineMesh color={service.color} position={[0, -0.02, 2.42]}>
          <boxGeometry args={[2.3, 0.46, 0.38]} />
        </OutlineMesh>
        <OutlineMesh color={LIME} position={[0, 0.43, -1.7]}>
          <boxGeometry args={[5.3, 0.12, 0.28]} />
        </OutlineMesh>
      </group>

      <pointLight
        position={[0, 4.5, 3]}
        color={service.color}
        intensity={22}
        distance={16}
      />
    </group>
  );
}

function SceneCamera({
  pointer,
  reducedMotion,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const { camera, size } = useThree();
  const currentPosition = useRef(new THREE.Vector3(0, 3.8, 15));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame((_, delta) => {
    const compact = size.width < 768;
    const pointerScale = reducedMotion ? 0 : 1;
    const goalPosition = compact
      ? new THREE.Vector3(
          pointer.current.x * 0.32 * pointerScale,
          4.8 + pointer.current.y * 0.2 * pointerScale,
          17.8,
        )
      : new THREE.Vector3(
          pointer.current.x * 0.6 * pointerScale,
          3.8 + pointer.current.y * 0.35 * pointerScale,
          14.8,
        );
    const goalLookAt = compact
      ? new THREE.Vector3(0, 1.2, 0)
      : new THREE.Vector3(0, 0.25, 0);
    const smoothing = reducedMotion ? 12 : 5;

    currentPosition.current.x = THREE.MathUtils.damp(
      currentPosition.current.x,
      goalPosition.x,
      smoothing,
      delta,
    );
    currentPosition.current.y = THREE.MathUtils.damp(
      currentPosition.current.y,
      goalPosition.y,
      smoothing,
      delta,
    );
    currentPosition.current.z = THREE.MathUtils.damp(
      currentPosition.current.z,
      goalPosition.z,
      smoothing,
      delta,
    );
    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      goalLookAt.x,
      smoothing,
      delta,
    );
    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      goalLookAt.y,
      smoothing,
      delta,
    );
    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      goalLookAt.z,
      smoothing,
      delta,
    );

    camera.position.copy(currentPosition.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function DispenserScene({
  activeIndex,
  pointer,
  reducedMotion,
  onSelect,
}: {
  activeIndex: number;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
}) {
  const service = services[activeIndex];

  return (
    <>
      <color attach="background" args={["#272138"]} />
      <fog attach="fog" args={["#272138", 24, 52]} />
      <ambientLight intensity={1.35} />
      <hemisphereLight args={[PAPER, "#4c3b73", 2.2]} />
      <directionalLight position={[12, 18, 14]} intensity={2.9} color={PAPER} />
      <gridHelper
        args={[44, 22, PURPLE, "#403852"]}
        position={[0, -3.1, -4]}
      />
      <ConfettiField reducedMotion={reducedMotion} />
      <ProjectTray
        key={service.id}
        service={service}
        activeIndex={activeIndex}
        pointer={pointer}
        reducedMotion={reducedMotion}
      />
      <CartridgeRack activeIndex={activeIndex} onSelect={onSelect} />
      <SceneCamera pointer={pointer} reducedMotion={reducedMotion} />
    </>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12 12 4m0 0H6m6 0v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectIndex({
  activeIndex,
  onSelect,
  buttonRefs,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  buttonRefs?: React.MutableRefObject<(HTMLButtonElement | null)[]>;
}) {
  return (
    <>
      {services.map((service, index) => {
        const active = activeIndex === index;
        return (
          <button
            key={service.id}
            ref={(node) => {
              if (buttonRefs) buttonRefs.current[index] = node;
            }}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={active ? "true" : undefined}
            className={`group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border-2 border-[#17151c] px-3 py-2 text-left text-[#17151c] transition-transform hover:-translate-y-0.5 lg:w-full lg:gap-3 lg:px-3.5 ${
              active ? "shadow-[4px_4px_0_#17151c]" : "bg-[#fffaf0]/90"
            }`}
            style={{ backgroundColor: active ? service.color : undefined }}
          >
            <span
              className={`font-mono text-[9px] font-black tracking-[0.08em] ${
                active ? "text-[#17151c]" : "text-[#17151c]/45"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="whitespace-nowrap text-xs font-black tracking-[-0.02em] lg:text-[13px]">
              {service.title}
            </span>
          </button>
        );
      })}
    </>
  );
}

function ProjectCard({
  service,
  activeIndex,
  onPrevious,
  onNext,
}: {
  service: Service;
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const evidenceRows = service.evidence.map((item, index) => ({
    ...item,
    color: [PINK, CYAN, LIME][index],
  }));

  return (
    <article
      key={service.id}
      aria-live="polite"
      className="flex h-[24rem] w-full flex-col overflow-hidden rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0] p-4 text-[#17151c] shadow-[8px_8px_0_#17151c] sm:h-[26rem] sm:p-5 lg:h-[32rem] lg:p-6"
      style={{ boxShadow: `8px 8px 0 ${service.color}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-full border-2 border-[#17151c] bg-[#efe7d8] px-2.5 py-1 font-mono text-[9px] font-black tracking-[0.14em]">
          PROJECT {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(PROJECT_COUNT).padStart(2, "0")}
        </span>
        <span className="rounded-full border-2 border-[#17151c] bg-white px-2.5 py-1 font-mono text-[8px] font-black tracking-[0.1em]">
          {service.period}
        </span>
      </div>

      <h2 className="mt-3 whitespace-nowrap text-[clamp(1.75rem,7.2vw,2.5rem)] font-black tracking-[-0.055em]">
        {service.title}
      </h2>
      <p
        className="mt-1 line-clamp-1 text-sm font-black"
        style={{ color: service.color }}
      >
        {service.subtitle}
      </p>

      <dl className="mt-3 grid h-[9.75rem] shrink-0 grid-rows-3 divide-y-2 divide-[#17151c]/10 border-y-2 border-[#17151c]/15 sm:h-[11rem] lg:h-[13rem]">
        {evidenceRows.map((row) => (
          <div
            key={row.label}
            className="grid min-h-0 grid-cols-[4.5rem_1fr] items-center gap-2 py-1.5 sm:gap-3 sm:py-2"
          >
            <dt
              className="h-fit whitespace-nowrap rounded-md border border-[#17151c] px-1.5 py-1 text-center font-mono text-[8px] font-black tracking-[0.08em]"
              style={{ backgroundColor: row.color }}
            >
              {row.label}
            </dt>
            <dd className="line-clamp-2 text-[11px] font-medium leading-[1.5] text-[#463f4c] sm:text-xs sm:leading-5 lg:line-clamp-3">
              {row.text}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 hidden h-6 shrink-0 flex-wrap gap-1.5 overflow-hidden sm:flex">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-[#17151c]/20 bg-[#efe7d8] px-2 py-1 font-mono text-[9px] font-bold text-[#544c5c]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPrevious}
            disabled={activeIndex === 0}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-2 border-[#17151c] bg-white text-lg font-black shadow-[3px_3px_0_#17151c] disabled:cursor-default disabled:opacity-30"
            aria-label="이전 프로젝트"
          >
            ←
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={activeIndex === PROJECT_COUNT - 1}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-2 border-[#17151c] bg-white text-lg font-black shadow-[3px_3px_0_#17151c] disabled:cursor-default disabled:opacity-30"
            aria-label="다음 프로젝트"
          >
            →
          </button>
        </div>

        {service.url ? (
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("click_service_link", {
                service_id: service.id,
                service_title: service.title,
                service_url: service.url ?? "private",
              })
            }
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#17151c] px-4 py-2.5 text-xs font-black text-[#17151c] shadow-[4px_4px_0_#17151c] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 sm:text-sm"
            style={{ backgroundColor: service.color }}
          >
            {service.linkLabel ?? "서비스 보기"}
            <ArrowIcon />
          </a>
        ) : (
          <span className="inline-flex items-center rounded-xl border-2 border-[#17151c] bg-[#17151c] px-3 py-2.5 font-mono text-[8px] font-black tracking-[0.1em] text-[#fffaf0] sm:text-[9px]">
            PRIVATE WORK · 일부 비공개
          </span>
        )}
      </div>
    </article>
  );
}

export default function ProjectDispenser() {
  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const requestedId = window.location.hash.slice(1);
    const requestedIndex = services.findIndex(
      (service) => service.id === requestedId,
    );
    return requestedIndex >= 0 ? requestedIndex : 0;
  });
  const sectionRef = useRef<HTMLElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const gestureStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastHorizontalWheelRef = useRef(0);
  const mobileButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewedProjectsRef = useRef<Set<string>>(new Set());
  const reducedMotion = useReducedMotionPreference();

  const selectProject = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(index, PROJECT_COUNT - 1));
    setActiveIndex(nextIndex);

    const nextService = services[nextIndex];
    if (window.location.hash !== `#${nextService.id}`) {
      window.history.replaceState(null, "", `#${nextService.id}`);
    }
  }, []);

  useEffect(() => {
    const service = services[activeIndex];
    if (!viewedProjectsRef.current.has(service.id)) {
      viewedProjectsRef.current.add(service.id);
      trackEvent("view_section", { section_name: service.id });
    }

    mobileButtonRefs.current[activeIndex]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionIsVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      const target = event.target as HTMLElement | null;
      const isEditing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (!sectionIsVisible || isEditing) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectProject(activeIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        selectProject(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, selectProject]);

  useEffect(
    () => () => {
      document.body.style.cursor = "default";
    },
    [],
  );

  const activeService = services[activeIndex];

  return (
    <section
      id="space-journey"
      ref={sectionRef}
      aria-label="3D 프로젝트 디스펜서"
      className="relative h-[100svh] min-h-[44rem] overflow-hidden bg-[#272138] text-[#fffaf0]"
      onPointerMove={(event) => {
        pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
        pointerRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
      }}
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 3.8, 15], fov: 48, near: 0.1, far: 90 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
        >
          <DispenserScene
            activeIndex={activeIndex}
            pointer={pointerRef}
            reducedMotion={reducedMotion}
            onSelect={selectProject}
          />
        </Canvas>
      </div>

      <div
        className="absolute inset-0 z-[1] touch-pan-y"
        aria-hidden="true"
        onPointerDown={(event) => {
          gestureStartRef.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          const start = gestureStartRef.current;
          gestureStartRef.current = null;
          if (!start) return;
          const deltaX = event.clientX - start.x;
          const deltaY = event.clientY - start.y;
          if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
            return;
          }
          selectProject(activeIndex + (deltaX < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          gestureStartRef.current = null;
        }}
        onWheel={(event) => {
          if (Math.abs(event.deltaX) < 28 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
            return;
          }
          const now = performance.now();
          if (now - lastHorizontalWheelRef.current < 420) return;
          lastHorizontalWheelRef.current = now;
          selectProject(activeIndex + (event.deltaX > 0 ? 1 : -1));
        }}
      />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 border-b-2 border-[#17151c] bg-[#17151c]/82 px-4 py-3 backdrop-blur-md md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="shrink-0 text-2xl font-black tracking-[-0.065em] md:text-3xl">
            Todari
          </h1>
          <span className="hidden h-7 w-px bg-[#fffaf0]/25 sm:block" />
          <p className="hidden truncate font-mono text-[9px] font-bold tracking-[0.14em] text-[#fffaf0]/65 sm:block">
            PRODUCT ENGINEER · 3D PROJECT DISPENSER
          </p>
        </div>
        <a
          href="#works"
          className="pointer-events-auto shrink-0 rounded-xl border-2 border-[#17151c] bg-[#dfff4f] px-3 py-2 font-mono text-[9px] font-black tracking-[0.1em] text-[#17151c] shadow-[3px_3px_0_#fffaf0]"
        >
          ALL WORKS ↓
        </a>
      </header>

      <aside className="pointer-events-auto absolute bottom-5 left-5 top-20 z-10 hidden w-[15.5rem] flex-col rounded-[1.25rem] border-[3px] border-[#17151c] bg-[#fffaf0]/96 p-3 text-[#17151c] shadow-[8px_8px_0_#17151c] backdrop-blur lg:flex">
        <div className="mb-3 border-b-2 border-[#17151c] px-1 pb-3">
          <p className="font-mono text-[9px] font-black tracking-[0.18em] text-[#17151c]/50">
            PROJECT INDEX · PICK ONE
          </p>
          <p className="mt-1 text-sm font-black">
            원하는 프로젝트를 바로 꺼내보세요.
          </p>
        </div>
        <nav
          aria-label="프로젝트 바로 선택"
          className="grid min-h-0 flex-1 grid-rows-11 gap-1.5"
        >
          <ProjectIndex activeIndex={activeIndex} onSelect={selectProject} />
        </nav>
      </aside>

      <nav
        aria-label="모바일 프로젝트 바로 선택"
        className="pointer-events-auto absolute left-0 right-0 top-[4.15rem] z-20 flex gap-2 overflow-x-auto px-3 pb-3 pt-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        <ProjectIndex
          activeIndex={activeIndex}
          onSelect={selectProject}
          buttonRefs={mobileButtonRefs}
        />
      </nav>

      <div className="pointer-events-auto absolute bottom-4 left-3 right-3 z-10 lg:bottom-auto lg:left-auto lg:right-6 lg:top-1/2 lg:w-[24rem] lg:-translate-y-1/2">
        <ProjectCard
          service={activeService}
          activeIndex={activeIndex}
          onPrevious={() => selectProject(activeIndex - 1)}
          onNext={() => selectProject(activeIndex + 1)}
        />
      </div>

      <p className="pointer-events-none absolute bottom-4 left-1/2 z-[2] hidden -translate-x-1/2 rounded-full bg-[#17151c]/75 px-4 py-2 font-mono text-[9px] font-bold tracking-[0.13em] text-[#fffaf0]/75 backdrop-blur lg:block">
        ← → KEYS · DRAG / SWIPE · SCROLL ↓
      </p>
    </section>
  );
}
