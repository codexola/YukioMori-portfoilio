"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { skillGroups } from "@/lib/data";

function OrbitNode({
  angle,
  radius,
  label,
  color,
}: {
  angle: number;
  radius: number;
  label: string;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * 0.15 + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.3) * 0.4;
  });

  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        <Text
          position={[0, 0.32, 0]}
          fontSize={0.16}
          color="#f6f1e7"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.008}
          outlineColor="#0f2540"
        >
          {label}
        </Text>
      </Float>
    </group>
  );
}

const ORBIT_COLORS = ["#b8963f", "#3a5a7a", "#a13d2f", "#d8bd7a", "#1b3a5c"];

export default function SkillsOrbit() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(
    () =>
      skillGroups.map((s, i) => ({
        angle: (i / skillGroups.length) * Math.PI * 2,
        radius: 2.1,
        label: s.labelEn,
        color: ORBIT_COLORS[i % ORBIT_COLORS.length],
      })),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#1b3a5c"
          metalness={0.7}
          roughness={0.25}
          emissive="#0f2540"
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>
      {nodes.map((n, i) => (
        <OrbitNode key={i} {...n} />
      ))}
    </group>
  );
}
