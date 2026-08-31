/** React Bits Carousel — adapted for TRACE pillar cards (navy/teal palette, drag + spring). */
import { useEffect, useMemo, useRef, useState, type JSX, type ReactNode } from "react";
import { motion, type PanInfo, useMotionValue, useTransform } from "framer-motion";

export interface PillarCarouselItem {
  title: string;
  description: string;
  id: number;
  icon?: ReactNode;
}

export interface PillarCarouselProps {
  items?: PillarCarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 };

function PillarCard({
  item,
  index,
  itemWidth,
  round,
  trackItemOffset,
  x,
  transition,
}: {
  item: PillarCarouselItem;
  index: number;
  itemWidth: number;
  round: boolean;
  trackItemOffset: number;
  x: ReturnType<typeof useMotionValue<number>>;
  transition: object;
}) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const rotateY = useTransform(x, range, [90, 0, -90], { clamp: false });

  return (
    <motion.div
      className={`relative shrink-0 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing ${
        round
          ? "items-center justify-center text-center bg-trace-navy"
          : "items-start justify-between bg-gradient-to-br from-trace-navy via-[#123D67] to-[#0a2b4a] border border-white/12"
      }`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "100%",
        rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={transition}
    >
      {!round && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-trace-teal via-trace-mint to-trace-teal" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-trace-mint/20" />
          <div className="pointer-events-none absolute -right-4 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full border border-white/10" />
        </>
      )}

      <div className="flex flex-col p-6 pt-5">
        <p className="font-mono text-[9px] font-bold tracking-[0.18em] text-trace-mint">
          STEP 0{(index % 3) + 1}
        </p>
        <h3 className="mt-4 font-display text-2xl font-extrabold leading-[1.02] tracking-[-0.05em] text-white">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/82">{item.description}</p>
        <p className="mt-auto pt-6 font-mono text-[9px] font-bold tracking-[0.18em] text-trace-mint/75">
          EVIDENCE · DELIVERY · OWNERSHIP
        </p>
      </div>
    </motion.div>
  );
}

export default function PillarCarousel({
  items = [],
  baseWidth = 330,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: PillarCarouselProps): JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop || items.length === 0) return items;
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState<number>(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const el = containerRef.current;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return;
    if (pauseOnHover && isHovered) return;
    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const start = loop ? 1 : 0;
    setPosition(start);
    x.set(-start * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const last = itemsForRender.length - 1;
    if (position === last) {
      setIsJumping(true);
      setPosition(1);
      x.set(-1 * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
      return;
    }
    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
      return;
    }
    setIsAnimating(false);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const dir =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;
    if (dir === 0) return;
    setPosition((prev) => Math.max(0, Math.min(prev + dir, itemsForRender.length - 1)));
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round ? "rounded-full border border-white/20" : "border border-white/10"
      }`}
      style={{ width: `${baseWidth}px`, ...(round && { height: `${baseWidth}px` }) }}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <PillarCard
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, index) => (
          <motion.button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index}
            className="h-1.5 rounded-full border-0 p-0 appearance-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trace-teal"
            style={{
              background: activeIndex === index ? "#009CA6" : "rgba(215,243,240,0.25)",
            }}
            animate={{ width: activeIndex === index ? 24 : 6 }}
            onClick={() => setPosition(loop ? index + 1 : index)}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
