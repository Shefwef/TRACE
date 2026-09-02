/** Civic Signal Field route system: image-led institutional briefings that connect services, projects, experts, and verified insight sources. */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, CalendarDays, CheckCircle2, ChevronDown, Clock, ExternalLink, FileText, Mail, MapPin, Phone, PlayCircle, Search, Send, Upload, XCircle } from "lucide-react";
import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { SectionReveal } from "@/components/SectionReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamPortrait } from "@/components/TeamPortrait";
import SpecularButton from "@/components/ui/SpecularButton";
import { StarBorder } from "@/components/ui/StarBorder";
import { ShineBorder } from "@/components/ui/ShineBorder";
import { ASSETS, contact, innovations, insights, metrics, projects, services, team, type Insight, type Project, type Service, type TeamMember } from "@/data/traceData";

const serviceMedia: Record<string, string> = {
  "trade-facilitation": ASSETS.heroTrade,
  "policy-regulatory-reform": ASSETS.heroPolicy,
  "laboratory-improvement": ASSETS.heroLaboratory,
  "market-access-sps": ASSETS.heroColdChain,
  "technology-solutions": ASSETS.heroInteroperability,
  "research-innovation": ASSETS.heroResearch,
};

const projectMedia: Record<string, string> = {
  "national-tariff-modernization": ASSETS.heroTrade,
  "bsti-textile-testing": ASSETS.heroLaboratory,
  "animal-health-reform": ASSETS.heroColdChain,
  "bafisa-intelligence": ASSETS.heroInteroperability,
  "prtc-accreditation": ASSETS.heroLaboratory,
  "export-compliance": ASSETS.heroColdChain,
};

const serviceImage = (service: Service) => serviceMedia[service.slug] ?? ASSETS.heroPolicy;
const projectImage = (project: Project) => projectMedia[project.slug] ?? ASSETS.heroPolicy;
const insightImage = (insight: Insight) => insight.image ?? ASSETS.insightReform;

function Shell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen overflow-x-hidden bg-trace-paper"><SiteHeader />{children}<SiteFooter /></div>;
}

function PageHero({ label, title, description, tone = "light", kicker }: { label: string; title: ReactNode; description: string; tone?: "light" | "dark" | "navy"; kicker?: string }) {
  const dark = tone !== "light";
  const field = tone === "dark" ? "bg-trace-ink" : tone === "navy" ? "bg-trace-navy" : "bg-white";
  return <section className={`relative overflow-hidden pt-36 sm:pt-44 ${field} ${dark ? "text-white" : "text-trace-ink"}`}><div className="pointer-events-none absolute inset-0 opacity-50 hero-grid" /><div className={`pointer-events-none absolute right-[10%] top-[-18%] h-[380px] w-[380px] rounded-full blur-[90px] ${dark ? "bg-trace-teal/20" : "bg-trace-mint/70"}`} /><div className="relative mx-auto max-w-[1480px] px-5 pb-20 lg:px-10 sm:pb-28"><SectionReveal><p className={`section-label ${dark ? "!text-trace-mint" : ""}`}>{label}</p>{kicker && <p className={`mt-7 font-mono text-[10px] font-bold tracking-[0.18em] ${dark ? "text-white/55" : "text-trace-muted"}`}>{kicker}</p>}<h1 className="mt-5 max-w-5xl font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.07em] sm:text-7xl">{title}</h1><p className={`mt-7 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${dark ? "text-white/74" : "text-trace-muted"}`}>{description}</p></SectionReveal></div></section>;
}

function DetailMediaHero({ label, title, description, kicker, image }: { label: string; title: ReactNode; description: string; kicker: string; image: string }) {
  return <section className="relative isolate min-h-[530px] overflow-hidden bg-trace-ink pt-36 text-white sm:min-h-[590px] sm:pt-44"><img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-gradient-to-r from-trace-ink via-trace-ink/75 to-trace-ink/24" /><div className="pointer-events-none absolute inset-0 -z-10 opacity-25 hero-grid" /><div className="relative mx-auto flex min-h-[350px] max-w-[1480px] flex-col justify-end px-5 pb-16 lg:px-10 sm:pb-20"><SectionReveal><p className="section-label !text-trace-mint">{label}</p><p className="mt-6 font-mono text-[10px] font-bold tracking-[0.16em] text-white/72">{kicker}</p><h1 className="mt-5 max-w-5xl font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.07em] sm:text-7xl">{title}</h1><p className="mt-7 max-w-3xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">{description}</p></SectionReveal></div></section>;
}

function BackLink({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="inline-flex items-center gap-2 text-sm font-extrabold text-trace-ink"><ArrowLeft className="h-4 w-4 text-trace-orange" />Back to {label}</Link>;
}

function EntityTag({ children }: { children: ReactNode }) {
  return <span className="border border-trace-ink/12 bg-white px-3 py-2 font-mono text-[10px] font-bold tracking-[0.12em] text-trace-muted">{children}</span>;
}

function RelationshipRail({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return <section className="border-t border-trace-ink/10 py-12 sm:py-16"><div className="flex items-center justify-between gap-5"><div><p className="section-label">CONNECTED RECORDS</p><h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink">{title}</h2></div>{action}</div><div className="mt-7 flex snap-x gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div></section>;
}

function MiniProject({ project }: { project: Project }) {
  return <StarBorder color="#009CA6" speed="8s" className="min-w-[292px] snap-start"><Link href={`/projects/${project.slug}`} className="group relative block overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1"><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1} /><div className="relative h-32 overflow-hidden bg-trace-paper"><img src={projectImage(project)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-trace-ink/42 to-transparent" /><p className="absolute bottom-3 left-4 font-mono text-[8px] font-bold tracking-[0.12em] text-trace-mint">{project.client.toUpperCase()}</p></div><div className="p-5"><h3 className="font-display text-xl font-extrabold leading-[1.05] tracking-[-0.045em] text-trace-ink">{project.title}</h3><div className="mt-5 flex justify-between border-t border-trace-ink/8 pt-4 text-xs font-bold text-trace-muted"><span>{project.period}</span><ArrowUpRight className="h-4 w-4 text-trace-orange" /></div></div></Link></StarBorder>;
}

function MiniMember({ member }: { member: TeamMember }) {
  return <StarBorder color="#009CA6" speed="9s" className="min-w-[270px] snap-start"><Link href={`/team/${member.slug}`} className="relative block bg-white p-5 transition-transform duration-300 hover:-translate-y-1"><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={11} borderWidth={1} /><div className="flex items-center gap-4"><TeamPortrait member={member} className="h-12 w-12 rounded-full" imageClassName="scale-[1.12]" /><div><h3 className="font-display text-lg font-extrabold tracking-[-0.045em] text-trace-ink">{member.name}</h3><p className="mt-1 text-xs leading-4 text-trace-muted">{member.role}</p></div></div><p className="mt-5 font-mono text-[10px] font-bold tracking-[0.13em] text-trace-teal">{member.specialty.toUpperCase()}</p></Link></StarBorder>;
}

function MiniInsight({ insight }: { insight: Insight }) {
  return <StarBorder color="#009CA6" speed="8s" className="min-w-[292px] snap-start"><Link href={`/insights/${insight.slug}`} className="group relative block overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1"><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1} /><div className="relative h-32 overflow-hidden bg-trace-paper"><img src={insightImage(insight)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-trace-ink/42 to-transparent" /><p className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[8px] font-bold tracking-[0.12em] text-trace-mint">{insight.type === "Video" ? <PlayCircle className="h-3 w-3" /> : <FileText className="h-3 w-3" />}{insight.type.toUpperCase()}</p></div><div className="p-5"><h3 className="font-display text-xl font-extrabold leading-[1.08] tracking-[-0.045em] text-trace-ink">{insight.title}</h3><p className="mt-4 line-clamp-2 text-sm leading-6 text-trace-muted">{insight.summary}</p></div></Link></StarBorder>;
}

function SourceAction({ insight }: { insight: Insight }) {
  if (!insight.sourceUrl) return null;
  return <a href={insight.sourceUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 bg-trace-navy px-5 py-3 text-sm font-extrabold text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]">{insight.sourceLabel ?? "Open original source"}<ExternalLink className="h-4 w-4 text-trace-mint" /></a>;
}

export function AboutPage() {
  const commitments = ["Upholding integrity and transparency in every engagement", "Delivering measurable outcomes beyond recommendations", "Strengthening local capacity and fostering ownership", "Advancing innovation and sustainability across every project"];
  const framework = [["01", "Insight", "Research, data, and deep expertise turn complex trade and policy challenges into clear opportunities for action."], ["02", "Strategy", "Evidence- and technology-driven solutions meet global standards while aligning with institutional realities."], ["03", "Impact", "Practical implementation reduces barriers, advances reform, and equips institutions to sustain change independently."]];
  const distinctions = [["Industry-wide network", "Partnerships across government, the private sector, and development organizations support coordinated cross-sector solutions."], ["Sustainable approach", "Long-term strategies embed local capacity, environmental responsibility, and institutional ownership beyond project lifecycles."], ["Tailored innovation", "Context-specific solutions combine global practice, emerging technology, and local insight."], ["End-to-end solutions", "Support spans strategy, design, implementation, and scaling."]];
  return <Shell><main><PageHero label="ABOUT TRACE" title={<>A firm built on <span className="text-trace-mint">insight</span>, strategy, and lasting impact.</>} description="TRACE integrates trade expertise, policy reform, digital systems, and practical implementation to help institutions make complex change move." tone="navy" /><section className="bg-trace-paper py-24 sm:py-32"><div className="mx-auto grid max-w-[1480px] gap-10 px-5 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 lg:px-10"><SectionReveal><div className="max-w-xl"><p className="section-label">WHO WE ARE</p><h2 className="mt-5 font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.065em] text-trace-ink">Architecting resilience in a dynamic landscape.</h2><div className="mt-8 grid gap-6 text-base leading-8 text-trace-muted"><p>TRACE Consulting is a strategic advisory firm specializing in international trade, economic policy, regulatory reform, digital government solutions, and implementation support.</p><p>We help governments, development partners, and the private sector modernize institutions, strengthen regulatory systems, and improve trade competitiveness through evidence-based policy, technology, and implementation support.</p><p>Our work bridges the gap between policy design and practical delivery—making reforms usable, systems resilient, and impact sustainable.</p></div></div></SectionReveal><SectionReveal delay={0.1}><figure className="relative aspect-[5/4] overflow-hidden border border-trace-ink/10 bg-white"><img src={ASSETS.aboutTrace} alt="Overhead view of professionals meeting around a collaborative table" className="absolute inset-0 h-full w-full object-cover" /></figure></SectionReveal></div></section><section className="bg-trace-navy py-20 text-white sm:py-24"><div className="mx-auto grid max-w-[1480px] gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10"><SectionReveal><p className="section-label !text-trace-mint">OUR MISSION</p><h2 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.06em] sm:text-5xl">Intelligent, sustainable, and inclusive solutions for stronger economies and institutions.</h2><p className="mt-7 max-w-xl text-base leading-8 text-white/78">TRACE integrates rigorous research with practical implementation to deliver lasting, measurable impact at scale—bridging the distance between policy ambition and institutional practice.</p></SectionReveal><SectionReveal delay={0.08}><div className="lg:border-l lg:border-white/18 lg:pl-12"><p className="section-label !text-trace-mint">OUR COMMITMENT</p><div className="mt-7 grid gap-x-9 gap-y-6 sm:grid-cols-2">{commitments.map((commitment) => <div key={commitment} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-trace-mint" /><p className="text-sm font-medium leading-6 text-white/88">{commitment}</p></div>)}</div><p className="mt-9 border-l-2 border-trace-teal pl-4 text-sm leading-6 text-white/76">We go beyond advisory—partnering closely to co-create lasting, meaningful change.</p></div></SectionReveal></div></section><section className="bg-white py-20 sm:py-24"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><SectionReveal><div className="max-w-3xl"><p className="section-label">HOW WE WORK</p><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink sm:text-5xl">From insight to sustained impact.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-trace-muted">A practical three-stage framework connects intelligence, implementation design, and durable client capability.</p></div></SectionReveal><div className="mt-10 grid gap-4 md:grid-cols-3">{framework.map(([number, title, body], index) => <SectionReveal key={title} delay={index * 0.06}><article className="relative min-h-[250px] border-l-2 border-t-2 border-trace-teal bg-trace-paper p-6"><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={12} borderWidth={1} /><p className="font-display text-[13px] font-black tracking-[0.1em] text-trace-teal">{number}</p><h3 className="mt-10 font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink">{title}</h3><p className="mt-4 text-sm leading-6 text-trace-muted">{body}</p></article></SectionReveal>)}</div></div></section><section className="bg-trace-paper py-20 sm:py-24"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><SectionReveal><div className="flex flex-col justify-between gap-5 border-b border-trace-ink/10 pb-8 sm:flex-row sm:items-end"><div><p className="section-label">WHAT MAKES TRACE DIFFERENT</p><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink sm:text-5xl">Depth that stays connected to delivery.</h2></div><p className="max-w-md text-sm leading-6 text-trace-muted">A systems perspective shaped by the settings where policy, technology, quality, and trade meet.</p></div></SectionReveal><div className="mt-8 grid gap-px border-l border-t border-trace-ink/10 sm:grid-cols-2 xl:grid-cols-4">{distinctions.map(([title, body], index) => <SectionReveal key={title} delay={index * 0.045}><article className="relative min-h-[238px] border-b border-r border-trace-ink/10 bg-white p-6"><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={13} borderWidth={1} /><p className="font-display text-[13px] font-black tracking-[0.1em] text-trace-teal">0{index + 1}</p><h3 className="mt-8 font-display text-2xl font-extrabold leading-[1.04] tracking-[-0.05em] text-trace-ink">{title}</h3><p className="mt-4 text-sm leading-6 text-trace-muted">{body}</p></article></SectionReveal>)}</div></div></section><section className="bg-white py-20"><div className="mx-auto grid max-w-[1480px] gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">{metrics.map((metric, index) => <SectionReveal key={metric.label} delay={index * 0.06}><p className="font-display text-5xl font-extrabold tracking-[-0.07em] text-trace-ink">{metric.value}</p><p className="mt-2 max-w-[12rem] text-sm leading-5 text-trace-muted">{metric.label}</p></SectionReveal>)}</div></section></main></Shell>;
}

export function ServicesPage() {
  return <Shell><main><PageHero label="SERVICES" title={<>Capabilities for <span className="text-trace-mint">systems that matter.</span></>} description="Integrated advisory, technology, research, and implementation services for more competitive, capable, and resilient institutions." tone="navy" /><section className="py-20 sm:py-28"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><div className="max-w-2xl"><p className="section-label">AREAS OF DELIVERY</p><h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink sm:text-5xl">Each service starts with context—and ends in capability.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map((service, index) => <SectionReveal key={service.slug} delay={index * 0.04}><Link href={`/services/${service.slug}`} className="group relative flex min-h-[415px] flex-col overflow-hidden border border-trace-ink/10 bg-white transition-transform duration-300 hover:-translate-y-1"><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1} /><div className="relative h-48 overflow-hidden bg-trace-paper"><img src={serviceImage(service)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-trace-ink/58 to-transparent" /><span className="absolute bottom-4 left-5 font-mono text-[9px] font-bold tracking-[0.14em] text-trace-mint">{service.solutions} INTEGRATED SOLUTIONS</span></div><div className="flex flex-1 flex-col p-7"><p className="font-mono text-[10px] font-bold tracking-[0.14em] text-trace-teal">{service.strapline.toUpperCase()}</p><h2 className="mt-4 font-display text-3xl font-extrabold leading-[0.98] tracking-[-0.055em] text-trace-ink">{service.title}</h2><p className="mt-5 text-sm leading-6 text-trace-muted">{service.description}</p><div className="mt-auto flex items-center justify-between border-t border-trace-ink/8 pt-5"><span className="text-xs font-bold text-trace-muted">View service briefing</span><ArrowUpRight className="h-5 w-5 text-trace-orange transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div></div></Link></SectionReveal>)}</div></div></section></main></Shell>;
}

function ServiceStoryChapter({ chapter, index, isActive, registerRef }: {
  chapter: { label: string; title: string; body: ReactNode };
  index: number;
  isActive: boolean;
  registerRef: (element: HTMLElement | null, index: number) => void;
}) {
  return (
    <article
      ref={(element) => registerRef(element, index)}
      data-service-chapter
      className={`relative border-l-2 pl-7 transition-colors duration-500 sm:pl-9 ${isActive ? "border-trace-teal" : "border-trace-ink/12"}`}
    >
      <span className={`absolute -left-[9px] top-1 h-4 w-4 border-2 bg-white transition-colors duration-500 ${isActive ? "border-trace-teal" : "border-trace-ink/25"}`} aria-hidden="true" />
      <p className={`font-mono text-[10px] font-bold tracking-[0.16em] transition-colors duration-500 ${isActive ? "text-trace-teal" : "text-trace-muted"}`}>{String(index + 1).padStart(2, "0")} · {chapter.label}</p>
      <h3 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] text-trace-ink sm:text-4xl">{chapter.title}</h3>
      <div className="mt-5 space-y-4 text-base leading-7 text-trace-muted">{chapter.body}</div>
    </article>
  );
}

export function ServiceDetailPage() {
  const [, params] = useRoute("/services/:slug");
  const service = services.find((item) => item.slug === params?.slug);
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const registerRef = useCallback((element: HTMLElement | null, index: number) => {
    chapterRefs.current[index] = element;
  }, []);

  useEffect(() => {
    if (!service) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const index = Number((visible[0].target as HTMLElement).dataset.chapterIndex);
          if (!Number.isNaN(index)) setActiveChapter(index);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.35, 0.6, 0.9] }
    );
    chapterRefs.current.forEach((element, index) => {
      if (element) {
        element.dataset.chapterIndex = String(index);
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, [service]);

  if (!service) return <NotFoundEntity />;
  const relatedProjects = projects.filter((project) => project.serviceSlugs.includes(service.slug));
  const relatedTeam = team.filter((member) => member.serviceSlugs.includes(service.slug));
  const relatedInsights = insights.filter((insight) => insight.serviceSlugs.includes(service.slug));

  const chapters = [
    {
      label: "OVERVIEW",
      title: "A service designed to move across the system.",
      body: (
        <>
          <p>{service.description}</p>
          <p>TRACE combines strategic advice with practical implementation, connecting the disciplines required to move an institutional need into a working capability.</p>
        </>
      ),
    },
    {
      label: "WHAT WE COVER",
      title: "The disciplines connected inside this service.",
      body: (
        <>
          <p>Each engagement blends the disciplines below into a single delivery track, tailored to the mandate, institutional setting, and related project record.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.disciplines.map((discipline) => (
              <li key={discipline} className="flex items-start gap-3 border border-trace-ink/10 bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-trace-teal" />
                <span className="text-sm font-extrabold text-trace-ink">{discipline}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      label: "HOW WE DELIVER",
      title: "Evidence, delivery, and ownership—together.",
      body: (
        <>
          <p>TRACE anchors every mandate in a three-stage rhythm: evidence-based diagnosis, technology-supported delivery, and institutional handover for lasting capability.</p>
          <p>Across {service.solutions} integrated solutions, this service ships with the tooling, documentation, and capacity-building needed for the receiving institution to sustain the change beyond the engagement.</p>
        </>
      ),
    },
    {
      label: "CONNECTED WORK",
      title: "See the record behind the recommendation.",
      body: (
        <>
          <p>Every TRACE service links to the projects, experts, and knowledge outputs that put it into practice. The rails below list the delivery records, subject-matter leads, and published insights currently connected to {service.title}.</p>
        </>
      ),
    },
  ];

  return (
    <Shell>
      <main>
        <DetailMediaHero label="SERVICE" title={<>{service.title}</>} description={service.description} kicker={`${service.solutions} INTEGRATED SOLUTIONS · ${service.strapline.toUpperCase()}`} image={serviceImage(service)} />
        <section className="bg-trace-paper py-16 sm:py-20">
          <div className="mx-auto max-w-[1300px] px-5 lg:px-10">
            <BackLink href="/services" label="services" />
            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:h-fit">
                <SectionReveal>
                  <figure className="relative overflow-hidden border border-trace-ink/10 bg-trace-navy shadow-[0_18px_44px_rgba(18,61,103,0.12)]">
                    <img src={serviceImage(service)} alt="" className="aspect-[5/4] w-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/72 via-trace-ink/10 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                      <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-trace-mint">TRACE SERVICE</p>
                      <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-4xl">{service.title}</h2>
                      <p className="mt-3 text-sm leading-6 text-white/85">{service.strapline}</p>
                    </figcaption>
                  </figure>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="border-l-2 border-t-2 border-trace-teal bg-white p-4">
                      <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-teal">SOLUTIONS</p>
                      <p className="mt-2 font-display text-3xl font-extrabold text-trace-ink">{service.solutions}</p>
                    </div>
                    <div className="border-l-2 border-t-2 border-trace-teal bg-white p-4">
                      <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-teal">DISCIPLINES</p>
                      <p className="mt-2 font-display text-3xl font-extrabold text-trace-ink">{service.disciplines.length}</p>
                    </div>
                  </div>
                  <nav aria-label="Service chapters" className="mt-6 hidden lg:block">
                    <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-trace-muted">CHAPTERS</p>
                    <ol className="mt-3 space-y-2">
                      {chapters.map((chapter, index) => (
                        <li key={chapter.label}>
                          <button
                            type="button"
                            onClick={() => chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" })}
                            className={`flex w-full items-center gap-3 border-l-2 py-1.5 pl-3 text-left text-xs font-extrabold transition-colors ${index === activeChapter ? "border-trace-teal text-trace-navy" : "border-trace-ink/12 text-trace-muted hover:text-trace-navy"}`}
                          >
                            <span className="font-mono">{String(index + 1).padStart(2, "0")}</span>
                            <span>{chapter.label}</span>
                          </button>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </SectionReveal>
              </div>

              <div className="space-y-14 sm:space-y-20">
                {chapters.map((chapter, index) => (
                  <ServiceStoryChapter
                    key={chapter.label}
                    chapter={chapter}
                    index={index}
                    isActive={index === activeChapter}
                    registerRef={registerRef}
                  />
                ))}
              </div>
            </div>

            <RelationshipRail title="Work we have delivered" action={<Link href="/projects" className="text-sm font-extrabold text-trace-teal">All projects <ArrowRight className="inline h-4 w-4" /></Link>}>{relatedProjects.length ? relatedProjects.map((project) => <MiniProject key={project.slug} project={project} />) : <p className="text-sm text-trace-muted">Project records will be connected here as they are published.</p>}</RelationshipRail>
            <RelationshipRail title="Experts in this area" action={<Link href="/team" className="text-sm font-extrabold text-trace-teal">Full team <ArrowRight className="inline h-4 w-4" /></Link>}>{relatedTeam.length ? relatedTeam.map((member) => <MiniMember key={member.slug} member={member} />) : <p className="text-sm text-trace-muted">Associated experts will be published here.</p>}</RelationshipRail>
            <RelationshipRail title="Relevant insights">{relatedInsights.length ? relatedInsights.map((insight) => <MiniInsight key={insight.slug} insight={insight} />) : <p className="text-sm text-trace-muted">Related insights will be published here.</p>}</RelationshipRail>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", ...services.map((service) => service.title)];
  const filtered = projects.filter((project) => {
    const serviceMatch = filter === "All" || project.serviceSlugs.some((slug) => services.find((service) => service.slug === slug)?.title === filter);
    const q = query.toLowerCase();
    return serviceMatch && (!q || `${project.title} ${project.client} ${project.summary}`.toLowerCase().includes(q));
  });
  return <Shell><main><PageHero label="PROJECTS" title={<>Work that <span className="text-trace-mint">changes systems.</span></>} description="Trade facilitation, laboratory strengthening, digital transformation, policy advisory, and capacity-building work across connected institutions." tone="navy" /><section className="py-16 sm:py-20"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><div className="flex flex-col gap-5 border-b border-trace-ink/10 pb-8 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-2">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`px-4 py-2 text-xs font-extrabold transition-colors ${filter === item ? "bg-trace-navy text-white" : "border border-trace-ink/12 bg-white text-trace-muted hover:border-trace-teal"}`}>{item}</button>)}</div><label className="flex w-full max-w-md items-center gap-3 border-b border-trace-ink/20 bg-white px-3 py-3"><Search className="h-4 w-4 text-trace-teal" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-trace-muted/70" /></label></div><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((project, index) => <SectionReveal key={project.slug} delay={index * 0.04}><StarBorder color="#009CA6" speed="8s" className="h-full"><Link href={`/projects/${project.slug}`} className="group flex min-h-[445px] flex-col overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1"><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1} /><div className="relative h-52 overflow-hidden bg-trace-paper"><img src={projectImage(project)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-trace-ink/64 to-transparent" /><div className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-4"><span className="font-mono text-[9px] font-bold tracking-[0.13em] text-trace-mint">{project.client.toUpperCase()}</span><span className="bg-white/90 px-2 py-1 text-[9px] font-bold text-trace-navy">{project.status}</span></div></div><div className="flex flex-1 flex-col p-7"><h2 className="font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.055em] text-trace-ink">{project.title}</h2><p className="mt-5 text-sm leading-6 text-trace-muted">{project.summary}</p><div className="mt-auto flex items-center justify-between border-t border-trace-ink/8 pt-5"><span className="text-xs font-bold text-trace-muted">{project.period}</span><span className="inline-flex items-center gap-2 text-xs font-extrabold text-trace-ink">View project <ArrowUpRight className="h-4 w-4 text-trace-orange transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span></div></div></Link></StarBorder></SectionReveal>)}</div>{filtered.length === 0 && <p className="py-16 text-center text-trace-muted">No project records match this search.</p>}</div></section></main></Shell>;
}

export function ProjectDetailPage() {
  const [, params] = useRoute("/projects/:slug");
  const project = projects.find((item) => item.slug === params?.slug);
  if (!project) return <NotFoundEntity />;
  const relatedServices = services.filter((service) => project.serviceSlugs.includes(service.slug));
  const contributors = team.filter((member) => project.teamSlugs.includes(member.slug));
  const relatedInsights = insights.filter((insight) => insight.projectSlugs.includes(project.slug));
  return <Shell><main><DetailMediaHero label="PROJECT" title={<>{project.title}</>} description={project.summary} kicker={`${project.client.toUpperCase()} · ${project.period} · ${project.status.toUpperCase()}`} image={projectImage(project)} /><section className="bg-trace-paper py-16 sm:py-20"><div className="mx-auto max-w-[1200px] px-5 lg:px-10"><BackLink href="/projects" label="projects" /><div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]"><SectionReveal><p className="section-label">PROJECT OVERVIEW</p><h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.06em] text-trace-ink">A practical intervention with an institutional line of sight.</h2><div className="mt-7 grid gap-5 text-base leading-8 text-trace-muted"><p>{project.summary}</p><p>This TRACE record links the mandate with its named client, connected service areas, delivery team, and published knowledge content—so the work remains visible in context.</p></div><div className="mt-10 border-l-2 border-trace-teal bg-white p-6"><p className="font-mono text-[10px] font-bold tracking-[0.16em] text-trace-teal">DELIVERY RECORD</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><p className="text-xs font-bold text-trace-muted">CONNECTED SERVICES</p><p className="mt-1 font-display text-2xl font-extrabold text-trace-ink">{relatedServices.length}</p></div><div><p className="text-xs font-bold text-trace-muted">PUBLISHED CONTRIBUTORS</p><p className="mt-1 font-display text-2xl font-extrabold text-trace-ink">{contributors.length}</p></div></div></div></SectionReveal><SectionReveal delay={0.08}><aside className="relative overflow-hidden border border-trace-ink/10 bg-white p-7"><div className="absolute left-0 top-0 h-1 w-full bg-trace-teal" /><p className="section-label">PROJECT FACTS</p><dl className="mt-6 divide-y divide-trace-ink/8"><div className="flex justify-between gap-5 py-4"><dt className="text-xs font-bold text-trace-muted">Client</dt><dd className="max-w-[60%] text-right text-xs font-extrabold text-trace-ink">{project.client}</dd></div><div className="flex justify-between gap-5 py-4"><dt className="text-xs font-bold text-trace-muted">Period</dt><dd className="text-right text-xs font-extrabold text-trace-ink">{project.period}</dd></div><div className="flex justify-between gap-5 py-4"><dt className="text-xs font-bold text-trace-muted">Status</dt><dd className="text-right text-xs font-extrabold text-trace-teal">{project.status}</dd></div><div className="py-4"><dt className="text-xs font-bold text-trace-muted">Service areas</dt><dd className="mt-3 flex flex-wrap gap-2">{relatedServices.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}><EntityTag>{service.title.toUpperCase()}</EntityTag></Link>)}</dd></div></dl></aside></SectionReveal></div><RelationshipRail title="Experts on this mandate" action={<Link href="/team" className="text-sm font-extrabold text-trace-teal">Full team <ArrowRight className="inline h-4 w-4" /></Link>}>{contributors.length ? contributors.map((member) => <MiniMember key={member.slug} member={member} />) : <p className="text-sm text-trace-muted">Contributors will be connected here as they are verified.</p>}</RelationshipRail><RelationshipRail title="Related insights">{relatedInsights.length ? relatedInsights.map((insight) => <MiniInsight key={insight.slug} insight={insight} />) : <p className="text-sm text-trace-muted">Related knowledge content will be added as it is published.</p>}</RelationshipRail></div></section></main></Shell>;
}

export function TeamPage() {
  return <Shell><main><PageHero label="OUR TEAM" title={<>Experts who <span className="text-trace-mint">drive change.</span></>} description="A permanent core of trade specialists, researchers, technologists, policy professionals, and implementation partners." tone="navy" /><section className="py-20 sm:py-28"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><div className="grid gap-px border-l border-t border-trace-ink/10 sm:grid-cols-2 lg:grid-cols-3">{team.map((member, index) => <SectionReveal key={member.slug} delay={index * 0.04}><Link href={`/team/${member.slug}`} className="group flex min-h-[365px] flex-col border-b border-r border-trace-ink/10 bg-white transition-colors hover:bg-trace-paper"><div className="relative h-52 overflow-hidden bg-trace-paper"><TeamPortrait member={member} className="h-full w-full" imageClassName="transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-trace-ink/25 to-transparent" /><ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-trace-orange transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><div className="flex flex-1 flex-col p-7"><p className="font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink">{member.name}</p><p className="mt-3 max-w-xs text-sm font-bold leading-5 text-trace-muted">{member.role}</p><p className="mt-auto pt-5 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-teal">{member.specialty.toUpperCase()}</p></div></Link></SectionReveal>)}</div></div></section></main></Shell>;
}

export function TeamDetailPage() {
  const [, params] = useRoute("/team/:slug");
  const member = team.find((item) => item.slug === params?.slug);
  if (!member) return <NotFoundEntity />;
  const memberServices = services.filter((service) => member.serviceSlugs.includes(service.slug));
  const memberProjects = projects.filter((project) => member.projectSlugs.includes(project.slug));
  const memberInsights = insights.filter((insight) => insight.teamSlugs.includes(member.slug));
  return <Shell><main><PageHero label="TEAM MEMBER" title={<>{member.name}</>} description={member.bio} kicker={`${member.role.toUpperCase()} · ${member.specialty.toUpperCase()}`} /><section className="bg-trace-paper py-16"><div className="mx-auto max-w-[1120px] px-5 lg:px-10"><BackLink href="/team" label="team" /><div className="mt-11 grid gap-8 lg:grid-cols-[0.55fr_1.45fr]"><SectionReveal><div className="max-w-[300px] overflow-hidden bg-white ring-1 ring-trace-ink/10"><TeamPortrait member={member} className="aspect-square" imageClassName="p-4" /></div></SectionReveal><SectionReveal delay={0.1}><p className="section-label">AREAS OF PRACTICE</p><h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink">Relevant work, visible expertise.</h2><p className="mt-6 max-w-2xl text-base leading-8 text-trace-muted">{member.bio}</p><div className="mt-7 flex flex-wrap gap-2">{memberServices.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}><EntityTag>{service.title.toUpperCase()}</EntityTag></Link>)}</div></SectionReveal></div><RelationshipRail title="Relevant projects">{memberProjects.length ? memberProjects.map((project) => <MiniProject key={project.slug} project={project} />) : <p className="text-sm text-trace-muted">Relevant projects will be added as they are verified.</p>}</RelationshipRail><RelationshipRail title="Related insights">{memberInsights.length ? memberInsights.map((insight) => <MiniInsight key={insight.slug} insight={insight} />) : <p className="text-sm text-trace-muted">Related insights will be added as they are published.</p>}</RelationshipRail></div></section></main></Shell>;
}

export function InsightsPage() {
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const types = ["All", "Video", "Article", "Publication", "Meeting", "Event", "Brochure"];
  const displayed = useMemo(() => insights.filter((insight) => (type === "All" || insight.type === type) && (!query || `${insight.title} ${insight.summary}`.toLowerCase().includes(query.toLowerCase()))), [type, query]);
  return <Shell><main><PageHero label="KNOWLEDGE & RESEARCH" title={<>Ideas that move <span className="text-trace-teal">trade forward.</span></>} description="Videos, articles, publications, and brochures from TRACE’s growing body of published knowledge." tone="dark" kicker={`${insights.length} PUBLISHED INSIGHT RECORDS`} /><section className="py-16 sm:py-20"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><div className="flex flex-col gap-5 border-b border-trace-ink/10 pb-8 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-2">{types.map((item) => <button key={item} onClick={() => setType(item)} className={`px-4 py-2 text-xs font-extrabold transition-colors ${type === item ? "border-b-2 border-trace-orange text-trace-navy" : "text-trace-muted hover:text-trace-navy"}`}>{item.toUpperCase()}</button>)}</div><label className="flex w-full max-w-md items-center gap-3 border border-trace-ink/12 bg-white px-3 py-3"><Search className="h-4 w-4 text-trace-teal" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search knowledge" className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-trace-muted/70" /></label></div><p className="mt-7 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-muted">SHOWING {displayed.length} INSIGHT{displayed.length === 1 ? "" : "S"}</p><div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{displayed.map((insight, index) => <SectionReveal key={insight.slug} delay={index * 0.04}><StarBorder color="#009CA6" speed="8s" className="h-full"><Link href={`/insights/${insight.slug}`} className="group flex min-h-[465px] flex-col overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1"><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1} /><div className="relative h-48 overflow-hidden bg-trace-paper"><img src={insightImage(insight)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-trace-ink/55 to-transparent" /><span className="absolute left-5 top-5 bg-trace-navy px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.13em] text-white">{insight.type.toUpperCase()}</span></div><div className="flex flex-1 flex-col p-7"><p className="font-mono text-[9px] font-bold tracking-[0.13em] text-trace-teal">{insight.date.toUpperCase()}</p><h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.055em] text-trace-ink">{insight.title}</h2><p className="mt-5 line-clamp-4 text-sm leading-6 text-trace-muted">{insight.summary}</p><div className="mt-auto flex items-center justify-between border-t border-trace-ink/8 pt-5"><span className="text-xs font-bold text-trace-muted">Open insight</span><ArrowUpRight className="h-5 w-5 text-trace-orange transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div></div></Link></StarBorder></SectionReveal>)}</div>{displayed.length === 0 && <p className="py-16 text-center text-trace-muted">No insights match this search.</p>}</div></section></main></Shell>;
}

export function InsightDetailPage() {
  const [, params] = useRoute("/insights/:slug");
  const insight = insights.find((item) => item.slug === params?.slug);
  if (!insight) return <NotFoundEntity />;
  const relatedServices = services.filter((service) => insight.serviceSlugs.includes(service.slug));
  const relatedProjects = projects.filter((project) => insight.projectSlugs.includes(project.slug));
  const relatedTeam = team.filter((member) => insight.teamSlugs.includes(member.slug));
  return <Shell><main><DetailMediaHero label={insight.type.toUpperCase()} title={<>{insight.title}</>} description={insight.summary} kicker={insight.date.toUpperCase()} image={insightImage(insight)} /><section className="bg-trace-paper py-16 sm:py-20"><div className="mx-auto max-w-[1200px] px-5 lg:px-10"><BackLink href="/insights" label="insights" /><div className="mt-12 grid gap-12 lg:grid-cols-[1.18fr_0.82fr]"><SectionReveal><article className="bg-white p-7 sm:p-10">{insight.type === "Video" && <a href={insight.sourceUrl} target="_blank" rel="noreferrer" className="group relative grid aspect-video place-items-center overflow-hidden bg-trace-ink"><img src={insightImage(insight)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-105" /><span className="relative grid h-16 w-16 place-items-center rounded-full border border-white/60 bg-trace-navy/80 text-white"><PlayCircle className="h-8 w-8 text-trace-mint" /></span></a>}<p className="mt-7 font-mono text-[10px] font-bold tracking-[0.16em] text-trace-teal">TRACE KNOWLEDGE RECORD</p><h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.055em] text-trace-ink">A TRACE perspective.</h2><p className="mt-5 text-base leading-8 text-trace-muted">{insight.summary} The original source remains available through the verified destination associated with this record.</p><SourceAction insight={insight} /></article></SectionReveal><SectionReveal delay={0.08}><aside className="relative overflow-hidden border border-trace-ink/10 bg-white p-7"><div className="absolute left-0 top-0 h-1 w-full bg-trace-teal" /><p className="section-label">FOLLOW THE IDEA</p><div className="mt-5 flex flex-wrap gap-2">{relatedServices.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}><EntityTag>{service.title.toUpperCase()}</EntityTag></Link>)}</div><p className="mt-9 font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">FORMAT</p><p className="mt-2 font-display text-2xl font-extrabold text-trace-ink">{insight.type}</p><p className="mt-1 text-sm text-trace-muted">{insight.date}</p><SourceAction insight={insight} /></aside></SectionReveal></div><RelationshipRail title="Related projects">{relatedProjects.length ? relatedProjects.map((project) => <MiniProject key={project.slug} project={project} />) : <p className="text-sm text-trace-muted">Related projects will be connected as they are verified.</p>}</RelationshipRail><RelationshipRail title="Relevant experts">{relatedTeam.length ? relatedTeam.map((member) => <MiniMember key={member.slug} member={member} />) : <p className="text-sm text-trace-muted">Relevant experts will be connected as they are verified.</p>}</RelationshipRail></div></section></main></Shell>;
}

export function InnovationsPage() {
  return <Shell><main><PageHero label="OUR INNOVATIONS" title={<>Intelligence that makes the next <span className="text-trace-teal">move visible.</span></>} description="Digital products that turn complex trade rules, export priorities, and scattered data into usable decisions." tone="dark" /><section className="bg-trace-paper py-20 sm:py-28"><div className="mx-auto grid max-w-[1480px] gap-7 px-5 lg:px-10">{innovations.map((innovation, index) => <SectionReveal key={innovation.slug} delay={index * 0.08}><motion.article whileHover={{ y: -7 }} transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }} className="group grid overflow-hidden border border-trace-ink/10 bg-white lg:grid-cols-[1.1fr_0.9fr]"><div className="relative min-h-[320px] overflow-hidden bg-trace-ink"><img src={innovation.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-tr from-trace-ink/78 via-trace-ink/22 to-transparent" /><div className="absolute bottom-7 left-7 flex flex-wrap gap-2">{innovation.tags.map((tag) => <span key={tag} className="border border-white/22 bg-white/10 px-3 py-2 font-mono text-[10px] font-bold tracking-[0.12em] text-trace-mint">{tag.toUpperCase()}</span>)}</div></div><div className="flex flex-col justify-between p-8 sm:p-10"><div><p className="section-label">TRACE PRODUCT 0{index + 1}</p><h2 className="mt-5 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.06em] text-trace-ink">{innovation.title}</h2><p className="mt-6 text-sm leading-7 text-trace-muted">{innovation.description}</p></div><a href={innovation.url} target="_blank" rel="noreferrer" className="mt-10 inline-flex w-fit items-center gap-2 border-b border-trace-teal pb-2 text-sm font-extrabold text-trace-ink transition-transform duration-200 group-hover:translate-x-1">Visit platform <ExternalLink className="h-4 w-4 text-trace-orange" /></a></div></motion.article></SectionReveal>)}</div></section></main></Shell>;
}

type CareerRole = {
  slug: string;
  title: string;
  discipline: string;
  experience: string;
  deadline: string;
  postedDate: string;
  employment: string;
  location: string;
  intro: string;
  responsibilities: string[];
  requirements: string[];
};

const roles: CareerRole[] = [
  {
    slug: "trade-economist",
    title: "Trade Economist",
    discipline: "Trade Policy & Facilitation",
    experience: "8–10 years",
    deadline: "2026-09-03",
    postedDate: "2026-08-20",
    employment: "Full-time",
    location: "Mohakhali DOHS, Dhaka, Bangladesh",
    intro: "This role sits within TRACE's Trade Policy & Facilitation team, contributing to evidence-based advisory work on cross-border trade, tariff modernisation, and institutional reform programmes.",
    responsibilities: [
      "Lead economic and trade policy analysis on active TRACE mandates.",
      "Design evidence-based recommendations for institutional and regulatory reform.",
      "Support cross-border trade facilitation and tariff modernisation programmes.",
    ],
    requirements: [
      "Postgraduate qualification in economics, trade policy, or a related field.",
      "8+ years of applied trade or public-policy experience.",
      "Strong quantitative analysis and briefing communication skills.",
    ],
  },
  {
    slug: "accounts-finance-executive",
    title: "Accounts & Finance Executive",
    discipline: "Accounts & Finance",
    experience: "2–3 years",
    deadline: "2026-09-03",
    postedDate: "2026-08-20",
    employment: "Full-time",
    location: "Mohakhali DOHS, Dhaka, Bangladesh",
    intro: "The Accounts & Finance Executive supports TRACE's financial operations, keeping day-to-day records, reconciliations, and reporting cycles running cleanly.",
    responsibilities: [
      "Manage day-to-day bookkeeping, invoicing, and financial records.",
      "Support monthly reconciliation and reporting cycles.",
      "Coordinate with external auditors and tax advisors.",
    ],
    requirements: [
      "Bachelor's in accounting, finance, or a related field.",
      "2+ years of accounts or finance experience in a professional-services setting.",
      "Working knowledge of common accounting platforms and tax compliance.",
    ],
  },
  {
    slug: "manager-business-development",
    title: "Manager — Business Development",
    discipline: "Communications & Business Development",
    experience: "6–7 years",
    deadline: "2026-08-31",
    postedDate: "2026-08-18",
    employment: "Full-time",
    location: "Mohakhali DOHS, Dhaka, Bangladesh",
    intro: "The Business Development Manager identifies qualified opportunities across TRACE's service areas and leads proposal development, partner outreach, and strategic pitches.",
    responsibilities: [
      "Identify and develop qualified opportunities across TRACE service areas.",
      "Lead proposal development, partner outreach, and client relationship building.",
      "Coordinate with technical leads to shape bids and strategic pitches.",
    ],
    requirements: [
      "6+ years of business-development experience in consulting, development, or trade.",
      "Strong writing, stakeholder engagement, and proposal-management skills.",
      "Demonstrable track record of qualified pipeline generation.",
    ],
  },
  {
    slug: "lead-full-stack-developer",
    title: "Lead Full Stack Developer",
    discipline: "Software Development / Engineering",
    experience: "7–8 years",
    deadline: "2026-08-31",
    postedDate: "2026-08-18",
    employment: "Full-time",
    location: "Mohakhali DOHS, Dhaka, Bangladesh",
    intro: "The Lead Full Stack Developer owns the technical delivery of TRACE's digital products end-to-end, from architecture and code quality to mentoring the engineering team.",
    responsibilities: [
      "Lead delivery of TRACE digital products across the full stack.",
      "Own architecture, code quality, and technical mentorship for the engineering team.",
      "Partner with product and policy leads to translate mandates into working systems.",
    ],
    requirements: [
      "7+ years of full-stack engineering experience with modern JavaScript/TypeScript stacks.",
      "Hands-on experience with React, Node.js, and relational databases.",
      "Comfort operating cloud infrastructure and CI/CD pipelines.",
    ],
  },
  {
    slug: "research-intern",
    title: "Research Intern",
    discipline: "Research & Business Development",
    experience: "Entry level",
    deadline: "2026-08-27",
    postedDate: "2026-08-14",
    employment: "Internship",
    location: "Mohakhali DOHS, Dhaka, Bangladesh",
    intro: "The Research Intern supports desk research across trade, policy, and quality-systems topics and helps prepare briefing notes, literature reviews, and internal databases.",
    responsibilities: [
      "Support desk research across trade, policy, and quality-systems topics.",
      "Help prepare briefing notes, literature reviews, and internal databases.",
      "Coordinate content for TRACE knowledge outputs.",
    ],
    requirements: [
      "Current student or recent graduate in economics, public policy, or a related field.",
      "Strong writing and analytical skills.",
      "Curiosity, attention to detail, and reliability with deadlines.",
    ],
  },
];

function isDeadlinePassed(iso: string, now: Date = new Date()) {
  // Treat the deadline day itself as still open: applications close at end-of-day on the deadline.
  const [year, month, day] = iso.split("-").map(Number);
  const endOfDeadline = new Date(year, month - 1, day, 23, 59, 59, 999);
  return now.getTime() > endOfDeadline.getTime();
}

function formatDeadline(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function CareerRoleCard({ role, expired }: { role: CareerRole; expired: boolean }) {
  return (
    <Link
      href={`/careers/${role.slug}`}
      aria-label={`${expired ? "View closed role" : "View and apply for"}: ${role.title}`}
      className={`group relative block overflow-hidden border bg-white transition-all ${expired ? "border-trace-ink/12 hover:border-trace-ink/25" : "border-trace-ink/10 hover:-translate-y-0.5 hover:border-trace-teal/55 hover:shadow-[0_18px_38px_rgba(18,61,103,0.12)]"}`}
    >
      {expired && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[repeating-linear-gradient(135deg,_rgba(8,36,64,0.035)_0_10px,_transparent_10px_22px)]" />
      )}
      <div
        className={`grid grid-cols-1 items-start gap-5 px-5 py-6 sm:px-7 md:grid-cols-[1.4fr_1fr_0.9fr_auto] md:items-center ${expired ? "opacity-70 grayscale-[45%]" : ""}`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[9px] font-black tracking-[0.14em] ${expired ? "border-trace-ink/20 bg-trace-paper text-trace-muted" : "border-trace-teal/40 bg-trace-teal/10 text-trace-teal"}`}>
              {expired ? <XCircle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
              {expired ? "APPLICATIONS CLOSED" : "OPEN POSITION"}
            </span>
            <span className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-muted">{role.employment.toUpperCase()}</span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.055em] text-trace-ink sm:text-3xl">{role.title}</h3>
          <p className="mt-2 text-sm text-trace-muted">{role.discipline}</p>
        </div>
        <p className="flex items-center gap-2 text-sm font-bold text-trace-muted"><MapPin className="h-4 w-4 text-trace-teal" />Mohakhali DOHS, Dhaka</p>
        <p className="text-sm text-trace-muted">
          <span className="font-bold text-trace-ink">{role.experience}</span><br />
          <span className={expired ? "text-trace-muted" : "text-trace-navy"}>{expired ? "Closed" : "Closes"} {formatDeadline(role.deadline)}</span>
        </p>
        <span className={`inline-flex items-center gap-1.5 justify-self-start text-xs font-extrabold md:justify-self-end ${expired ? "text-trace-muted" : "text-trace-navy transition-transform group-hover:translate-x-0.5"}`}>
          {expired ? "View closed role" : "View & apply"}
          <ArrowUpRight className={`h-4 w-4 ${expired ? "text-trace-muted" : "text-trace-orange"}`} />
        </span>
      </div>
      {expired && (
        <span aria-hidden="true" className="pointer-events-none absolute right-4 top-4 z-[2] rotate-6 border-2 border-trace-ink/25 px-3 py-1 font-mono text-[10px] font-black tracking-[0.18em] text-trace-ink/45">
          CLOSED
        </span>
      )}
    </Link>
  );
}

export function CareersPage() {
  const now = new Date();
  const rolesWithStatus = roles.map((role) => ({ role, expired: isDeadlinePassed(role.deadline, now) }));
  const openRoles = rolesWithStatus.filter((entry) => !entry.expired);
  const closedRoles = rolesWithStatus.filter((entry) => entry.expired);
  return (
    <Shell>
      <main>
        <PageHero label="CAREERS" title={<>Work that <span className="text-trace-mint">matters.</span></>} description="Join a growing team of trade specialists, researchers, technologists, and project managers working on consequential reform programmes in South Asia." tone="navy" />
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
            <div className="flex flex-col justify-between gap-6 border-b border-trace-ink/10 pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="section-label">CURRENT OPPORTUNITIES</p>
                <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink">Find your next line of impact.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-trace-muted">Expand any role to see responsibilities, requirements, and the current application status. Applications close at the end of each posted deadline.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-none border border-trace-teal/40 bg-trace-teal/10 px-3 py-2 text-center">
                  <p className="font-display text-2xl font-extrabold text-trace-navy">{openRoles.length}</p>
                  <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-teal">OPEN</p>
                </div>
                <div className="rounded-none border border-trace-ink/12 bg-trace-paper px-3 py-2 text-center">
                  <p className="font-display text-2xl font-extrabold text-trace-ink/70">{closedRoles.length}</p>
                  <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-muted">CLOSED</p>
                </div>
              </div>
            </div>

            {openRoles.length > 0 && (
              <div className="mt-10">
                <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">ACCEPTING APPLICATIONS</p>
                <div className="mt-5 grid gap-4">
                  {openRoles.map(({ role, expired }, index) => (
                    <SectionReveal key={role.title} delay={index * 0.04}>
                      <CareerRoleCard role={role} expired={expired} />
                    </SectionReveal>
                  ))}
                </div>
              </div>
            )}

            {closedRoles.length > 0 && (
              <div className="mt-14">
                <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-muted">CLOSED — APPLICATIONS NO LONGER ACCEPTED</p>
                <div className="mt-5 grid gap-4">
                  {closedRoles.map(({ role, expired }, index) => (
                    <SectionReveal key={role.title} delay={index * 0.04}>
                      <CareerRoleCard role={role} expired={expired} />
                    </SectionReveal>
                  ))}
                </div>
              </div>
            )}

            {rolesWithStatus.length === 0 && (
              <p className="mt-16 text-center text-trace-muted">No open roles are currently published.</p>
            )}

            <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-trace-ink/10 pt-8 sm:flex-row sm:items-center">
              <p className="max-w-xl text-sm text-trace-muted">Don't see the right fit? TRACE welcomes expressions of interest from specialists across trade, policy, laboratories, and technology.</p>
              <SpecularButton
                href="mailto:contact@traceconsultingltd.com?subject=TRACE%20General%20CV%20Submission"
                size="lg"
                radius={4}
                baseColor="#123D67"
                textColor="#ffffff"
                lineColor="#D7F3F0"
                shineSize={10}
                shineFade={45}
                intensity={1}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={280}
              >
                Send your CV <Mail className="h-4 w-4" />
              </SpecularButton>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function formatFullDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function CareerApplyForm({ role, disabled }: { role: CareerRole; disabled: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (disabled) return;
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div className="grid min-h-[380px] place-items-center px-6 py-8 text-center">
        <div>
          <CheckCircle2 className="mx-auto h-12 w-12 text-trace-teal" />
          <h3 className="mt-5 font-display text-2xl font-extrabold tracking-[-0.05em] text-trace-ink">Application received.</h3>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-trace-muted">Thanks for applying for the {role.title} role. Our team will review your submission and follow up if there's a match.</p>
          <button onClick={() => { setSubmitted(false); setFileName(null); }} type="button" className="mt-6 text-sm font-extrabold text-trace-teal">Submit another application</button>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="grid gap-4 p-6 sm:p-7">
      <label className="grid gap-2">
        <span className="text-xs font-bold text-trace-ink">Full Name <span className="text-trace-orange">*</span></span>
        <input required disabled={disabled} name="fullName" type="text" placeholder="Enter your name" className="border border-trace-ink/12 bg-trace-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-trace-teal disabled:cursor-not-allowed disabled:opacity-60" />
      </label>
      <label className="grid gap-2">
        <span className="text-xs font-bold text-trace-ink">Email Address <span className="text-trace-orange">*</span></span>
        <input required disabled={disabled} name="email" type="email" placeholder="email@example.com" className="border border-trace-ink/12 bg-trace-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-trace-teal disabled:cursor-not-allowed disabled:opacity-60" />
      </label>
      <label className="grid gap-2">
        <span className="text-xs font-bold text-trace-ink">Phone Number <span className="text-trace-orange">*</span></span>
        <input required disabled={disabled} name="phone" type="tel" placeholder="+880 ..." className="border border-trace-ink/12 bg-trace-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-trace-teal disabled:cursor-not-allowed disabled:opacity-60" />
      </label>
      <div className="grid gap-2">
        <span className="text-xs font-bold text-trace-ink">Upload CV (PDF, DOC / DOCX) <span className="text-trace-orange">*</span></span>
        <label className={`flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-trace-ink/20 bg-trace-paper px-4 py-6 text-center transition-colors hover:border-trace-teal ${disabled ? "cursor-not-allowed opacity-60 hover:border-trace-ink/20" : ""}`}>
          <Upload className="h-6 w-6 text-trace-teal" />
          <span className="text-xs font-bold text-trace-navy">{fileName ?? "Click to upload or drag & drop"}</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            required
            disabled={disabled}
            className="sr-only"
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
          />
        </label>
      </div>
      <div className="mt-2">
        {disabled ? (
          <span aria-disabled="true" className="flex w-full cursor-not-allowed items-center justify-center gap-2 border border-trace-ink/15 bg-trace-paper px-5 py-3 text-sm font-extrabold text-trace-muted">
            Applications Closed <XCircle className="h-4 w-4" />
          </span>
        ) : (
          <div className="[&_button]:w-full">
            <SpecularButton
              type="submit"
              size="lg"
              radius={4}
              baseColor="#123D67"
              textColor="#ffffff"
              lineColor="#D7F3F0"
              shineSize={10}
              shineFade={45}
              intensity={1}
              thickness={1}
              speed={0.35}
              followMouse
              proximity={280}
            >
              Submit Application <Send className="h-4 w-4" />
            </SpecularButton>
          </div>
        )}
      </div>
      <p className="text-[10px] leading-4 text-trace-muted">By submitting, you confirm the information provided is accurate. TRACE stores applications only for the recruitment process for this role.</p>
    </form>
  );
}

export function CareerDetailPage() {
  const [, params] = useRoute("/careers/:slug");
  const role = roles.find((item) => item.slug === params?.slug);
  if (!role) return <NotFoundEntity />;
  const expired = isDeadlinePassed(role.deadline);
  return (
    <Shell>
      <main>
        <section className="relative overflow-hidden bg-trace-navy pt-36 text-white sm:pt-44">
          <div className="pointer-events-none absolute inset-0 opacity-40 hero-grid" />
          <div className="pointer-events-none absolute right-[8%] top-[-18%] h-[360px] w-[360px] rounded-full bg-trace-teal/20 blur-[90px]" />
          <div className="relative mx-auto max-w-[1300px] px-5 pb-16 lg:px-10 sm:pb-20">
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-extrabold text-white/85 transition-colors hover:text-trace-mint">
              <ArrowLeft className="h-4 w-4 text-trace-mint" />Back to Careers
            </Link>
            <p className="mt-8 section-label !text-trace-mint">{role.discipline.toUpperCase()}</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-6xl">{role.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[10px] font-black tracking-[0.16em] ${expired ? "border-white/25 bg-white/8 text-white/70" : "border-trace-mint/45 bg-trace-mint/12 text-trace-mint"}`}>
                {expired ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                {expired ? "APPLICATIONS CLOSED" : "OPEN POSITION"}
              </span>
              <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-white/70">{role.employment.toUpperCase()}</span>
              <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-white/70">{role.location.toUpperCase()}</span>
            </div>
          </div>
        </section>

        <section className="bg-trace-paper py-16 sm:py-20">
          <div className="mx-auto max-w-[1300px] px-5 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:gap-14">
              <div className="min-w-0">
                <SectionReveal>
                  <p className="text-base leading-7 text-trace-muted sm:text-lg sm:leading-8">{role.intro}</p>
                </SectionReveal>

                <SectionReveal delay={0.06}>
                  <div className="mt-12 border-t border-trace-ink/10 pt-8">
                    <p className="section-label">KEY RESPONSIBILITIES</p>
                    <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink sm:text-4xl">What you'll do.</h2>
                    <ul className="mt-6 space-y-4">
                      {role.responsibilities.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-7 text-trace-muted sm:text-base">
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-trace-teal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.08}>
                  <div className="mt-12 border-t border-trace-ink/10 pt-8">
                    <p className="section-label">REQUIRED QUALIFICATIONS</p>
                    <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink sm:text-4xl">What we're looking for.</h2>
                    <ul className="mt-6 space-y-4">
                      {role.requirements.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-7 text-trace-muted sm:text-base">
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-trace-teal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionReveal>
              </div>

              <aside className="lg:sticky lg:top-28 lg:h-fit">
                <SectionReveal delay={0.1}>
                  <div className="overflow-hidden border border-trace-ink/10 bg-white shadow-[0_16px_38px_rgba(18,61,103,0.10)]">
                    <div className="border-b border-trace-ink/10 bg-trace-paper px-6 py-5 sm:px-7">
                      <p className="font-mono text-[10px] font-black tracking-[0.16em] text-trace-teal">SUMMARY</p>
                    </div>
                    <dl className="grid gap-4 px-6 py-6 sm:px-7">
                      <div className="grid grid-cols-[minmax(0,120px)_1fr] items-start gap-4">
                        <dt className="flex items-center gap-2 text-xs font-bold text-trace-muted"><Briefcase className="h-4 w-4 text-trace-teal" />Employment</dt>
                        <dd className="text-right text-sm font-extrabold text-trace-ink">{role.employment}</dd>
                      </div>
                      <div className="grid grid-cols-[minmax(0,120px)_1fr] items-start gap-4 border-t border-trace-ink/8 pt-4">
                        <dt className="flex items-center gap-2 text-xs font-bold text-trace-muted"><MapPin className="h-4 w-4 text-trace-teal" />Location</dt>
                        <dd className="text-right text-sm font-extrabold text-trace-ink">{role.location}</dd>
                      </div>
                      <div className="grid grid-cols-[minmax(0,120px)_1fr] items-start gap-4 border-t border-trace-ink/8 pt-4">
                        <dt className="flex items-center gap-2 text-xs font-bold text-trace-muted"><Clock className="h-4 w-4 text-trace-teal" />Experience</dt>
                        <dd className="text-right text-sm font-extrabold text-trace-ink">{role.experience}</dd>
                      </div>
                      <div className="grid grid-cols-[minmax(0,120px)_1fr] items-start gap-4 border-t border-trace-ink/8 pt-4">
                        <dt className="flex items-center gap-2 text-xs font-bold text-trace-muted"><CalendarDays className="h-4 w-4 text-trace-teal" />Deadline</dt>
                        <dd className={`text-right text-sm font-extrabold ${expired ? "text-trace-muted line-through" : "text-trace-ink"}`}>{formatFullDate(role.deadline)}</dd>
                      </div>
                      <div className="grid grid-cols-[minmax(0,120px)_1fr] items-start gap-4 border-t border-trace-ink/8 pt-4">
                        <dt className="flex items-center gap-2 text-xs font-bold text-trace-muted"><CalendarDays className="h-4 w-4 text-trace-teal" />Posted</dt>
                        <dd className="text-right text-sm font-extrabold text-trace-ink">{formatFullDate(role.postedDate)}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-6 overflow-hidden border border-trace-ink/10 bg-white shadow-[0_16px_38px_rgba(18,61,103,0.10)]">
                    <div className="flex items-center justify-between border-b border-trace-ink/10 bg-trace-paper px-6 py-5 sm:px-7">
                      <p className="font-mono text-[10px] font-black tracking-[0.16em] text-trace-teal">APPLY FOR THIS POSITION</p>
                      {expired && (
                        <span className="inline-flex items-center gap-1.5 border border-trace-ink/20 bg-white px-2.5 py-1 font-mono text-[9px] font-black tracking-[0.14em] text-trace-muted">
                          <XCircle className="h-3 w-3" />CLOSED
                        </span>
                      )}
                    </div>
                    {expired && (
                      <div className="border-b border-trace-ink/8 bg-trace-paper/60 px-6 py-4 sm:px-7">
                        <p className="text-xs leading-5 text-trace-muted">This position closed on <span className="font-bold text-trace-ink">{formatFullDate(role.deadline)}</span>. Applications are no longer being accepted. Browse the open roles listed on the careers page.</p>
                      </div>
                    )}
                    <CareerApplyForm role={role} disabled={expired} />
                  </div>
                </SectionReveal>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-trace-navy py-14 text-white sm:py-16">
          <div className="mx-auto flex max-w-[1300px] flex-col items-start justify-between gap-6 px-5 lg:flex-row lg:items-center lg:gap-10 lg:px-10">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-mint">EXPLORE MORE OPPORTUNITIES</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-4xl">Not quite the right fit? <span className="text-trace-mint">Keep looking.</span></h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">TRACE welcomes applications for open roles across trade, policy, laboratories, and technology.</p>
            </div>
            <Link href="/careers" className="inline-flex items-center gap-2 border border-trace-mint/45 bg-white/5 px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-white/10">
              View all open roles <ArrowRight className="h-4 w-4 text-trace-mint" />
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function ContactPage() {
  const [location] = useLocation();
  const initialSubject = new URLSearchParams(location.split("?")[1] ?? "").get("subject") ?? "";
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return <Shell><main><PageHero label="CONTACT" title={<>Let’s start a <span className="text-trace-teal">conversation.</span></>} description="Whether you are a government agency, development partner, or private company, TRACE is ready to understand the mandate behind your next move." /><section className="py-20 sm:py-28"><div className="mx-auto grid max-w-[1480px] gap-10 px-5 lg:grid-cols-[0.78fr_1.22fr] lg:px-10"><SectionReveal><p className="section-label">HEAD OFFICE — DHAKA</p><div className="mt-7 grid gap-6"><a href={`tel:${contact.phone}`} className="flex items-start gap-4"><Phone className="mt-1 h-5 w-5 text-trace-orange" /><span><strong className="block text-trace-ink">{contact.phone}</strong><span className="mt-1 block text-sm text-trace-muted">Head Office — Dhaka</span></span></a><a href={`mailto:${contact.email}`} className="flex items-start gap-4"><Mail className="mt-1 h-5 w-5 text-trace-orange" /><span><strong className="block text-trace-ink">{contact.email}</strong><span className="mt-1 block text-sm text-trace-muted">General enquiries</span></span></a><div className="flex items-start gap-4"><MapPin className="mt-1 h-5 w-5 text-trace-orange" /><span><strong className="block text-trace-ink">{contact.address}</strong><span className="mt-1 block text-sm text-trace-muted">{contact.hours}</span></span></div></div></SectionReveal><SectionReveal delay={0.1}><form onSubmit={submit} className="border border-trace-ink/10 bg-white p-7 sm:p-10"><AnimatePresence mode="wait">{sent ? <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid min-h-[390px] place-items-center text-center"><div><CheckCircle2 className="mx-auto h-12 w-12 text-trace-teal" /><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink">Message received.</h2><p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-trace-muted">Thank you for outlining your mandate. The TRACE team will respond within one business day.</p><button onClick={() => setSent(false)} type="button" className="mt-7 text-sm font-extrabold text-trace-teal">Send another message</button></div></motion.div> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="grid gap-5 sm:grid-cols-2">{[["First name", "firstName"], ["Last name", "lastName"], ["Email address", "email"], ["Mobile number", "phone"], ["Organization", "organization"], ["Subject / service area", "subject"]].map(([label, field]) => <label key={field} className="grid gap-2"><span className="text-xs font-bold text-trace-ink">{label}{["firstName", "lastName", "email", "phone", "subject"].includes(field) && <span className="text-trace-orange"> *</span>}</span><input required={["firstName", "lastName", "email", "phone", "subject"].includes(field)} name={field} type={field === "email" ? "email" : "text"} defaultValue={field === "subject" ? initialSubject : ""} className="border-b border-trace-ink/20 bg-trace-paper px-3 py-3 text-sm outline-none transition-colors focus:border-trace-teal" /></label>)}</div><label className="mt-5 grid gap-2"><span className="text-xs font-bold text-trace-ink">Tell us about your project or challenge <span className="text-trace-orange">*</span></span><textarea required name="message" rows={5} className="resize-none border-b border-trace-ink/20 bg-trace-paper px-3 py-3 text-sm outline-none transition-colors focus:border-trace-teal" /></label><div className="mt-7"><SpecularButton
  type="submit"
  size="lg"
  radius={4}
  baseColor="#123D67"
  textColor="#ffffff"
  lineColor="#D7F3F0"
  shineSize={10}
  shineFade={45}
  intensity={1}
  thickness={1}
  speed={0.35}
  followMouse
  proximity={280}
>Send message <Send className="h-4 w-4" /></SpecularButton></div><p className="mt-5 text-xs leading-5 text-trace-muted">By submitting this form, you agree to the Privacy Policy. TRACE does not share your submitted data.</p></motion.div>}</AnimatePresence></form></SectionReveal></div></section></main></Shell>;
}

function NotFoundEntity() {
  return <Shell><main><PageHero label="NOT FOUND" title={<>This page is still <span className="text-trace-teal">taking shape.</span></>} description="The requested TRACE content record could not be found in the current structured portfolio." /><section className="py-20"><div className="mx-auto max-w-[1120px] px-5 lg:px-10"><Link href="/" className="inline-flex items-center gap-2 text-sm font-extrabold text-trace-ink"><ArrowLeft className="h-4 w-4 text-trace-orange" />Return home</Link></div></section></main></Shell>;
}
