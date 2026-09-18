'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { about } from '@/lib/data/site';

/**
 * About — PLAYER PROFILE
 * The first interface panel after the main menu: a large editorial statement
 * beside a column of profile readouts. The readouts are the real facts from
 * `about.facts`, presented as HUD fields.
 */
export default function About() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });
  const statementY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReduced ? 0 : 60, 0]
  );

  return (
    <div ref={sectionRef}>
      <SectionShell id="about" surface="deep" grid="plain" glow="top">
        <HudHeading index="01" label={about.eyebrow} />

        {/* Large editorial statement */}
        <motion.h2
          style={{ y: statementY }}
          className="hud-display mt-7 max-w-[16ch]"
        >
          {about.statement.map((line, i) => (
            <Reveal as="span" key={i} delay={0.08 * i} depth className="block">
              {line}
            </Reveal>
          ))}
        </motion.h2>

        <div className="mt-10 grid gap-x-16 gap-y-10 md:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* Biography */}
          <div className="grid gap-5">
            {about.paragraphs.map((p, i) => (
              <Reveal
                as="p"
                key={i}
                delay={0.06 * i}
                className={`text-base leading-relaxed md:text-[17px] ${
                  i === 0 ? 'text-ink' : 'text-ink-dim'
                }`}
              >
                {p}
              </Reveal>
            ))}
          </div>

          {/* Profile readouts */}
          <div className="relative">
            <Reveal className="hud-label mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-hud opacity-60" />
              Profile Data
            </Reveal>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {about.facts.map((f, i) => (
                <Reveal key={f.label} delay={0.07 * i}>
                  <div className="hud-corners hud-panel hud-panel-hover relative px-5 py-4">
                    <dt className="hud-label hud-label-accent">{f.label}</dt>
                    <dd className="mt-2 font-display text-lg font-medium leading-tight text-ink md:text-xl">
                      {f.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
