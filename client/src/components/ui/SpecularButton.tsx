/** SpecularButton: mouse-aware button with a shine that tracks the cursor within a proximity radius. Adapted for the TRACE design system. */
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export interface SpecularButtonProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export default function SpecularButton({
  children,
  size = "lg",
  radius = 18,
  tint = "#ffffff",
  tintOpacity = 0,
  blur = 0,
  textColor = "#f5f5f5",
  lineColor = "#ffffff",
  baseColor = "#525252",
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  href,
  target,
  rel,
  ariaLabel,
}: SpecularButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, active: 0 });

  useEffect(() => {
    if (disabled) return;
    if (autoAnimate) {
      let raf = 0;
      let t = 0;
      const tick = () => {
        t += speed;
        const x = 50 + Math.sin(t) * 45;
        const y = 50 + Math.cos(t * 0.9) * 30;
        setPos({ x, y, active: intensity });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }
    if (!followMouse) return;
    const handle = (event: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(event.clientX - cx, event.clientY - cy);
      if (dist < proximity) {
        const rx = ((event.clientX - rect.left) / rect.width) * 100;
        const ry = ((event.clientY - rect.top) / rect.height) * 100;
        const activity = 1 - Math.min(1, dist / proximity);
        setPos({
          x: Math.max(-15, Math.min(115, rx)),
          y: Math.max(-15, Math.min(115, ry)),
          active: activity,
        });
      } else {
        setPos((prev) => (prev.active === 0 ? prev : { ...prev, active: 0 }));
      }
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [followMouse, autoAnimate, speed, proximity, intensity, disabled]);

  const sizeClass =
    size === "sm"
      ? "px-5 py-2.5 text-xs"
      : size === "md"
        ? "px-6 py-3 text-sm"
        : "px-7 py-3.5 text-sm sm:text-base";

  const shineRadius = Math.max(60, shineSize * 22);
  const activeOpacity = pos.active * intensity;

  const style: CSSProperties = {
    borderRadius: `${radius}px`,
  };

  const commonClass = `specular-button group relative isolate inline-flex select-none items-center justify-center overflow-hidden font-display font-extrabold tracking-tight transition-transform duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 ${sizeClass} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: baseColor, borderRadius: "inherit" }}
      />
      {tintOpacity > 0 && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: tint, opacity: tintOpacity, borderRadius: "inherit" }}
        />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "inherit",
          background: `radial-gradient(${shineRadius}px circle at ${pos.x}% ${pos.y}%, ${lineColor}, transparent ${shineFade}%)`,
          opacity: Math.min(1, activeOpacity * 0.9 + 0.12),
          mixBlendMode: "screen",
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          transition: `opacity ${Math.max(0.15, speed)}s ease-out`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "inherit",
          background: `linear-gradient(180deg, ${lineColor}22 0%, transparent 42%, transparent 58%, ${lineColor}18 100%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "inherit",
          border: `${thickness}px solid ${lineColor}`,
          opacity: 0.4,
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2" style={{ color: textColor }}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        style={style}
        className={commonClass}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      style={style}
      className={commonClass}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
