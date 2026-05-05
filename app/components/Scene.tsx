"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Group } from "three";
import { PlanetInfoPanel } from "../components/space/PlanetInfoPanel";
import { PLANETS, MOON, type PlanetData } from "../data/planets";

// seus componentes
import { Sun } from "../components/space/Sun";
import { Planet } from "../components/space/Planet";
import { Starfield } from "../components/space/Stars";
import { CameraRig } from "../components/space/CameraRig";

export default function Scene() {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [moonUnlocked, setMoonUnlocked] = useState(false);

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const groupRefs = useRef<Record<string, Group | null>>({});

  const ALL_BODIES: Record<string, PlanetData> = {
    ...Object.fromEntries(PLANETS.map((p) => [p.id, p])),
    moon: MOON as PlanetData,
  };

  // registra refs dos planetas
  const registerRef = (id: string, g: Group | null) => {
    groupRefs.current[id] = g;
  };

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleClosePanel = () => {
    setSelected(null);
  };

  const selectedPlanet = selected ? ALL_BODIES[selected] : null;

  const distanceFor = (id: string) => {
    const p = PLANETS.find((x) => x.id === id);
    if (!p) return 10;
    return Math.max(p.radius * 4.5, 4);
  };

  const cameraInitial = useMemo<[number, number, number]>(() => [0, 35, 75], []);

  return (
    <div className="w-screen h-screen relative">
      {/* 🌌 CANVAS 3D */}
      <Canvas
        style={{ width: "100vw", height: "90vh" }}
        camera={{ position: cameraInitial, fov: 30 }}
      >
        <color attach="background" args={["#02030a"]} />
        <ambientLight intensity={0.1} />

        <Suspense
          fallback={
            <Html center>
              <div className="text-white">Carregando universo...</div>
            </Html>
          }
        >
          <Starfield />

          <group
            onClick={(e) => {
              e.stopPropagation();
              setSelected("sun");
            }}
          >
            <Sun />
          </group>

          {PLANETS.map((p) => (
            <Planet
              key={p.id}
              data={p}
              paused={paused}
              showMoon={moonUnlocked && p.id === "earth"}
              onHover={setHovered}
              onClick={(id) => handleSelect(id)}
              registerRef={registerRef}
            />
          ))}

          <CameraRig
            targetId={selected}
            refs={groupRefs}
            controlsRef={controlsRef}
            getDistance={distanceFor}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef as any}
          enablePan={false}
          minDistance={3}
          maxDistance={250}
          enableDamping
        />
      </Canvas>

      {/* 📌 PAINEL (AGORA CORRETO) */}
      {selectedPlanet && (
        <div className="">
          <PlanetInfoPanel
            planet={selectedPlanet}
            onClose={handleClosePanel}
          />
        </div>
      )}
    </div>
  );
}