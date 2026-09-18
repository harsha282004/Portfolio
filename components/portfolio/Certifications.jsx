'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { Linkedin, ShieldCheck, Maximize2, X, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { certifications } from '@/lib/data/site';

/**
 * Certifications — CREDENTIAL VAULT
 * Collectible credential cards built from the REAL certificate images.
 * Desktop pointers get a gentle 3D tilt and a holographic sheen that follows
 * the cursor (CSS variables set directly on the card — no re-renders).
 * "View certificate" opens the full image in an accessible dialog.
 */
export default function Certifications() {
  const c = certifications;
  const [open, setOpen] = useState(null); // cert id | null
  const current = c.items.find((x) => x.id === open);

  // Lenis drives wheel scrolling itself, so the dialog's scroll lock alone
  // would let the page move underneath. Pause it while the viewer is open.
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    return () => window.__lenis?.start();
  }, [open]);

  return (
    <SectionShell id="certifications" surface="void" grid="plain">
      <HudHeading index="07" label={c.eyebrow} heading={c.heading} supporting={c.supporting} />

      <Dialog.Root open={Boolean(open)} onOpenChange={(v) => !v && setOpen(null)}>
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {c.items.map((cert, i) => (
            <Reveal key={cert.id} delay={0.08 * i} depth>
              <CredentialCard cert={cert} index={i} onView={() => setOpen(cert.id)} />
            </Reveal>
          ))}
        </div>

        {/* ---------- certificate viewer ---------- */}
        <Dialog.Portal>
          <Dialog.Overlay className="vault-overlay fixed inset-0 z-[80] bg-void/90" />
          {current && (
            <Dialog.Content className="vault-dialog fixed left-1/2 top-1/2 z-[90] w-[min(1100px,94vw)] -translate-x-1/2 -translate-y-1/2 outline-none">
              <div className="hud-corners hud-panel relative bg-deep">
                <div className="flex items-center justify-between gap-3 border-b border-hud-line-strong px-4 py-3 md:px-5">
                  <Dialog.Title className="hud-label hud-label-accent truncate">
                    {current.title} · {current.provider}
                  </Dialog.Title>
                  <Dialog.Close
                    aria-label="Close certificate"
                    className="flex h-8 w-8 flex-none items-center justify-center border border-hud-line-strong text-ink-dim transition-colors hover:border-hud hover:text-ink"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">{current.image.alt}</Dialog.Description>
                <div className="relative mx-auto max-h-[78vh] w-full" style={{ aspectRatio: current.image.aspect }}>
                  <Image
                    src={current.image.src}
                    alt={current.image.alt}
                    fill
                    sizes="94vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-end border-t border-hud-line-strong px-4 py-3 md:px-5">
                  <a
                    href={current.image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hud-btn-ghost hud-sweep !px-4 !py-2.5"
                  >
                    Open in new tab
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </Dialog.Content>
          )}
        </Dialog.Portal>
      </Dialog.Root>

      {/* LinkedIn call-to-action */}
      <Reveal className="mt-14 border-t border-hud-line-strong pt-10 md:mt-20 md:pt-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
              {c.cta.title}
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim md:text-base">
              {c.cta.supporting}
            </p>
          </div>
          <a
            href={c.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${c.cta.linkLabel} — opens in a new tab`}
            className="hud-btn flex-none"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            {c.cta.linkLabel}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function CredentialCard({ cert, index, onView }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    el.style.setProperty('--ry', `${((x - 0.5) * 8).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${((0.5 - y) * 6).toFixed(2)}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="vault-card hud-corners hud-panel group relative h-full"
    >
      <div className="flex items-center justify-between gap-4 border-b border-hud-line-strong px-5 py-3">
        <span className="hud-label">Credential {String(index + 1).padStart(2, '0')}</span>
        <span className="flex items-center gap-1.5 font-hud text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          Verified Credential
        </span>
      </div>

      <div className="p-4 md:p-5">
        <button
          type="button"
          onClick={onView}
          aria-label={`View ${cert.title} certificate`}
          className="vault-media relative block w-full overflow-hidden border border-hud-line-strong bg-white"
          style={{ aspectRatio: cert.image.aspect }}
        >
          <Image
            src={cert.image.src}
            alt={cert.image.alt}
            fill
            sizes="(max-width: 768px) 92vw, 45vw"
            className="object-contain"
          />
          <span aria-hidden className="vault-holo" />
          <span aria-hidden className="vault-inspect">
            <Maximize2 className="h-3.5 w-3.5" />
            Inspect
          </span>
        </button>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="hud-label hud-label-accent">{cert.provider}</p>
            <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-ink md:text-2xl">
              {cert.title}
            </h3>
          </div>
          <button type="button" onClick={onView} className="hud-btn-ghost hud-sweep !px-4 !py-2.5">
            View Certificate
          </button>
        </div>
      </div>
    </article>
  );
}
