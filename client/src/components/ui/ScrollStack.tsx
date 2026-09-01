/** ScrollStack — sticky-pin stacking cards. Native CSS sticky handles the pin (no JS jank), JS only interpolates scale/opacity. */
import React, { useLayoutEffect, useRef, useCallback, type ReactNode, Children } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  /** px between stacked cards (top offset stagger) */
  stackOffset?: number;
  /** top pin offset in vh (%) */
  topPercent?: number;
  /** how much smaller each behind-card gets per depth */
  scaleStep?: number;
  /** min card height */
  cardMinHeight?: number;
  /** vertical gap between cards in normal flow */
  itemGap?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  stackOffset = 22,
  topPercent = 15,
  scaleStep = 0.04,
  cardMinHeight = 420,
  itemGap = 40,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const wrappersRef = useRef<HTMLElement[]>([]);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardBottomsRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastScalesRef = useRef<Map<number, number>>(new Map());

  const recomputeOffsets = useCallback(() => {
    const wrappers = wrappersRef.current;
    const bottoms: number[] = [];
    for (let i = 0; i < wrappers.length; i++) {
      const rect = wrappers[i].getBoundingClientRect();
      bottoms.push(rect.top + window.scrollY + rect.height);
    }
    cardBottomsRef.current = bottoms;
  }, []);

  const updateScales = useCallback(() => {
    const cards = cardsRef.current;
    const bottoms = cardBottomsRef.current;
    if (!cards.length) return;
    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const topPx = (topPercent / 100) * containerHeight;
    const total = cards.length;

    for (let i = 0; i < total; i++) {
      const card = cards[i];
      // A card is "behind" if any later card's pinned top has scrolled past this card's pin point.
      // Simpler heuristic: how many cards have been scrolled past (their bottom is above our pin line).
      let behindCount = 0;
      for (let j = i + 1; j < total; j++) {
        // Card j has fully arrived when its wrapper top hits the pin line
        const jTopArriveScroll = bottoms[j] - card.getBoundingClientRect().height - topPx - stackOffset * i - itemGap;
        if (scrollTop >= jTopArriveScroll) behindCount++;
      }

      // Also: how much progress toward the next card taking over (for smooth scale transition)
      let nextProgress = 0;
      if (i + 1 < total) {
        const nextStart = bottoms[i] - containerHeight; // when this card's bottom reaches viewport bottom
        const nextEnd = bottoms[i];                     // when its bottom leaves viewport top
        if (scrollTop >= nextStart) {
          nextProgress = Math.min(1, Math.max(0, (scrollTop - nextStart) / Math.max(1, nextEnd - nextStart)));
        }
      }

      const targetScale = 1 - behindCount * scaleStep - nextProgress * scaleStep * 0.5;
      const last = lastScalesRef.current.get(i);
      if (last === undefined || Math.abs(last - targetScale) > 0.0015) {
        card.style.transform = `scale(${targetScale.toFixed(4)})`;
        lastScalesRef.current.set(i, targetScale);
      }
    }
  }, [scaleStep, stackOffset, topPercent, itemGap]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const wrappers = Array.from(scroller.querySelectorAll(".scroll-stack-wrapper")) as HTMLElement[];
    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    wrappersRef.current = wrappers;
    cardsRef.current = cards;
    const cache = lastScalesRef.current;

    cards.forEach((card) => {
      card.style.willChange = "transform";
      card.style.transformOrigin = "center top";
      card.style.backfaceVisibility = "hidden";
    });

    recomputeOffsets();

    let rafPending = false;
    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      rafRef.current = requestAnimationFrame(() => {
        rafPending = false;
        updateScales();
      });
    };
    const onResize = () => {
      recomputeOffsets();
      updateScales();
    };

    updateScales();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    const t1 = window.setTimeout(onResize, 300);
    const t2 = window.setTimeout(onResize, 1500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      wrappersRef.current = [];
      cardsRef.current = [];
      cardBottomsRef.current = [];
      cache.clear();
    };
  }, [stackOffset, topPercent, scaleStep, cardMinHeight, itemGap, recomputeOffsets, updateScales]);

  const items = Children.toArray(children);

  return (
    <div className={`scroll-stack-scroller relative w-full ${className}`.trim()} ref={scrollerRef}>
      <div className="pt-[6vh] pb-[8vh]">
        {items.map((child, i) => (
          <div
            key={i}
            className="scroll-stack-wrapper sticky"
            style={{
              top: `calc(${topPercent}vh + ${i * stackOffset}px)`,
              zIndex: i + 1,
              marginBottom: i < items.length - 1 ? `${itemGap}px` : 0,
              minHeight: `${cardMinHeight}px`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollStack;
