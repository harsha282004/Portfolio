'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { achievements } from '@/lib/data/site';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Achievements — ACHIEVEMENT UNLOCKED
 * Built only from the real entries in `achievements.items`. Each badge plays a
 * one-time unlock sequence when it first scrolls into view (locked -> decrypt
 * bar -> unlocked). "Unlocked" reflects that the thing genuinely happened —
 * there are no invented awards, ranks, prizes or scores.
 */
export default function Achievements() {
  return (
    <SectionShell id="achievements" surface="deep" grid="plain" glow="center">
      <HudHeading
        index="06"
        label={achievements.eyebrow}
        heading={achievements.heading}
        supporting={achievements.supporting}
      />

      <ul className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
        {achievements.items.map((item, i) => (
          <li key={item.id}>
            <AchievementBadge item={item} delay={0.25 * i} />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

function AchievementBadge({ item, delay }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (reduced) {
      setUnlocked(true);
      return;
    }
    if (!inView) return;
    const t = setTimeout(() => setUnlocked(true), (delay + 1.05) * 1000);
    return () => clearTimeout(t);
  }, [inView, reduced, delay]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
      data-unlocked={unlocked || undefined}
      className="achv hud-corners hud-panel relative h-full overflow-hidden"
    >
      <span aria-hidden className="achv-scan" />

      {/* status bar */}
      <div className="flex items-center justify-between gap-3 border-b border-hud-line-strong bg-white/[0.02] px-5 py-3 md:px-6">
        <span className="hud-label flex items-center gap-2 text-ink-mute transition-colors group-data-[unlocked]:text-hud">
          {unlocked ? (
            <>
              <Check aria-hidden className="h-3.5 w-3.5 text-hud" />
              <span className="text-hud">Achievement Unlocked</span>
            </>
          ) : (
            <>
              <Lock aria-hidden className="h-3 w-3" />
              Decrypting…
            </>
          )}
        </span>
        <span className="font-display text-lg font-bold tracking-wide hud-glow-text">{item.year}</span>
      </div>
      {/* decrypt bar (animation only — not a measurement) */}
      <span aria-hidden className="block h-px w-full bg-hud-line">
        <motion.span
          className="block h-px origin-left bg-hud shadow-[0_0_8px_var(--hud-glow)]"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : undefined}
          transition={{ duration: reduced ? 0 : 0.9, delay: delay + 0.15, ease: 'easeInOut' }}
        />
      </span>

      <div className="flex gap-5 p-5 md:gap-7 md:p-7">
        {/* badge emblem */}
        <div className="achv-emblem relative h-20 w-20 flex-none md:h-24 md:w-24">
          <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full">
            <polygon
              points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5"
              className="achv-hex-outer"
              fill="none"
              strokeWidth="1.5"
            />
            <polygon
              points="50,14 81.5,32 81.5,68 50,86 18.5,68 18.5,32"
              className="achv-hex-inner"
              strokeWidth="1"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center">
            {unlocked ? (
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              >
                <Check aria-hidden className="h-8 w-8 text-hud-bright md:h-9 md:w-9" strokeWidth={2.4} />
              </motion.span>
            ) : (
              <Lock aria-hidden className="h-6 w-6 text-ink-mute" />
            )}
          </span>
        </div>

        <div className="min-w-0">
          {item.tag && (
            <p className="font-hud text-[10px] font-semibold uppercase tracking-[0.2em] text-hud-bright">
              {item.tag}
            </p>
          )}
          <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink md:text-2xl">
            {item.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-dim">{item.description}</p>
        </div>
      </div>
    </motion.article>
  );
}
