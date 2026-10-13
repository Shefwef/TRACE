/**
 * Full-viewport video hero with timed headline + CTA overlays.
 *
 * The background video (Padma bridge cut, no baked-in text) is autoplayed muted
 * and loops. The headlines and CTAs that were previously burned into the metro
 * video are rendered here as DOM overlays, synced to the same timestamps so the
 * on-screen message and its call-to-action stay in lockstep.
 *
 * To add another frame, append an entry to `CTA_GROUPS` with its headline,
 * timing window, anchor position, and buttons.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";

/** Shared accent span — paints 1–2 keywords per headline in the brand orange. */
const Accent = ({ children }: { children: ReactNode }) => (
  <span className="text-trace-orange">{children}</span>
);

const VIDEO_SRC = "/media/hero/trace-hero-padma.mp4";

type CTAPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

type CTAGroup = {
  id: string;
  from: number;
  to: number;
  /** Headline that was previously burned into the metro video; now rendered over the Padma cut.
   *  Use `<Accent>…</Accent>` to paint 1–2 keywords in brand orange. */
  headline: ReactNode;
  /** Desktop (≥768px) position for the CTA pill(s). The headline anchors to the same column, above the pill. */
  position: CTAPosition;
  /** Mobile (<768px) override. Falls back to desktop `position` if omitted. */
  mobilePosition?: CTAPosition;
  /** Optional max-width for the group container (desktop only — mobile uses full width minus side gutters). */
  maxWidth?: string;
  /** Optional max-width for the headline block on desktop. */
  headlineMaxWidth?: string;
  buttons: Array<{ label: string; href: string; external?: boolean }>;
};

// All CTAs share a single vertical anchor (top: 78%, left: 11%) so the pill lands in
// visually the same spot across every frame. Headlines sit above the pill, anchored
// to the same left column so the message and CTA read as a single block.
const CTA_GROUPS: CTAGroup[] = [
  {
    // Frame 1 — "We help nations facilitate seamless trade" (5.80 → 8.05s)
    id: "trade-facilitation",
    from: 5.8,
    to: 8.05,
    headline: <>We help nations facilitate <Accent>seamless trade</Accent>.</>,
    position: { top: "78.2%", left: "10.5%" },
    mobilePosition: { bottom: "14%", left: "5%", right: "5%" },
    headlineMaxWidth: "720px",
    buttons: [
      { label: "Explore Trade Facilitation", href: "/services/trade-facilitation" },
    ],
  },
  {
    // Frame 2 — "We connect policy, technology, and institutions" (11.25 → 16.55s)
    id: "policy-regulatory-reform",
    from: 11.25,
    to: 16.55,
    headline: <>We <Accent>connect</Accent> policy, technology, and institutions.</>,
    position: { top: "78.2%", left: "10.25%" },
    mobilePosition: { bottom: "11%", left: "5%", right: "5%" },
    headlineMaxWidth: "780px",
    buttons: [
      { label: "Policy & Regulatory Reform", href: "/services/policy-regulatory-reform" },
    ],
  },
  {
    // Frame 3 — "We strengthen quality infrastructure" (19.05 → 20.50s)
    id: "quality-infrastructure",
    from: 19.05,
    to: 20.5,
    headline: <>We strengthen <Accent>quality infrastructure</Accent>.</>,
    position: { top: "74%", left: "10.2%" },
    mobilePosition: { bottom: "12%", left: "5%", right: "5%" },
    maxWidth: "680px",
    headlineMaxWidth: "720px",
    buttons: [
      { label: "BSTI Textile Testing", href: "/projects/bsti-textile-testing" },
      { label: "ISO/IEC 17025 Accreditation", href: "/projects/prtc-accreditation" },
    ],
  },
  {
    // Frame 4 — "We deliver solutions that create lasting impact" (22.90 → 25.20s)
    id: "technology-solutions",
    from: 22.9,
    to: 25.2,
    headline: <>We deliver solutions that create <Accent>lasting impact</Accent>.</>,
    position: { top: "73%", left: "10.20%" },
    mobilePosition: { bottom: "12%", left: "5%", right: "5%" },
    headlineMaxWidth: "720px",
    buttons: [
      { label: "Technology Solutions", href: "/services/technology-solutions" },
    ],
  },
  {
    // Frame 5 — "We build systems that economies rely on" (29.85 → 34.70s)
    id: "tariff-intel",
    from: 29.85,
    to: 34.7,
    headline: <>We build <Accent>systems</Accent> that economies rely on.</>,
    position: { top: "78.5%", left: "10%" },
    mobilePosition: { bottom: "14%", left: "5%", right: "5%" },
    headlineMaxWidth: "760px",
    buttons: [
      {
        label: "Open Tariff & Trade Intelligence Platform",
        href: "https://tariffintel.traceconsultingltd.com/",
        external: true,
      },
    ],
  },
];

/** True when the viewport matches a desktop/tablet breakpoint (≥768px). */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 768px)").matches;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const systemReduceMotion = useReducedMotion();
  const captureMode = typeof navigator !== "undefined" && navigator.webdriver;
  const reduceMotion = Boolean(systemReduceMotion || captureMode);
  const isDesktop = useIsDesktop();

  /** Poll currentTime via rAF for smooth CTA sync (timeupdate only fires ~4x/sec). */
  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      const video = videoRef.current;
      if (video && !video.paused) {
        setTime(video.currentTime);
      }
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  /** Ensure autoplay kicks in — some browsers delay the first frame unless we nudge play(). */
  const handleCanPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        /* Autoplay blocked (very rare for muted inline video). Fall back silently. */
      });
    }
  }, []);

  /** Toggle video playback. When paused, the CTA logic naturally freezes on the current
   *  `time` state (we only call setTime while playing) — so whichever CTA is on-screen stays. */
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, []);

  /** Scroll past the hero to the next page section. */
  const scrollToNext = useCallback(() => {
    const section = sectionRef.current;
    const nextTarget = section?.getBoundingClientRect().bottom ?? window.innerHeight;
    window.scrollTo({ top: window.scrollY + nextTarget, behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-trace-navy"
      aria-label="TRACE Consulting introduction"
    >
      {/* Background video — object-position keeps the center-left region (yellow crane + text block) in view when cropped on narrow viewports. */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(event) => {
          const target = event.currentTarget;
          const err = target.error;
          const codeMap: Record<number, string> = {
            1: "MEDIA_ERR_ABORTED (user aborted)",
            2: "MEDIA_ERR_NETWORK (network failure)",
            3: "MEDIA_ERR_DECODE (decode failure)",
            4: "MEDIA_ERR_SRC_NOT_SUPPORTED (format/codec unsupported or 404)",
          };
          console.error("[VideoHero] Failed to load video", {
            src: target.currentSrc || target.src,
            readyState: target.readyState,
            networkState: target.networkState,
            errorCode: err?.code,
            errorName: err?.code ? codeMap[err.code] : "unknown",
            errorMessage: err?.message,
          });
        }}
        className="absolute inset-0 h-full w-full object-cover object-[35%_center]"
        aria-hidden="true"
      />

      {/* Vignette: a soft dim through the mid-band keeps the overlaid headline + CTA
          legible across every Padma frame without washing out the bridge itself. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-trace-ink/15 via-trace-ink/25 to-trace-ink/55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-trace-ink/35 via-trace-ink/10 to-transparent"
      />

      {/* Timed headline overlay — replaces the baked-in copy from the metro video. */}
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {CTA_GROUPS.map((group) => {
            const visible = time >= group.from && time <= group.to;
            if (!visible) return null;
            const activePosition = isDesktop ? group.position : (group.mobilePosition ?? group.position);
            return (
              <motion.h1
                key={`${group.id}-headline`}
                initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={
                  isDesktop
                    ? {
                        // Anchor headline by its BOTTOM so it sits comfortably above the CTA pill,
                        // leaving room for the message to breathe (~90px gap instead of hugging the button).
                        bottom: `calc(100% - ${activePosition.top ?? "78%"} + 90px)`,
                        left: activePosition.left,
                        right: activePosition.right,
                        maxWidth: group.headlineMaxWidth ?? "720px",
                      }
                    : {
                        // Mobile: lift headline further above the CTA so the two blocks don't crowd each other.
                        bottom: `calc(${activePosition.bottom ?? "14%"} + 150px)`,
                        left: activePosition.left ?? "5%",
                        right: activePosition.right ?? "5%",
                      }
                }
                className="absolute font-display text-[clamp(1.9rem,4.6vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.055em] text-white drop-shadow-[0_6px_28px_rgba(5,20,36,0.6)]"
              >
                {group.headline}
              </motion.h1>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Timed CTA overlay layer */}
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {CTA_GROUPS.map((group) => {
            const visible = time >= group.from && time <= group.to;
            if (!visible) return null;
            const activePosition = isDesktop ? group.position : (group.mobilePosition ?? group.position);
            return (
              <motion.div
                key={group.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: 0.08 }}
                style={{
                  top: activePosition.top,
                  bottom: activePosition.bottom,
                  left: activePosition.left,
                  right: activePosition.right,
                  maxWidth: isDesktop ? group.maxWidth : undefined,
                }}
                className="pointer-events-auto absolute flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                {group.buttons.map((button) => (
                  <HeroButton
                    key={button.href}
                    label={button.label}
                    href={button.href}
                    external={button.external}
                  />
                ))}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── BOTTOM-CENTER · Explore scroll hint ── */}
      <button
        type="button"
        onClick={scrollToNext}
        className="group absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/80 transition-colors hover:text-trace-teal sm:bottom-10"
      >
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.span>
        <span className="font-mono text-[10px] font-bold tracking-[0.2em]">EXPLORE</span>
      </button>

      {/* ── BOTTOM-RIGHT · Play/Pause toggle ──
          Pausing freezes the CTA state so whichever pill is on screen stays visible until play resumes. */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause hero video" : "Play hero video"}
        aria-pressed={!isPlaying}
        className="group absolute bottom-7 right-6 z-20 grid h-11 w-11 place-items-center rounded-xl border border-white/35 bg-white/10 text-white shadow-[0_14px_32px_rgba(8,36,64,0.4)] backdrop-blur-md transition-all duration-300 hover:border-trace-teal hover:bg-trace-teal hover:text-white sm:bottom-10 sm:right-10"
      >
        {isPlaying
          ? <Pause className="h-4 w-4 fill-current" />
          : <Play className="h-4 w-4 fill-current translate-x-[1px]" />}
      </button>
    </section>
  );
}

/**
 * Glass-morphism pill button with soft elevation.
 * Hover: liquid fill animates in from the left (not a plain background swap).
 */
function HeroButton({ label, href, external }: { label: string; href: string; external?: boolean }) {
  const content = (
    <>
      {/* Hover fill — a mint sheet that wipes in from the left */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-trace-mint/95 via-trace-mint/90 to-trace-teal/90 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      {/* Label flips to navy on hover for contrast against the mint fill */}
      <span className="relative z-10 text-sm font-extrabold tracking-wide text-white transition-colors duration-300 group-hover:text-trace-navy">
        {label}
      </span>
      <ArrowRight className="relative z-10 h-4 w-4 text-trace-mint transition-colors duration-300 group-hover:text-trace-navy" />
    </>
  );

  const className =
    "group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/35 bg-white/12 px-6 py-3.5 shadow-[0_14px_38px_rgba(8,36,64,0.45),0_2px_6px_rgba(8,36,64,0.3)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97] sm:w-auto sm:justify-start";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
