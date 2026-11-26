export function PawMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-2xl bg-mint-deep text-cream ${className}`} aria-hidden>
      <svg viewBox="0 0 64 64" className="h-2/3 w-2/3">
        <ellipse cx="32" cy="40" rx="14" ry="12" fill="currentColor" />
        <ellipse cx="14" cy="26" rx="7" ry="8" fill="currentColor" />
        <ellipse cx="25" cy="16" rx="7" ry="8" fill="currentColor" />
        <ellipse cx="39" cy="16" rx="7" ry="8" fill="currentColor" />
        <ellipse cx="50" cy="26" rx="7" ry="8" fill="currentColor" />
      </svg>
    </span>
  );
}
