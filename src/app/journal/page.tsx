import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getJournalPosts } from "@/db/queries";

export const metadata: Metadata = {
  title: "The Sanganer Journal — Editorial Stories from Jaipur",
  description:
    "An editorial magazine exploring five centuries of Sanganeri hand block printing, Chippa artisan families, botanical dye chemistry, and mindful textile care.",
};

export default async function JournalPage() {
  const posts = await getJournalPosts();
  const leadPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="grain pt-24 sm:pt-28 pb-24">
      {/* Editorial Header */}
      <header className="mx-auto max-w-4xl px-5 py-12 sm:py-16 text-center">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-teak">
          Editorial &amp; Craft Essays
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-semibold text-ink leading-tight">
          THE SANGANER JOURNAL
        </h1>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink-soft max-w-2xl mx-auto">
          Dispatches from the sixty-foot printing tables, carver benches in Jahota, and open-air
          sun-drying courtyards of Rajasthan.
        </p>
      </header>

      {/* Featured Lead Editorial Story */}
      {leadPost && (
        <section className="mx-auto max-w-7xl px-5 sm:px-8 mb-20">
          <Reveal>
            <Link href={`/journal/${leadPost.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center rounded-3xl bg-cotton p-6 sm:p-10 border border-teak/20 cloth-shadow-lg transition-transform hover:-translate-y-1">
              <div className="lg:col-span-7 overflow-hidden rounded-2xl aspect-[16/10] bg-bone-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={leadPost.image}
                  alt={leadPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-teak font-mono">
                    <span className="rounded-full bg-indigo/10 px-2.5 py-1 text-indigo font-semibold">{leadPost.category}</span>
                    <span>·</span>
                    <span>{leadPost.readMinutes} min read</span>
                  </div>
                  <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-semibold text-ink group-hover:text-indigo transition-colors leading-tight">
                    {leadPost.title}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-soft">
                    {leadPost.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-teak/15 flex items-center text-xs uppercase tracking-widest font-semibold text-indigo group-hover:text-indigo-deep">
                  <span>Read Full Cover Story</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* Grid of Remaining Stories */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {remainingPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <Link href={`/journal/${post.slug}`} className="group flex flex-col h-full rounded-2xl bg-cotton p-5 border border-teak/15 cloth-shadow transition-shadow hover:cloth-shadow-lg">
                <div className="overflow-hidden rounded-xl bg-bone-deep aspect-[16/11] relative">
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
                  <span>{post.readMinutes} min</span>
                </div>
                <h3 className="mt-2 font-serif text-xl font-semibold text-ink group-hover:text-indigo transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-soft line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-teak/10 text-xs font-medium text-indigo group-hover:text-indigo-deep flex items-center justify-between">
                  <span>Read Essay</span>
                  <span>→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
