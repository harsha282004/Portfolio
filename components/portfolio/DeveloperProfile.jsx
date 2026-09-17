'use client';

import { Github, ArrowUpRight, Linkedin, Mail, Phone } from 'lucide-react';
import Reveal from './Reveal';
import { ProjectLinks } from './projects/parts';
import { developer } from '@/lib/data/site';

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail, phone: Phone };

/**
 * DeveloperProfile
 * A dark engineering-archive section. Real repositories only — no fabricated
 * stars, followers, commits, heatmaps or charts. Subtle grid texture +
 * staggered reveals; all links keyboard-accessible and safely external.
 */
export default function DeveloperProfile() {
  const d = developer;

  return (
    <section
      id="github"
      className="relative w-full overflow-hidden bg-[#08080a] text-[#f5f3ee]"
    >
      {/* light Certifications environment receding into the dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            'linear-gradient(to bottom, #faf9f6 0%, rgba(250,249,246,0.5) 24%, rgba(8,8,10,0) 100%)',
        }}
      />
      {/* subtle cool grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #6cb6e6 1px, transparent 1px), linear-gradient(to bottom, #6cb6e6 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-40 pt-[40vh] md:px-10 md:pb-52">
        <Reveal as="p" className="about-eyebrow">
          <span className="mr-3 inline-block h-px w-8 align-middle bg-[#6cb6e6]" />
          {d.eyebrow}
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-8 font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
        >
          {d.heading}
        </Reveal>
        <Reveal as="p" delay={0.12} className="mt-6 max-w-2xl text-base leading-relaxed text-[#8f8f97] md:text-lg">
          {d.supporting}
        </Reveal>

        {/* GitHub identity */}
        <Reveal delay={0.06} className="mt-14 md:mt-20">
          <div className="flex flex-col gap-6 rounded-xl border border-white/12 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div className="flex items-center gap-4">
              <Github className="h-8 w-8 flex-none text-[#f5f3ee]" aria-hidden />
              <div className="min-w-0">
                <p className="font-mono text-base text-[#f5f3ee] md:text-lg">@{d.github.username}</p>
                <p className="truncate font-mono text-xs text-white/45">{d.github.url}</p>
              </div>
            </div>
            <a
              href={d.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub — opens in a new tab"
              className="inline-flex flex-none items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-900 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Github className="h-4 w-4" aria-hidden />
              View GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>

        {/* Repository archive */}
        <div className="mt-16 md:mt-24">
          <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            Repository Archive
          </Reveal>
          <ol className="mt-6 border-b border-white/10">
            {d.repos.map((r, i) => (
              <li key={r.index}>
                <Reveal delay={0.05 * i}>
                  <div className="group border-t border-white/10 py-10 transition-colors duration-300 hover:bg-white/[0.02] md:py-12">
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <span className="font-mono text-sm text-[#6cb6e6]">{r.index}</span>
                        <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-[0.98] tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-4xl">
                          {r.name}
                        </h3>
                        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white/45">
                          {r.category}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="h-6 w-6 flex-none text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/60 md:text-base">
                      {r.description}
                    </p>
                    <div className="mt-7">
                      <ProjectLinks links={r.links} theme="dark" />
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Connect */}
        <div className="mt-20 md:mt-28">
          <Reveal as="h3" className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
            Connect
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.connect.map((c, i) => {
              const Icon = ICONS[c.icon] || ArrowUpRight;
              const ext = c.external
                ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${c.label} — opens in a new tab` }
                : { 'aria-label': `${c.label}: ${c.value}` };
              return (
                <Reveal key={c.label} delay={0.05 * i}>
                  <a
                    href={c.href}
                    {...ext}
                    className="group flex items-center gap-3 rounded-lg border border-white/12 bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-[#6cb6e6]"
                  >
                    <Icon className="h-5 w-5 flex-none text-[#6cb6e6]" aria-hidden />
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                        {c.label}
                      </p>
                      <p className="truncate text-sm text-white/80 transition-colors duration-300 group-hover:text-white">
                        {c.value}
                      </p>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
