/**
 * Depth-tick section wayfinding — Ivy DEFAULT.
 * Champagne tick + faded hairline + muted meter whisper + soft dissolve.
 * No scroll arrows / chevrons / pills. Matches nav depth voice (DepthRail).
 */
export function SectionSeam({
  meters,
  zone,
}: {
  meters: number;
  zone: string;
}) {
  return (
    <div className="section-seam" aria-hidden>
      <div className="section-seam-rule">
        <span className="section-seam-hair" />
        <span className="section-seam-tick" />
        <span className="section-seam-hair" />
      </div>
      <p className="section-seam-meter">
        <span className="section-seam-depth font-mono tabular-nums">
          {meters}M
        </span>
        <span className="section-seam-sep"> / </span>
        <span className="section-seam-zone">{zone}</span>
      </p>
      <div className="section-seam-dissolve" />
    </div>
  );
}
