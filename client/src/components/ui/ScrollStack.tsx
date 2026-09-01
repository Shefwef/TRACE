/** ScrollStack — React Bits stacking-card scroll effect. Cards pin and scale as they enter the stack. Window-scroll driven. */
import React, { useLayoutEffect, useRef, useCallback, type ReactNode } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card relative w-full my-6 origin-top will-change-transform ${itemClassName}`.trim()}>
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
  const rafRef = useRef<number | null>(null);
  const lastTransformsRef = useRef(new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>());

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) return (parseFloat(value) / 100) * containerHeight;
    return parseFloat(value as string);
  }, []);

  const calcProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const updateTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endEl = scrollerRef.current?.querySelector(".scroll-stack-end") as HTMLElement | null;
    const endElementTop = endEl ? endEl.getBoundingClientRect().top + window.scrollY : 0;

    cards.forEach((card, i) => {
      const cardTop = card.getBoundingClientRect().top + window.scrollY;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calcProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jTop = cards[j].getBoundingClientRect().top + window.scrollY;
          const jTriggerStart = jTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newT = { translateY, scale, rotation, blur };
      const last = lastTransformsRef.current.get(i);
      const changed = !last ||
        Math.abs(last.translateY - newT.translateY) > 0.5 ||
        Math.abs(last.scale - newT.scale) > 0.002 ||
        Math.abs(last.rotation - newT.rotation) > 0.2 ||
        Math.abs(last.blur - newT.blur) > 0.2;

      if (changed) {
        card.style.transform = `translate3d(0,${newT.translateY.toFixed(2)}px,0) scale(${newT.scale.toFixed(3)}) rotate(${newT.rotation.toFixed(2)}deg)`;
        card.style.filter = newT.blur > 0.05 ? `blur(${newT.blur.toFixed(2)}px)` : "";
        lastTransformsRef.current.set(i, newT);
      }
    });
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount, parsePercentage, calcProgress]);

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

    let rafPending = false;
    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      rafRef.current = requestAnimationFrame(() => {
        rafPending = false;
        updateTransforms();
      });
    };

    updateTransforms();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cardsRef.current = [];
      transformsCache.clear();
    };
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount, updateTransforms]);

  return (
    <div className={`scroll-stack-scroller relative w-full ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner pt-[10vh] pb-[40vh]">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
