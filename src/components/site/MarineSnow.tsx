export function MarineSnow() {
  const flakes = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="pointer-events-none fixed inset-0 z-[6] overflow-hidden max-md:hidden" aria-hidden>
      {flakes.map((i) => {
        const left = ((i * 41) % 100) + (i % 5) * 0.3;
        const delay = (i * 0.7) % 16;
        const duration = 22 + (i % 8);
        const size = i % 7 === 0 ? 2 : 1;
        const opacity = 0.06 + (i % 4) * 0.03;
        return (
          <span
            key={i}
            className="marine-flake absolute rounded-full bg-pearl"
            style={{
              left: `${left}%`,
              top: "-8%",
              width: size,
              height: size,
              opacity,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
