"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 60;

function petalShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.35, 0.15, 0.35, 0.55, 0, 0.9);
  shape.bezierCurveTo(-0.35, 0.55, -0.35, 0.15, 0, 0);
  return shape;
}

export default function SakuraField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.ShapeGeometry(petalShape(), 8), []);

  const data = useMemo(() => {
    return new Array(COUNT).fill(0).map(() => ({
      x: (Math.random() - 0.5) * 30,
      y: Math.random() * 24 - 6,
      z: (Math.random() - 0.5) * 14 - 4,
      speed: 0.35 + Math.random() * 0.5,
      driftSpeed: 0.3 + Math.random() * 0.6,
      driftAmp: 0.6 + Math.random() * 1.2,
      rotSpeed: (Math.random() - 0.5) * 0.6,
      scale: 0.12 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    data.forEach((p, i) => {
      p.y -= p.speed * delta;
      if (p.y < -8) {
        p.y = 16 + Math.random() * 4;
        p.x = (Math.random() - 0.5) * 30;
      }
      p.phase += delta * p.driftSpeed;
      const x = p.x + Math.sin(p.phase) * p.driftAmp;
      dummy.position.set(x, p.y, p.z);
      dummy.rotation.set(p.phase * 0.5, p.phase * p.rotSpeed, p.phase * 0.3);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, COUNT]}>
      <meshStandardMaterial
        color="#e8c9c2"
        emissive="#b8963f"
        emissiveIntensity={0.08}
        side={THREE.DoubleSide}
        transparent
        opacity={0.55}
        roughness={0.8}
      />
    </instancedMesh>
  );
}
