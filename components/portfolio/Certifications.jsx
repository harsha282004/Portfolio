'use client';

import { Linkedin } from 'lucide-react';
import Reveal from './Reveal';
import { ProjectImage } from './projects/parts';
import { certifications } from '@/lib/data/site';

/**
 * Certifications
 * Clean, structured, light section. Each certificate shows an image slot
 * (elegant placeholder until a real image is added) with title + provider,
 * followed by a subtle LinkedIn call-to-action. No fake verification marks.
 */
export default function Certifications() {
  const c = certifications;
  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden bg-[#faf9f6] text-neutral-900"
    >
      {/* dark Achievements environment receding into the light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            'linear-gradient(to bottom, #0b0b0d 0%, rgba(11,11,13,0.5) 24%, rgba(250,249,246,0) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-40 pt-[40vh] md:px-10 md:pb-52">
        <Reveal
          as="p"
          className="flex items-center text-xs font-semibold uppercase tracking-[0.24em] text-[#3b5b7a]"
        >
          <span className="mr-3 inline-block h-px w-8 bg-[#3b5b7a]" />
          {c.eyebrow}
        </Reveal>
        <Reveal
          as="h2"
          delay={0.05}
          className="mt-8 font-display text-[clamp(2.25rem,5.5vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-neutral-900"
        >
          {c.heading}
        </Reveal>
        <Reveal
          as="p"
          delay={0.12}
          className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg"
        >
          {c.supporting}
        </Reveal>

        {/* Certificate entries */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-2 md:gap-12">
          {c.items.map((cert) => (
            <Reveal key={cert.id}>
              <ProjectImage
                src={cert.image.src}
                alt={cert.image.alt}
                label="Certificate"
                theme="light"
                aspect="4 / 3"
              />
              <Reveal
                as="h3"
                delay={0.08}
                className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-neutral-900 md:text-2xl"
              >
                {cert.title}
              </Reveal>
              <Reveal
                as="p"
                delay={0.14}
                className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-[#3b5b7a]"
              >
                {cert.provider}
              </Reveal>
            </Reveal>
          ))}
        </div>

        {/* LinkedIn call-to-action */}
        <Reveal className="mt-24 border-t border-neutral-900/10 pt-16 md:mt-32">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-neutral-900 md:text-3xl">
                {c.cta.title}
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-500 md:text-base">
                {c.cta.supporting}
              </p>
            </div>
            <a
              href={c.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${c.cta.linkLabel} — opens in a new tab`}
              className="group inline-flex flex-none items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#faf9f6] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
              {c.cta.linkLabel}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
