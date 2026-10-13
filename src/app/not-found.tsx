import Link from "next/link";
import { ButaGlyph } from "@/components/motif-glyphs";

export default function NotFound() {
  return (
    <div className="grain flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <ButaGlyph className="text-teak/50 h-24 w-24" />
      <p className="text-teak mt-6 text-sm tracking-widest uppercase">Error 404</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">This block left no impression</h1>
      <p className="text-ink-soft mt-4 max-w-md">
        The page you were looking for isn&rsquo;t here. Let&rsquo;s get you back to the cloth.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="bg-indigo text-bone hover:bg-indigo-deep rounded-full px-6 py-3 text-sm"
        >
          Return home
        </Link>
        <Link
          href="/shop"
          className="border-teak/30 hover:border-indigo hover:text-indigo rounded-full border px-6 py-3 text-sm"
        >
          Shop the collection
        </Link>
      </div>
    </div>
  );
}
