"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading index="陸 / SIX" kanji="連絡先" en="Contact" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 w-16 h-16 rounded-sm border-2 border-[var(--color-vermillion)]/70 flex items-center justify-center rotate-3"
          style={{ boxShadow: "0 0 24px rgba(161,61,47,0.2)" }}
        >
          <span className="font-serif-jp text-2xl text-[var(--color-vermillion)]">森</span>
        </motion.div>

        <p className="leading-relaxed text-[var(--color-washi)]/85 mb-10 max-w-xl mx-auto">
          フルスタック開発、生成AI・RAGシステム構築、テクニカルリードとしてのご相談を承っております。
          <br />
          フルリモート対応可能。お気軽にご連絡ください。
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-3 font-serif-jp text-lg md:text-xl gold-text tracking-wide border-b border-[var(--color-gold)]/40 pb-1 hover:border-[var(--color-gold)] transition-colors"
        >
          {profile.email}
        </a>

        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs tracking-widest text-[var(--color-washi-dark)]/60">
          <span>{profile.location}</span>
          <span>フリーランス（{profile.freelanceSince}〜）</span>
          <span>フルリモート対応可</span>
        </div>
      </div>

      <footer className="mt-28 text-center text-[10px] tracking-[0.3em] text-[var(--color-washi-dark)]/35">
        © {new Date().getFullYear()} {profile.nameRomaji}. All rights reserved.
      </footer>
    </section>
  );
}
