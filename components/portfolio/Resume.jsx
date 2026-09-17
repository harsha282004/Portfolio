'use client';

import { FileText, ArrowUpRight, Download } from 'lucide-react';
import Reveal from './Reveal';
import { resumeSection, profile } from '@/lib/data/site';

/**
 * Resume
 * Light section (contrast after the dark Developer Profile). Document-inspired
 * motif + real PDF actions. VIEW opens the PDF in a new tab; DOWNLOAD triggers
 * a browser download. No fake preview, no recreated resume content.
 */
export default function Resume() {
  const r = resumeSection;
  return (
    <section
      id="resume"
      className="relative w-full overflow-hidden bg-[#faf9f6] text-neutral-900"
    >
      {/* dark Developer Profile receding into the light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            'linear-gradient(to bottom, #08080a 0%, rgba(8,8,10,0.5) 24%, rgba(250,249,246,0) 100%)',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-14 px-6 pb-40 pt-[40vh] md:grid-cols-2 md:gap-20 md:px-10 md:pb-52">
        {/* Left — statement + actions */}
        <div>
          <Reveal
            as="p"
            className="flex items-center text-xs font-semibold uppercase tracking-[0.24em] text-[#3b5b7a]"
          >
            <span className="mr-3 inline-block h-px w-8 bg-[#3b5b7a]" />
            {r.eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="mt-8 font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-neutral-900"
          >
            {r.heading}
          </Reveal>
          <Reveal as="p" delay={0.12} className="mt-6 max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg">
            {r.supporting}
          </Reveal>

          <Reveal delay={0.18} className="mt-10 flex flex-wrap gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume PDF — opens in a new tab"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#faf9f6] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <FileText className="h-4 w-4" aria-hidden />
              View Resume
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={profile.resume}
              download={profile.resumeFilename}
              aria-label="Download resume PDF"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-900/20 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-900 transition-colors duration-300 hover:bg-neutral-900/5"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download Resume
            </a>
          </Reveal>
        </div>

        {/* Right — document motif (not a preview) */}
        <Reveal delay={0.1} className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg opacity-[0.05]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div
              className="relative flex flex-col items-center justify-center gap-5 rounded-lg border border-neutral-900/15 bg-white/60 px-8 text-center"
              style={{ aspectRatio: '3 / 4' }}
            >
              <FileText className="h-12 w-12 text-[#3b5b7a]" strokeWidth={1.2} aria-hidden />
              <div>
                <p className="font-mono text-sm text-neutral-800">{profile.resumeFilename}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                  PDF Document
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
