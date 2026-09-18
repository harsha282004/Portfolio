'use client';

import { motion, useTransform } from 'framer-motion';
import { heroHud } from '@/lib/data/site';

const EASE = [0.22, 1, 0.36, 1];

/**
 * One HUD readout: a thin rule with corner brackets, a status header and a
 * `>` list. No boxed card surface — just light on glass.
 */
function Panel({ title, items, index, side = 'left', delay, numbered = false, accentLast = false, className = '' }) {
  const right = side === 'right';
  return (
    <motion.div
      initial={{ opacity: 0, x: right ? 18 : -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 1, ease: EASE }}
      className={`hero-panel ${right ? 'hero-panel-right text-right' : ''} ${className}`}
    >
      <div className={`flex items-center gap-2.5 ${right ? 'flex-row-reverse' : ''}`}>
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hud shadow-[0_0_8px_var(--hud-glow)] hud-blink" />
        <span className="hud-label hud-label-accent">{title}</span>
        <span aria-hidden className="h-px flex-1 bg-hud-line-strong" />
        <span aria-hidden className="hud-label text-[9px]">{index}</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {items.map((it, i) => {
          const accent = accentLast && i === items.length - 1;
          return (
            <li
              key={it}
              className={`flex items-center gap-2 font-hud text-[11px] uppercase tracking-[0.18em] ${
                right ? 'flex-row-reverse' : ''
              } ${accent ? 'hud-glow-text font-semibold' : 'text-ink-dim'}`}
            >
              <span aria-hidden className="text-hud/80">
                {numbered ? String(i + 1).padStart(2, '0') : right ? '<' : '>'}
              </span>
              {it}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/**
 * HeroHUD — the interface chrome around the profile.
 * Desktop: four corner readouts + a targeting frame + edge rails.
 * Below lg the side readouts give way to a single compact status strip so the
 * portrait and name keep the stage (the domain chips live in Hero itself).
 */
export default function HeroHUD({ px, py, opacity }) {
  const x = useTransform(px, [-0.5, 0.5], [12, -12]);
  const y = useTransform(py, [-0.5, 0.5], [8, -8]);
  const { profile, status, focus, values } = heroHud;

  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-30">
      {/* targeting frame */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: EASE }}
        className="absolute inset-3 md:inset-6"
      >
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-hud/40 md:h-8 md:w-8" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-hud/40 md:h-8 md:w-8" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-hud/40 md:h-8 md:w-8" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-hud/40 md:h-8 md:w-8" />

        {/* edge rails */}
        <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} className="block h-px bg-hud/30" style={{ width: i % 5 === 0 ? 14 : 6 }} />
          ))}
        </div>
        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-2 lg:flex">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} className="block h-px bg-hud/30" style={{ width: i % 5 === 0 ? 14 : 6 }} />
          ))}
        </div>
      </motion.div>

      {/* ---------- desktop readouts ---------- */}
      <motion.div style={{ x, y }} className="absolute inset-0 hidden lg:block">
        <Panel {...profile} index="01" delay={0.7} className="absolute left-10 top-[24%] xl:left-14" />
        <Panel
          {...status}
          index="02"
          side="right"
          accentLast
          delay={0.8}
          className="absolute right-10 top-[24%] xl:right-14"
        />
        <Panel {...focus} index="03" delay={0.95} className="absolute bottom-12 left-10 hidden xl:left-14 xl:block" />
        <Panel
          {...values}
          index="04"
          side="right"
          numbered
          delay={1.05}
          className="absolute bottom-12 right-10 hidden xl:right-14 xl:block"
        />
      </motion.div>

      {/* ---------- compact status strip (mobile / tablet) ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
        className="absolute inset-x-6 top-[4.75rem] flex items-center gap-3 md:inset-x-10 md:top-24 lg:hidden"
      >
        <span className="hud-label hud-label-accent">{profile.title}</span>
        <span aria-hidden className="h-px flex-1 bg-hud-line-strong" />
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hud hud-blink" />
        <span className="hud-label">{status.title}</span>
      </motion.div>
    </motion.div>
  );
}
