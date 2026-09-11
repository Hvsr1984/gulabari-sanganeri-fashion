import type { Metadata } from "next";
import Link from "next/link";
import {
  ProcessScroll,
  MotifGallery,
  CraftTimeline,
} from "@/components/craft-sections";
import { StampBorder } from "@/components/stamp-border";
import { Reveal } from "@/components/reveal";
import { NATURAL_DYES } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Craft — Sanganeri Hand Block Printing",
  description:
    "The 500-year story of Sanganeri hand block printing: its origins in Sanganer near Jaipur, the Chippa community, the buta, buti, bel and jaal motifs, the eight-step process from scouring to dhulaai, its 2010 GI tag, and its natural dyes.",
};

export default function CraftPage() {
  return (
    <article className="grain pt-20">
      {/* Hero */}
      <header className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/craft-press.jpg"
            alt="An artisan hand block printing cotton on a long table in Sanganer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/65 backdrop-blur-[1px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center text-bone">
          <p className="text-xs uppercase tracking-[0.25em] text-bone/80 font-mono">
            Sanganer · Rajasthan · 500-Year Heritage
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-6xl text-bone">
            The Craft of Sanganeri Print
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-bone/90 leading-relaxed">
            A hand-block textile tradition from Sanganer, on the banks of the Sahibi
            river — where soft water once made washing and rinsing cloth possible,
            and where Chippa families still print by hand today.
          </p>
        </div>
      </header>

      {/* Origin */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <Reveal>
          <h2 className="font-serif text-3xl">Origins on the Sahibi</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
            <p>
              Sanganeri print is a hand-block textile craft from Sanganer, a town
              roughly 6–15 km south of Jaipur. It traces to the late 16th–early 17th
              century, when Chippa community artisans migrated from Gujarat — accounts
              vary, but many point to the conflict of the Mughal–Maratha era — and
              settled in Sanganer, Bagru and Jahota. The name{" "}
              <em>Chippa</em> comes from <em>chappa</em>, meaning &ldquo;to
              print.&rdquo;
            </p>
            <p>
              The town itself was established by Rana Sanga, a Mewar Rajput ruler, who
              built it into a major art-printing centre. Patronised by royal courts,
              by the 18th century Sanganer&rsquo;s printers were exporting cloth to
              the Mughal court and to European trading companies; later the East India
              Company became a major exporter. In 2010 the craft was granted a
              Geographical Indication (GI) tag protecting authentic Sanganeri
              printing.
            </p>
          </div>
        </Reveal>
        <StampBorder className="mt-12" />
      </section>

      {/* What makes it distinct */}
      <section className="bg-bone-deep/40">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <Reveal>
            <h2 className="font-serif text-3xl">What makes it distinct</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
              <p>
                Sanganeri is known for fine, delicate floral motifs on a white or
                off-white, sun-bleached ground — lighter and more graceful than the
                bold, dark-ground geometry of Bagru or the indigo-and-red resist of
                Ajrakh. Motif curvature typically leans to the right, and the lines
                are prized above all for their fineness.
              </p>
              <p>
                Courtly pieces carry the influence of Mughal miniature painting and
                Indo-Persian botanical art — tulips, irises, poppies, narcissus,
                florals not native to Rajasthan — while everyday village cloth leans
                on more indigenous flora and fauna. Chippa printers historically
                worked with several hundred distinct buti and buta motifs.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Motif vocabulary */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="font-serif text-3xl">The motif vocabulary</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Four families structure almost every Sanganeri cloth. Each carries a name,
            a lineage and a maker.
          </p>
        </Reveal>
        <div className="mt-10">
          <MotifGallery />
        </div>
      </section>

      {/* Process scrollytelling */}
      <section className="bg-indigo-deep/[0.04]">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="text-sm uppercase tracking-widest text-teak">
                From raw cotton to finished cloth
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                The eight-step process
              </h2>
            </div>
          </Reveal>
          <ProcessScroll />
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-5 py-20">
        <Reveal>
          <h2 className="mb-12 text-center font-serif text-3xl sm:text-4xl">
            A five-century timeline
          </h2>
        </Reveal>
        <CraftTimeline />
      </section>

      {/* Natural dyes */}
      <section className="bg-bone-deep/40">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <Reveal>
            <h2 className="font-serif text-3xl">Natural dyes</h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Traditional colour comes from indigo, alum, turmeric, pomegranate and
              iron rust, among others.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {NATURAL_DYES.map((dye) => (
              <Reveal key={dye.name}>
                <div className="flex items-center gap-3 rounded-xl border border-teak/15 bg-bone/60 p-4">
                  <span
                    className="h-10 w-10 shrink-0 rounded-full"
                    style={{ backgroundColor: dye.color }}
                  />
                  <div>
                    <p className="font-medium">{dye.name}</p>
                    <p className="text-xs text-ink-soft">{dye.tone}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tradition vs modern */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <Reveal>
          <h2 className="font-serif text-3xl">Tradition and the present</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
            <p>
              Many contemporary workshops now blend safe synthetic dyes into their
              palette for durability and colour range. This is a live tension in the
              craft — one that also touches on GI status and the environmental
              scrutiny of dye effluent in Sanganer. We believe the honest answer is
              specificity: we tell you what a piece is dyed with, and we do not
              overclaim.
            </p>
            <p>
              What stays constant is the hand: the carved block, the rhythm of
              chhapaai, and the alignment held by eye. That is the part worth
              protecting.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-indigo px-6 py-3 text-sm text-bone hover:bg-indigo-deep"
            >
              Shop the collection
            </Link>
            <Link
              href="/artisans"
              className="rounded-full border border-teak/30 px-6 py-3 text-sm hover:border-indigo hover:text-indigo"
            >
              Meet the artisans
            </Link>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
