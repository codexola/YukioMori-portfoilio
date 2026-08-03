"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function crestPetal() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.55, 0.15, 0.6, 1.05, 0, 1.7);
  shape.bezierCurveTo(-0.6, 1.05, -0.55, 0.15, 0, 0);
  return shape;
}

export default function HeroCrest() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const geometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(crestPetal(), {
        depth: 0.08,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.03,
        bevelSegments: 3,
        curveSegments: 16,
      }),
    []
  );

  const petals = useMemo(() => new Array(5).fill(0), []);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
    groupRef.current.rotation.z = t * 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.current.y * 0.15,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.current.x * 0.2,
      0.05
    );
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.15;
  });

  const scale = Math.min(1.4, Math.max(0.9, viewport.width / 10));

  return (
    <group ref={groupRef} scale={scale}>
      {petals.map((_, i) => (
        <mesh
          key={i}
          geometry={geometry}
          rotation={[0, 0, (i / petals.length) * Math.PI * 2]}
        >
          <meshStandardMaterial
            color="#c79a3f"
            metalness={0.85}
            roughness={0.28}
            emissive="#5c4416"
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
      <mesh>
        <circleGeometry args={[0.32, 32]} />
        <meshStandardMaterial
          color="#1b3a5c"
          metalness={0.4}
          roughness={0.4}
          emissive="#0f2540"
        />
      </mesh>
    </group>
  );
}
