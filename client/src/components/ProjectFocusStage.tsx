/** TRACE Civic Signal Field: five active delivery records in a direct-navigation GSAP accordion gallery. */
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { ASSETS, projects, services, type Project } from "@/data/traceData";
import { AccordionGallery } from "@/components/AccordionGallery";

const projectImages: Record<Project["theme"], string> = { navy: ASSETS.heroInteroperability, teal: ASSETS.heroLaboratory, sand: ASSETS.heroPolicy };

export function ProjectFocusStage() {
  const featured = projects.slice(0, 5).map((project) => ({
    image: projectImages[project.theme],
    label: project.title,
    category: services.find((service) => service.slug === project.serviceSlugs[0])?.title ?? "TRACE PROJECT",
    client: project.client,
    summary: project.summary,
    href: `/projects/${project.slug}`,
    alt: `TRACE project: ${project.title}`,
  }));
  return <section className="overflow-hidden bg-[#F6FAFC] py-16 sm:py-[4.5rem]" aria-labelledby="featured-projects-title"><div className="mx-auto max-w-[1380px] px-5 lg:px-10"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="section-label">FEATURED PROJECTS</p><h2 id="featured-projects-title" className="mt-4 font-display text-4xl font-extrabold tracking-[-0.065em] text-trace-ink sm:text-5xl">The work, in <span className="text-trace-teal">motion.</span></h2><p className="mt-4 max-w-2xl text-sm leading-6 text-trace-muted">Follow five active mandates through evidence, delivery, and direct access to each complete project record.</p></div><Link href="/projects" className="inline-flex items-center gap-2 border-b border-trace-teal pb-2 text-sm font-extrabold text-trace-ink">All projects <ArrowUpRight className="h-4 w-4 text-trace-teal" /></Link></div><div className="mt-8"><AccordionGallery items={featured} defaultIndex={0} /></div></div></section>;
}
