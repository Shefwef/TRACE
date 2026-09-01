/** ScrollStack — React Bits stacking-card scroll effect. Offsets cached once, transforms computed via rAF-throttled scroll. */
import React, { useLayoutEffect, useRef, useCallback, type ReactNode } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card relative w-full origin-top will-change-transform ${itemClassName}`.trim()}>
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  // Cached layout — only recomputed on resize/mount, NOT on every scroll frame.
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTransformsRef = useRef(new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>());

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) return (parseFloat(value) / 100) * containerHeight;
    return parseFloat(value as string);
  }, []);

  const recomputeOffsets = useCallback(() => {
    const cards = cardsRef.current;
    const offsets: number[] = [];
    for (let i = 0; i < cards.length; i++) {
      offsets.push(cards[i].getBoundingClientRect().top + window.scrollY);
    }
    cardOffsetsRef.current = offsets;
    const endEl = scrollerRef.current?.querySelector(".scroll-stack-end") as HTMLElement | null;
    endOffsetRef.current = endEl ? endEl.getBoundingClientRect().top + window.scrollY : 0;
  }, []);

  const updateTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endOffsetRef.current;
    const offsets = cardOffsetsRef.current;
    // Global pin release: same for every card so no card jumps at a different moment.
    // Guard: if the end element is too close, keep the current pin baseline (avoids negative range).
    const pinEnd = Math.max(endElementTop - containerHeight / 2, offsets[cards.length - 1] || 0);

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = offsets[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;

      let scaleProgress = 0;
      if (scrollTop >= triggerStart) {
        scaleProgress = scrollTop >= triggerEnd ? 1 : (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      }

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jTriggerStart = offsets[j] - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      // Pin translation — clamp between 0 and (pinEnd - cardTop + offset).
      let translateY = 0;
      const pinnedOffset = stackPositionPx + itemStackDistance * i;
      if (scrollTop >= pinStart) {
        const desired = scrollTop - cardTop + pinnedOffset;
        const maxDesired = pinEnd - cardTop + pinnedOffset;
        translateY = Math.min(desired, maxDesired);
      }

      const last = lastTransformsRef.current.get(i);
      const changed = !last ||
        Math.abs(last.translateY - translateY) > 0.1 ||
        Math.abs(last.scale - scale) > 0.0015 ||
        Math.abs(last.rotation - rotation) > 0.1 ||
        Math.abs(last.blur - blur) > 0.1;

      if (changed) {
        // Round to whole pixels to eliminate subpixel flicker.
        const ty = Math.round(translateY);
        card.style.transform = `translate3d(0,${ty}px,0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(2)}deg)`;
        card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";
        lastTransformsRef.current.set(i, { translateY, scale, rotation, blur });
      }
    }
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount, parsePercentage]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
    });

    recomputeOffsets();

    // Direct scroll handler — no rAF gap. scroll events already coalesce with the compositor.
    const onScroll = () => updateTransforms();

    const onResize = () => {
      recomputeOffsets();
      updateTransforms();
    };

    updateTransforms();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Recompute offsets after images/fonts load (they can change document height).
    const t1 = window.setTimeout(onResize, 300);
    const t2 = window.setTimeout(onResize, 1200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cardsRef.current = [];
      cardOffsetsRef.current = [];
      transformsCache.clear();
    };
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount, recomputeOffsets, updateTransforms]);

  return (
    <div className={`scroll-stack-scroller relative w-full ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner pt-[8vh] pb-[30vh]">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
