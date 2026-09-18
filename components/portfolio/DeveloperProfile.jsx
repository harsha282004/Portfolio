'use client';

import { Github, ArrowUpRight, Linkedin, Mail, Phone } from 'lucide-react';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { ProjectLinks } from './projects/parts';
import { developer } from '@/lib/data/site';

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail, phone: Phone };

/**
 * Developer Profile — DEVELOPER TERMINAL
 * A terminal-framed archive of the real repositories. No fabricated stars,
 * followers, commit counts, streaks or contribution graphs.
 */
export default function DeveloperProfile() {
  const d = developer;

  return (
    <SectionShell id="github" surface="panel" grid="accent" scanlines glow="top">
      <HudHeading
        index="09"
        label={d.eyebrow}
        heading={d.heading}
        supporting={d.supporting}
      />

      {/* ---------- terminal window ---------- */}
      <Reveal delay={0.06} className="mt-10 md:mt-12">
        <div className="hud-panel overflow-hidden">
          {/* title bar */}
          <div className="flex items-center gap-3 border-b border-hud-line-strong bg-white/[0.02] px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-hud/70" />
            </span>
            <span className="font-hud text-[11px] tracking-[0.16em] text-ink-mute">
              github · session
            </span>
            <span className="ml-auto flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-hud hud-blink" />
              <span className="hud-label">Connected</span>
            </span>
          </div>

          {/* terminal body */}
          <div className="px-4 py-5 md:px-6 md:py-6">
            <p className="font-hud text-[13px] leading-relaxed md:text-sm">
              <span className="text-hud">$</span>{' '}
              <span className="text-ink-dim">whoami</span>
            </p>
            <p className="mt-1.5 font-hud text-[13px] text-ink md:text-sm">
              @{d.github.username}
            </p>

            <p className="mt-4 font-hud text-[13px] leading-relaxed md:text-sm">
              <span className="text-hud">$</span>{' '}
              <span className="text-ink-dim">cat profile.url</span>
            </p>
            <p className="mt-1.5 break-all font-hud text-[13px] text-ink-dim md:text-sm">
              {d.github.url}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={d.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub — opens in a new tab"
                className="hud-btn"
              >
                <Github className="h-4 w-4" aria-hidden />
                View GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <span className="font-hud text-[11px] text-ink-mute">
                <span className="text-hud">$</span> <span className="hud-blink">_</span>
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---------- repository archive ---------- */}
      <div className="mt-10 md:mt-14">
        <Reveal className="hud-label flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-hud opacity-60" />
          Repository Archive
        </Reveal>

        <ol className="mt-6">
          {d.repos.map((r, i) => (
            <li key={r.index}>
              <Reveal delay={0.05 * i}>
                <div className="group relative border-t border-hud-line-strong py-8 transition-colors duration-300 last:border-b hover:bg-hud/[0.035] md:py-10">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-hud shadow-[0_0_12px_var(--hud-glow)] transition-transform duration-500 group-hover:scale-y-100"
                  />
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <span className="font-hud text-sm text-hud">{r.index}</span>
                      <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-[0.98] tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1 md:text-4xl">
                        {r.name}
                      </h3>
                      <p className="mt-3 font-hud text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                        {r.category}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="h-6 w-6 flex-none text-ink-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-hud-bright"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-dim md:text-base">
                    {r.description}
                  </p>
                  <div className="mt-7">
                    <ProjectLinks links={r.links} />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* ---------- connect ---------- */}
      <div className="mt-12 md:mt-16">
        <Reveal as="h3" className="font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
          Connect
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {d.connect.map((c, i) => {
            const Icon = ICONS[c.icon] || ArrowUpRight;
            const ext = c.external
              ? {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  'aria-label': `${c.label} — opens in a new tab`,
                }
              : { 'aria-label': `${c.label}: ${c.value}` };
            return (
              <Reveal key={c.label} delay={0.05 * i}>
                <a
                  href={c.href}
                  {...ext}
                  className="hud-corners hud-panel hud-panel-hover group relative flex items-center gap-3 px-5 py-4"
                >
                  <Icon className="h-5 w-5 flex-none text-hud" aria-hidden />
                  <div className="min-w-0">
                    <p className="hud-label">{c.label}</p>
                    <p className="mt-1 truncate font-hud text-[13px] text-ink-dim transition-colors duration-300 group-hover:text-ink">
                      {c.value}
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
