import Link from "next/link";
import { ButaGlyph } from "@/components/motif-glyphs";

export default function NotFound() {
  return (
    <div className="grain flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <ButaGlyph className="h-24 w-24 text-teak/50" />
      <p className="mt-6 text-sm uppercase tracking-widest text-teak">Error 404</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
        This block left no impression
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        The page you were looking for isn&rsquo;t here. Let&rsquo;s get you back to
        the cloth.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-indigo px-6 py-3 text-sm text-bone hover:bg-indigo-deep"
        >
          Return home
        </Link>
        <Link
          href="/shop"
          className="rounded-full border border-teak/30 px-6 py-3 text-sm hover:border-indigo hover:text-indigo"
        >
          Shop the collection
        </Link>
      </div>
    </div>
  );
}
