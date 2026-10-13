import type { Metadata } from "next";
import { CareIcons } from "@/components/care-icons";
import { Reveal } from "@/components/reveal";
import { StampBorder } from "@/components/stamp-border";
import { NATURAL_DYES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sustainability & Care",
  description:
    "How to care for hand block printed cotton — cold gentle wash, shade dry, iron slightly damp — plus our honest stance on natural dyes and the environmental realities of the craft.",
};

export default function SustainabilityPage() {
  return (
    <div className="grain">
      <header className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-teak text-sm tracking-widest uppercase">
          Wear it well, wear it long
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Sustainability & Care</h1>
        <p className="text-ink-soft mt-5 leading-relaxed">
          Natural-dyed, hand-printed cotton asks for a little care and rewards it with years of
          wear. Here is how to look after your pieces — and where we stand on the harder
          questions.
        </p>
        <StampBorder className="mt-10" />
      </header>

      <section className="mx-auto max-w-5xl px-5 pb-8">
        <Reveal>
          <h2 className="mb-8 font-serif text-3xl">Care instructions</h2>
        </Reveal>
        <CareIcons />
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal>
          <div className="bg-indigo-deep text-bone rounded-2xl p-8 sm:p-10">
            <h2 className="font-serif text-2xl">Our honest stance on dyes</h2>
            <div className="text-bone/85 mt-4 space-y-4 leading-relaxed">
              <p>
                Traditional Sanganeri colour comes from natural sources — indigo, alum,
                turmeric, pomegranate, iron rust. Many workshops today also blend in safe
                synthetic dyes for durability and a wider colour range. Both approaches are
                real, and each has trade-offs.
              </p>
              <p>
                We don&rsquo;t claim every GULABARI piece is 100% natural-dyed unless it is.
                What we commit to is specificity: telling you what a garment is dyed with, and
                being straight about the environmental scrutiny of dye-effluent in Sanganer
                rather than greenwashing over it.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <Reveal>
          <h2 className="mb-6 font-serif text-3xl">The traditional dye palette</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {NATURAL_DYES.map((dye) => (
            <Reveal key={dye.name}>
              <div className="border-teak/15 bg-bone/60 flex items-center gap-3 rounded-xl border p-4">
                <span
                  className="h-9 w-9 shrink-0 rounded-full"
                  style={{ backgroundColor: dye.color }}
                />
                <div>
                  <p className="font-medium">{dye.name}</p>
                  <p className="text-ink-soft text-xs">{dye.tone}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
