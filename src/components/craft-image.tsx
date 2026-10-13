"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { imageMeta } from "@/lib/image-blur";

type CraftImageProps = {
  src: string;
  alt: string;
  /** Layout hint passed to the browser; keep it accurate for zero CLS. */
  sizes: string;
  className?: string;
  /** Wrapper class — use for the aspect ratio + rounding + overflow. */
  wrapperClassName?: string;
  priority?: boolean;
  /** Fade + soft-settle once the photo decodes. */
  reveal?: boolean;
  objectPosition?: string;
  quality?: number;
};

const LQIP_FLAT =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='16' height='16' fill='%23e8ded0'/%3E%3C/svg%3E";

/**
 * The single image primitive for the whole storefront.
 *
 * Wraps next/image with:
 *  - intrinsic width/height + blur placeholder from the generated image map
 *    (so nothing reflows and nothing pops in as a grey box),
 *  - an AVIF → WebP → JPEG negotiation handled by the optimiser,
 *  - a restrained blur-up + settle transition that steps aside entirely when
 *    the visitor prefers reduced motion or the image is a priority (LCP) image.
 */
export function CraftImage({
  src,
  alt,
  sizes,
  className = "",
  wrapperClassName = "",
  priority = false,
  reveal = true,
  objectPosition,
  quality = 75,
}: CraftImageProps) {
  const reduce = useReducedMotion();
  const meta = imageMeta(src);
  const placeholder = meta.blurDataURL || LQIP_FLAT;
  const animate = reveal && !reduce && !priority;

  return (
    <span className={`block ${wrapperClassName}`}>
      <Image
        src={src}
        alt={alt}
        width={meta.width}
        height={meta.height}
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        placeholder="blur"
        blurDataURL={placeholder}
        style={objectPosition ? { objectPosition } : undefined}
        className={`${className} ${animate ? "craft-img-in" : ""}`}
      />
    </span>
  );
}
