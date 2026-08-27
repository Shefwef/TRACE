/** TRACE accessible light foundation: transparent-to-solid header preserves the full wordmark and prioritizes high-contrast, calm navigation. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { ASSETS, navItems } from "@/data/traceData";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const darkHeader = overlay && !scrolled && !open;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${darkHeader ? "text-white" : "border-b border-trace-ink/8 bg-trace-paper/92 text-trace-ink backdrop-blur-xl"}`}>
      <div className="mx-auto flex h-[78px] max-w-[1480px] items-center justify-between px-5 lg:px-10">
        <Link href="/" className="group flex items-center" aria-label="TRACE Consulting home">
          <img src={darkHeader ? ASSETS.logoWhite : ASSETS.logoNavy} alt="TRACE Consulting" className="h-9 w-auto max-w-[184px] object-contain object-left sm:h-10 sm:max-w-[204px]" />
        </Link>

        <nav className="hidden items-center gap-4 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`text-[12px] font-bold transition-colors hover:text-trace-teal ${location === item.href ? "text-trace-teal" : darkHeader ? "text-white/84" : "text-trace-muted"}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className={`hidden items-center gap-2 px-4 py-3 text-[12px] font-extrabold transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] sm:flex ${darkHeader ? "border border-white/65 bg-white/95 text-trace-navy shadow-[0_8px_26px_rgba(8,36,64,0.16)] hover:bg-white" : "bg-trace-navy text-white hover:bg-trace-ink"}`}>
            Contact Us <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className={`grid h-10 w-10 place-items-center border xl:hidden ${darkHeader ? "border-white/25 bg-white/10" : "border-trace-ink/12 bg-white"}`}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? {} : { opacity: 0, y: -10 }} transition={{ duration: 0.22 }} className="border-t border-trace-ink/8 bg-trace-paper px-5 pb-7 pt-5 xl:hidden">
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-trace-ink/8 py-4 font-display text-xl font-extrabold tracking-[-0.04em]">
                  {item.label}<ArrowUpRight className="h-4 w-4 text-trace-teal" />
                </Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 bg-trace-navy px-5 py-4 text-center text-sm font-extrabold text-white">Contact Us</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
