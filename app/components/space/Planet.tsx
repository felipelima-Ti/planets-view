"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  Mesh,
  Group,
  DoubleSide,
  AdditiveBlending,
  BackSide,
} from "three";

import type { PlanetData } from "../../data/planets";
import { Moon } from "./Moon";

type Props = {
  data: PlanetData;
  onClick: (id: string) => void; 
  onHover: (id: string | null) => void;
  paused: boolean;
  showMoon: boolean;
  registerRef?: (id: string, group: Group | null) => void;
};

export const Planet = ({
  data,
  onClick,
  onHover,
  paused,
  showMoon,
  registerRef,
}: Props) => {
  const orbitRef = useRef<Group>(null);
  const planetRef = useRef<Mesh>(null);
  const tiltRef = useRef<Group>(null);

  const texture = useLoader(TextureLoader, data.textureUrl);
  const ringTexture = data.ringUrl
    ? useLoader(TextureLoader, data.ringUrl)
    : null;

  const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  // registra ref uma vez quando o componente é montado
  useEffect(() => {
    if (registerRef && orbitRef.current) {
      registerRef(data.id, orbitRef.current);
    }
  }, [registerRef, data.id]);

  useFrame((_, delta) => {
    if (!orbitRef.current || !planetRef.current) return;

    if (!paused) {
      orbitRef.current.rotation.y += delta * data.speed * 0.15;
      planetRef.current.rotation.y += data.rotationSpeed * 2;
    }
  });

  // órbita
  const orbitPoints = useMemo(() => {
    const pts: number[] = [];
    const seg = 128;

    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      pts.push(
        Math.cos(a) * data.orbit,
        0,
        Math.sin(a) * data.orbit
      );
    }

    return new Float32Array(pts);
  }, [data.orbit]);

  return (
    <>
      {/* órbita */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[orbitPoints, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#4a5b8a"
          transparent
          opacity={0.18}
        />
      </line>

      <group ref={orbitRef} rotation={[0, startAngle, 0]}>
        <group position={[data.orbit, 0, 0]}>
          <group ref={tiltRef} rotation={[0, 0, data.axialTilt]}>
            <mesh
              ref={planetRef}
              onClick={(e) => {
                e.stopPropagation();
                onClick(data.id); 
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHover(data.id);
                if (typeof document !== "undefined") {
                  document.body.style.cursor = "pointer";
                }
              }}
              onPointerOut={() => {
                onHover(null);
                if (typeof document !== "undefined") {
                  document.body.style.cursor = "default";
                }
              }}
            >
              <sphereGeometry args={[data.radius, 64, 64]} />
              <meshStandardMaterial
                map={texture}
                roughness={0.85}
                metalness={0.05}
              />
            </mesh>

            {/* atmosfera */}
            {(data.id === "earth" || data.id === "venus") && (
              <mesh scale={1.04}>
                <sphereGeometry args={[data.radius, 32, 32]} />
                <meshBasicMaterial
                  color={data.id === "earth" ? "#4ea8ff" : "#f5d76e"}
                  transparent
                  opacity={0.12}
                  side={BackSide}
                  blending={AdditiveBlending}
                />
              </mesh>
            )}

            {/* anel */}
            {ringTexture && (
              <mesh rotation={[Math.PI / 2.2, 0, 0]}>
                <ringGeometry
                  args={[data.radius * 1.4, data.radius * 2.3, 96]}
                />
                <meshBasicMaterial
                  map={ringTexture}
                  side={DoubleSide}
                  transparent
                  opacity={0.9}
                />
              </mesh>
            )}

            {/* lua */}
            {data.id === "earth" && showMoon && (
              <Moon
                paused={paused}
                onClick={(id) => onClick(id)} 
                onHover={onHover}
              />
            )}
          </group>
        </group>
      </group>
    </>
  );
};