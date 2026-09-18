'use client';

import { Check } from 'lucide-react';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { achievements } from '@/lib/data/site';

/**
 * Achievements — ACHIEVEMENTS UNLOCKED
 * An unlock interface built only from the real entries in `achievements.items`.
 * "Unlocked" reflects that the listed thing genuinely happened — there are no
 * invented badges, ranks, prizes or scores.
 */
export default function Achievements() {
  return (
    <SectionShell id="achievements" surface="deep" grid="plain" glow="center">
      <HudHeading
        index="07"
        label={achievements.eyebrow}
        heading={achievements.heading}
        supporting={achievements.supporting}
      />

      <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
        {achievements.items.map((item, i) => (
          <li key={item.id}>
            <Reveal delay={0.08 * i} depth>
              <article className="hud-corners hud-panel hud-panel-hover group relative h-full p-6 md:p-8">
                {/* unlock header */}
                <div className="flex items-center justify-between gap-4">
                  <span className="hud-label hud-label-accent flex items-center gap-2">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                    Unlocked
                  </span>
                  <span className="font-display text-xl font-bold tracking-wide hud-glow-text">
                    {item.year}
                  </span>
                </div>

                <span
                  aria-hidden
                  className="mt-5 block h-px w-full bg-gradient-to-r from-hud/60 via-hud/10 to-transparent"
                />

                <h3 className="mt-5 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-ink md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-dim md:text-base">
                  {item.description}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
