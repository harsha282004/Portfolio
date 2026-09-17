'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll
 * Foundation for the cinematic scroll experience.
 * Wraps the page with Lenis smooth scrolling and respects reduced-motion.
 * Native scroll events still fire, so scroll-driven animations keep working.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Expose the instance so the sticky nav can drive smooth section jumps.
    window.__lenis = lenis;
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return children;
}
