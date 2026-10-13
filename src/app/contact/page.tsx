import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact, Stockists & Wholesale",
  description:
    "Get in touch with GULABARI — general enquiries, wholesale, and becoming a stockist of Sanganeri hand block printed clothing.",
};

export default function ContactPage() {
  return (
    <div className="grain pt-24 pb-20 sm:pt-28">
      <header className="mx-auto max-w-3xl px-5 py-14 text-center sm:py-20">
        <p className="text-teak text-sm tracking-widest uppercase">Say hello</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Contact & Wholesale</h1>
        <p className="text-ink-soft mt-5 leading-relaxed">
          Questions about a piece, wholesale, or stocking GULABARI in your shop? Write to us — a
          real person reads every message.
        </p>
      </header>

      <section className="mx-auto grid max-w-5xl gap-12 px-5 pb-20 lg:grid-cols-[1fr_320px]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="space-y-8">
            <div>
              <h2 className="font-serif text-xl">Studio</h2>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                Sanganer, Jaipur
                <br />
                Rajasthan, India
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl">Wholesale</h2>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                We work with a small number of considered retail partners. Choose
                &ldquo;Wholesale&rdquo; in the form and we&rsquo;ll send our line sheet and
                terms.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl">Stockists</h2>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                GULABARI is currently sold online and through selected boutiques in Jaipur,
                Delhi and Mumbai. Ask us for your nearest stockist.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl">Email</h2>
              <p className="text-ink-soft mt-2 text-sm">hello@gulabari.example</p>
            </div>
          </aside>
        </Reveal>
      </section>
    </div>
  );
}
