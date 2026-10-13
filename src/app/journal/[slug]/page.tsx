import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { StampBorder } from "@/components/stamp-border";
import { getJournalPost, getJournalPosts } from "@/db/queries";
import { CraftImage } from "@/components/craft-image";
import { articleSchema, breadcrumbSchema, jsonLdScript } from "@/lib/structured-data";

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
  if (!post) return { title: "Story not found" };

  const description = `${post.excerpt} — ${post.category}, from the GULABARI Journal on Sanganeri hand block printing.`;

  return {
    title: `${post.title} — GULABARI Journal`,
    description,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `/journal/${post.slug}`,
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.image],
    },
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

  const structuredData = [
    articleSchema({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      category: post.category,
      publishedAt: post.publishedAt,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Journal", path: "/journal" },
      { name: post.title, path: `/journal/${post.slug}` },
    ]),
  ];

  const allPosts = await getJournalPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="grain pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(structuredData)}
      />

      {/* Breadcrumb & Navigation */}
      <div className="mx-auto max-w-4xl px-5">
        <Link
          href="/journal"
          className="text-teak hover:text-indigo inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase transition-colors"
        >
          <span>← Back to Journal</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mx-auto max-w-3xl px-5 pt-8 text-center sm:text-left">
        <div className="text-teak flex flex-wrap items-center gap-2 font-mono text-xs tracking-widest uppercase">
          <span className="bg-indigo/10 text-indigo rounded-full px-2.5 py-1 font-semibold">
            {post.category}
          </span>
          <span>·</span>
          <span>{post.readMinutes} min read</span>
          <span>·</span>
          <span>Sanganer, Jaipur</span>
        </div>

        <h1 className="text-ink mt-4 font-serif text-3xl leading-tight font-semibold sm:text-5xl md:text-6xl">
          {post.title}
        </h1>

        <p className="text-ink-soft border-teak/30 mt-6 border-l-2 pl-4 font-serif text-lg leading-relaxed italic sm:text-xl">
          {post.excerpt}
        </p>
      </header>

      {/* Hero Cover Image */}
      <div className="mx-auto mt-12 max-w-5xl px-5">
        <div className="bg-bone-deep cloth-shadow-lg aspect-[16/9] overflow-hidden rounded-3xl">
          <CraftImage
            src={post.image}
            alt={post.title}
            sizes="(max-width: 1024px) 92vw, 960px"
            wrapperClassName="h-full w-full"
            className="h-full w-full object-cover"
            quality={80}
          />
        </div>
        <p className="text-ink-faint mt-3 text-right font-serif text-xs italic">
          Documentary archive · Sanganer Printing Guild, Rajasthan
        </p>
      </div>

      {/* Article Body */}
      <div className="mx-auto max-w-3xl px-5 py-12">
        <div className="text-ink-soft space-y-6 text-base leading-relaxed sm:text-lg">
          {post.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p
                className={
                  i === 0
                    ? "first-letter:text-indigo first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:font-bold"
                    : ""
                }
              >
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <StampBorder className="mx-auto my-12 max-w-md" />

        {/* CTA to collection */}
        <div className="border-teak/20 bg-cotton cloth-shadow rounded-2xl border p-8 text-center">
          <h2 className="text-ink font-serif text-2xl font-semibold">
            Experience Sanganeri Craftsmanship
          </h2>
          <p className="text-ink-soft mx-auto mt-2 max-w-md text-sm">
            Discover our collection of handcrafted cotton kurtas, dresses, and dupattas printed
            with authentic botanical dyes.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/shop"
              className="bg-indigo text-bone hover:bg-indigo-deep rounded-full px-8 py-3.5 text-xs font-semibold tracking-widest uppercase shadow-md transition-all"
            >
              Explore The Collection
            </Link>
          </div>
        </div>

        {/* Related Stories */}
        {related.length > 0 && (
          <div className="border-teak/15 mt-16 border-t pt-12">
            <h2 className="text-ink mb-6 font-serif text-2xl font-semibold">
              More from The Journal
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/journal/${item.slug}`}
                  className="group border-teak/15 bg-bone hover:cloth-shadow rounded-xl border p-4 transition-all"
                >
                  <p className="text-teak font-mono text-[10px] tracking-widest uppercase">
                    {item.category}
                  </p>
                  <h4 className="text-ink group-hover:text-indigo mt-1 font-serif text-base font-semibold">
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
