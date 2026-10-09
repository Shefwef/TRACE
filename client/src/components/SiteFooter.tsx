/** TRACE brand foundation: deep-navy footer uses the supplied full white wordmark for high-contrast institutional branding. */
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import { ASSETS, contact, navItems } from "@/data/traceData";

export function SiteFooter() {
  return (
    <footer className="bg-trace-ink text-white">
      <div className="mx-auto max-w-[1480px] px-5 pb-7 pt-14 lg:px-10">
        <div className="grid gap-8 border-b border-white/15 pb-11 lg:grid-cols-[1.45fr_0.75fr_0.9fr]">
          <div>
            <img src={ASSETS.logoWhite} alt="TRACE Consulting" className="h-9 w-auto max-w-[200px] object-contain object-left" />
            <h2 className="mt-5 max-w-xl font-display text-3xl font-extrabold leading-[0.98] tracking-[-0.065em] sm:text-4xl">Bring a complex mandate into motion.</h2>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 border-b border-trace-teal pb-1.5 text-sm font-extrabold text-trace-teal">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[0.17em] text-trace-mint">EXPLORE</p>
            <div className="mt-3.5 grid gap-2">{navItems.map((item) => <Link key={item.href} href={item.href} className="text-sm font-bold text-white/72 transition-colors hover:text-white">{item.label}</Link>)}</div>
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[0.17em] text-trace-mint">CONTACT</p>
            <a href={`tel:${contact.phone}`} className="mt-3.5 flex items-center gap-3 text-sm font-bold text-white/82"><Phone className="h-4 w-4 text-trace-teal" />{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="mt-3 flex items-center gap-3 text-sm font-bold text-white/82"><Mail className="h-4 w-4 text-trace-teal" />{contact.email}</a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/58">{contact.address}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 pt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/40 sm:flex-row"><span>© 2026 TRACE Consulting</span><span>Policy · Trade · Technology</span></div>
      </div>
    </footer>
  );
}
