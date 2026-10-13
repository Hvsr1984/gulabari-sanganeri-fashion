import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { CraftImage } from "@/components/craft-image";
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
  const [featured, journal] = await Promise.all([getFeaturedProducts(6), getJournalPosts()]);
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
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <SanganeriStampAnimation />
        </Reveal>
      </section>

      {/* 4. Fabric Texture Experience: "FEEL THE CRAFT" with Interactive Magnifier */}
      <FabricTextureExperience />

      {/* 5. Motifs of Sanganer: Tactile 3D Swatch Cards */}
      <MotifsSection />

      {/* 6. Curated Collection Section */}
      <section className="border-teak/10 mx-auto max-w-7xl border-b px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-teak text-xs font-medium tracking-[0.25em] uppercase">
                Handcrafted Autumn Collection
              </span>
              <h2 className="text-ink mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
                THE SANGANER EDIT
              </h2>
              <p className="text-ink-soft mt-2 max-w-md text-sm">
                Pure cotton kurtas, breezy tiered dresses, tailored camp shirts and flowing
                dupattas printed one block at a time.
              </p>
            </div>
            <Link
              href="/shop"
              className="border-teak/30 bg-cotton text-ink hover:border-indigo hover:text-indigo inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-all hover:shadow-md"
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
      <section className="bg-indigo-deep text-bone relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <div>
                <span className="text-bone/60 font-mono text-xs tracking-[0.25em] uppercase">
                  Generational Artisan Lineage
                </span>
                <h2 className="text-bone mt-3 font-serif text-3xl leading-tight font-semibold sm:text-5xl">
                  MADE BY HAND. <br />
                  <span className="text-bone-deep font-normal italic">CARRIED FORWARD.</span>
                </h2>
                <p className="text-bone/85 mt-6 text-base leading-relaxed">
                  We work side-by-side with hereditary Chippa artisan families in Sanganer and
                  master carvers in Jahota. There is no automated shortcut: alignment is
                  measured by eye, strike pressure is calibrated by muscle memory, and colours
                  are deepened by Rajasthan&apos;s brilliant desert sun.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/artisans"
                    className="bg-bone text-ink rounded-full px-7 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                  >
                    Meet the Artisans
                  </Link>
                  <Link
                    href="/craft"
                    className="border-bone/40 text-bone hover:bg-bone/10 rounded-full border px-7 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors"
                  >
                    Read Craft Journal
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="group bg-indigo cloth-shadow-lg relative overflow-hidden rounded-2xl">
                <CraftImage
                  src="/images/sun-dry.jpg"
                  alt="Lengths of hand printed indigo cloth sun-drying on bamboo scaffoldings in a Jaipur courtyard"
                  sizes="(max-width: 1024px) 92vw, 48vw"
                  wrapperClassName="aspect-[4/3] w-full"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="from-indigo-deep/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                <div className="text-bone/90 absolute right-5 bottom-5 left-5 flex items-end justify-between text-xs">
                  <div>
                    <p className="font-serif text-sm font-medium">Sanganer Open Courtyards</p>
                    <p className="text-bone/70 text-[11px]">
                      Sun-drying natural indigo &amp; madder cotton lengths
                    </p>
                  </div>
                  <span className="text-bone/60 font-mono text-[10px]">GI Certified</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. Editorial Journal Magazine Section */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="border-teak/15 mb-14 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-teak text-xs font-medium tracking-[0.25em] uppercase">
                Stories from the Printing Table
              </span>
              <h2 className="text-ink mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
                THE SANGANER JOURNAL
              </h2>
            </div>
            <Link
              href="/journal"
              className="text-indigo hover:text-indigo-deep inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase"
            >
              <span>View All Editorial Essays</span>
              <span>→</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-3">
          {teaserStories.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <Link href={`/journal/${post.slug}`} className="group flex h-full flex-col">
                <div className="group/img bg-bone-deep cloth-shadow aspect-[16/11] overflow-hidden rounded-2xl">
                  <CraftImage
                    src={post.image}
                    alt={post.title}
                    sizes="(max-width: 768px) 92vw, 30vw"
                    wrapperClassName="h-full w-full"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="text-teak mt-5 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.readMinutes} min read</span>
                </div>
                <h3 className="text-ink group-hover:text-indigo mt-2 font-serif text-xl leading-snug font-semibold transition-colors sm:text-2xl">
                  {post.title}
                </h3>
                <p className="text-ink-soft mt-2.5 line-clamp-3 text-xs leading-relaxed sm:text-sm">
                  {post.excerpt}
                </p>
                <div className="border-teak/10 text-indigo group-hover:text-indigo-deep mt-4 border-t pt-3 text-xs font-medium">
                  Read Essay →
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brand Heritage Stamp */}
      <div className="mx-auto max-w-4xl px-5 pb-20 text-center">
        <StampBorder className="mx-auto mb-8 max-w-md" />
        <p className="text-ink-soft font-serif text-lg italic sm:text-xl">
          &ldquo;Authentic Sanganeri Block Print × Jaipur Heritage × Contemporary Luxury
          Fashion&rdquo;
        </p>
        <StampBorder className="mx-auto mt-8 max-w-md" />
      </div>
    </div>
  );
}
