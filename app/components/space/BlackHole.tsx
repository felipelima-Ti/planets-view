"use client"
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BlackHoleProps {
  position?: [number, number, number];
  scale?: number;
  onClick?: (e: any) => void;
  onPointerOver?: (e: any) => void;
  onPointerOut?: (e: any) => void;
  groupRef?: (g: THREE.Group | null) => void;
}

/**
 * Realistic-ish black hole:
 *  - Event horizon (pitch black sphere)
 *  - Photon ring (thin glowing torus)
 *  - Accretion disk (hot ionized gas, radial gradient + noise via shader)
 *  - Gravitational lensing halo (additive sprite)
 */
export function BlackHole({
  position = [0, 0, 0],
  scale = 1,
  onClick,
  onPointerOver,
  onPointerOut,
  groupRef,
}: BlackHoleProps) {
  const diskRef = useRef<THREE.Mesh>(null);
  const photonRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  // Accretion disk shader — animated swirling hot plasma
  const diskMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uInner: { value: 0 },
        uOuter: { value: 3.2 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        varying vec3 vPos;
        uniform float uTime;
        uniform float uInner;
        uniform float uOuter;

        // hash / noise
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p){
          vec2 i = floor(p); vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
        }
        float fbm(vec2 p){
          float v = 0.0; float a = 0.5;
          for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
          return v;
        }

        void main(){
          // radial coords
          vec2 c = vPos.xz;
          float r = length(c);
          float ang = atan(c.y, c.x);

          // mask ring
          float inner = smoothstep(uInner, uInner + 0.15, r);
          float outer = 1.0 - smoothstep(uOuter - 0.8, uOuter, r);
          float mask = inner * outer;
          if(mask <= 0.001) discard;

          // swirl noise (rotation faster near center -> Keplerian-ish)
          float speed = 1.5 / max(r, 0.5);
          float a = ang + uTime * speed;
          vec2 np = vec2(cos(a), sin(a)) * r * 1.2;
          float n = fbm(np * 1.5 + vec2(uTime*0.2, 0.0));

          // temperature gradient: hot white -> orange -> deep red
          float t = smoothstep(uOuter, uInner, r);
          vec3 cold = vec3(0.6, 0.05, 0.0);
          vec3 warm = vec3(1.0, 0.45, 0.05);
          vec3 hot  = vec3(1.0, 0.95, 0.7);
          vec3 col = mix(cold, warm, t);
          col = mix(col, hot, pow(t, 3.0));

          // doppler-ish brightness asymmetry (one side brighter)
          float doppler = 0.6 + 0.6 * smoothstep(-1.0, 1.0, sin(ang));

          float intensity = mask * (0.5 + 0.9 * n) * doppler;
          gl_FragColor = vec4(col * intensity * 1.6, intensity);
        }
      `,
    });
  }, []);

  // Halo (gravitational lensing glow) — additive radial gradient
  const haloMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,2.0); }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        void main(){
          vec2 p = vUv - 0.5;
          float d = length(p) * 2.0;
          float ring = smoothstep(0.55, 0.50, d) * smoothstep(0.30, 0.45, d);
          float glow = pow(1.0 - clamp(d, 0.0, 1.0), 3.0) * 0.35;
          float a = ring * 0.9 + glow;
          vec3 col = mix(vec3(1.0, 0.7, 0.3), vec3(1.0, 1.0, 0.9), ring);
          gl_FragColor = vec4(col * a, a);
        }
      `,
    });
  }, []);

  useFrame((_, dt) => {
    diskMaterial.uniforms.uTime.value += dt;
    haloMaterial.uniforms.uTime.value += dt;
    if (diskRef.current) diskRef.current.rotation.z += dt * 8.05;
    if (photonRef.current) photonRef.current.rotation.z += dt * 100.1;
    // halo always faces camera (handled by sprite-like billboard below if needed)
  });

  return (
    <group
      ref={(g) => groupRef?.(g)}
      position={position}
      scale={scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Lensing halo billboard */}
      <mesh ref={haloRef}>
        <planeGeometry args={[9, 9]} />
        <primitive object={haloMaterial} attach="material" />
      </mesh>

      {/* Event horizon — pure black */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Photon ring — thin bright torus around the horizon */}
      <mesh ref={photonRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.18, 0.025, 32, 200]} />
        <meshBasicMaterial color="#ffd9a0" toneMapped={false} />
      </mesh>

      {/* Accretion disk — slightly tilted */}
      <mesh ref={diskRef} rotation={[Math.PI / 2 - 0.35, 0, 0]}>
        <ringGeometry args={[1.2, 3.2, 256, 1]} />
        <primitive object={diskMaterial} attach="material" />
      </mesh>

      {/* Soft point light from the disk */}
      <pointLight color="#ffb070" intensity={2.5} distance={20} decay={2} />
    </group>
  );
}

export default BlackHole;