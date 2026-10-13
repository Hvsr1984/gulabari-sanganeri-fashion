import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getJournalPosts } from "@/db/queries";
import { CraftImage } from "@/components/craft-image";

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
    <div className="grain pt-24 pb-24 sm:pt-28">
      {/* Editorial Header */}
      <header className="mx-auto max-w-4xl px-5 py-12 text-center sm:py-16">
        <span className="text-teak text-xs font-medium tracking-[0.25em] uppercase">
          Editorial &amp; Craft Essays
        </span>
        <h1 className="text-ink mt-3 font-serif text-4xl leading-tight font-semibold sm:text-6xl">
          THE SANGANER JOURNAL
        </h1>
        <p className="text-ink-soft mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
          Dispatches from the sixty-foot printing tables, carver benches in Jahota, and open-air
          sun-drying courtyards of Rajasthan.
        </p>
      </header>

      {/* Featured Lead Editorial Story */}
      {leadPost && (
        <section className="mx-auto mb-20 max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Link
              href={`/journal/${leadPost.slug}`}
              className="group bg-cotton border-teak/20 cloth-shadow-lg grid gap-8 rounded-3xl border p-6 transition-transform hover:-translate-y-1 sm:p-10 lg:grid-cols-12 lg:items-center"
            >
              <div className="bg-bone-deep aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-7">
                <CraftImage
                  src={leadPost.image}
                  alt={leadPost.title}
                  sizes="(max-width: 1024px) 92vw, 58vw"
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <div className="text-teak flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
                    <span className="bg-indigo/10 text-indigo rounded-full px-2.5 py-1 font-semibold">
                      {leadPost.category}
                    </span>
                    <span>·</span>
                    <span>{leadPost.readMinutes} min read</span>
                  </div>
                  <h2 className="text-ink group-hover:text-indigo mt-4 font-serif text-3xl leading-tight font-semibold transition-colors sm:text-4xl">
                    {leadPost.title}
                  </h2>
                  <p className="text-ink-soft mt-4 text-sm leading-relaxed sm:text-base">
                    {leadPost.excerpt}
                  </p>
                </div>
                <div className="border-teak/15 text-indigo group-hover:text-indigo-deep mt-6 flex items-center border-t pt-4 text-xs font-semibold tracking-widest uppercase">
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
              <Link
                href={`/journal/${post.slug}`}
                className="group bg-cotton border-teak/15 cloth-shadow hover:cloth-shadow-lg flex h-full flex-col rounded-2xl border p-5 transition-shadow"
              >
                <div className="bg-bone-deep relative aspect-[16/11] overflow-hidden rounded-xl">
                  <CraftImage
                    src={post.image}
                    alt={post.title}
                    sizes="(max-width: 768px) 92vw, 32vw"
                    wrapperClassName="h-full w-full"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="text-teak mt-5 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.readMinutes} min</span>
                </div>
                <h3 className="text-ink group-hover:text-indigo mt-2 font-serif text-xl leading-snug font-semibold transition-colors">
                  {post.title}
                </h3>
                <p className="text-ink-soft mt-2 line-clamp-3 text-xs leading-relaxed sm:text-sm">
                  {post.excerpt}
                </p>
                <div className="border-teak/10 text-indigo group-hover:text-indigo-deep mt-auto flex items-center justify-between border-t pt-4 text-xs font-medium">
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
