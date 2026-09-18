'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Crosshair } from 'lucide-react';
import Reveal from './Reveal';
import SectionShell from './hud/SectionShell';
import HudHeading from './hud/HudHeading';
import { skills, experience } from '@/lib/data/site';
import { missions } from '@/lib/data/projects';
import { handleAnchorClick } from '@/lib/utils/scrollToAnchor';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Where each skill has actually been used, derived from the real mission and
 * experience data (tech lists + each mission's `skills`). Nothing is scored:
 * a skill either appears in a record here or it is simply listed.
 */
function buildDeployments() {
  const map = {};
  const add = (skill, entry) => {
    (map[skill] ||= []).push(entry);
  };
  missions.forEach((m) => {
    [...m.tech, ...(m.skills || [])].forEach((t) =>
      add(t, { kind: 'Mission', label: m.shortTitle, href: '#projects' })
    );
  });
  experience.items.forEach((x) => {
    x.technologies.forEach((t) =>
      add(t, { kind: 'Experience', label: `${x.company} — ${x.role}`, href: '#journey' })
    );
  });
  return map;
}

/**
 * Skills — PLAYER LOADOUT
 * Slot selector -> inventory grid -> item inspector. Every item is factual:
 * no bars, percentages, levels or rankings.
 */
export default function Skills() {
  const deployments = useMemo(buildDeployments, []);
  const [slotId, setSlotId] = useState(skills.categories[0].id);
  const slot = skills.categories.find((c) => c.id === slotId);
  const [item, setItem] = useState(slot.items[0]);
  const tabs = useRef({});

  const chooseSlot = (id) => {
    setSlotId(id);
    setItem(skills.categories.find((c) => c.id === id).items[0]);
  };

  const onTabKey = (e, i) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    const cats = skills.categories;
    const next = cats[(i + dir + cats.length) % cats.length];
    chooseSlot(next.id);
    tabs.current[next.id]?.focus();
  };

  const records = deployments[item] || [];
  const slotIndex = skills.categories.indexOf(slot);

  return (
    <SectionShell id="skills" surface="void" grid="plain" scanlines>
      <HudHeading
        index="04"
        label={skills.eyebrow}
        heading={skills.heading}
        supporting={skills.supporting}
      />

      <Reveal className="mt-10 md:mt-14">
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)_300px] lg:items-start lg:gap-8">
          {/* ---------------- slot selector ---------------- */}
          <div
            role="tablist"
            aria-label="Loadout slots"
            aria-orientation="vertical"
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
          >
            {skills.categories.map((c, i) => {
              const on = c.id === slotId;
              return (
                <button
                  key={c.id}
                  ref={(el) => (tabs.current[c.id] = el)}
                  role="tab"
                  type="button"
                  id={`slot-${c.id}`}
                  aria-selected={on}
                  aria-controls="loadout-grid"
                  tabIndex={on ? 0 : -1}
                  onClick={() => chooseSlot(c.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  data-active={on || undefined}
                  className="loadout-slot group relative flex-none py-3 pl-4 pr-10 text-left"
                >
                  <span>
                    <span className="block font-hud text-[9px] tracking-[0.22em] text-hud/80">
                      Slot {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`mt-1 block whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.14em] ${
                        on ? 'text-ink' : 'text-ink-dim group-hover:text-ink'
                      }`}
                    >
                      {c.category}
                    </span>
                  </span>
                  <span className="absolute right-3 top-3 font-hud text-[10px] text-ink-mute">
                    {String(c.items.length).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ---------------- inventory grid ---------------- */}
          <div
            id="loadout-grid"
            role="tabpanel"
            aria-labelledby={`slot-${slotId}`}
            className="hud-corners hud-panel relative p-4 md:p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="hud-label hud-label-accent">Inventory · {slot.category}</span>
              <span className="hud-label hidden items-center gap-1.5 sm:flex">
                <span aria-hidden className="h-1.5 w-1.5 bg-hud" /> Used in a mission / role
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={slotId}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                variants={{ show: { transition: { staggerChildren: 0.035 } } }}
                className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4"
              >
                {slot.items.map((s, i) => {
                  const on = s === item;
                  const used = Boolean(deployments[s]);
                  return (
                    <motion.li
                      key={s}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setItem(s)}
                        aria-pressed={on}
                        data-active={on || undefined}
                        className="loadout-item group relative flex h-full min-h-[76px] w-full flex-col justify-between p-3 text-left"
                      >
                        <span className="flex items-center justify-between">
                          <span className="font-hud text-[9px] tracking-[0.18em] text-ink-mute">
                            {slot.id.slice(0, 2).toUpperCase()}-{String(i + 1).padStart(2, '0')}
                          </span>
                          {used && (
                            <span aria-hidden className="h-1.5 w-1.5 bg-hud shadow-[0_0_6px_var(--hud-glow)]" />
                          )}
                        </span>
                        <span
                          className={`mt-3 font-hud text-[11px] font-medium uppercase leading-snug tracking-[0.08em] md:text-xs ${
                            on ? 'text-ink' : 'text-ink-dim group-hover:text-ink'
                          }`}
                        >
                          {s}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </AnimatePresence>
          </div>

          {/* ---------------- item inspector ---------------- */}
          <aside aria-live="polite" className="hud-panel relative overflow-hidden p-5">
            <span aria-hidden className="loadout-inspect-scan" key={item} />
            <div className="flex items-center gap-2">
              <Crosshair aria-hidden className="h-3.5 w-3.5 text-hud" />
              <span className="hud-label hud-label-accent">Item Inspector</span>
            </div>

            <p className="mt-5 hud-label">
              Slot {String(slotIndex + 1).padStart(2, '0')} · {slot.category}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-ink">
              {item}
            </h3>

            <p className="mt-6 hud-label">Deployment Log</p>
            {records.length ? (
              <ul className="mt-3 space-y-2">
                {records.map((r) => (
                  <li key={`${r.kind}-${r.label}`}>
                    <a
                      href={r.href}
                      onClick={(e) => handleAnchorClick(e, r.href)}
                      className="group flex items-start gap-2.5 text-sm text-ink-dim transition-colors hover:text-ink"
                    >
                      <span aria-hidden className="mt-1.5 h-1 w-1 flex-none rotate-45 bg-hud" />
                      <span>
                        <span className="font-hud text-[10px] uppercase tracking-[0.16em] text-hud/80">
                          {r.kind}
                        </span>
                        <span className="block leading-snug">{r.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-ink-mute">
                Listed in my technical skills. Not tied to a specific mission or role shown here.
              </p>
            )}
          </aside>
        </div>
      </Reveal>
    </SectionShell>
  );
}
