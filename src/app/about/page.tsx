import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { UnderlineDraw } from "@/components/underline-draw";
import { GulabariLogo } from "@/components/gulabari-logo";

export const metadata: Metadata = {
  title: "About GULABARI — Handcrafted Textiles · Jaipur",
  description:
    "Why GULABARI chose Sanganeri hand block printing: our founding story, mission and values — heritage over decoration, slow over fast, specific over vague.",
};

const VALUES = [
  {
    title: "Heritage, not decoration",
    body: "Every motif we print has a name, a lineage and a maker. We treat the buta, buti, bel and jaal as vocabulary, not ornament.",
  },
  {
    title: "Slow and honest",
    body: "Handmade cloth is imperfect by nature and mellows over years. We frame that as character, and we never overclaim what a piece is or how it was made.",
  },
  {
    title: "Fair by design",
    body: "We buy directly from artisan workshops, agree prices with the makers, and aim to make the craft a sustainable livelihood for Chippa families.",
  },
];

export default function AboutPage() {
  return (
    <div className="grain pt-24 sm:pt-28 pb-20">
      <header className="mx-auto max-w-3xl px-5 py-14 sm:py-20 text-center">
        <GulabariLogo variant="dark" mode="emblem" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" priority />
        <p className="text-xs uppercase tracking-[0.28em] text-teak font-mono font-medium">Our Story · GULABARI JAIPUR</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          A brand built around{" "}
          <UnderlineDraw>one craft</UnderlineDraw>, done well
        </h1>
      </header>

      <section className="mx-auto max-w-3xl px-5 pb-12">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              GULABARI began with a simple conviction: that Sanganeri hand block
              printing — roughly five centuries old and still practised by Chippa
              artisan families near Jaipur — deserves to be worn, not just admired in
              museums. We chose one craft and committed to understanding it deeply
              rather than sampling many.
            </p>
            <p>
              We work close to the source in Sanganer, on the Sahibi river, where the
              blocks are carved from teak, the dyes are mixed by hand, and the cloth
              is printed one impression at a time. Our job is to design garments that
              let that work speak — generous cuts, quiet colour, and room for the
              print to breathe.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-teak/15 bg-bone/60 p-6">
                <h2 className="font-serif text-xl">{value.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <Reveal>
          <p className="font-serif text-2xl leading-relaxed">
            Why Sanganeri specifically? Because its delicacy asks something of you.
            The lines are fine, the ground is pale, the motifs lean gently to the
            right — it rewards attention. That felt like the right thing to build a
            brand around.
          </p>
          <Link
            href="/craft"
            className="mt-8 inline-block rounded-full bg-indigo px-6 py-3 text-sm text-bone hover:bg-indigo-deep"
          >
            Read about the craft
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
