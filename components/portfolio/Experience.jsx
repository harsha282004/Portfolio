'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { experience } from '@/lib/data/site';

/**
 * Experience — CAREER LOG
 * Each role is a log entry: entry marker, period, then the real company, role,
 * responsibilities, technologies and applications. Nothing is embellished.
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
    <SectionShell id="experience" surface="panel" grid="plain" glow="top">
      <HudHeading index="05" label={experience.eyebrow} heading={experience.heading} />

      <div ref={railRef} className="relative mt-12 md:mt-16">
        {/* Log rail */}
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-hud-line-strong md:left-[9px]">
          <motion.div
            className="absolute inset-0 origin-top"
            style={{
              scaleY: lineScaleY,
              background: 'linear-gradient(to bottom, var(--accent-bright), var(--accent-deep))',
              boxShadow: '0 0 12px var(--hud-glow)',
            }}
          />
        </div>

        <ol className="space-y-16 md:space-y-24">
          {experience.items.map((item) => (
            <li
              key={item.id}
              className="group relative pl-12 md:grid md:grid-cols-[minmax(200px,280px)_1fr] md:gap-14 md:pl-24"
            >
              {/* Entry marker */}
              <span
                aria-hidden
                className="absolute left-0 top-1.5 block h-[15px] w-[15px] border border-hud bg-void"
              >
                <span className="absolute inset-[3px] bg-hud shadow-[0_0_10px_var(--hud-glow)]" />
              </span>

              {/* Left: entry id / period / duration */}
              <div className="md:pt-1">
                <Reveal className="hud-label hud-label-accent">
                  Log Entry {item.index}
                </Reveal>
                <Reveal delay={0.06} className="mt-4 font-hud text-sm text-ink-dim">
                  {item.period}
                </Reveal>
                <Reveal
                  delay={0.1}
                  className="mt-3 inline-flex items-center gap-2 border border-hud-line-strong px-3 py-1 font-hud text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-mute"
                >
                  <span className="h-1 w-1 rounded-full bg-hud" />
                  {item.duration}
                </Reveal>
              </div>

              {/* Right: company / role / detail */}
              <div className="mt-8 md:mt-0">
                <Reveal
                  as="h3"
                  className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1 md:text-5xl"
                >
                  {item.company}
                </Reveal>
                <Reveal as="p" delay={0.08} className="mt-3 font-hud text-sm uppercase tracking-[0.16em] text-hud-bright md:text-base">
                  {item.role}
                </Reveal>

                <div className="mt-7 max-w-2xl space-y-4">
                  {item.descriptions.map((d, i) => (
                    <Reveal
                      as="p"
                      key={i}
                      delay={0.14 + i * 0.06}
                      className="flex gap-3 text-[15px] leading-relaxed text-ink-dim md:text-base"
                    >
                      <span aria-hidden className="mt-2.5 h-px w-4 flex-none bg-hud opacity-70" />
                      <span>{d}</span>
                    </Reveal>
                  ))}
                </div>

                {/* Technologies */}
                {item.technologies.length > 0 && (
                  <Reveal delay={0.24} className="mt-8">
                    <p className="hud-label">Technologies</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.technologies.map((t) => (
                        <li
                          key={t}
                          tabIndex={0}
                          className="cursor-default border border-hud-line-strong bg-white/[0.02] px-3 py-1.5 font-hud text-[11px] uppercase tracking-[0.1em] text-ink-dim outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-hud hover:text-ink focus-visible:border-hud"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}

                {/* Applications built */}
                {item.applications.length > 0 && (
                  <Reveal delay={0.3} className="mt-8">
                    <p className="hud-label">Applications Built</p>
                    <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {item.applications.map((app) => (
                        <li
                          key={app.name}
                          className="hud-corners hud-panel hud-panel-hover relative px-4 py-3.5"
                        >
                          <p className="font-display text-base font-semibold uppercase tracking-tight text-ink">
                            {app.name}
                          </p>
                          <p className="mt-1 font-hud text-[11px] text-ink-mute">{app.kind}</p>
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
    </SectionShell>
  );
}
