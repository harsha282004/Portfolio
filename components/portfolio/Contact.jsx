'use client';

import { useState } from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import Reveal from './Reveal';
import { contactSection, profile } from '@/lib/data/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONTACTS = [
  { label: 'Email', value: profile.email, href: profile.emailHref, icon: Mail, external: false },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref, icon: Phone, external: false },
  { label: 'LinkedIn', value: 'in/m-harshavardhana-gowda', href: profile.linkedin, icon: Linkedin, external: true },
  { label: 'GitHub', value: 'harsha282004', href: profile.github, icon: Github, external: true },
];

/**
 * Contact
 * Dark closing section. Client-side validated form with NO backend: on a valid
 * submit it honestly tells the visitor the form isn't connected yet and points
 * them to email / LinkedIn. Structured so a service can be wired in later.
 */
export default function Contact() {
  const c = contactSection;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | notice

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (status === 'notice') setStatus('idle');
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) next.email = 'Please enter a valid email address.';
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Please enter a valid email address.';
    if (!form.message.trim()) next.message = 'Please enter a message.';
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // No contact service is configured — do not claim delivery.
    setStatus('loading');
    setTimeout(() => setStatus('notice'), 600);
  };

  const fieldClass = (err) =>
    `mt-2 w-full rounded-md border bg-white/[0.03] px-4 py-3 text-[15px] text-[#f5f3ee] placeholder-white/25 outline-none transition-colors duration-200 focus:border-[#6cb6e6] focus-visible:border-[#6cb6e6] ${
      err ? 'border-[#e0888a]' : 'border-white/15'
    }`;

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#08080a] text-[#f5f3ee]"
    >
      {/* light Resume receding into the dark closing section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            'linear-gradient(to bottom, #faf9f6 0%, rgba(250,249,246,0.5) 24%, rgba(8,8,10,0) 100%)',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] gap-14 px-6 pb-40 pt-[40vh] md:grid-cols-2 md:gap-20 md:px-10 md:pb-52">
        {/* Left — statement + contact info */}
        <div>
          <Reveal as="p" className="about-eyebrow">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-[#6cb6e6]" />
            {c.eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="mt-8 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
          >
            {c.heading}
          </Reveal>
          <Reveal as="p" delay={0.12} className="mt-6 max-w-md text-base leading-relaxed text-[#8f8f97] md:text-lg">
            {c.supporting}
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CONTACTS.map((item, i) => {
              const Icon = item.icon;
              const ext = item.external
                ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${item.label} — opens in a new tab` }
                : { 'aria-label': `${item.label}: ${item.value}` };
              return (
                <Reveal key={item.label} delay={0.05 * i}>
                  <a
                    href={item.href}
                    {...ext}
                    className="group flex items-center gap-3 rounded-lg border border-white/12 bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-[#6cb6e6]"
                  >
                    <Icon className="h-5 w-5 flex-none text-[#6cb6e6]" aria-hidden />
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">{item.label}</p>
                      <p className="truncate text-sm text-white/80 transition-colors duration-300 group-hover:text-white">
                        {item.value}
                      </p>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right — form */}
        <Reveal delay={0.1}>
          <form noValidate onSubmit={onSubmit} className="rounded-xl border border-white/12 bg-white/[0.02] p-6 md:p-8">
            <div>
              <label htmlFor="contact-name" className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={update('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
                placeholder="Your name"
                className={fieldClass(errors.name)}
              />
              {errors.name && (
                <p id="err-name" className="mt-2 text-[13px] text-[#e0888a]">{errors.name}</p>
              )}
            </div>

            <div className="mt-6">
              <label htmlFor="contact-email" className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={update('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
                placeholder="you@example.com"
                className={fieldClass(errors.email)}
              />
              {errors.email && (
                <p id="err-email" className="mt-2 text-[13px] text-[#e0888a]">{errors.email}</p>
              )}
            </div>

            <div className="mt-6">
              <label htmlFor="contact-message" className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={update('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'err-message' : undefined}
                placeholder="Tell me about the opportunity or idea…"
                className={`${fieldClass(errors.message)} resize-y`}
              />
              {errors.message && (
                <p id="err-message" className="mt-2 text-[13px] text-[#e0888a]">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-900 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'notice' && (
              <div
                role="status"
                className="mt-5 rounded-md border border-[#6cb6e6]/30 bg-[#6cb6e6]/5 px-4 py-4 text-[13px] leading-relaxed text-[#c9dcec]"
              >
                Thanks{form.name ? `, ${form.name.trim()}` : ''}! This form isn&apos;t connected to a
                messaging service yet, so nothing was sent. Please reach me directly at{' '}
                <a href={profile.emailHref} className="underline decoration-[#6cb6e6]/60 underline-offset-2 hover:text-white">
                  {profile.email}
                </a>{' '}
                or on{' '}
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline decoration-[#6cb6e6]/60 underline-offset-2 hover:text-white">
                  LinkedIn
                </a>.
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
