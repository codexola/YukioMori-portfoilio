"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { caseStudies, institutions } from "@/lib/data";

function CaseCard({ cs, index }: { cs: (typeof caseStudies)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const institution = institutions[cs.institutionKey];

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.25s ease-out",
      }}
      className="relative rounded-sm border border-[var(--color-gold)]/20 bg-gradient-to-b from-white/[0.035] to-transparent p-6 md:p-7 hover:border-[var(--color-gold)]/50"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] tracking-widest text-[var(--color-gold-soft)]/80">
          {cs.period}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-widest text-[var(--color-washi-dark)]/50">
            {cs.org}
          </span>
          {institution.logo && (
            <div className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-washi)]/95 border border-[var(--color-gold)]/25 p-1">
              <div className="relative w-full h-full">
                <Image
                  src={institution.logo}
                  alt={`${institution.name} logo`}
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <h3 className="font-serif-jp text-lg md:text-xl text-[var(--color-washi)] mb-1">
        {cs.title}
      </h3>
      <p className="text-xs text-[var(--color-gold-soft)]/70 mb-3">{cs.role}</p>
      <p className="text-sm leading-relaxed text-[var(--color-washi)]/75 mb-4">{cs.summary}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {cs.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--color-indigo-mist)]/50 text-[var(--color-washi)]/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <ul className="space-y-1.5 border-t border-[var(--color-gold)]/15 pt-3">
        {cs.results.map((r) => (
          <li key={r} className="text-xs text-[var(--color-gold-soft)] flex items-start gap-2">
            <span className="mt-[3px] w-1 h-1 rounded-full bg-[var(--color-gold)] shrink-0" />
            {r}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function CaseStudies() {
  return (
    <section id="works" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="四 / FOUR" kanji="主な実績" en="Selected Case Studies" />
        <p className="text-center text-xs text-[var(--color-washi-dark)]/50 -mt-8 mb-14 tracking-wide">
          各案件はNDAの都合上、社名・詳細情報を一部抽象化して掲載しています。
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <CaseCard key={cs.title} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
