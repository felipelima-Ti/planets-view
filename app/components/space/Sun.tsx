"use client";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, AdditiveBlending, BackSide } from "three";
import { SUN } from "../../data/planets";
// componente para o sol, com camadas de glow para dar um efeito mais bonito
export const Sun = () => {
  const ref = useRef<Mesh>(null);
  const tex = useLoader(TextureLoader, SUN.textureUrl);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.05;
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[SUN.radius, 64, 64]} />
        <meshBasicMaterial map={tex} />
      </mesh>
      {/* Corona glow layers */}
      <mesh scale={1.15}>
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <meshBasicMaterial color="#ffb347" transparent opacity={0.18} side={BackSide} blending={AdditiveBlending} />
      </mesh>
      <mesh scale={1.4}>
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <meshBasicMaterial color="#ff7b00" transparent opacity={0.08} side={BackSide} blending={AdditiveBlending} />
      </mesh>
      <pointLight intensity={3} distance={400} decay={0.4} color="#fff1d6" />
    </group>
  );
};
