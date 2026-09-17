'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { identity } from '@/lib/data/site';

/**
 * Portrait
 * Real photograph integrated directly into the hero typography.
 * - No card, no border, no circular crop.
 * - Subtle desktop-only mouse parallax for depth.
 * - A hidden lens layer is pre-wired here so the Phase 3 glass/X-ray skull
 *   effect can be added cleanly without restructuring the hero.
 */
const EDGE_MASK =
  'radial-gradient(ellipse closest-side at 50% 45%, #000 55%, rgba(0,0,0,0) 100%)';

export default function Portrait({
  className = '',
  imgClassName = 'h-[42vh] w-auto',
}) {
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });

  // Very subtle translation range (px) for premium depth, not a strong tilt.
  const tx = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const ty = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  const handleMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: tx, y: ty }}
      className={`relative ${className}`}
      data-hero-portrait
    >
      <Image
        src={identity.photo.src}
        alt={identity.photo.alt}
        width={960}
        height={1200}
        priority
        sizes="(max-width: 768px) 70vw, 40vw"
        className={`pointer-events-none select-none object-contain ${imgClassName}`}
        style={{
          WebkitMaskImage: EDGE_MASK,
          maskImage: EDGE_MASK,
        }}
      />

      {/* Phase 3 placeholder: glass-morphism lens / X-ray skull mounts here. */}
      <div
        data-hero-lens
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden"
      />
    </motion.div>
  );
}
