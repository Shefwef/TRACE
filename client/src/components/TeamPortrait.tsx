/** Consistent portrait treatment with a polished monogram fallback for team profiles without an approved photo. */
import { cn } from "@/lib/utils";
import { type TeamMember } from "@/data/traceData";

/** Deterministic gradient per member slug — keeps the placeholder stable across renders and visually varied across the grid. */
const PLACEHOLDER_GRADIENTS = [
  "from-[#D7F3F0] via-[#A6DCDF] to-[#5FB1B9]", // mint → teal
  "from-[#DDE8F3] via-[#8FB0D1] to-[#3F6B9A]", // ice → navy
  "from-[#E8F4F7] via-[#7FC2CA] to-[#009CA6]", // paper → teal
  "from-[#EEF4FA] via-[#95ADC5] to-[#123D67]", // light blue → navy
  "from-[#D5EEF0] via-[#60AFB7] to-[#0A2B4A]", // mint → ink
];

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash << 5) - hash + slug.charCodeAt(i);
  return Math.abs(hash);
}

export function TeamPortrait({ member, className, imageClassName }: { member: TeamMember; className?: string; imageClassName?: string }) {
  if (member.image) {
    return (
      <div className={cn("overflow-hidden bg-trace-paper", className)}>
        <img
          src={member.image}
          alt={`Portrait of ${member.name}`}
          className={cn("h-full w-full object-cover object-center", imageClassName)}
        />
      </div>
    );
  }
  // Monogram placeholder — gradient background keyed off slug, oversized initials, subtle TRACE wordmark label.
  const gradient = PLACEHOLDER_GRADIENTS[hashSlug(member.slug) % PLACEHOLDER_GRADIENTS.length];
  return (
    <div
      aria-label={`${member.name} portrait placeholder`}
      className={cn(
        "relative grid place-items-center overflow-hidden bg-gradient-to-br",
        gradient,
        className,
      )}
    >
      {/* Subtle dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle 1.2px at 1px 1px, rgba(255,255,255,0.65) 0%, transparent 100%)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Soft radial glow behind the monogram */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(255,255,255,0.35) 0%, transparent 72%)" }}
      />
      {/* Monogram */}
      <span className="relative font-display text-[clamp(3rem,22%,6rem)] font-black tracking-[-0.065em] text-white/95 drop-shadow-[0_4px_12px_rgba(8,36,64,0.35)]">
        {member.initials}
      </span>
      {/* Brand chip at the bottom */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-trace-ink/55 px-3 py-1 font-mono text-[9px] font-bold tracking-[0.22em] text-white/90 backdrop-blur-sm">
        TRACE
      </span>
    </div>
  );
}
