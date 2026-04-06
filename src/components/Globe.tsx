"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { useRef, useState, useMemo, useCallback } from "react";
import * as THREE from "three";
import { services, type Service } from "@/data/services";

const GLOBE_RADIUS = 2.2;

// Marker positions (lat, lng in degrees) spread around the globe
const markerPositions: [number, number][] = [
  [35, -30],   // Forcletter
  [10, 50],    // 행동대장
  [-20, 150],  // 메트로놈들
  [40, -140],  // Trade Tower
];

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main wireframe sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 36, 24]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.98, 24, 16]} />
        <meshStandardMaterial
          color="#4f46e5"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Latitude lines */}
      {[-60, -30, 0, 30, 60].map((lat) => {
        const r = GLOBE_RADIUS * Math.cos((lat * Math.PI) / 180);
        const y = GLOBE_RADIUS * Math.sin((lat * Math.PI) / 180);
        return (
          <mesh key={`lat-${lat}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r - 0.003, r + 0.003, 64]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}

function DotSurface() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = GLOBE_RADIUS * 1.001;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#a5b4fc"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Marker({
  service,
  lat,
  lng,
  onSelect,
  selected,
}: {
  service: Service;
  lat: number;
  lng: number;
  onSelect: (s: Service | null) => void;
  selected: boolean;
}) {
  const pos = useMemo(() => latLngToVec3(lat, lng, GLOBE_RADIUS), [lat, lng]);
  const outerPos = useMemo(
    () => latLngToVec3(lat, lng, GLOBE_RADIUS + 0.15),
    [lat, lng]
  );
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      meshRef.current.scale.setScalar(hovered || selected ? s * 1.5 : s);
    }
  });

  return (
    <group>
      {/* Marker dot */}
      <mesh
        ref={meshRef}
        position={pos}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(selected ? null : service);
        }}
        onPointerEnter={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={service.color}
          emissive={service.color}
          emissiveIntensity={hovered || selected ? 3 : 1.5}
        />
      </mesh>

      {/* Glow ring */}
      <mesh position={pos} lookAt={new THREE.Vector3(0, 0, 0)}>
        <ringGeometry args={[0.08, 0.12, 32]} />
        <meshBasicMaterial
          color={service.color}
          transparent
          opacity={hovered || selected ? 0.5 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Label */}
      {(hovered || selected) && (
        <Html position={outerPos.toArray()} center distanceFactor={6}>
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none select-none"
            style={{
              background: `${service.color}22`,
              color: service.color,
              border: `1px solid ${service.color}44`,
              backdropFilter: "blur(8px)",
            }}
          >
            {service.icon} {service.title}
          </div>
        </Html>
      )}
    </group>
  );
}

function CameraController({ selected }: { selected: Service | null }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 6));

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.03);
    camera.lookAt(0, 0, 0);
  });

  // Reset to default when nothing selected
  if (!selected) {
    targetPos.current.set(0, 0.5, 6);
  } else {
    const idx = services.findIndex((s) => s.id === selected.id);
    if (idx >= 0) {
      const [lat, lng] = markerPositions[idx];
      const dir = latLngToVec3(lat, lng, 4.5);
      targetPos.current.copy(dir);
    }
  }

  return null;
}

function Scene({
  selected,
  onSelect,
}: {
  selected: Service | null;
  onSelect: (s: Service | null) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#818cf8" />

      <Stars radius={50} depth={60} count={2000} factor={3} fade speed={0.3} />

      <GlobeWireframe />
      <DotSurface />

      {services.map((service, i) => (
        <Marker
          key={service.id}
          service={service}
          lat={markerPositions[i][0]}
          lng={markerPositions[i][1]}
          onSelect={onSelect}
          selected={selected?.id === service.id}
        />
      ))}

      <CameraController selected={selected} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        autoRotate={!selected}
        autoRotateSpeed={0.3}
      />
    </>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="inline-block ml-2">
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

function ServicePanel({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute right-6 top-1/2 -translate-y-1/2 w-80 glass-strong p-8 z-20 animate-slide-in"
      style={{
        animation: "slideIn 0.5s ease-out",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-lg"
      >
        &times;
      </button>

      <span className="text-4xl block mb-3">{service.icon}</span>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
        {service.title}
      </h2>
      <p className="text-sm font-medium mb-4" style={{ color: service.color }}>
        {service.subtitle}
      </p>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
        {service.description}
      </p>
      <a
        href={service.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${service.color}, ${service.color}bb)`,
          boxShadow: `0 4px 20px ${service.color}33`,
        }}
      >
        방문하기
        <ArrowIcon />
      </a>
    </div>
  );
}

export default function Globe() {
  const [selected, setSelected] = useState<Service | null>(null);

  const handleSelect = useCallback((s: Service | null) => {
    setSelected(s);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 0.5, 6], fov: 50 }}>
        <Scene selected={selected} onSelect={handleSelect} />
      </Canvas>

      {/* Title overlay */}
      {!selected && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-3">
            Todari
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            글로브를 돌려 서비스를 탐색하세요
          </p>
        </div>
      )}

      {/* Hint */}
      {!selected && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <p className="text-[var(--text-secondary)] text-xs animate-pulse">
            빛나는 마커를 클릭하세요
          </p>
        </div>
      )}

      {/* Service detail panel */}
      {selected && (
        <ServicePanel service={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
