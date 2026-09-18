'use client';

import { useRef } from 'react';
import {
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroBackground from './hero/HeroBackground';
import HeroHUD from './hero/HeroHUD';
import HeroName from './hero/HeroName';
import HeroPortrait from './hero/HeroPortrait';
import ScrollIndicator from './ScrollIndicator';
import { identity, hud, heroHud } from '@/lib/data/site';
import { handleAnchorClick } from '@/lib/utils/scrollToAnchor';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Hero — the character / profile screen.
 *
 * Layers (back to front):
 *   HeroBackground (sky, fog, grid, floor, structures, particles, scan)
 *   -> HeroPortrait rings + light -> HARSHA / capsule portrait / VARDHANA
 *   -> identity copy + controls -> HeroHUD readouts
 *
 * Entrance: environment fades in -> HUD frame and readouts -> rings open ->
 * portrait capsule reveals -> name resolves -> copy and controls.
 *
 * Two motion sources, composed per layer:
 *   - scroll: title splits apart, portrait recedes, the screen fades out
 *   - pointer (fine pointers only): layered parallax + a slight ring tilt
 * Under prefers-reduced-motion, parallax/scroll motion and CSS loops are off
 * and MotionConfig reduces the entrance to fades.
 * Looping CSS animations pause once the hero has scrolled out of view.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(sectionRef);

  /* ---------------- scroll ---------------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const split = reduced ? 0 : 70;
  const topScrollY = useTransform(scrollYProgress, [0, 1], [0, -split]);
  const bottomScrollY = useTransform(scrollYProgress, [0, 1], [0, split]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.86]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  /* ---------------- pointer parallax ---------------- */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 70, damping: 20, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const IN = [-0.5, 0.5];
  const range = (n) => (reduced ? [0, 0] : [-n, n]);

  const wordsX = useTransform(sx, IN, range(16));
  const wordsY = useTransform(sy, IN, range(10));
  const echoX = useTransform(sx, IN, range(-7));
  const echoY = useTransform(sy, IN, range(-4));
  const portraitX = useTransform(sx, IN, range(24));
  const portraitY = useTransform(sy, IN, range(14));
  const ringRotateX = useTransform(sy, IN, range(-7));
  const ringRotateY = useTransform(sx, IN, range(9));
  const topWordY = useTransform([topScrollY, wordsY], ([a, b]) => a + b);
  const bottomWordY = useTransform([bottomScrollY, wordsY], ([a, b]) => a + b);

  const onPointerMove = (e) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  const [roleA, roleB] = identity.headline.split('|').map((s) => s.trim());

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="top"
        ref={sectionRef}
        data-paused={inView ? undefined : 'true'}
        className="hero-root relative h-[150vh] w-full bg-void"
      >
        <div
          ref={stageRef}
          onMouseMove={onPointerMove}
          onMouseLeave={onPointerLeave}
          className="hero-stage sticky top-0 h-screen w-full overflow-hidden supports-[height:100svh]:h-[100svh]"
        >
          <HeroBackground px={sx} py={sy} />

          {/* ---------------- main composition ---------------- */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 pt-14 md:pt-16"
          >
            <h1 className="sr-only">
              {identity.fullName} — {identity.headline}
            </h1>

            <HeroName
              text={identity.firstName}
              delay={0.95}
              x={wordsX}
              y={topWordY}
              echoX={echoX}
              echoY={echoY}
              className="z-20 -mb-[0.1em]"
            />

            <HeroPortrait
              x={portraitX}
              y={portraitY}
              scale={portraitScale}
              rotateX={ringRotateX}
              rotateY={ringRotateY}
              delay={0.45}
            />

            <HeroName
              text={identity.lastName}
              delay={1.1}
              x={wordsX}
              y={bottomWordY}
              echoX={echoX}
              echoY={echoY}
              className="z-20 -mt-[0.06em]"
            />

            {/* identity + controls */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55, duration: 1, ease: EASE }}
              className="relative z-30 mt-4 flex max-w-2xl flex-col items-center text-center md:mt-5"
            >
              <p className="flex flex-col items-center gap-1 font-hud text-[11px] font-medium uppercase tracking-[0.26em] text-hud-bright sm:flex-row sm:gap-3 md:text-xs">
                <span>{roleA}</span>
                <span aria-hidden className="hidden h-3 w-px bg-hud/50 sm:block" />
                <span className="text-ink">{roleB}</span>
              </p>
              <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink-dim sm:max-w-none md:text-base">
                {identity.supporting}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-6">
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
                  className="hud-btn-ghost hud-sweep"
                >
                  Get in touch
                </a>
              </div>

              {/* compact domain strip — replaces the side readouts below lg */}
              <ul className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-1.5 lg:hidden">
                {heroHud.profile.items.map((d) => (
                  <li key={d} className="hud-label flex items-center gap-1.5 text-[9px] text-ink-dim">
                    <span aria-hidden className="text-hud">&gt;</span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <HeroHUD px={sx} py={sy} opacity={contentOpacity} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 1 }}
            className="hero-cue"
          >
            <ScrollIndicator style={{ opacity: cueOpacity }} label={hud.enterCue} />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
