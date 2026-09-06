/** GlassBlogCard — TRACE project card: rounded-2xl light card, full-image top, badge overlay, ShineBorder. */
import { Badge } from "@/components/ui/badge";
import { ShineBorder } from "@/components/ui/ShineBorder";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "wouter";
import { type Project, services } from "@/data/traceData";

const serviceColors: Record<string, string> = {
  "trade-facilitation":       "#009CA6",
  "policy-regulatory-reform": "#123D67",
  "laboratory-improvement":   "#F47A20",
  "market-access-sps":        "#64748b",
  "technology-solutions":     "#009CA6",
  "research-innovation":      "#123D67",
};

export type ProjectCardProps = {
  project: Project;
  image: string;
  primaryServiceSlug?: string;
  className?: string;
};

export function ProjectCard({ project, image, primaryServiceSlug, className }: ProjectCardProps) {
  const slug = primaryServiceSlug ?? project.serviceSlugs[0] ?? "";
  const primaryService = services.find((s) => s.slug === slug);
  const categoryColor = serviceColors[slug] ?? "#009CA6";
  const year = project.period.split("–")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full h-full", className)}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        {/* Light rounded card */}
        <div className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_rgba(7,27,43,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(7,27,43,0.16)]">
          <ShineBorder shineColor={["#009CA6", "#D7F3F0", "#123D67"]} duration={10} borderWidth={1.5} />

          {/* Full-width image — entire top portion */}
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <motion.img
              src={image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-trace-ink/60 via-trace-ink/10 to-transparent" />

            {/* Year badge — top right */}
            <span className="absolute right-4 top-4 bg-trace-orange px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.14em] text-white">
              {year}
            </span>

            {/* Service tag badges — bottom of image */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {project.serviceSlugs.map((s) => {
                const svc = services.find((sv) => sv.slug === s);
                return svc ? (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="rounded-full border-0 bg-trace-ink/55 px-3 py-1 font-mono text-[9px] font-bold tracking-[0.08em] text-white/90 backdrop-blur-sm hover:bg-trace-ink/75"
                  >
                    {svc.title}
                  </Badge>
                ) : null;
              })}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-trace-ink/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-trace-ink shadow-lg"
              >
                <ArrowUpRight className="h-4 w-4 text-trace-teal" />
                View Project
              </motion.span>
            </div>
          </div>

          {/* Light content area */}
          <div className="flex flex-col gap-3 p-5 sm:p-6">
            {/* Service category label */}
            {primaryService && (
              <p className="font-mono text-[10px] font-bold tracking-[0.18em]" style={{ color: categoryColor }}>
                {primaryService.strapline.toUpperCase()}
              </p>
            )}

            {/* Title */}
            <h3 className="font-display text-xl font-extrabold leading-[1.1] tracking-[-0.04em] text-trace-ink transition-colors group-hover:text-trace-teal sm:text-2xl">
              {project.title}
            </h3>

            {/* Summary */}
            <p className="line-clamp-2 text-sm leading-6 text-trace-muted">
              {project.summary}
            </p>

            {/* Footer — client + period left, status right */}
            <div className="flex items-center justify-between border-t border-trace-ink/8 pt-3">
              <div className="flex flex-col text-xs">
                <span className="font-bold text-trace-ink">{project.client}</span>
                <span className="text-trace-muted">{project.period}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-trace-muted" />
                <span
                  className={`font-mono text-[9px] font-bold tracking-[0.1em] ${
                    project.status === "Ongoing" ? "text-trace-teal" : "text-trace-muted"
                  }`}
                >
                  {project.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
