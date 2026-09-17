'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import { education } from '@/lib/data/site';

/**
 * Education Journey
 * A cinematic vertical timeline. A faint rail runs the full height while an
 * accent line "draws" itself as the user scrolls. Each milestone reveals in a
 * staggered sequence: year -> institution -> qualification -> score.
 */
export default function Education() {
  const railRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 75%', 'end 65%'],
  });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScaleY = prefersReduced ? 1 : drawn;

  return (
    <section
      id="journey"
      className="relative w-full overflow-hidden bg-[#0b0b0d] text-[#f5f3ee]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-40 pt-24 md:px-10 md:pb-52 md:pt-32">
        <Reveal as="p" className="about-eyebrow">
          <span className="mr-3 inline-block h-px w-8 align-middle bg-[#86a5cc]" />
          Education Journey
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-8 font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
        >
          The path so far
        </Reveal>

        {/* Timeline */}
        <div ref={railRef} className="relative mt-20 md:mt-28">
          {/* Faint full-height rail */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/12 md:left-[9px]">
            {/* Accent line that draws on scroll */}
            <motion.div
              style={{ scaleY: lineScaleY }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#86a5cc] to-[#5f7fa6]"
            />
          </div>

          <ol className="space-y-24 md:space-y-32">
            {education.map((item, idx) => (
              <li
                key={item.id}
                className="relative pl-12 md:grid md:grid-cols-[minmax(220px,320px)_1fr] md:gap-16 md:pl-24"
              >
                {/* Milestone dot */}
                <Reveal
                  as="span"
                  className="absolute left-0 top-1.5 md:left-0"
                >
                  <span className="block h-4 w-4 rounded-full bg-[#86a5cc] ring-8 ring-[#0b0b0d]" />
                </Reveal>

                {/* Year / year range */}
                <div className="md:pt-0">
                  {item.yearRange ? (
                    <Reveal className="flex items-center gap-4">
                      <span className="edu-year">{item.yearRange[0]}</span>
                      <span className="h-px w-10 bg-[#86a5cc]/70 md:w-16" />
                      <span className="edu-year">{item.yearRange[1]}</span>
                    </Reveal>
                  ) : (
                    <Reveal className="edu-year">{item.year}</Reveal>
                  )}
                </div>

                {/* Details */}
                <div className="mt-5 md:mt-2">
                  <Reveal
                    as="h3"
                    delay={0.08}
                    className="font-display text-2xl font-semibold leading-tight text-[#f5f3ee] md:text-3xl"
                  >
                    {item.institution}
                    {item.location && (
                      <span className="text-[#8f8f97]">{`, ${item.location}`}</span>
                    )}
                  </Reveal>
                  <Reveal
                    as="p"
                    delay={0.16}
                    className="mt-3 text-base text-[#8f8f97] md:text-lg"
                  >
                    {item.qualification}
                  </Reveal>
                  <Reveal
                    as="p"
                    delay={0.24}
                    className="mt-5 font-display text-xl font-bold tracking-wide text-[#86a5cc] md:text-2xl"
                  >
                    {item.score}
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
