'use client';

import Reveal from './Reveal';
import { skills } from '@/lib/data/site';

/**
 * Technical Skills
 * Resume facts transformed into an editorial, interactive system.
 * No percentages, no ranking. Every skill is always visible (accessible on
 * mobile); hover only enhances. Category rows reveal in a staggered sequence.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-[#08080a] text-[#f5f3ee]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-40 pt-24 md:px-10 md:pb-52 md:pt-32">
        <Reveal as="p" className="about-eyebrow">
          <span className="mr-3 inline-block h-px w-8 align-middle bg-[#86a5cc]" />
          {skills.eyebrow}
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-8 font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
        >
          {skills.heading}
        </Reveal>

        <dl className="mt-16 md:mt-24">
          {skills.categories.map((cat, i) => (
            <Reveal key={cat.category} delay={0.05 * i}>
              <div className="group grid grid-cols-1 gap-5 border-t border-white/10 py-8 md:grid-cols-[260px_minmax(0,1fr)] md:gap-12 md:py-10">
                <dt className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-[#86a5cc]">
                  {cat.category}
                </dt>
                <dd className="flex flex-wrap gap-2.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      tabIndex={0}
                      className="cursor-default rounded-full border border-white/12 bg-white/[0.02] px-4 py-2 text-[13px] text-[#c9c9cf] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#86a5cc] hover:text-white focus-visible:border-[#86a5cc] focus-visible:text-white group-hover:border-white/25 md:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
