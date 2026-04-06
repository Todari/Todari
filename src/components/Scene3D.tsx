"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingShape({
  position,
  color,
  speed,
  geometry,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  geometry: "icosahedron" | "octahedron" | "torus" | "dodecahedron";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
  });

  const geometryNode = useMemo(() => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 8, 16]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={0.6}>
        {geometryNode}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

function MouseLight() {
  const light = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!light.current) return;
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    light.current.position.set(x, y, 3);
  });

  return <pointLight ref={light} intensity={2} color="#a855f7" distance={15} />;
}

function Particles() {
  const count = 200;
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#6366f1" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.15} />
        <MouseLight />

        <Stars
          radius={50}
          depth={80}
          count={1500}
          factor={3}
          saturation={0.2}
          fade
          speed={0.5}
        />

        <Particles />

        <FloatingShape position={[-4, 3, -5]} color="#f59e0b" speed={1.2} geometry="icosahedron" />
        <FloatingShape position={[4, -2, -3]} color="#3b82f6" speed={0.8} geometry="octahedron" />
        <FloatingShape position={[-3, -3, -4]} color="#a855f7" speed={1.0} geometry="torus" />
        <FloatingShape position={[3, 2, -6]} color="#06b6d4" speed={0.6} geometry="dodecahedron" />
      </Canvas>
    </div>
  );
}
