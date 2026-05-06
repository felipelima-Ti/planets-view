"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3, Group } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Props = {
  targetId: string | null;
  refs: React.MutableRefObject<Record<string, Group | null>>;
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
  getDistance: (id: string) => number;
};

export const CameraRig = ({ targetId, refs, controlsRef, getDistance }: Props) => {
  const { camera } = useThree();
  const desiredCam = useRef(new Vector3());
  const lookAt = useRef(new Vector3());
  const dir = useRef(new Vector3());

  useFrame(() => {
    if (!targetId || !controlsRef.current) return;
    const grp = refs.current[targetId];
    if (!grp) return;

    // pega posição do planeta (ou sol) para olhar
    if (targetId === "sun") {
      lookAt.current.set(0, 0, 0);
    } else {
      // a orbit é no grupo, então pega a posição do filho (planeta) para olhar
      const child = grp.children[0];
      if (child) child.getWorldPosition(lookAt.current);
      else grp.getWorldPosition(lookAt.current);
    }
    // calcula direção e posição desejada da câmera
    const distance = getDistance(targetId);

    dir.current.copy(camera.position).sub(controlsRef.current.target);
    if (dir.current.lengthSq() < 0.001) dir.current.set(0, 1, 1);
    dir.current.normalize().multiplyScalar(distance);
    desiredCam.current.copy(lookAt.current).add(dir.current);

    camera.position.lerp(desiredCam.current, 0.07);
    controlsRef.current.target.lerp(lookAt.current, 0.1);
    controlsRef.current.update();
  });

  return null;
};
