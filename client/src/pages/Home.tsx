/** Civic Signal Field homepage: cinematic evidence-led scrollytelling, never a generic consulting landing page. */
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight, ExternalLink, MapPin, PlayCircle, Plus } from "lucide-react";
import { Link } from "wouter";
import { DepthCarousel } from "@/components/DepthCarousel";
import { VideoHero } from "@/components/VideoHero";
import { ProjectFocusStage } from "@/components/ProjectFocusStage";
import { OfficeMapPanel } from "@/components/OfficeMapPanel";
import { PartnerRail } from "@/components/PartnerRail";
import { SectionReveal } from "@/components/SectionReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamPortrait } from "@/components/TeamPortrait";
import { TeamLeadershipPreview } from "@/components/TeamHierarchy";
import { ProjectShowcase, TracePositioningSection } from "@/components/HomePositioning";
import { ASSETS, innovations, latestUpdates, projects, services, team } from "@/data/traceData";
import { StarBorder } from "@/components/ui/StarBorder";
import { ShineBorder } from "@/components/ui/ShineBorder";
import { useRef, useState } from "react";

const serviceIcons = ["↗", "⌁", "◌", "⟡", "⌘", "◒"];

function MethodScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const x = useTransform(progress, [0, 1], ["-16%", "16%"]);
  const [active, setActive] = useState(0);
  const systemReduceMotion = useReducedMotion();
  const captureMode = typeof navigator !== "undefined" && navigator.webdriver;
  const reduceMotion = Boolean(systemReduceMotion || captureMode);
  const stages = [
    { number: "01", title: "Insight", body: "We turn complex trade and policy issues into clear insights using research, data, and deep expertise.", proof: "Research and evidence" },
    { number: "02", title: "Strategy", body: "We design solutions that meet global standards, align with institutional realities, and make implementation possible.", proof: "Systems and capability" },
    { number: "03", title: "Impact", body: "We build the tools, processes, and local ownership that let meaningful change continue beyond a project lifecycle.", proof: "Measured resilience" },
  ];
  return <section ref={ref} className="relative overflow-hidden bg-trace-ink py-24 text-white sm:py-32">
    <motion.div style={{ x: reduceMotion ? 0 : x }} className="pointer-events-none absolute -left-[10%] top-[17%] h-px w-[120%] bg-gradient-to-r from-transparent via-trace-mint/60 to-transparent" />
    <div className="relative mx-auto max-w-[1480px] px-5 lg:px-10">
      <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]"><SectionReveal><p className="section-label !text-trace-mint">HOW TRACE WORKS</p><h2 className="mt-5 max-w-xl font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.065em] sm:text-6xl">From complexity to <span className="text-trace-mint">capability.</span></h2></SectionReveal><SectionReveal delay={0.12}><p className="max-w-xl text-lg leading-8 text-white/66">A practical method for turning policy ambition into institutional momentum—one that connects research, design, delivery, and ownership.</p></SectionReveal></div>
      <div className="mt-16 grid gap-px bg-white/15 md:grid-cols-3">{stages.map((stage, index) => <button onClick={() => setActive(index)} key={stage.title} className={`group relative min-h-[320px] overflow-hidden bg-trace-ink p-7 text-left transition-colors duration-300 sm:p-9 ${active === index ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"}`}>
        <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-trace-teal">{stage.number}</span><span className={`absolute right-8 top-9 h-3 w-3 rounded-full ${active === index ? "bg-trace-mint shadow-[0_0_22px_#C4F1EE]" : "bg-white/22"}`} />
        <div className="absolute bottom-9 right-8 left-8"><p className="font-display text-4xl font-extrabold tracking-[-0.06em]">{stage.title}</p><p className="mt-4 max-w-sm text-sm leading-6 text-white/63">{stage.body}</p><p className="mt-6 font-mono text-[10px] font-bold tracking-[0.15em] text-trace-mint">{stage.proof.toUpperCase()}</p></div>
      </button>)}</div>
    </div>
  </section>;
}

function ServiceSystemMap() {
  const [active, setActive] = useState(services[0].slug);
  const activeService = services.find((service) => service.slug === active) ?? services[0];
  return <section className="bg-white py-24 sm:py-32" id="services-preview"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]"><SectionReveal><p className="section-label">WHAT WE MOVE</p><h2 className="mt-5 max-w-md font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.065em] text-trace-ink sm:text-6xl">Capabilities that connect.</h2><p className="mt-6 max-w-md text-base leading-7 text-trace-muted">A living system of trade, policy, quality, data, and delivery—designed to make the next decision more possible.</p><Link href="/services" className="mt-8 inline-flex items-center gap-2 border-b border-trace-teal pb-2 text-sm font-extrabold text-trace-ink">Explore every service <ArrowRight className="h-4 w-4 text-trace-teal" /></Link></SectionReveal>
        <SectionReveal delay={0.08}><div className="relative min-h-[560px] overflow-hidden border border-trace-ink/8 bg-trace-paper p-5 sm:p-9"><div className="absolute inset-0 opacity-50 hero-grid" /><div className="relative grid gap-3 sm:grid-cols-2">{services.map((service, index) => <button onClick={() => setActive(service.slug)} key={service.slug} className={`group relative overflow-hidden border p-5 text-left transition-all duration-300 ${active === service.slug ? "border-trace-teal bg-white shadow-[0_18px_42px_rgba(7,27,43,0.08)]" : "border-trace-ink/8 bg-white/58 hover:border-trace-teal/50"}`}><span className="font-mono text-lg text-trace-teal">{serviceIcons[index]}</span><p className="mt-8 font-display text-xl font-extrabold tracking-[-0.04em] text-trace-ink">{service.title}</p><p className="mt-2 text-xs font-bold leading-5 text-trace-muted">{service.strapline}</p><span className={`absolute bottom-0 left-0 h-1 bg-trace-teal transition-all duration-300 ${active === service.slug ? "w-full" : "w-0 group-hover:w-1/2"}`} /></button>)}</div>
          <motion.div key={activeService.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="relative mt-6 border-l-2 border-trace-navy bg-white px-6 py-6 sm:flex sm:items-end sm:justify-between"><div><p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">{activeService.solutions} SOLUTIONS</p><h3 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink">{activeService.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-trace-muted">{activeService.description}</p></div><Link href={`/services/${activeService.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-trace-ink sm:mt-0">View service <ArrowUpRight className="h-4 w-4 text-trace-teal" /></Link></motion.div>
        </div></SectionReveal></div></div></section>;
}


function InnovationFeature() {
  const [active, setActive] = useState(0);
  const systemReduceMotion = useReducedMotion();
  const captureMode = typeof navigator !== "undefined" && navigator.webdriver;
  const reduceMotion = Boolean(systemReduceMotion || captureMode);
  return <section className="overflow-hidden bg-[#F3F8FA] py-16 sm:py-20" aria-labelledby="innovations-title"><div className="mx-auto max-w-[1380px] px-5 lg:px-10"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><SectionReveal><p className="section-label">OUR INNOVATIONS</p><h2 id="innovations-title" className="mt-4 max-w-2xl font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.065em] text-trace-ink sm:text-6xl">Two products for the <span className="text-trace-teal">decision layer.</span></h2></SectionReveal></div><SectionReveal delay={0.1}><div className="mt-10 flex min-h-[470px] flex-col gap-3 lg:h-[470px] lg:flex-row">{innovations.map((innovation, index) => { const selected = index === active; const tone = index === 0 ? "bg-trace-navy" : "bg-[#2E6388]"; return <motion.article layout key={innovation.slug} role="button" tabIndex={0} aria-pressed={selected} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(index); } }} transition={reduceMotion ? { duration: 0 } : { duration: 0.48, ease: [0.23, 1, 0.32, 1] }} className={`group relative min-h-[210px] cursor-pointer overflow-hidden border border-white/28 p-6 text-white outline-none focus-visible:ring-2 focus-visible:ring-trace-teal sm:p-8 ${tone} ${selected ? "lg:flex-[1.6]" : "lg:flex-1"}`}><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#009CA6"]} duration={14} borderWidth={1} /><img src={innovation.image} alt="" className={`absolute inset-0 h-full w-full object-cover brightness-105 saturate-125 transition-[filter,opacity,transform] duration-500 ${selected ? "scale-105 opacity-72 grayscale-0" : "opacity-42 grayscale-[0.25] group-hover:opacity-55 group-hover:grayscale-0"}`} /><div className="absolute inset-0 bg-gradient-to-t from-[#082440]/72 via-[#123D67]/18 to-transparent" /><div className="relative flex h-full flex-col"><div className="flex items-start justify-between"><span className="font-mono text-3xl font-bold tracking-[-0.05em] text-trace-mint">0{index + 1}</span><span className={`border px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.14em] ${selected ? "border-trace-mint/65 bg-trace-mint/12 text-trace-mint" : "border-white/32 bg-white/8 text-white/78"}`}>TRACE PRODUCT</span></div>{/* Bottom-anchored block: tag+title always sit at a fixed offset from the bottom (reserved reveal space), and the reveal region occupies the space below the title so its content changing never shifts the title. */}<div className="mt-auto"><p className="font-mono text-[10px] font-bold tracking-[0.15em] text-trace-mint">{innovation.tags.slice(0, 2).join(" · ").toUpperCase()}</p><h3 className="mt-3 max-w-xl font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-4xl">{innovation.title}</h3></div><div className="relative mt-4 h-[176px]"><AnimatePresence initial={false} mode="wait">{selected ? <motion.div key="expanded" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? {} : { opacity: 0, y: 8 }} transition={{ duration: 0.28 }} className="absolute inset-0"><p className="max-w-xl text-[15px] leading-6 text-white/84">{innovation.description}</p><a href={innovation.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="mt-6 inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-extrabold text-trace-navy transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]">Visit platform <ExternalLink className="h-4 w-4 text-trace-teal" /></a></motion.div> : <motion.span key="collapsed" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? {} : { opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-x-0 top-0 inline-flex items-center gap-2 text-sm font-bold text-white/78">Open innovation <ChevronRight className="h-4 w-4 text-trace-mint" /></motion.span>}</AnimatePresence></div></div></motion.article>; })}</div></SectionReveal></div></section>;
}

/**
 * NEWS & FEATURES bento (Aceternity Bento Grid pattern, adapted to TRACE).
 * One featured item occupies ~50% of the row, four secondary items fill the rest.
 */
function NewsFeaturesBento() {
  const featured = latestUpdates[0];
  const secondary = latestUpdates.slice(1, 5);
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="news-features-title">
      <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
        <div className="flex flex-col justify-between gap-6 border-b border-trace-ink/10 pb-8 sm:flex-row sm:items-end">
          <SectionReveal>
            <p className="section-label">NEWS & FEATURES</p>
            <h2 id="news-features-title" className="mt-4 font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.065em] text-trace-ink sm:text-6xl">
              The latest from <span className="text-trace-teal">TRACE.</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <Link href="/latest-updates" className="inline-flex items-center gap-2 border-b border-trace-teal pb-2 text-sm font-extrabold text-trace-ink">
              Show all updates <ArrowUpRight className="h-4 w-4 text-trace-teal" />
            </Link>
          </SectionReveal>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {/* Featured — large bento tile */}
          <SectionReveal className="lg:col-span-2 lg:row-span-2 h-full">
            <NewsCard update={featured} variant="featured" />
          </SectionReveal>

          {/* Secondary — four smaller tiles */}
          {secondary.map((item, index) => (
            <SectionReveal key={item.slug} delay={0.05 + index * 0.05} className="h-full">
              <NewsCard update={item} variant="secondary" />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsCard({ update, variant }: { update: typeof latestUpdates[number]; variant: "featured" | "secondary" }) {
  const isFeatured = variant === "featured";
  const linkTarget = update.external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <a
      href={update.url}
      {...linkTarget}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(7,27,43,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(7,27,43,0.16)]`}
    >
      <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1.5} />
      <div className={`relative w-full overflow-hidden ${isFeatured ? "aspect-[16/10] lg:aspect-[16/11]" : "aspect-[16/10]"}`}>
        <img
          src={update.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.055]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/60 via-trace-ink/5 to-transparent" />
        <span className="absolute left-4 top-4 bg-white/95 px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.14em] text-trace-navy backdrop-blur">
          {update.category.toUpperCase()}
        </span>
        {update.external && (
          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center bg-trace-navy/85 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ExternalLink className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className={`flex flex-1 flex-col ${isFeatured ? "p-6 sm:p-8" : "p-5"}`}>
        <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-trace-teal">
          {update.date.toUpperCase()}
        </p>
        <h3 className={`mt-3 font-display font-extrabold leading-[1.08] tracking-[-0.045em] text-trace-ink transition-colors group-hover:text-trace-teal ${isFeatured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
          {update.title}
        </h3>
        {isFeatured && (
          <p className="mt-4 text-sm leading-6 text-trace-muted">{update.summary}</p>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-trace-ink/8 pt-4">
          <span className="text-xs font-bold text-trace-ink">{update.external ? "Read on traceconsultingltd.com" : "Read more"}</span>
          <ArrowUpRight className="h-4 w-4 text-trace-orange transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}

function ExpertiseNetwork() {
  return <section className="bg-white py-24 sm:py-32"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]"><SectionReveal><p className="section-label">PEOPLE BEHIND THE SYSTEMS</p><h2 className="mt-5 max-w-md font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.065em] text-trace-ink sm:text-6xl">Expertise with a line of sight.</h2><p className="mt-6 max-w-md leading-7 text-trace-muted">From customs and legislative reform to laboratories, digital platforms, and partnerships—TRACE teams are connected to the work they deliver.</p><Link href="/team" className="mt-8 inline-flex items-center gap-2 border-b border-trace-orange pb-2 text-sm font-extrabold text-trace-ink">Meet the TRACE team <ArrowRight className="h-4 w-4 text-trace-orange" /></Link></SectionReveal>
        <div className="grid gap-px border border-trace-ink/8 bg-trace-ink/8 sm:grid-cols-2">{team.slice(0, 4).map((member, index) => <SectionReveal key={member.slug} delay={index * 0.06}><StarBorder color="#009CA6" speed="8s" className="block h-full"><Link href={`/team/${member.slug}`} className="group relative flex min-h-[290px] flex-col bg-white transition-colors hover:bg-trace-paper"><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={11} borderWidth={1} /><div className="relative h-36 overflow-hidden bg-trace-paper"><TeamPortrait member={member} className="h-full w-full" imageClassName="transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-trace-ink/25 via-transparent to-transparent" /><Plus className="absolute right-5 top-5 h-5 w-5 text-trace-orange transition-transform group-hover:rotate-90" /></div><div className="mt-auto p-6"><p className="font-display text-2xl font-extrabold tracking-[-0.05em] text-trace-ink">{member.name}</p><p className="mt-2 text-xs font-bold leading-5 text-trace-muted">{member.role}</p><p className="mt-4 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-teal">{member.specialty.toUpperCase()}</p></div></Link></StarBorder></SectionReveal>)}</div></div></div></section>;
}

export default function Home() {
  return <div className="min-h-screen overflow-x-hidden"><SiteHeader overlay /><main><VideoHero />
    <TracePositioningSection /><ProjectShowcase /><ProjectFocusStage /><DepthCarousel /><NewsFeaturesBento /><InnovationFeature /><TeamLeadershipPreview /><PartnerRail /><OfficeMapPanel />
  </main><SiteFooter /></div>;
}
