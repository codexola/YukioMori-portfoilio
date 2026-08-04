"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Scene3D from "./Scene3D";
import { skillGroups } from "@/lib/data";

const SkillsOrbit = dynamic(() => import("./SkillsOrbit"), { ssr: false });

function SkillsOrbitFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-56 h-56">
        <div className="absolute inset-0 rounded-full border border-[var(--color-gold)]/25" />
        {skillGroups.map((group, i) => {
          const angle = (i / skillGroups.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 42;
          const y = 50 + Math.sin(angle) * 42;
          return (
            <span
              key={group.key}
              className="absolute w-3 h-3 rounded-full bg-[var(--color-gold)] shadow-[0_0_12px_rgba(184,150,63,0.6)]"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            />
          );
        })}
        <div className="absolute inset-[30%] rounded-full border border-[var(--color-indigo-mist)]/50" />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="弐 / TWO" kanji="専門技術" en="Core Expertise" />

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative h-72 md:h-[420px] order-2 md:order-1">
            <Scene3D fallback={<SkillsOrbitFallback />}>
              <Canvas
                camera={{ position: [0, 1.4, 5.2], fov: 45 }}
                gl={{ alpha: true, failIfMajorPerformanceCaveat: false }}
              >
                <ambientLight intensity={0.7} />
                <directionalLight position={[3, 5, 4]} intensity={0.9} color="#f3e2b3" />
                <SkillsOrbit />
              </Canvas>
            </Scene3D>
          </div>

          <div className="space-y-7 order-1 md:order-2">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-serif-jp text-base md:text-lg text-[var(--color-gold-soft)]">
                    {group.label}
                  </h3>
                  <span className="text-[10px] tracking-widest text-[var(--color-washi-dark)]/60">
                    {group.years}
                  </span>
                </div>
                <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${group.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08 + 0.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-soft)]"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--color-gold)]/25 text-[var(--color-washi)]/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
