'use client';

import Reveal from '../Reveal';

/**
 * HudHeading
 * The consistent "interface header" every section opens with:
 *   [ SEC // 03 ]  LOADOUT
 *   TECHNICAL SKILLS
 *   supporting line
 *
 * `index` is a positional section marker (01..11), not a statistic.
 */
export default function HudHeading({ index, label, heading, supporting, children }) {
  return (
    <header>
      <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {index && (
          <span className="hud-label flex items-center gap-2">
            <span className="hud-label-accent">SEC</span>
            <span className="text-ink-mute">//</span>
            <span className="hud-glow-text font-hud text-[11px] tracking-[0.2em]">{index}</span>
          </span>
        )}
        <span aria-hidden className="h-px w-8 bg-hud-line-strong sm:w-12" />
        <span className="hud-label hud-label-accent">{label}</span>
      </Reveal>

      {heading && (
        <Reveal as="h2" delay={0.06} depth className="hud-display mt-6 max-w-[22ch]">
          {heading}
        </Reveal>
      )}

      {supporting && (
        <Reveal
          as="p"
          delay={0.12}
          className="mt-5 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg"
        >
          {supporting}
        </Reveal>
      )}

      {children}
    </header>
  );
}
