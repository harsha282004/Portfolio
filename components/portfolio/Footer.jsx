'use client';

import { Github, Linkedin, Mail, Phone, FileText } from 'lucide-react';
import Reveal from './Reveal';
import { identity, profile } from '@/lib/data/site';

const LINKS = [
  { label: 'GitHub', href: profile.github, icon: Github, external: true },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin, external: true },
  { label: 'Email', href: profile.emailHref, icon: Mail, external: false },
  { label: 'Phone', href: profile.phoneHref, icon: Phone, external: false },
  { label: 'Resume', href: '#resume', icon: FileText, external: false, anchor: true },
];

/**
 * Footer — the final frame of the portfolio. Minimal, dark (continues the
 * Contact section), with compact real links and a restrained copyright line.
 */
export default function Footer() {
  const onAnchor = (e, href) => {
    if (!href?.startsWith('#')) return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[#08080a] text-[#f5f3ee]">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-xl font-bold uppercase tracking-[0.16em]">
                {identity.fullName}
              </p>
              <p className="mt-3 text-sm text-[#8f8f97] md:text-base">
                {identity.headline}
              </p>
            </div>

            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
              {LINKS.map((l) => {
                const ext = l.external
                  ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${l.label} — opens in a new tab` }
                  : {};
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    {...ext}
                    onClick={l.anchor ? (e) => onAnchor(e, l.href) : undefined}
                    className="group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#9a9aa2] outline-none transition-colors duration-300 hover:text-white focus-visible:text-white"
                  >
                    <l.icon className="h-4 w-4 text-[#6cb6e6]" aria-hidden />
                    {l.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/35">© 2026 {identity.fullName}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">
              Designed &amp; built by M Harshavardhana
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
