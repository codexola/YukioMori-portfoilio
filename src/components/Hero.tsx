"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6"
    >
      <div className="absolute inset-0 -z-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-indigo-deep)]/10 via-transparent to-[var(--color-indigo-deep)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[var(--color-gold)]/60 shadow-[0_0_40px_rgba(184,150,63,0.25)] mb-8"
        >
          <Image
            src="/profile.png"
            alt={profile.name}
            fill
            sizes="(max-width: 768px) 112px, 144px"
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs md:text-sm tracking-[0.5em] text-[var(--color-gold-soft)] section-label mb-4"
        >
          PORTFOLIO
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif-jp text-5xl md:text-7xl font-semibold gold-text tracking-wider leading-tight"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-3 text-sm md:text-base tracking-[0.35em] text-[var(--color-washi)]/70 uppercase"
        >
          {profile.nameRomaji}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-8 font-serif-jp text-lg md:text-2xl text-[var(--color-washi)]"
        >
          {profile.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-2 text-xs md:text-sm tracking-[0.2em] text-[var(--color-washi-dark)]/60"
        >
          {profile.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10 font-serif-jp text-base md:text-lg italic text-[var(--color-gold-soft)]/90"
        >
          「{profile.motto}」
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-washi)]/50"
      >
        <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[var(--color-gold-soft)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
