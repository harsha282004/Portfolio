'use client';

import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * HeroName — one word of the title treatment (HARSHA / VARDHANA).
 * A solid, gradient-lit word with an outlined "echo" behind it; the two sit
 * on different parallax depths so the title reads as a layered game logo.
 * Letters resolve in with a short stagger (no glitching). Decorative only —
 * the accessible name is the hero's sr-only <h1>.
 */
export default function HeroName({ text, delay = 0, x, y, echoX, echoY, className = '' }) {
  return (
    <div aria-hidden className={`relative ${className}`}>
      <motion.span
        style={{ x: echoX, y: echoY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.7, duration: 1.4 }}
        className="hero-title hero-title-echo absolute inset-0"
      >
        {text}
      </motion.span>

      <motion.span style={{ x, y }} className="hero-title hero-title-fill relative block">
        {text.split('').map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: '0.3em', filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: '0em', filter: 'blur(0px)' }}
            transition={{ delay: delay + i * 0.045, duration: 0.9, ease: EASE }}
            className="inline-block"
          >
            {ch}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}
