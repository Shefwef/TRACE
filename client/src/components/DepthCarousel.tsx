/** Civic Signal Field component: a media-first ScrollDepth 3D coverflow stage for TRACE's Featured Insights.
 *  Progression comes from (a) a continuous slow auto-drift (pause on hover/focus/drag), (b) horizontal pointer drag,
 *  (c) mouse-wheel/trackpad over the stage, and (d) page scroll — scrolling down nudges cards right, up nudges left,
 *  additive to the auto-drift. Smoothed by a soft spring so transitions feel buttery.
 *  Inspired by Framer's ScrollDepth 3D Carousel; implemented locally with framer-motion to avoid an extra dep. */
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring, useTransform, type PanInfo } from "framer-motion";
import { FileText } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { insights, type Insight } from "@/data/traceData";
import { InsightPreviewDialog } from "@/components/InsightPreviewDialog";
import { ShineBorder } from "@/components/ui/ShineBorder";

const fallbackPatterns = ["from-[#0B9FA8] via-[#064a5a] to-[#071B2B]", "from-[#081f35] via-[#175879] to-[#ff7a3d]", "from-[#765542] via-[#1c3947] to-[#0b9fa8]", "from-[#073647] via-[#0b9fa8] to-[#b9f3ec]", "from-[#582941] via-[#101f38] to-[#ff7a3d]"];

const SECONDS_PER_CARD = 7;
// How much drag distance moves one card width — tune for feel.
const DRAG_PX_PER_CARD = 240;
// Wheel sensitivity — larger value means more wheel delta needed to advance.
const WHEEL_PX_PER_CARD = 320;
// Page-scroll sensitivity — advance one card for every ~500px of page scroll.
const PAGE_SCROLL_PX_PER_CARD = 500;

export function DepthCarousel() {
  const [preview, setPreview] = useState<Insight | null>(null);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const systemReduceMotion = useReducedMotion();
  const captureMode = typeof navigator !== "undefined" && navigator.webdriver;
  const reduceMotion = Boolean(systemReduceMotion || captureMode);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const position = useMotionValue(0);
  // Softer, longer-tailed spring for the ScrollDepth-style buttery feel.
  const smoothPosition = useSpring(position, { stiffness: 42, damping: 24, mass: 1.1 });
  const glow = useTransform(smoothPosition, [0, insights.length], [0.4, 0.4]);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);
  // Snap debounce — after wheel/drag stops, snap position to nearest integer.
  const snapTimerRef = useRef<number | null>(null);

  const setPosition = useCallback((next: number) => {
    positionRef.current = next;
    position.set(next);
  }, [position]);

  const scheduleSnap = useCallback(() => {
    if (reduceMotion) return;
    if (snapTimerRef.current) window.clearTimeout(snapTimerRef.current);
    snapTimerRef.current = window.setTimeout(() => {
      const nearest = Math.round(positionRef.current);
      setPosition(nearest);
    }, 180);
  }, [reduceMotion, setPosition]);

  // Auto-drift — pauses on hover, focus, drag.
  useAnimationFrame((time) => {
    if (reduceMotion || paused || dragging) {
      lastTimeRef.current = time;
      return;
    }
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = time;
      return;
    }
    const dt = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;
    setPosition(positionRef.current + dt / SECONDS_PER_CARD);
  });

  useEffect(() => {
    const unsubscribe = smoothPosition.on("change", (latest) => {
      const nearest = ((Math.round(latest) % insights.length) + insights.length) % insights.length;
      setDisplayIndex((current) => (current === nearest ? current : nearest));
    });
    return unsubscribe;
  }, [smoothPosition]);

  const jumpTo = useCallback((index: number) => {
    const target = ((index % insights.length) + insights.length) % insights.length;
    const current = positionRef.current;
    const currentMod = ((current % insights.length) + insights.length) % insights.length;
    const forward = ((target - currentMod) + insights.length) % insights.length;
    const backward = forward - insights.length;
    const delta = Math.abs(forward) <= Math.abs(backward) ? forward : backward;
    setPosition(current + delta);
  }, [setPosition]);

  // Horizontal pointer-drag → nudges position by drag distance.
  const handleDrag = useCallback((_: unknown, info: PanInfo) => {
    setPosition(positionRef.current - info.delta.x / DRAG_PX_PER_CARD);
  }, [setPosition]);

  const handleDragStart = useCallback(() => {
    setDragging(true);
    if (snapTimerRef.current) window.clearTimeout(snapTimerRef.current);
  }, []);

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    setDragging(false);
    // Add a bit of inertia from velocity, then snap.
    const velocityNudge = -info.velocity.x / (DRAG_PX_PER_CARD * 6);
    setPosition(positionRef.current + velocityNudge);
    scheduleSnap();
  }, [scheduleSnap, setPosition]);

  // Wheel: horizontal takes priority; fall back to vertical.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduceMotion) return;
    const onWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 2) return;
      // Only hijack the wheel while the cursor is over the stage AND the primary intent looks horizontal
      // (horizontal wheel from trackpads, or shift+wheel). Vertical page scroll stays untouched otherwise.
      if (Math.abs(event.deltaX) < Math.abs(event.deltaY) && !event.shiftKey) return;
      event.preventDefault();
      setPosition(positionRef.current + delta / WHEEL_PX_PER_CARD);
      scheduleSnap();
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [reduceMotion, scheduleSnap, setPosition]);

  // Page scroll → additive nudge to the carousel (ScrollDepth-style).
  // Scrolling down the page drifts cards right; scrolling up drifts them left.
  useEffect(() => {
    if (reduceMotion) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastY;
      lastY = current;
      if (Math.abs(delta) < 1) return;
      setPosition(positionRef.current + delta / PAGE_SCROLL_PX_PER_CARD);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduceMotion, setPosition]);

  useEffect(() => () => {
    if (snapTimerRef.current) window.clearTimeout(snapTimerRef.current);
  }, []);

  return (
    <section className="relative overflow-hidden bg-trace-paper py-24 sm:py-32" aria-labelledby="featured-insights-heading">
      <motion.div className="pointer-events-none absolute left-1/2 top-[46%] h-[300px] w-[680px] -translate-x-1/2 rounded-full bg-trace-mint/30 blur-[105px]" style={{ opacity: glow }} />
      <div className="relative mx-auto max-w-[1480px] px-5 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">FEATURED INSIGHTS</p>
          <h2 id="featured-insights-heading" className="mt-5 font-display text-5xl font-extrabold tracking-[-0.065em] text-trace-ink sm:text-6xl">Follow the idea.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-trace-muted">Scroll, drag, or swipe — browse the evidence behind the policies, systems, and decisions shaping Bangladesh’s next economy.</p>
        </div>

        <motion.div
          ref={stageRef}
          role="region"
          aria-label="Featured insights carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
          }}
          onPanStart={handleDragStart}
          onPan={handleDrag}
          onPanEnd={handleDragEnd}
          className={`relative mt-16 h-[455px] touch-pan-y select-none outline-none sm:h-[510px] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ perspective: "1400px" }}
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
        </motion.div>

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
  // Tighter X spread + strong Z depth = ScrollDepth 3D fan.
  const x = useTransform(offset, (o) => `${o * 44}%`);
  const z = useTransform(offset, (o) => -Math.abs(o) * 160);
  const scale = useTransform(offset, (o) => {
    const abs = Math.abs(o);
    if (abs < 1) return 1 - abs * 0.14;
    return Math.max(0.6, 0.86 - abs * 0.12);
  });
  const opacity = useTransform(offset, (o) => {
    const abs = Math.abs(o);
    if (abs < 1) return 1 - abs * 0.6;
    return Math.max(0, 0.4 - (abs - 1) * 0.3);
  });
  const visibility = useTransform(offset, (o) => Math.abs(o) > 2.8 ? "hidden" : "visible");
  const rotateY = useTransform(offset, (o) => o * -8);
  // Plain integer derived each render — avoids per-frame z-index repaints.
  const smoothMod = ((smoothPosition.get() % total) + total) % total;
  const zIndex = Math.round(10 - Math.min(Math.abs(index - smoothMod), total - Math.abs(index - smoothMod)));

  const image = insight.image;
  const cardBody = (
    <>
      <div className={`relative aspect-[16/8.7] overflow-hidden rounded-t-2xl bg-gradient-to-br ${fallbackPatterns[patternIndex % fallbackPatterns.length]}`}>
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
      style={{ x, z, scale, opacity, rotateY, zIndex, visibility, transformStyle: "preserve-3d" }}
      className="absolute left-1/2 top-0 w-[min(78vw,590px)] -translate-x-1/2 origin-center will-change-transform"
    >
      {isFocus ? (
        <button
          type="button"
          onClick={onFocusOpen}
          aria-label={`Preview ${insight.title}`}
          className="group relative block w-full overflow-hidden rounded-2xl bg-white text-left shadow-[0_28px_65px_rgba(7,27,43,0.22)]"
        >
          <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={9} borderWidth={1.5} />
          {cardBody}
        </button>
      ) : (
        <button
          type="button"
          onClick={onFocusRequest}
          aria-label={`Bring ${insight.title} to the center`}
          className="group relative block w-full overflow-hidden rounded-2xl border border-trace-ink/8 bg-white text-left shadow-[0_16px_38px_rgba(7,27,43,0.08)]"
        >
          <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={13} borderWidth={1.5} />
          {cardBody}
        </button>
      )}
    </motion.article>
  );
}
