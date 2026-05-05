"use client";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Group } from "three";
import { Sun } from "../components/space/Sun";
import { Planet } from "../components/space/Planet";
import { Starfield } from "../components/space/Stars";
import { CameraRig } from "../components/space/CameraRig";
import { PlanetInfoPanel } from "../components/space/PlanetInfoPanel";
import { PLANETS, MOON, type PlanetData } from "../data/planets";
import { Pause, Play, Sparkles, Rocket } from "lucide-react";
import { toast } from "sonner";


const ALL_BODIES: Record<string, PlanetData> = {
  ...Object.fromEntries(PLANETS.map((p) => [p.id, p])),
  moon: MOON as unknown as PlanetData,
};

const Index = () => {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [moonUnlocked, setMoonUnlocked] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const groupRefs = useRef<Record<string, Group | null>>({});

  const registerRef = (id: string, g: Group | null) => {
    groupRefs.current[id] = g;
  };

  const handleSelect = (id: string) => {
    setSelected(id);
    if (id === "moon") {
      toast.success("🌙 Você encontrou a Lua!", { description: "Easter egg desbloqueado." });
    }
  };

  const distanceFor = (id: string) => {
    if (id === "sun") return 25;
    const p = ALL_BODIES[id];
    if (!p) return 12;
    return Math.max(p.radius * 4.5, 3.5);
  };

  // Easter egg keyboard: type "MOON" or click Sun 5 times
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      setKonami((prev) => {
        const next = [...prev, k].slice(-4);
        if (next.join("") === "moon" && !moonUnlocked) {
          setMoonUnlocked(true);
          toast("🥚 Easter egg desbloqueado!", {
            description: "A Lua agora orbita a Terra. Clique nela!",
          });
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moonUnlocked]);

  const sunClicksRef = useRef(0);
  const onSunClick = () => {
    sunClicksRef.current += 1;
    if (sunClicksRef.current >= 5 && !moonUnlocked) {
      setMoonUnlocked(true);
      toast("🥚 Easter egg desbloqueado!", { description: "A Lua agora orbita a Terra." });
    }
  };

  const selectedPlanet = selected && selected !== "sun" ? ALL_BODIES[selected] : null;

  const cameraInitial = useMemo<[number, number, number]>(() => [0, 35, 75], []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <div className="flex items-center justify-between p-5">
          <div className="pointer-events-auto flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl panel flex items-center justify-center">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold tracking-wider glow-text">COSMOS 3D</h1>
              <p className="text-xs text-muted-foreground">Explore o Sistema Solar</p>
            </div>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={() => setPaused((p) => !p)}
              className="panel rounded-xl px-4 py-2 text-sm flex items-center gap-2 hover:border-primary/50 transition-colors"
            >
              {paused ? <Play className="h-4 w-4 text-primary" /> : <Pause className="h-4 w-4 text-primary" />}
              {paused ? "Retomar" : "Pausar"}
            </button>
            {moonUnlocked && (
              <div className="panel rounded-xl px-3 py-2 text-xs flex items-center gap-2 text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Lua desbloqueada
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Bottom planet selector */}
      <nav className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <div className="panel rounded-2xl px-3 py-2 flex items-center gap-1 max-w-[95vw] overflow-x-auto">
          <button
            onClick={() => {
              setSelected("sun");
              onSunClick();
            }}
            className="px-3 py-2 rounded-xl text-xs font-medium hover:bg-secondary transition-colors whitespace-nowrap"
            style={{ color: "hsl(40 90% 65%)" }}
          >
            ☀ Sol
          </button>
          {PLANETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                selected === p.id ? "bg-secondary" : "hover:bg-secondary/60"
              }`}
              style={{ color: `hsl(${p.color})` }}
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={() => {
              setSelected(null);
            }}
            className="px-3 py-2 rounded-xl text-xs font-medium hover:bg-secondary transition-colors whitespace-nowrap text-muted-foreground"
          >
            ↺ Visão geral
          </button>
        </div>
      </nav>

      {/* Hint */}
      {!selected && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-center text-xs text-muted-foreground pointer-events-none">
          Clique em um planeta para dar zoom · Arraste para girar · Scroll para aproximar
          <div className="mt-1 opacity-60">Dica: digite "MOON" no teclado 🌙</div>
        </div>
      )}

      {/* Hover label */}
      {hovered && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 panel rounded-full px-4 py-1.5 text-sm font-display tracking-widest pointer-events-none">
          {ALL_BODIES[hovered]?.name ?? "Sol"}
        </div>
      )}

      {/* Info panel */}
      <aside className="absolute top-24 right-5 z-20 pointer-events-none">
        {selectedPlanet && (
          <PlanetInfoPanel planet={selectedPlanet} onClose={() => setSelected(null)} />
        )}
      </aside>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: cameraInitial, fov: 50, near: 0.1, far: 2000 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#02030a"]} />
        <ambientLight intensity={0.08} />
        <Suspense
          fallback={
            <Html center>
              <div className="panel rounded-xl px-4 py-2 text-sm">Carregando o cosmos…</div>
            </Html>
          }
        >
          <Starfield />
          <group
            onClick={(e) => {
              // Sun click handling
              e.stopPropagation();
              setSelected("sun");
              onSunClick();
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
          dampingFactor={0.08}
        />
      </Canvas>
    </main>
  );
};

export default Index;
