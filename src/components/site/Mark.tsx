export function Mark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`mark-svg ${className}`} aria-hidden>
      <circle
        className="mark-ring mark-outer"
        cx="16"
        cy="16"
        r="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        className="mark-ring mark-inner"
        cx="16"
        cy="16"
        r="6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <line
        className="mark-ring"
        x1="9.6"
        y1="16"
        x2="22.4"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="square"
      />
    </svg>
  );
}
