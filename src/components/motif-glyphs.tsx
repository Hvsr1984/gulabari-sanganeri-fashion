import type { SVGProps } from "react";

type GlyphProps = SVGProps<SVGSVGElement>;

/**
 * Line-art motif glyphs for the core Sanganeri motif families.
 * Drawn as strokes so they can "carve" themselves in via stroke animation.
 */

export function ButaGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden {...props}>
      <path
        d="M50 90c0-18-14-24-14-42 0-14 8-26 14-34 6 8 14 20 14 34 0 18-14 24-14 42Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 30c-6 4-11 10-11 18M50 30c6 4 11 10 11 18M50 44c-4 3-7 7-7 12M50 44c4 3 7 7 7 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M50 90v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ButiGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden {...props}>
      <circle cx="50" cy="42" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M50 20c5 5 5 12 0 15M50 20c-5 5-5 12 0 15M28 42c5-5 12-5 15 0M28 42c5 5 12 5 15 0M72 42c-5-5-12-5-15 0M72 42c-5 5-12 5-15 0M50 64c5-5 5-12 0-15M50 64c-5-5-5-12 0-15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M50 64v18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M50 74c-4-2-8-1-10 2M50 78c4-2 8-1 10 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function BelGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden {...props}>
      <path d="M8 30h84M8 70h84" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M14 50c8-14 16-14 22 0 6 14 14 14 22 0 6-14 14-14 22 0 4 9 8 12 12 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 43c-3-3-7-3-9 0M47 57c3 3 7 3 9 0M69 43c-3-3-7-3-9 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function JaalGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden {...props}>
      <path
        d="M25 10c0 20 20 20 20 40S25 90 25 90M75 10c0 20-20 20-20 40s20 20 20 40M10 25c20 0 20 20 40 20s20-20 40-20M10 75c20 0 20-20 40-20s20 20 40 20"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function PaisleyGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden {...props}>
      <path
        d="M45 85C30 85 20 72 20 54c0-20 18-36 32-44 2 8 8 14 14 16 8 2 14-2 16-6 4 10 2 24-8 32-8 6-14 8-14 16 0 6 5 11 11 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="45" cy="50" r="5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function GeometricGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden {...props}>
      <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1.4" />
      <polygon points="50,15 85,50 50,85 15,50" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export const MOTIF_GLYPHS = {
  buta: ButaGlyph,
  buti: ButiGlyph,
  bel: BelGlyph,
  jaal: JaalGlyph,
  paisley: PaisleyGlyph,
  geometric: GeometricGlyph,
} as const;

export type MotifKey = keyof typeof MOTIF_GLYPHS;
