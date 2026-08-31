/** InfiniteMovingCards: continuously scrolling card marquee adapted from Aceternity UI. Supports horizontal (left/right) and vertical (up/down) direction, adjustable speed, and pause-on-hover. */
import { useEffect, useRef, useState, type ReactNode } from "react";

export type InfiniteMovingCardsDirection = "left" | "right" | "up" | "down";
export type InfiniteMovingCardsSpeed = "fast" | "normal" | "slow";

export interface InfiniteMovingCardsProps {
  items: ReactNode[];
  direction?: InfiniteMovingCardsDirection;
  speed?: InfiniteMovingCardsSpeed;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  gapClassName?: string;
  ariaLabel?: string;
}

const durationBySpeed: Record<InfiniteMovingCardsSpeed, string> = {
  fast: "22s",
  normal: "42s",
  slow: "72s",
};

const isVerticalDirection = (direction: InfiniteMovingCardsDirection) => direction === "up" || direction === "down";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className = "",
  itemClassName = "",
  gapClassName = "",
  ariaLabel,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [ready, setReady] = useState(false);
  const vertical = isVerticalDirection(direction);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const directionValue = direction === "left" || direction === "up" ? "forwards" : "reverse";
    container.style.setProperty("--imc-direction", directionValue);
    container.style.setProperty("--imc-duration", durationBySpeed[speed]);
    setReady(true);
  }, [direction, speed]);

  const orientationClass = vertical
    ? "imc-vertical flex flex-col"
    : "imc-horizontal flex flex-row";

  const trackClass = vertical
    ? `imc-track flex flex-col ${gapClassName || "gap-4"}`
    : `imc-track flex flex-row ${gapClassName || "gap-5"}`;

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      data-pause-on-hover={pauseOnHover || undefined}
      className={`imc-container relative overflow-hidden ${vertical ? "h-full" : "w-full"} ${orientationClass} ${className}`}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 250ms ease" }}
    >
      <ul
        ref={trackRef}
        className={`${trackClass} shrink-0`}
        style={{ animationPlayState: "running" }}
      >
        {items.map((item, index) => (
          <li
            key={`imc-a-${index}`}
            className={`shrink-0 ${itemClassName}`}
          >
            {item}
          </li>
        ))}
        {items.map((item, index) => (
          <li
            key={`imc-b-${index}`}
            aria-hidden="true"
            className={`shrink-0 ${itemClassName}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
