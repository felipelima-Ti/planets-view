"use client";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Group, Mesh } from "three";
import { MOON } from "../../data/planets";

type Props = {
  paused: boolean;
  onClick: (id: string, pos: [number, number, number]) => void;
  onHover: (id: string | null) => void;
};

export const Moon = ({ paused, onClick, onHover }: Props) => {
  const orbitRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, MOON.textureUrl);

  useFrame((_, delta) => {
    if (paused) return;
    if (orbitRef.current) orbitRef.current.rotation.y += delta * MOON.speed;
    if (meshRef.current) meshRef.current.rotation.y += MOON.rotationSpeed;
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[MOON.orbit, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          const wp = e.object.getWorldPosition(e.object.position.clone());
          onClick("moon", [wp.x, wp.y, wp.z]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover("moon");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[MOON.radius, 32, 32]} />
        <meshStandardMaterial map={texture} roughness={1} />
      </mesh>
    </group>
  );
};
