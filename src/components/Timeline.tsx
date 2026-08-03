"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { career, institutions } from "@/lib/data";

export default function Timeline() {
  return (
    <section id="career" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading index="参 / THREE" kanji="沿革" en="Education & Career" />

        <div className="relative pl-8 md:pl-10">
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-gold)]/70 via-[var(--color-gold)]/25 to-transparent" />

          {career.map((entry, i) => {
            const institution = institutions[entry.institutionKey];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 5) * 0.06 }}
                className="relative mb-10 last:mb-0"
              >
                <span
                  className={`absolute -left-8 md:-left-10 top-1.5 w-[13px] h-[13px] rounded-full border-2 ${
                    entry.type === "education"
                      ? "bg-[var(--color-indigo-mist)] border-[var(--color-gold-soft)]"
                      : "bg-[var(--color-gold)] border-[var(--color-gold-soft)]"
                  }`}
                />

                <div className="flex items-start gap-4">
                  {institution.logo && (
                    <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[var(--color-washi)]/95 border border-[var(--color-gold)]/30 p-1.5 overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={institution.logo}
                          alt={`${institution.name} logo`}
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                      <span className="text-xs tracking-widest text-[var(--color-gold-soft)] shrink-0">
                        {entry.period}
                      </span>
                      <h3 className="font-serif-jp text-base md:text-lg text-[var(--color-washi)]">
                        {entry.org}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--color-washi)]/70 mt-1">{entry.role}</p>
                    {entry.description && (
                      <p className="text-sm text-[var(--color-washi-dark)]/60 mt-2 leading-relaxed max-w-xl">
                        {entry.description}
                      </p>
                    )}

                    {(institution.business || institution.capital || institution.employees) && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[var(--color-washi-dark)]/55">
                        {institution.business && <span>{institution.business}</span>}
                        {institution.capital && <span>資本金 {institution.capital}</span>}
                        {institution.employees && <span>従業員数 {institution.employees}</span>}
                      </div>
                    )}

                    {institution.url && (
                      <a
                        href={institution.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-[11px] tracking-wide text-[var(--color-gold-soft)]/80 border border-[var(--color-gold)]/30 rounded-full px-3 py-1 hover:border-[var(--color-gold)]/70 hover:text-[var(--color-gold)] transition-colors"
                      >
                        <span className="font-serif-jp">{entry.type === "education" ? "校" : "社"}</span>
                        {institution.nameEn ?? institution.name} ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
