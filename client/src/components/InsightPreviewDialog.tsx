/** Civic Signal Field component: darkened pre-navigation preview for an insight or news item. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { type Insight } from "@/data/traceData";

export function InsightPreviewDialog({ insight, onClose }: { insight: Insight | null; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && onClose(); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, [onClose]);
  return <AnimatePresence>{insight && <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-trace-ink/85 px-5 py-8 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={`${insight.title} preview`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
    <motion.article initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? {} : { opacity: 0, y: 10, scale: 0.98 }} transition={{ type: "spring", stiffness: 280, damping: 28 }} onMouseDown={(event) => event.stopPropagation()} className="relative max-h-[88vh] w-full max-w-3xl overflow-auto bg-white shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <button type="button" onClick={onClose} aria-label="Close preview" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-trace-ink/75 text-white backdrop-blur-sm transition-colors hover:bg-trace-ink"><X className="h-5 w-5" /></button>
      <div className="relative aspect-[16/7] bg-gradient-to-br from-trace-teal to-trace-ink">{insight.image && <img src={insight.image} alt="" className="h-full w-full object-cover opacity-80" />}<div className="absolute inset-0 bg-gradient-to-t from-trace-ink/85 via-transparent to-transparent" /><p className="absolute bottom-6 left-7 font-mono text-[10px] font-bold tracking-[0.18em] text-trace-mint">{insight.type.toUpperCase()} · {insight.date.toUpperCase()}</p></div>
      <div className="p-7 sm:p-10"><p className="section-label">TRACE NEWS & FEATURES</p><h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.065em] text-trace-ink sm:text-5xl">{insight.title}</h2><p className="mt-6 max-w-2xl text-base leading-7 text-trace-muted">{insight.summary}</p><div className="mt-9 flex flex-wrap gap-3">{insight.sourceUrl && <a href={insight.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-trace-navy px-5 py-3 text-sm font-extrabold text-white">{insight.sourceLabel ?? "Open original source"} <ExternalLink className="h-4 w-4 text-trace-mint" /></a>}<Link href={`/insights/${insight.slug}`} className="inline-flex items-center gap-2 border border-trace-navy/14 px-5 py-3 text-sm font-extrabold text-trace-ink">View TRACE record <ArrowUpRight className="h-4 w-4 text-trace-teal" /></Link><button onClick={onClose} type="button" className="px-5 py-3 text-sm font-extrabold text-trace-ink">Keep exploring</button></div></div>
    </motion.article>
  </motion.div>}</AnimatePresence>;
}
