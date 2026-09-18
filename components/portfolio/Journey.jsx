'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { education, experience, journeyIntro } from '@/lib/data/site';
import { handleAnchorClick } from '@/lib/utils/scrollToAnchor';

/* ---------------------------------------------------------------------------
   Milestones, in the order they happened, built only from the real
   `education` and `experience` records.
   ------------------------------------------------------------------------- */
const edu = Object.fromEntries(education.map((e) => [e.id, e]));
const exp = Object.fromEntries(experience.items.map((e) => [e.id, e]));

const MILESTONES = [
  { id: 'x', type: 'Education', short: 'Class X', when: edu.x.year, title: edu.x.qualification, org: edu.x.institution, result: edu.x.score },
  { id: 'xii', type: 'Education', short: 'Class XII', when: edu.xii.year, title: edu.xii.qualification, org: edu.xii.institution, result: edu.xii.score },
  {
    id: 'be',
    type: 'Education',
    short: 'B.E.',
    when: edu.be.yearRange.join('–'),
    railYear: `${edu.be.yearRange[0]}–${edu.be.yearRange[1].slice(2)}`,
    title: edu.be.qualification,
    org: `${edu.be.institution}, ${edu.be.location}`,
    result: edu.be.score,
  },
  {
    id: 'unlox',
    type: 'Experience',
    short: 'Unlox',
    when: exp.unlox.period,
    title: exp.unlox.role,
    org: exp.unlox.company,
    duration: exp.unlox.duration,
    descriptions: exp.unlox.descriptions,
  },
  {
    id: 'codealpha',
    type: 'Experience',
    short: 'CodeAlpha',
    when: '2026',
    period: exp.codealpha.period,
    title: exp.codealpha.role,
    org: exp.codealpha.company,
    duration: exp.codealpha.duration,
    descriptions: exp.codealpha.descriptions,
    tech: exp.codealpha.technologies,
    apps: exp.codealpha.applications,
  },
];
const N = MILESTONES.length;

/**
 * Journey — PLAYER JOURNEY
 * A sticky progress rail tracks how far through the journey the reader is;
 * the spine draws itself on scroll and each milestone activates as it is
 * reached. Nothing here is scored — "reached" only means scrolled to.
 */
export default function Journey() {
  const listRef = useRef(null);
  const reduced = useReducedMotion();
  const [reached, setReached] = useState(0);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 65%', 'end 55%'],
  });
  // Milestone i starts at roughly i/N of the list; map that onto the rail
  // so the fill arrives at node i exactly when milestone i activates.
  const railFill = useTransform(
    scrollYProgress,
    MILESTONES.map((_, i) => i / N).concat(1),
    MILESTONES.map((_, i) => i / (N - 1)).concat(1)
  );

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * N + 0.05)));
    setReached((prev) => (prev === idx ? prev : idx));
  });

  const active = (i) => reduced || i <= reached;

  return (
    <SectionShell id="journey" surface="void" grid="plain" overflow="clip">
      <HudHeading
        index="02"
        label={journeyIntro.eyebrow}
        heading={journeyIntro.heading}
        supporting={journeyIntro.supporting}
      />

      {/* ---------------- sticky progress rail ---------------- */}
      <nav
        aria-label="Journey milestones"
        className="sticky top-16 z-30 -mx-6 mt-10 border-y border-hud-line-strong bg-void/95 px-6 py-3 md:top-20 md:-mx-10 md:mt-12 md:px-10"
      >
        <div className="relative mx-auto max-w-5xl">
          <span aria-hidden className="absolute inset-x-[10%] top-[13px] h-px bg-hud-line-strong" />
          <motion.span
            aria-hidden
            style={{ scaleX: reduced ? 1 : railFill }}
            className="absolute inset-x-[10%] top-[13px] h-px origin-left bg-hud shadow-[0_0_8px_var(--hud-glow)]"
          />
          <ol className="relative grid grid-cols-5">
            {MILESTONES.map((m, i) => (
              <li key={m.id} className="flex justify-center">
                <a
                  href={`#stage-${m.id}`}
                  onClick={(e) => handleAnchorClick(e, `#stage-${m.id}`)}
                  data-active={active(i) || undefined}
                  className="journey-rail-node group flex flex-col items-center gap-1.5"
                >
                  <span aria-hidden className="journey-rail-dot" />
                  <span className="font-hud text-[10px] font-semibold tracking-[0.12em] text-ink-dim transition-colors group-data-[active]:text-hud-bright">
                    {m.railYear || m.when}
                  </span>
                  <span className="hidden font-hud text-[9px] uppercase tracking-[0.18em] text-ink-mute sm:block">
                    {m.short}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* ---------------- milestones ---------------- */}
      <div ref={listRef} className="relative mt-12 md:mt-16">
        {/* spine */}
        <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-hud-line-strong lg:left-1/2" />
        <motion.span
          aria-hidden
          style={{ scaleY: reduced ? 1 : scrollYProgress }}
          className="absolute bottom-0 left-[11px] top-0 w-px origin-top lg:left-1/2"
        >
          <span className="block h-full w-full bg-gradient-to-b from-hud-bright to-hud-deep shadow-[0_0_12px_var(--hud-glow)]" />
        </motion.span>

        <ol className="relative space-y-10 md:space-y-14">
        {MILESTONES.map((m, i) => {
          const right = i % 2 === 1;
          return (
            <li
              key={m.id}
              id={`stage-${m.id}`}
              data-active={active(i) || undefined}
              className="journey-item group relative scroll-mt-40 pl-10 lg:grid lg:grid-cols-[1fr_72px_1fr] lg:items-start lg:pl-0"
            >
              {/* node */}
              <span aria-hidden className="journey-node absolute left-0 top-6 lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto lg:mt-6" />

              {/* year, opposite the card on desktop */}
              <Reveal
                className={`hidden lg:row-start-1 lg:block lg:pt-3 ${
                  right ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-3'
                }`}
              >
                <span className="hud-label hud-label-accent">Stage {String(i + 1).padStart(2, '0')}</span>
                <p className="edu-year mt-2">{m.when}</p>
              </Reveal>

              {/* card */}
              <Reveal
                y={24}
                className={`lg:row-start-1 ${right ? 'lg:col-start-3' : 'lg:col-start-1'}`}
              >
                <MilestoneCard m={m} index={i} />
              </Reveal>
            </li>
          );
        })}
        </ol>
      </div>
    </SectionShell>
  );
}

function MilestoneCard({ m, index }) {
  return (
    <article className="journey-card hud-corners hud-panel relative p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="hud-label hud-label-accent">
          {m.type} · Stage {String(index + 1).padStart(2, '0')}
        </span>
        {m.duration && (
          <span className="flex items-center gap-1.5 border border-hud-line-strong px-2.5 py-1 font-hud text-[10px] uppercase tracking-[0.16em] text-ink-mute">
            <span aria-hidden className="h-1 w-1 rounded-full bg-hud" />
            {m.duration}
          </span>
        )}
      </div>

      <p className="mt-3 font-display text-2xl font-bold text-ink-dim lg:hidden">{m.when}</p>

      <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink md:text-2xl">
        {m.title}
      </h3>
      <p className="mt-2 font-hud text-[12px] uppercase tracking-[0.14em] text-hud-bright md:text-[13px]">
        {m.org}
      </p>
      {m.period && <p className="mt-2 font-hud text-xs text-ink-mute">{m.period}</p>}

      {m.result && (
        <div className="mt-5 inline-flex items-center gap-3 border-t border-hud-line-strong pt-4">
          <span className="hud-label">Result</span>
          <span className="font-display text-xl font-bold tracking-wide hud-glow-text md:text-2xl">
            {m.result}
          </span>
        </div>
      )}

      {m.descriptions && (
        <div className="mt-5 space-y-3">
          {m.descriptions.map((d) => (
            <p key={d} className="flex gap-3 text-[15px] leading-relaxed text-ink-dim">
              <span aria-hidden className="mt-2.5 h-px w-4 flex-none bg-hud opacity-70" />
              <span>{d}</span>
            </p>
          ))}
        </div>
      )}

      {m.tech && (
        <div className="mt-6">
          <p className="hud-label">Technologies</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {m.tech.map((t) => (
              <li
                key={t}
                className="border border-hud-line-strong bg-white/[0.02] px-2.5 py-1 font-hud text-[10px] uppercase tracking-[0.1em] text-ink-dim"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {m.apps && (
        <div className="mt-6">
          <p className="hud-label">Applications Built</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {m.apps.map((a) => (
              <li key={a.name}>
                <a
                  href="#projects"
                  onClick={(e) => handleAnchorClick(e, '#projects')}
                  className="block border border-hud-line-strong px-3 py-2.5 transition-colors hover:border-hud/60 hover:bg-hud/[0.05]"
                >
                  <span className="block font-display text-sm font-semibold uppercase text-ink">{a.name}</span>
                  <span className="mt-0.5 block font-hud text-[10px] text-ink-mute">{a.kind}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
