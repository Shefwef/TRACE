/** TRACE Civic Signal Field: a five-panel GSAP evidence gallery with muted supporting panels, focused project detail, and direct delivery-record navigation. */
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";

export type AccordionGalleryItem = {
  image: string;
  label: string;
  category: string;
  client: string;
  summary: string;
  href: string;
  alt: string;
};

type AccordionGalleryProps = {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
};

export function AccordionGallery({ items, defaultIndex = 0 }: AccordionGalleryProps) {
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), items.length - 1));
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);
  const detailRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animatePanels = useCallback((next: number, shouldAnimate: boolean) => {
    const count = items.length;
    const grow = count > 1 ? 5.6 : 1;
    const duration = shouldAnimate && !reduceMotion ? 0.68 : 0;
    const ease = "power2.out";

    panelRefs.current.forEach((panel, index) => {
      if (!panel) return;
      const isActive = index === next;
      gsap.to(panel, {
        flexGrow: isActive ? grow : 1,
        rotateY: isActive ? 0 : index < next ? 3 : -3,
        duration,
        ease,
        overwrite: "auto",
      });
      const image = imageRefs.current[index];
      if (image) {
        gsap.to(image, {
          filter: isActive ? "grayscale(0) saturate(1)" : "grayscale(1) saturate(0.72)",
          scale: isActive ? 1.02 : 1,
          duration,
          ease,
          overwrite: "auto",
        });
      }
      const detail = detailRefs.current[index];
      if (detail) {
        gsap.to(detail, {
          autoAlpha: isActive ? 1 : 0,
          y: isActive ? 0 : 12,
          duration: duration * 0.85,
          delay: isActive ? 0.12 : 0,
          ease,
          overwrite: "auto",
        });
      }
    });
  }, [items.length, reduceMotion]);

  useEffect(() => {
    animatePanels(active, true);
  }, [active, animatePanels]);
  useEffect(() => {
    animatePanels(active, false);
  }, [animatePanels]);

  useEffect(() => {
    if (paused || reduceMotion || items.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % items.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, items.length, cycleKey]);

  const focusPanel = (index: number, manual = true) => {
    setActive((current) => (current === index ? current : index));
    if (manual) setCycleKey((current) => current + 1);
  };
  const onKeyDown = (index: number, event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); focusPanel((index + 1) % items.length); }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); focusPanel((index - 1 + items.length) % items.length); }
  };

  return <div ref={rootRef} className="trace-accordion-gallery" role="list" aria-label="Featured project gallery" onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); setCycleKey((current) => current + 1); }} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!rootRef.current?.contains(event.relatedTarget as Node | null)) { setPaused(false); setCycleKey((current) => current + 1); } }}>
    {items.map((item, index) => {
      const isActive = index === active;
      return <div key={item.href} ref={(element) => { panelRefs.current[index] = element; }} role="listitem" tabIndex={0} aria-current={isActive ? "true" : undefined} onMouseEnter={() => focusPanel(index)} onFocus={() => focusPanel(index)} onClick={() => focusPanel(index)} onKeyDown={(event) => onKeyDown(index, event)} className={`trace-accordion-panel ${isActive ? "is-active" : ""}`}>
        <img ref={(element) => { imageRefs.current[index] = element; }} src={item.image} alt={item.alt} className="trace-accordion-media" />
        <div className="trace-accordion-overlay" />
        <div className="trace-accordion-rail"><span>{String(index + 1).padStart(2, "0")}</span><span className="trace-accordion-dot" /></div>
        <div className="trace-accordion-caption">
          <p className="trace-accordion-category">{item.category}</p>
          <h3>{item.label}</h3>
          <p className="trace-accordion-client">{item.client}</p>
          <div ref={(element) => { detailRefs.current[index] = element; }} className="trace-accordion-detail">
            <p>{item.summary}</p>
            <Link href={item.href} onClick={(event) => event.stopPropagation()} className="trace-accordion-action">View project details <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>;
    })}
  </div>;
}
