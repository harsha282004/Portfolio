'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { Github, ArrowUpRight, ChevronDown, Image as ImageIcon } from 'lucide-react';
import Reveal from '../Reveal';

// Theme tokens for light vs dark (ORCA) project blocks.
const T = {
  light: {
    ph: 'border-neutral-900/12 bg-neutral-900/[0.02] text-neutral-400',
    grid: '#000000',
    node: 'border-neutral-900/15 bg-white text-neutral-800',
    conn: 'text-neutral-400',
    chip: 'border-neutral-900/15 text-neutral-500',
    tag: 'border-neutral-900/12 bg-white text-neutral-700 hover:border-[#3b5b7a] hover:text-neutral-900',
    label: 'text-neutral-400',
  },
  dark: {
    ph: 'border-white/12 bg-white/[0.03] text-white/40',
    grid: '#ffffff',
    node: 'border-white/15 bg-white/[0.04] text-[#cfe3f2]',
    conn: 'text-white/30',
    chip: 'border-white/15 text-white/50',
    tag: 'border-white/15 bg-white/[0.03] text-[#c9dcec] hover:border-[#6cb6e6] hover:text-white',
    label: 'text-white/40',
  },
};

/**
 * ProjectImage
 * Renders a real screenshot when `src` is set, otherwise an intentional,
 * professional placeholder (fine grid + icon + slot label). Lazy-loads images.
 */
export function ProjectImage({ src, alt, label, theme = 'light', aspect = '16 / 9', className = '' }) {
  const t = T[theme];
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border ${t.ph} ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        <Image src={src} alt={alt || label || 'Project image'} fill sizes="100vw" loading="lazy" className="object-cover" />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(to right, ${t.grid} 1px, transparent 1px), linear-gradient(to bottom, ${t.grid} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <ImageIcon className="h-7 w-7 opacity-60" strokeWidth={1.3} aria-hidden />
            {label && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">{label}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Connector({ theme }) {
  const t = T[theme];
  return (
    <div className={`flex flex-col items-center py-2 ${t.conn}`} aria-hidden>
      <span className="block h-5 w-px bg-current opacity-40" />
      <ChevronDown className="-mt-1 h-4 w-4" />
    </div>
  );
}

/**
 * Pipeline — elegant vertical technical flow (not a childish infographic).
 * Optional `inputs` render as a merged header that flows into `steps`.
 */
export function Pipeline({ inputs, steps, theme = 'light' }) {
  const t = T[theme];
  const Node = ({ children }) => (
    <div className={`min-w-[220px] rounded-md border px-5 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.14em] md:text-[13px] ${t.node}`}>
      {children}
    </div>
  );
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center">
      {inputs?.length > 0 && (
        <>
          <Reveal className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            {inputs.map((x, i) => (
              <Fragment key={x}>
                {i > 0 && <span className={`px-1 text-sm ${t.conn}`} aria-hidden>+</span>}
                <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${t.chip}`}>{x}</span>
              </Fragment>
            ))}
          </Reveal>
          <Connector theme={theme} />
        </>
      )}
      {steps.map((s, i) => (
        <Fragment key={s}>
          {i > 0 && <Connector theme={theme} />}
          <Reveal delay={i * 0.05} className="flex w-full justify-center">
            <Node>{s}</Node>
          </Reveal>
        </Fragment>
      ))}
    </div>
  );
}

/** External project links (GitHub / Live Demo), safely opened in a new tab. */
export function ProjectLinks({ links, theme = 'light' }) {
  const dark = theme === 'dark';
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((l) => {
        const isGh = l.kind === 'github';
        const base =
          'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300';
        const style = isGh
          ? dark
            ? 'bg-white text-neutral-900 hover:-translate-y-0.5'
            : 'bg-neutral-900 text-[#faf9f6] hover:-translate-y-0.5'
          : dark
            ? 'border border-white/25 text-white hover:bg-white/10'
            : 'border border-neutral-900/20 text-neutral-900 hover:bg-neutral-900/5';
        const Icon = isGh ? Github : ArrowUpRight;
        return (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${l.label} — opens in a new tab`}
            className={`${base} ${style}`}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {l.label}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        );
      })}
    </div>
  );
}

/** Non-ranked technology tags (no proficiency, no percentages). */
export function TechTags({ items, theme = 'light', label = 'Tech Stack' }) {
  const t = T[theme];
  if (!items?.length) return null;
  return (
    <div>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${t.label}`}>{label}</p>
      <ul className="mt-4 flex flex-wrap gap-2.5">
        {items.map((x) => (
          <li
            key={x}
            tabIndex={0}
            className={`cursor-default rounded-full border px-3.5 py-1.5 text-[13px] outline-none transition-all duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 ${t.tag}`}
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Bullet list for a project's technical approach / concepts. */
export function BulletList({ items, theme = 'light', label }) {
  const t = T[theme];
  const text = theme === 'dark' ? 'text-white/75' : 'text-neutral-700';
  const accent = theme === 'dark' ? 'text-[#6cb6e6]' : 'text-[#3b5b7a]';
  return (
    <div>
      {label && (
        <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${t.label}`}>{label}</p>
      )}
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className={`flex gap-3 text-[15px] leading-relaxed md:text-base ${text}`}>
            <span className={`mt-2 h-px w-4 flex-none ${accent}`} style={{ backgroundColor: 'currentColor' }} aria-hidden />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
