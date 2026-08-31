/** ScrollStack: cards stack on top of each other as the user scrolls, adapted from React Bits. Uses position: sticky with graduated top offsets and Framer Motion for scale-on-cover; wraps the section in an optional Lenis smooth-scroll enhancer. */
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Children, cloneElement, isValidElement, useEffect, useRef, type ReactNode } from "react";

export interface ScrollStackItemProps {
  children: ReactNode;
  className?: string;
  /** Injected by ScrollStack; do not set manually. */
  index?: number;
  /** Injected by ScrollStack; do not set manually. */
  total?: number;
  /** Injected by ScrollStack; do not set manually. */
  progress?: MotionValue<number>;
  /** Injected by ScrollStack; do not set manually. */
  stackTopBase?: number;
  /** Injected by ScrollStack; do not set manually. */
  stackTopStep?: number;
}

export function ScrollStackItem({
  children,
  className = "",
  index = 0,
  total = 1,
  progress,
  stackTopBase = 96,
  stackTopStep = 26,
}: ScrollStackItemProps) {
  const fallbackProgress = useMotionValue(0);
  const activeProgress = progress ?? fallbackProgress;
  const start = index / Math.max(total, 1);
  const end = (index + 1) / Math.max(total, 1);
  const scale = useTransform(activeProgress, [start, end], [1, 0.96]);
  const top = stackTopBase + index * stackTopStep;
  const zIndex = index + 1;

  return (
    <div
      data-scroll-stack-item
      data-sticky="true"
      className={`scroll-stack-item mb-6 sm:mb-8 ${className}`}
      style={{ top: `${top}px`, zIndex }}
    >
      <motion.div style={{ scale }} className="origin-top">
        {children}
      </motion.div>
    </div>
  );
}

export interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  stackTopBase?: number;
  stackTopStep?: number;
  enableLenis?: boolean;
}

export default function ScrollStack({
  children,
  className = "",
  stackTopBase = 96,
  stackTopStep = 26,
  enableLenis = true,
}: ScrollStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const items = Children.toArray(children).filter(isValidElement);
  const total = items.length;

  useEffect(() => {
    if (!enableLenis) return;
    let raf = 0;
    let lenisInstance: { raf: (time: number) => void; destroy: () => void } | null = null;
    let cancelled = false;
    (async () => {
      try {
        const LenisModule = await import("lenis");
        const LenisCtor = (LenisModule as unknown as { default: new (opts: Record<string, unknown>) => { raf: (time: number) => void; destroy: () => void } }).default;
        if (cancelled) return;
        lenisInstance = new LenisCtor({
          duration: 1.15,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        });
        const tick = (time: number) => {
          lenisInstance?.raf(time);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      } catch {
        // Lenis is optional — silently continue without smooth-scroll enhancement.
      }
    })();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenisInstance?.destroy();
    };
  }, [enableLenis]);

  return (
    <div ref={ref} className={`scroll-stack ${className}`}>
      {items.map((child, index) => {
        if (!isValidElement<ScrollStackItemProps>(child)) return child;
        return cloneElement(child, {
          index,
          total,
          progress: scrollYProgress,
          stackTopBase,
          stackTopStep,
          key: child.key ?? index,
        });
      })}
    </div>
  );
}
