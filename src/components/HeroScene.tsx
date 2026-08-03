"use client";

import { Canvas } from "@react-three/fiber";
import HeroCrest from "./HeroCrest";
import Scene3D from "./Scene3D";

function HeroCrestFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-[420px] h-[420px] rounded-full blur-2xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold) 0%, var(--color-gold-soft) 35%, transparent 70%)",
        }}
      />
    </div>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Scene3D fallback={<HeroCrestFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 40 }}
          gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 6]} intensity={1.1} color="#f3e2b3" />
          <pointLight position={[-4, -3, 3]} intensity={0.4} color="#3a5a7a" />
          <HeroCrest />
        </Canvas>
      </Scene3D>
    </div>
  );
}
