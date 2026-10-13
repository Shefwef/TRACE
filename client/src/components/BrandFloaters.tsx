/** Full-viewport animated brand floaters.
 *
 *  Renders a fixed layer behind all content with ~16 slowly drifting spheres in TRACE
 *  teal / navy / mint. Each sphere has an independent slow randomised path driven by
 *  framer-motion so the motion stays organic (not synced). Pointer events pass through.
 *
 *  Mounted once in Shell so it appears on every page without touching individual sections.
 *  z-index 0 inside pointer-events-none, with mix-blend-mode so the colour reads well on
 *  both light and dark backgrounds.
 */
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type FloaterSeed = {
  id: number;
  /** 0-100 — percent of viewport width where the sphere lives. */
  xPct: number;
  /** 0-100 — percent of viewport height. */
  yPct: number;
  /** Diameter in rem (so it scales with font size). */
  sizeRem: number;
  /** Horizontal / vertical travel distance in pixels for the drift loop. */
  travelX: number;
  travelY: number;
  /** Loop duration in seconds. */
  duration: number;
  /** Playback delay (seconds) so spheres start out of sync. */
  delay: number;
  /** Which brand hue to tint the gradient with. */
  hue: "teal" | "navy" | "mint" | "orange";
  /** Peak opacity for the gradient — kept low so this stays ambient, not loud. */
  opacity: number;
  /** Blur px — large values make the sphere read as a soft glow. */
  blur: number;
};

/** Deterministic — same positions on every render. Values are tuned for mix-blend-mode: multiply
 *  so each sphere multiplies against the section bg to produce a soft brand tint on light surfaces. */
const SEEDS: FloaterSeed[] = [
  // Large brand anchors
  { id: 1,  xPct: 6,   yPct: 8,  sizeRem: 24, travelX: 70, travelY: 40,  duration: 28, delay: 0.0, hue: "teal",  opacity: 0.55, blur: 60 },
  { id: 2,  xPct: 92,  yPct: 14, sizeRem: 30, travelX: -80, travelY: 50, duration: 34, delay: 2.5, hue: "navy",  opacity: 0.55, blur: 72 },
  { id: 3,  xPct: 78,  yPct: 76, sizeRem: 26, travelX: -55, travelY: -65, duration: 30, delay: 4.0, hue: "teal",  opacity: 0.50, blur: 66 },
  { id: 4,  xPct: 14,  yPct: 82, sizeRem: 28, travelX: 60, travelY: -50, duration: 32, delay: 1.5, hue: "navy",  opacity: 0.52, blur: 72 },
  { id: 5,  xPct: 48,  yPct: 46, sizeRem: 22, travelX: 45, travelY: 30,  duration: 26, delay: 3.0, hue: "mint",  opacity: 0.55, blur: 58 },
  // Medium secondary spheres
  { id: 6,  xPct: 32,  yPct: 20, sizeRem: 13, travelX: 75, travelY: 25,  duration: 22, delay: 0.8, hue: "teal",  opacity: 0.45, blur: 40 },
  { id: 7,  xPct: 68,  yPct: 28, sizeRem: 11, travelX: -45, travelY: 60, duration: 24, delay: 2.0, hue: "navy",  opacity: 0.42, blur: 36 },
  { id: 8,  xPct: 24,  yPct: 58, sizeRem: 15, travelX: -35, travelY: -40, duration: 25, delay: 5.0, hue: "teal",  opacity: 0.42, blur: 46 },
  { id: 9,  xPct: 86,  yPct: 54, sizeRem: 13, travelX: -60, travelY: 25, duration: 23, delay: 1.0, hue: "mint",  opacity: 0.48, blur: 40 },
  { id: 10, xPct: 56,  yPct: 72, sizeRem: 12, travelX: 50, travelY: -35,  duration: 27, delay: 3.5, hue: "navy",  opacity: 0.42, blur: 38 },
  // Tiny accent dots
  { id: 11, xPct: 18,  yPct: 32, sizeRem: 6,  travelX: 85, travelY: 55,  duration: 20, delay: 0.5, hue: "teal",  opacity: 0.60, blur: 14 },
  { id: 12, xPct: 72,  yPct: 44, sizeRem: 5,  travelX: -70, travelY: -30, duration: 19, delay: 2.2, hue: "mint",  opacity: 0.62, blur: 10 },
  { id: 13, xPct: 42,  yPct: 10, sizeRem: 6,  travelX: 55, travelY: 70,  duration: 21, delay: 1.2, hue: "navy",  opacity: 0.55, blur: 12 },
  { id: 14, xPct: 60,  yPct: 86, sizeRem: 5,  travelX: -75, travelY: -40, duration: 23, delay: 4.5, hue: "teal",  opacity: 0.58, blur: 10 },
  { id: 15, xPct: 10,  yPct: 60, sizeRem: 7,  travelX: 65, travelY: -55, duration: 25, delay: 3.0, hue: "mint",  opacity: 0.60, blur: 16 },
  { id: 16, xPct: 90,  yPct: 36, sizeRem: 6,  travelX: -80, travelY: 60, duration: 22, delay: 0.3, hue: "navy",  opacity: 0.52, blur: 12 },
];

/** Brand hex values — tuned so each hue reads at the specified alpha against both light and dark bgs. */
const HUE_RGB: Record<FloaterSeed["hue"], string> = {
  teal:   "0, 156, 166",
  navy:   "18, 61, 103",
  mint:   "90, 190, 185",  // deeper mint so it stays visible on white
  orange: "244, 122, 32",
};

export function BrandFloaters() {
  const reduceMotion = useReducedMotion();
  const seeds = useMemo(() => SEEDS, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{
        // z: 1 keeps us above the Shell's background but below content layers that use higher z-indexes.
        zIndex: 1,
        // multiply lets each sphere blend with the section color behind it so the floaters show
        // through solid section backgrounds (bg-white, bg-trace-paper) as a soft brand tint.
        mixBlendMode: "multiply",
      }}
    >
      {seeds.map((seed) => {
        const rgb = HUE_RGB[seed.hue];
        return (
          <motion.div
            key={seed.id}
            className="absolute rounded-full"
            initial={{
              x: 0,
              y: 0,
              opacity: seed.opacity * 0.6,
              scale: 0.95,
            }}
            animate={
              reduceMotion
                ? { opacity: seed.opacity * 0.8, scale: 1 }
                : {
                    // Figure-8-ish organic drift — motion goes to each corner over the loop
                    x: [0, seed.travelX, seed.travelX * -0.4, seed.travelX * 0.6, 0],
                    y: [0, seed.travelY, seed.travelY * -0.5, seed.travelY * 0.3, 0],
                    opacity: [seed.opacity * 0.6, seed.opacity, seed.opacity * 0.7, seed.opacity * 0.9, seed.opacity * 0.6],
                    scale: [0.95, 1.08, 0.98, 1.04, 0.95],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0.3 }
                : {
                    duration: seed.duration,
                    delay: seed.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            style={{
              left: `${seed.xPct}%`,
              top: `${seed.yPct}%`,
              width: `${seed.sizeRem}rem`,
              height: `${seed.sizeRem}rem`,
              background: `radial-gradient(circle, rgba(${rgb}, 1) 0%, rgba(${rgb}, 0.5) 45%, rgba(${rgb}, 0) 72%)`,
              filter: `blur(${seed.blur}px)`,
              willChange: "transform, opacity",
              // mix-blend-mode: multiply ensures the sphere reads correctly on both light
              // (dark multiply = visible color) and dark (barely visible shade) backgrounds.
              // We'd prefer plus-lighter but it over-brightens dark sections.
              mixBlendMode: "normal",
              transform: "translate3d(0, 0, 0)",
            }}
          />
        );
      })}
    </div>
  );
}
