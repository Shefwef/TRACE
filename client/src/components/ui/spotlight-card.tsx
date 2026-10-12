/**
 * GlowCard — pointer-tracking spotlight card.
 * Adapted from the shared "spotlight-card" pattern and re-tuned for the TRACE palette
 * so the spotlight glow lands as teal / mint / navy instead of generic blue.
 *
 * The spotlight follows the global pointer so the glow behaves consistently across a
 * row of cards (not a per-card hover effect). On touch devices the pointer never moves,
 * so the border simply reads as a calm elevated chip.
 */
import React, { useEffect, useRef, ReactNode, CSSProperties } from "react";

type GlowColor = "teal" | "navy" | "mint" | "orange";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
  /** When true, skips the component's default w/h sizing — use className for layout control. */
  customSize?: boolean;
}

/** HSL hue bases tuned to TRACE brand colours. The spread controls how far the hue can shift as the pointer moves. */
const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
  teal:   { base: 185, spread: 50 },   // #009CA6 lives around hue 185
  navy:   { base: 210, spread: 60 },   // #123D67 lives around hue 210
  mint:   { base: 170, spread: 40 },   // soft version of teal/mint
  orange: { base: 25,  spread: 50 },   // #F47A20 accent
};

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "teal",
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = (e: PointerEvent) => {
      if (!cardRef.current) return;
      const el = cardRef.current;
      el.style.setProperty("--x", e.clientX.toFixed(2));
      el.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
      el.style.setProperty("--y", e.clientY.toFixed(2));
      el.style.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(2));
    };
    document.addEventListener("pointermove", sync);
    return () => document.removeEventListener("pointermove", sync);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const style = {
    "--base": base,
    "--spread": spread,
    "--radius": "18",
    "--border": "1.5",
    "--backdrop": "rgba(255, 255, 255, 0.72)",
    "--backup-border": "rgba(18, 61, 103, 0.12)",
    "--size": "260",
    "--outer": "1",
    "--border-size": "calc(var(--border, 1.5) * 1px)",
    "--spotlight-size": "calc(var(--size, 240) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    "--saturation": "88",
    "--lightness": "72",
    "--bg-spot-opacity": "0.08",
    "--border-spot-opacity": "0.9",
    "--border-light-opacity": "0.55",
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 185) calc(var(--saturation, 88) * 1%) calc(var(--lightness, 72) * 1%) / var(--bg-spot-opacity, 0.08)),
      transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    touchAction: "none",
  } as unknown as CSSProperties;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={style}
        className={`relative rounded-2xl shadow-[0_14px_40px_rgba(8,36,64,0.08)] backdrop-blur-[6px] ${customSize ? "" : "p-6"} ${className}`}
      >
        <div data-glow />
        {children}
      </div>
    </>
  );
};

const beforeAfterStyles = `
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    -webkit-mask-clip: padding-box, border-box;
    mask-composite: intersect;
    -webkit-mask-composite: source-in;
  }
  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 185) calc(var(--saturation, 88) * 1%) calc(var(--lightness, 56) * 1%) / var(--border-spot-opacity, 0.9)),
      transparent 100%
    );
    filter: brightness(1.4);
  }
  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(0 100% 100% / var(--border-light-opacity, 0.55)),
      transparent 100%
    );
  }
  [data-glow] [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--radius) * 1px);
    border-width: calc(var(--border-size) * 20);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }
  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`;
