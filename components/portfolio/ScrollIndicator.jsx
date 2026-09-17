'use client';

import { motion } from 'framer-motion';

/**
 * Subtle "scroll to explore" cue anchored to the bottom of the hero.
 * Fades out as the hero scrolls away (opacity is driven by the parent).
 */
export default function ScrollIndicator({ style }) {
  return (
    <motion.div
      style={style}
      className="pointer-events-none absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-neutral-400">
        Scroll
      </span>
      <div className="relative h-10 w-px overflow-hidden bg-neutral-300">
        <motion.div
          className="absolute inset-x-0 top-0 h-4 bg-neutral-900"
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
