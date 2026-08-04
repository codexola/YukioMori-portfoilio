"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { webWorks } from "@/lib/data";

export default function WebWorks() {
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading index="伍 / FIVE" kanji="Web開発 実績" en="Selected Web Projects" />
        <p className="text-center text-xs text-[var(--color-washi-dark)]/50 -mt-8 mb-14 tracking-wide max-w-2xl mx-auto leading-relaxed">
          海外開発チームの一員として、フロントエンド／バックエンド開発・技術支援に携わった案件の抜粋です（フルスタックエンジニアとしてのキャリア初期〜中期）。
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {webWorks.map((w, i) => (
            <motion.a
              key={w.url}
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className="group relative flex items-center gap-3 rounded-sm border border-[var(--color-gold)]/15 bg-white/[0.02] px-5 py-4 hover:border-[var(--color-gold)]/50 hover:bg-white/[0.04] transition-all"
            >
              {w.logo ? (
                <div className="shrink-0 w-9 h-9 rounded-full bg-[var(--color-washi)]/95 border border-[var(--color-gold)]/20 p-1.5">
                  <div className="relative w-full h-full">
                    <Image
                      src={w.logo}
                      alt={`${w.label} logo`}
                      fill
                      sizes="36px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="shrink-0 w-9 h-9 rounded-full border border-[var(--color-gold)]/20 flex items-center justify-center font-serif-jp text-sm text-[var(--color-gold-soft)]/70">
                  {w.label.charAt(0)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="text-sm text-[var(--color-washi)] truncate group-hover:text-[var(--color-gold-soft)] transition-colors">
                  {w.label}
                </p>
                <p className="text-[10px] tracking-widest text-[var(--color-washi-dark)]/50 mt-1">
                  {w.stack}
                </p>
              </div>
              <span className="text-[var(--color-gold-soft)]/60 group-hover:text-[var(--color-gold)] transition-colors shrink-0">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
