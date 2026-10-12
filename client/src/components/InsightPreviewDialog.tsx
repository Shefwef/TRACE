/** Civic Signal Field component: full-blackout preview modal for an insight or news item.
 *  Overlay fully darkens the viewport (including the fixed header, which sits at z-50) by
 *  rendering at z-[100] with a near-opaque black backdrop. The dialog itself is deep navy
 *  with white typography so it reads as a focused, cinematic preview. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { type Insight } from "@/data/traceData";

export function InsightPreviewDialog({ insight, onClose }: { insight: Insight | null; onClose: () => void }) {
  const reduceMotion = useReducedMotion();

  // Esc closes.
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  // Lock page scroll while the dialog is open so the darkened state feels fully modal.
  useEffect(() => {
    if (!insight) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [insight]);

  return (
    <AnimatePresence>
      {insight && (
        <motion.div
          // z-[100] sits above the SiteHeader (z-50) so the backdrop covers the top bar too.
          // Near-opaque black + heavy blur guarantees everything behind is out of focus.
          className="fixed inset-0 z-[100] grid place-items-center bg-black/92 px-4 py-6 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`${insight.title} preview`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? {} : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative max-h-[94vh] w-full max-w-3xl overflow-auto rounded-2xl bg-trace-ink text-white shadow-[0_40px_120px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
          >
            {/* Thin teal top accent for brand continuity */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-trace-teal via-trace-mint to-trace-teal" />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm ring-1 ring-white/15 transition-colors hover:bg-white/18"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Hero image */}
            <div className="relative aspect-[16/6] overflow-hidden rounded-t-2xl bg-gradient-to-br from-trace-teal/40 via-trace-navy to-trace-ink">
              {insight.image && (
                <img src={insight.image} alt="" className="h-full w-full object-cover opacity-55" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-trace-ink via-trace-ink/50 to-transparent" />
              <p className="absolute bottom-4 left-6 font-mono text-[10px] font-bold tracking-[0.22em] text-trace-mint">
                {insight.type.toUpperCase()} · {insight.date.toUpperCase()}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-trace-mint">TRACE NEWS &amp; FEATURES</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold leading-[1.1] tracking-[-0.05em] text-white sm:text-3xl">
                {insight.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/72">{insight.summary}</p>

              {/* CTA row */}
              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
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
                  href={`/insights/${insight.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-extrabold text-white backdrop-blur-sm transition-all hover:border-trace-teal hover:bg-white/10"
                >
                  View TRACE record <ArrowUpRight className="h-4 w-4 text-trace-mint" />
                </Link>
                <button
                  onClick={onClose}
                  type="button"
                  className="ml-auto text-sm font-bold text-white/60 transition-colors hover:text-white"
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
}
