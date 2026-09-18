'use client';

import { Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import Reveal from './Reveal';
import {
  ProjectImage,
  ImageSequence,
  FlowSteps,
  ProjectLinks,
  TechTags,
  BulletList,
} from './projects/parts';
import { projectsIntro, missions } from '@/lib/data/projects';
import { scrollToAnchor } from '@/lib/utils/scrollToAnchor';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Projects — MISSION SELECT
 * Desktop: a mission list (left, sticky) drives a briefing panel (right).
 * Mobile: the same list works as an accordion; the briefing opens in place.
 * Every field comes from `missions` — no invented metrics or outcomes.
 */
export default function Projects() {
  const [activeId, setActiveId] = useState(missions[0].id);
  const [mobileOpen, setMobileOpen] = useState(true);
  const buttons = useRef({});
  const active = missions.find((m) => m.id === activeId);

  const select = (id) => {
    if (id === activeId) {
      setMobileOpen((o) => !o);
      return;
    }
    setActiveId(id);
    setMobileOpen(true);
    // On small screens the briefing opens inline; keep the chosen row in view.
    if (window.matchMedia('(max-width: 1023px)').matches) {
      requestAnimationFrame(() => {
        const el = buttons.current[id];
        if (el) scrollToAnchor(`#mission-${id}`);
      });
    }
  };

  // Up/Down arrows move between missions, like a game menu.
  const onKeyDown = (e, i) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const next = missions[(i + (e.key === 'ArrowDown' ? 1 : -1) + missions.length) % missions.length];
    buttons.current[next.id]?.focus();
  };

  return (
    <SectionShell id="projects" surface="void" grid="plain" overflow="clip">
      <HudHeading
        index="05"
        label={projectsIntro.eyebrow}
        heading={projectsIntro.heading}
        supporting={projectsIntro.supporting}
      />

      <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[minmax(300px,380px)_minmax(0,1fr)] lg:gap-10">
        {/* ---------------- mission list ---------------- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="mb-4 flex items-center justify-between gap-4">
            <span className="hud-label hud-label-accent">Mission Select</span>
            <span className="hud-label">{String(missions.length).padStart(2, '0')} Missions</span>
          </Reveal>

          <ul className="space-y-2.5">
            {missions.map((m, i) => {
              const isActive = m.id === activeId;
              const groupStart = m.group && missions[i - 1]?.group !== m.group;
              return (
                <Fragment key={m.id}>
                  {groupStart && (
                    <li aria-hidden className="flex items-center gap-3 pb-0.5 pt-3">
                      <span className="hud-label">{m.group} Internship · Full-Stack Suite</span>
                      <span className="h-px flex-1 bg-hud-line-strong" />
                    </li>
                  )}
                  <li id={`mission-${m.id}`} className="scroll-mt-24">
                    <Reveal delay={0.05 * i} y={16}>
                      <MissionTab
                        m={m}
                        active={isActive}
                        expanded={isActive && mobileOpen}
                        onClick={() => select(m.id)}
                        onKeyDown={(e) => onKeyDown(e, i)}
                        buttonRef={(el) => (buttons.current[m.id] = el)}
                      />
                    </Reveal>

                    {/* mobile / tablet: briefing opens in place */}
                    <AnimatePresence initial={false}>
                      {isActive && mobileOpen && (
                        <motion.div
                          key={m.id}
                          id={`briefing-${m.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div className="pb-3 pt-3">
                            <MissionBriefing m={m} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </div>

        {/* ---------------- desktop briefing ---------------- */}
        <div className="hidden lg:block" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <MissionBriefing m={active} desktop />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}

/** One selectable mission row. */
function MissionTab({ m, active, expanded, onClick, onKeyDown, buttonRef }) {
  const thumb = m.images[m.sequence ? 1 : 0];
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-expanded={expanded}
      aria-controls={`briefing-${m.id}`}
      data-active={active || undefined}
      className={`mission-tab group relative flex w-full items-center gap-4 text-left ${
        m.featured ? 'py-5' : 'py-4'
      } pl-5 pr-4`}
    >
      <span aria-hidden className="mission-tab-edge" />
      <span className="flex-none font-hud text-xs font-semibold tracking-[0.18em] text-hud">
        [{m.index}]
      </span>

      <span className="min-w-0 flex-1">
        {m.featured && (
          <span className="mb-1.5 inline-flex items-center gap-1.5 font-hud text-[9px] font-semibold uppercase tracking-[0.22em] text-hud-bright">
            <Star aria-hidden className="h-2.5 w-2.5 fill-current" />
            Primary Mission
          </span>
        )}
        <span
          className={`block truncate font-display font-bold uppercase leading-tight tracking-tight transition-colors ${
            m.featured ? 'text-lg md:text-xl' : 'text-base md:text-[17px]'
          } ${active ? 'text-ink' : 'text-ink-dim group-hover:text-ink'}`}
        >
          {m.shortTitle}
        </span>
        <span className="mt-1 block font-hud text-[10px] uppercase tracking-[0.16em] text-ink-mute">
          {m.classLabel}
        </span>
        <span className="mt-2 flex items-center gap-1.5 font-hud text-[9px] uppercase tracking-[0.2em] text-ink-mute">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          Status: <span className="text-ink-dim">{m.status}</span>
        </span>
      </span>

      <span
        aria-hidden
        className="relative hidden h-12 w-20 flex-none overflow-hidden border border-hud-line-strong sm:block"
      >
        <Image src={thumb.src} alt="" fill sizes="80px" className="object-cover opacity-70 transition-opacity group-hover:opacity-100" />
      </span>

      <ChevronRight
        aria-hidden
        className={`h-4 w-4 flex-none transition-all duration-300 ${
          active ? 'translate-x-0 text-hud-bright' : '-translate-x-1 text-ink-mute group-hover:translate-x-0'
        } ${expanded ? 'max-lg:rotate-90' : ''}`}
      />
    </button>
  );
}

/** The mission briefing: media, objective, approach, stack and links. */
function MissionBriefing({ m, desktop = false }) {
  return (
    <article className="hud-corners hud-panel relative overflow-hidden" aria-labelledby={`title-${m.id}${desktop ? '-d' : ''}`}>
      <span aria-hidden className="briefing-scan" />

      {/* header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hud-line-strong bg-white/[0.02] px-5 py-3 md:px-6">
        <span className="hud-label hud-label-accent">Mission Briefing // {m.index}</span>
        <span className="flex items-center gap-3">
          {m.featured && <span className="hud-label text-hud-bright">Primary</span>}
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span className="hud-label">{m.status}</span>
          </span>
        </span>
      </div>

      <div className="p-5 md:p-7">
        {/* media */}
        {m.sequence ? (
          <div>
            <ImageSequence images={m.images} />
            <p className="mt-3 hud-label text-center">Before → Detected change → After</p>
          </div>
        ) : (
          <a
            href={m.images[0].src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full screenshot of ${m.shortTitle} — opens in a new tab`}
            className="block"
          >
            <ProjectImage
              src={m.images[0].src}
              alt={m.images[0].alt}
              label={m.images[0].label}
              aspect={m.images[0].aspect}
              sizes="(max-width: 1023px) 100vw, 60vw"
            />
          </a>
        )}

        {/* title */}
        <p className="mt-7 hud-label">{m.category}</p>
        <h3
          id={`title-${m.id}${desktop ? '-d' : ''}`}
          className={`mt-3 font-display font-bold uppercase leading-[1.02] tracking-tight text-ink ${
            m.featured ? 'text-2xl md:text-[2rem]' : 'text-2xl md:text-3xl'
          }`}
        >
          {m.title}
        </h3>

        <div className="mt-6">
          <p className="hud-label">Objective</p>
          <p className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-ink-dim md:text-base">
            {m.objective}
          </p>
          {m.context && <p className="mt-2 text-sm text-ink-mute">{m.context}</p>}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
          <div className="space-y-8">
            {m.approach && <BulletList items={m.approach} label="Approach" />}
            {m.features && (
              <div>
                <p className="hud-label">Key Features</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {m.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 border border-hud-line-strong bg-white/[0.02] px-3 py-1.5 text-[13px] text-ink-dim"
                    >
                      <span aria-hidden className="h-1 w-1 rotate-45 bg-hud" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-8">
            {m.agents && (
              <div>
                <p className="hud-label">Specialist Agents</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {m.agents.map((a) => (
                    <li
                      key={a}
                      className="border border-hud/30 bg-hud/[0.06] px-3 py-1.5 font-hud text-[11px] uppercase tracking-[0.1em] text-hud-bright"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <TechTags items={m.tech} label="Technologies" />
          </div>
        </div>

        {m.pipeline && (
          <div className="mt-8">
            <FlowSteps steps={m.pipeline} label="Detection Pipeline" />
          </div>
        )}

        <div className="mt-8 border-t border-hud-line-strong pt-6">
          <ProjectLinks links={m.links} />
        </div>
      </div>
    </article>
  );
}
