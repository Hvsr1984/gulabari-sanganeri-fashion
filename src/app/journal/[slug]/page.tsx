import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { StampBorder } from "@/components/stamp-border";
import { getJournalPost, getJournalPosts } from "@/db/queries";

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — GULABARI Journal`,
    description: post.excerpt,
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();

  const allPosts = await getJournalPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="grain pt-28 pb-24">
      {/* Breadcrumb & Navigation */}
      <div className="mx-auto max-w-4xl px-5">
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-teak hover:text-indigo transition-colors"
        >
          <span>← Back to Journal</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mx-auto max-w-3xl px-5 pt-8 text-center sm:text-left">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-teak font-mono">
          <span className="rounded-full bg-indigo/10 px-2.5 py-1 text-indigo font-semibold">{post.category}</span>
          <span>·</span>
          <span>{post.readMinutes} min read</span>
          <span>·</span>
          <span>Sanganer, Jaipur</span>
        </div>

        <h1 className="mt-4 font-serif text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight text-ink">
          {post.title}
        </h1>

        <p className="mt-6 font-serif text-lg sm:text-xl text-ink-soft leading-relaxed italic border-l-2 border-teak/30 pl-4">
          {post.excerpt}
        </p>
      </header>

      {/* Hero Cover Image */}
      <div className="mx-auto mt-12 max-w-5xl px-5">
        <div className="overflow-hidden rounded-3xl bg-bone-deep cloth-shadow-lg aspect-[16/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-3 text-right text-xs text-ink-faint italic font-serif">
          Documentary archive · Sanganer Printing Guild, Rajasthan
        </p>
      </div>

      {/* Article Body */}
      <div className="mx-auto max-w-3xl px-5 py-12">
        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-ink-soft">
          {post.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={i === 0 ? "first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:text-indigo" : ""}>
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <StampBorder className="my-12 max-w-md mx-auto" />

        {/* CTA to collection */}
        <div className="rounded-2xl border border-teak/20 bg-cotton p-8 text-center cloth-shadow">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Experience Sanganeri Craftsmanship
          </h2>
          <p className="mt-2 text-sm text-ink-soft max-w-md mx-auto">
            Discover our collection of handcrafted cotton kurtas, dresses, and dupattas printed
            with authentic botanical dyes.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-indigo px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-bone hover:bg-indigo-deep transition-all shadow-md"
            >
              Explore The Collection
            </Link>
          </div>
        </div>

        {/* Related Stories */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-teak/15">
            <h2 className="font-serif text-2xl font-semibold text-ink mb-6">
              More from The Journal
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/journal/${item.slug}`}
                  className="group rounded-xl border border-teak/15 bg-bone p-4 transition-all hover:cloth-shadow"
                >
                  <p className="text-[10px] uppercase tracking-widest text-teak font-mono">{item.category}</p>
                  <h4 className="font-serif text-base font-semibold text-ink group-hover:text-indigo mt-1">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
