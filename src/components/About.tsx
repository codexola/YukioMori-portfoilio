"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { profile, selfPR } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading index="壱 / ONE" kanji="経歴概要" en="Profile" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto leading-relaxed text-[var(--color-washi)]/90 text-base md:text-lg"
        >
          {profile.summary}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {selfPR.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative rounded-sm border border-[var(--color-gold)]/20 bg-gradient-to-b from-white/[0.03] to-transparent p-7 hover:border-[var(--color-gold)]/50 transition-colors duration-500"
            >
              <span className="absolute -top-4 left-6 font-serif-jp text-3xl gold-text opacity-70">
                {["一", "二", "三"][i]}
              </span>
              <h3 className="font-serif-jp text-lg md:text-xl mb-3 mt-2 text-[var(--color-gold-soft)]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-washi)]/80">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
