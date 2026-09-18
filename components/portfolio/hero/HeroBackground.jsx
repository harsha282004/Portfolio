'use client';

import { motion, useTransform } from 'framer-motion';

/**
 * HeroBackground — the procedural environment behind the profile screen.
 * Pure CSS/SVG, no textures: sky gradients, drifting fog, a technical grid,
 * a perspective floor, distant structure silhouettes, particles, scan lines.
 * Every animated layer moves only transform/opacity so it stays on the
 * compositor. `px`/`py` are spring-smoothed pointer values in [-0.5, 0.5].
 */

// Distant megastructures, [x, width, height] in a 1440x320 viewBox.
// Tallest at the edges, low in the centre so they never sit behind the text.
const STRUCTURES = [
  [0, 70, 150], [58, 34, 236], [86, 60, 118], [150, 26, 190], [168, 84, 96],
  [262, 44, 150], [300, 22, 212], [330, 90, 70], [430, 50, 110], [492, 70, 54],
  [880, 70, 58], [952, 48, 104], [1010, 92, 72], [1110, 24, 206], [1140, 46, 146],
  [1196, 80, 92], [1270, 28, 186], [1300, 60, 122], [1352, 36, 240], [1384, 56, 156],
];
// Tiny lit windows / beacons on a few structures.
const LIGHTS = [
  [70, 96], [74, 140], [160, 146], [310, 124], [1118, 130], [1280, 150], [1364, 92], [1366, 118],
];

export default function HeroBackground({ px, py }) {
  const fogX = useTransform(px, [-0.5, 0.5], [-10, 10]);
  const fogY = useTransform(py, [-0.5, 0.5], [-6, 6]);
  const gridX = useTransform(px, [-0.5, 0.5], [-14, 14]);
  const gridY = useTransform(py, [-0.5, 0.5], [-10, 10]);
  const cityX = useTransform(px, [-0.5, 0.5], [-8, 8]);
  const floorX = useTransform(px, [-0.5, 0.5], [-24, 24]);
  const dustX = useTransform(px, [-0.5, 0.5], [-30, 30]);
  const dustY = useTransform(py, [-0.5, 0.5], [-18, 18]);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: 'easeOut' }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* sky: navy/black base with a cool light source behind the portrait */}
      <div className="hero-sky absolute inset-0" />

      {/* volumetric fog */}
      <motion.div style={{ x: fogX, y: fogY }} className="absolute -inset-[8%]">
        <div className="hero-fog hero-fog-a" />
        <div className="hero-fog hero-fog-b" />
      </motion.div>

      {/* technical grid, faded towards the edges */}
      <motion.div style={{ x: gridX, y: gridY }} className="hero-grid absolute -inset-16" />

      {/* distant structures on the horizon */}
      <motion.svg
        style={{ x: cityX }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-[-3%] bottom-[16%] h-[34%] w-[106%] opacity-40 blur-[1px]"
      >
        <defs>
          <linearGradient id="hero-structure" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10213a" stopOpacity="0.9" />
            <stop offset="1" stopColor="#05070c" stopOpacity="1" />
          </linearGradient>
        </defs>
        {STRUCTURES.map(([x, w, h]) => (
          <rect key={x} x={x} y={320 - h} width={w} height={h} fill="url(#hero-structure)" />
        ))}
        {LIGHTS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="3" height="2" fill="#8ad9ff" opacity="0.45" />
        ))}
      </motion.svg>

      {/* horizon glow */}
      <div className="hero-horizon absolute inset-x-0 bottom-[14%] h-[30%]" />

      {/* perspective floor */}
      <motion.div style={{ x: floorX }} className="hero-floor-wrap absolute inset-x-0 bottom-0 h-[34%]">
        <div className="hero-floor" />
      </motion.div>

      {/* particles */}
      <motion.div style={{ x: dustX, y: dustY }} className="hero-particles absolute inset-0" />

      {/* scan lines + one slow sweeping scan band */}
      <div className="absolute inset-0 hud-scanlines opacity-30" />
      <div className="hero-scanband" />

      {/* vignette + grain */}
      <div className="hero-vignette absolute inset-0" />
      <div className="absolute inset-0 hud-noise" />
    </motion.div>
  );
}
