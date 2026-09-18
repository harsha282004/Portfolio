'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { identity } from '@/lib/data/site';

const EASE = [0.22, 1, 0.36, 1];

// 12 radial-grid spokes, rounded so server and client render identical markup.
const SPOKES = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6;
  const p = (r, f) => +(100 + r * f(a)).toFixed(2);
  return [p(30, Math.cos), p(30, Math.sin), p(99, Math.cos), p(99, Math.sin)];
});

/**
 * HeroPortrait — the character-profile centrepiece.
 *
 * The real photograph is never recoloured where the face is. It sits in a
 * circular capsule over a light plate and is blended with `multiply`: the
 * plate is pure white at the centre (face untouched) and cools to blue towards
 * the rim, so only the photo's white studio background turns into blue light.
 *
 * Everything decorative (halo, radial grid, rings, markers) sits BEHIND or
 * AROUND the capsule — nothing is drawn across the face except a faint,
 * occasional scan line. Size comes from the `--portrait` CSS variable.
 */
export default function HeroPortrait({ x, y, scale, rotateX, rotateY, delay = 0.4 }) {
  // Identification sequence: scanning -> profile locked (interface state only).
  const reduced = useReducedMotion();
  const [locked, setLocked] = useState(false);
  useEffect(() => {
    if (reduced) return setLocked(true);
    const t = setTimeout(() => setLocked(true), (delay + 2.1) * 1000);
    return () => clearTimeout(t);
  }, [reduced, delay]);

  return (
    <motion.div
      style={{ x, y, scale, width: 'var(--portrait)', height: 'var(--portrait)' }}
      className="relative z-10 flex-none"
    >
      {/* ---------- rings & light, tilted slightly with the pointer ---------- */}
      <motion.div
        aria-hidden
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 1.6, ease: EASE }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="hero-halo" />

        {/* radial grid */}
        <svg viewBox="0 0 200 200" className="hero-radial absolute" style={{ inset: '-38%' }}>
          {[34, 56, 78, 99].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeWidth="0.35" />
          ))}
          {SPOKES.map(([x1, y1, x2, y2], i) => {
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.3"
              />
            );
          })}
        </svg>

        {/* energy ring: a light that travels round a faint track */}
        <div className="hero-ring-track absolute" style={{ inset: '-9%' }} />
        <div className="hero-ring-energy hero-spin absolute" style={{ inset: '-9%' }} />

        {/* segmented ring, slow */}
        <svg viewBox="0 0 200 200" className="hero-spin-slow absolute text-hud" style={{ inset: '-19%' }}>
          <circle
            cx="100"
            cy="100"
            r="99"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            pathLength="100"
            strokeDasharray="18 4 2 4 30 6 2 6 22 6"
          />
        </svg>

        {/* tick ring, counter-rotating */}
        <svg viewBox="0 0 200 200" className="hero-spin-rev absolute text-hud-bright" style={{ inset: '-27%' }}>
          <circle
            cx="100"
            cy="100"
            r="99"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
            pathLength="360"
            strokeDasharray="0.5 4.5"
          />
        </svg>

        {/* scan arc: fills once while the profile is identified */}
        <svg viewBox="0 0 200 200" className="absolute -rotate-90" style={{ inset: '-4%' }}>
          <motion.circle
            cx="100"
            cy="100"
            r="99"
            fill="none"
            stroke="rgb(var(--accent-bright-rgb))"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: 1, opacity: locked ? 0.25 : 0.9 }}
            transition={{
              pathLength: { delay: delay + 0.5, duration: 1.6, ease: 'easeInOut' },
              opacity: { duration: 0.8 },
            }}
          />
        </svg>

        {/* status indicators near the horizontal axis (clear of the name) */}
        {[70, 110, 250, 290].map((a) => (
          <span
            key={a}
            className="hero-status-dot absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${a}deg) translateY(calc(var(--portrait) * -0.77)) rotate(-${a}deg)` }}
          />
        ))}

        {/* axis readouts (interface state only) */}
        <div className="absolute top-1/2 hidden -translate-y-1/2 items-center gap-2 lg:flex" style={{ right: '140%' }}>
          <span className="text-right">
            <span className="hud-label block whitespace-nowrap text-[9px] text-hud/80">Player ID</span>
            <span className="mt-1 block whitespace-nowrap font-hud text-[10px] uppercase tracking-[0.2em] text-ink-dim">
              {identity.fullName}
            </span>
          </span>
          <span className="h-px w-6 bg-hud/50" />
          <span className="h-1 w-1 rotate-45 bg-hud" />
        </div>
        <div className="absolute top-1/2 hidden -translate-y-1/2 items-center gap-2 lg:flex" style={{ left: '140%' }}>
          <span className="h-1 w-1 rotate-45 bg-hud" />
          <span className="h-px w-6 bg-hud/50" />
          <span>
            <span className="hud-label block whitespace-nowrap text-[9px] text-hud/80">
              {locked ? 'Scan Complete' : 'Scanning…'}
            </span>
            <span
              className={`mt-1 flex items-center gap-1.5 whitespace-nowrap font-hud text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                locked ? 'text-hud-bright' : 'text-ink-mute'
              }`}
            >
              <Lock aria-hidden className="h-2.5 w-2.5" />
              {locked ? 'Profile Locked' : 'Acquiring'}
            </span>
          </span>
        </div>
      </motion.div>

      {/* targeting brackets: close in from the sides and lock on */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.25 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 1.5, duration: 0.7, ease: EASE }}
        className="hero-lock pointer-events-none absolute"
        data-locked={locked || undefined}
        style={{ inset: '6% -31%' }}
      >
        <span /><span /><span /><span />
      </motion.div>

      {/* ---------- the photograph (floats gently) ---------- */}
      <div className="hero-float absolute inset-0">
        <motion.div
          initial={{ clipPath: 'circle(0% at 50% 45%)' }}
          animate={{ clipPath: 'circle(75% at 50% 45%)' }}
          transition={{ delay: delay + 0.35, duration: 1.3, ease: EASE }}
          className="hero-capsule absolute inset-0 overflow-hidden rounded-full"
        >
          <div className="hero-capsule-plate absolute inset-0" />
          <Image
            src={identity.photo.src}
            alt={identity.photo.alt}
            fill
            priority
            sizes="(max-width: 768px) 66vw, 380px"
            className="hero-capsule-photo select-none"
          />
          <div aria-hidden className="hero-capsule-scanlines absolute inset-0" />
          <div aria-hidden className="hero-capsule-scan absolute inset-x-0" />
          <div aria-hidden className="hero-capsule-vignette absolute inset-0" />
        </motion.div>

        {/* rim light + outline (outside the clip so the glow can spill) */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.9, duration: 1.2 }}
          className="hero-capsule-rim pointer-events-none absolute inset-0 rounded-full"
        />
      </div>
    </motion.div>
  );
}
