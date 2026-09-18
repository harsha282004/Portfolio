'use client';

import { FileText, Download } from 'lucide-react';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { resumeSection, profile } from '@/lib/data/site';

/**
 * Resume — PLAYER DOSSIER
 * A digital dossier panel wrapping the real PDF actions. VIEW opens the PDF in
 * a new tab, DOWNLOAD saves it. No fake preview and no recreated resume text;
 * while `resumeAvailable` is false the actions stay disabled rather than 404.
 */
export default function Resume() {
  const r = resumeSection;

  return (
    <SectionShell id="resume" surface="deep" grid="plain" glow="center">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        {/* ---------- left: statement + actions ---------- */}
        <div>
          <HudHeading index="09" label={r.eyebrow} heading={r.heading} supporting={r.supporting} />

          {profile.resumeAvailable ? (
            <Reveal delay={0.18} className="mt-10 flex flex-wrap gap-3">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View resume PDF — opens in a new tab"
                className="hud-btn"
              >
                <FileText className="h-4 w-4" aria-hidden />
                View Resume
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={profile.resume}
                download={profile.resumeFilename}
                aria-label="Download resume PDF"
                className="hud-btn-ghost"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download Resume
              </a>
            </Reveal>
          ) : (
            <Reveal delay={0.18} className="mt-10">
              <div className="flex flex-wrap gap-3">
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-2 border border-hud-line-strong bg-white/[0.03] px-7 py-3.5 font-hud text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-mute"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  View Resume
                </span>
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-2 border border-hud-line px-7 py-3.5 font-hud text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-mute"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download Resume
                </span>
              </div>
              <p role="status" className="mt-5 max-w-xl text-[13px] leading-relaxed text-ink-dim">
                The resume PDF isn&apos;t uploaded yet. In the meantime, reach me at{' '}
                <a href={profile.emailHref} className="text-hud-bright underline underline-offset-2">
                  {profile.email}
                </a>{' '}
                or on{' '}
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hud-bright underline underline-offset-2"
                >
                  LinkedIn
                </a>
                .
              </p>
            </Reveal>
          )}
        </div>

        {/* ---------- right: dossier panel (not a preview) ---------- */}
        <Reveal delay={0.1} className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            {/* glow behind the dossier */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10"
              style={{
                background:
                  'radial-gradient(60% 60% at 50% 45%, rgba(77,184,255,0.16) 0%, rgba(5,7,12,0) 75%)',
              }}
            />
            <div
              className="hud-corners hud-panel relative flex flex-col justify-between overflow-hidden"
              style={{ aspectRatio: '3 / 4' }}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 hud-grid" />
              <div aria-hidden className="pointer-events-none absolute inset-0 hud-scanlines opacity-30" />

              {/* dossier header */}
              <div className="relative flex items-center justify-between border-b border-hud-line-strong px-5 py-3.5">
                <span className="hud-label hud-label-accent">Dossier</span>
                <span className="hud-label">PDF</span>
              </div>

              {/* dossier body */}
              <div className="relative flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <FileText className="h-12 w-12 text-hud" strokeWidth={1.2} aria-hidden />
                <div>
                  <p className="font-hud text-sm text-ink">{profile.resumeFilename}</p>
                  <p className="mt-2 hud-label">Document</p>
                </div>
              </div>

              {/* dossier footer */}
              <div className="relative flex items-center justify-between border-t border-hud-line-strong px-5 py-3.5">
                <span className="hud-label">{profile.name}</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-hud hud-blink" />
                  <span className="hud-label">
                    {profile.resumeAvailable ? 'Ready' : 'Pending'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
