"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "経歴" },
  { href: "#skills", label: "専門技術" },
  { href: "#career", label: "沿革" },
  { href: "#works", label: "実績" },
  { href: "#contact", label: "連絡先" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-indigo-deep)]/80 backdrop-blur-md border-b border-[var(--color-gold)]/15"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="font-serif-jp text-lg md:text-xl tracking-[0.2em] gold-text">
          森 幸夫
        </a>
        <ul className="hidden md:flex items-center gap-8 text-xs tracking-[0.25em] text-[var(--color-washi)]/80">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-[var(--color-gold-soft)] transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
