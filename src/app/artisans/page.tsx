import type { Metadata } from "next";
import { ArtisanCard } from "@/components/artisan-card";
import { Reveal } from "@/components/reveal";
import { StampBorder } from "@/components/stamp-border";
import { getArtisans } from "@/db/queries";

export const metadata: Metadata = {
  title: "Artisans of Sanganer — Made by Hand. Carried Forward.",
  description:
    "Meet the Chippa block carvers, natural dyers, and master printers of Sanganer and Jahota who carry forward five centuries of Rajasthani block printing.",
};

export default async function ArtisansPage() {
  const artisans = await getArtisans();

  return (
    <div className="grain pt-24 sm:pt-28 pb-20">
      {/* Header */}
      <header className="mx-auto max-w-4xl px-5 py-12 sm:py-16 text-center">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-teak">
          The Living Heritage of Rajasthan
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-semibold text-ink leading-tight">
          MADE BY HAND. <br />
          <span className="italic font-normal">CARRIED FORWARD.</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink-soft max-w-2xl mx-auto">
          The craft is nothing without the hands that sustain it. We work with hereditary families
          of the Chippa community in Sanganer and Jahota — where block carving, natural dyeing, and
          registration are learned through generational observation and lifelong discipline.
        </p>
        <StampBorder className="mt-10 max-w-md mx-auto" />
      </header>

      {/* Artisan Cards List */}
      <section className="mx-auto max-w-5xl space-y-8 px-5 pb-16">
        {artisans.map((artisan, i) => (
          <Reveal key={artisan.id} delay={i * 0.08}>
            <ArtisanCard artisan={artisan} />
          </Reveal>
        ))}
      </section>

      {/* Workshop Visual Photo Essay */}
      <section className="mx-auto max-w-6xl px-5 py-12 border-t border-teak/15">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-teak font-mono">
              Documentary Moments
            </span>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">
              Inside the Sanganer Workshop
            </h2>
            <p className="mt-2 text-xs text-ink-soft">
              From chisel to cotton: raw teak shavings, earthenware indigo vats, sixty-foot printing tables, and Rajasthan sun.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-2xl bg-bone-deep cloth-shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/block-carve.jpg"
                alt="Chiseling teak printing blocks in Jahota workshop"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-4 bg-cotton">
                <p className="font-serif text-sm font-semibold text-ink">01. Carving the Wood</p>
                <p className="text-[11px] text-ink-soft mt-1">Hand-chiseling seasoned teak and sheesham relief blocks.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl bg-bone-deep cloth-shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/craft-press.jpg"
                alt="Artisan printing by hand on cotton fabric"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-4 bg-cotton">
                <p className="font-serif text-sm font-semibold text-ink">02. The Cadence of Chhapaai</p>
                <p className="text-[11px] text-ink-soft mt-1">Stamping block by block with unhurried rhythmic pressure.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl bg-bone-deep cloth-shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/sun-dry.jpg"
                alt="Sun drying hand printed textiles in Jaipur courtyard"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-4 bg-cotton">
                <p className="font-serif text-sm font-semibold text-ink">03. Open-Air Sun Drying</p>
                <p className="text-[11px] text-ink-soft mt-1">Sunlight deepens the botanical pigments on bamboo poles.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fair Partnership Commitment */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal>
          <div className="rounded-2xl bg-indigo-deep p-8 sm:p-12 text-bone cloth-shadow-lg">
            <span className="text-xs uppercase tracking-widest text-bone/60 font-mono">
              Direct Workshop Partnership
            </span>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-bone">
              Our Sourcing Commitment
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-bone/85">
              <p>
                We do not purchase from anonymous middlemen or industrial trading houses. GULABARI works
                directly with Chippa artisan workshops in Sanganer and carver guilds in Jahota.
              </p>
              <p>
                Prices are negotiated with the master printers to ensure dignified compensation,
                honoring the days required to carve a single block and the physical endurance of printing
                by hand. We state only what can be verified, upholding transparent craft documentation.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
