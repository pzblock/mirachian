import { createFileRoute } from "@tanstack/react-router";
import { Craft } from "@/components/site/Craft";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Descend } from "@/components/site/Descend";
import { Expedition } from "@/components/site/Expedition";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Itinerary } from "@/components/site/Itinerary";
import { Ledger } from "@/components/site/Ledger";
import { Passages } from "@/components/site/Passages";
import { PreloadPhotos } from "@/components/site/PreloadPhotos";
import { Proof } from "@/components/site/Proof";
import { Reserve } from "@/components/site/Reserve";
import { SiteNav } from "@/components/site/SiteNav";
import { Stills } from "@/components/site/Stills";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="bg-abyss">
      <PreloadPhotos />
      <div className="grain" aria-hidden />
      <CursorGlow />
      <SiteNav />
      <Hero />
      <Proof />
      <Expedition />
      <Descend />
      <Ledger />
      <Passages />
      <Craft />
      <Itinerary />
      <Stills />
      <Reserve />
      <Footer />
    </main>
  );
}