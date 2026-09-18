'use client';

import { useEffect, useState } from 'react';
import { identity } from '@/lib/data/site';

const LINES = [
  ['Initializing player profile', ''],
  ['Loading interface', 'OK'],
  ['Mounting mission archive', 'OK'],
  ['System online', ''],
];

/**
 * BootSequence — a brief "system boot" before the profile screen.
 *
 * The sequence and its fade-out are pure CSS, so it plays from first paint and
 * clears itself even before hydration. It shows once per browser session; the
 * inline script in app/layout.js marks <html data-booted> for repeat visits
 * and for reduced-motion users, which hides it before paint. Any click, key
 * or wheel skips it. Decorative only (aria-hidden).
 */
export default function BootSequence() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.hasAttribute('data-booted')) {
      setDone(true);
      return;
    }
    try {
      sessionStorage.setItem('hud-booted', '1');
    } catch {}
    const finish = () => setDone(true);
    const t = setTimeout(finish, 1900);
    const skip = () => root.setAttribute('data-booted', '');
    window.addEventListener('pointerdown', skip, { once: true });
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('wheel', skip, { once: true, passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
    };
  }, []);

  if (done) return null;

  return (
    <div aria-hidden className="boot-overlay">
      <div className="boot-inner">
        <p className="boot-mark">
          <span className="boot-dot" />
          {identity.wordmark}
        </p>
        <ul className="boot-lines">
          {LINES.map(([text, ok], i) => (
            <li key={text} style={{ animationDelay: `${0.12 + i * 0.22}s` }}>
              <span className="text-hud">&gt;</span> {text}
              {ok && <span className="boot-ok">{ok}</span>}
            </li>
          ))}
        </ul>
        <span className="boot-bar">
          <span />
        </span>
      </div>
    </div>
  );
}
