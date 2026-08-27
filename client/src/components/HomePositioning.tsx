/** TRACE accessible light foundation: a systems-led positioning brief and scan-friendly project showcase using approved navy, turquoise, and existing TRACE project data. */
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { ASSETS, services, type Service } from "@/data/traceData";
import { SectionReveal } from "@/components/SectionReveal";

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
  return (
    <section className="relative overflow-hidden border-y border-[#D5E4EB] bg-trace-paper py-16 sm:py-[4.5rem]" aria-labelledby="trace-positioning-title">
      <div className="pointer-events-none absolute left-1/4 right-1/4 top-0 h-1 bg-gradient-to-r from-transparent via-trace-teal to-transparent" />
      <div className="pointer-events-none absolute left-0 right-0 top-[39%] h-px bg-gradient-to-r from-transparent via-trace-teal/32 to-transparent" />
      <div className="relative mx-auto max-w-[1380px] px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionReveal>
            <p className="section-label">HOW TRACE WORKS</p>
            <h2 id="trace-positioning-title" className="mt-5 max-w-xl font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.068em] text-trace-ink sm:text-6xl">Systems thinking for <span className="text-trace-teal">lasting change.</span></h2>
            <div className="mt-7 max-w-xl space-y-5 text-base leading-7 text-trace-muted">
              <p>TRACE Consulting integrates policy expertise, technology, and institutional innovation to help governments, international institutions, and enterprises navigate systemic shifts and achieve sustainable growth.</p>
              <p>Through evidence-based strategies, integrated solutions, and practical implementation support, TRACE strengthens competitiveness, resilience, and institutional performance in an evolving global landscape.</p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <div className="relative bg-white px-0 pb-0 pt-1 sm:pt-2">
              <p className="font-display text-[14px] font-black tracking-[0.08em] text-trace-navy">AN INTEGRATED TRACE SYSTEM</p>
              <p className="mt-2 max-w-xl text-[15px] leading-6 text-trace-muted">A connected sequence that turns evidence into delivery and anchors it in institutional ownership.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3 sm:gap-4">
                {[["Evidence", "Policy intelligence"], ["Delivery", "Digital implementation"], ["Ownership", "Institutional capability"]].map(([label, detail], index) => (
                  <motion.div key={label} whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }} className="flex min-h-[172px] flex-col border-l-2 border-t-2 border-trace-teal bg-trace-navy p-5 shadow-[0_10px_22px_rgba(18,61,103,0.08)] sm:min-h-[196px] sm:p-6">
                    <p className="font-display text-[12px] font-black tracking-[0.1em] text-trace-mint">0{index + 1}</p>
                    <div className="mt-auto border-t border-white/25 pt-5">
                      <p className="font-display text-[1.65rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-white">{label}</p>
                      <p className="mt-2 text-[15px] font-medium leading-6 text-white/88">{detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="mt-5 font-display text-[12px] font-extrabold tracking-[0.08em] text-trace-navy">EVIDENCE · DELIVERY · OWNERSHIP</p>
            </div>
          </SectionReveal>
        </div>

        <div className="relative mt-12 overflow-hidden border border-trace-navy bg-trace-navy px-5 py-7 shadow-[0_18px_44px_rgba(18,61,103,0.14)] sm:mt-14 sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-trace-teal" />
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-1 bg-trace-teal" />
          <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/12" />
          <div className="pointer-events-none absolute -right-4 -top-8 h-24 w-24 rounded-full border border-trace-mint/35" />
          <SectionReveal><p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-mint">WHAT SETS TRACE APART</p></SectionReveal>
          <div className="mt-5 divide-y divide-white/18 border-y border-white/18">
            {principles.map((principle, index) => (
              <motion.article key={principle.number} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.28 }} transition={{ duration: 0.42, delay: index * 0.06 }} className="group grid gap-4 px-5 py-6 transition-colors hover:bg-white/10 sm:min-h-[174px] sm:grid-cols-[88px_minmax(0,0.95fr)_minmax(0,1.05fr)] sm:items-center sm:gap-7 sm:px-7 sm:py-7 lg:grid-cols-[96px_minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
                <div className="flex items-center gap-3 sm:block"><span className="font-display text-4xl font-extrabold tracking-[-0.07em] text-trace-mint sm:text-[2.8rem]">{principle.number}</span><span className="h-px flex-1 bg-trace-mint/55 sm:mt-3 sm:block sm:w-9" /></div>
                <h3 className="max-w-none font-display text-[1.55rem] font-extrabold leading-[1.03] tracking-[-0.052em] text-white sm:text-[1.8rem]">{principle.title}</h3>
                <p className="max-w-none text-[15px] font-medium leading-[1.7] text-white/92 sm:text-[16px] sm:leading-[1.72]">{principle.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
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
          {services.map((service, index) => {
            return (
              <SectionReveal key={service.slug} delay={Math.min(index * 0.045, 0.2)}>
                <Link href={`/services/${service.slug}`} className="group block h-full overflow-hidden border border-trace-ink/14 bg-white shadow-[0_14px_32px_rgba(18,61,103,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-trace-teal/55 hover:shadow-[0_24px_48px_rgba(18,61,103,0.18)]">
                  <div className="relative aspect-[16/9] overflow-hidden bg-trace-navy">
                    <img src={serviceImages[service.slug]} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.055]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/52 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 bg-white/94 px-3 py-1.5 font-display text-[10px] font-black tracking-[0.08em] text-trace-navy shadow-sm">{service.solutions} SOLUTIONS</span>
                    <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center bg-trace-navy/90 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                  <div className="flex min-h-[164px] flex-col p-5 sm:p-6">
                    <p className="font-display text-[11px] font-black uppercase tracking-[0.09em] text-trace-teal">{service.strapline}</p>
                    <h3 className="mt-3 font-display text-[1.55rem] font-extrabold leading-[1.05] tracking-[-0.045em] text-trace-ink">{service.title}</h3>
                    <p className="mt-auto pt-5 text-sm font-bold leading-5 text-trace-muted">Explore service <ArrowUpRight className="inline h-4 w-4 text-trace-orange" /></p>
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
        <div className="mt-7 flex items-center justify-between border-t border-trace-ink/10 pt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-trace-muted"><span>{services.length} INTEGRATED SERVICE AREAS</span><Link href="/services" className="inline-flex items-center gap-2 text-trace-navy hover:text-trace-teal">Explore all services <ArrowRight className="h-3.5 w-3.5" /></Link></div>
      </div>
    </section>
  );
}
