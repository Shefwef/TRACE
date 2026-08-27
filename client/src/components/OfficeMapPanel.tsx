/** Civic Signal Field component: expandable office location using OpenStreetMap’s public embed, with no Google Maps API key or billing profile. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, MapPin, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { contact } from "@/data/traceData";

const latitude = "23.784148";
const longitude = "90.392863";
const officeAddress = "Level 2, Plot 285, Road 19/C, Mohakhali New DOHS, Dhaka-1206, Bangladesh";
const defaultEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=90.3869%2C23.7781%2C90.3989%2C23.7901&layer=mapnik&marker=${latitude}%2C${longitude}`;
const embedUrl = import.meta.env.VITE_OFFICE_MAP_EMBED_URL || defaultEmbedUrl;
const directionsUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`;

export function OfficeMapPanel() {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  return (
    <section className="overflow-hidden border-t border-trace-ink/8 bg-white py-12 sm:py-16" aria-labelledby="office-map-title">
      <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="border-l-2 border-trace-orange py-2 pl-6 sm:pl-8">
            <p className="section-label">TRACE IN DHAKA</p>
            <h2 id="office-map-title" className="mt-4 max-w-lg font-display text-4xl font-extrabold leading-[0.94] tracking-[-0.065em] text-trace-ink sm:text-5xl">Find the room where the work connects.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-trace-muted">{contact.address}</p>
            <p className="mt-3 text-sm font-bold text-trace-muted">{contact.hours}</p>
            <a href={directionsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border-b border-trace-orange pb-2 text-sm font-extrabold text-trace-ink">Open location <ExternalLink className="h-4 w-4 text-trace-orange" /></a>
          </div>
          <button onClick={() => setExpanded((state) => !state)} aria-expanded={expanded} aria-controls="trace-office-map" className="group relative min-h-[210px] overflow-hidden bg-trace-ink text-left outline-offset-4 sm:min-h-[240px]">
            <iframe title="TRACE Consulting office location preview" src={embedUrl} loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full opacity-65 grayscale-[0.2] contrast-110" />
            <div className="absolute inset-0 bg-gradient-to-r from-trace-ink/88 via-trace-ink/35 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5 sm:bottom-7 sm:left-7 sm:right-7">
              <div><span className="inline-grid h-10 w-10 place-items-center rounded-full bg-trace-orange text-white"><MapPin className="h-4 w-4" /></span><p className="mt-3 font-display text-xl font-extrabold tracking-[-0.05em] text-white">Mohakhali New DOHS</p><p className="mt-1.5 text-xs text-white/65">Click to {expanded ? "collapse" : "expand the map"}</p></div>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">{expanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</span>
            </div>
          </button>
        </div>
        <p className="mt-2 text-right text-[10px] text-trace-muted">Map data © <a className="underline" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a></p>
        <AnimatePresence initial={false}>
          {expanded && <motion.div id="trace-office-map" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "min(72vh, 680px)", opacity: 1 }} exit={reduceMotion ? {} : { height: 0, opacity: 0 }} transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }} className="overflow-hidden border-x border-b border-trace-ink/10 bg-white"><iframe title="TRACE Consulting office location" src={embedUrl} loading="lazy" className="h-full min-h-[420px] w-full" /></motion.div>}
        </AnimatePresence>
      </div>
    </section>
  );
}
