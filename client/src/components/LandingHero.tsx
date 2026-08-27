/** TRACE accessible light foundation: cinematic policy imagery stays present beneath a lighter navy overlay, stable auto-rotation, and high-contrast calls to action. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { heroSlides } from "@/data/traceData";

const AUTO_ADVANCE_MS = 5000;

export function LandingHero() {
  const [index, setIndex] = useState(0);
  const systemReduceMotion = useReducedMotion();
  const captureMode = typeof navigator !== "undefined" && navigator.webdriver;
  const reduceMotion = Boolean(systemReduceMotion || captureMode);
  const current = heroSlides[index];

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setTimeout(() => setIndex((currentIndex) => (currentIndex + 1) % heroSlides.length), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [index, reduceMotion]);

  const shift = (direction: -1 | 1) => {
    setIndex((currentIndex) => (currentIndex + direction + heroSlides.length) % heroSlides.length);
  };
  const selectSlide = (nextIndex: number) => {
    setIndex(nextIndex);
  };
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-trace-navy" aria-label="TRACE Consulting introduction" aria-roledescription="carousel">
      <AnimatePresence mode="wait">
        <motion.div key={current.label} initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? {} : { opacity: 0 }} transition={{ duration: 0.82, ease: [0.23, 1, 0.32, 1] }} className="absolute inset-0">
          <img src={current.image} alt="" className={`hero-scene h-full w-full object-cover object-center opacity-100 ${index === 0 ? "hero-scene-opening" : ""}`} />
          <div className={`absolute inset-0 ${index === 0 ? "bg-[linear-gradient(90deg,rgba(18,61,103,0.59)_0%,rgba(18,61,103,0.39)_38%,rgba(18,61,103,0.11)_66%,rgba(8,36,64,0.43)_100%)]" : "bg-[linear-gradient(90deg,rgba(18,61,103,0.64)_0%,rgba(18,61,103,0.44)_38%,rgba(18,61,103,0.14)_66%,rgba(8,36,64,0.48)_100%)]"}`} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.11)_0%,transparent_38%,rgba(8,36,64,0.12)_100%)]" />
          <div className="absolute inset-0 hero-grid opacity-56" />
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.2 }} className="signal-route signal-route-one" />
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.35, delay: 0.35 }} className="signal-route signal-route-two" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="pointer-events-none flex flex-1 items-center justify-center px-5 pb-12 pt-32 text-center lg:pb-14 lg:pt-36">
          <AnimatePresence mode="wait">
            <motion.div key={current.label} initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? {} : { opacity: 0, y: -16 }} transition={{ duration: 0.56, ease: [0.23, 1, 0.32, 1] }} className="max-w-6xl">
              <h1 className="font-display text-[clamp(2.85rem,6.55vw,6.25rem)] font-extrabold leading-[0.9] tracking-[-0.075em] text-white drop-shadow-[0_4px_18px_rgba(8,36,64,0.3)]">{current.headline}</h1>
              <div className="pointer-events-auto mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/projects" className="inline-flex min-w-[192px] items-center justify-center gap-3 bg-white/95 px-6 py-4 text-sm font-extrabold text-trace-navy shadow-[0_8px_26px_rgba(8,36,64,0.16)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-[0.97]">Explore our work <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/services" className="inline-flex min-w-[192px] items-center justify-center gap-3 border border-white/60 bg-[#123D67]/32 px-6 py-4 text-sm font-extrabold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#123D67]/48 active:scale-[0.97]">Explore services <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pointer-events-auto flex items-end justify-between px-5 pb-8 lg:px-10 lg:pb-10">
          <button onClick={() => document.getElementById("proof")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })} className="group hidden items-center gap-3 text-left sm:flex"><span className="font-mono text-[9px] font-bold tracking-[0.18em] text-white/62">SCROLL TO TRACE THE SYSTEM</span><ArrowDown className="h-4 w-4 text-trace-mint transition-transform group-hover:translate-y-1" /></button>
          <div className="ml-auto flex items-center gap-3" role="group" aria-label="Hero slideshow controls">
            <button onClick={() => shift(-1)} aria-label="Previous story" className="grid h-9 w-7 place-items-center text-white/55 transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" /></button>
            <div className="flex gap-2">{heroSlides.map((slide, dotIndex) => <button key={slide.label} aria-label={`Show ${slide.label}`} aria-current={dotIndex === index ? "true" : undefined} onClick={() => selectSlide(dotIndex)} className={`h-1.5 rounded-full transition-all duration-300 ${dotIndex === index ? "w-7 bg-trace-mint" : "w-1.5 bg-white/45 hover:bg-white"}`} />)}</div>
            <button onClick={() => shift(1)} aria-label="Next story" className="grid h-9 w-7 place-items-center text-white/55 transition-colors hover:text-white"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
