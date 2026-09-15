import { CONTACT_EMAIL } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-xl tracking-[0.28em] text-fg uppercase">Mirachian</p>
          <p className="mt-3 text-sm text-muted">Private Passage. Rare Discoveries.</p>
          <p className="mt-1 text-sm text-muted">The Art of Undersea Exploration.</p>
          <p className="mt-5 font-mono text-[0.65rem] tracking-[0.14em] text-pearl/75 uppercase">
            24°33′N · 81°46′W · Key West
          </p>
        </div>
        <div className="flex flex-col gap-4 text-[0.7rem] tracking-[0.14em] text-muted uppercase">
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-pearl">
            {CONTACT_EMAIL}
          </a>
          <nav className="flex flex-wrap gap-6">
            <a href="#voyage" className="hover:text-pearl">
              Voyage
            </a>
            <a href="#passages" className="hover:text-pearl">
              Passages
            </a>
            <a href="#descend" className="hover:text-pearl">
              Depth
            </a>
            <a href="#ledger" className="hover:text-pearl">
              Ledger
            </a>
            <a href="#craft" className="hover:text-pearl">
              Craft
            </a>
            <a href="#reserve" className="hover:text-pearl">
              Reserve
            </a>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-line px-5 py-8 text-xs leading-relaxed text-muted md:px-8">
        <p>© Mirachian Undersea. Private expeditions from Key West. Limited capacity.</p>
        <p className="mt-2 max-w-3xl">
          Expeditions are hosted by Mirachian Expeditions, utilizing the certified
          vessels of Mirachian Group. An inquiry is not a booking until terms are
          accepted and a $250 deposit per couple is placed. That deposit is fully
          refundable until the reservation is confirmed.
        </p>
      </div>
    </footer>
  );
}
