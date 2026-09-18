'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE =
  'a[href], button:not([disabled]), [role="button"], [role="tab"], summary, label[for], select, [data-cursor="select"]';
const TEXT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]), textarea, [contenteditable="true"]';

/**
 * HudCursor — a targeting reticle for fine pointers only.
 *
 * - Enabled only for `(hover: hover) and (pointer: fine)`; touch devices keep
 *   their native behaviour and never mount the listeners.
 * - The dot tracks the pointer exactly; the reticle eases after it in a single
 *   rAF loop that sleeps once it has caught up (no trails, no idle work).
 * - Over interactive elements it expands into brackets with a SELECT tag;
 *   over text fields it steps aside for the native caret.
 * - pointer-events: none throughout, so it can never block a click or scroll.
 */
export default function HudCursor() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-hud-cursor');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let mode = '';

    const setMode = (m) => {
      if (m === mode) return;
      mode = m;
      ring.current?.setAttribute('data-mode', m);
      dot.current?.setAttribute('data-mode', m);
    };

    const tick = () => {
      const k = reduced ? 1 : 0.22;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (Math.abs(target.x - pos.x) > 0.1 || Math.abs(target.y - pos.y) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!raf) raf = requestAnimationFrame(tick);
      root.classList.add('hud-cursor-visible');
    };

    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      if (el.closest(TEXT)) setMode('text');
      else if (el.closest(INTERACTIVE)) setMode('select');
      else setMode('');
    };

    const onDown = () => ring.current?.setAttribute('data-press', '');
    const onUp = () => ring.current?.removeAttribute('data-press');
    const onLeave = (e) => {
      if (!e.relatedTarget) root.classList.remove('hud-cursor-visible');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerout', onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerout', onLeave);
      root.classList.remove('has-hud-cursor', 'hud-cursor-visible');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ring} aria-hidden className="hud-cursor-ring">
        <span className="hud-cursor-reticle">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="hud-cursor-tag">Select</span>
      </div>
      <div ref={dot} aria-hidden className="hud-cursor-dot" />
    </>
  );
}
