"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import SakuraField from "./SakuraField";
import Scene3D from "./Scene3D";

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Scene3D>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 45 }}
          gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={0.5} color="#d8bd7a" />
          <SakuraField />
          <Sparkles
            count={70}
            scale={[22, 14, 10]}
            size={2}
            speed={0.15}
            opacity={0.35}
            color="#d8bd7a"
          />
        </Canvas>
      </Scene3D>
    </div>
  );
}
