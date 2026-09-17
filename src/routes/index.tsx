import { createFileRoute } from "@tanstack/react-router";
import { Craft } from "@/components/site/Craft";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Descend } from "@/components/site/Descend";
import { DescentPath } from "@/components/site/DescentPath";
import { Expedition } from "@/components/site/Expedition";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Itinerary } from "@/components/site/Itinerary";
import { Ledger } from "@/components/site/Ledger";
import { Passages } from "@/components/site/Passages";
import { FaviconPulse } from "@/components/site/FaviconPulse";
import { PreloadPhotos } from "@/components/site/PreloadPhotos";
import { Proof } from "@/components/site/Proof";
import { Reserve } from "@/components/site/Reserve";
import { SectionSeam } from "@/components/site/SectionSeam";
import { SiteNav } from "@/components/site/SiteNav";
import { Stills } from "@/components/site/Stills";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="bg-abyss">
      <FaviconPulse />
      <PreloadPhotos />
      <div className="grain" aria-hidden />
      <CursorGlow />
      <SiteNav />
      <DescentPath />
      <Hero />
      <SectionSeam step="01" meters={0} zone="SURFACE" next="proof" />
      <Proof />
      <SectionSeam step="02" meters={70} zone="REEF" next="voyage" />
      <Expedition />
      <Passages />
      <SectionSeam step="03" meters={200} zone="TWILIGHT" next="descend" />
      <Descend />
      <SectionSeam step="04" meters={600} zone="DROP" next="ledger" />
      <Ledger />
      <Craft />
      <SectionSeam step="05" meters={900} zone="DROP" next="day" />
      <Itinerary />
      <SectionSeam step="06" meters={1000} zone="FRONTIER" next="stills" />
      <Stills />
      <SectionSeam step="07" meters={1140} zone="FRONTIER" next="reserve" />
      <Reserve />
      <Footer />
    </main>
  );
}
