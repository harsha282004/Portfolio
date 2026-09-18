'use client';

import { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { contactSection, profile } from '@/lib/data/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONTACTS = [
  { label: 'Email', value: profile.email, href: profile.emailHref, icon: Mail, external: false },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref, icon: Phone, external: false },
  { label: 'LinkedIn', value: 'in/m-harshavardhana-gowda', href: profile.linkedin, icon: Linkedin, external: true },
  { label: 'GitHub', value: 'harsha282004', href: profile.github, icon: Github, external: true },
];

/**
 * Contact — ESTABLISH CONNECTION
 * A contact terminal. Client-side validated with NO backend: on a valid submit
 * it honestly reports that the form isn't connected yet and points to email /
 * LinkedIn. Structured so a service can be wired in later.
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
    `mt-2 w-full border bg-white/[0.03] px-4 py-3 font-hud text-[13px] text-ink placeholder-ink-mute outline-none transition-colors duration-200 focus:border-hud focus-visible:border-hud ${
      err ? 'border-red-400/60' : 'border-hud-line-strong'
    }`;

  return (
    <SectionShell id="contact" surface="void" grid="plain" scanlines glow="top">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        {/* ---------- left: statement + channels ---------- */}
        <div>
          <HudHeading index="11" label={c.eyebrow} heading={c.heading} supporting={c.supporting} />

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACTS.map((item, i) => {
              const Icon = item.icon;
              const ext = item.external
                ? {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `${item.label} — opens in a new tab`,
                  }
                : { 'aria-label': `${item.label}: ${item.value}` };
              return (
                <Reveal key={item.label} delay={0.05 * i}>
                  <a
                    href={item.href}
                    {...ext}
                    className="hud-corners hud-panel hud-panel-hover group relative flex items-center gap-3 px-5 py-4"
                  >
                    <Icon className="h-5 w-5 flex-none text-hud" aria-hidden />
                    <div className="min-w-0">
                      <p className="hud-label">{item.label}</p>
                      <p className="mt-1 truncate font-hud text-[13px] text-ink-dim transition-colors duration-300 group-hover:text-ink">
                        {item.value}
                      </p>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ---------- right: transmission terminal ---------- */}
        <Reveal delay={0.1}>
          <form noValidate onSubmit={onSubmit} className="hud-panel overflow-hidden">
            {/* terminal bar */}
            <div className="flex items-center gap-3 border-b border-hud-line-strong bg-white/[0.02] px-4 py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-hud hud-blink" aria-hidden />
              <span className="font-hud text-[11px] tracking-[0.16em] text-ink-mute">
                transmission · new message
              </span>
            </div>

            <div className="p-5 md:p-7">
              <div>
                <label htmlFor="contact-name" className="hud-label">
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
                  <p id="err-name" className="mt-2 font-hud text-[12px] text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <label htmlFor="contact-email" className="hud-label">
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
                  <p id="err-email" className="mt-2 font-hud text-[12px] text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="hud-label">
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
                  className={`${fieldClass(errors.message)} resize-y leading-relaxed`}
                />
                {errors.message && (
                  <p id="err-message" className="mt-2 font-hud text-[12px] text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="hud-btn mt-7 w-full justify-center disabled:opacity-70"
              >
                <Send className="h-3.5 w-3.5" aria-hidden />
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>

              {status === 'notice' && (
                <div
                  role="status"
                  className="mt-5 border border-hud/30 bg-hud/[0.06] px-4 py-4 text-[13px] leading-relaxed text-ink-dim"
                >
                  Thanks{form.name ? `, ${form.name.trim()}` : ''}! This form isn&apos;t connected
                  to a messaging service yet, so nothing was sent. Please reach me directly at{' '}
                  <a
                    href={profile.emailHref}
                    className="text-hud-bright underline underline-offset-2 hover:text-white"
                  >
                    {profile.email}
                  </a>{' '}
                  or on{' '}
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hud-bright underline underline-offset-2 hover:text-white"
                  >
                    LinkedIn
                  </a>
                  .
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </SectionShell>
  );
}
