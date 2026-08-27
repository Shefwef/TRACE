/** Civic Signal Field component: a media-first coverflow stage for TRACE's Featured Insights. */
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { insights, type Insight } from "@/data/traceData";
import { InsightPreviewDialog } from "@/components/InsightPreviewDialog";

const fallbackPatterns = ["from-[#0B9FA8] via-[#064a5a] to-[#071B2B]", "from-[#081f35] via-[#175879] to-[#ff7a3d]", "from-[#765542] via-[#1c3947] to-[#0b9fa8]", "from-[#073647] via-[#0b9fa8] to-[#b9f3ec]", "from-[#582941] via-[#101f38] to-[#ff7a3d]"];

export function DepthCarousel() {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<Insight | null>(null);
  const [playing, setPlaying] = useState(true);
  const systemReduceMotion = useReducedMotion();
  const captureMode = typeof navigator !== "undefined" && navigator.webdriver;
  const reduceMotion = Boolean(systemReduceMotion || captureMode);
  const dragX = useMotionValue(0);
  const smoothX = useSpring(dragX, { stiffness: 280, damping: 28 });
  const glow = useTransform(smoothX, [-120, 0, 120], [0.25, 0.5, 0.25]);

  useEffect(() => {
    if (!playing || reduceMotion) return;
    const timer = window.setInterval(() => setActive((item) => (item + 1) % insights.length), 6500);
    return () => window.clearInterval(timer);
  }, [playing, reduceMotion]);

  const sideOffset = (index: number) => {
    const difference = (index - active + insights.length) % insights.length;
    if (difference === 0) return 0;
    if (difference === 1 || difference === -(insights.length - 1)) return 1;
    if (difference === insights.length - 1) return -1;
    return difference > insights.length / 2 ? difference - insights.length : difference;
  };

  return (
    <section className="relative overflow-hidden bg-trace-paper py-24 sm:py-32" aria-labelledby="featured-insights-heading">
      <motion.div className="pointer-events-none absolute left-1/2 top-[46%] h-[300px] w-[680px] -translate-x-1/2 rounded-full bg-trace-mint/30 blur-[105px]" style={{ opacity: glow }} />
      <div className="relative mx-auto max-w-[1480px] px-5 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">FEATURED INSIGHTS</p>
          <h2 id="featured-insights-heading" className="mt-5 font-display text-5xl font-extrabold tracking-[-0.065em] text-trace-ink sm:text-6xl">Follow the idea.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-trace-muted">Watch, read, and trace the evidence behind the policies, systems, and decisions shaping Bangladesh’s next economy.</p>
        </div>

        <div className="relative mt-16 h-[455px] sm:h-[510px]" onMouseEnter={() => setPlaying(false)} onMouseLeave={() => !reduceMotion && setPlaying(true)}>
          {insights.map((insight, index) => {
            const offset = sideOffset(index);
            const activeCard = offset === 0;
            const image = insight.image;
            const cardBody = <>
                  <div className={`relative aspect-[16/8.7] overflow-hidden bg-gradient-to-br ${fallbackPatterns[index % fallbackPatterns.length]}`}>
                    {image && <img src={image} alt="" className="h-full w-full object-cover opacity-82 transition-transform duration-700 group-hover:scale-105" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/65 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-6 font-mono text-[10px] font-bold tracking-[0.18em] text-white/78">{insight.type.toUpperCase()} · {insight.date.toUpperCase()}</span>
                  </div>
                  <div className="bg-white px-6 py-6 sm:px-8 sm:py-7"><div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-teal"><FileText className="h-3.5 w-3.5" />{activeCard ? "OPEN INSIGHT" : "CLICK TO FOCUS"}</div><h3 className="mt-3 font-display text-2xl font-extrabold leading-[1.08] tracking-[-0.045em] text-trace-ink sm:text-3xl">{insight.title}</h3>{activeCard && <p className="mt-4 text-sm leading-6 text-trace-muted">{insight.summary}</p>}</div>
                </>;
            return <motion.article key={insight.slug} animate={{ x: `${offset * 52}%`, scale: activeCard ? 1 : Math.max(0.72, 0.9 - Math.abs(offset) * 0.08), opacity: activeCard ? 1 : Math.max(0, 0.62 - Math.abs(offset) * 0.12), zIndex: activeCard ? 10 : 8 - Math.abs(offset), rotateY: offset * -8 }} transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.85 }} className="absolute left-1/2 top-0 w-[min(78vw,590px)] -translate-x-1/2 origin-center" style={{ perspective: 1200 }}>
              {activeCard ? <button type="button" onClick={() => setPreview(insight)} aria-label={`Preview ${insight.title}`} className="group block w-full overflow-hidden border border-trace-teal/55 bg-white text-left shadow-[0_28px_65px_rgba(7,27,43,0.18)]">{cardBody}</button> : <button type="button" onClick={() => setActive(index)} aria-label={`Bring ${insight.title} to the center`} className="group block w-full overflow-hidden border border-trace-ink/8 bg-white text-left shadow-[0_16px_38px_rgba(7,27,43,0.08)]">{cardBody}</button>}
            </motion.article>;
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Featured insights carousel selection">
          {insights.map((insight, index) => <button key={insight.slug} role="tab" aria-label={`Bring ${insight.title} to the center`} aria-selected={index === active} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-trace-teal" : "w-1.5 bg-trace-ink/18 hover:bg-trace-ink/40"}`} />)}
        </div>
      </div>
      <InsightPreviewDialog insight={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
