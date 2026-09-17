'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import { experience } from '@/lib/data/site';

const ACCENT = '#3b5b7a';

/**
 * Experience
 * A light editorial career timeline that intentionally contrasts the dark
 * Technical Skills section above it. A faint rail runs the full height while
 * an accent line draws on scroll; each milestone reveals in a staggered
 * sequence. All content is always visible (accessible); hover only enhances.
 */
export default function Experience() {
  const railRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 78%', 'end 68%'],
  });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScaleY = prefersReduced ? 1 : drawn;

  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden bg-[#faf9f6] text-neutral-900"
    >
      {/* Dark Skills environment receding into the light editorial one */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[58vh]"
        style={{
          background:
            'linear-gradient(to bottom, #08080a 0%, rgba(8,8,10,0.5) 24%, rgba(250,249,246,0) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-40 pt-[42vh] md:px-10 md:pb-52">
        <Reveal
          as="p"
          className="flex items-center text-xs font-semibold uppercase tracking-[0.24em] text-[#3b5b7a]"
        >
          <span className="mr-3 inline-block h-px w-8 bg-[#3b5b7a]" />
          {experience.eyebrow}
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-8 font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-neutral-900"
        >
          {experience.heading}
        </Reveal>

        {/* Timeline */}
        <div ref={railRef} className="relative mt-20 md:mt-28">
          {/* Faint full-height rail */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-neutral-900/12 md:left-[9px]">
            <motion.div
              style={{ scaleY: lineScaleY }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#3b5b7a] to-[#7d97b3]"
            />
          </div>

          <ol className="space-y-28 md:space-y-40">
            {experience.items.map((item) => (
              <li
                key={item.id}
                className="group relative pl-12 md:grid md:grid-cols-[minmax(220px,300px)_1fr] md:gap-16 md:pl-24"
              >
                {/* Milestone dot */}
                <span className="absolute left-0 top-1.5 block h-4 w-4 rounded-full bg-[#3b5b7a] ring-8 ring-[#faf9f6]" />

                {/* Left column — index / period / duration */}
                <div className="md:pt-1">
                  <Reveal className="font-display text-sm font-semibold tracking-widest text-[#3b5b7a]">
                    {item.index}
                  </Reveal>
                  <Reveal
                    delay={0.06}
                    className="mt-4 text-sm font-medium text-neutral-500"
                  >
                    {item.period}
                  </Reveal>
                  <Reveal
                    delay={0.1}
                    className="mt-2 inline-flex items-center rounded-full border border-neutral-900/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600"
                  >
                    {item.duration}
                  </Reveal>
                </div>

                {/* Right column — company / role / detail */}
                <div className="mt-8 md:mt-0">
                  <Reveal
                    as="h3"
                    className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-900 transition-transform duration-300 group-hover:translate-x-1 md:text-5xl"
                  >
                    {item.company}
                  </Reveal>
                  <Reveal
                    as="p"
                    delay={0.08}
                    className="mt-3 text-base font-medium text-[#3b5b7a] md:text-lg"
                  >
                    {item.role}
                  </Reveal>

                  <div className="mt-7 max-w-2xl space-y-4">
                    {item.descriptions.map((d, i) => (
                      <Reveal
                        as="p"
                        key={i}
                        delay={0.14 + i * 0.06}
                        className="text-[15px] leading-relaxed text-neutral-600 md:text-base"
                      >
                        {d}
                      </Reveal>
                    ))}
                  </div>

                  {/* Technologies */}
                  {item.technologies.length > 0 && (
                    <Reveal delay={0.24} className="mt-9">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                        Technologies
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2.5">
                        {item.technologies.map((t) => (
                          <li
                            key={t}
                            tabIndex={0}
                            className="cursor-default rounded-full border border-neutral-900/12 bg-white px-3.5 py-1.5 text-[13px] text-neutral-700 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3b5b7a] hover:text-neutral-900 focus-visible:border-[#3b5b7a] group-hover:border-neutral-900/20"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  )}

                  {/* Applications (secondary — detailed later in Projects) */}
                  {item.applications.length > 0 && (
                    <Reveal delay={0.3} className="mt-9">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                        Applications
                      </p>
                      <ul className="mt-4 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-3">
                        {item.applications.map((app) => (
                          <li
                            key={app.name}
                            className="border-t border-neutral-900/10 pt-3 transition-colors duration-300 group-hover:border-[#3b5b7a]/40"
                          >
                            <p className="font-display text-base font-semibold uppercase tracking-tight text-neutral-900">
                              {app.name}
                            </p>
                            <p className="mt-1 text-[13px] text-neutral-500">
                              {app.kind}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
