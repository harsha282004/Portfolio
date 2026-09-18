'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { build } from '@/lib/data/site';

/**
 * What I Build — SYSTEM CAPABILITIES
 * The four real engineering areas presented as selectable system modules:
 * a module index, the area name, and its actual technology tags. Hovering or
 * focusing a module lights it up; nothing is ranked or scored.
 */
export default function WhatIBuild() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [-40, 40]
  );

  return (
    <div ref={sectionRef}>
      <SectionShell id="build" surface="panel" grid={false} glow="center">
        {/* Parallax technical grid */}
        <motion.div
          aria-hidden
          style={{ y: gridY }}
          className="pointer-events-none absolute -inset-y-24 inset-x-0 -z-10 hud-grid-accent"
        />

        {/* Bridge beat from the Journey Log */}
        <Reveal className="mb-12 text-center md:mb-16">
          <p className="font-display text-xl font-medium text-ink-dim md:text-3xl">
            {build.bridge}
          </p>
        </Reveal>

        <HudHeading
          index="03"
          label={build.eyebrow}
          heading={build.statement}
          supporting={build.supporting}
        />

        {/* Capability modules */}
        <ul className="mt-10 md:mt-14">
          {build.areas.map((area, i) => (
            <li key={area.index}>
              <Reveal delay={0.06 * i}>
                <div
                  tabIndex={0}
                  className="group relative border-t border-hud-line-strong py-7 outline-none transition-colors duration-300 last:border-b hover:bg-hud/[0.04] focus-visible:bg-hud/[0.06] md:py-10"
                >
                  {/* Active edge marker */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-hud shadow-[0_0_12px_var(--hud-glow)] transition-transform duration-500 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                  />

                  <div className="md:grid md:grid-cols-[84px_minmax(0,1fr)_minmax(0,1.15fr)] md:items-baseline md:gap-10">
                    <span className="font-hud text-sm font-semibold tracking-[0.2em] text-hud">
                      {area.index}
                    </span>

                    <h3 className="mt-3 flex items-center gap-3 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1 md:mt-0 md:text-5xl">
                      {area.title}
                      <ChevronRight
                        aria-hidden
                        className="h-5 w-5 flex-none -translate-x-2 text-hud opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                      />
                    </h3>

                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 md:mt-0 md:justify-end">
                      {area.tags.map((t) => (
                        <li
                          key={t}
                          className="font-hud text-[11px] uppercase tracking-[0.16em] text-ink-mute transition-colors duration-300 group-hover:text-hud-bright md:text-xs"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </SectionShell>
    </div>
  );
}
