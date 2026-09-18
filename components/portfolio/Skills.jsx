'use client';

import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { skills } from '@/lib/data/site';

/**
 * Skills — LOADOUT
 * Equipped technologies grouped by slot (Languages, Frontend, …). Every item
 * is always visible and factual: no bars, percentages, levels or rankings.
 * Hover/focus only lights the chip.
 */
export default function Skills() {
  return (
    <SectionShell id="skills" surface="void" grid="plain" scanlines>
      <HudHeading index="04" label={skills.eyebrow} heading={skills.heading} />

      <dl className="mt-10 md:mt-14">
        {skills.categories.map((cat, i) => (
          <Reveal key={cat.category} delay={0.05 * i}>
            <div className="group grid grid-cols-1 gap-5 border-t border-hud-line-strong py-7 last:border-b md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:gap-12 md:py-9">
              <dt className="flex items-baseline gap-3">
                <span className="font-hud text-[11px] text-hud opacity-70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-hud-bright">
                  {cat.category}
                </span>
              </dt>
              <dd className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    tabIndex={0}
                    className="cursor-default border border-hud-line-strong bg-white/[0.02] px-3.5 py-2 font-hud text-[11px] uppercase tracking-[0.1em] text-ink-dim outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-hud hover:bg-hud/10 hover:text-ink focus-visible:border-hud focus-visible:text-ink md:text-xs"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </SectionShell>
  );
}
