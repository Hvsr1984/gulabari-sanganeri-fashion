"use client";

import { CraftImage } from "./craft-image";

interface GulabariLogoProps {
  variant?: "dark" | "light" | "original";
  mode?: "full" | "emblem";
  className?: string;
  priority?: boolean;
}

export function GulabariLogo({
  variant = "dark",
  mode = "full",
  className = "",
  priority = false,
}: GulabariLogoProps) {
  let src = "/images/gulabari-logo-transparent.png";
  if (variant === "light") {
    src = "/images/gulabari-logo-light.png";
  } else if (variant === "original") {
    src = "/images/gulabari-logo.jpg";
  }

  if (mode === "emblem") {
    src = "/images/gulabari-emblem-transparent.png";
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ aspectRatio: mode === "emblem" ? "584/530" : "1/1" }}
    >
      <CraftImage
        src={src}
        alt="GULABARI JAIPUR — Handcrafted Textiles. Timeless Stories."
        sizes="96px"
        priority={priority}
        wrapperClassName="h-full w-full"
        className="h-full w-full object-contain"
        quality={90}
        reveal={false}
      />
    </div>
  );
}

export function GulabariBrandLockup({
  isTransparent = false,
  scrolled = false,
}: {
  isTransparent?: boolean;
  scrolled?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 transition-transform duration-300 sm:gap-3">
      {/* Botanical Jharokha Emblem */}
      <div
        className={`relative shrink-0 transition-all duration-300 ${
          scrolled ? "h-9 w-9 sm:h-10 sm:w-10" : "h-11 w-11 sm:h-12 sm:w-12"
        }`}
      >
        <GulabariLogo
          variant={isTransparent ? "light" : "dark"}
          mode="emblem"
          className="h-full w-full"
          priority
        />
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span
            className={`font-serif font-semibold tracking-[0.18em] uppercase transition-all duration-300 sm:tracking-[0.22em] ${
              scrolled ? "text-lg sm:text-xl md:text-2xl" : "text-xl sm:text-2xl md:text-3xl"
            } ${isTransparent ? "text-bone" : "text-madder"}`}
          >
            GULABARI
          </span>
          <span
            className={`font-mono text-[9px] font-medium tracking-[0.28em] uppercase transition-colors duration-300 sm:text-[10px] ${
              isTransparent ? "text-bone/80" : "text-teak"
            }`}
          >
            JAIPUR
          </span>
        </div>
        <span
          className={`mt-0.5 hidden font-serif text-[10px] tracking-wider italic transition-colors duration-300 md:block ${
            isTransparent ? "text-bone/70" : "text-ink-soft/80"
          }`}
        >
          Handcrafted Textiles · Timeless Stories
        </span>
      </div>
    </div>
  );
}
