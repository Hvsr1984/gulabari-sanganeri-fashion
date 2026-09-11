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
    <div className="grain pt-24 sm:pt-28 pb-20">
      <header className="mx-auto max-w-3xl px-5 py-14 sm:py-20 text-center">
        <p className="text-sm uppercase tracking-widest text-teak">Say hello</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
          Contact & Wholesale
        </h1>
        <p className="mt-5 leading-relaxed text-ink-soft">
          Questions about a piece, wholesale, or stocking GULABARI in your shop? Write
          to us — a real person reads every message.
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
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Sanganer, Jaipur
                <br />
                Rajasthan, India
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl">Wholesale</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                We work with a small number of considered retail partners. Choose
                &ldquo;Wholesale&rdquo; in the form and we&rsquo;ll send our line
                sheet and terms.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl">Stockists</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                GULABARI is currently sold online and through selected boutiques in
                Jaipur, Delhi and Mumbai. Ask us for your nearest stockist.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl">Email</h2>
              <p className="mt-2 text-sm text-ink-soft">hello@gulabari.example</p>
            </div>
          </aside>
        </Reveal>
      </section>
    </div>
  );
}
