/** ScrollStack — framer-motion driven stacking cards. Each card scales down + sticks as the next card scrolls over it. Smooth by construction (spring-interpolated). */
import React, { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

// Re-exported so consumers can keep <ScrollStackItem>...</ScrollStackItem> markup;
// the actual per-card layout is handled by ScrollStack itself.
export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = "" }) => (
  <div className={itemClassName}>{children}</div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  /** Vertical space (px) each card gets in the scroll timeline. Higher = slower stack. */
  cardHeight?: number;
  /** How much smaller each subsequent-behind card gets. 0.05 = 5% smaller. */
  scaleStep?: number;
  /** Top offset (px) where cards pin. */
  topOffset?: number;
  /** Stagger (px) between stacked card tops so a bit of the card behind peeks out. */
  stackOffset?: number;
}

const StackCard: React.FC<{
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  cardHeight: number;
  scaleStep: number;
  topOffset: number;
  stackOffset: number;
  children: ReactNode;
}> = ({ index, total, scrollYProgress, scaleStep, topOffset, stackOffset, children }) => {
  // Each card owns a slice of the timeline: card i starts scaling when i+1 begins to arrive.
  const sliceStart = index / total;
  const sliceEnd = (index + 1) / total;

  // Cards behind the top card shrink to a target scale as the next one covers them.
  const targetScale = 1 - (total - 1 - index) * scaleStep;
  const scale = useTransform(scrollYProgress, [sliceStart, sliceEnd], [1, targetScale]);

  // Smooth spring so tiny scroll deltas don't cause visible jumps.
  const smoothScale = useSpring(scale, { stiffness: 180, damping: 28, mass: 0.4 });

  return (
    <div
      className="sticky w-full"
      style={{
        top: `${topOffset + index * stackOffset}px`,
        // Ensure a stacking context so sticky cards layer cleanly over one another.
        zIndex: index + 1,
        marginBottom: 0,
      }}
    >
      <motion.div
        style={{
          scale: smoothScale,
          transformOrigin: "center top",
          height: "auto",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  cardHeight = 520,
  scaleStep = 0.05,
  topOffset = 100,
  stackOffset = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = React.Children.toArray(children);
  const total = items.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Progress runs from 0 (top of stack reaches viewport) to 1 (top of last card reaches pin).
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className={className}
      // Give the section enough scroll length: one card-height per card past the first.
      style={{ position: "relative", paddingBottom: `${cardHeight * 0.4}px` }}
    >
      {items.map((child, i) => (
        <div key={i} style={{ marginBottom: i < total - 1 ? `${cardHeight * 0.15}px` : 0 }}>
          <StackCard
            index={i}
            total={total}
            scrollYProgress={scrollYProgress}
            cardHeight={cardHeight}
            scaleStep={scaleStep}
            topOffset={topOffset}
            stackOffset={stackOffset}
          >
            {child}
          </StackCard>
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;
