/** TRACE Civic Signal Field: five active delivery records in an Apple Cards-style horizontal carousel with keyboard/touch/scroll navigation. */
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ASSETS, projects, services, type Project } from "@/data/traceData";

const projectImages: Record<Project["theme"], string> = { navy: ASSETS.heroInteroperability, teal: ASSETS.heroLaboratory, sand: ASSETS.heroPolicy };

type Slide = {
  image: string;
  label: string;
  category: string;
  client: string;
  period: string;
  status: string;
  summary: string;
  href: string;
  alt: string;
};

function ProjectsCarousel({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const reduceMotion = useReducedMotion();

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-project-card]"));
    if (!cards.length) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDelta = Infinity;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const delta = Math.abs(cardCenter - trackCenter);
      if (delta < nearestDelta) { nearest = index; nearestDelta = delta; }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateEdges();
    track.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-project-card]")[index];
    if (!card) return;
    const target = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const step = (delta: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, active + delta));
    scrollToIndex(next);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured TRACE projects"
        className="hide-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto pb-5 pt-2 sm:gap-6 sm:scroll-px-8 lg:-mx-10 lg:scroll-px-10"
        style={{ scrollBehavior: reduceMotion ? "auto" : "smooth" }}
      >
        <div className="shrink-0" aria-hidden="true" style={{ width: "calc(max(1.25rem, (100% - min(100%, 1300px)) / 2 + 1.25rem))" }} />
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <motion.article
              key={slide.href}
              data-project-card
              aria-current={isActive ? "true" : undefined}
              initial={false}
              animate={reduceMotion ? {} : { scale: isActive ? 1 : 0.96, opacity: isActive ? 1 : 0.72 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="group relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden border border-trace-ink/10 bg-white shadow-[0_18px_44px_rgba(18,61,103,0.10)] sm:w-[560px] lg:w-[620px]"
            >
              <Link href={slide.href} className="relative block aspect-[16/10] overflow-hidden bg-trace-navy" aria-label={`Open ${slide.label} project record`}>
                <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]" />
                <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/78 via-trace-ink/24 to-transparent" />
                <span className="absolute left-5 top-5 bg-white/94 px-3 py-1.5 font-mono text-[10px] font-black tracking-[0.14em] text-trace-navy shadow-sm">{slide.category.toUpperCase()}</span>
                <span className="absolute right-5 top-5 border border-white/50 bg-trace-navy/70 px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.14em] text-trace-mint">{slide.status.toUpperCase()}</span>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="font-mono text-[10px] font-bold tracking-[0.15em] text-trace-mint">{slide.client.toUpperCase()}</p>
                    <h3 className="mt-2 max-w-md font-display text-2xl font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-3xl">{slide.label}</h3>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center bg-white text-trace-navy transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                <p className="text-sm leading-6 text-trace-muted">{slide.summary}</p>
                <div className="mt-auto flex items-center justify-between border-t border-trace-ink/8 pt-4 text-xs font-bold text-trace-muted">
                  <span>{slide.period}</span>
                  <Link href={slide.href} className="inline-flex items-center gap-1.5 text-trace-navy hover:text-trace-teal">View project record <ArrowRight className="h-3.5 w-3.5 text-trace-teal" /></Link>
                </div>
              </div>
            </motion.article>
          );
        })}
        <div className="shrink-0" aria-hidden="true" style={{ width: "calc(max(1.25rem, (100% - min(100%, 1300px)) / 2 + 1.25rem))" }} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Featured project selector">
          {slides.map((slide, index) => (
            <button
              key={slide.href}
              role="tab"
              type="button"
              aria-selected={index === active}
              aria-label={`Go to ${slide.label}`}
              onClick={() => scrollToIndex(index)}
              className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-trace-teal" : "w-2 bg-trace-ink/18 hover:bg-trace-ink/40"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous project" disabled={!canPrev} onClick={() => step(-1)} className="grid h-10 w-10 place-items-center border border-trace-ink/12 bg-white text-trace-navy transition-colors hover:border-trace-teal hover:text-trace-teal disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-trace-ink/12 disabled:hover:text-trace-navy"><ArrowLeft className="h-4 w-4" /></button>
          <button type="button" aria-label="Next project" disabled={!canNext} onClick={() => step(1)} className="grid h-10 w-10 place-items-center border border-trace-ink/12 bg-white text-trace-navy transition-colors hover:border-trace-teal hover:text-trace-teal disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-trace-ink/12 disabled:hover:text-trace-navy"><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}

export function ProjectFocusStage() {
  const slides: Slide[] = projects.slice(0, 5).map((project) => ({
    image: projectImages[project.theme],
    label: project.title,
    category: services.find((service) => service.slug === project.serviceSlugs[0])?.title ?? "TRACE PROJECT",
    client: project.client,
    period: project.period,
    status: project.status,
    summary: project.summary,
    href: `/projects/${project.slug}`,
    alt: `TRACE project: ${project.title}`,
  }));
  return (
    <section className="overflow-hidden bg-[#F6FAFC] py-16 sm:py-[4.5rem]" aria-labelledby="featured-projects-title">
      <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="section-label">FEATURED PROJECTS</p>
            <h2 id="featured-projects-title" className="mt-4 font-display text-4xl font-extrabold tracking-[-0.065em] text-trace-ink sm:text-5xl">The work, in <span className="text-trace-teal">motion.</span></h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-trace-muted">Follow five active mandates through evidence, delivery, and direct access to each complete project record.</p>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 border-b border-trace-teal pb-2 text-sm font-extrabold text-trace-ink">All projects <ArrowUpRight className="h-4 w-4 text-trace-teal" /></Link>
        </div>
        <div className="mt-8">
          <ProjectsCarousel slides={slides} />
        </div>
      </div>
    </section>
  );
}
