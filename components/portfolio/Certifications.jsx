'use client';

import { Linkedin } from 'lucide-react';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { ProjectImage } from './projects/parts';
import { certifications } from '@/lib/data/site';

/**
 * Certifications — SYSTEM CERTIFICATIONS
 * Digital credential cards using the real certificate titles and providers.
 * Each card shows the real certificate image; no verification marks or
 * issue dates are invented.
 */
export default function Certifications() {
  const c = certifications;
  return (
    <SectionShell id="certifications" surface="void" grid="plain">
      <HudHeading
        index="08"
        label={c.eyebrow}
        heading={c.heading}
        supporting={c.supporting}
      />

      {/* Credential cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2">
        {c.items.map((cert, i) => (
          <Reveal key={cert.id} delay={0.07 * i}>
            <article className="hud-corners hud-panel hud-panel-hover relative h-full p-5 md:p-6">
              <div className="flex items-center justify-between gap-4 pb-4">
                <span className="hud-label">Credential {String(i + 1).padStart(2, '0')}</span>
                <span className="hud-label hud-label-accent">{cert.provider}</span>
              </div>

              {/* native aspect + no scanlines so certificate text stays fully legible */}
              <ProjectImage
                src={cert.image.src}
                alt={cert.image.alt}
                label={cert.image.src ? undefined : 'Certificate'}
                aspect={cert.image.aspect || '4 / 3'}
                scanlines={false}
              />

              <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-ink md:text-2xl">
                {cert.title}
              </h3>
            </article>
          </Reveal>
        ))}
      </div>

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
