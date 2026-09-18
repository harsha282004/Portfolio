'use client';

/**
 * SectionShell
 * Shared frame for every content section: tonal surface, atmosphere layers
 * (grid / scanlines), a glow seam that joins it to the section above, and the
 * compact vertical rhythm. Sections supply only their own content.
 *
 * `surface` drives the tonal rhythm (void -> panel -> deep) so neighbouring
 * sections stay distinct without hard light/dark flips.
 */
const SURFACE = {
  void: 'var(--void)',
  deep: 'var(--deep)',
  panel: 'var(--panel)',
};

export default function SectionShell({
  id,
  surface = 'void',
  grid = 'plain', // 'plain' | 'accent' | false
  scanlines = false,
  seam = true,
  glow = null, // 'top' | 'center' | null
  // 'clip' keeps decorative layers contained without creating a scroll
  // container, so `position: sticky` children keep working.
  overflow = 'hidden', // 'hidden' | 'clip'
  className = '',
  innerClassName = '',
  children,
}) {
  return (
    <section
      id={id}
      className={`relative w-full ${overflow === 'clip' ? 'overflow-x-clip' : 'overflow-hidden'} ${className}`}
      style={{ backgroundColor: SURFACE[surface] || SURFACE.void }}
    >
      {/* Glow seam joining the previous section */}
      {seam && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px hud-seam opacity-60" />
      )}

      {/* Atmosphere: technical grid */}
      {grid && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${
            grid === 'accent' ? 'hud-grid-accent' : 'hud-grid'
          }`}
        />
      )}

      {/* Atmosphere: scan lines */}
      {scanlines && (
        <div aria-hidden className="pointer-events-none absolute inset-0 hud-scanlines" />
      )}

      {/* Atmosphere: radial accent lighting */}
      {glow === 'top' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-64"
          style={{
            background:
              'radial-gradient(60% 100% at 50% 0%, rgba(77,184,255,0.10) 0%, rgba(77,184,255,0) 70%)',
          }}
        />
      )}
      {glow === 'center' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(77,184,255,0.07) 0%, rgba(77,184,255,0) 70%)',
          }}
        />
      )}

      <div
        className={`relative z-20 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-20 ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
