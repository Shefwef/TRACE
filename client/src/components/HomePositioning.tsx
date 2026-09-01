/** TRACE accessible light foundation: a systems-led positioning brief and scan-friendly project showcase using approved navy, turquoise, and existing TRACE project data. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { ASSETS, services, type Service } from "@/data/traceData";
import { SectionReveal } from "@/components/SectionReveal";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { StarBorder } from "@/components/ui/StarBorder";
import { ShineBorder } from "@/components/ui/ShineBorder";

// TRACE logo colors per pillar. cardBg used for ScrollStack cards.
// onDark is a lighter variant used when the accent needs contrast against a dark card background.
const PILLAR_ACCENTS = [
  { color: "#009CA6", onDark: "#33C4CE", cardBg: "#082440", label: "TEAL"   },  // Evidence  01
  { color: "#F47A20", onDark: "#F8964F", cardBg: "#0d1f38", label: "ORANGE" },  // Delivery  02
  { color: "#123D67", onDark: "#6DA1D4", cardBg: "#06182c", label: "NAVY"   },  // Ownership 03
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

/** Auto-rotating 3D-skewed deck of pillar cards. Front card rotates to the back every ~4s. */
function PillarDisplayCards() {
  const [front, setFront] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setFront((c) => (c + 1) % pillars.length), 4200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const orderOf = (i: number) => (i - front + pillars.length) % pillars.length;

  return (
    <div className="grid h-[440px] w-full place-items-center [grid-template-areas:'stack'] sm:h-[500px]">
      {pillars.map((pillar, i) => {
        const accent = PILLAR_ACCENTS[i];
        const depth = orderOf(i);
        const isFront = depth === 0;

        // Larger stagger + scale to read as a proper 3D deck.
        const offset = depth * 52;
        const scale = 1 - depth * 0.05;
        const opacity = 1 - depth * 0.16;

        return (
          <motion.article
            key={pillar.number}
            className="pointer-events-none relative flex flex-col justify-between overflow-hidden rounded-xl border-2 bg-white shadow-[0_24px_60px_rgba(8,36,64,0.16)]"
            style={{
              gridArea: "stack",
              width: "26rem",
              height: "300px",
              padding: "1.6rem 1.75rem",
              borderColor: isFront ? `${accent.color}55` : "#DCE7EC",
              zIndex: pillars.length - depth,
            }}
            initial={false}
            animate={{
              x: offset,
              y: offset * 0.55,
              scale,
              opacity,
              rotate: depth * -1.5,
              filter: isFront ? "grayscale(0)" : "grayscale(0.3)",
            }}
            transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Accent bar */}
            <div className="absolute inset-y-0 left-0 w-[4px]" style={{ backgroundColor: accent.color }} />

            {/* Top row: number badge + tag */}
            <div className="relative flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-full font-mono text-[13px] font-bold text-white"
                style={{ backgroundColor: accent.color }}
              >
                {pillar.number}
              </span>
              <p className="font-mono text-[13px] font-bold tracking-[0.22em]" style={{ color: accent.color }}>
                {pillar.tag}
              </p>
            </div>

            {/* Center title — larger, dominant */}
            <h3 className="relative font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] text-trace-ink">
              {pillar.title}
            </h3>

            {/* Body copy — larger */}
            <p className="relative text-[15px] leading-[1.6] text-trace-muted line-clamp-3">
              {pillar.body}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}

/** Two-column card: compact image left, roomy pillar deck on the right. */
function HowTraceWorksCard() {
  return (
    <div className="mx-auto max-w-[1380px] px-5 pb-16 lg:px-10">
      <div className="overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(8,36,64,0.13)]">
        <div className="flex flex-col lg:flex-row">

          {/* Left: image — narrower so cards get more room */}
          <div className="relative h-56 w-full shrink-0 lg:h-auto lg:w-[36%]">
            <img
              src={ASSETS.aboutTrace}
              alt="Overhead view of the TRACE team around a table shaped like the TRACE logo"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(8,36,64,0.14)]" />
          </div>

          {/* Right: rotating 3D pillar deck — tighter padding, more card room */}
          <div className="flex flex-1 items-center justify-center bg-white px-4 py-8 sm:px-6 sm:py-10">
            <PillarDisplayCards />
          </div>

        </div>
      </div>
    </div>
  );
}

export function TracePositioningSection() {
  return (
    <>
      {/* ── HOW TRACE WORKS: white bg, contained sticky card, clean border divide ── */}
      <section className="border-y border-[#D5E4EB] bg-trace-paper" aria-labelledby="trace-positioning-title">
        <div className="mx-auto max-w-[1380px] px-5 pb-10 pt-16 lg:px-10 sm:pt-[4.5rem]">
          <SectionReveal>
            <div className="max-w-3xl">
              <p className="section-label">HOW TRACE WORKS</p>
              <h2 id="trace-positioning-title" className="mt-5 font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.068em] text-trace-ink sm:text-6xl">
                Systems thinking for <span className="text-trace-teal">lasting change.</span>
              </h2>
              <p className="mt-6 text-base leading-7 text-trace-muted">TRACE integrates policy expertise, technology, and institutional innovation to help governments, international institutions, and enterprises navigate systemic shifts and achieve sustainable growth.</p>
            </div>
          </SectionReveal>
        </div>
        <HowTraceWorksCard />
      </section>

      {/* ── WHAT SETS TRACE APART: white bg, dark navy stacking cards ── */}
      <section className="bg-trace-paper" aria-labelledby="trace-apart-title">
        <div className="mx-auto max-w-[1380px] px-5 pb-10 pt-16 lg:px-10 sm:pt-[4.5rem]">
          <SectionReveal>
            <p className="section-label">WHAT SETS TRACE APART</p>
            <h2 id="trace-apart-title" className="mt-4 font-display text-4xl font-extrabold leading-[0.96] tracking-[-0.06em] text-trace-ink sm:text-5xl">
              Depth that <span className="text-trace-teal">stays connected</span> to delivery.
            </h2>
          </SectionReveal>
        </div>

        <ScrollStack
          className="mx-auto max-w-[1200px] px-5 lg:px-10"
          itemDistance={80}
          itemStackDistance={28}
          stackPosition="22%"
          scaleEndPosition="10%"
          baseScale={0.88}
          itemScale={0.03}
        >
          {principles.map((principle, index) => {
            const accent = PILLAR_ACCENTS[index];
            return (
              <ScrollStackItem key={principle.number} itemClassName="overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(8,36,64,0.28)]">
                <div
                  className="relative p-10 sm:p-14"
                  style={{ backgroundColor: accent.cardBg, minHeight: "380px" }}
                >
                  {/* Accent radial wash */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: `radial-gradient(ellipse 65% 50% at 95% 50%, ${accent.onDark}25 0%, transparent 70%)` }}
                  />
                  {/* Left accent bar — uses onDark for visibility on dark bg */}
                  <div className="absolute inset-y-0 left-0 w-[3px]" style={{ backgroundColor: accent.onDark }} />

                  <div className="relative grid gap-6 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-start sm:gap-12">
                    <div className="flex items-center gap-4 sm:block">
                      <span
                        className="font-display text-6xl font-extrabold tracking-[-0.07em] sm:text-7xl"
                        style={{ color: accent.onDark }}
                      >
                        {principle.number}
                      </span>
                      <div className="h-px flex-1 sm:mt-5 sm:block sm:w-10" style={{ backgroundColor: accent.onDark, opacity: 0.5 }} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-bold tracking-[0.2em]" style={{ color: accent.onDark }}>
                        DISTINCTION {principle.number}
                      </p>
                      <h3 className="mt-4 font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.052em] text-white sm:text-[2.2rem]">
                        {principle.title}
                      </h3>
                      <p className="mt-5 text-base leading-[1.76] text-white/80 sm:text-lg">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </section>
    </>
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
