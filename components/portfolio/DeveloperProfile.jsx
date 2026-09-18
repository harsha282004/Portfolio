'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Github, ArrowUpRight, Linkedin, Mail, Phone } from 'lucide-react';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { developer } from '@/lib/data/site';

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail, phone: Phone };

/** The repo slug exactly as it appears in its GitHub URL. */
const slug = (href) => href.split('/').filter(Boolean).pop();

/**
 * Developer Profile — SOURCE CODE TERMINAL
 * A visual terminal (it does not execute anything) listing the REAL
 * repositories. Each entry is a link to GitHub; hovering/focusing one shows a
 * preview. No fabricated stars, followers, commits or contribution graphs.
 */
export default function DeveloperProfile() {
  const d = developer;
  const termRef = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(termRef, { once: true, amount: 0.3 });
  const [sel, setSel] = useState(0);
  const repo = d.repos[sel];
  const user = `${d.github.username}@portfolio`;

  // Lines "print" in sequence once the terminal is on screen.
  let step = 0;
  const line = () => ({
    initial: reduced ? false : { opacity: 0, x: -6 },
    animate: inView || reduced ? { opacity: 1, x: 0 } : undefined,
    transition: { duration: 0.25, delay: 0.15 + 0.22 * step++ },
  });

  return (
    <SectionShell id="github" surface="panel" grid="accent" scanlines glow="top">
      <HudHeading index="08" label={d.eyebrow} heading={d.heading} supporting={d.supporting} />

      {/* ---------- terminal window ---------- */}
      <Reveal delay={0.06} className="mt-10 md:mt-12">
        <div ref={termRef} className="terminal hud-corners relative overflow-hidden">
          {/* title bar */}
          <div className="flex items-center gap-3 border-b border-hud-line-strong bg-white/[0.03] px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-hud/70" />
            </span>
            <span className="truncate font-hud text-[11px] tracking-[0.12em] text-ink-mute">
              {user}: ~/repositories
            </span>
            <span className="ml-auto flex flex-none items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hud hud-blink" />
              <span className="hud-label">Online</span>
            </span>
          </div>

          <div className="relative px-4 py-5 font-hud text-[12px] leading-relaxed md:px-6 md:py-6 md:text-[13px]">
            <motion.p {...line()}>
              <Prompt user={user} /> system --status
            </motion.p>
            <motion.p {...line()} className="mt-1 pl-4 text-ink-dim">
              <span className="text-emerald-300/90">●</span> ONLINE ·{' '}
              <a
                href={d.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-hud-bright underline-offset-4 hover:underline"
              >
                github.com/{d.github.username}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </motion.p>

            <motion.p {...line()} className="mt-4">
              <Prompt user={user} /> ls ./repositories
            </motion.p>

            <ul className="mt-2 space-y-1">
              {d.repos.map((r, i) => {
                const gh = r.links.find((l) => l.kind === 'github');
                const on = i === sel;
                return (
                  <motion.li key={r.index} {...line()}>
                    <a
                      href={gh.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setSel(i)}
                      onFocus={() => setSel(i)}
                      data-active={on || undefined}
                      className="terminal-row group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 px-3 py-2.5 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.8fr)_auto]"
                    >
                      <span className="text-hud">[{r.index}]</span>
                      <span className="truncate font-semibold text-ink">{slug(gh.href)}</span>
                      <span className="hidden truncate text-[11px] uppercase tracking-[0.12em] text-ink-mute md:block">
                        {r.category}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="h-4 w-4 text-ink-mute transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-hud-bright group-data-[active]:text-hud-bright"
                      />
                      <span className="sr-only"> — {r.category}, opens on GitHub in a new tab</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <motion.p {...line()} className="mt-4">
              <Prompt user={user} /> select --repository{' '}
              <span className="text-hud-bright">{slug(repo.links[0].href)}</span>
              <span aria-hidden className="terminal-caret" />
            </motion.p>

            {/* preview of the highlighted repository */}
            <motion.div {...line()} aria-live="polite" className="mt-3 border-l border-hud/50 pl-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-hud/80">{repo.name}</p>
              <p className="mt-1.5 max-w-3xl font-sans text-sm leading-relaxed text-ink-dim md:text-[15px]">
                {repo.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {repo.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-hud-line-strong px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-dim transition-colors hover:border-hud hover:text-ink"
                  >
                    {l.kind === 'github' ? <Github className="h-3.5 w-3.5" aria-hidden /> : <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}
                    {l.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={d.github.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub profile — opens in a new tab"
          className="hud-btn"
        >
          <Github className="h-4 w-4" aria-hidden />
          View GitHub
        </a>
        <span className="font-hud text-[11px] text-ink-mute">Select a repository to open it on GitHub.</span>
      </Reveal>

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

function Prompt({ user }) {
  return (
    <>
      <span className="text-emerald-300/90">{user}</span>
      <span className="text-ink-mute">:</span>
      <span className="text-hud">~$</span>
    </>
  );
}
