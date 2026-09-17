'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import { build } from '@/lib/data/site';

/**
 * What I Build
 * Continues the dark cinematic environment. A quiet "Learning became building."
 * beat bridges from Education, then the four core engineering areas reveal as
 * large editorial rows over a faint technical grid (not a grid of cards).
 */
export default function WhatIBuild() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Gentle parallax on the faint grid for depth.
  const gridY = useTransform(scrollYProgress, [0, 1], [prefersReduced ? 0 : -40, prefersReduced ? 0 : 40]);

  return (
    <section
      id="build"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0b0b0d] text-[#f5f3ee]"
    >
      {/* Fine technical grid */}
      <motion.div
        aria-hidden
        style={{
          y: gridY,
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '84px 84px',
        }}
        className="pointer-events-none absolute inset-0 -top-20 opacity-[0.05]"
      />

      {/* Bridge beat from Education */}
      <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-center px-6 pt-28 md:pt-40">
        <Reveal className="text-center">
          <p className="font-display text-xl font-medium text-[#8f8f97] md:text-3xl">
            {build.bridge}
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-32 pt-20 md:px-10 md:pb-44 md:pt-28">
        <Reveal as="p" className="about-eyebrow">
          <span className="mr-3 inline-block h-px w-8 align-middle bg-[#86a5cc]" />
          {build.eyebrow}
        </Reveal>

        <Reveal
          as="h2"
          delay={0.05}
          depth
          className="mt-8 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
        >
          {build.statement}
        </Reveal>

        <Reveal
          as="p"
          delay={0.12}
          className="mt-8 max-w-3xl text-base leading-relaxed text-[#8f8f97] md:text-lg"
        >
          {build.supporting}
        </Reveal>

        {/* Core areas as large system rows */}
        <ul className="mt-16 border-b border-white/10 md:mt-24">
          {build.areas.map((area, i) => (
            <li key={area.index}>
              <Reveal delay={0.06 * i}>
                <div className="group border-t border-white/10 py-10 transition-colors duration-300 hover:bg-white/[0.025] md:py-14">
                  <div className="md:grid md:grid-cols-[72px_minmax(0,1fr)_minmax(0,1.15fr)] md:items-baseline md:gap-10">
                    <span className="block font-display text-sm font-semibold tracking-widest text-[#86a5cc]">
                      {area.index}
                    </span>
                    <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-[#f5f3ee] transition-transform duration-300 group-hover:translate-x-1 md:mt-0 md:text-5xl">
                      {area.title}
                    </h3>
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 md:mt-0 md:justify-end">
                      {area.tags.map((t) => (
                        <li
                          key={t}
                          className="text-[13px] uppercase tracking-[0.12em] text-[#9a9aa2] transition-colors duration-300 group-hover:text-[#d8d6cf] md:text-sm"
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
      </div>
    </section>
  );
}
