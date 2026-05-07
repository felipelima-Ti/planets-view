"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Group } from "three";

import { PlanetInfoPanel } from "../components/space/PlanetInfoPanel";
import { PLANETS, MOON, type PlanetData } from "../data/planets";

import "../components/space/style.css";

// componentes
import { Sun } from "../components/space/Sun";
import { Planet } from "../components/space/Planet";
import { Starfield } from "../components/space/Stars";
import { CameraRig } from "../components/space/CameraRig";

import { toast } from "sonner";

export default function Scene() {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // refs
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const groupRefs = useRef<Record<string, Group | null>>({});

  // todos os corpos
  const ALL_BODIES: Record<string, PlanetData> = {
    ...Object.fromEntries(PLANETS.map((p) => [p.id, p])),
    moon: MOON as PlanetData,
  };

  // registrar refs
  const registerRef = (id: string, g: Group | null) => {
    groupRefs.current[id] = g;
  };

  // selecionar planeta/lua
  const handleSelect = (id: string) => {
    setSelected(id);

    if (id === "moon") {
      toast.success("🌙 Você encontrou a Lua!", {
        description:
          "A Lua é o único satélite natural da Terra e influencia as marés e a vida na Terra.",
      });
    }
  };

  // fechar painel
  const handleClosePanel = () => {
    setSelected(null);
  };

  // planeta selecionado
  const selectedPlanet = selected ? ALL_BODIES[selected] : null;

  // distância da câmera
  const distanceFor = (id: string) => {
    // zoom especial para lua
    if (id === "moon") return 4.5;
    const p = PLANETS.find((x) => x.id === id);
    if (!p) return 10;
    return Math.max(p.radius * 4.5, 4);
  };

  // posição inicial câmera
  const cameraInitial = useMemo<[number, number, number]>(
    () => [0, 35, 75],
    []
  );

  return (
    <div className="canvas">
      <Canvas camera={{ position: cameraInitial, fov: 30 }}>
        {/* fundo */}
        <color attach="background" args={["#02030a"]} />

        {/* luz */}
        <ambientLight intensity={0.1} />

        <Suspense
          fallback={
            <Html center>
              <div className="text-white">
                Carregando universo...
              </div>
            </Html>
          }
        >
          {/* estrelas */}
          <Starfield />

          {/* SOL */}
          <group
            ref={(g) => registerRef("sun", g)}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect("sun");
            }}
          >
            <Sun />
          </group>

          {/* PLANETAS */}
          {PLANETS.map((planet) => (
            <Planet
              key={planet.id}
              data={planet}
              paused={paused}
              showMoon={planet.id === "earth"}
              onHover={setHovered}
              onClick={handleSelect}
              registerRef={registerRef}
            />
          ))}

          {/* CAMERA */}
          <CameraRig
            targetId={selected}
            refs={groupRefs}
            controlsRef={controlsRef}
            getDistance={distanceFor}
          />
        </Suspense>

        {/* CONTROLES */}
        <OrbitControls
          ref={controlsRef as any}
          enablePan={false}
          enableDamping
          minDistance={2}
          maxDistance={250}
        />
      </Canvas>

      {/* painel informações */}
      {selectedPlanet && (
        <PlanetInfoPanel
          planet={selectedPlanet}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
}