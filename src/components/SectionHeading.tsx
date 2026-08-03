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
      className={`mb-14 ${align === "center" ? "text-center items-center" : "text-left items-start"} flex flex-col`}
    >
      <span className="text-xs tracking-[0.5em] text-[var(--color-gold-soft)] section-label mb-3">
        {index}
      </span>
      <h2 className="font-serif-jp text-3xl md:text-5xl font-medium gold-text tracking-wide">
        {kanji}
      </h2>
      <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--color-washi-dark)]/70">
        {en}
      </p>
      <div className="w-40 mt-5">
        <InkDivider />
      </div>
    </motion.div>
  );
}
