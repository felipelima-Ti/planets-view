"use client";
import { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";

export const Starfield = ({ count = 4000, radius = 300 }: { count?: number; radius?: number }) => {
  const geom = useMemo(() => {
    const g = new BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    for (let i = 0; i < count; i++) {
      const r = radius * (0.6 + Math.random() * 0.4);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
      const t = Math.random();
      // varia cor para dar mais vida (branco, azul claro, amarelo claro)
      if (t < 0.7) colors.push(1, 1, 1);
      else if (t < 0.85) colors.push(0.7, 0.85, 1);
      else colors.push(1, 0.85, 0.7);
    }
    g.setAttribute("position", new Float32BufferAttribute(positions, 3));
    g.setAttribute("color", new Float32BufferAttribute(colors, 3));
    return g;
  }, [count, radius]);

  return (
    <points geometry={geom}>
      <pointsMaterial size={0.5} sizeAttenuation vertexColors transparent opacity={0.9} />
    </points>
  );
};