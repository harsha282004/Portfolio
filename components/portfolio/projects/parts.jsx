'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { Github, ArrowUpRight, ChevronDown, Image as ImageIcon } from 'lucide-react';
import Reveal from '../Reveal';

/* The interface is a single dark HUD theme now. `theme` is still accepted so
   callers can keep their existing props, but it no longer branches styling. */

/**
 * ProjectImage
 * A framed HUD viewport. Renders a real screenshot when `src` is set, and
 * otherwise an honest empty display slot (grid + icon + label) — never a fake
 * mockup of a screen that does not exist.
 */
export function ProjectImage({
  src,
  alt,
  label,
  aspect = '16 / 9',
  scanlines = true,
  sizes = '100vw',
  className = '',
}) {
  return (
    <div
      className={`hud-corners group relative w-full overflow-hidden border border-hud-line-strong bg-white/[0.015] ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt || label || 'Project image'}
            fill
            sizes={sizes}
            loading="lazy"
            className="object-contain"
          />
          {/* scan overlay keeps screenshots inside the interface language */}
          {scanlines && (
            <div aria-hidden className="pointer-events-none absolute inset-0 hud-scanlines opacity-30" />
          )}
        </>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 hud-grid" />
          <div aria-hidden className="pointer-events-none absolute inset-0 hud-scanlines opacity-40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-mute">
            <ImageIcon className="h-7 w-7 opacity-60" strokeWidth={1.3} aria-hidden />
            {label && <span className="hud-label">{label}</span>}
          </div>
        </>
      )}

      {/* corner readout */}
      {label && src && (
        <span className="absolute left-3 top-3 border border-hud-line-strong bg-void/70 px-2 py-1 font-hud text-[10px] uppercase tracking-[0.2em] text-ink-dim backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}

function Connector() {
  return (
    <div className="flex flex-col items-center py-1.5 text-hud" aria-hidden>
      <span className="block h-5 w-px bg-current opacity-50" />
      <ChevronDown className="-mt-1 h-4 w-4 opacity-70" />
    </div>
  );
}

/**
 * Pipeline — vertical technical flow. Optional `inputs` render as a merged
 * header that feeds into `steps`.
 */
export function Pipeline({ inputs, steps }) {
  const Node = ({ children }) => (
    <div className="hud-panel min-w-[220px] px-5 py-3 text-center font-hud text-[11px] font-semibold uppercase tracking-[0.14em] text-ink md:text-xs">
      {children}
    </div>
  );
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center">
      {inputs?.length > 0 && (
        <>
          <Reveal className="flex flex-wrap items-center justify-center gap-2">
            {inputs.map((x, i) => (
              <Fragment key={x}>
                {i > 0 && (
                  <span className="px-1 text-sm text-hud" aria-hidden>
                    +
                  </span>
                )}
                <span className="border border-hud-line-strong px-3 py-1 font-hud text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-mute">
                  {x}
                </span>
              </Fragment>
            ))}
          </Reveal>
          <Connector />
        </>
      )}
      {steps.map((s, i) => (
        <Fragment key={s}>
          {i > 0 && <Connector />}
          <Reveal delay={i * 0.05} className="flex w-full justify-center">
            <Node>{s}</Node>
          </Reveal>
        </Fragment>
      ))}
    </div>
  );
}

/** External project links (GitHub / Live Demo), safely opened in a new tab. */
export function ProjectLinks({ links }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((l) => {
        const isGh = l.kind === 'github';
        const Icon = isGh ? Github : ArrowUpRight;
        return (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${l.label} — opens in a new tab`}
            className={isGh ? 'hud-btn' : 'hud-btn-ghost'}
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
export function TechTags({ items, label = 'Tech Stack' }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="hud-label">{label}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((x) => (
          <li
            key={x}
            tabIndex={0}
            className="cursor-default border border-hud-line-strong bg-white/[0.02] px-3 py-1.5 font-hud text-[11px] uppercase tracking-[0.1em] text-ink-dim outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-hud hover:bg-hud/10 hover:text-ink focus-visible:-translate-y-0.5 focus-visible:border-hud"
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Bullet list for a project's technical approach / concepts. */
export function BulletList({ items, label }) {
  return (
    <div>
      {label && <p className="hud-label">{label}</p>}
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-ink-dim md:text-base">
            <span aria-hidden className="mt-2.5 h-px w-4 flex-none bg-hud opacity-70" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
