/** Civic Signal Field component: a light preview modal for an insight or news item.
 *
 *  Rendered via React portal into document.body so the overlay escapes any ancestor
 *  stacking context and fully covers the fixed site header. The backdrop is a soft
 *  dark wash — not opaque — so the page is still faintly visible underneath, and the
 *  dialog itself is a crisp white card so the hero image and body copy read at full
 *  contrast with no blue hue cast over them. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { type Insight } from "@/data/traceData";

export function InsightPreviewDialog({ insight, onClose }: { insight: Insight | null; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Portal target only becomes available after mount.
  useEffect(() => setMounted(true), []);

  // Esc closes.
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  // Lock body scroll while the dialog is open.
  useEffect(() => {
    if (!insight) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [insight]);

  if (!mounted) return null;

  const node = (
    <AnimatePresence>
      {insight && (
        <motion.div
          // z-[9999] + portal into document.body guarantees the overlay sits above every
          // other UI layer including the fixed site header.
          // Backdrop: translucent black with a soft blur — darkens the page but lets the
          // site faintly show through, so the dialog reads as a focused layer, not a blackout.
          className="fixed inset-0 z-[9999] grid place-items-start overflow-y-auto px-4 py-10 backdrop-blur-[6px] sm:py-14"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`${insight.title} preview`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? {} : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onMouseDown={(event) => event.stopPropagation()}
            // White card so there's zero blue hue cast on the hero image or body copy.
            // Wider max-w-4xl + no vertical height cap so long articles / tall images render in full.
            className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white text-trace-ink shadow-[0_40px_120px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
          >
            {/* Thin teal → mint top accent for brand continuity */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-trace-teal via-trace-mint to-trace-teal" />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-trace-ink shadow-md ring-1 ring-black/10 backdrop-blur-sm transition-all hover:bg-white hover:scale-105"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Hero image — rendered at natural proportions, no color overlay, so the
                image reads at full fidelity. Category + date pill floats on top-left. */}
            <div className="relative overflow-hidden bg-trace-paper">
              {insight.image ? (
                <img
                  src={insight.image}
                  alt=""
                  className="block h-auto max-h-[480px] w-full object-contain"
                />
              ) : (
                <div className="aspect-[16/7] bg-gradient-to-br from-trace-mint via-trace-teal/40 to-trace-navy" />
              )}
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-trace-ink/85 px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.18em] text-trace-mint backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-trace-teal" />
                {insight.type.toUpperCase()} · {insight.date.toUpperCase()}
              </span>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-9">
              <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-trace-teal">TRACE NEWS &amp; FEATURES</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold leading-[1.08] tracking-[-0.05em] text-trace-ink sm:text-3xl">
                {insight.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-trace-muted">{insight.summary}</p>

              {/* CTA row */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-trace-ink/10 pt-6">
                {insight.sourceUrl && (
                  <a
                    href={insight.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-trace-orange px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(244,122,32,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(244,122,32,0.5)]"
                  >
                    {insight.sourceLabel ?? "Open original source"}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <Link
                  href={`/latest-updates/${insight.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-lg border border-trace-ink/15 bg-white px-5 py-2.5 text-sm font-extrabold text-trace-ink transition-all hover:border-trace-teal hover:bg-trace-paper hover:text-trace-teal"
                >
                  Read full story <ArrowUpRight className="h-4 w-4 text-trace-teal" />
                </Link>
                <button
                  onClick={onClose}
                  type="button"
                  className="ml-auto text-sm font-bold text-trace-muted transition-colors hover:text-trace-ink"
                >
                  Keep exploring
                </button>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(node, document.body);
}
