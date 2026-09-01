/** TRACE accessible light foundation: a systems-led positioning brief and scan-friendly project showcase using approved navy, turquoise, and existing TRACE project data. */
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ASSETS, services, type Service } from "@/data/traceData";
import { SectionReveal } from "@/components/SectionReveal";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { StarBorder } from "@/components/ui/StarBorder";
import { ShineBorder } from "@/components/ui/ShineBorder";
import SoftAurora from "@/components/ui/SoftAurora";

// TRACE logo colors: teal, orange, navy — one per pillar
const PILLAR_ACCENTS = [
  { color: "#009CA6", aurora1: "#009CA6", aurora2: "#D7F3F0", label: "TEAL"   },  // Evidence
  { color: "#F47A20", aurora1: "#F47A20", aurora2: "#FDE8D4", label: "ORANGE" },  // Delivery
  { color: "#123D67", aurora1: "#1a5a9a", aurora2: "#D7F3F0", label: "NAVY"   },  // Ownership
] as const;

const pillars = [
  {
    number: "01",
    tag: "EVIDENCE",
    title: "Evidence",
    body: "Policy intelligence, applied research, and data-driven diagnosis inform every mandate. We turn fragmented signals into a coherent picture that drives confident institutional decisions.",
  },
  {
    number: "02",
    tag: "DELIVERY",
    title: "Delivery",
    body: "Digital implementation, technology, and structured programme execution translate design into practice. Systems, tools, and traceable processes that work beyond the project lifecycle.",
  },
  {
    number: "03",
    tag: "OWNERSHIP",
    title: "Ownership",
    body: "Institutional capability, capacity building, and local stewardship anchor lasting change. Reform sticks when the people who run the system understand it from the inside.",
  },
] as const;

const principles = [
  {
    number: "01",
    title: "Integrated Systems & Tailored Innovation",
    body: "We architect end-to-end solutions that bridge international standards with localized intelligence. From high-level strategic planning to digital implementation, we deploy technology-driven frameworks that evolve with shifting market and institutional needs.",
  },
  {
    number: "02",
    title: "Multilateral Strategic Network",
    body: "We leverage an extensive ecosystem of partners across government, the private sector, academia, and global development organizations. This collaborative network enables coordinated cross-sector engagement, stronger institutional alignment, and integrated solutions that drive sustainable transformation and measurable economic impact.",
  },
  {
    number: "03",
    title: "Sustainable and Resilient Impact",
    body: "Our solutions are built on long-term, resilient strategies that create lasting value. By embedding local capacity, institutional ownership, and sustainable practices, TRACE helps ensure impact beyond project lifecycles.",
  },
] as const;

const serviceImages: Record<Service["slug"], string> = {
  "trade-facilitation": ASSETS.heroTrade,
  "policy-regulatory-reform": ASSETS.heroPolicy,
  "laboratory-improvement": ASSETS.heroLaboratory,
  "market-access-sps": ASSETS.heroColdChain,
  "technology-solutions": ASSETS.heroInteroperability,
  "research-innovation": ASSETS.heroResearch,
};

/** Sticky-scroll section: image pinned left, pillar content scrolls right with per-pillar accent color. */
function HowTraceWorksStickyScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });

  // Active pillar index derived from scroll progress
  const [activePillar, setActivePillar] = useState(0);
  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * pillars.length), pillars.length - 1);
      setActivePillar(idx);
    });
  }, [smoothProgress]);

  const accent = PILLAR_ACCENTS[activePillar];

  // Smooth color transition via CSS custom property on a wrapper
  return (
    <div ref={sectionRef} className="relative" style={{ height: `${pillars.length * 100}vh` }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full">
          {/* Left: pinned image — always visible */}
          <div className="relative hidden w-[48%] shrink-0 overflow-hidden lg:block">
            <img
              src={ASSETS.aboutTrace}
              alt="Overhead view of the TRACE team around a table shaped like the TRACE logo"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Accent edge that transitions color */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1"
              animate={{ backgroundColor: accent.color }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            />
            {/* Step counter */}
            <div className="absolute bottom-8 left-8">
              <motion.p
                key={activePillar}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-[11px] font-bold tracking-[0.2em] text-white"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
              >
                {String(activePillar + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
              </motion.p>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            className="hidden w-[3px] shrink-0 lg:block"
            animate={{ backgroundColor: accent.color }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Right: content panel */}
          <motion.div
            className="relative flex flex-1 flex-col justify-center overflow-hidden bg-[#06182c] px-8 py-12 sm:px-14"
            animate={{ backgroundColor: "#06182c" }}
            transition={{ duration: 0.7 }}
          >
            {/* Subtle aurora background — reacts to active pillar color */}
            <div className="pointer-events-none absolute inset-0 opacity-30">
              <SoftAurora
                key={activePillar}
                speed={0.3}
                scale={1.8}
                brightness={0.7}
                color1={accent.aurora1}
                color2={accent.aurora2}
                noiseFrequency={2.0}
                noiseAmplitude={0.7}
                bandHeight={0.5}
                bandSpread={1.2}
                octaveDecay={0.15}
                layerOffset={0.3}
                colorSpeed={0.6}
                enableMouseInteraction={false}
                mouseInfluence={0}
              />
            </div>

            {/* Pill dots navigation */}
            <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-2.5">
              {pillars.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 rounded-full"
                  animate={{
                    width: i === activePillar ? 24 : 6,
                    backgroundColor: i === activePillar ? accent.color : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Pillar content — animates in on change */}
            <div className="relative max-w-xl">
              <motion.p
                key={`tag-${activePillar}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
                className="font-mono text-[10px] font-bold tracking-[0.22em]"
                style={{ color: accent.color }}
              >
                {pillars[activePillar].tag}
              </motion.p>

              <motion.h3
                key={`title-${activePillar}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
                className="mt-5 font-display text-5xl font-extrabold leading-[0.96] tracking-[-0.065em] text-white sm:text-6xl"
              >
                {pillars[activePillar].title}
              </motion.h3>

              <motion.p
                key={`body-${activePillar}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.13, ease: [0.23, 1, 0.32, 1] }}
                className="mt-6 text-base leading-7 text-white/72 sm:text-lg sm:leading-8"
              >
                {pillars[activePillar].body}
              </motion.p>

              <motion.div
                key={`bar-${activePillar}`}
                className="mt-8 h-px w-16"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                style={{ backgroundColor: accent.color, transformOrigin: "left" }}
              />
              <motion.p
                key={`label-${activePillar}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.28 }}
                className="mt-4 font-mono text-[9px] font-bold tracking-[0.18em] text-white/40"
              >
                EVIDENCE · DELIVERY · OWNERSHIP
              </motion.p>
            </div>

            {/* Mobile: image strip */}
            <div className="mt-8 block overflow-hidden rounded-sm lg:hidden">
              <img src={ASSETS.aboutTrace} alt="" className="h-40 w-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function TracePositioningSection() {
  return (
    <section className="relative overflow-hidden border-y border-[#D5E4EB] bg-trace-paper" aria-labelledby="trace-positioning-title">
      {/* Section heading — scrolls away before sticky kicks in */}
      <div className="relative mx-auto max-w-[1380px] px-5 py-16 lg:px-10 sm:py-[4.5rem]">
        <SectionReveal>
          <div className="max-w-3xl">
            <p className="section-label">HOW TRACE WORKS</p>
            <h2 id="trace-positioning-title" className="mt-5 font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.068em] text-trace-ink sm:text-6xl">Systems thinking for <span className="text-trace-teal">lasting change.</span></h2>
            <p className="mt-6 text-base leading-7 text-trace-muted">TRACE integrates policy expertise, technology, and institutional innovation to help governments, international institutions, and enterprises navigate systemic shifts and achieve sustainable growth.</p>
          </div>
        </SectionReveal>
      </div>

      {/* Sticky scroll — takes up 3 viewport heights */}
      <HowTraceWorksStickyScroll />

      {/* What Sets TRACE Apart */}
      <div className="relative bg-trace-paper">
        <div className="relative mx-auto max-w-[1380px] px-5 pb-20 pt-20 lg:px-10 sm:pb-28 sm:pt-24">
          <SectionReveal>
            <p className="section-label">WHAT SETS TRACE APART</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.96] tracking-[-0.06em] text-trace-ink sm:text-5xl">
              Depth that <span className="text-trace-teal">stays connected</span> to delivery.
            </h2>
          </SectionReveal>
        </div>

        <ScrollStack className="mx-auto max-w-[1200px] px-5 lg:px-10">
          {principles.map((principle, index) => {
            const accent = PILLAR_ACCENTS[index];
            return (
              <ScrollStackItem
                key={principle.number}
                itemClassName="min-h-[360px] sm:min-h-[400px]"
              >
                {/* Aurora background fills the card */}
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-20">
                  <SoftAurora
                    speed={0.4}
                    scale={1.6}
                    brightness={0.9}
                    color1={accent.aurora1}
                    color2={accent.aurora2}
                    noiseFrequency={2.2}
                    noiseAmplitude={0.8}
                    bandHeight={0.45}
                    bandSpread={1.1}
                    octaveDecay={0.12}
                    layerOffset={0.2}
                    colorSpeed={0.7}
                    enableMouseInteraction
                    mouseInfluence={0.15}
                  />
                </div>

                {/* Card content */}
                <div className="relative grid gap-6 sm:grid-cols-[110px_minmax(0,1fr)] sm:items-start sm:gap-10">
                  <div className="flex items-center gap-4 sm:block">
                    <span
                      className="font-display text-6xl font-extrabold tracking-[-0.07em] sm:text-7xl"
                      style={{ color: accent.color }}
                    >
                      {principle.number}
                    </span>
                    <span
                      className="h-px flex-1 sm:mt-4 sm:block sm:w-12"
                      style={{ backgroundColor: accent.color, opacity: 0.5 }}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.052em] text-white sm:text-[2.2rem]">
                      {principle.title}
                    </h3>
                    <p className="mt-5 text-base leading-[1.76] text-white/85 sm:text-lg">
                      {principle.body}
                    </p>
                    <p
                      className="mt-7 inline-flex items-center gap-2 border-b pb-1 font-mono text-[10px] font-bold tracking-[0.18em]"
                      style={{ borderColor: `${accent.color}55`, color: accent.color }}
                    >
                      DISTINCTION {principle.number}
                    </p>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const disciplineText = service.disciplines.join(" · ");
  return (
    <SectionReveal delay={Math.min(index * 0.045, 0.2)}>
      <StarBorder color="#009CA6" speed="8s" className="h-full">
      <article className={`group relative flex h-full flex-col overflow-hidden bg-white shadow-[0_14px_32px_rgba(18,61,103,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(18,61,103,0.18)]`}>
        <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1} />
        <Link href={`/services/${service.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-trace-navy" aria-label={`Open ${service.title} briefing`}>
          <img src={serviceImages[service.slug]} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.055]" />
          <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/52 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 bg-white/94 px-3 py-1.5 font-display text-[10px] font-black tracking-[0.08em] text-trace-navy shadow-sm">{service.solutions} SOLUTIONS</span>
          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center bg-trace-navy/90 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></span>
        </Link>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="font-display text-[11px] font-black uppercase tracking-[0.09em] text-trace-teal">{service.strapline}</p>
          <h3 className="mt-3 font-display text-[1.55rem] font-extrabold leading-[1.05] tracking-[-0.045em] text-trace-ink">{service.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-trace-muted">{service.description}</p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="details"
                initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 border-t border-trace-ink/8 pt-4">
                  <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-trace-teal">DISCIPLINES</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {service.disciplines.map((discipline) => (
                      <li key={discipline} className="border border-trace-ink/12 bg-trace-paper px-2.5 py-1 text-[11px] font-bold leading-4 text-trace-navy">{discipline}</li>
                    ))}
                  </ul>
                  <p className="mt-4 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-teal">FOCUS</p>
                  <p className="mt-2 text-[13px] leading-5 text-trace-muted">{disciplineText}.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-trace-ink/8 pt-4">
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-controls={`service-details-${service.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-trace-navy transition-colors hover:text-trace-teal"
            >
              {open ? "Hide details" : "Show details"}
              <ChevronDown className={`h-4 w-4 text-trace-teal transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-1.5 text-xs font-extrabold text-trace-ink hover:text-trace-teal">
              Explore <ArrowUpRight className="h-4 w-4 text-trace-orange" />
            </Link>
          </div>
        </div>
      </article>
      </StarBorder>
    </SectionReveal>
  );
}

export function ProjectShowcase() {
  return (
    <section className="bg-[#F7FBFC] py-16 sm:py-[4.5rem]" aria-labelledby="services-showcase-title">
      <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <SectionReveal>
            <p className="section-label">OUR SERVICES</p>
            <h2 id="services-showcase-title" className="mt-4 font-display text-5xl font-extrabold tracking-[-0.068em] text-trace-ink sm:text-6xl">Capabilities that <span className="text-trace-teal">connect.</span></h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-trace-muted">TRACE connects trade, policy, laboratories, markets, technology, and research into practical services for complex institutional mandates.</p>
          </SectionReveal>
          <SectionReveal delay={0.08}><Link href="/services" className="inline-flex items-center gap-2 border-b border-trace-teal pb-2 text-sm font-extrabold text-trace-ink">All services <ArrowUpRight className="h-4 w-4 text-trace-teal" /></Link></SectionReveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
        <div className="mt-7 flex items-center justify-between border-t border-trace-ink/10 pt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-trace-muted"><span>{services.length} INTEGRATED SERVICE AREAS</span><Link href="/services" className="inline-flex items-center gap-2 text-trace-navy hover:text-trace-teal">Explore all services <ArrowRight className="h-3.5 w-3.5" /></Link></div>
      </div>
    </section>
  );
}
