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
      <SectionSeam meters={0} zone="Surface" next="proof" />
      <Proof />
      <SectionSeam meters={70} zone="Reef" next="voyage" />
      <Expedition />
      <Passages />
      <SectionSeam meters={200} zone="Twilight" next="descend" />
      <Descend />
      <SectionSeam meters={600} zone="Drop" next="ledger" />
      <Ledger />
      <Craft />
      <SectionSeam meters={900} zone="Drop" next="day" />
      <Itinerary />
      <SectionSeam meters={1000} zone="Frontier" next="stills" />
      <Stills />
      <SectionSeam meters={1140} zone="Frontier" next="reserve" />
      <Reserve />
      <Footer />
    </main>
  );
}
