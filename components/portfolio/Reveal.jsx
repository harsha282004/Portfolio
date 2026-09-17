'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reveal
 * Scroll-triggered entrance used across Phase 2 sections.
 * Fades + lifts (and optionally scales for depth) as it enters the viewport.
 * Fully respects prefers-reduced-motion: content renders immediately, no motion.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  depth = false,
  once = true,
  as = 'div',
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, scale: depth ? 0.965 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
