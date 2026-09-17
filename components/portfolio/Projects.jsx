'use client';

import Reveal from './Reveal';
import {
  ProjectImage,
  Pipeline,
  ProjectLinks,
  TechTags,
  BulletList,
} from './projects/parts';
import { projectsIntro, projects } from '@/lib/data/projects';

/* Shared header block: number -> category -> title (-> subtitle) -> description */
function ProjectHead({ p, theme = 'light' }) {
  const num = theme === 'dark' ? 'text-[#6cb6e6]' : 'text-[#3b5b7a]';
  const cat = theme === 'dark' ? 'text-white/50' : 'text-neutral-500';
  const title = theme === 'dark' ? 'text-white' : 'text-neutral-900';
  const sub = theme === 'dark' ? 'text-[#9fc4e0]' : 'text-[#3b5b7a]';
  const desc = theme === 'dark' ? 'text-white/70' : 'text-neutral-600';
  return (
    <div>
      <Reveal className={`font-display text-sm font-semibold tracking-[0.22em] ${num}`}>
        {p.index}
      </Reveal>
      <Reveal delay={0.06} className={`mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] ${cat}`}>
        {p.category}
      </Reveal>
      <Reveal
        as="h3"
        delay={0.1}
        depth
        className={`mt-5 max-w-[20ch] font-display text-[clamp(1.9rem,4.4vw,4rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em] ${title}`}
      >
        {p.title}
      </Reveal>
      {p.subtitle && (
        <Reveal
          as="p"
          delay={0.14}
          className={`mt-3 max-w-[32ch] font-display text-[clamp(1rem,1.9vw,1.6rem)] font-medium leading-tight ${sub}`}
        >
          {p.subtitle}
        </Reveal>
      )}
      <Reveal as="p" delay={0.18} className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${desc}`}>
        {p.description}
      </Reveal>
    </div>
  );
}

function SectionLabel({ children, theme = 'light' }) {
  const t = theme === 'dark' ? 'text-white/40' : 'text-neutral-400';
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${t}`}>{children}</p>
  );
}

export default function Projects() {
  const { virtualCampus: p1, satellite: p2, orca: p3, suite: p4 } = projects;

  return (
    <section id="projects" className="relative w-full bg-[#faf9f6] text-neutral-900">
      {/* Intro */}
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-6 pt-28 md:px-10 md:pt-40">
        <Reveal as="p" className="flex items-center text-xs font-semibold uppercase tracking-[0.24em] text-[#3b5b7a]">
          <span className="mr-3 inline-block h-px w-8 bg-[#3b5b7a]" />
          {projectsIntro.eyebrow}
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          depth
          className="mt-8 max-w-[20ch] font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold uppercase leading-[0.96] tracking-[-0.03em]"
        >
          {projectsIntro.heading}
        </Reveal>
        <Reveal as="p" delay={0.12} className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
          {projectsIntro.supporting}
        </Reveal>
      </div>

      {/* ============ 01 — VIRTUAL CAMPUS (light, editorial) ============ */}
      <div className="mx-auto w-full max-w-[1400px] border-t border-neutral-900/10 px-6 py-24 md:px-10 md:py-32">
        <ProjectHead p={p1} />
        <Reveal delay={0.1} className="mt-12 md:mt-16">
          <ProjectImage src={p1.images[0].src} label={p1.images[0].label} alt={p1.images[0].alt} aspect="16 / 9" />
        </Reveal>
        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          <div className="space-y-10">
            <BulletList items={p1.approach} label="Technical Approach" />
            <div>
              <SectionLabel>Specialist Agents</SectionLabel>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {p1.agents.map((a) => (
                  <li key={a} className="rounded-full border border-neutral-900/12 bg-white px-3.5 py-1.5 text-[13px] text-neutral-700">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-10">
            <TechTags items={p1.tech} />
            <ProjectLinks links={p1.links} />
          </div>
        </div>
      </div>

      {/* ============ 02 — SATELLITE CHANGE DETECTION (technical) ============ */}
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden border-t border-neutral-900/10 px-6 py-24 md:px-10 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative">
          <ProjectHead p={p2} />

          {/* Before / After / Detected change */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3 md:mt-16 md:gap-6">
            {p2.images.map((im, i) => (
              <Reveal key={im.label} delay={0.06 * i}>
                <ProjectImage src={im.src} label={im.label} alt={im.alt} theme="light" aspect="4 / 3" />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            <BulletList items={p2.approach} label="Technical Approach" />
            <div className="space-y-10">
              <TechTags items={p2.tech} />
              <ProjectLinks links={p2.links} />
            </div>
          </div>

          {/* Pipeline */}
          <div className="mt-20 md:mt-24">
            <div className="text-center">
              <SectionLabel>Detection Pipeline</SectionLabel>
            </div>
            <div className="mt-8">
              <Pipeline steps={p2.pipeline} theme="light" />
            </div>
          </div>
        </div>
      </div>

      {/* ============ 03 — ORCA (deep-ocean, dark, full-bleed) ============ */}
      <div className="relative w-full overflow-hidden bg-[#05141f] text-white">
        {/* transitions in/out of the light environment */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{ background: 'linear-gradient(to bottom, #faf9f6 0%, rgba(5,20,31,0) 100%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(to top, #faf9f6 0%, rgba(5,20,31,0) 100%)' }}
        />
        {/* subtle map/grid pattern in cool blue */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #6cb6e6 1px, transparent 1px), linear-gradient(to bottom, #6cb6e6 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 py-32 md:px-10 md:py-44">
          <ProjectHead p={p3} theme="dark" />
          <Reveal delay={0.2} className="mt-6">
            <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9fc4e0]">
              Focus region · {p3.region}
            </span>
          </Reveal>

          <Reveal delay={0.12} className="mt-12 md:mt-16">
            <ProjectImage src={p3.images[0].src} label={p3.images[0].label} alt={p3.images[0].alt} theme="dark" aspect="16 / 9" />
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <SectionLabel theme="dark">Capabilities</SectionLabel>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {p3.concepts.map((c) => (
                  <li key={c} className="rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-[#c9dcec]">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <ProjectLinks links={p3.links} theme="dark" />
              </div>
            </div>
            <div>
              <div className="text-center md:text-left">
                <SectionLabel theme="dark">Reasoning Pipeline</SectionLabel>
              </div>
              <div className="mt-8">
                <Pipeline inputs={p3.pipelineInputs} steps={p3.pipelineSteps} theme="dark" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ 04 — CODEALPHA FULL-STACK SUITE (light) ============ */}
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <ProjectHead p={p4} />
        <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
          {p4.subProjects.map((sp, i) => (
            <Reveal key={sp.name} delay={0.04}>
              <div className="grid gap-8 border-t border-neutral-900/10 pt-10 md:grid-cols-2 md:items-center md:gap-14 md:pt-14">
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <ProjectImage src={sp.src} label={sp.name} alt={sp.alt} aspect="16 / 10" />
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <p className="font-display text-sm font-semibold tracking-[0.22em] text-[#3b5b7a]">
                    {`0${i + 1}`}
                  </p>
                  <h4 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-neutral-900 md:text-3xl">
                    {sp.name}
                  </h4>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600 md:text-base">
                    {sp.description}
                  </p>
                  <div className="mt-7">
                    <TechTags items={sp.tech} label="Tech" />
                  </div>
                  <div className="mt-7">
                    <ProjectLinks links={[{ label: 'GitHub', href: sp.github, kind: 'github' }]} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
