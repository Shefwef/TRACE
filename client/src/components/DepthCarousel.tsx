/** Civic Signal Field component: a media-first coverflow stage for TRACE's Featured Insights with a continuous marquee-style progression (no stepped auto-advance). */
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { FileText } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { insights, type Insight } from "@/data/traceData";
import { InsightPreviewDialog } from "@/components/InsightPreviewDialog";
import { StarBorder } from "@/components/ui/StarBorder";
import { ShineBorder } from "@/components/ui/ShineBorder";

const fallbackPatterns = ["from-[#0B9FA8] via-[#064a5a] to-[#071B2B]", "from-[#081f35] via-[#175879] to-[#ff7a3d]", "from-[#765542] via-[#1c3947] to-[#0b9fa8]", "from-[#073647] via-[#0b9fa8] to-[#b9f3ec]", "from-[#582941] via-[#101f38] to-[#ff7a3d]"];

const SECONDS_PER_CARD = 5.5;

export function DepthCarousel() {
  const [preview, setPreview] = useState<Insight | null>(null);
  const [paused, setPaused] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const systemReduceMotion = useReducedMotion();
  const captureMode = typeof navigator !== "undefined" && navigator.webdriver;
  const reduceMotion = Boolean(systemReduceMotion || captureMode);

  const position = useMotionValue(0);
  const smoothPosition = useSpring(position, { stiffness: 60, damping: 22, mass: 0.9 });
  const glow = useTransform(smoothPosition, [0, insights.length], [0.35, 0.35]);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);

  useAnimationFrame((time) => {
    if (reduceMotion || paused) {
      lastTimeRef.current = time;
      return;
    }
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = time;
      return;
    }
    const dt = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;
    positionRef.current = (positionRef.current + dt / SECONDS_PER_CARD) % insights.length;
    position.set(positionRef.current);
  });

  useEffect(() => {
    const unsubscribe = smoothPosition.on("change", (latest) => {
      const nearest = Math.round(latest) % insights.length;
      setDisplayIndex((current) => (current === nearest ? current : nearest));
    });
    return unsubscribe;
  }, [smoothPosition]);

  const jumpTo = useCallback((index: number) => {
    const target = ((index % insights.length) + insights.length) % insights.length;
    const current = positionRef.current;
    // Shortest wrap-around path.
    const forward = (target - current + insights.length) % insights.length;
    const backward = forward - insights.length;
    const delta = Math.abs(forward) <= Math.abs(backward) ? forward : backward;
    positionRef.current = current + delta;
    position.set(positionRef.current);
    // Normalise once the spring catches up to avoid unbounded growth.
    window.setTimeout(() => {
      const normalised = ((positionRef.current % insights.length) + insights.length) % insights.length;
      positionRef.current = normalised;
      position.jump(normalised);
    }, 700);
  }, [position]);

  return (
    <section className="relative overflow-hidden bg-trace-paper py-24 sm:py-32" aria-labelledby="featured-insights-heading">
      <motion.div className="pointer-events-none absolute left-1/2 top-[46%] h-[300px] w-[680px] -translate-x-1/2 rounded-full bg-trace-mint/30 blur-[105px]" style={{ opacity: glow }} />
      <div className="relative mx-auto max-w-[1480px] px-5 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">FEATURED INSIGHTS</p>
          <h2 id="featured-insights-heading" className="mt-5 font-display text-5xl font-extrabold tracking-[-0.065em] text-trace-ink sm:text-6xl">Follow the idea.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-trace-muted">Watch, read, and trace the evidence behind the policies, systems, and decisions shaping Bangladesh’s next economy.</p>
        </div>

        <div
          className="relative mt-16 h-[455px] sm:h-[510px]"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
          }}
        >
          {insights.map((insight, index) => (
            <InsightSlide
              key={insight.slug}
              insight={insight}
              index={index}
              patternIndex={index}
              total={insights.length}
              position={smoothPosition}
              smoothPosition={smoothPosition}
              isFocus={index === displayIndex}
              onFocusOpen={() => setPreview(insight)}
              onFocusRequest={() => jumpTo(index)}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Featured insights carousel selection">
          {insights.map((insight, index) => (
            <button
              key={insight.slug}
              role="tab"
              aria-label={`Bring ${insight.title} to the center`}
              aria-selected={index === displayIndex}
              onClick={() => jumpTo(index)}
              className={`h-1.5 rounded-full transition-all ${index === displayIndex ? "w-8 bg-trace-teal" : "w-1.5 bg-trace-ink/18 hover:bg-trace-ink/40"}`}
            />
          ))}
        </div>
      </div>
      <InsightPreviewDialog insight={preview} onClose={() => setPreview(null)} />
    </section>
  );
}

function InsightSlide({
  insight,
  index,
  patternIndex,
  total,
  position,
  smoothPosition,
  isFocus,
  onFocusOpen,
  onFocusRequest,
}: {
  insight: Insight;
  index: number;
  patternIndex: number;
  total: number;
  position: import("framer-motion").MotionValue<number>;
  smoothPosition: import("framer-motion").MotionValue<number>;
  isFocus: boolean;
  onFocusOpen: () => void;
  onFocusRequest: () => void;
}) {
  const offset = useTransform(position, (latest) => {
    const raw = index - latest;
    // Wrap into [-total/2, total/2] so cards travel the shortest path.
    const wrapped = ((raw % total) + total) % total;
    return wrapped > total / 2 ? wrapped - total : wrapped;
  });
  const x = useTransform(offset, (o) => `${o * 52}%`);
  const scale = useTransform(offset, (o) => {
    const abs = Math.abs(o);
    if (abs < 1) return 1 - abs * 0.1;
    return Math.max(0.72, 0.9 - abs * 0.08);
  });
  const opacity = useTransform(offset, (o) => {
    const abs = Math.abs(o);
    if (abs < 1) return 1 - abs * 0.35;
    // Clamp minimum to 0.08 — prevents sub-pixel shimmer at near-invisible opacity
    return Math.max(0.08, 0.62 - abs * 0.12);
  });
  const rotateY = useTransform(offset, (o) => o * -8);
  // Plain integer derived each render — avoids per-frame z-index repaints
  const zIndex = Math.round(10 - Math.abs(index - Math.round(smoothPosition.get())));

  const image = insight.image;
  const cardBody = (
    <>
      <div className={`relative aspect-[16/8.7] overflow-hidden bg-gradient-to-br ${fallbackPatterns[patternIndex % fallbackPatterns.length]}`}>
        {image && (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-82 transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/65 via-transparent to-transparent" />
        <span className="absolute bottom-5 left-6 font-mono text-[10px] font-bold tracking-[0.18em] text-white/78">
          {insight.type.toUpperCase()} · {insight.date.toUpperCase()}
        </span>
      </div>
      <div className="bg-white px-6 py-6 sm:px-8 sm:py-7">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-teal">
          <FileText className="h-3.5 w-3.5" />
          {isFocus ? "OPEN INSIGHT" : "CLICK TO FOCUS"}
        </div>
        <h3 className="mt-3 font-display text-2xl font-extrabold leading-[1.08] tracking-[-0.045em] text-trace-ink sm:text-3xl">{insight.title}</h3>
        {isFocus && <p className="mt-4 text-sm leading-6 text-trace-muted">{insight.summary}</p>}
      </div>
    </>
  );

  return (
    <motion.article
      style={{ x, scale, opacity, rotateY, zIndex }}
      className="absolute left-1/2 top-0 w-[min(78vw,590px)] -translate-x-1/2 origin-center"
    >
      {isFocus ? (
        <StarBorder color="#009CA6" speed="6s">
          <button
            type="button"
            onClick={onFocusOpen}
            aria-label={`Preview ${insight.title}`}
            className="group relative block w-full overflow-hidden bg-white text-left shadow-[0_28px_65px_rgba(7,27,43,0.18)]"
          >
            <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={9} borderWidth={1} />
            {cardBody}
          </button>
        </StarBorder>
      ) : (
        <button
          type="button"
          onClick={onFocusRequest}
          aria-label={`Bring ${insight.title} to the center`}
          className="group relative block w-full overflow-hidden border border-trace-ink/8 bg-white text-left shadow-[0_16px_38px_rgba(7,27,43,0.08)]"
        >
          <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={13} borderWidth={1} />
          {cardBody}
        </button>
      )}
    </motion.article>
  );
}
