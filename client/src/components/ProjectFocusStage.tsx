/** TRACE Civic Signal Field: featured project delivery records in a GlassBlogCard grid, 3 per row, dark section. */
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { ASSETS, projects } from "@/data/traceData";
import { ProjectCard } from "@/components/ui/glass-blog-card-shadcnui";
import { SectionReveal } from "@/components/SectionReveal";

const projectMediaMap: Record<string, string> = {
  "national-tariff-modernization": ASSETS.heroTrade,
  "bsti-textile-testing":          ASSETS.heroLaboratory,
  "animal-health-reform":          ASSETS.heroColdChain,
  "bafisa-intelligence":           ASSETS.heroInteroperability,
  "prtc-accreditation":            ASSETS.heroLaboratory,
  "export-compliance":             ASSETS.heroColdChain,
};

export function ProjectFocusStage() {
  return (
    <section className="bg-[#F6FAFC] py-16 sm:py-[4.5rem]" aria-labelledby="featured-projects-title">
      <div className="mx-auto max-w-[1380px] px-5 lg:px-10">

        {/* Header row */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionReveal>
            <p className="section-label">FEATURED PROJECTS</p>
            <h2 id="featured-projects-title" className="mt-4 font-display text-4xl font-extrabold tracking-[-0.065em] text-trace-ink sm:text-5xl">
              The work, in <span className="text-trace-teal">motion.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-trace-muted">
              Follow active mandates through evidence, delivery, and direct access to each complete project record.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.06}>
            <Link href="/projects" className="inline-flex items-center gap-2 border-b border-trace-teal pb-2 text-sm font-extrabold text-trace-ink">
              All projects <ArrowUpRight className="h-4 w-4 text-trace-teal" />
            </Link>
          </SectionReveal>
        </div>

        {/* 3-column card grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <SectionReveal key={project.slug} delay={index * 0.05} className="h-full">
              <ProjectCard
                project={project}
                image={projectMediaMap[project.slug] ?? ASSETS.heroPolicy}
              />
            </SectionReveal>
          ))}
        </div>

        {/* Footer rail */}
        <div className="mt-7 flex items-center justify-between border-t border-trace-ink/10 pt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-trace-muted">
          <span>{projects.length} DELIVERY RECORDS</span>
          <Link href="/projects" className="inline-flex items-center gap-2 text-trace-navy hover:text-trace-teal transition-colors">
            Explore all projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
