"use client";

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="GULABARI JAIPUR — Handcrafted Textiles. Timeless Stories."
        className="h-full w-full object-contain"
        loading={priority ? "eager" : "lazy"}
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
    <div className="flex items-center gap-2 sm:gap-3 transition-transform duration-300">
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
            className={`font-serif tracking-[0.18em] sm:tracking-[0.22em] uppercase font-semibold transition-all duration-300 ${
              scrolled
                ? "text-lg sm:text-xl md:text-2xl"
                : "text-xl sm:text-2xl md:text-3xl"
            } ${isTransparent ? "text-bone" : "text-madder"}`}
          >
            GULABARI
          </span>
          <span
            className={`text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-mono font-medium transition-colors duration-300 ${
              isTransparent ? "text-bone/80" : "text-teak"
            }`}
          >
            JAIPUR
          </span>
        </div>
        <span
          className={`hidden md:block font-serif italic text-[10px] tracking-wider mt-0.5 transition-colors duration-300 ${
            isTransparent ? "text-bone/70" : "text-ink-soft/80"
          }`}
        >
          Handcrafted Textiles · Timeless Stories
        </span>
      </div>
    </div>
  );
}
