'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import { about } from '@/lib/data/site';

/**
 * About Me
 * Opens the darker chapter of the story. A white-to-dark gradient at the top
 * carries the eye out of the hero and into a deep editorial environment.
 */
export default function About() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });
  // Subtle depth: the statement drifts up as the section arrives.
  const statementY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReduced ? 0 : 60, 0]
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0b0b0d] text-[#f5f3ee]"
    >
      {/* Hero-white receding into the dark environment */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            'linear-gradient(to bottom, #faf9f6 0%, rgba(250,249,246,0.55) 26%, rgba(11,11,13,0) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-32 pt-[46vh] md:px-10 md:pb-40">
        <Reveal as="p" className="about-eyebrow">
          <span className="mr-3 inline-block h-px w-8 align-middle bg-[#86a5cc]" />
          {about.eyebrow}
        </Reveal>

        {/* Large editorial statement */}
        <motion.h2
          style={{ y: statementY }}
          className="mt-8 max-w-[16ch] font-display text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
        >
          {about.statement.map((line, i) => (
            <Reveal as="span" key={i} delay={0.08 * i} depth className="block">
              {line}
            </Reveal>
          ))}
        </motion.h2>

        {/* Biography */}
        <div className="mt-14 grid gap-6 md:mt-20 md:max-w-3xl">
          {about.paragraphs.map((p, i) => (
            <Reveal
              as="p"
              key={i}
              delay={0.06 * i}
              className={`text-base leading-relaxed md:text-lg ${
                i === 0 ? 'text-[#d8d6cf]' : 'text-[#8f8f97]'
              }`}
            >
              {p}
            </Reveal>
          ))}
        </div>

        {/* Information blocks (editorial, not dashboard cards) */}
        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
          {about.facts.map((f, i) => (
            <Reveal
              key={f.label}
              delay={0.07 * i}
              className="border-t border-white/15 pt-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#86a5cc]">
                {f.label}
              </p>
              <p className="mt-4 font-display text-xl font-medium leading-tight text-[#f5f3ee] md:text-2xl">
                {f.value}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
