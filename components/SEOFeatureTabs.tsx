'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ─── Mini visual previews per feature ────────────────────────────────────────

function GBPPreview() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 4), 900);
    return () => clearInterval(t);
  }, []);
  const fields = [
    { label: 'Category', before: 'Dentist', after: '🦷 Dental Clinic + 4 more', done: step >= 1 },
    { label: 'Photos',   before: '0 photos', after: '📸 18 photos added',       done: step >= 2 },
    { label: 'Services', before: 'Not set',  after: '✅ 12 services listed',    done: step >= 3 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>GBP Before → After</div>
      {fields.map((f, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, border: `1px solid ${f.done ? 'rgba(232,108,47,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'border-color 0.4s ease' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{f.label}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: f.done ? '#E86C2F' : 'rgba(255,255,255,0.25)', transition: 'color 0.4s ease', textAlign: 'right' }}>
            {f.done ? f.after : f.before}
          </span>
        </div>
      ))}
      {step >= 3 && (
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '8px 14px', fontSize: 11, color: '#22C55E', fontWeight: 600, animation: 'fadeUp 0.3s ease' }}>
          📍 Maps ranking: position 7 → 2
        </div>
      )}
    </div>
  );
}

function KeywordsPreview() {
  const keywords = [
    { kw: 'dentist in koramangala',      vol: '320/mo', diff: 'Low'    },
    { kw: 'dental clinic near me hsr',   vol: '210/mo', diff: 'Low'    },
    { kw: 'teeth cleaning indiranagar',  vol: '140/mo', diff: 'Medium' },
    { kw: 'dental implants bangalore',   vol: '480/mo', diff: 'Medium' },
    { kw: 'root canal jayanagar',        vol: '90/mo',  diff: 'Low'    },
  ];
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVisible(v => Math.min(v + 1, keywords.length)), 500);
    return () => clearInterval(t);
  }, []);
  const diffColor = (d: string) => d === 'Low' ? '#22C55E' : '#F59E0B';
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Your keyword map</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {keywords.slice(0, visible).map((k, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, animation: 'fadeUp 0.3s ease', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>🔍 {k.kw}</span>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{k.vol}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: diffColor(k.diff) }}>{k.diff}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TreatmentPagesPreview() {
  const pages = [
    { title: 'Dental Implants in Koramangala', rank: '#4 → #1', color: '#22C55E' },
    { title: 'Root Canal Indiranagar',         rank: '#9 → #3', color: '#F59E0B' },
    { title: 'Teeth Cleaning HSR Layout',      rank: 'New → #2', color: '#E86C2F' },
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Treatment pages ranking</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {pages.map((p, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 14px', border: `1px solid rgba(255,255,255,0.08)` }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>📄 {p.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: p.color, width: tick > i ? '85%' : '20%', transition: 'width 1s ease', borderRadius: 999 }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: p.color, flexShrink: 0 }}>{p.rank}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsPreview() {
  const [count, setCount] = useState(12);
  const [messages, setMessages] = useState<string[]>([]);
  const names = ['Priya S.', 'Ravi K.', 'Meena T.', 'Arjun P.'];
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i >= names.length) return;
      setCount(c => c + 1);
      setMessages(m => [...m.slice(-2), `⭐⭐⭐⭐⭐ ${names[i]} left a review`]);
      i++;
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#F59E0B', fontFamily: 'Poppins,sans-serif', lineHeight: 1 }}>{count}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Google Reviews</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: '#F59E0B' }}>{'★'.repeat(5)}</div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999, marginTop: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#F59E0B', width: `${Math.min((count / 50) * 100, 100)}%`, transition: 'width 0.6s ease', borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>Goal: 50 reviews</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, height: 72, overflow: 'hidden', justifyContent: 'flex-end' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, padding: '7px 12px', fontSize: 11, color: 'rgba(255,255,255,0.6)', animation: 'fadeUp 0.3s ease', flexShrink: 0 }}>{m}</div>
        ))}
      </div>
    </div>
  );
}

function CitationsPreview() {
  const dirs = [
    { name: 'Justdial',       status: 'fixed',   icon: '📋' },
    { name: 'Sulekha',        status: 'fixed',   icon: '📋' },
    { name: 'IndiaMart',      status: 'added',   icon: '✅' },
    { name: 'PractoDirectory',status: 'added',   icon: '✅' },
    { name: 'HealthGrades',   status: 'pending', icon: '⏳' },
    { name: 'Google Maps',    status: 'fixed',   icon: '📍' },
  ];
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVisible(v => Math.min(v + 1, dirs.length)), 600);
    return () => clearInterval(t);
  }, []);
  const statusColor = (s: string) => s === 'fixed' ? '#E86C2F' : s === 'added' ? '#22C55E' : '#9CA3AF';
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Directory citations</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {dirs.slice(0, visible).map((d, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${statusColor(d.status)}33`, borderRadius: 8, padding: '8px 10px', animation: 'fadeUp 0.3s ease' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>{d.icon} {d.name}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: statusColor(d.status), textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportingPreview() {
  const metrics = [
    { label: 'Maps Position',    before: '#7', after: '#2',   color: '#E86C2F' },
    { label: 'Monthly Calls',    before: '14', after: '38',   color: '#22C55E' },
    { label: 'Google Reviews',   before: '12', after: '29',   color: '#F59E0B' },
    { label: 'Page 1 Keywords',  before: '2',  after: '11',   color: '#3B82F6' },
  ];
  const [showAfter, setShowAfter] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowAfter(true), 1000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, padding: '0 2px' }}>
        <span>Metric</span>
        <div style={{ display: 'flex', gap: 24 }}><span>Month 1</span><span style={{ color: showAfter ? '#E86C2F' : 'rgba(255,255,255,0.35)' }}>Month 4</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{m.label}</span>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>{m.before}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: showAfter ? m.color : 'rgba(255,255,255,0.15)', transition: 'color 0.5s ease' }}>{showAfter ? m.after : '—'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GEOPreview() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 3), 1400);
    return () => clearInterval(t);
  }, []);
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Asked on an AI answer engine</div>
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 14px', marginBottom: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>💬 "Best dentist near Koramangala for a root canal?"</span>
      </div>
      <div style={{ background: step >= 1 ? 'rgba(232,108,47,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${step >= 1 ? 'rgba(232,108,47,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 10, padding: '10px 14px', transition: 'all 0.5s ease' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>AI answer</div>
        <div style={{ fontSize: 11, color: step >= 1 ? '#fff' : 'rgba(255,255,255,0.3)', lineHeight: 1.6, transition: 'color 0.5s ease' }}>
          {step >= 1 ? 'A few options come up locally, including your clinic — with its services, hours and reviews cited directly.' : 'Waiting for AI engines to have enough structured signal about your clinic…'}
        </div>
      </div>
      {step >= 2 && (
        <div style={{ marginTop: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '8px 14px', fontSize: 11, color: '#22C55E', fontWeight: 600, animation: 'fadeUp 0.3s ease' }}>
          ✓ Structured for GBP, website and reviews to be citable by AI engines
        </div>
      )}
    </div>
  );
}

// ─── Feature data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    tab: 'GBP',
    icon: '📍',
    fullLabel: 'GBP Optimisation',
    headline: 'Your Google Maps profile is the first thing patients see. Most clinics have it set up wrong.',
    body: 'We audit and rebuild your Google Business Profile completely — categories, services, photos, descriptions and local signals. A fully optimised GBP directly improves your Maps ranking and the number of calls you get.',
    stat: '#1–3',
    statLabel: 'Maps position target',
    preview: GBPPreview,
    highlight: true,
  },
  {
    tab: 'Keywords',
    icon: '🔍',
    fullLabel: 'Local Keyword Research',
    headline: 'Ranking for the wrong keywords is worse than not ranking at all.',
    body: 'We identify the exact searches patients use in your neighbourhood — not generic national keywords. Every page gets a primary local keyword, secondary terms, and semantic signals that tell Google exactly who you serve.',
    stat: 'Local-first',
    statLabel: 'not generic national keywords',
    preview: KeywordsPreview,
  },
  {
    tab: 'Pages',
    icon: '📄',
    fullLabel: 'Treatment Pages',
    headline: 'One generic "Services" page won\'t rank. Treatment-specific pages do.',
    body: 'We build and optimise dedicated pages for each treatment in your neighbourhood — "dental implants in Koramangala", "teeth cleaning HSR Layout". Each page balances SEO signals with genuine patient education.',
    stat: 'Treatment-specific',
    statLabel: 'not one generic services page',
    preview: TreatmentPagesPreview,
  },
  {
    tab: 'Reviews',
    icon: '⭐',
    fullLabel: 'Review Generation',
    headline: 'More recent reviews build more trust — and Google rewards clinics that keep earning them.',
    body: 'We build a repeatable system for requesting reviews at exactly the right moment — after treatment, via WhatsApp, automatically. You don\'t have to ask anyone manually ever again. Reviews compound into a permanent trust advantage.',
    stat: 'Automatic',
    statLabel: 'requested after every visit',
    preview: ReviewsPreview,
    highlight: true,
  },
  {
    tab: 'Citations',
    icon: '🗂️',
    fullLabel: 'Local Citations',
    headline: 'Inconsistent business details confuse Google and hurt your rankings.',
    body: 'We audit your directory listings across Practo, Justdial, Sulekha, IndiaMART and more — fixing mismatches in name, address and phone. Consistent NAP signals across every directory are a foundational ranking factor most clinics ignore.',
    stat: 'NAP',
    statLabel: 'consistency across directories',
    preview: CitationsPreview,
  },
  {
    tab: 'AI Search',
    icon: '🤖',
    fullLabel: 'AI Search Visibility (GEO)',
    headline: 'Patients are starting to ask ChatGPT, Gemini and Perplexity for a dentist nearby — almost no clinic is set up for that yet.',
    body: 'We structure your website content, Google Business Profile data and review signals so AI answer engines can actually find and recommend your clinic — not just Google Search. Almost no dental clinics in Bengaluru are optimised for this yet, which makes it an early-mover advantage while it lasts.',
    stat: 'Early-mover',
    statLabel: 'almost no clinics do this yet',
    preview: GEOPreview,
  },
  {
    tab: 'Reporting',
    icon: '📊',
    fullLabel: 'Monthly Reporting',
    headline: 'You get numbers that mean something — not vanity charts.',
    body: 'Every month you get a clear report showing Maps position, calls received, review count, page 1 keywords and next actions. We focus on business impact: did more patients find you this month than last month?',
    stat: 'Monthly',
    statLabel: 'impact-focused reports',
    preview: ReportingPreview,
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function SEOFeatureTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % FEATURES.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  // Scroll the active tab button into view WITHIN the horizontal tab bar only.
  // scrollIntoView() is intentionally avoided here — even with block:'nearest' it
  // can trigger the nearest scrollable ANCESTOR, which on some layouts ends up
  // being the page itself, causing the whole page to jump back to this section
  // every time `active` changes (every 5s from the auto-rotate interval).
  // container.scrollTo() only ever scrolls the tab bar's own scroll box, so the
  // page's vertical scroll position is never touched.
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

  const handleTab = (i: number) => {
    setActive(i);
    setPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => setPaused(false), 10000);
  };

  const f = FEATURES[active];
  const Preview = f.preview;

  return (
    <div style={{ width: '100%' }}>
      {/* Tab pills */}
      <div style={{ overflowX: 'scroll', overflowY: 'visible', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', paddingBottom: 4 }}>
        <div ref={tabsRef} style={{ display: 'flex', gap: 8, width: 'max-content' }}>
          {FEATURES.map((feat, i) => (
            <button
              key={feat.tab}
              onClick={() => handleTab(i)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '8px 16px', borderRadius: 999,
                border: `1.5px solid ${active === i ? '#E86C2F' : 'rgba(26,26,46,0.12)'}`,
                background: active === i ? '#E86C2F' : '#fff',
                color: active === i ? '#fff' : '#555',
                fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                whiteSpace: 'nowrap', lineHeight: 1,
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>{feat.icon}</span>
              <span>{feat.tab}</span>
              {feat.highlight && active !== i && (
                <span style={{ background: '#E86C2F', color: '#fff', fontSize: '0.58rem', fontWeight: 700, padding: '2px 5px', borderRadius: 999 }}>KEY</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: 'rgba(26,26,46,0.08)', borderRadius: 999, marginTop: 12, overflow: 'hidden' }}>
        <div style={{ height: '100%', background: '#E86C2F', width: `${((active + 1) / FEATURES.length) * 100}%`, transition: 'width 0.4s ease' }} />
      </div>

      {/* Panel — two column on desktop */}
      <div
        key={active}
        style={{
          marginTop: 20,
          background: '#1A1A2E',
          borderRadius: 20,
          padding: 'clamp(20px,4vw,28px)',
          animation: 'tabFadeUp 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
          minHeight: 320,
        }}
      >
        <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(232,108,47,0.10)', pointerEvents: 'none' }} />

        {/* Left — text */}
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(232,108,47,0.15)', border: '1.5px solid rgba(232,108,47,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {f.icon}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#E86C2F', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{f.fullLabel}</div>
          </div>
          <h3 style={{ color: '#fff', fontSize: 'clamp(14px,2.5vw,16px)', fontWeight: 800, lineHeight: 1.4, margin: '0 0 10px' }}>{f.headline}</h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7, margin: '0 0 20px' }}>{f.body}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ color: '#E86C2F', fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>{f.stat}</span>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.statLabel}</span>
            </div>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E86C2F', color: '#fff', borderRadius: 999, padding: '9px 18px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
              Get started →
            </Link>
          </div>
        </div>

        {/* Right — animated preview */}
        <div style={{ position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.06)', paddingLeft: 'clamp(0px,4vw,24px)', minHeight: 240, overflow: 'hidden' }}>
          <Preview />
        </div>
      </div>

      {/* Dot nav */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        {FEATURES.map((_, i) => (
          <button key={i} onClick={() => handleTab(i)} style={{ width: active === i ? 20 : 7, height: 7, borderRadius: 999, background: active === i ? '#E86C2F' : 'rgba(26,26,46,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
        ))}
      </div>

      <style>{`
        @keyframes tabFadeUp { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeUp    { from { opacity:0; } to { opacity:1; } }
      `}</style>
    </div>
  );
}

