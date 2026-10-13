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
          // overflow-y-auto on the outer layer + flex min-h-full items-center on the inner
          // layer keeps the dialog vertically centered when it fits, and scrolls naturally
          // when the content is taller than the viewport.
          className="fixed inset-0 z-[9999] overflow-y-auto backdrop-blur-[6px]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`${insight.title} preview`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
         <div className="flex min-h-full items-center justify-center px-4 py-10 sm:py-14">
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? {} : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onMouseDown={(event) => event.stopPropagation()}
            // White card so there's zero blue hue cast on the hero image or body copy.
            // max-w-xl keeps the dialog compact and focused; content still scrolls if it overflows.
            className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white text-trace-ink shadow-[0_30px_90px_rgba(0,0,0,0.4)] ring-1 ring-black/5"
          >
            {/* Thin teal → mint top accent for brand continuity */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-trace-teal via-trace-mint to-trace-teal" />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-trace-ink shadow-md ring-1 ring-black/10 backdrop-blur-sm transition-all hover:bg-white hover:scale-105"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {/* Hero image — rendered at natural proportions, no color overlay. */}
            <div className="relative overflow-hidden bg-trace-paper">
              {insight.image ? (
                <img
                  src={insight.image}
                  alt=""
                  className="block h-auto max-h-[280px] w-full object-contain"
                />
              ) : (
                <div className="aspect-[16/7] bg-gradient-to-br from-trace-mint via-trace-teal/40 to-trace-navy" />
              )}
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-trace-ink/85 px-3 py-1 font-mono text-[9px] font-bold tracking-[0.16em] text-trace-mint backdrop-blur-sm">
                <span className="h-1 w-1 rounded-full bg-trace-teal" />
                {insight.type.toUpperCase()} · {insight.date.toUpperCase()}
              </span>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6">
              <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-trace-teal">TRACE NEWS &amp; FEATURES</p>
              <h2 className="mt-2.5 font-display text-xl font-extrabold leading-[1.1] tracking-[-0.045em] text-trace-ink sm:text-2xl">
                {insight.title}
              </h2>
              <p className="mt-3.5 text-[13px] leading-6 text-trace-muted">{insight.summary}</p>

              {/* CTA row */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-trace-ink/10 pt-4">
                {insight.sourceUrl && (
                  <a
                    href={insight.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-trace-orange px-4 py-2 text-xs font-extrabold text-white shadow-[0_8px_22px_rgba(244,122,32,0.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(244,122,32,0.46)]"
                  >
                    {insight.sourceLabel ?? "Open original source"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <Link
                  href={`/latest-updates/${insight.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-lg border border-trace-ink/15 bg-white px-4 py-2 text-xs font-extrabold text-trace-ink transition-all hover:border-trace-teal hover:bg-trace-paper hover:text-trace-teal"
                >
                  Read full story <ArrowUpRight className="h-3.5 w-3.5 text-trace-teal" />
                </Link>
                <button
                  onClick={onClose}
                  type="button"
                  className="ml-auto text-xs font-bold text-trace-muted transition-colors hover:text-trace-ink"
                >
                  Keep exploring
                </button>
              </div>
            </div>
          </motion.article>
         </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(node, document.body);
}
