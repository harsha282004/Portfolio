'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { identity, navItems } from '@/lib/data/site';
import { handleAnchorClick } from '@/lib/utils/scrollToAnchor';

/**
 * Minimal sticky navigation shell.
 * Desktop: horizontal links. Mobile: compact menu button + overlay.
 * Links are placeholders that will scroll to future one-page sections.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#about');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Subtle active-section indicator based on scroll position.
  useEffect(() => {
    const ids = navItems
      .map((n) => n.href)
      .filter((h) => h.startsWith('#'))
      .map((h) => h.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref('#' + entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNav = (e, href) => {
    setOpen(false);
    handleAnchorClick(e, href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-hud-line-strong bg-void/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* HUD accent: a short lit segment on the header rule once scrolled */}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-40 -translate-x-1/2 hud-seam transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <nav className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6 md:h-20 md:px-10">
        <a
          href="#top"
          onClick={(e) => handleNav(e, '#top')}
          className="group flex items-center gap-2.5"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-hud shadow-[0_0_10px_var(--hud-glow)]"
          />
          <span className="font-display text-sm font-bold uppercase tracking-[0.28em] text-ink">
            {identity.wordmark}
          </span>
        </a>

        {/* Desktop links — game-menu style: the selected item carries a
            bracketed cursor that glides between entries. */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = activeHref === item.href;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNav(e, item.href)}
                    aria-current={active ? 'true' : undefined}
                    className={`group relative flex items-center px-3.5 py-2 font-hud text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${
                      active ? 'text-hud-bright' : 'text-ink-dim hover:text-ink'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-cursor"
                        aria-hidden
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="hud-corners absolute inset-0 bg-hud/[0.07] shadow-[inset_0_-1px_0_rgba(77,184,255,0.55)]"
                      />
                    )}
                    <span
                      aria-hidden
                      className={`absolute left-1 top-1/2 h-1 w-1 -translate-y-1/2 rotate-45 bg-hud transition-opacity duration-300 ${
                        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="#contact"
            onClick={(e) => handleNav(e, '#contact')}
            className="hud-sweep border border-hud-line-strong px-5 py-2 font-hud text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-dim transition-all duration-300 hover:border-hud hover:bg-hud/10 hover:text-hud-bright"
          >
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-hud-line-strong text-ink transition-colors hover:border-hud hover:text-hud-bright lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-40 bg-void px-6 lg:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 hud-grid" />
            <ul className="relative flex flex-col gap-2 pt-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNav(e, item.href)}
                    className="flex items-center gap-4 border-b border-hud-line-strong py-5 font-display text-3xl font-medium uppercase tracking-tight text-ink transition-colors hover:text-hud-bright"
                  >
                    <span className="font-hud text-[11px] tracking-[0.2em] text-hud">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
