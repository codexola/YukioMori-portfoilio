export default function InkDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`ink-divider ${className}`}
      viewBox="0 0 800 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="inkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-gold-soft)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-gold)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-gold-soft)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M10 20 C 150 8, 250 32, 400 20 S 650 8, 790 20"
        fill="none"
        stroke="url(#inkGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="400" cy="20" r="3" fill="var(--color-gold)" />
    </svg>
  );
}
