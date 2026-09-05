'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const FEATURES = [
  {
    tab: 'Online Booking',
    icon: '🗓️',
    headline: 'Patients book at 11PM. You wake up to a full schedule.',
    body: 'Let patients request appointments 24/7 from your website or WhatsApp link. Every request is captured and routed automatically into your clinic\'s CRM or a shared Sheet — structured, not scattered across calls and messages.',
    stat: '24/7',
    statLabel: 'booking availability',
    highlight: true,
  },
  {
    tab: 'WhatsApp Reminders',
    icon: '💬',
    headline: 'Patients who forget don\'t show. Reminders fix that.',
    body: 'Automatic WhatsApp messages go out 24 hours and 2 hours before every appointment. Patients confirm with one tap. No manual calls from reception.',
    stat: '↓68%',
    statLabel: 'no-show reduction',
    highlight: true,
  },
  {
    tab: 'Confirmation',
    icon: '✅',
    headline: 'Know which slots are secure before the day starts.',
    body: 'Every booking gets a confirmation request. Your dashboard shows confirmed, pending and at-risk slots — so you can fill gaps before they become empty chairs.',
    stat: '5/5',
    statLabel: 'slots tracked live',
  },
  {
    tab: 'Cancellations',
    icon: '🔄',
    headline: 'A cancellation doesn\'t have to mean an empty chair.',
    body: 'When a patient cancels, the system automatically moves the conversation toward rescheduling — not just a dead end. You keep the patient and fill the slot.',
    stat: '80%',
    statLabel: 'reschedule rate',
  },
  {
    tab: 'Waitlist',
    icon: '⚡',
    headline: 'Empty slot at 3PM? Fill it in minutes.',
    body: 'Waitlisted patients are contacted instantly when a slot opens. First to reply gets the appointment. Empty chairs become recovered revenue.',
    stat: '<5 min',
    statLabel: 'to fill an open slot',
  },
  {
    tab: 'Follow-ups',
    icon: '🤝',
    headline: 'Patients who feel cared for come back.',
    body: 'After-care messages check on recovery, prompt the next step and keep the clinic top of mind. Retention goes up without your team lifting a finger.',
    stat: '+40%',
    statLabel: 'patient retention',
  },
  {
    tab: 'Dashboard',
    icon: '📊',
    headline: 'See your entire day in one clean view.',
    body: 'Upcoming bookings, confirmations, cancellations and open slots — all in one place. Your team manages the day without switching between calls, registers and WhatsApp chats.',
    stat: '1 screen',
    statLabel: 'replaces 4 tools',
  },
];

export function AppointmentFeatureTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-cycle
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % FEATURES.length);
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  // Scroll the active tab into view WITHIN the horizontal tab bar only.
  // scrollIntoView() avoided — it can target the nearest scrollable ANCESTOR
  // instead of this tab bar, which on some layouts ends up being the page
  // itself, snapping the whole page back to this section every time `active`
  // changes (every 4s from the auto-rotate interval). container.scrollTo()
  // only ever moves the tab bar's own scroll box.
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const activeBtn = container.children[active] as HTMLElement;
    if (!activeBtn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const offset =
      btnRect.left - containerRect.left -
      (containerRect.width / 2) + (btnRect.width / 2);

    container.scrollTo({
      left: container.scrollLeft + offset,
      behavior: 'smooth',
    });
  }, [active]);

  const handleTabClick = (i: number) => {
    setActive(i);
    setPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    // Resume auto-cycle after 8s of inactivity
    setTimeout(() => setPaused(false), 8000);
  };

  const f = FEATURES[active];

  return (
    <div style={{ width: '100%' }}>
      {/* Tab pill row */}
      {/* Tab pill row */}
      <div
        style={{
          overflowX: 'scroll',
          overflowY: 'visible',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 4,
        }}
      >
        <div
          ref={tabsRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 8,
            width: 'max-content',
          }}
        >
          {FEATURES.map((f, i) => (
            <button
              key={f.tab}
              onClick={() => handleTabClick(i)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '8px 16px',
                borderRadius: 999,
                border: `1.5px solid ${active === i ? '#E86C2F' : 'rgba(26,26,46,0.12)'}`,
                background: active === i ? '#E86C2F' : '#fff',
                color: active === i ? '#fff' : '#555',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                lineHeight: 1,
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>{f.icon}</span>
              <span>{f.tab}</span>
              {f.highlight && active !== i && (
                <span style={{ background: '#E86C2F', color: '#fff', fontSize: '0.58rem', fontWeight: 700, padding: '2px 5px', borderRadius: 999 }}>
                  TOP
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: 'rgba(26,26,46,0.08)', borderRadius: 999, marginTop: 12, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            background: '#E86C2F',
            width: `${((active + 1) / FEATURES.length) * 100}%`,
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* Detail panel */}
      <div
        key={active}
        style={{
          marginTop: 20,
          background: '#1a1a2e',
          borderRadius: 20,
          padding: '24px',
          animation: 'tabFadeUp 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 220,
        }}
      >
        {/* Subtle saffron glow top-right */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'rgba(232,108,47,0.12)', pointerEvents: 'none' }} />

        {/* Icon + headline */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: 'rgba(232,108,47,0.15)',
            border: '1.5px solid rgba(232,108,47,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}>
            {f.icon}
          </div>
          <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, lineHeight: 1.35, margin: 0 }}>
            {f.headline}
          </h3>
        </div>

        {/* Body */}
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.7, margin: '0 0 20px' }}>
          {f.body}
        </p>

        {/* Stat + CTA row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ color: '#E86C2F', fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>{f.stat}</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.statLabel}</span>
          </div>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#E86C2F', color: '#fff',
              borderRadius: 999, padding: '9px 18px',
              fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            Get This →
          </Link>
        </div>
      </div>

      {/* Dot nav */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        {FEATURES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTabClick(i)}
            style={{
              width: active === i ? 20 : 7,
              height: 7,
              borderRadius: 999,
              background: active === i ? '#E86C2F' : 'rgba(26,26,46,0.2)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes tabFadeUp {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .apt-tabs-scroll::-webkit-scrollbar { display: none; }
        [data-apt-scroll]::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

