import type { Metadata } from "next";
import { ArtisanCard } from "@/components/artisan-card";
import { Reveal } from "@/components/reveal";
import { StampBorder } from "@/components/stamp-border";
import { getArtisans } from "@/db/queries";
import { CraftImage } from "@/components/craft-image";

export const metadata: Metadata = {
  title: "Artisans of Sanganer — Made by Hand. Carried Forward.",
  description:
    "Meet the Chippa block carvers, natural dyers, and master printers of Sanganer and Jahota who carry forward five centuries of Rajasthani block printing.",
};

export default async function ArtisansPage() {
  const artisans = await getArtisans();

  return (
    <div className="grain pt-24 pb-20 sm:pt-28">
      {/* Header */}
      <header className="mx-auto max-w-4xl px-5 py-12 text-center sm:py-16">
        <span className="text-teak text-xs font-medium tracking-[0.25em] uppercase">
          The Living Heritage of Rajasthan
        </span>
        <h1 className="text-ink mt-3 font-serif text-4xl leading-tight font-semibold sm:text-6xl">
          MADE BY HAND. <br />
          <span className="font-normal italic">CARRIED FORWARD.</span>
        </h1>
        <p className="text-ink-soft mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
          The craft is nothing without the hands that sustain it. We work with hereditary
          families of the Chippa community in Sanganer and Jahota — where block carving, natural
          dyeing, and registration are learned through generational observation and lifelong
          discipline.
        </p>
        <StampBorder className="mx-auto mt-10 max-w-md" />
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
      <section className="border-teak/15 mx-auto max-w-6xl border-t px-5 py-12">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-teak font-mono text-xs tracking-widest uppercase">
              Documentary Moments
            </span>
            <h2 className="text-ink mt-2 font-serif text-3xl font-semibold">
              Inside the Sanganer Workshop
            </h2>
            <p className="text-ink-soft mt-2 text-xs">
              From chisel to cotton: raw teak shavings, earthenware indigo vats, sixty-foot
              printing tables, and Rajasthan sun.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Reveal delay={0.05}>
            <div className="bg-bone-deep cloth-shadow overflow-hidden rounded-2xl">
              <CraftImage
                src="/images/block-carve.jpg"
                alt="Chiseling teak printing blocks in Jahota workshop"
                sizes="(max-width: 640px) 92vw, 30vw"
                wrapperClassName="aspect-[4/3] w-full"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="bg-cotton p-4">
                <p className="text-ink font-serif text-sm font-semibold">
                  01. Carving the Wood
                </p>
                <p className="text-ink-soft mt-1 text-[11px]">
                  Hand-chiseling seasoned teak and sheesham relief blocks.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-bone-deep cloth-shadow overflow-hidden rounded-2xl">
              <CraftImage
                src="/images/craft-press.jpg"
                alt="Artisan printing by hand on cotton fabric"
                sizes="(max-width: 640px) 92vw, 30vw"
                wrapperClassName="aspect-[4/3] w-full"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="bg-cotton p-4">
                <p className="text-ink font-serif text-sm font-semibold">
                  02. The Cadence of Chhapaai
                </p>
                <p className="text-ink-soft mt-1 text-[11px]">
                  Stamping block by block with unhurried rhythmic pressure.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-bone-deep cloth-shadow overflow-hidden rounded-2xl">
              <CraftImage
                src="/images/sun-dry.jpg"
                alt="Sun drying hand printed textiles in Jaipur courtyard"
                sizes="(max-width: 640px) 92vw, 30vw"
                wrapperClassName="aspect-[4/3] w-full"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="bg-cotton p-4">
                <p className="text-ink font-serif text-sm font-semibold">
                  03. Open-Air Sun Drying
                </p>
                <p className="text-ink-soft mt-1 text-[11px]">
                  Sunlight deepens the botanical pigments on bamboo poles.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fair Partnership Commitment */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal>
          <div className="bg-indigo-deep text-bone cloth-shadow-lg rounded-2xl p-8 sm:p-12">
            <span className="text-bone/60 font-mono text-xs tracking-widest uppercase">
              Direct Workshop Partnership
            </span>
            <h2 className="text-bone mt-2 font-serif text-3xl font-semibold">
              Our Sourcing Commitment
            </h2>
            <div className="text-bone/85 mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                We do not purchase from anonymous middlemen or industrial trading houses.
                GULABARI works directly with Chippa artisan workshops in Sanganer and carver
                guilds in Jahota.
              </p>
              <p>
                Prices are negotiated with the master printers to ensure dignified compensation,
                honoring the days required to carve a single block and the physical endurance of
                printing by hand. We state only what can be verified, upholding transparent
                craft documentation.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
