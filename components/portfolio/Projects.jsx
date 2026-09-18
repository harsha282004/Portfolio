'use client';

import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import {
  ProjectImage,
  Pipeline,
  ProjectLinks,
  TechTags,
  BulletList,
} from './projects/parts';
import { projectsIntro, projects } from '@/lib/data/projects';

/**
 * Projects — MISSIONS
 * Each project is a mission briefing: mission id, classification (the real
 * category), objective (the real description), then approach, stack and links.
 * No invented metrics, outcomes or results.
 */

/** '1901 / 837' -> 2.271 (grid fr weight). */
function aspectRatio(aspect) {
  const [w, h] = aspect.split('/').map(Number);
  return (w / h).toFixed(3);
}

function MissionHead({ p, mission }) {
  return (
    <div>
      <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="hud-label hud-label-accent">Mission {mission}</span>
        <span aria-hidden className="h-px w-8 bg-hud-line-strong sm:w-12" />
        <span className="hud-label">{p.category}</span>
      </Reveal>

      <Reveal
        as="h3"
        delay={0.1}
        depth
        className="mt-5 max-w-[20ch] font-display text-[clamp(1.9rem,4.4vw,4rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em] text-ink"
      >
        {p.title}
      </Reveal>

      {p.subtitle && (
        <Reveal
          as="p"
          delay={0.14}
          className="mt-3 max-w-[32ch] font-display text-[clamp(1rem,1.9vw,1.6rem)] font-medium leading-tight text-hud-bright"
        >
          {p.subtitle}
        </Reveal>
      )}

      <Reveal delay={0.18} className="mt-6 max-w-2xl">
        <p className="hud-label mb-2">Objective</p>
        <p className="text-base leading-relaxed text-ink-dim md:text-lg">{p.description}</p>
      </Reveal>
    </div>
  );
}

/** One mission block: numbered frame + consistent internal rhythm. */
function Mission({ mission, children, className = '' }) {
  return (
    <div className={`relative border-t border-hud-line-strong ${className}`}>
      {/* oversized mission numeral as a watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-8 select-none font-display text-[clamp(4rem,12vw,11rem)] font-bold leading-none text-white/[0.025] md:right-10"
      >
        {mission}
      </span>
      {/* matches SectionShell's container so every section aligns */}
      <div className="relative mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        {children}
      </div>
    </div>
  );
}

export default function Projects() {
  const { virtualCampus: p1, satellite: p2, suite: p3 } = projects;

  return (
    <section id="projects" className="relative w-full overflow-hidden bg-void">
      {/* seam + atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px hud-seam opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hud-grid" />

      {/* ---------------- briefing intro ---------------- */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 pb-4 pt-16 md:px-10 md:pt-20">
        <HudHeading
          index="06"
          label={projectsIntro.eyebrow}
          heading={projectsIntro.heading}
          supporting={projectsIntro.supporting}
        />
      </div>

      <div className="relative z-20">
        {/* ============ MISSION 01 — VIRTUAL CAMPUS ============ */}
        <Mission mission="01">
          <MissionHead p={p1} mission="01" />
          <Reveal delay={0.1} className="mt-8 md:mt-12">
            <ProjectImage
              src={p1.images[0].src}
              label={p1.images[0].label}
              alt={p1.images[0].alt}
              aspect={p1.images[0].aspect}
            />
          </Reveal>
          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-16">
            <div className="space-y-9">
              <BulletList items={p1.approach} label="Technical Approach" />
              <div>
                <p className="hud-label">Specialist Agents</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p1.agents.map((a) => (
                    <li
                      key={a}
                      className="border border-hud-line-strong bg-white/[0.02] px-3 py-1.5 font-hud text-[11px] uppercase tracking-[0.1em] text-ink-dim"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-9">
              <TechTags items={p1.tech} />
              <ProjectLinks links={p1.links} />
            </div>
          </div>
        </Mission>

        {/* ============ MISSION 02 — SATELLITE CHANGE DETECTION ============ */}
        <Mission mission="02">
          <MissionHead p={p2} mission="02" />

          {/* Before -> Change -> After. Column widths follow each image's native
              aspect ratio, so all three share one height without cropping. */}
          <div
            className="mt-8 grid items-center gap-3 sm:[grid-template-columns:var(--sat-cols)] md:mt-12 md:gap-4"
            style={{
              '--sat-cols': p2.images
                .map((im) => `${aspectRatio(im.aspect)}fr`)
                .join(' auto '),
            }}
          >
            {p2.images.map((im, i) => (
              <Fragment key={im.label}>
                {i > 0 && (
                  <ArrowRight
                    aria-hidden
                    className="mx-auto h-5 w-5 rotate-90 text-hud opacity-70 sm:rotate-0"
                  />
                )}
                <Reveal delay={0.06 * i}>
                  <ProjectImage src={im.src} label={im.label} alt={im.alt} aspect={im.aspect} />
                </Reveal>
              </Fragment>
            ))}
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            <BulletList items={p2.approach} label="Technical Approach" />
            <div className="space-y-9">
              <TechTags items={p2.tech} />
              <ProjectLinks links={p2.links} />
            </div>
          </div>

          {/* Pipeline */}
          <div className="mt-12 md:mt-16">
            <div className="text-center">
              <p className="hud-label">Detection Pipeline</p>
            </div>
            <div className="mt-8">
              <Pipeline steps={p2.pipeline} />
            </div>
          </div>
        </Mission>

        {/* ============ MISSION 03 — CODEALPHA SUITE ============ */}
        <Mission mission="03">
          <MissionHead p={p3} mission="03" />
          <div className="mt-10 space-y-10 md:mt-14 md:space-y-16">
            {p3.subProjects.map((sp, i) => (
              <Reveal key={sp.name} delay={0.04}>
                <div className="grid gap-8 border-t border-hud-line-strong pt-10 md:grid-cols-2 md:items-center md:gap-14 md:pt-14">
                  <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                    <ProjectImage src={sp.src} label={sp.name} alt={sp.alt} aspect={sp.aspect} />
                  </div>
                  <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                    <p className="font-hud text-sm font-semibold tracking-[0.2em] text-hud">
                      {`0${i + 1}`}
                    </p>
                    <h4 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-ink md:text-3xl">
                      {sp.name}
                    </h4>
                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim md:text-base">
                      {sp.description}
                    </p>
                    <div className="mt-7">
                      <TechTags items={sp.tech} label="Tech" />
                    </div>
                    <div className="mt-7">
                      <ProjectLinks
                        links={[{ label: 'GitHub', href: sp.github, kind: 'github' }]}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Mission>
      </div>
    </section>
  );
}
