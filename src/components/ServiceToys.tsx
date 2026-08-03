"use client";

import { Edges } from "@react-three/drei";
import { useMemo, type ReactNode } from "react";
import * as THREE from "three";

const INK = "#17151c";
const PAPER = "#fffaf0";
const LIME = "#dfff4f";
const PINK = "#ff79bd";
const CYAN = "#67e8f9";
const TICKET_BLUE = "#3150ff";
const TOKSAI_YELLOW = "#ffcd38";
const TOKSAI_CORAL = "#ff647c";
const PIN_MINT = "#4be0b5";
const PIN_BLUE = "#3558f4";
const PIN_BUTTER = "#ffe36e";
const GEO_BLUE = "#36d6e7";
const GEO_NAVY = "#3150ff";

type Vec3 = [number, number, number];

function ToyMesh({
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

function DataToy({ color }: { color: string }) {
  return (
    <group>
      {[1.3, 2.2, 3].map((height, index) => (
        <ToyMesh
          key={height}
          color={index === 2 ? LIME : color}
          position={[-1.25 + index * 1.25, height / 2 - 0.4, 0]}
          rotation={[0, index * 0.08, index % 2 ? 0.04 : -0.04]}
        >
          <boxGeometry args={[0.85, height, 0.9]} />
        </ToyMesh>
      ))}
      <mesh rotation={[Math.PI / 2.7, 0.15, 0]} position={[0, 1, 0]}>
        <torusGeometry args={[2.35, 0.08, 8, 64]} />
        <meshBasicMaterial color={PINK} />
      </mesh>
    </group>
  );
}

function CoinToy({ color }: { color: string }) {
  const stacks = [
    { x: -1.35, count: 3, z: -0.08 },
    { x: 0, count: 5, z: 0.18 },
    { x: 1.35, count: 4, z: -0.02 },
  ] as const;

  return (
    <group rotation={[0.04, -0.18, 0]}>
      {stacks.map((stack, stackIndex) => (
        <group key={stack.x} position={[stack.x, 0, stack.z]}>
          {Array.from({ length: stack.count }, (_, coinIndex) => (
            <ToyMesh
              key={`${stack.x}-${coinIndex}`}
              color={
                coinIndex === stack.count - 1
                  ? LIME
                  : stackIndex === 1 && coinIndex % 2 === 0
                    ? PAPER
                    : color
              }
              position={[0, -1 + coinIndex * 0.31, 0]}
            >
              <cylinderGeometry args={[0.68, 0.68, 0.25, 24]} />
            </ToyMesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function FlameToy({ color }: { color: string }) {
  return (
    <group>
      <ToyMesh color="#fb923c" position={[0, 0.45, 0]} rotation={[0, 0, 0.05]}>
        <coneGeometry args={[1.75, 3.4, 7]} />
      </ToyMesh>
      <ToyMesh color={color} position={[0.1, 0.5, 0.65]} rotation={[0.1, 0, -0.05]}>
        <coneGeometry args={[1, 2.3, 7]} />
      </ToyMesh>
      <ToyMesh color={LIME} position={[-0.05, 0.55, 1]} rotation={[0.1, 0, 0.08]}>
        <coneGeometry args={[0.45, 1.2, 7]} />
      </ToyMesh>
    </group>
  );
}

function PixelToy({ color }: { color: string }) {
  const blocks = [
    [-1.2, 0, 0],
    [0, 0, 0],
    [1.2, 0, 0],
    [-0.6, 1.15, 0],
    [0.6, 1.15, 0],
    [0, 2.3, 0],
  ] satisfies Vec3[];

  return (
    <group rotation={[0.08, -0.18, -0.04]}>
      {blocks.map((position, index) => (
        <ToyMesh
          key={position.join("-")}
          color={[color, PINK, LIME, CYAN][index % 4]}
          position={position}
        >
          <boxGeometry args={[1.08, 1.08, 1.08]} />
        </ToyMesh>
      ))}
    </group>
  );
}

function BeatToy({ color }: { color: string }) {
  return (
    <group rotation={[0.1, 0.1, 0]}>
      {[0.85, 1.45, 2.05].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, index * 0.18, 0]}>
          <torusGeometry args={[radius, 0.15 - index * 0.025, 8, 64]} />
          <meshToonMaterial color={[LIME, color, PINK][index]} />
          <Edges threshold={12} color={INK} />
        </mesh>
      ))}
      <ToyMesh color={PAPER}>
        <sphereGeometry args={[0.52, 24, 24]} />
      </ToyMesh>
    </group>
  );
}

function TowerToy({ color }: { color: string }) {
  return (
    <group>
      {[2.4, 1.6, 2.9, 2].map((height, index) => (
        <ToyMesh
          key={`${height}-${index}`}
          color={index === 2 ? LIME : color}
          position={[-1.5 + index, height / 2 - 0.55, index % 2 ? 0.35 : -0.1]}
          rotation={[0, index * 0.09, index % 2 ? -0.03 : 0.03]}
        >
          <boxGeometry args={[0.76, height, 0.82]} />
        </ToyMesh>
      ))}
      <mesh rotation={[Math.PI / 2.4, 0, 0.25]} position={[0, 0.7, 0]}>
        <torusGeometry args={[2.55, 0.08, 8, 64]} />
        <meshBasicMaterial color={PINK} />
      </mesh>
    </group>
  );
}

function HeartToy({ color }: { color: string }) {
  const shape = useMemo(() => {
    const heart = new THREE.Shape();
    heart.moveTo(0, -0.9);
    heart.bezierCurveTo(-2.5, -2.4, -3.4, 1.25, -1.35, 1.55);
    heart.bezierCurveTo(-0.55, 1.7, 0, 1.15, 0, 0.7);
    heart.bezierCurveTo(0, 1.15, 0.55, 1.7, 1.35, 1.55);
    heart.bezierCurveTo(3.4, 1.25, 2.5, -2.4, 0, -0.9);
    return heart;
  }, []);

  const options = useMemo(
    () => ({
      depth: 0.72,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.12,
      bevelThickness: 0.12,
    }),
    [],
  );

  return (
    <group rotation={[0.08, -0.25, 0.05]} scale={0.85}>
      <mesh>
        <extrudeGeometry args={[shape, options]} />
        <meshToonMaterial color={color} />
        <Edges threshold={12} color={INK} />
      </mesh>
      <ToyMesh color={LIME} position={[0.8, 1.9, 0.3]} scale={0.42}>
        <sphereGeometry args={[0.7, 20, 20]} />
      </ToyMesh>
    </group>
  );
}

function TicketToy({ color }: { color: string }) {
  return (
    <group rotation={[0.08, -0.18, -0.03]}>
      <group position={[-0.72, 0.55, 0]} rotation={[0, -0.08, -0.12]}>
        <ToyMesh color={color}>
          <boxGeometry args={[1.7, 2.75, 0.34]} />
        </ToyMesh>
        <ToyMesh color={PAPER} position={[0, 0.35, 0.22]}>
          <boxGeometry args={[1.74, 0.46, 0.12]} />
        </ToyMesh>
      </group>
      <group position={[0.72, 0.35, 0.45]} rotation={[0, 0.1, 0.12]}>
        <ToyMesh color={PAPER}>
          <boxGeometry args={[1.7, 2.75, 0.34]} />
        </ToyMesh>
        <ToyMesh color={TICKET_BLUE} position={[0, 0.35, 0.22]}>
          <boxGeometry args={[1.74, 0.46, 0.12]} />
        </ToyMesh>
      </group>
      <mesh rotation={[Math.PI / 2.25, 0.08, 0.1]} position={[0, 0.35, 0.1]}>
        <torusGeometry args={[2.15, 0.08, 8, 64]} />
        <meshBasicMaterial color={LIME} />
      </mesh>
    </group>
  );
}

function ChatToy() {
  return (
    <group rotation={[0.03, -0.12, 0]}>
      <ToyMesh
        color={TOKSAI_YELLOW}
        position={[-0.72, 0.45, 0]}
        rotation={[0, -0.08, -0.06]}
      >
        <boxGeometry args={[2.35, 1.45, 0.5]} />
      </ToyMesh>
      <ToyMesh
        color={TOKSAI_YELLOW}
        position={[-1.42, -0.28, 0]}
        rotation={[0, 0, Math.PI]}
      >
        <coneGeometry args={[0.38, 0.72, 4]} />
      </ToyMesh>
      <ToyMesh
        color={TOKSAI_CORAL}
        position={[0.72, 1.45, 0.45]}
        rotation={[0, 0.08, 0.06]}
      >
        <boxGeometry args={[2.35, 1.45, 0.5]} />
      </ToyMesh>
      <ToyMesh
        color={TOKSAI_CORAL}
        position={[1.42, 0.72, 0.45]}
        rotation={[0, 0, Math.PI]}
      >
        <coneGeometry args={[0.38, 0.72, 4]} />
      </ToyMesh>
      <ToyMesh color={PAPER} position={[0, 0.95, 1]} rotation={[0.1, 0.2, 0.1]}>
        <octahedronGeometry args={[0.48, 0]} />
      </ToyMesh>
    </group>
  );
}

function MapPinToy() {
  return (
    <group rotation={[0.08, -0.14, -0.02]}>
      <ToyMesh
        color={PIN_MINT}
        position={[-1.05, 0.4, 0]}
        rotation={[0, 0.22, -0.03]}
      >
        <boxGeometry args={[1.12, 2.5, 0.2]} />
      </ToyMesh>
      <ToyMesh
        color={PIN_BUTTER}
        position={[0, 0.5, 0.22]}
        rotation={[0, -0.22, 0.03]}
      >
        <boxGeometry args={[1.12, 2.5, 0.2]} />
      </ToyMesh>
      <ToyMesh
        color={PIN_MINT}
        position={[1.05, 0.4, 0]}
        rotation={[0, 0.22, -0.03]}
      >
        <boxGeometry args={[1.12, 2.5, 0.2]} />
      </ToyMesh>
      <ToyMesh
        color={PIN_BLUE}
        position={[0.05, 1.3, 0.85]}
        rotation={[0, 0, Math.PI]}
      >
        <coneGeometry args={[0.58, 1.55, 8]} />
      </ToyMesh>
      <ToyMesh color={PIN_BLUE} position={[0.05, 2.28, 0.85]}>
        <sphereGeometry args={[0.72, 20, 20]} />
      </ToyMesh>
      <ToyMesh color={PAPER} position={[0.05, 2.28, 1.48]} scale={0.28}>
        <sphereGeometry args={[0.72, 16, 16]} />
      </ToyMesh>
    </group>
  );
}

function GeoDashboardToy() {
  return (
    <group rotation={[0.05, -0.16, -0.02]}>
      <ToyMesh color={GEO_NAVY} position={[0, 0.55, -0.2]}>
        <boxGeometry args={[3.4, 2.45, 0.45]} />
      </ToyMesh>
      <ToyMesh color={PAPER} position={[0, 0.6, 0.08]}>
        <boxGeometry args={[2.92, 1.95, 0.16]} />
      </ToyMesh>
      {[0.58, 1.05, 1.48].map((height, index) => (
        <ToyMesh
          key={height}
          color={[GEO_BLUE, LIME, PINK][index]}
          position={[-0.86 + index * 0.82, height / 2 - 0.12, 0.26]}
        >
          <boxGeometry args={[0.44, height, 0.2]} />
        </ToyMesh>
      ))}
      <mesh position={[0, 0.6, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.07, 8, 64]} />
        <meshBasicMaterial color={GEO_BLUE} />
      </mesh>
      <ToyMesh
        color={LIME}
        position={[1.45, 1.95, 0.45]}
        rotation={[0.1, 0.2, 0.08]}
        scale={0.36}
      >
        <octahedronGeometry args={[1, 0]} />
      </ToyMesh>
    </group>
  );
}

export function ServiceToy({
  serviceId,
  color,
}: {
  serviceId: string;
  color: string;
}) {
  switch (serviceId) {
    case "forcletter":
      return <DataToy color={color} />;
    case "geo":
      return <GeoDashboardToy />;
    case "haengdong":
      return <CoinToy color={color} />;
    case "dakbal":
      return <FlameToy color={color} />;
    case "react-pixel-ui":
      return <PixelToy color={color} />;
    case "metronomdeul":
      return <BeatToy color={color} />;
    case "trade-tower":
      return <TowerToy color={color} />;
    case "lovetype":
      return <HeartToy color={color} />;
    case "hgt":
      return <HeartToy color={color} />;
    case "jeongpyo":
      return <TicketToy color={color} />;
    case "toksai":
      return <ChatToy />;
    case "pin-to-gather":
      return <MapPinToy />;
    default:
      return (
        <ToyMesh color={color}>
          <icosahedronGeometry args={[1.8, 1]} />
        </ToyMesh>
      );
  }
}
