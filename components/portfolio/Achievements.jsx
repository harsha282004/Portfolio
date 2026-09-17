'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import { achievements } from '@/lib/data/site';

/**
 * Achievements
 * A dark editorial timeline (contrast after the light Projects section).
 * Year -> Title -> Description reveal in a staggered sequence while an accent
 * rail draws on scroll. No trophies, badges, ranks or invented claims.
 */
export default function Achievements() {
  const railRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 78%', 'end 68%'],
  });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScaleY = prefersReduced ? 1 : drawn;

  return (
    <section
      id="achievements"
      className="relative w-full overflow-hidden bg-[#0b0b0d] text-[#f5f3ee]"
    >
      {/* light Projects environment receding into the dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55vh]"
        style={{
          background:
            'linear-gradient(to bottom, #faf9f6 0%, rgba(250,249,246,0.5) 24%, rgba(11,11,13,0) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-36 pt-[42vh] md:px-10 md:pb-44">
        <Reveal as="p" className="about-eyebrow">
          <span className="mr-3 inline-block h-px w-8 align-middle bg-[#86a5cc]" />
          {achievements.eyebrow}
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-8 font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
        >
          {achievements.heading}
        </Reveal>
        <Reveal
          as="p"
          delay={0.12}
          className="mt-6 max-w-2xl text-base leading-relaxed text-[#8f8f97] md:text-lg"
        >
          {achievements.supporting}
        </Reveal>

        {/* Timeline */}
        <div ref={railRef} className="relative mt-20 md:mt-28">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/12 md:left-[9px]">
            <motion.div
              style={{ scaleY: lineScaleY }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#86a5cc] to-[#5f7fa6]"
            />
          </div>

          <ol className="space-y-20 md:space-y-28">
            {achievements.items.map((item) => (
              <li
                key={item.id}
                className="relative pl-12 md:grid md:grid-cols-[140px_1fr] md:gap-12 md:pl-24"
              >
                <span className="absolute left-0 top-1.5 block h-4 w-4 rounded-full bg-[#86a5cc] ring-8 ring-[#0b0b0d]" />

                <Reveal className="font-display text-xl font-semibold tracking-wide text-[#86a5cc] md:text-2xl">
                  {item.year}
                </Reveal>

                <div className="mt-4 md:mt-0">
                  <Reveal
                    as="h3"
                    delay={0.08}
                    className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-[#f5f3ee] md:text-4xl"
                  >
                    {item.title}
                  </Reveal>
                  <Reveal
                    as="p"
                    delay={0.16}
                    className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#8f8f97] md:text-base"
                  >
                    {item.description}
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
