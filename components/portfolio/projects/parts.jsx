'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import {
  Github,
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';

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

/** '1901 / 837' -> 2.271 (grid fr weight). */
function aspectRatio(aspect) {
  const [w, h] = aspect.split('/').map(Number);
  return (w / h).toFixed(3);
}

/**
 * ImageSequence — images shown as a left-to-right process (Before -> Change ->
 * After). Column widths follow each image's native aspect ratio so all frames
 * share one height without cropping; stacks with downward arrows on mobile.
 */
export function ImageSequence({ images, sizes = '(max-width: 640px) 100vw, 30vw' }) {
  return (
    <div
      className="grid items-center gap-3 sm:[grid-template-columns:var(--seq-cols)]"
      style={{ '--seq-cols': images.map((im) => `${aspectRatio(im.aspect)}fr`).join(' auto ') }}
    >
      {images.map((im, i) => (
        <Fragment key={im.label}>
          {i > 0 && (
            <ArrowRight aria-hidden className="mx-auto h-4 w-4 rotate-90 text-hud opacity-70 sm:rotate-0" />
          )}
          <ProjectImage src={im.src} label={im.label} alt={im.alt} aspect={im.aspect} sizes={sizes} />
        </Fragment>
      ))}
    </div>
  );
}

/** FlowSteps — a compact horizontal pipeline (wraps on narrow screens). */
export function FlowSteps({ steps, label }) {
  return (
    <div>
      {label && <p className="hud-label">{label}</p>}
      <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2.5">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5 flex-none text-hud opacity-70" />}
            <span className="border border-hud/30 bg-hud/[0.06] px-2.5 py-1.5 font-hud text-[10px] font-semibold uppercase tracking-[0.12em] text-ink md:text-[11px]">
              {s}
            </span>
          </li>
        ))}
      </ol>
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
