/** Civic Signal Field component: infinite auto-scrolling Featured Insights rail with pause-on-hover, keyboard access, and preview-on-click. */
import { useReducedMotion } from "framer-motion";
import { FileText, PlayCircle } from "lucide-react";
import { useState } from "react";
import { insights, type Insight } from "@/data/traceData";
import { InsightPreviewDialog } from "@/components/InsightPreviewDialog";

const fallbackPatterns = [
  "from-[#0B9FA8] via-[#064a5a] to-[#071B2B]",
  "from-[#081f35] via-[#175879] to-[#ff7a3d]",
  "from-[#765542] via-[#1c3947] to-[#0b9fa8]",
  "from-[#073647] via-[#0b9fa8] to-[#b9f3ec]",
  "from-[#582941] via-[#101f38] to-[#ff7a3d]",
];

function InsightCard({ insight, index, onOpen }: { insight: Insight; index: number; onOpen: (insight: Insight) => void }) {
  const Icon = insight.type === "Video" ? PlayCircle : FileText;
  return (
    <button
      type="button"
      onClick={() => onOpen(insight)}
      aria-label={`Preview ${insight.title}`}
      className="group flex w-[300px] shrink-0 flex-col overflow-hidden border border-trace-ink/10 bg-white text-left shadow-[0_16px_38px_rgba(7,27,43,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:border-trace-teal/60 hover:shadow-[0_22px_50px_rgba(7,27,43,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trace-teal sm:w-[340px]"
    >
      <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${fallbackPatterns[index % fallbackPatterns.length]}`}>
        {insight.image && (
          <img src={insight.image} alt="" className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-white/94 px-2.5 py-1 font-mono text-[9px] font-black tracking-[0.14em] text-trace-navy shadow-sm">
          <Icon className="h-3 w-3 text-trace-teal" />
          {insight.type.toUpperCase()}
        </span>
        <span className="absolute bottom-4 left-4 font-mono text-[9px] font-bold tracking-[0.16em] text-white/85">{insight.date.toUpperCase()}</span>
      </div>
      <div className="flex min-h-[188px] flex-1 flex-col p-5 sm:p-6">
        <h3 className="line-clamp-3 font-display text-[1.35rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-trace-ink">{insight.title}</h3>
        <p className="mt-3 line-clamp-3 text-[13px] leading-5 text-trace-muted">{insight.summary}</p>
        <p className="mt-auto pt-4 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-teal">OPEN INSIGHT →</p>
      </div>
    </button>
  );
}

export function DepthCarousel() {
  const [preview, setPreview] = useState<Insight | null>(null);
  const systemReduceMotion = useReducedMotion();
  const captureMode = typeof navigator !== "undefined" && navigator.webdriver;
  const reduceMotion = Boolean(systemReduceMotion || captureMode);
  const railInsights = [...insights, ...insights];

  return (
    <section className="relative overflow-hidden bg-trace-paper py-20 sm:py-24" aria-labelledby="featured-insights-heading">
      <div className="pointer-events-none absolute left-1/2 top-[50%] h-[240px] w-[620px] -translate-x-1/2 rounded-full bg-trace-mint/20 blur-[100px]" />
      <div className="relative mx-auto max-w-[1480px] px-5 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">FEATURED INSIGHTS</p>
          <h2 id="featured-insights-heading" className="mt-5 font-display text-5xl font-extrabold tracking-[-0.065em] text-trace-ink sm:text-6xl">Follow the idea.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-trace-muted">Watch, read, and trace the evidence behind the policies, systems, and decisions shaping Bangladesh’s next economy.</p>
        </div>
      </div>

      <div className="insights-rail relative mt-12 overflow-hidden" data-static={reduceMotion ? "true" : undefined} aria-label="Featured insights (auto-scrolling)">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-trace-paper to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-trace-paper to-transparent sm:w-24" />
        <div className="insights-rail-track">
          {railInsights.map((insight, index) => (
            <InsightCard key={`${insight.slug}-${index}`} insight={insight} index={index} onOpen={setPreview} />
          ))}
        </div>
      </div>

      <InsightPreviewDialog insight={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
