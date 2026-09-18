'use client';

import { motion } from 'framer-motion';

/**
 * "Scroll to enter" cue anchored to the bottom of the hero.
 * Fades out as the hero scrolls away (opacity is driven by the parent).
 */
export default function ScrollIndicator({ style, label = 'Scroll' }) {
  return (
    <motion.div
      style={style}
      className="pointer-events-none absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <span className="hud-label">{label}</span>
      <div className="relative h-10 w-px overflow-hidden bg-hud-line-strong">
        <motion.div
          className="absolute inset-x-0 top-0 h-4"
          style={{
            background: 'linear-gradient(to bottom, rgba(77,184,255,0), var(--accent-bright))',
          }}
          animate={{ y: [-16, 40] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
