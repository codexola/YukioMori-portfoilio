"use client";

import { motion } from "framer-motion";
import InkDivider from "./InkDivider";

export default function SectionHeading({
  index,
  kanji,
  en,
  align = "center",
}: {
  index: string;
  kanji: string;
  en: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 ${align === "center" ? "text-center items-center" : "text-left items-start"} flex flex-col`}
    >
      <span className="flex items-center gap-2 text-xs tracking-[0.5em] text-[var(--color-gold-soft)] section-label mb-3">
        <span className="w-1 h-1 rounded-full bg-[var(--color-sakura)]" aria-hidden="true" />
        {index}
      </span>
      <h2 className="font-serif-jp text-4xl md:text-6xl font-medium gold-text tracking-wide">
        {kanji}
      </h2>
      <p className="mt-3 text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--color-washi-dark)]/70">
        {en}
      </p>
      <div className="w-40 mt-6">
        <InkDivider />
      </div>
    </motion.div>
  );
}
