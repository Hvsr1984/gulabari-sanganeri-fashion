import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { StorySection } from "@/components/story-section";
import { CraftProcessInteractive } from "@/components/craft-process-interactive";
import { FabricTextureExperience } from "@/components/fabric-texture-experience";
import { SanganeriStampAnimation } from "@/components/sanganeri-stamp-animation";
import { MotifsSection } from "@/components/motifs-section";
import { StampBorder } from "@/components/stamp-border";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts, getJournalPosts } from "@/db/queries";

export default async function HomePage() {
  const [featured, journal] = await Promise.all([
    getFeaturedProducts(6),
    getJournalPosts(),
  ]);
  const teaserStories = journal.slice(0, 3);

  return (
    <div className="grain overflow-hidden">
      {/* 1. Cinematic 3D Parallax Hero */}
      <HomeHero />

      {/* 2. Sanganeri Story Section: "A PRINT BORN IN SANGANER" */}
      <StorySection />

      {/* 3. The Craft Process: 01 DESIGN to 06 FINISH with Tactile Hover Reveal */}
      <CraftProcessInteractive />

      {/* Signature Interaction: The Physical Cadence of Chhapaai */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16">
        <Reveal>
          <SanganeriStampAnimation />
        </Reveal>
      </section>

      {/* 4. Fabric Texture Experience: "FEEL THE CRAFT" with Interactive Magnifier */}
      <FabricTextureExperience />

      {/* 5. Motifs of Sanganer: Tactile 3D Swatch Cards */}
      <MotifsSection />

      {/* 6. Curated Collection Section */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32 border-b border-teak/10">
        <Reveal>
          <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-teak">
                Handcrafted Autumn Collection
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
                THE SANGANER EDIT
              </h2>
              <p className="mt-2 text-sm text-ink-soft max-w-md">
                Pure cotton kurtas, breezy tiered dresses, tailored camp shirts and flowing dupattas
                printed one block at a time.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-teak/30 bg-cotton px-6 py-3 text-xs uppercase tracking-widest font-semibold text-ink transition-all hover:border-indigo hover:text-indigo hover:shadow-md"
            >
              <span>Explore All Pieces</span>
              <span>→</span>
            </Link>
          </div>
        </Reveal>

        {/* Product Cards Grid with Quick View & Hover Secondary View */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. Artisan Craft Feature: "MADE BY HAND. CARRIED FORWARD." */}
      <section className="relative overflow-hidden bg-indigo-deep text-bone py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-bone/60 font-mono">
                  Generational Artisan Lineage
                </span>
                <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold leading-tight text-bone">
                  MADE BY HAND. <br />
                  <span className="italic font-normal text-bone-deep">CARRIED FORWARD.</span>
                </h2>
                <p className="mt-6 text-base leading-relaxed text-bone/85">
                  We work side-by-side with hereditary Chippa artisan families in Sanganer and master
                  carvers in Jahota. There is no automated shortcut: alignment is measured by eye,
                  strike pressure is calibrated by muscle memory, and colours are deepened by Rajasthan&apos;s
                  brilliant desert sun.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/artisans"
                    className="rounded-full bg-bone px-7 py-3.5 text-xs uppercase tracking-widest font-semibold text-ink transition-all hover:bg-white hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Meet the Artisans
                  </Link>
                  <Link
                    href="/craft"
                    className="rounded-full border border-bone/40 px-7 py-3.5 text-xs uppercase tracking-widest font-semibold text-bone transition-colors hover:bg-bone/10"
                  >
                    Read Craft Journal
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 relative">
            <Reveal delay={0.15}>
              <div className="relative group overflow-hidden rounded-2xl bg-indigo cloth-shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sun-dry.jpg"
                  alt="Lengths of hand printed indigo cloth sun-drying on bamboo scaffoldings in a Jaipur courtyard"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-xs text-bone/90">
                  <div>
                    <p className="font-serif text-sm font-medium">Sanganer Open Courtyards</p>
                    <p className="text-[11px] text-bone/70">Sun-drying natural indigo &amp; madder cotton lengths</p>
                  </div>
                  <span className="font-mono text-[10px] text-bone/60">GI Certified</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. Editorial Journal Magazine Section */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
        <Reveal>
          <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-teak/15 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-teak">
                Stories from the Printing Table
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
                THE SANGANER JOURNAL
              </h2>
            </div>
            <Link href="/journal" className="text-xs uppercase tracking-widest font-semibold text-indigo hover:text-indigo-deep inline-flex items-center gap-1.5">
              <span>View All Editorial Essays</span>
              <span>→</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-3">
          {teaserStories.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <Link href={`/journal/${post.slug}`} className="group flex flex-col h-full">
                <div className="overflow-hidden rounded-2xl bg-bone-deep aspect-[16/11] cloth-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-widest text-teak font-mono">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.readMinutes} min read</span>
                </div>
                <h3 className="mt-2 font-serif text-xl sm:text-2xl font-semibold text-ink group-hover:text-indigo transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-soft line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 pt-3 border-t border-teak/10 text-xs font-medium text-indigo group-hover:text-indigo-deep">
                  Read Essay →
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brand Heritage Stamp */}
      <div className="mx-auto max-w-4xl px-5 pb-20 text-center">
        <StampBorder className="mb-8 max-w-md mx-auto" />
        <p className="font-serif text-lg sm:text-xl text-ink-soft italic">
          &ldquo;Authentic Sanganeri Block Print × Jaipur Heritage × Contemporary Luxury Fashion&rdquo;
        </p>
        <StampBorder className="mt-8 max-w-md mx-auto" />
      </div>
    </div>
  );
}
