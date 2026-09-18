'use client';

import { Github, Linkedin, Mail, Phone, FileText } from 'lucide-react';
import Reveal from './Reveal';
import { identity, profile, hud } from '@/lib/data/site';
import { handleAnchorClick } from '@/lib/utils/scrollToAnchor';

const LINKS = [
  { label: 'GitHub', href: profile.github, icon: Github, external: true },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin, external: true },
  { label: 'Email', href: profile.emailHref, icon: Mail, external: false },
  { label: 'Phone', href: profile.phoneHref, icon: Phone, external: false },
  { label: 'Resume', href: '#resume', icon: FileText, external: false, anchor: true },
];

/**
 * Footer — the closing status bar of the interface.
 */
export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-deep">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px hud-seam opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hud-grid" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 py-14 md:px-10 md:py-16">
        <Reveal>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-hud shadow-[0_0_10px_var(--hud-glow)]"
                />
                <p className="font-display text-xl font-bold uppercase tracking-[0.16em] text-ink">
                  {identity.fullName}
                </p>
              </div>
              <p className="mt-3 font-hud text-[12px] uppercase tracking-[0.14em] text-ink-dim md:text-[13px]">
                {identity.headline}
              </p>
            </div>

            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
              {LINKS.map((l) => {
                const ext = l.external
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      'aria-label': `${l.label} — opens in a new tab`,
                    }
                  : {};
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    {...ext}
                    onClick={l.anchor ? (e) => handleAnchorClick(e, l.href) : undefined}
                    className="group inline-flex items-center gap-2 font-hud text-[11px] font-medium uppercase tracking-[0.16em] text-ink-dim outline-none transition-colors duration-300 hover:text-hud-bright focus-visible:text-hud-bright"
                  >
                    <l.icon className="h-4 w-4 text-hud" aria-hidden />
                    {l.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-hud-line-strong pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="hud-label">© 2026 {identity.fullName}</p>
            <p className="hud-label flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-hud hud-blink" aria-hidden />
              {hud.status}
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
