'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import Portrait from './Portrait';
import ScrollIndicator from './ScrollIndicator';
import { identity } from '@/lib/data/site';

/**
 * Cinematic hero.
 * Layer order: white background -> massive HARSHA/VARDHANA type -> portrait
 * -> supporting text/CTA -> interaction cues.
 *
 * Scroll behaviour (pinned): HARSHA drifts left, VARDHANA drifts right,
 * the portrait scales back slightly, and the whole hero fades toward the
 * next content area. Subtle and premium; disabled under reduced-motion.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const split = prefersReduced ? 0 : 150;
  const harshaX = useTransform(scrollYProgress, [0, 1], [0, -split]);
  const vardhanaX = useTransform(scrollYProgress, [0, 1], [0, split]);
  const wordY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -40]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 0.9]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 50]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[185vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Soft pure-white field behind the portrait so its studio-white
            background blends seamlessly while the page keeps a warm tone. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 'min(1400px, 100vw)',
            height: 'min(1300px, 128vh)',
            background:
              'radial-gradient(ellipse at center, #ffffff 0%, #ffffff 60%, rgba(255,255,255,0) 84%)',
          }}
        />
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6"
        >
          {/* ============ DESKTOP CLUSTER ============ */}
          {/* 3-column grid guarantees the composition always fits the viewport:
              HARSHA (left) · PORTRAIT (center, overlapping inner edges) · VARDHANA (right). */}
          <div
            className="relative isolate hidden w-full max-w-[1700px] items-center md:grid"
            style={{ gridTemplateColumns: '1fr auto 1fr' }}
          >
            <motion.span
              style={{ x: harshaX, y: wordY }}
              className="hero-word z-10 justify-self-end whitespace-nowrap"
            >
              {identity.firstName}
            </motion.span>

            <motion.div
              style={{ scale: photoScale }}
              className="relative z-20 mx-[-2.8vw] justify-self-center"
            >
              <Portrait imgClassName="h-auto w-[clamp(230px,25vw,430px)]" />
            </motion.div>

            <motion.span
              style={{ x: vardhanaX, y: wordY }}
              className="hero-word z-10 justify-self-start whitespace-nowrap"
            >
              {identity.lastName}
            </motion.span>
          </div>

          {/* ============ MOBILE CLUSTER ============ */}
          <div className="relative isolate flex flex-col items-center md:hidden">
            <motion.span
              style={{ x: harshaX }}
              className="hero-word-mobile z-10 -mb-4"
            >
              {identity.firstName}
            </motion.span>
            <motion.div style={{ scale: photoScale }} className="relative z-20">
              <Portrait imgClassName="h-[42vh] w-auto" />
            </motion.div>
            <motion.span
              style={{ x: vardhanaX }}
              className="hero-word-mobile z-10 -mt-4"
            >
              {identity.lastName}
            </motion.span>
          </div>

          {/* ============ SUPPORTING TEXT / CTA ============ */}
          <motion.div
            style={{ y: textY }}
            className="relative z-30 mt-8 flex max-w-xl flex-col items-center text-center md:mt-10"
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#3b5b7a] md:text-sm">
              {identity.headline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500 md:text-base">
              {identity.supporting}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="#work"
                className="rounded-full bg-neutral-900 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#faf9f6] transition-transform duration-300 hover:-translate-y-0.5"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-neutral-900/15 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-900 transition-colors duration-300 hover:bg-neutral-900/5"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </motion.div>

        <ScrollIndicator style={{ opacity: cueOpacity }} />
      </div>
    </section>
  );
}
