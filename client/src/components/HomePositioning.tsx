/** TRACE accessible light foundation: a systems-led positioning brief and scan-friendly project showcase using approved navy, turquoise, and existing TRACE project data. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { ASSETS, services, type Service } from "@/data/traceData";
import { SectionReveal } from "@/components/SectionReveal";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { StarBorder } from "@/components/ui/StarBorder";

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

export function TracePositioningSection() {
  const reduceMotion = useReducedMotion();
  const pillars = [
    { label: "Evidence", detail: "Policy intelligence, applied research, and data-driven diagnosis inform every mandate.", tone: "01" },
    { label: "Delivery", detail: "Digital implementation, technology, and structured programme execution translate design into practice.", tone: "02" },
    { label: "Ownership", detail: "Institutional capability, capacity building, and local stewardship anchor lasting change.", tone: "03" },
  ];

  const pillarCards = pillars.map((pillar) => (
    <StarBorder key={pillar.label} color="#009CA6" speed="7s" className="w-[260px] sm:w-[300px]" style={{ minHeight: 200 }}>
      <article
        className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-trace-navy via-[#0f345a] to-trace-ink px-6 py-6 sm:px-7 sm:py-7"
        style={{ minHeight: 200 }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-trace-teal via-trace-mint to-trace-teal" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-trace-mint/25" />
        <div className="pointer-events-none absolute -right-4 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full border border-white/12" />
        <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-mint">STEP {pillar.tone}</p>
        <h3 className="mt-4 font-display text-2xl font-extrabold leading-[1.02] tracking-[-0.05em] text-white sm:text-[1.7rem]">{pillar.label}</h3>
        <p className="mt-3 text-sm leading-6 text-white/85">{pillar.detail}</p>
        <p className="mt-auto pt-5 font-mono text-[9px] font-bold tracking-[0.18em] text-trace-mint/85">EVIDENCE · DELIVERY · OWNERSHIP</p>
      </article>
    </StarBorder>
  ));

  return (
    <section className="relative overflow-hidden border-y border-[#D5E4EB] bg-trace-paper py-16 sm:py-[4.5rem]" aria-labelledby="trace-positioning-title">
      <div className="pointer-events-none absolute left-1/4 right-1/4 top-0 h-1 bg-gradient-to-r from-transparent via-trace-teal to-transparent" />
      <div className="relative mx-auto max-w-[1380px] px-5 lg:px-10">
        <SectionReveal>
          <div className="max-w-3xl">
            <p className="section-label">HOW TRACE WORKS</p>
            <h2 id="trace-positioning-title" className="mt-5 font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.068em] text-trace-ink sm:text-6xl">Systems thinking for <span className="text-trace-teal">lasting change.</span></h2>
            <p className="mt-6 text-base leading-7 text-trace-muted">TRACE integrates policy expertise, technology, and institutional innovation to help governments, international institutions, and enterprises navigate systemic shifts and achieve sustainable growth.</p>
          </div>
        </SectionReveal>

        <div className="mt-10 sm:mt-12">
          <SectionReveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
              {/* Left: image */}
              <motion.figure
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden border border-trace-ink/10 bg-white shadow-[0_18px_44px_rgba(18,61,103,0.10)] lg:w-[48%] lg:shrink-0"
              >
                <img
                  src={ASSETS.aboutTrace}
                  alt="Overhead view of the TRACE team meeting around a table shaped like the TRACE logo"
                  className="block h-full w-full object-cover"
                />
              </motion.figure>

              {/* Divider */}
              <div className="hidden w-px shrink-0 bg-[#D5E4EB] lg:block" />

              {/* Right: About card + marquee stacked */}
              <div className="flex flex-1 flex-col gap-5">
                {/* About card */}
                <div className="border-l-2 border-t-2 border-trace-teal bg-gradient-to-br from-trace-navy via-[#123D67] to-[#0a2b4a] p-6 text-white shadow-[0_16px_38px_rgba(8,36,64,0.22)] sm:p-8">
                  <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-mint">ABOUT TRACE</p>
                  <h3 className="mt-4 font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-4xl">Where evidence, delivery, and ownership converge.</h3>
                  <p className="mt-4 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">Evidence-based strategy paired with practical implementation—so reforms move from ambition into working institutional capability.</p>
                  <p className="mt-6 font-mono text-[10px] font-bold tracking-[0.18em] text-trace-mint/75">AN INTEGRATED TRACE SYSTEM</p>
                </div>

                {/* Infinite marquee in the remaining half */}
                <div className="relative flex-1 overflow-hidden rounded-sm border border-trace-ink/10 bg-gradient-to-r from-[#0a2b4a] via-trace-navy to-[#0a2b4a] py-6 shadow-[0_18px_44px_rgba(8,36,64,0.20)]">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-trace-mint/45 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-trace-mint/45 to-transparent" />
                  <p className="mb-5 px-6 font-mono text-[10px] font-bold tracking-[0.18em] text-trace-mint sm:px-8">EVIDENCE · DELIVERY · OWNERSHIP</p>
                  <InfiniteMovingCards
                    items={pillarCards}
                    direction="left"
                    durationSeconds={48}
                    pauseOnHover
                    ariaLabel="Evidence, delivery, and ownership pillars"
                    gapClassName="gap-6 sm:gap-8"
                    className="px-1"
                  />
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>

        <div className="relative mt-14 sm:mt-20">
          <SectionReveal>
            <p className="section-label">WHAT SETS TRACE APART</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.96] tracking-[-0.06em] text-trace-ink sm:text-5xl">Depth that <span className="text-trace-teal">stays connected</span> to delivery.</h2>
          </SectionReveal>
          <ScrollStack className="mt-8 sm:mt-10" stackTopBase={104} stackTopStep={24} enableLenis>
            {principles.map((principle, index) => (
              <ScrollStackItem key={principle.number} className="w-full">
                <motion.article
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
                  whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                  className="relative overflow-hidden rounded-sm border border-white/12 bg-gradient-to-br from-trace-navy via-[#123D67] to-[#0a2b4a] p-7 text-white shadow-[0_28px_66px_rgba(8,36,64,0.35)] sm:p-10"
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-trace-teal" />
                  <div className="pointer-events-none absolute right-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-trace-mint/60 to-transparent" />
                  <div className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full border border-white/12" />
                  <div className="pointer-events-none absolute -right-8 -top-6 h-32 w-32 rounded-full border border-trace-mint/25" />
                  <div className="relative grid gap-6 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-start sm:gap-10">
                    <div className="flex items-center gap-4 sm:block">
                      <span className="font-display text-5xl font-extrabold tracking-[-0.07em] text-trace-mint sm:text-6xl">{principle.number}</span>
                      <span className="h-px flex-1 bg-trace-mint/55 sm:mt-4 sm:block sm:w-16" />
                    </div>
                    <div>
                      <h3 className="font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.052em] text-white sm:text-[2.1rem]">{principle.title}</h3>
                      <p className="mt-5 text-base leading-[1.72] text-white/92 sm:text-lg">{principle.body}</p>
                      <p className="mt-6 inline-flex items-center gap-2 border-b border-trace-mint/45 pb-1 font-mono text-[10px] font-bold tracking-[0.18em] text-trace-mint">
                        DISTINCTION {principle.number}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
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
      <article className={`group flex h-full flex-col overflow-hidden bg-white shadow-[0_14px_32px_rgba(18,61,103,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(18,61,103,0.18)]`}>
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
