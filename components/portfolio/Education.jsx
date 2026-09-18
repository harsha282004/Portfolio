'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { education } from '@/lib/data/site';

/**
 * Education — JOURNEY LOG
 * Progression through stages. A rail draws itself on scroll and each stage is
 * a completed waypoint: STAGE 01..03 with the real institution and result.
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
    <SectionShell id="journey" surface="void" grid="plain">
      <HudHeading index="02" label="Journey Log" heading="The path so far" />

      {/* Stage timeline */}
      <div ref={railRef} className="relative mt-12 md:mt-16">
        {/* Faint rail + accent line that draws on scroll */}
        <div className="absolute bottom-2 left-[9px] top-2 w-px bg-hud-line-strong md:left-[11px]">
          <motion.div
            className="absolute inset-0 origin-top"
            style={{
              scaleY: lineScaleY,
              background: 'linear-gradient(to bottom, var(--accent-bright), var(--accent-deep))',
              boxShadow: '0 0 12px var(--hud-glow)',
            }}
          />
        </div>

        <ol className="space-y-14 md:space-y-20">
          {education.map((item, idx) => (
            <li
              key={item.id}
              className="relative pl-12 md:grid md:grid-cols-[minmax(220px,320px)_1fr] md:gap-16 md:pl-24"
            >
              {/* Waypoint marker */}
              <Reveal as="span" className="absolute left-0 top-1.5">
                <span className="relative block h-[19px] w-[19px]">
                  <span className="absolute inset-0 rotate-45 border border-hud bg-void" />
                  <span className="absolute inset-[6px] rotate-45 bg-hud shadow-[0_0_10px_var(--hud-glow)]" />
                </span>
              </Reveal>

              {/* Stage + year */}
              <div>
                <Reveal className="hud-label hud-label-accent mb-3">
                  Stage {String(idx + 1).padStart(2, '0')}
                </Reveal>
                {item.yearRange ? (
                  <Reveal className="flex items-center gap-4">
                    <span className="edu-year">{item.yearRange[0]}</span>
                    <span className="h-px w-10 bg-hud opacity-70 md:w-16" />
                    <span className="edu-year">{item.yearRange[1]}</span>
                  </Reveal>
                ) : (
                  <Reveal className="edu-year">{item.year}</Reveal>
                )}
              </div>

              {/* Details */}
              <div className="mt-5 md:mt-9">
                <Reveal
                  as="h3"
                  delay={0.08}
                  className="font-display text-2xl font-semibold leading-tight text-ink md:text-3xl"
                >
                  {item.institution}
                  {item.location && <span className="text-ink-mute">{`, ${item.location}`}</span>}
                </Reveal>
                <Reveal as="p" delay={0.16} className="mt-3 text-base text-ink-dim md:text-lg">
                  {item.qualification}
                </Reveal>
                <Reveal delay={0.24} className="mt-5 inline-flex items-center gap-3">
                  <span className="hud-label">Result</span>
                  <span className="font-display text-xl font-bold tracking-wide hud-glow-text md:text-2xl">
                    {item.score}
                  </span>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
