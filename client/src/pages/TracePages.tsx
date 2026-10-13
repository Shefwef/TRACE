/** Civic Signal Field route system: image-led institutional briefings that connect services, projects, experts, and verified insight sources. */
import { animate, AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, Briefcase, CalendarDays, CheckCircle2, ChevronDown, Clock, Crown, ExternalLink, FileText, Linkedin, Mail, MapPin, MessageSquare, Phone, PlayCircle, Search, Send, Upload, Users, XCircle } from "lucide-react";
import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { SectionReveal } from "@/components/SectionReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamPortrait } from "@/components/TeamPortrait";
import SpecularButton from "@/components/ui/SpecularButton";
import { StarBorder } from "@/components/ui/StarBorder";
import { ShineBorder } from "@/components/ui/ShineBorder";
import { GlowCard } from "@/components/ui/spotlight-card";
import { ASSETS, contact, departmentOrder, innovations, insights, latestUpdates, projects, services, team, type Department, type Insight, type LatestUpdate, type Project, type Service, type ServiceProduct, type TeamMember } from "@/data/traceData";
import { ProjectCard } from "@/components/ui/glass-blog-card-shadcnui";

const serviceMedia: Record<string, string> = {
  "trade-facilitation": ASSETS.heroTrade,
  "policy-regulatory-reform": ASSETS.heroPolicy,
  "laboratory-improvement": ASSETS.heroLaboratory,
  "market-access-sps": ASSETS.heroColdChain,
  "technology-solutions": ASSETS.heroInteroperability,
  "research-innovation": ASSETS.heroResearch,
  "training-capacity-building": ASSETS.heroPolicy,
  "technical-assistance-project-management": ASSETS.heroInteroperability,
  "temperature-controlled-logistics": ASSETS.heroColdChain,
};

const projectMedia: Record<string, string> = {
  "trs-customs-reform": "/media/projects/time-release-study.png",
  "taraps-policy-reform": "/media/projects/taraps-agriculture.png",
  "national-tariff-modernization": "/media/projects/national-tariff-modernization.jpg",
  "btp-elearning-platform": ASSETS.heroInteroperability,
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
  // NOTE: overflow-x-clip (not overflow-x-hidden) prevents horizontal scroll bleed WITHOUT
  // creating an implicit scroll container — which would break position: sticky on descendants
  // (the service page's side nav, the project page's facts panel, etc.).
  return <div className="min-h-screen overflow-x-clip bg-trace-paper"><SiteHeader />{children}<SiteFooter /></div>;
}

function PageHero({ label, title, description, tone = "light", kicker, titleText }: { label: string; title: ReactNode; description: string; tone?: "light" | "dark" | "navy"; kicker?: string; titleText?: string }) {
  const dark = tone !== "light";
  const field = tone === "dark" ? "bg-trace-ink" : tone === "navy" ? "bg-trace-navy" : "bg-white";
  const reduceMotion = useSafeMotion();
  return (
    <section className={`relative overflow-hidden pt-36 sm:pt-44 ${field} ${dark ? "text-white" : "text-trace-ink"}`}>
      <div className="pointer-events-none absolute inset-0 opacity-50 hero-grid" />
      <div className={`pointer-events-none absolute right-[10%] top-[-18%] h-[380px] w-[380px] rounded-full blur-[90px] ${dark ? "bg-trace-teal/20" : "bg-trace-mint/70"}`} />
      <div className="relative mx-auto max-w-[1480px] px-5 pb-20 lg:px-10 sm:pb-28">
        <motion.p
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className={`section-label ${dark ? "!text-trace-mint" : ""}`}
        >
          {label}
        </motion.p>
        {kicker && (
          <motion.p
            initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className={`mt-7 font-mono text-[10px] font-bold tracking-[0.18em] ${dark ? "text-white/55" : "text-trace-muted"}`}
          >
            {kicker}
          </motion.p>
        )}
        {titleText ? (
          <div className="mt-5">
            <AnimatedHeading
              text={titleText}
              delay={0.15}
              className="max-w-5xl font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.07em] sm:text-7xl"
            />
          </div>
        ) : (
          <motion.h1
            initial={reduceMotion ? {} : { opacity: 0, y: 14 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="mt-5 max-w-5xl font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.07em] sm:text-7xl"
          >
            {title}
          </motion.h1>
        )}
        <motion.p
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className={`mt-7 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${dark ? "text-white/74" : "text-trace-muted"}`}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}

function DetailMediaHero({ label, title, description, kicker, image }: { label: string; title: string; description: string; kicker: string; image: string }) {
  return <AnimatedDetailHero label={label} title={title} description={description} kicker={kicker} image={image} />;
}

function AnimatedDetailHero({ label, title, description, kicker, image }: { label: string; title: string; description: string; kicker: string; image: string }) {
  const reduceMotion = useSafeMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.75]);

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-[530px] overflow-hidden bg-trace-ink pt-36 text-white sm:min-h-[590px] sm:pt-44"
    >
      <motion.img
        src={image}
        alt=""
        style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-0 -z-20 h-[120%] w-full object-cover"
      />
      <motion.div
        style={reduceMotion ? undefined : { opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-r from-trace-ink via-trace-ink/75 to-trace-ink/24"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 hero-grid" />
      <div className="relative mx-auto flex min-h-[350px] max-w-[1480px] flex-col justify-end px-5 pb-16 lg:px-10 sm:pb-20">
        <motion.p
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="section-label !text-trace-mint"
        >
          {label}
        </motion.p>
        <motion.p
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 font-mono text-[10px] font-bold tracking-[0.16em] text-white/72"
        >
          {kicker}
        </motion.p>
        <div className="mt-5">
          <AnimatedHeading
            text={title}
            delay={0.15}
            className="max-w-5xl font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.07em] sm:text-7xl"
          />
        </div>
        <motion.p
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="mt-7 max-w-3xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}

function BackLink({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="inline-flex items-center gap-2 text-sm font-extrabold text-trace-ink"><ArrowLeft className="h-4 w-4 text-trace-orange" />Back to {label}</Link>;
}

function EntityTag({ children }: { children: ReactNode }) {
  return <span className="border border-trace-ink/12 bg-white px-3 py-2 font-mono text-[10px] font-bold tracking-[0.12em] text-trace-muted">{children}</span>;
}

function RelationshipRail({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const slack = 2; // avoid flicker from sub-pixel rounding
    setCanScrollLeft(el.scrollLeft > slack);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - slack);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by ~1 card width (first child width + gap). Falls back to 80% viewport width.
    const firstChild = el.firstElementChild as HTMLElement | null;
    const gap = 16; // matches gap-4
    const step = firstChild ? firstChild.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <section className="border-t border-trace-ink/10 py-12 sm:py-16">
      <div className="flex items-center justify-between gap-5">
        <div>
          <AnimatedEyebrow text="CONNECTED RECORDS" />
          <div className="mt-3">
            <AnimatedHeading
              text={title}
              className="font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Scroll chevrons — hidden until there's actually something to scroll to */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll related records left"
              className={`grid h-9 w-9 place-items-center rounded-full border border-trace-ink/15 bg-white text-trace-ink transition-all ${canScrollLeft ? "hover:border-trace-teal hover:text-trace-teal" : "opacity-30"}`}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label="Scroll related records right"
              className={`grid h-9 w-9 place-items-center rounded-full border border-trace-ink/15 bg-white text-trace-ink transition-all ${canScrollRight ? "hover:border-trace-teal hover:text-trace-teal" : "opacity-30"}`}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {action}
        </div>
      </div>

      {/* Scroll rail with gradient fade edges to signal more content */}
      <div className="relative mt-7">
        {/* Left fade — only visible when scrolled right */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
        />
        {/* Right fade — visible when more cards exist to the right */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent transition-opacity duration-200 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
        />
        <div
          ref={scrollRef}
          className="flex snap-x items-stretch gap-4 overflow-x-auto pb-4 pr-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function MiniProject({ project }: { project: Project }) {
  return (
    <div className="w-[280px] shrink-0 snap-start">
      <Link href={`/projects/${project.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(7,27,43,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(7,27,43,0.14)]">
        <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1.5} />
        <div className="relative h-36 overflow-hidden rounded-t-2xl bg-trace-paper">
          <img src={projectImage(project)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/50 to-transparent" />
          <p className="absolute bottom-3 left-4 font-mono text-[8px] font-bold tracking-[0.12em] text-trace-mint">{project.client.toUpperCase()}</p>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-extrabold leading-[1.08] tracking-[-0.04em] text-trace-ink group-hover:text-trace-teal transition-colors">{project.title}</h3>
          <div className="mt-auto flex justify-between border-t border-trace-ink/8 pt-4 text-xs font-bold text-trace-muted">
            <span>{project.period}</span>
            <ArrowUpRight className="h-4 w-4 text-trace-orange transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </div>
  );
}

function MiniMember({ member }: { member: TeamMember }) {
  return (
    <div className="w-[260px] shrink-0 snap-start">
      <Link href={`/team/${member.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(7,27,43,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(7,27,43,0.14)]">
        <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={11} borderWidth={1.5} />
        <div className="flex items-center gap-4">
          <TeamPortrait member={member} className="h-12 w-12 rounded-full" imageClassName="scale-[1.12]" />
          <div>
            <h3 className="font-display text-base font-extrabold tracking-[-0.04em] text-trace-ink group-hover:text-trace-teal transition-colors">{member.name}</h3>
            <p className="mt-1 text-xs leading-4 text-trace-muted">{member.role}</p>
          </div>
        </div>
        <p className="mt-5 font-mono text-[10px] font-bold tracking-[0.13em] text-trace-teal">{member.specialty.toUpperCase()}</p>
      </Link>
    </div>
  );
}

function MiniInsight({ insight }: { insight: Insight }) {
  return (
    <div className="w-[280px] shrink-0 snap-start">
      <Link href={`/insights/${insight.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(7,27,43,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(7,27,43,0.14)]">
        <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1.5} />
        <div className="relative h-36 overflow-hidden rounded-t-2xl bg-trace-paper">
          <img src={insightImage(insight)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/50 to-transparent" />
          <p className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[8px] font-bold tracking-[0.12em] text-trace-mint">
            {insight.type === "Video" ? <PlayCircle className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
            {insight.type.toUpperCase()}
          </p>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-extrabold leading-[1.08] tracking-[-0.04em] text-trace-ink group-hover:text-trace-teal transition-colors">{insight.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-trace-muted">{insight.summary}</p>
          <p className="mt-auto pt-4 font-mono text-[9px] font-bold tracking-[0.12em] text-trace-muted">{insight.date.toUpperCase()}</p>
        </div>
      </Link>
    </div>
  );
}

function SourceAction({ insight }: { insight: Insight }) {
  if (!insight.sourceUrl) return null;
  return <a href={insight.sourceUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 bg-trace-navy px-5 py-3 text-sm font-extrabold text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]">{insight.sourceLabel ?? "Open original source"}<ExternalLink className="h-4 w-4 text-trace-mint" /></a>;
}

/** Count-up number that fires once when scrolled into view. */
function CountUp({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduceMotion) {
      ref.current.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration, reduceMotion]);
  return <span ref={ref}>0{suffix}</span>;
}

type AboutStat = { value: number; suffix?: string; label: string; badge: string; tint: string; accent: string; ink: string };

/** Pastel stat card with timeframe-style badge. Tint variants pulled from TRACE brand tokens. */
function StatCard({ stat, index }: { stat: AboutStat; index: number }) {
  return (
    <SectionReveal delay={index * 0.06} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full overflow-hidden rounded-2xl p-7 shadow-[0_12px_32px_rgba(8,36,64,0.08)] sm:p-8"
        style={{ backgroundColor: stat.tint }}
      >
        {/* Timeframe-style pill badge */}
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
          style={{ backgroundColor: `${stat.accent}22`, color: stat.ink }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stat.accent }} />
          {stat.badge}
        </span>
        <p className="mt-7 font-display text-5xl font-extrabold leading-none tracking-[-0.07em] sm:text-6xl" style={{ color: stat.ink }}>
          <CountUp to={stat.value} suffix={stat.suffix} />
        </p>
        <p className="mt-3 text-sm font-semibold leading-6" style={{ color: `${stat.ink}cc` }}>
          {stat.label}
        </p>
        {/* Subtle accent corner */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl"
          style={{ backgroundColor: `${stat.accent}33` }}
        />
      </motion.div>
    </SectionReveal>
  );
}

/** Infinite right-to-left marquee of large news cards.
 *  - 2 cards visible at a time on desktop, 1 on mobile
 *  - Hovering ANY card pauses the entire marquee (via group-hover + animation-play-state via :has)
 *  - Hovering a specific card lifts/scales/shadows it and reveals additional detail
 *  - Text is line-clamped so each card previews the summary with "…" */
function UpdatesMarquee({ items }: { items: LatestUpdate[] }) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex items-stretch gap-7 py-6"
        style={{
          width: "max-content",
          animation: reduceMotion ? "none" : "trace-updates-marquee 46s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-stretch gap-7" aria-hidden={copy === 1 ? true : undefined}>
            {items.map((item) => (
              <Link
                key={`${item.slug}-${copy}`}
                href={item.url}
                className="group/card relative flex w-[clamp(320px,46vw,560px)] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_36px_rgba(7,27,43,0.10)] ring-1 ring-trace-ink/5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_30px_70px_rgba(7,27,43,0.22)] hover:ring-trace-teal/35"
              >
                {/* Image — larger aspect for the bigger card */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/65 via-trace-ink/15 to-transparent" />
                  {/* Category chip */}
                  <span className="absolute left-4 top-4 bg-white/95 px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-navy backdrop-blur">
                    {item.category.toUpperCase()}
                  </span>
                  {/* Date pill — bottom-left on image for larger-card balance */}
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-trace-ink/70 px-3 py-1 font-mono text-[9px] font-bold tracking-[0.14em] text-trace-mint backdrop-blur">
                    <span className="h-1 w-1 rounded-full bg-trace-teal" />{item.date.toUpperCase()}
                  </span>
                  {/* Arrow indicator (reveals on hover) */}
                  <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-trace-orange text-white opacity-0 shadow-[0_10px_24px_rgba(244,122,32,0.4)] transition-all duration-300 group-hover/card:opacity-100">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                </div>
                {/* Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="line-clamp-2 font-display text-xl font-extrabold leading-[1.15] tracking-[-0.04em] text-trace-ink transition-colors duration-300 group-hover/card:text-trace-teal sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-trace-muted transition-colors duration-300 group-hover/card:text-trace-ink/75">
                    {item.summary}
                  </p>
                  {/* Read-more row — fades in a stronger CTA on hover */}
                  <div className="mt-auto flex items-center justify-between border-t border-trace-ink/10 pt-4">
                    <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">READ UPDATE</span>
                    <ArrowRight className="h-4 w-4 text-trace-orange transition-transform duration-300 group-hover/card:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `@keyframes trace-updates-marquee { from { transform: translateX(0); } to { transform: translateX(calc(-50% - 14px)); } }` }} />
    </div>
  );
}

export function AboutPage() {
  const commitments = ["Upholding integrity and transparency in every engagement", "Delivering measurable outcomes beyond recommendations", "Strengthening local capacity and fostering ownership", "Advancing innovation and sustainability across every project"];
  const distinctions = [["Industry-wide network", "Partnerships across government, the private sector, and development organizations support coordinated cross-sector solutions.", "navy" as const], ["Sustainable approach", "Long-term strategies embed local capacity, environmental responsibility, and institutional ownership beyond project lifecycles.", "teal" as const], ["Tailored innovation", "Context-specific solutions combine global practice, emerging technology, and local insight.", "navy" as const], ["End-to-end solutions", "Support spans strategy, design, implementation, and scaling.", "teal" as const]];
  const aboutStats: AboutStat[] = [
    { value: 30, suffix: "+", label: "Projects delivered across trade, policy, and digital reform", badge: "Portfolio",      tint: "#E8F6F7", accent: "#009CA6", ink: "#082440" }, // soft mint-teal
    { value: 10,              label: "Trade-related laboratories strengthened and accredited",       badge: "Infrastructure", tint: "#EEF4FA", accent: "#123D67", ink: "#082440" }, // pale navy
    { value: 14,              label: "Government digital platforms designed and deployed",           badge: "Technology",     tint: "#DEF1EF", accent: "#009CA6", ink: "#082440" }, // mint
    { value: 50, suffix: "+", label: "Public and private institutions supported to date",           badge: "Reach",          tint: "#E7EEF5", accent: "#123D67", ink: "#082440" }, // ice blue
  ];
  const featuredProjects = projects.slice(0, 3);
  const featuredUpdates = latestUpdates.filter((u) => !u.external).sort((a, b) => b.isoDate.localeCompare(a.isoDate)).slice(0, 6);
  return <Shell><main><section className="relative overflow-hidden bg-trace-ink pt-36 text-white sm:pt-44"><img src="/media/about/about-hero.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center opacity-85" /><div className="absolute inset-0 bg-gradient-to-b from-trace-ink/70 via-trace-ink/55 to-trace-ink" /><div className="relative mx-auto max-w-[1480px] px-5 pb-28 lg:px-10 sm:pb-32"><SectionReveal><p className="section-label !text-trace-mint">ABOUT TRACE</p><h1 className="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">A firm built on <span className="text-trace-mint">insight</span>, strategy, and lasting impact.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">TRACE integrates trade expertise, policy reform, digital systems, and practical implementation to help institutions make complex change move.</p></SectionReveal></div></section><section className="bg-trace-paper py-24 sm:py-32"><div className="mx-auto grid max-w-[1480px] gap-10 px-5 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 lg:px-10"><SectionReveal><div className="max-w-xl"><p className="section-label">WHO WE ARE</p><h2 className="mt-5 font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.065em] text-trace-ink">Architecting resilience in a dynamic landscape.</h2><div className="mt-8 grid gap-6 text-base leading-8 text-trace-muted"><p>TRACE Consulting is a strategic advisory firm specializing in international trade, economic policy, regulatory reform, digital government solutions, and implementation support.</p><p>We help governments, development partners, and the private sector modernize institutions, strengthen regulatory systems, and improve trade competitiveness through evidence-based policy, technology, and implementation support.</p><p>Our work bridges the gap between policy design and practical delivery—making reforms usable, systems resilient, and impact sustainable.</p></div><div className="mt-10 border-t border-trace-ink/12 pt-8"><p className="section-label">OUR MISSION</p><p className="mt-4 text-base leading-8 text-trace-muted">TRACE integrates rigorous research with practical implementation to deliver lasting, measurable impact at scale—bridging the distance between policy ambition and institutional practice.</p></div></div></SectionReveal><SectionReveal delay={0.1}><figure className="relative aspect-[5/4] overflow-hidden border border-trace-ink/10 bg-white"><img src={ASSETS.aboutTrace} alt="Overhead view of professionals meeting around a collaborative table" className="absolute inset-0 h-full w-full object-cover" /></figure></SectionReveal></div></section><section className="bg-white py-20 sm:py-24"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><SectionReveal><div className="max-w-2xl"><p className="section-label">OUR TRACK RECORD</p><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink sm:text-5xl">Measurable impact, in numbers.</h2><p className="mt-5 text-base leading-7 text-trace-muted">Our work has supported reforms, built infrastructure, and strengthened institutions across Bangladesh and beyond.</p></div></SectionReveal><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{aboutStats.map((stat, index) => <StatCard key={stat.label} stat={stat} index={index} />)}</div></div></section><section className="relative overflow-hidden bg-trace-ink text-white"><img src="/media/about/our-commitment.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-r from-trace-ink/95 via-trace-ink/78 to-trace-ink/30" /><div className="relative mx-auto max-w-[1480px] px-5 py-20 sm:py-24 lg:px-10"><div className="max-w-xl"><motion.p initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -60px 0px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="font-mono text-[11px] font-bold tracking-[0.26em] text-trace-mint">OUR COMMITMENT</motion.p><motion.h2 initial={{ opacity: 0, y: 24, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "0px 0px -60px 0px" }} transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="mt-4 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">Beyond advisory. <br /><span className="text-trace-teal">Built to last.</span></motion.h2><motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "0px 0px -60px 0px" }} transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }} className="mt-5 h-1 w-20 origin-left rounded-full bg-trace-orange" /><motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px 0px -60px 0px" }} transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mt-8 font-mono text-xs font-bold tracking-[0.22em] text-trace-teal">WE ARE COMMITTED TO</motion.p><ul className="mt-5 space-y-4">{commitments.map((c, i) => <motion.li key={c} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px -60px 0px" }} transition={{ duration: 0.5, delay: 0.55 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className="flex items-start gap-4"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-trace-orange/18 text-trace-orange" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} /></span><span className="font-display text-base font-medium leading-7 text-white/92 sm:text-lg">{c}</span></motion.li>)}</ul><motion.blockquote initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -60px 0px" }} transition={{ duration: 0.55, delay: 0.95, ease: [0.22, 1, 0.36, 1] }} className="mt-9 border-l-2 border-trace-teal pl-5"><p className="font-display text-base italic leading-7 text-white/82 sm:text-lg">At TRACE Consulting, we go beyond advisory — partnering closely to co-create lasting, meaningful change.</p></motion.blockquote></div></div></section><section className="bg-trace-paper py-20 sm:py-24"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><SectionReveal><div className="flex flex-col justify-between gap-5 border-b border-trace-ink/10 pb-8 sm:flex-row sm:items-end"><div><p className="section-label">WHAT MAKES TRACE DIFFERENT</p><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink sm:text-5xl">Depth that stays connected to delivery.</h2></div></div></SectionReveal><div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{distinctions.map(([title, body, color], index) => <SectionReveal key={title as string} delay={index * 0.06} className="h-full"><GlowCard glowColor={color as "teal" | "mint" | "orange" | "navy"} customSize className="flex h-full min-h-[260px] flex-col justify-between p-7"><div><p className="font-mono text-[11px] font-black tracking-[0.14em] text-trace-teal">0{index + 1}</p><h3 className="mt-6 font-display text-[1.7rem] font-extrabold leading-[1.04] tracking-[-0.05em] text-trace-ink">{title}</h3></div><p className="mt-5 text-sm leading-6 text-trace-muted">{body}</p></GlowCard></SectionReveal>)}</div></div></section><section className="bg-trace-paper py-20 sm:py-24"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><SectionReveal><div className="flex flex-col justify-between gap-5 border-b border-trace-ink/10 pb-8 sm:flex-row sm:items-end"><div><p className="section-label">FEATURED PROJECTS</p><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink sm:text-5xl">Work that makes the case.</h2></div><Link href="/projects" className="inline-flex items-center gap-2 border-b border-trace-teal pb-1.5 text-sm font-extrabold text-trace-teal">View all projects <ArrowRight className="h-4 w-4" /></Link></div></SectionReveal><div className="mt-8 grid gap-5 md:grid-cols-3">{featuredProjects.map((project, index) => <SectionReveal key={project.slug} delay={index * 0.06} className="h-full"><Link href={`/projects/${project.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(7,27,43,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(7,27,43,0.16)]"><div className="relative aspect-[16/9] overflow-hidden"><img src={projectImage(project)} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-trace-ink/60 via-trace-ink/10 to-transparent" /><span className={`absolute left-4 top-4 px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.14em] ${project.status === "Ongoing" ? "bg-trace-teal text-white" : "bg-white/95 text-trace-navy backdrop-blur"}`}>{project.status.toUpperCase()}</span></div><div className="flex flex-1 flex-col p-5 sm:p-6"><p className="line-clamp-2 min-h-[2.5rem] font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">{project.client.toUpperCase()}</p><h3 className="mt-2 line-clamp-3 min-h-[4.4rem] font-display text-xl font-extrabold leading-[1.1] tracking-[-0.04em] text-trace-ink transition-colors group-hover:text-trace-teal">{project.title}</h3><p className="mt-3 line-clamp-2 min-h-[3rem] text-sm leading-6 text-trace-muted">{project.summary}</p><div className="mt-auto flex items-center justify-between border-t border-trace-ink/8 pt-4"><span className="text-xs font-bold text-trace-ink">{project.period}</span><ArrowUpRight className="h-4 w-4 text-trace-orange transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div></div></Link></SectionReveal>)}</div></div></section><section className="bg-white py-20 sm:py-24"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><SectionReveal><div className="flex flex-col justify-between gap-5 border-b border-trace-ink/10 pb-8 sm:flex-row sm:items-end"><div><p className="section-label">LATEST UPDATES</p><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink sm:text-5xl">Knowledge from active work.</h2></div><Link href="/latest-updates" className="inline-flex items-center gap-2 border-b border-trace-teal pb-1.5 text-sm font-extrabold text-trace-teal">View all updates <ArrowRight className="h-4 w-4" /></Link></div></SectionReveal></div><div className="mt-10"><UpdatesMarquee items={featuredUpdates} /></div></section><section className="relative overflow-hidden bg-trace-navy py-24 text-white sm:py-28"><div className="absolute inset-0 bg-gradient-to-br from-trace-ink via-trace-navy to-[#0f3458]" /><div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-trace-teal/18 blur-[120px]" /><div className="pointer-events-none absolute -bottom-40 -left-20 h-[26rem] w-[26rem] rounded-full bg-trace-orange/12 blur-[120px]" /><div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle 1px at 1px 1px, rgba(215,243,240,0.6) 0%, transparent 100%)", backgroundSize: "32px 32px" }} /><div className="relative mx-auto max-w-[1480px] px-5 lg:px-10"><div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between"><SectionReveal className="flex-1"><p className="font-mono text-[11px] font-bold tracking-[0.26em] text-trace-mint">GET IN TOUCH</p><h2 className="mt-5 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.065em] text-white sm:text-6xl">Have a project in mind?<br /><span className="bg-gradient-to-r from-trace-mint to-trace-teal bg-clip-text text-transparent">Let's build something that lasts.</span></h2><p className="mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg">Whether reforming a regulatory system, building technical capacity, or modernising digital infrastructure, we would like to hear from you.</p></SectionReveal><SectionReveal delay={0.1}><Link href="/contact" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-trace-orange px-8 py-5 text-sm font-extrabold uppercase tracking-wider text-white shadow-[0_18px_42px_rgba(244,122,32,0.42),0_4px_12px_rgba(244,122,32,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_52px_rgba(244,122,32,0.55),0_6px_16px_rgba(244,122,32,0.38)]"><span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#ff9b4a] via-trace-orange to-[#e86a10] transition-transform duration-500 ease-out group-hover:scale-x-100" /><span className="relative z-10">Start a conversation</span><ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} /></Link></SectionReveal></div></div></section></main></Shell>;
}

export function ServicesPage() {
  return (
    <Shell>
      <main>
        <PageHero label="SERVICES" title={<>Capabilities for <span className="text-trace-mint">systems that matter.</span></>} description="Integrated advisory, technology, research, and implementation services for more competitive, capable, and resilient institutions." tone="navy" />
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
            <div className="max-w-2xl">
              <p className="section-label">AREAS OF DELIVERY</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink sm:text-5xl">Each service starts with context—and ends in capability.</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <SectionReveal key={service.slug} delay={index * 0.04} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    <Link href={`/services/${service.slug}`} className="block h-full">
                      <div className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(7,27,43,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(7,27,43,0.16)]">
                        <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1.5} />
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          <motion.img
                            src={serviceImage(service)}
                            alt={service.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/60 via-trace-ink/10 to-transparent" />
                          <span className="absolute right-4 top-4 bg-trace-orange px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.14em] text-white">
                            {service.solutions} SOLUTIONS
                          </span>
                          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                            {service.disciplines.slice(0, 3).map((discipline) => (
                              <span
                                key={discipline}
                                className="rounded-full border-0 bg-trace-ink/55 px-3 py-1 font-mono text-[9px] font-bold tracking-[0.08em] text-white/90 backdrop-blur-sm"
                              >
                                {discipline}
                              </span>
                            ))}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center bg-trace-ink/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-trace-ink shadow-lg"
                            >
                              <ArrowUpRight className="h-4 w-4 text-trace-teal" />
                              View Service
                            </motion.span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 p-5 sm:p-6">
                          <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">
                            {service.strapline.toUpperCase()}
                          </p>
                          <h3 className="font-display text-xl font-extrabold leading-[1.1] tracking-[-0.04em] text-trace-ink transition-colors group-hover:text-trace-teal sm:text-2xl">
                            {service.title}
                          </h3>
                          <p className="line-clamp-2 text-sm leading-6 text-trace-muted">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between border-t border-trace-ink/8 pt-3">
                            <span className="text-xs font-bold text-trace-ink">Service briefing</span>
                            <ArrowUpRight className="h-4 w-4 text-trace-orange transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

type ServiceChapter = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: ReactNode;
};

function useSafeMotion() {
  const systemReduceMotion = useReducedMotion();
  const captureMode = typeof navigator !== "undefined" && navigator.webdriver;
  return Boolean(systemReduceMotion || captureMode);
}

/** Word-by-word reveal with blur, inspired by Aceternity text animations. */
function AnimatedHeading({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduceMotion = useSafeMotion();
  const words = text.split(" ");
  if (reduceMotion) {
    return <h2 className={className}>{text}</h2>;
  }
  return (
    <h2 className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: delay + i * 0.055, ease: [0.23, 1, 0.32, 1] }}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 && <span>&nbsp;</span>}
            </motion.span>
          </span>
        ))}
      </span>
    </h2>
  );
}

/** Animated eyebrow with a line that draws in on view. */
function AnimatedEyebrow({ number, text }: { number?: string; text: string }) {
  const reduceMotion = useSafeMotion();
  return (
    <div className="flex items-center gap-3">
      <motion.span
        initial={reduceMotion ? {} : { scaleX: 0 }}
        whileInView={reduceMotion ? {} : { scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-px w-10 bg-gradient-to-r from-trace-teal to-trace-mint"
        aria-hidden="true"
      />
      <p className="font-mono text-[10px] font-bold tracking-[0.18em]">
        {number && (
          <>
            <span className="text-trace-teal">{number}</span>
            <span className="mx-2 text-trace-ink/25">·</span>
          </>
        )}
        <span className="bg-gradient-to-r from-trace-teal via-trace-navy to-trace-teal bg-clip-text text-transparent">
          {text}
        </span>
      </p>
    </div>
  );
}

/** Giant faded chapter/section number that drifts in parallax as the section enters and leaves the viewport. Anchor by wrapping in a `relative` parent. */
function GhostNumber({ value }: { value: string }) {
  const reduceMotion = useSafeMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 0.045, 0.045, 0]);
  if (reduceMotion) return null;
  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      style={{ y, opacity }}
      className="pointer-events-none absolute -right-6 -top-4 select-none font-display text-[200px] font-black leading-none tracking-[-0.08em] text-trace-ink sm:text-[280px]"
    >
      {value}
    </motion.span>
  );
}

function ServiceChapterSection({ chapter, registerRef, index }: {
  chapter: ServiceChapter;
  registerRef: (element: HTMLElement | null, index: number) => void;
  index: number;
}) {
  const reduceMotion = useSafeMotion();

  return (
    <section
      ref={(element) => registerRef(element, index)}
      id={chapter.id}
      data-chapter-id={chapter.id}
      className="relative scroll-mt-32 pt-6 first:pt-0"
    >
      <GhostNumber value={String(index + 1).padStart(2, "0")} />

      <div className="relative">
        <AnimatedEyebrow number={String(index + 1).padStart(2, "0")} text={chapter.eyebrow} />
        <div className="mt-4">
          <AnimatedHeading
            text={chapter.title}
            className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] text-trace-ink sm:text-4xl"
          />
        </div>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6"
        >
          {chapter.body}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceProductTile({ product, index }: { product: ServiceProduct; index: number }) {
  const reduceMotion = useSafeMotion();
  const innovation = product.innovationSlug
    ? innovations.find((item) => item.slug === product.innovationSlug)
    : undefined;

  const tileRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;
    setTilt({
      rx: (relY - 0.5) * -6,
      ry: (relX - 0.5) * 6,
      mx: relX * 100,
      my: relY * 100,
    });
  };
  const resetTilt = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });

  const inner = (
    <motion.div
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      initial={reduceMotion ? {} : { opacity: 0, y: 16, scale: 0.98 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      style={{
        transform: reduceMotion ? undefined : `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.18s ease-out",
      }}
      className={`group relative flex h-full flex-col items-start gap-4 overflow-hidden rounded-2xl border border-trace-ink/10 bg-white p-5 transition-all duration-300 ${innovation ? "hover:border-trace-teal/20 hover:shadow-[0_14px_32px_rgba(7,27,43,0.08)]" : "hover:border-trace-teal/15 hover:shadow-[0_10px_24px_rgba(7,27,43,0.06)]"}`}
    >
      {/* Cursor-following radial glow — softened so hover doesn't flood the card */}
      {!reduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(360px circle at ${tilt.mx}% ${tilt.my}%, rgba(0,156,166,0.04), transparent 55%)`,
          }}
        />
      )}
      {/* Corner accent — softened */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-trace-mint/18 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <motion.div
        whileHover={reduceMotion ? {} : { y: -3, rotate: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-trace-teal/12 to-trace-mint/30 text-trace-teal"
      >
        <Briefcase className="h-5 w-5" />
      </motion.div>
      <p className="relative font-display text-sm font-extrabold leading-[1.25] tracking-[-0.02em] text-trace-ink">
        {product.name}
      </p>
      {innovation && (
        <span className="relative mt-auto inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.14em] text-trace-teal">
          VIEW INNOVATION
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      )}
      {/* Bottom shine border on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-trace-teal to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.div>
  );

  if (innovation) {
    return (
      <Link href="/innovations" className="block h-full">
        {inner}
      </Link>
    );
  }
  return <div className="h-full">{inner}</div>;
}

export function ServiceDetailPage() {
  const [, params] = useRoute("/services/:slug");
  const service = services.find((item) => item.slug === params?.slug);
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const registerRef = useCallback((element: HTMLElement | null, index: number) => {
    chapterRefs.current[index] = element;
  }, []);
  const reduceMotion = useSafeMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const readingRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "22%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1.05, 1.18]);
  const heroOverlay = useTransform(heroProgress, [0, 1], [0.4, 0.75]);

  const { scrollYProgress: readingProgress } = useScroll({
    target: readingRef,
    offset: ["start center", "end end"],
  });
  const railScale = useSpring(readingProgress, { stiffness: 90, damping: 22 });

  // Related data — computed outside the chapters memo so Connected Work can render it.
  const relatedProjects = useMemo(() => (service ? projects.filter((p) => p.serviceSlugs.includes(service.slug)) : []), [service]);
  const relatedTeam = useMemo(() => (service ? team.filter((m) => m.serviceSlugs.includes(service.slug)) : []), [service]);
  const relatedInsights = useMemo(() => (service ? insights.filter((i) => i.serviceSlugs.includes(service.slug)) : []), [service]);

  const chapters = useMemo<ServiceChapter[]>(() => {
    if (!service) return [];
    const overviewParagraphs = service.overview ?? [service.description];
    const items = service.serviceItems ?? service.disciplines.map((d) => d);
    const products = service.products ?? [];

    const list: ServiceChapter[] = [
      {
        id: "overview",
        label: "Overview",
        eyebrow: "OVERVIEW",
        title: "What this service does.",
        body: (
          <div className="space-y-5 text-base leading-8 text-trace-muted">
            {overviewParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        ),
      },
      {
        id: "services",
        label: "Our Services",
        eyebrow: "OUR SERVICES INCLUDE",
        title: "The offerings inside this service.",
        body: (
          <ul className="mt-2 divide-y divide-trace-ink/8 overflow-hidden rounded-2xl border border-trace-ink/10 bg-white">
            {items.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-trace-paper sm:px-6"
              >
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-trace-teal/10 text-trace-teal">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="text-sm leading-6 text-trace-ink sm:text-base sm:leading-7">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        ),
      },
    ];

    if (products.length > 0) {
      list.push({
        id: "products",
        label: "Products & Solutions",
        eyebrow: "PRODUCTS & SOLUTIONS",
        title: "Tools built to support this service.",
        body: (
          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ServiceProductTile key={product.name} product={product} index={i} />
            ))}
          </div>
        ),
      });
    }

    // Connected Work: Related Projects, Related Insights, Subject Matter Experts — all nested
    // inside this single chapter so the sticky sidebar keeps covering them.
    list.push({
      id: "connected",
      label: "Connected Work",
      eyebrow: "CONNECTED WORK",
      title: "See the record behind the recommendation.",
      body: (
        <div className="space-y-14">
          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-3">
                <span className="h-5 w-1 rounded-full bg-trace-orange" aria-hidden="true" />
                <h3 className="font-display text-xl font-extrabold tracking-[-0.03em] text-trace-ink">Related Projects</h3>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(7,27,43,0.14)]">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={projectImage(project)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className={`absolute left-3 top-3 px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.14em] ${project.status === "Ongoing" ? "bg-trace-teal text-white" : "bg-white/95 text-trace-navy"}`}>{project.status.toUpperCase()}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-teal">{project.client.toUpperCase()}</p>
                      <h4 className="mt-2 line-clamp-3 text-sm font-extrabold leading-5 text-trace-ink transition-colors group-hover:text-trace-teal">{project.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/* Related Insights */}
          {relatedInsights.length > 0 && (
            <div>
              <div className="flex items-center gap-3">
                <span className="h-5 w-1 rounded-full bg-trace-orange" aria-hidden="true" />
                <h3 className="font-display text-xl font-extrabold tracking-[-0.03em] text-trace-ink">Related Insights</h3>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {relatedInsights.map((insight) => (
                  <Link key={insight.slug} href={`/insights/${insight.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(7,27,43,0.14)]">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={insightImage(insight)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.14em] text-trace-navy">{insight.type.toUpperCase()}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-teal">{insight.date.toUpperCase()}</p>
                      <h4 className="mt-2 line-clamp-3 text-sm font-extrabold leading-5 text-trace-ink transition-colors group-hover:text-trace-teal">{insight.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/* Subject Matter Experts — uses the Our Team card so images stay large and prominent */}
          {relatedTeam.length > 0 && (
            <div>
              <div className="flex items-center gap-3">
                <span className="h-5 w-1 rounded-full bg-trace-orange" aria-hidden="true" />
                <h3 className="font-display text-xl font-extrabold tracking-[-0.03em] text-trace-ink">Subject Matter Experts</h3>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {relatedTeam.map((member) => (
                  <TeamPhotoCard key={member.slug} member={member} />
                ))}
              </div>
            </div>
          )}
          {relatedProjects.length === 0 && relatedInsights.length === 0 && relatedTeam.length === 0 && (
            <p className="text-base leading-8 text-trace-muted">
              Project records, experts, and published insights connected to {service.title} will appear here as they are added.
            </p>
          )}
        </div>
      ),
    });

    return list;
  }, [service, relatedProjects, relatedInsights, relatedTeam]);

  useEffect(() => {
    if (!service || chapters.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const index = Number((visible[0].target as HTMLElement).dataset.chapterIndex);
          if (!Number.isNaN(index)) setActiveChapter(index);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.3, 0.6, 0.9] }
    );
    chapterRefs.current.forEach((element, index) => {
      if (element) {
        element.dataset.chapterIndex = String(index);
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, [service, chapters.length]);

  if (!service) return <NotFoundEntity />;

  const scrollToChapter = (index: number) => {
    chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Shell>
      <main>
        {/* ── Parallax hero ── */}
        <section
          ref={heroRef}
          className="relative isolate min-h-[560px] overflow-hidden bg-trace-ink pt-36 text-white sm:min-h-[620px] sm:pt-44"
        >
          <motion.img
            src={serviceImage(service)}
            alt=""
            style={reduceMotion ? undefined : { y: heroImageY, scale: heroImageScale }}
            className="absolute inset-0 -z-20 h-[120%] w-full object-cover"
          />
          <motion.div
            style={reduceMotion ? undefined : { opacity: heroOverlay }}
            className="absolute inset-0 -z-10 bg-gradient-to-r from-trace-ink via-trace-ink/78 to-trace-ink/28"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 hero-grid" />
          <div className="relative mx-auto flex min-h-[350px] max-w-[1480px] flex-col justify-end px-5 pb-16 lg:px-10 sm:pb-20">
            <motion.p
              initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="section-label !text-trace-mint"
            >
              SERVICE
            </motion.p>
            <motion.p
              initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6 font-mono text-[10px] font-bold tracking-[0.16em] text-white/72"
            >
              {service.solutions} INTEGRATED SOLUTIONS · {service.strapline.toUpperCase()}
            </motion.p>
            <div className="mt-5">
              <AnimatedHeading
                text={service.title}
                delay={0.15}
                className="max-w-5xl font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.07em] sm:text-7xl"
              />
            </div>
            <motion.p
              initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="mt-7 max-w-3xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8"
            >
              {service.description}
            </motion.p>
            {/* Scroll hint */}
            {!reduceMotion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-10 flex items-center gap-3 text-white/50"
              >
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="text-xl"
                  aria-hidden="true"
                >
                  ↓
                </motion.span>
                <span className="font-mono text-[10px] font-bold tracking-[0.18em]">SCROLL TO EXPLORE</span>
              </motion.div>
            )}
          </div>
        </section>

        <section className="relative bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
            <BackLink href="/services" label="services" />

            <div ref={readingRef} className="mt-10 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
              {/* Sticky side nav — thin, minimal, with scroll progress rail */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-muted">
                    ON THIS PAGE
                  </p>
                  <div className="relative mt-5">
                    {/* Vertical rail track */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-[3px] top-0 w-px bg-trace-ink/10"
                    />
                    {/* Filled progress */}
                    <motion.span
                      aria-hidden="true"
                      style={reduceMotion ? undefined : { scaleY: railScale, transformOrigin: "top" }}
                      className="pointer-events-none absolute bottom-0 left-[3px] top-0 w-px bg-gradient-to-b from-trace-teal via-trace-teal to-trace-mint"
                    />
                    <ol className="relative space-y-1">
                      {chapters.map((chapter, index) => {
                        const isActive = index === activeChapter;
                        const num = String(index + 1).padStart(2, "0");
                        return (
                          <li key={chapter.id} className="relative">
                            <button
                              type="button"
                              onClick={() => scrollToChapter(index)}
                              className={`group relative flex w-full items-center gap-3 py-2.5 pl-4 text-left transition-colors ${isActive ? "text-trace-ink" : "text-trace-muted hover:text-trace-ink"}`}
                            >
                              {/* Active pill highlight */}
                              {isActive && !reduceMotion && (
                                <motion.span
                                  layoutId="service-nav-active"
                                  className="absolute inset-y-0 -left-2 -right-2 rounded-lg bg-trace-teal/8"
                                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                                  aria-hidden="true"
                                />
                              )}
                              {/* Numbered badge — much more visible than the old dot */}
                              <span
                                className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-md font-mono text-[11px] font-black tracking-[0.08em] transition-all duration-300 ${isActive ? "bg-trace-teal text-white shadow-[0_6px_14px_rgba(0,156,166,0.3)]" : "bg-trace-paper text-trace-muted group-hover:bg-trace-ink/8 group-hover:text-trace-ink"}`}
                                aria-hidden="true"
                              >
                                {num}
                              </span>
                              <span className={`relative z-10 flex-1 text-sm font-bold ${isActive ? "text-trace-ink" : ""}`}>{chapter.label}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  <motion.div
                    initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
                    animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-8 border-t border-trace-ink/10 pt-6"
                  >
                    <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">
                      {service.strapline.toUpperCase()}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-trace-muted">
                      {service.solutions} integrated solutions across {service.disciplines.length} disciplines.
                    </p>
                  </motion.div>
                </div>
              </aside>

              {/* Mobile chip nav — horizontal scroll */}
              <nav aria-label="Sections" className="sticky top-[68px] z-20 -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto bg-white/95 px-5 py-3 backdrop-blur lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => scrollToChapter(index)}
                    className={`shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2 text-xs font-extrabold transition-colors ${index === activeChapter ? "bg-trace-ink text-white" : "border border-trace-ink/12 bg-white text-trace-muted"}`}
                  >
                    {chapter.label}
                  </button>
                ))}
              </nav>

              {/* Main reading column */}
              <div className="space-y-20 sm:space-y-24">
                {chapters.map((chapter, index) => (
                  <ServiceChapterSection
                    key={chapter.id}
                    chapter={chapter}
                    registerRef={registerRef}
                    index={index}
                  />
                ))}
              </div>
            </div>

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
  const featured = projects.slice(0, Math.min(6, projects.length));
  return (
    <Shell>
      <main>
        <PageHero
          label="PROJECTS"
          title={<>Work that <span className="text-trace-mint">changes systems.</span></>}
          description="Trade facilitation, laboratory strengthening, digital transformation, policy advisory, and capacity-building work across connected institutions."
          tone="navy"
        />

        {/* ── Featured projects — horizontal snap-scrolling strip ── */}
        <section className="bg-trace-paper py-12 sm:py-16">
          <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="section-label">FEATURED PROJECTS</p>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink sm:text-4xl">
                  Scroll through our active mandates.
                </h2>
              </div>
              <p className="hidden font-mono text-[10px] font-bold tracking-[0.16em] text-trace-muted sm:block">
                SWIPE / SCROLL →
              </p>
            </div>
            {/* Horizontal snap strip. On lg, roughly 3 cards fit at once; narrower on smaller screens.
                Users scroll horizontally to see additional cards. */}
            <div className="mt-8 -mx-5 overflow-x-auto overflow-y-hidden px-5 pb-6 lg:-mx-10 lg:px-10 [-ms-overflow-style:none] [scrollbar-width:thin]">
              <div className="flex snap-x snap-mandatory gap-5" style={{ scrollPaddingLeft: "1.25rem" }}>
                {featured.map((project, index) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group relative flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(7,27,43,0.1)] ring-1 ring-trace-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(7,27,43,0.18)] sm:w-[460px] lg:w-[480px]"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={projectImage(project)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/60 via-transparent to-transparent" />
                      <span className={`absolute left-4 top-4 px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.14em] ${project.status === "Ongoing" ? "bg-trace-teal text-white" : "bg-white/95 text-trace-navy"}`}>
                        {project.status.toUpperCase()}
                      </span>
                      <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-trace-navy opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                      </span>
                      {/* Number tag — large */}
                      <span className="absolute bottom-4 right-4 font-display text-6xl font-black leading-none tracking-[-0.08em] text-white/40 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">{project.client.toUpperCase()}</p>
                      <h3 className="mt-3 line-clamp-3 font-display text-xl font-extrabold leading-[1.15] tracking-[-0.03em] text-trace-ink transition-colors group-hover:text-trace-teal sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-trace-muted">{project.summary}</p>
                      <div className="mt-auto flex items-center justify-between border-t border-trace-ink/8 pt-4">
                        <span className="text-xs font-bold text-trace-ink">{project.period}</span>
                        <ArrowRight className="h-4 w-4 text-trace-orange transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── All projects (with filter + search) ── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
            <div className="mb-6">
              <p className="section-label">ALL PROJECTS</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink sm:text-4xl">
                Explore the full portfolio.
              </h2>
            </div>
            <div className="flex flex-col gap-5 border-b border-trace-ink/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-4 py-2 text-xs font-extrabold transition-colors ${filter === item ? "bg-trace-navy text-white" : "border border-trace-ink/12 bg-white text-trace-muted hover:border-trace-teal"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label className="flex w-full max-w-md items-center gap-3 border-b border-trace-ink/20 bg-white px-3 py-3">
                <Search className="h-4 w-4 text-trace-teal" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search projects"
                  className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-trace-muted/70"
                />
              </label>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project, index) => (
                <SectionReveal key={project.slug} delay={index * 0.04} className="h-full">
                  <ProjectCard project={project} image={projectImage(project)} />
                </SectionReveal>
              ))}
            </div>
            {filtered.length === 0 && <p className="py-16 text-center text-trace-muted">No project records match this search.</p>}
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function ProjectDetailPage() {
  const [, params] = useRoute("/projects/:slug");
  const project = projects.find((item) => item.slug === params?.slug);
  if (!project) return <NotFoundEntity />;
  const relatedServices = services.filter((service) => project.serviceSlugs.includes(service.slug));
  const contributors = team.filter((member) => project.teamSlugs.includes(member.slug));
  const relatedInsights = insights.filter((insight) => insight.projectSlugs.includes(project.slug));
  const overviewParas = project.overview ?? [project.summary];
  const scope = project.scope ?? [];
  const outcomes = project.outcomes ?? [];
  const sector = project.sector ?? relatedServices[0]?.title ?? "Advisory";
  const location = project.location ?? "Bangladesh";

  return (
    <Shell>
      <main>
        {/* ── Hero ── */}
        <DetailMediaHero
          label="PROJECT"
          title={project.title}
          description={project.summary}
          kicker={`${project.client.toUpperCase()} · ${project.period} · ${project.status.toUpperCase()}`}
          image={projectImage(project)}
        />

        {/* ── Main content ── */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-muted">
              <Link href="/" className="transition-colors hover:text-trace-teal">HOME</Link>
              <span>/</span>
              <Link href="/projects" className="transition-colors hover:text-trace-teal">PROJECTS</Link>
              <span>/</span>
              <span className="line-clamp-1 text-trace-ink">{project.title.toUpperCase()}</span>
            </nav>

            {/* Grid: content + floating facts sidebar.
                NOTE: no items-start — we WANT the aside to stretch to the grid's full
                height so position: sticky has room to engage as the content column scrolls. */}
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
              {/* ──────────── LEFT: content column ──────────── */}
              <div className="space-y-16">
                {/* 01 — Project Overview */}
                <SectionReveal>
                  <div className="relative">
                    <GhostNumber value="01" />
                    <div className="relative">
                      <AnimatedEyebrow number="01" text="PROJECT OVERVIEW" />
                      <div className="mt-4">
                        <AnimatedHeading
                          text="A practical intervention with institutional line of sight."
                          className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] text-trace-ink sm:text-4xl"
                        />
                      </div>
                      <div className="mt-6 space-y-5">
                        {overviewParas.map((para, i) => (
                          <p key={i} className="text-base leading-8 text-trace-muted">{para}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionReveal>

                {/* 02 — Project Details / Scope */}
                {scope.length > 0 && (
                  <SectionReveal delay={0.05}>
                    <div className="relative">
                      <GhostNumber value="02" />
                      <div className="relative">
                        <AnimatedEyebrow number="02" text="PROJECT DETAILS" />
                        <div className="mt-4">
                          <AnimatedHeading
                            text="Scope of services."
                            className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] text-trace-ink sm:text-4xl"
                          />
                        </div>
                        <ul className="mt-7 space-y-3">
                          {scope.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{ duration: 0.35, delay: i * 0.04 }}
                              className="flex items-start gap-4 rounded-xl border border-trace-ink/8 bg-white p-4 transition-all duration-300 hover:border-trace-teal/30 hover:shadow-[0_8px_24px_rgba(7,27,43,0.08)] sm:p-5"
                            >
                              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-trace-teal/12 text-trace-teal">
                                <CheckCircle2 className="h-4 w-4" />
                              </span>
                              <span className="text-sm leading-6 text-trace-ink sm:text-base sm:leading-7">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SectionReveal>
                )}

                {/* 03 — Key Outcomes */}
                {outcomes.length > 0 && (
                  <SectionReveal delay={0.05}>
                    <div className="relative">
                      <GhostNumber value="03" />
                      <div className="relative">
                        <AnimatedEyebrow number="03" text="KEY OUTCOMES" />
                        <div className="mt-4">
                          <AnimatedHeading
                            text="What this project delivers."
                            className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] text-trace-ink sm:text-4xl"
                          />
                        </div>
                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                          {outcomes.map((item, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{ duration: 0.4, delay: i * 0.05 }}
                              className="relative overflow-hidden rounded-xl bg-white p-5 shadow-[0_6px_18px_rgba(7,27,43,0.06)] ring-1 ring-trace-ink/8 transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(7,27,43,0.1)]"
                            >
                              <span className="absolute left-0 top-0 h-full w-1 bg-trace-teal" aria-hidden="true" />
                              <p className="pl-2 text-sm font-semibold leading-6 text-trace-ink sm:text-[15px]">{item}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                )}

                {/* 04 — Subject Matter Experts */}
                {contributors.length > 0 && (
                  <SectionReveal delay={0.05}>
                    <div className="relative">
                      <GhostNumber value="04" />
                      <div className="relative">
                        <AnimatedEyebrow number="04" text="SUBJECT MATTER EXPERTS" />
                        <div className="mt-4">
                          <AnimatedHeading
                            text="The team behind this mandate."
                            className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] text-trace-ink sm:text-4xl"
                          />
                        </div>
                        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                          {contributors.map((member, i) => (
                            <SectionReveal key={member.slug} delay={i * 0.05} className="h-full">
                              <TeamPhotoCard member={member} />
                            </SectionReveal>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                )}

                {/* 05 — Related Insights */}
                {relatedInsights.length > 0 && (
                  <SectionReveal delay={0.05}>
                    <div className="relative">
                      <GhostNumber value="05" />
                      <div className="relative">
                        <AnimatedEyebrow number="05" text="RELATED INSIGHTS" />
                        <div className="mt-4">
                          <AnimatedHeading
                            text="Published knowledge from this work."
                            className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] text-trace-ink sm:text-4xl"
                          />
                        </div>
                        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {relatedInsights.map((insight) => (
                            <Link key={insight.slug} href={`/insights/${insight.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(7,27,43,0.14)]">
                              <div className="relative aspect-[16/9] overflow-hidden">
                                <img src={insightImage(insight)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.14em] text-trace-navy">{insight.type.toUpperCase()}</span>
                              </div>
                              <div className="flex flex-1 flex-col p-4">
                                <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-teal">{insight.date.toUpperCase()}</p>
                                <h3 className="mt-2 line-clamp-2 text-sm font-extrabold leading-5 text-trace-ink transition-colors group-hover:text-trace-teal">{insight.title}</h3>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                )}

                {/* 06 — Related Areas */}
                {relatedServices.length > 0 && (
                  <SectionReveal delay={0.05}>
                    <div className="relative">
                      <GhostNumber value="06" />
                      <div className="relative">
                        <AnimatedEyebrow number="06" text="RELATED AREAS" />
                        <div className="mt-4">
                          <AnimatedHeading
                            text="Where this fits in our service map."
                            className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] text-trace-ink sm:text-4xl"
                          />
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2.5">
                          {relatedServices.map((service) => (
                            <Link key={service.slug} href={`/services/${service.slug}`}>
                              <span className="inline-flex items-center gap-2 rounded-full border border-trace-teal/30 bg-trace-teal/8 px-4 py-2 text-xs font-extrabold text-trace-teal transition-all hover:bg-trace-teal hover:text-white hover:shadow-[0_8px_20px_rgba(0,156,166,0.3)]">
                                {service.title}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                )}
              </div>

              {/* ──────────── RIGHT: Project Facts floating card ────────────
                   The outer <aside> stretches to the grid height; the inner <div> has
                   position: sticky so the Project Facts card stays pinned to the top-right
                   of the viewport while the content column scrolls past it. */}
              <aside>
                <div className="lg:sticky lg:top-28 overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_rgba(7,27,43,0.14),0_6px_16px_rgba(7,27,43,0.06)] ring-1 ring-trace-ink/5 transition-shadow duration-300 hover:shadow-[0_32px_72px_rgba(7,27,43,0.2),0_8px_20px_rgba(7,27,43,0.08)]">
                  {/* Thin teal top accent */}
                  <span className="block h-1 w-full bg-gradient-to-r from-trace-teal via-trace-mint to-trace-teal" aria-hidden="true" />
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-trace-teal/12 text-trace-teal">
                        <FileText className="h-4 w-4" />
                      </span>
                      <p className="font-display text-base font-extrabold tracking-[-0.02em] text-trace-ink">Project Facts</p>
                    </div>
                    <dl className="mt-6 space-y-5">
                      {([
                        ["Client", project.client],
                        ["Sector", sector],
                        project.standard && ["Standard", project.standard],
                        ["Location", location],
                        ["Duration", project.period],
                      ].filter(Boolean) as Array<[string, string]>).map(([label, value]) => (
                        <div key={label}>
                          <dt className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-muted">{label.toUpperCase()}</dt>
                          <dd className="mt-1 text-[13px] font-semibold leading-6 text-trace-ink">{value}</dd>
                        </div>
                      ))}
                      <div>
                        <dt className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-muted">STATUS</dt>
                        <dd className="mt-2">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.14em] ${project.status === "Ongoing" ? "bg-trace-teal/15 text-trace-teal" : "bg-trace-ink/8 text-trace-ink"}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${project.status === "Ongoing" ? "animate-pulse bg-trace-teal" : "bg-trace-ink/40"}`} />
                            {project.status.toUpperCase()}
                          </span>
                        </dd>
                      </div>
                    </dl>
                    {/* CTA */}
                    <Link href="/contact" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-trace-orange px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(244,122,32,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(244,122,32,0.5)]">
                      Discuss a similar project <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

/** Stop a nested link's click from bubbling to the outer <Link> card. */
const stopNested = (e: React.MouseEvent) => e.stopPropagation();

/** True when the member's title identifies them as an industry/subject-matter expert.
 *  Matches titles like "Technical Expert", "QMS Expert", "… & Customs Expert", "Expert — Research & Policy", etc. */
function isExpertRole(role: string): boolean {
  return /\bExpert\b/i.test(role);
}

/** Photo card: tall portrait, name + role beneath. Fixed caption height so all cards align.
 *  Experts get a floating "INDUSTRY EXPERT" badge and a subtle teal ring + accent so they
 *  stand out visually within each department grid. */
function TeamPhotoCard({ member }: { member: TeamMember }) {
  const isExpert = isExpertRole(member.role);
  return (
    <Link
      href={`/team/${member.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 ${
        isExpert
          ? "shadow-[0_18px_48px_rgba(0,156,166,0.14),0_6px_16px_rgba(7,27,43,0.10)] ring-1 ring-trace-teal/35 hover:shadow-[0_30px_72px_rgba(0,156,166,0.22),0_8px_22px_rgba(7,27,43,0.16)] hover:ring-trace-teal"
          : "shadow-[0_14px_40px_rgba(7,27,43,0.08)] hover:shadow-[0_24px_56px_rgba(7,27,43,0.14)]"
      }`}
    >
      {/* Top accent — thicker + gradient on expert cards so they visually "lift" against regular ones */}
      <span
        aria-hidden="true"
        className={
          isExpert
            ? "h-[5px] w-full bg-gradient-to-r from-trace-teal via-trace-mint to-trace-orange"
            : "h-[3px] w-full bg-trace-teal"
        }
      />
      {/* Large portrait — aspect 4:5 */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-trace-paper to-white">
        <TeamPortrait member={member} className="absolute inset-0 h-full w-full" imageClassName="transition-transform duration-500 group-hover:scale-[1.04]" />
        {isExpert && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-trace-teal to-[#0b7c84] px-3 py-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_8px_20px_rgba(0,156,166,0.45)] backdrop-blur-sm">
            <Award className="h-3 w-3" strokeWidth={2.5} />
            Industry Expert
          </span>
        )}
      </div>
      {/* Fixed-height caption so every card lines up: name on 2 lines, role on 2 lines, social row at bottom */}
      <div className="flex min-h-[200px] flex-1 flex-col px-7 pt-7 pb-6 text-center">
        <p className="line-clamp-2 min-h-[3.3rem] font-display text-[1.4rem] font-extrabold leading-[1.15] tracking-[-0.035em] text-trace-ink">{member.name}</p>
        <p className="mt-2.5 line-clamp-2 min-h-[2.75rem] text-sm font-semibold leading-[1.4] text-trace-teal">{member.role}</p>
        {(member.linkedin || member.email) && (
          <div className="mt-auto flex items-center justify-center gap-2 pt-5">
            {member.linkedin && (
              <a href={member.linkedin} onClick={stopNested} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`} className="grid h-9 w-9 place-items-center rounded-md bg-trace-ink text-white transition-transform duration-200 hover:-translate-y-0.5">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} onClick={stopNested} aria-label={`Email ${member.name}`} className="grid h-9 w-9 place-items-center rounded-md border border-trace-ink/15 bg-white text-trace-ink transition-transform duration-200 hover:-translate-y-0.5">
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

/** Info card — same frame as photo card but shows a monogram portrait placeholder so layout stays identical. */
function TeamInfoCard({ member }: { member: TeamMember }) {
  // Reuse the exact same card to keep every grid row aligned. TeamPortrait handles the no-image case already.
  return <TeamPhotoCard member={member} />;
}

/** Large horizontal CEO feature card — the WHOLE thing is a single clickable Link. */
function TeamCEOFeature({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/team/${member.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-[0_20px_56px_rgba(7,27,43,0.10)] ring-1 ring-trace-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_72px_rgba(7,27,43,0.16)] hover:ring-trace-teal/30"
    >
      <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
        {/* Portrait */}
        <div className="relative min-h-[380px] overflow-hidden bg-gradient-to-b from-[#DDE4EA] to-[#C9D4DC]">
          <TeamPortrait member={member} className="absolute inset-0 h-full w-full" imageClassName="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-trace-orange px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.18em] text-white shadow-[0_6px_14px_rgba(244,122,32,0.4)]">
            <Crown className="h-3 w-3" />CEO
          </span>
        </div>
        {/* Content */}
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          <h3 className="font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.06em] text-trace-ink sm:text-5xl transition-colors group-hover:text-trace-teal">{member.name}</h3>
          <p className="mt-3 text-base font-extrabold text-trace-teal">{member.role}</p>
          <div className="mt-3 h-[3px] w-16 rounded-full bg-trace-orange" />
          <p className="mt-6 line-clamp-4 text-sm leading-7 text-trace-muted sm:text-base sm:leading-8">{member.bio}</p>
          {member.tags && member.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {member.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-trace-teal/30 bg-trace-mint/50 px-3.5 py-1.5 text-xs font-bold text-trace-navy">{tag}</span>
              ))}
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-trace-ink/10 pt-6">
            <div className="flex items-center gap-2">
              {member.linkedin && (
                <a href={member.linkedin} onClick={stopNested} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`} className="grid h-10 w-10 place-items-center rounded-md bg-trace-ink text-white transition-transform duration-200 hover:-translate-y-0.5">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {member.email && (
                <a href={`mailto:${member.email}`} onClick={stopNested} aria-label={`Email ${member.name}`} className="grid h-10 w-10 place-items-center rounded-md border border-trace-ink/15 bg-white text-trace-ink transition-transform duration-200 hover:-translate-y-0.5">
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-trace-ink/15 bg-white px-5 py-2.5 text-sm font-extrabold text-trace-ink transition-all duration-200 group-hover:border-trace-teal group-hover:text-trace-teal">
              View Full Profile <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function TeamPage() {
  const ceo = team.find((m) => m.slug === "fuad-khalid");
  const byDept = useMemo(() => {
    const map = new Map<Department, TeamMember[]>();
    departmentOrder.forEach((d) => map.set(d, []));
    // Exclude CEO from the departmental grid — he gets his own feature at the top.
    team.filter((m) => m.slug !== "fuad-khalid").forEach((m) => map.get(m.department)?.push(m));
    return map;
  }, []);
  return (
    <Shell>
      <main>
        <PageHero
          label="OUR TEAM"
          title={<>Experts who <span className="text-trace-mint">drive change.</span></>}
          description="A permanent core of trade specialists, researchers, technologists, policy professionals, and implementation partners — organised across six functional departments."
          tone="navy"
        />
        {/* ── CEO FEATURE ───────────────────────────────────────────────── */}
        {ceo && (
          <section className="bg-trace-paper py-16 sm:py-20">
            <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
              <SectionReveal>
                <div className="mb-10 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="h-[3px] w-10 rounded-full bg-trace-orange" aria-hidden="true" />
                    <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-trace-teal">LEADERSHIP</p>
                  </div>
                  <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.055em] text-trace-teal sm:text-5xl">Chief Executive Officer</h2>
                  <p className="mt-5 text-base leading-7 text-trace-muted">Leading TRACE's vision of practical, high-impact consulting for governments and development partners.</p>
                </div>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <TeamCEOFeature member={ceo} />
              </SectionReveal>
            </div>
          </section>
        )}
        {/* ── DEPARTMENTS ───────────────────────────────────────────────── */}
        {departmentOrder.map((dept, deptIdx) => {
          const members = byDept.get(dept) ?? [];
          if (members.length === 0) return null;
          const isPaper = deptIdx % 2 === 0;
          return (
            <section key={dept} className={`py-16 sm:py-20 ${isPaper ? "bg-white" : "bg-trace-paper"}`}>
              <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
                <SectionReveal>
                  <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-trace-teal">
                    DEPARTMENT 0{deptIdx + 1} · {members.length} MEMBER{members.length === 1 ? "" : "S"}
                  </p>
                  <h2 className="mt-3 max-w-4xl font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.05em] text-trace-ink sm:text-4xl lg:text-5xl">
                    {dept}
                  </h2>
                  <div className="mt-4 h-1 w-16 rounded-full bg-trace-orange" />
                </SectionReveal>
                <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((member, idx) => (
                    <SectionReveal key={member.slug} delay={idx * 0.04} className="h-full">
                      {member.image ? <TeamPhotoCard member={member} /> : <TeamInfoCard member={member} />}
                    </SectionReveal>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </Shell>
  );
}

/** Section heading with orange left rule — reused across the detail page. */
function DetailSectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-6 w-1 rounded-full bg-trace-orange" aria-hidden="true" />
      <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] text-trace-ink sm:text-[1.65rem]">{title}</h2>
    </div>
  );
}

export function TeamDetailPage() {
  const [, params] = useRoute("/team/:slug");
  const member = team.find((item) => item.slug === params?.slug);
  const [projectsShown, setProjectsShown] = useState(3);
  const [insightsShown, setInsightsShown] = useState(3);
  if (!member) return <NotFoundEntity />;
  const memberProjects = projects.filter((project) => member.projectSlugs.includes(project.slug));
  const memberInsights = insights.filter((insight) => insight.teamSlugs.includes(member.slug));
  // Pull 3 other team members from the same department to populate the sidebar list.
  const otherMembers = team.filter((m) => m.slug !== member.slug && m.department === member.department).slice(0, 3);
  // Split the bio into paragraphs by sentence endings so long bios lay out like the live site.
  const bioParagraphs = member.bio
    .split(/(?<=\.) +(?=[A-Z])/)
    .reduce<string[]>((acc, sentence) => {
      // Group sentences into paragraphs of ~2 sentences each for readable rhythm.
      if (!acc.length || acc[acc.length - 1].split(". ").length >= 2) acc.push(sentence);
      else acc[acc.length - 1] = `${acc[acc.length - 1]} ${sentence}`;
      return acc;
    }, []);
  return (
    <Shell>
      <main>
        {/* ─────────────────────────────── HERO ─────────────────────────────── */}
        <section className="relative overflow-hidden bg-trace-ink pt-28 pb-14 text-white sm:pt-36">
          <div className="pointer-events-none absolute inset-0 opacity-50 hero-grid" />
          <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-trace-teal/18 blur-[100px]" />
          <div className="relative mx-auto max-w-[1480px] px-5 lg:px-10">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.14em] text-white/60">
              <Link href="/" className="transition-colors hover:text-white">HOME</Link>
              <span>/</span>
              <Link href="/team" className="transition-colors hover:text-white">OUR TEAM</Link>
              <span>/</span>
              <span className="text-white/85">{member.name.toUpperCase()}</span>
            </nav>
            <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:gap-14">
              {/* Portrait with role chip */}
              <SectionReveal>
                <div className="relative overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <div className="aspect-[4/5] overflow-hidden">
                    <TeamPortrait member={member} className="h-full w-full" imageClassName="object-cover" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-trace-teal px-4 py-3 text-center">
                    <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-white">{member.role.toUpperCase()}</p>
                  </div>
                </div>
              </SectionReveal>
              {/* Name + tags + socials */}
              <SectionReveal delay={0.1} className="flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <span className="h-[3px] w-10 rounded-full bg-trace-orange" aria-hidden="true" />
                  <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-trace-orange">TEAM MEMBER</p>
                </div>
                <h1 className="mt-5 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">{member.name}</h1>
                <p className="mt-3 text-lg font-extrabold text-trace-teal sm:text-xl">{member.role}</p>
                <p className="mt-2 text-sm text-white/60">TRACE Consulting, Dhaka, Bangladesh</p>
                {member.tags && member.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {member.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-trace-teal/50 bg-trace-teal/15 px-3.5 py-1.5 text-xs font-bold text-trace-mint">{tag}</span>
                    ))}
                  </div>
                )}
                {(member.linkedin || member.email) && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-trace-ink/60 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/15 transition-all hover:bg-trace-ink hover:-translate-y-0.5">
                        <Linkedin className="h-4 w-4" />LinkedIn
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 rounded-md bg-trace-ink/60 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/15 transition-all hover:bg-trace-ink hover:-translate-y-0.5">
                        <Mail className="h-4 w-4" />Email
                      </a>
                    )}
                  </div>
                )}
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────── BODY ─────────────────────────────── */}
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
              {/* LEFT COLUMN: About, Expertise, Related */}
              <div>
                {/* About */}
                <SectionReveal>
                  <DetailSectionHeading title={`About ${member.name}`} />
                  <div className="mt-6 space-y-5 text-[15px] leading-7 text-trace-muted">
                    {bioParagraphs.map((p, i) => (<p key={i}>{p}</p>))}
                  </div>
                </SectionReveal>

                {/* Areas of Expertise — checkmark grid */}
                {member.tags && member.tags.length > 0 && (
                  <SectionReveal delay={0.08}>
                    <div className="mt-14">
                      <DetailSectionHeading title="Areas of Expertise" />
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {member.tags.map((tag) => (
                          <div key={tag} className="flex items-center gap-3 rounded-lg border border-trace-mint/50 bg-trace-mint/15 p-4">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-trace-mint/50 bg-white">
                              <CheckCircle2 className="h-4 w-4 text-trace-teal" />
                            </span>
                            <span className="text-sm font-bold leading-5 text-trace-ink">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SectionReveal>
                )}

                {/* Related Projects */}
                {memberProjects.length > 0 && (
                  <SectionReveal delay={0.1}>
                    <div className="mt-14">
                      <DetailSectionHeading title="Related Projects" />
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {memberProjects.slice(0, projectsShown).map((project) => (
                          <Link key={project.slug} href={`/projects/${project.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(7,27,43,0.14)]">
                            <div className="relative aspect-[16/9] overflow-hidden">
                              <img src={projectImage(project)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <span className={`absolute left-3 top-3 px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.14em] ${project.status === "Ongoing" ? "bg-trace-teal text-white" : "bg-white/95 text-trace-navy"}`}>{project.status.toUpperCase()}</span>
                            </div>
                            <div className="flex flex-1 flex-col p-4">
                              <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-teal">{project.client.toUpperCase()}</p>
                              <h3 className="mt-2 line-clamp-2 text-sm font-extrabold leading-5 text-trace-ink transition-colors group-hover:text-trace-teal">{project.title}</h3>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {projectsShown < memberProjects.length && (
                        <div className="mt-5 flex justify-center">
                          <button type="button" onClick={() => setProjectsShown(memberProjects.length)} className="inline-flex items-center gap-2 rounded-full border border-trace-ink/15 bg-white px-5 py-2 text-xs font-bold text-trace-ink hover:border-trace-teal hover:text-trace-teal">
                            Show {memberProjects.length - projectsShown} more <ChevronDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </SectionReveal>
                )}

                {/* Related Insights */}
                {memberInsights.length > 0 && (
                  <SectionReveal delay={0.1}>
                    <div className="mt-14">
                      <DetailSectionHeading title="Related Insights" />
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {memberInsights.slice(0, insightsShown).map((insight) => (
                          <Link key={insight.slug} href={`/insights/${insight.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(7,27,43,0.14)]">
                            <div className="relative aspect-[16/9] overflow-hidden">
                              <img src={insightImage(insight)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.14em] text-trace-navy">{insight.type.toUpperCase()}</span>
                            </div>
                            <div className="flex flex-1 flex-col p-4">
                              <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-teal">{insight.date.toUpperCase()}</p>
                              <h3 className="mt-2 line-clamp-2 text-sm font-extrabold leading-5 text-trace-ink transition-colors group-hover:text-trace-teal">{insight.title}</h3>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {insightsShown < memberInsights.length && (
                        <div className="mt-5 flex justify-center">
                          <button type="button" onClick={() => setInsightsShown(memberInsights.length)} className="inline-flex items-center gap-2 rounded-full border border-trace-ink/15 bg-white px-5 py-2 text-xs font-bold text-trace-ink hover:border-trace-teal hover:text-trace-teal">
                            Show {memberInsights.length - insightsShown} more <ChevronDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </SectionReveal>
                )}
              </div>

              {/* RIGHT COLUMN: Sidebar — CTA + Other Members */}
              <aside className="space-y-5">
                {/* Work with Our Team CTA */}
                <SectionReveal>
                  <div className="rounded-xl bg-trace-ink p-6 text-center text-white shadow-[0_14px_40px_rgba(7,27,43,0.18)]">
                    <span className="mx-auto grid h-10 w-10 place-items-center rounded-md bg-white/10 ring-1 ring-white/15">
                      <MessageSquare className="h-5 w-5 text-trace-mint" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-extrabold tracking-[-0.02em]">Work with Our Team</h3>
                    <p className="mt-2 text-xs leading-5 text-white/70">Reach out to discuss how TRACE can support your institution's trade reform objectives.</p>
                    <Link href="/contact" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-trace-orange px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(244,122,32,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(244,122,32,0.5)]">
                      Get in Touch
                    </Link>
                  </div>
                </SectionReveal>

                {/* Other Team Members */}
                {otherMembers.length > 0 && (
                  <SectionReveal delay={0.08}>
                    <div className="rounded-xl bg-white p-6 ring-1 ring-trace-ink/8 shadow-[0_8px_24px_rgba(7,27,43,0.06)]">
                      <h3 className="font-display text-base font-extrabold text-trace-ink">Other Team Members</h3>
                      <div className="mt-4 space-y-4">
                        {otherMembers.map((m) => (
                          <Link key={m.slug} href={`/team/${m.slug}`} className="group flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-trace-ink/8">
                              <TeamPortrait member={m} className="h-full w-full" imageClassName="object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-extrabold text-trace-ink transition-colors group-hover:text-trace-teal">{m.name}</p>
                              <p className="truncate text-[11px] font-bold text-trace-muted">{m.role}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link href="/team" className="group mt-5 flex items-center gap-3 border-t border-trace-ink/8 pt-4">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-trace-mint/40">
                          <Users className="h-4 w-4 text-trace-teal" />
                        </span>
                        <div>
                          <p className="text-sm font-extrabold text-trace-ink transition-colors group-hover:text-trace-teal">View Full Team</p>
                          <p className="text-[11px] font-bold text-trace-muted">All {team.length} team members</p>
                        </div>
                      </Link>
                    </div>
                  </SectionReveal>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function InsightsPage() {
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const types = ["All", "Video", "Article", "Publication", "Meeting", "Event", "Brochure"];
  const displayed = useMemo(() => insights.filter((insight) => (type === "All" || insight.type === type) && (!query || `${insight.title} ${insight.summary}`.toLowerCase().includes(query.toLowerCase()))), [type, query]);
  return (
    <Shell>
      <main>
        <PageHero label="KNOWLEDGE & RESEARCH" title={<>Ideas that move <span className="text-trace-teal">trade forward.</span></>} description="Videos, articles, publications, and brochures from TRACE’s growing body of published knowledge." tone="dark" kicker={`${insights.length} PUBLISHED INSIGHT RECORDS`} />
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
            <div className="flex flex-col gap-5 border-b border-trace-ink/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {types.map((item) => (
                  <button key={item} onClick={() => setType(item)} className={`px-4 py-2 text-xs font-extrabold transition-colors ${type === item ? "border-b-2 border-trace-orange text-trace-navy" : "text-trace-muted hover:text-trace-navy"}`}>{item.toUpperCase()}</button>
                ))}
              </div>
              <label className="flex w-full max-w-md items-center gap-3 border border-trace-ink/12 bg-white px-3 py-3">
                <Search className="h-4 w-4 text-trace-teal" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search knowledge" className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-trace-muted/70" />
              </label>
            </div>
            <p className="mt-7 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-muted">SHOWING {displayed.length} INSIGHT{displayed.length === 1 ? "" : "S"}</p>
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {displayed.map((insight, index) => (
                <SectionReveal key={insight.slug} delay={index * 0.04} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    <Link href={`/insights/${insight.slug}`} className="block h-full">
                      <div className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(7,27,43,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(7,27,43,0.16)]">
                        <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1.5} />
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          <motion.img
                            src={insightImage(insight)}
                            alt={insight.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/60 via-trace-ink/10 to-transparent" />
                          <span className="absolute right-4 top-4 bg-trace-orange px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.14em] text-white">
                            {insight.type.toUpperCase()}
                          </span>
                          {insight.type === "Video" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 shadow-lg">
                                <PlayCircle className="h-8 w-8 text-trace-teal" />
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-trace-ink/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-trace-ink shadow-lg"
                            >
                              <ArrowUpRight className="h-4 w-4 text-trace-teal" />
                              Open Insight
                            </motion.span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 p-5 sm:p-6">
                          <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">
                            {insight.date.toUpperCase()}
                          </p>
                          <h3 className="font-display text-xl font-extrabold leading-[1.1] tracking-[-0.04em] text-trace-ink transition-colors group-hover:text-trace-teal sm:text-2xl">
                            {insight.title}
                          </h3>
                          <p className="line-clamp-3 text-sm leading-6 text-trace-muted">
                            {insight.summary}
                          </p>
                          <div className="flex items-center justify-between border-t border-trace-ink/8 pt-3">
                            <span className="text-xs font-bold text-trace-ink">{insight.type}</span>
                            <ArrowUpRight className="h-4 w-4 text-trace-orange transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
            {displayed.length === 0 && <p className="py-16 text-center text-trace-muted">No insights match this search.</p>}
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function InsightDetailPage() {
  const [, params] = useRoute("/insights/:slug");
  const insight = insights.find((item) => item.slug === params?.slug);
  if (!insight) return <NotFoundEntity />;
  const relatedServices = services.filter((service) => insight.serviceSlugs.includes(service.slug));
  const relatedProjects = projects.filter((project) => insight.projectSlugs.includes(project.slug));
  const relatedTeam = team.filter((member) => insight.teamSlugs.includes(member.slug));
  const bodyParas = insight.body ?? [insight.summary];
  return (
    <Shell>
      <main>
        <DetailMediaHero
          label={insight.type.toUpperCase()}
          title={insight.title}
          description={insight.summary}
          kicker={insight.date.toUpperCase()}
          image={insightImage(insight)}
        />
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
            <BackLink href="/insights" label="insights" />
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
              {/* ── Article body ── */}
              <article>
                {/* Full image at the top (user explicitly asked for the image to be shown in full) */}
                {insight.image && (
                  <div className="relative mb-10 overflow-hidden rounded-2xl bg-trace-paper shadow-[0_14px_40px_rgba(7,27,43,0.1)] ring-1 ring-trace-ink/5">
                    <img src={insight.image} alt="" className="block h-auto w-full object-contain" />
                  </div>
                )}
                {/* Author + published-in byline */}
                {(insight.author || insight.publisher) && (
                  <p className="font-mono text-[11px] font-bold tracking-[0.18em] text-trace-muted">
                    {insight.author && `BY ${insight.author.toUpperCase()}`}
                    {insight.author && insight.publisher && " · "}
                    {insight.publisher && `PUBLISHED IN ${insight.publisher.toUpperCase()}`}
                  </p>
                )}
                {/* Body paragraphs */}
                <div className="mt-6 space-y-5 text-base leading-8 text-trace-muted sm:text-[17px] sm:leading-[1.75]">
                  {bodyParas.map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: i * 0.03 }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
                {/* Entity tags */}
                {relatedServices.length > 0 && (
                  <div className="mt-10 border-t border-trace-ink/8 pt-6">
                    <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">RELATED AREAS</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {relatedServices.map((service) => (
                        <Link key={service.slug} href={`/services/${service.slug}`}>
                          <EntityTag>{service.title.toUpperCase()}</EntityTag>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* ── Right sidebar: View the publication card (sticky) ──
                   Outer <aside> stretches to grid height; inner wrapper is sticky so the
                   publication CTA + format card stay pinned on scroll. */}
              <aside>
                <div className="lg:sticky lg:top-28 space-y-5">
                {insight.sourceUrl && (
                  <div className="overflow-hidden rounded-2xl bg-trace-ink p-6 text-white shadow-[0_18px_46px_rgba(7,27,43,0.18)] ring-1 ring-white/10">
                    <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-trace-mint">PUBLISHED SOURCE</p>
                    {insight.publisher && (
                      <p className="mt-3 font-display text-xl font-extrabold tracking-[-0.03em] text-white">{insight.publisher}</p>
                    )}
                    <p className="mt-2 text-xs leading-5 text-white/60">The original article is hosted on the publisher's site.</p>
                    <a
                      href={insight.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-trace-orange px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(244,122,32,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(244,122,32,0.5)]"
                    >
                      {insight.sourceLabel ?? "View the publication"}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
                {/* Format / date card */}
                <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/8">
                  <span className="block h-1 w-full rounded-full bg-trace-teal" aria-hidden="true" />
                  <p className="mt-5 font-mono text-[10px] font-bold tracking-[0.18em] text-trace-muted">FORMAT</p>
                  <p className="mt-2 font-display text-xl font-extrabold text-trace-ink">{insight.type}</p>
                  <p className="mt-4 font-mono text-[10px] font-bold tracking-[0.18em] text-trace-muted">PUBLISHED</p>
                  <p className="mt-2 text-sm font-bold text-trace-ink">{insight.date}</p>
                </div>
                {/* Related team */}
                {relatedTeam.length > 0 && (
                  <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/8">
                    <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">RELEVANT EXPERTS</p>
                    <div className="mt-4 space-y-4">
                      {relatedTeam.slice(0, 3).map((m) => (
                        <Link key={m.slug} href={`/team/${m.slug}`} className="group flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-trace-ink/8">
                            <TeamPortrait member={m} className="h-full w-full" imageClassName="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-extrabold text-trace-ink transition-colors group-hover:text-trace-teal">{m.name}</p>
                            <p className="truncate text-[11px] font-bold text-trace-muted">{m.role}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                </div>
              </aside>
            </div>

            {/* Related projects */}
            {relatedProjects.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center gap-3">
                  <span className="h-5 w-1 rounded-full bg-trace-orange" aria-hidden="true" />
                  <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] text-trace-ink">Related projects</h2>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map((project) => (
                    <Link key={project.slug} href={`/projects/${project.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(7,27,43,0.14)]">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img src={projectImage(project)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <p className="font-mono text-[9px] font-bold tracking-[0.14em] text-trace-teal">{project.client.toUpperCase()}</p>
                        <h3 className="mt-2 line-clamp-3 text-sm font-extrabold leading-5 text-trace-ink transition-colors group-hover:text-trace-teal">{project.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </Shell>
  );
}

function UpdateCard({ item }: { item: LatestUpdate }) {
  const cardClass = "group relative block h-full overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(7,27,43,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(7,27,43,0.16)]";
  const inner = (
    <>
      <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1.5} />
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/60 via-trace-ink/10 to-transparent" />
        <span className="absolute left-4 top-4 bg-white/95 px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.14em] text-trace-navy backdrop-blur">{item.category.toUpperCase()}</span>
        {item.external && <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center bg-trace-navy/85 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"><ExternalLink className="h-4 w-4" /></span>}
      </div>
      <div className="flex flex-col gap-3 p-5 sm:p-6">
        <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">{item.date.toUpperCase()}</p>
        <h3 className="font-display text-xl font-extrabold leading-[1.1] tracking-[-0.04em] text-trace-ink transition-colors group-hover:text-trace-teal sm:text-2xl">{item.title}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-trace-muted">{item.summary}</p>
        <div className="flex items-center justify-between border-t border-trace-ink/8 pt-3">
          <span className="text-xs font-bold text-trace-ink">{item.external ? "Read original" : "Read update"}</span>
          <ArrowUpRight className="h-4 w-4 text-trace-orange transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </>
  );
  if (item.external) {
    return <a href={item.url} target="_blank" rel="noreferrer" className={cardClass}>{inner}</a>;
  }
  return <Link href={item.url} className={cardClass}>{inner}</Link>;
}

export function LatestUpdateDetailPage() {
  const [, params] = useRoute("/latest-updates/:slug");
  const item = latestUpdates.find((u) => u.slug === params?.slug);
  if (!item || item.external) return <NotFoundEntity />;
  const { body } = item;
  const otherUpdates = latestUpdates.filter((u) => !u.external && u.slug !== item.slug).slice(0, 3);
  return (
    <Shell>
      <main>
        {/* ── Hero ── */}
        <section className="relative min-h-[65vh] overflow-hidden bg-trace-ink pt-36 sm:pt-44">
          <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-trace-ink/55 via-trace-ink/30 to-trace-ink" />
          <div className="relative mx-auto max-w-[1200px] px-5 pb-16 lg:px-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-trace-teal px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.14em] text-white">{item.category.toUpperCase()}</span>
              <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-white/60">{item.date.toUpperCase()}</span>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.06em] text-white sm:text-5xl">{item.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">{item.summary}</p>
          </div>
        </section>

        {/* ── Body ── */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
            <BackLink href="/latest-updates" label="updates" />
            <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
              {/* Article body */}
              <article>
                {body?.sections.map((section, si) => (
                  <SectionReveal key={si} delay={si * 0.06}>
                    <div className="relative mb-10">
                      <GhostNumber value={String(si + 1).padStart(2, "0")} />
                      {section.heading && (
                        <div className="relative mb-4">
                          <AnimatedEyebrow number={String(si + 1).padStart(2, "0")} text={section.heading.toUpperCase()} />
                        </div>
                      )}
                      <div className="relative grid gap-5">
                        {section.paragraphs.map((para, pi) => (
                          <p key={pi} className="text-base leading-8 text-trace-muted">{para}</p>
                        ))}
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                <SectionReveal delay={0.1}>
                  <div className="relative overflow-hidden border border-trace-ink/10 bg-white p-6 shadow-[0_8px_24px_rgba(7,27,43,0.08)]">
                    <div className="absolute left-0 top-0 h-1 w-full bg-trace-teal" />
                    <AnimatedEyebrow text="ABOUT THIS UPDATE" />
                    <div className="mt-5 grid gap-4">
                      <div>
                        <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-trace-muted">CATEGORY</p>
                        <p className="mt-1.5 font-display text-lg font-extrabold text-trace-ink">{item.category}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-trace-muted">DATE</p>
                        <p className="mt-1.5 text-sm font-bold text-trace-ink">{item.date}</p>
                      </div>
                    </div>
                  </div>
                </SectionReveal>

                {body?.team && body.team.length > 0 && (
                  <SectionReveal delay={0.15}>
                    <div className="relative overflow-hidden border border-trace-ink/10 bg-trace-navy p-6 shadow-[0_8px_24px_rgba(7,27,43,0.12)]">
                      <div className="absolute left-0 top-0 h-1 w-full bg-trace-mint" />
                      <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-trace-mint">TEAM</p>
                      <div className="mt-4 grid gap-3">
                        {body.team.map((member) => (
                          <div key={member.name} className="flex flex-col">
                            <span className="text-sm font-extrabold text-white">{member.name}</span>
                            <span className="text-xs text-white/60">{member.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SectionReveal>
                )}
              </aside>
            </div>
          </div>
        </section>

        {/* ── More updates ── */}
        {otherUpdates.length > 0 && (
          <section className="bg-trace-paper py-16 sm:py-20">
            <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
              <SectionReveal>
                <div className="flex items-end justify-between border-b border-trace-ink/10 pb-7">
                  <h2 className="font-display text-2xl font-extrabold tracking-[-0.05em] text-trace-ink">More updates</h2>
                  <Link href="/latest-updates" className="inline-flex items-center gap-2 text-sm font-bold text-trace-teal hover:underline">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              </SectionReveal>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {otherUpdates.map((u, index) => (
                  <SectionReveal key={u.slug} delay={index * 0.06} className="h-full">
                    <UpdateCard item={u} />
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Shell>
  );
}

export function LatestUpdatesPage() {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const categories = useMemo(() => {
    const set = new Set<string>();
    latestUpdates.forEach((item) => set.add(item.category));
    return ["All", ...Array.from(set)];
  }, []);
  const displayed = useMemo(() => {
    const q = query.toLowerCase();
    return latestUpdates
      .filter((item) => filter === "All" || item.category === filter)
      .filter((item) => !q || `${item.title} ${item.summary}`.toLowerCase().includes(q))
      .slice()
      .sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1));
  }, [filter, query]);

  return (
    <Shell>
      <main>
        <PageHero
          label="NEWS & INSIGHTS"
          title={<>The latest from <span className="text-trace-mint">TRACE.</span></>}
          description="News, publications, articles, events, workshops, and insights from TRACE's ongoing work in trade facilitation, policy reform, and institutional modernization."
          tone="navy"
          kicker={`${latestUpdates.length} PUBLISHED UPDATES`}
        />
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
            <div className="flex flex-col gap-5 border-b border-trace-ink/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-4 py-2 text-xs font-extrabold transition-colors ${filter === item ? "border-b-2 border-trace-orange text-trace-navy" : "text-trace-muted hover:text-trace-navy"}`}
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
              <label className="flex w-full max-w-md items-center gap-3 border border-trace-ink/12 bg-white px-3 py-3">
                <Search className="h-4 w-4 text-trace-teal" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search updates"
                  className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-trace-muted/70"
                />
              </label>
            </div>
            <p className="mt-7 font-mono text-[10px] font-bold tracking-[0.14em] text-trace-muted">
              SHOWING {displayed.length} UPDATE{displayed.length === 1 ? "" : "S"}
            </p>
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {displayed.map((item, index) => (
                <SectionReveal key={item.slug} delay={index * 0.04} className="h-full">
                  <UpdateCard item={item} />
                </SectionReveal>
              ))}
            </div>
            {displayed.length === 0 && (
              <p className="py-16 text-center text-trace-muted">No updates match this search.</p>
            )}
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function InnovationsPage() {
  return <Shell><main><PageHero label="OUR INNOVATIONS" title={<>Intelligence that makes the next <span className="text-trace-teal">move visible.</span></>} description="Digital products that turn complex trade rules, export priorities, and scattered data into usable decisions." tone="dark" /><section className="bg-trace-paper py-20 sm:py-28"><div className="mx-auto grid max-w-[1480px] gap-7 px-5 lg:px-10">{innovations.map((innovation, index) => <SectionReveal key={innovation.slug} delay={index * 0.08}><StarBorder color="#009CA6" speed="8s"><motion.article whileHover={{ y: -7 }} transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }} className="group grid overflow-hidden bg-white lg:grid-cols-[1.1fr_0.9fr]"><ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1} /><div className="relative min-h-[320px] overflow-hidden bg-trace-ink"><img src={innovation.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-tr from-trace-ink/78 via-trace-ink/22 to-transparent" /><div className="absolute bottom-7 left-7 flex flex-wrap gap-2">{innovation.tags.map((tag) => <span key={tag} className="border border-white/22 bg-white/10 px-3 py-2 font-mono text-[10px] font-bold tracking-[0.12em] text-trace-mint">{tag.toUpperCase()}</span>)}</div></div><div className="flex flex-col justify-between p-8 sm:p-10"><div><p className="section-label">TRACE PRODUCT 0{index + 1}</p><h2 className="mt-5 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.06em] text-trace-ink">{innovation.title}</h2><p className="mt-6 text-sm leading-7 text-trace-muted">{innovation.description}</p></div><a href={innovation.url} target="_blank" rel="noreferrer" className="mt-10 inline-flex w-fit items-center gap-2 border-b border-trace-teal pb-2 text-sm font-extrabold text-trace-ink transition-transform duration-200 group-hover:translate-x-1">Visit platform <ExternalLink className="h-4 w-4 text-trace-orange" /></a></div></motion.article></StarBorder></SectionReveal>)}</div></section></main></Shell>;
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

/** Expandable career row — click/Enter/Space toggles an inline reveal of responsibilities, requirements, and apply action. Preserves the dedicated /careers/:slug page for direct linking. */
function CareerRoleCard({ role, expired }: { role: CareerRole; expired: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = `career-panel-${role.slug}`;
  const headerId = `career-header-${role.slug}`;

  const card = (
    <div
      className={`relative overflow-hidden border bg-white transition-all ${expired ? "border-trace-ink/12" : open ? "border-trace-teal/55 shadow-[0_18px_38px_rgba(18,61,103,0.12)]" : "border-trace-ink/10 hover:-translate-y-0.5 hover:border-trace-teal/55 hover:shadow-[0_18px_38px_rgba(18,61,103,0.12)]"}`}
    >
      {!expired && <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1} />}
      {expired && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[repeating-linear-gradient(135deg,_rgba(8,36,64,0.035)_0_10px,_transparent_10px_22px)]" />
      )}

      {/* Header row — the clickable summary */}
      <button
        type="button"
        id={headerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={`group relative z-[2] block w-full text-left ${expired ? "" : "cursor-pointer"}`}
      >
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
          <span className={`inline-flex items-center gap-1.5 justify-self-start text-xs font-extrabold md:justify-self-end ${expired ? "text-trace-muted" : "text-trace-navy"}`}>
            {open ? "Hide details" : expired ? "View details" : "View details & apply"}
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""} ${expired ? "text-trace-muted" : "text-trace-orange"}`} />
          </span>
        </div>
        {expired && (
          <span aria-hidden="true" className="pointer-events-none absolute right-4 top-4 z-[2] rotate-6 border-2 border-trace-ink/25 px-3 py-1 font-mono text-[10px] font-black tracking-[0.18em] text-trace-ink/45">
            CLOSED
          </span>
        )}
      </button>

      {/* Expanded panel — responsibilities + requirements + apply action */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-[2] overflow-hidden border-t border-trace-ink/10 bg-white"
          >
            {/* Full-width expired banner — reads as a clear status strip at the top of the panel */}
            {expired && (
              <div className="flex items-start gap-3 border-b border-trace-ink/10 bg-trace-paper px-5 py-4 sm:px-7">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-trace-muted" />
                <div>
                  <p className="font-mono text-[10px] font-black tracking-[0.16em] text-trace-muted">APPLICATIONS CLOSED</p>
                  <p className="mt-1 text-xs leading-5 text-trace-muted">
                    This position closed on <span className="font-bold text-trace-ink">{formatDeadline(role.deadline)}</span>. Browse currently open roles below.
                  </p>
                </div>
              </div>
            )}

            <div className="grid gap-8 px-5 py-8 sm:px-7 md:grid-cols-[1fr_1fr] md:gap-12">
              <div>
                <p className="mb-5 text-sm leading-7 text-trace-muted">{role.intro}</p>
                <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">RESPONSIBILITIES</p>
                <ul className="mt-3 space-y-2.5">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-trace-ink">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-trace-teal" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-trace-teal">REQUIREMENTS</p>
                <ul className="mt-3 space-y-2.5">
                  {role.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-trace-ink">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-trace-orange" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-trace-ink/10 pt-6">
                  {!expired && (
                    <Link
                      href={`/careers/${role.slug}`}
                      className="inline-flex items-center gap-2 bg-trace-navy px-5 py-3 text-sm font-extrabold text-white transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
                    >
                      Apply Now <ArrowUpRight className="h-4 w-4 text-trace-mint" />
                    </Link>
                  )}
                  <Link
                    href={`/careers/${role.slug}`}
                    className="inline-flex items-center gap-2 border-2 border-trace-navy bg-white px-5 py-3 text-sm font-extrabold text-trace-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-trace-navy hover:text-white"
                  >
                    Open full page <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (!expired) {
    return <StarBorder color="#009CA6" speed="8s">{card}</StarBorder>;
  }
  return card;
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
            <div>
              <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-extrabold text-white/85 transition-colors hover:text-trace-mint">
                <ArrowLeft className="h-4 w-4 text-trace-mint" />Back to Careers
              </Link>
            </div>
            <div className="mt-8">
              <p className="section-label !text-trace-mint">{role.discipline.toUpperCase()}</p>
            </div>
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
                  {/* Summary card — reference tone: elevated like Apply but neutral header */}
                  <div className="overflow-hidden rounded-sm border border-trace-ink/10 bg-white shadow-[0_22px_48px_rgba(18,61,103,0.18)] ring-1 ring-trace-ink/5">
                    <div className="h-1 w-full bg-trace-navy/20" aria-hidden="true" />
                    <div className="flex items-center gap-2.5 border-b border-trace-ink/10 bg-trace-paper px-6 py-5 sm:px-7">
                      <FileText className="h-4 w-4 text-trace-teal" />
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

                  {/* Apply card — primary action: elevated with shadow, teal accent bar, dark navy header, rounded corners */}
                  <div className="relative mt-8 overflow-hidden rounded-sm border border-trace-navy/15 bg-white shadow-[0_22px_48px_rgba(18,61,103,0.18)] ring-1 ring-trace-teal/15">
                    <div className="h-1 w-full bg-trace-teal" aria-hidden="true" />
                    <div className={`flex items-center justify-between px-6 py-5 sm:px-7 ${expired ? "bg-trace-paper" : "bg-trace-navy text-white"}`}>
                      <div className="flex items-center gap-2.5">
                        {expired
                          ? <XCircle className="h-4 w-4 text-trace-muted" />
                          : <Send className="h-4 w-4 text-trace-mint" />}
                        <p className={`font-mono text-[10px] font-black tracking-[0.16em] ${expired ? "text-trace-muted" : "text-trace-mint"}`}>
                          {expired ? "APPLICATIONS CLOSED" : "APPLY FOR THIS POSITION"}
                        </p>
                      </div>
                      {!expired && (
                        <span className="inline-flex items-center gap-1 border border-trace-mint/40 bg-trace-mint/10 px-2.5 py-1 font-mono text-[9px] font-black tracking-[0.14em] text-trace-mint">
                          <CheckCircle2 className="h-3 w-3" />OPEN
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
  return (
    <Shell>
      <main>
        <PageHero
          label="CONTACT"
          title={<>Let's start a <span className="text-trace-teal">conversation.</span></>}
          description="Whether you are a government agency, development partner, or private company, TRACE is ready to understand the mandate behind your next move."
          tone="navy"
        />

        {/* ── Main grid: left info cards + right elevated form ── */}
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">

              {/* ── LEFT: Contact Us + Our Office + Find Us info cards ── */}
              <div className="space-y-5">
                {/* Contact Us card */}
                <SectionReveal>
                  <div className="relative overflow-hidden rounded-2xl bg-white p-7 shadow-[0_12px_32px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/5 sm:p-8">
                    <span className="absolute left-0 top-0 h-full w-1 bg-trace-teal" aria-hidden="true" />
                    <div className="flex items-center gap-3 pl-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-trace-teal/12 text-trace-teal">
                        <Phone className="h-4 w-4" />
                      </span>
                      <h2 className="font-display text-xl font-extrabold tracking-[-0.03em] text-trace-ink">Contact Us</h2>
                    </div>
                    <p className="mt-4 pl-3 text-sm leading-6 text-trace-muted">Reach the TRACE team directly for new mandates, partnership opportunities, or press enquiries.</p>
                    <div className="mt-6 space-y-4 pl-3">
                      <a href={`tel:${contact.phone}`} className="group flex items-start gap-3">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-trace-orange" />
                        <span>
                          <strong className="block text-sm text-trace-ink transition-colors group-hover:text-trace-teal">{contact.phone}</strong>
                          <span className="mt-0.5 block text-xs text-trace-muted">Head Office — Dhaka</span>
                        </span>
                      </a>
                      <a href={`mailto:${contact.email}`} className="group flex items-start gap-3">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-trace-orange" />
                        <span>
                          <strong className="block text-sm text-trace-ink transition-colors group-hover:text-trace-teal">{contact.email}</strong>
                          <span className="mt-0.5 block text-xs text-trace-muted">General enquiries</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </SectionReveal>

                {/* Our Office card */}
                <SectionReveal delay={0.06}>
                  <div className="relative overflow-hidden rounded-2xl bg-white p-7 shadow-[0_12px_32px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/5 sm:p-8">
                    <span className="absolute left-0 top-0 h-full w-1 bg-trace-navy" aria-hidden="true" />
                    <div className="flex items-center gap-3 pl-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-trace-navy/10 text-trace-navy">
                        <Briefcase className="h-4 w-4" />
                      </span>
                      <h2 className="font-display text-xl font-extrabold tracking-[-0.03em] text-trace-ink">Our Office</h2>
                    </div>
                    <div className="mt-5 space-y-3 pl-3">
                      <p className="text-sm font-semibold leading-6 text-trace-ink">{contact.address}</p>
                      <div className="flex items-center gap-2 border-t border-trace-ink/8 pt-3">
                        <Clock className="h-3.5 w-3.5 text-trace-teal" />
                        <p className="font-mono text-[11px] font-bold tracking-[0.14em] text-trace-muted">{contact.hours.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                </SectionReveal>

                {/* Find Us card — anchor to map at bottom */}
                <SectionReveal delay={0.1}>
                  <a href="#find-us-map" className="group relative block overflow-hidden rounded-2xl bg-trace-ink p-7 text-white shadow-[0_14px_36px_rgba(7,27,43,0.18)] ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(7,27,43,0.26)] sm:p-8">
                    <span className="absolute left-0 top-0 h-full w-1 bg-trace-orange" aria-hidden="true" />
                    <div className="flex items-center gap-3 pl-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-trace-mint">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <h2 className="font-display text-xl font-extrabold tracking-[-0.03em] text-white">Find Us</h2>
                    </div>
                    <p className="mt-4 pl-3 text-sm leading-6 text-white/72">Our Dhaka office is in Mohakhali DOHS. Jump down to the map for directions.</p>
                    <span className="mt-5 inline-flex items-center gap-2 pl-3 font-mono text-[10px] font-bold tracking-[0.16em] text-trace-mint transition-colors group-hover:text-white">
                      VIEW ON MAP <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                </SectionReveal>
              </div>

              {/* ── RIGHT: Elevated contact form ── */}
              <SectionReveal delay={0.12}>
                <form onSubmit={submit} className="relative overflow-hidden rounded-2xl bg-white p-7 shadow-[0_28px_70px_rgba(7,27,43,0.18),0_8px_20px_rgba(7,27,43,0.08)] ring-1 ring-trace-ink/5 sm:p-10">
                  {/* Teal → mint top accent */}
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-trace-teal via-trace-mint to-trace-teal" aria-hidden="true" />
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid min-h-[420px] place-items-center text-center"
                      >
                        <div>
                          <CheckCircle2 className="mx-auto h-14 w-14 text-trace-teal" />
                          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink sm:text-4xl">Message received.</h2>
                          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-trace-muted">Thank you for outlining your mandate. The TRACE team will respond within one business day.</p>
                          <button onClick={() => setSent(false)} type="button" className="mt-7 text-sm font-extrabold text-trace-teal transition-colors hover:text-trace-navy">
                            Send another message
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div>
                          <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-trace-teal">SEND US A MESSAGE</p>
                          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.045em] text-trace-ink sm:text-3xl">Tell us about your mandate.</h2>
                          <p className="mt-3 text-sm leading-6 text-trace-muted">Required fields are marked with <span className="font-bold text-trace-orange">*</span>.</p>
                        </div>

                        <div className="mt-7 grid gap-5 sm:grid-cols-2">
                          {([
                            ["First name", "firstName"],
                            ["Last name", "lastName"],
                            ["Email address", "email"],
                            ["Mobile number", "phone"],
                            ["Organization", "organization"],
                            ["Subject / service area", "subject"],
                          ] as const).map(([label, field]) => (
                            <label key={field} className="grid gap-2">
                              <span className="text-xs font-bold text-trace-ink">
                                {label}
                                {["firstName", "lastName", "email", "phone", "subject"].includes(field) && (
                                  <span className="text-trace-orange"> *</span>
                                )}
                              </span>
                              <input
                                required={["firstName", "lastName", "email", "phone", "subject"].includes(field)}
                                name={field}
                                type={field === "email" ? "email" : "text"}
                                defaultValue={field === "subject" ? initialSubject : ""}
                                className="rounded-lg border border-trace-ink/12 bg-trace-paper/60 px-3.5 py-3 text-sm outline-none transition-all focus:border-trace-teal focus:bg-white focus:ring-2 focus:ring-trace-teal/15"
                              />
                            </label>
                          ))}
                        </div>

                        <label className="mt-5 grid gap-2">
                          <span className="text-xs font-bold text-trace-ink">
                            Tell us about your project or challenge <span className="text-trace-orange">*</span>
                          </span>
                          <textarea
                            required
                            name="message"
                            rows={6}
                            className="resize-none rounded-lg border border-trace-ink/12 bg-trace-paper/60 px-3.5 py-3 text-sm outline-none transition-all focus:border-trace-teal focus:bg-white focus:ring-2 focus:ring-trace-teal/15"
                          />
                        </label>

                        <div className="mt-7">
                          <button
                            type="submit"
                            className="group inline-flex items-center gap-2.5 rounded-xl bg-trace-orange px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_32px_rgba(244,122,32,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(244,122,32,0.55)]"
                          >
                            Send message
                            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </button>
                        </div>

                        <p className="mt-5 text-xs leading-5 text-trace-muted">
                          By submitting this form, you agree to the Privacy Policy. TRACE does not share your submitted data.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* ── Map at the bottom ── */}
        <section id="find-us-map" className="bg-trace-paper py-16 sm:py-20">
          <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-6 w-1 rounded-full bg-trace-orange" aria-hidden="true" />
                  <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-trace-teal">FIND US</p>
                </div>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.055em] text-trace-ink sm:text-4xl">Visit our Dhaka office.</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-trace-muted">{contact.address}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-lg border border-trace-ink/15 bg-white px-5 py-3 text-sm font-extrabold text-trace-ink transition-all hover:-translate-y-0.5 hover:border-trace-teal hover:text-trace-teal hover:shadow-md sm:inline-flex"
              >
                Open in Google Maps <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-[0_14px_40px_rgba(7,27,43,0.1)] ring-1 ring-trace-ink/5">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`}
                title="TRACE Consulting office location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[420px] w-full border-0 sm:h-[480px]"
              />
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function NotFoundEntity() {
  return <Shell><main><PageHero label="NOT FOUND" title={<>This page is still <span className="text-trace-teal">taking shape.</span></>} description="The requested TRACE content record could not be found in the current structured portfolio." /><section className="py-20"><div className="mx-auto max-w-[1120px] px-5 lg:px-10"><Link href="/" className="inline-flex items-center gap-2 text-sm font-extrabold text-trace-ink"><ArrowLeft className="h-4 w-4 text-trace-orange" />Return home</Link></div></section></main></Shell>;
}
