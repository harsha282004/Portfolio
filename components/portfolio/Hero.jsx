'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Portrait from './Portrait';
import ScrollIndicator from './ScrollIndicator';
import { identity, hud } from '@/lib/data/site';
import { handleAnchorClick } from '@/lib/utils/scrollToAnchor';

/**
 * Hero — the game main menu.
 *
 * Layer order (back to front):
 *   void + vignette -> technical grid -> scan lines -> portrait light pool
 *   -> HUD chrome -> HARSHA / PORTRAIT / VARDHANA -> supporting text + controls
 *
 * The portrait photograph has a studio-white background, so instead of keying
 * it out (which would damage the hair edges) it sits inside a cinematic light
 * pool: the white blends into the lit area, which falls off into the void.
 *
 * Two motion sources drive the composition and are composed per layer:
 *   - scroll: the words split apart, the portrait recedes, the hero fades
 *   - pointer: layered parallax, strongest on the portrait
 * Both collapse to static under prefers-reduced-motion.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* ---------------- scroll-driven cinematic ---------------- */
  const split = prefersReduced ? 0 : 150;
  const harshaScrollX = useTransform(scrollYProgress, [0, 1], [0, -split]);
  const vardhanaScrollX = useTransform(scrollYProgress, [0, 1], [0, split]);
  const wordY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -40]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 0.9]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 50]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const poolScale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 1.12]);

  /* ---------------- pointer-driven parallax ---------------- */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 90, damping: 20, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  // Depth multipliers (px): the further forward the layer, the more it travels.
  const r = (n) => (prefersReduced ? [0, 0] : [-n, n]);
  const IN = [-0.5, 0.5];

  const gridX = useTransform(sx, IN, r(10));
  const gridY = useTransform(sy, IN, r(8));
  const hudX = useTransform(sx, IN, r(16));
  const hudY = useTransform(sy, IN, r(12));
  const wordsX = useTransform(sx, IN, r(22));
  const wordsY = useTransform(sy, IN, r(14));
  const portraitX = useTransform(sx, IN, r(38));
  const portraitY = useTransform(sy, IN, r(24));

  // Compose scroll + pointer on the shared axes.
  const harshaX = useTransform([harshaScrollX, wordsX], ([a, b]) => a + b);
  const vardhanaX = useTransform([vardhanaScrollX, wordsX], ([a, b]) => a + b);
  const wordsTotalY = useTransform([wordY, wordsY], ([a, b]) => a + b);

  const onPointerMove = (e) => {
    if (prefersReduced) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section id="top" ref={sectionRef} className="relative h-[185vh] w-full bg-void">
      <div
        ref={stageRef}
        onMouseMove={onPointerMove}
        onMouseLeave={onPointerLeave}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* ---------- atmosphere: technical grid (parallax) ---------- */}
        <motion.div
          aria-hidden
          style={{ x: gridX, y: gridY }}
          className="pointer-events-none absolute -inset-16 hud-grid"
        />

        {/* ---------- atmosphere: scan lines ---------- */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hud-scanlines opacity-40" />

        {/* ---------- portrait light pool ----------
            Near-white at the core so the photograph's studio background melts
            into it, cooling to blue and then to void at the edges. */}
        <motion.div
          aria-hidden
          style={{
            scale: poolScale,
            x: portraitX,
            y: portraitY,
            width: 'min(1150px, 96vw)',
            height: 'min(980px, 88vh)',
            background:
              'radial-gradient(ellipse at center, rgba(238,246,255,0.92) 0%, rgba(230,242,255,0.84) 20%, rgba(206,231,255,0.58) 34%, rgba(160,208,255,0.30) 48%, rgba(96,178,240,0.14) 64%, rgba(5,7,12,0) 86%)',
          }}
          className="pointer-events-none absolute left-1/2 top-[47%] z-0 -translate-x-1/2 -translate-y-1/2"
        />

        {/* ---------- vignette: pulls the eye to the centre ---------- */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(75% 65% at 50% 47%, rgba(5,7,12,0) 45%, rgba(5,7,12,0.55) 78%, rgba(5,7,12,0.92) 100%)',
          }}
        />

        {/* ---------- grain: kills banding in the dark falloff ---------- */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] hud-noise" />

        {/* ---------- HUD chrome ---------- */}
        <motion.div
          aria-hidden
          style={{ x: hudX, y: hudY, opacity: contentOpacity }}
          className="pointer-events-none absolute inset-0 z-30"
        >
          {/* targeting frame */}
          <div className="absolute inset-5 md:inset-8">
            <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-hud-line-strong md:h-7 md:w-7" />
            <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-hud-line-strong md:h-7 md:w-7" />
            <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-hud-line-strong md:h-7 md:w-7" />
            <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-hud-line-strong md:h-7 md:w-7" />
          </div>

          {/* top-left: profile tag */}
          <div className="absolute left-8 top-24 hidden items-center gap-3 md:flex lg:left-12">
            <span className="hud-label hud-label-accent">{hud.profileTag}</span>
            <span className="h-px w-10 bg-hud-line-strong" />
          </div>

          {/* top-right: system status */}
          <div className="absolute right-8 top-24 hidden items-center gap-2.5 md:flex lg:right-12">
            <span className="h-1.5 w-1.5 rounded-full bg-hud hud-blink" />
            <span className="hud-label">{hud.status}</span>
          </div>

          {/* bottom-left: intro marker + domain list */}
          <div className="absolute bottom-10 left-8 hidden md:block lg:left-12">
            <span className="hud-label hud-label-accent">{hud.intro}</span>
            <ul className="mt-3 space-y-1.5">
              {hud.domains.map((d) => (
                <li key={d} className="hud-label flex items-center gap-2">
                  <span className="h-px w-3 bg-hud opacity-60" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* right edge: coordinate ticks */}
          <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-2 lg:flex lg:right-12">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="block h-px bg-hud-line-strong"
                style={{ width: i % 3 === 0 ? 18 : 8 }}
              />
            ))}
          </div>
        </motion.div>

        {/* ---------- main composition ---------- */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6"
        >
          {/* ======== DESKTOP CLUSTER ========
              3-column grid keeps HARSHA · PORTRAIT · VARDHANA inside the
              viewport at every width. */}
          <div
            className="relative isolate hidden w-full max-w-[1700px] items-center md:grid"
            style={{ gridTemplateColumns: '1fr auto 1fr' }}
          >
            <motion.span
              style={{ x: harshaX, y: wordsTotalY }}
              className="hero-word z-10 justify-self-end whitespace-nowrap"
            >
              {identity.firstName}
            </motion.span>

            <motion.div
              style={{ scale: photoScale, x: portraitX, y: portraitY }}
              className="relative z-20 mx-[-2.8vw] justify-self-center"
            >
              <Portrait imgClassName="h-auto w-[clamp(230px,25vw,430px)]" />
            </motion.div>

            <motion.span
              style={{ x: vardhanaX, y: wordsTotalY }}
              className="hero-word z-10 justify-self-start whitespace-nowrap"
            >
              {identity.lastName}
            </motion.span>
          </div>

          {/* ======== MOBILE CLUSTER ======== */}
          <div className="relative isolate flex flex-col items-center md:hidden">
            <motion.span style={{ x: harshaX }} className="hero-word-mobile z-10 -mb-4">
              {identity.firstName}
            </motion.span>
            <motion.div style={{ scale: photoScale }} className="relative z-20">
              <Portrait imgClassName="h-[42vh] w-auto" />
            </motion.div>
            <motion.span style={{ x: vardhanaX }} className="hero-word-mobile z-10 -mt-4">
              {identity.lastName}
            </motion.span>
          </div>

          {/* ======== SUPPORTING TEXT / CONTROLS ======== */}
          <motion.div
            style={{ y: textY }}
            className="relative z-30 mt-8 flex max-w-xl flex-col items-center text-center md:mt-10"
          >
            <p className="font-hud text-[11px] font-medium uppercase tracking-[0.28em] text-hud-bright md:text-[12px]">
              {identity.headline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-dim md:text-base">
              {identity.supporting}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#projects"
                onClick={(e) => handleAnchorClick(e, '#projects')}
                className="hud-btn"
              >
                View Work
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
                className="hud-btn-ghost"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </motion.div>

        <ScrollIndicator style={{ opacity: cueOpacity }} label={hud.enterCue} />
      </div>
    </section>
  );
}
