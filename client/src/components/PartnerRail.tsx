/** Civic Signal Field component: a smooth, pausable right-to-left rail of supplied TRACE partner logos. */
import { useReducedMotion } from "framer-motion";
import { partnerLogos } from "@/data/traceData";

export function PartnerRail() {
  const reduceMotion = useReducedMotion();
  return <section className="overflow-hidden bg-white py-20 sm:py-24" aria-labelledby="partner-rail-title"><div className="mx-auto max-w-[1480px] px-5 lg:px-10"><div className="flex flex-col gap-4 border-b border-trace-ink/10 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="section-label">OUR PARTNERS</p><h2 id="partner-rail-title" className="mt-4 font-display text-4xl font-extrabold tracking-[-0.06em] text-trace-ink">Connected to the systems that matter.</h2></div><p className="max-w-md text-sm leading-6 text-trace-muted">Institutional, technical, and delivery partners connected to TRACE mandates.</p></div></div><div className="partner-marquee mt-11 overflow-hidden" data-static={reduceMotion ? "true" : undefined}><div className="partner-marquee-track">{[0, 1, 2].map((copy) => <div key={copy} className="partner-marquee-set" aria-hidden={copy === 0 ? undefined : true}>{partnerLogos.map((partner) => <div key={`${partner.name}-${copy}`} className="partner-mark"><img src={partner.src} alt={copy === 0 ? partner.name : ""} loading="eager" decoding="async" className="h-[62px] w-auto max-w-[148px] object-contain mix-blend-multiply" /></div>)}</div>)}</div></div></section>;
}
