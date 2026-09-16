import { Mirachian } from "./Mirachian";
import { Reveal } from "./Reveal";
import { Sounding } from "./Sounding";

function Stat({ display, label }: { display: string; label: string }) {
  return (
    <div className="hover-edge border-t border-line pt-7">
      <p className="proof-stat font-display text-4xl text-fg tabular-nums md:text-5xl">
        {display}
      </p>
      <p className="mt-3 max-w-[16ch] text-sm leading-relaxed text-muted">{label}</p>
    </div>
  );
}

export function Proof() {
  return (
    <section id="proof">
      <div className="mx-auto max-w-6xl px-5 section-y-foot md:px-8">
        <Reveal>
          <Sounding
            heading
            mark="1,000"
            unit="m"
            title="More people have traveled to space than have physically descended to 1,000 meters."
          >
            Submersible travel is quieter — and many orders of magnitude safer —
            than the myth suggests. The rarity is access, not danger. That is why
            a <Mirachian /> expedition is reserved for four guests, never more, and
            for those who recognize that true adventure is most uncommon.
          </Sounding>
        </Reveal>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Stat display="4" label="Guests in the sphere. Never more." />
          <Stat display="1,140 m" label="Rated operating depth of the craft." />
          <Stat
            display="1,000+"
            label="Ships lost across these waters in five centuries."
          />
          <Stat
            display="~150 km"
            label="The Straits of Florida — Key West toward Cuba."
          />
        </div>
      </div>
    </section>
  );
}
