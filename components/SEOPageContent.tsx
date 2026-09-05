'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Search, ChevronDown } from 'lucide-react';

// ─── Proof Strip ─────────────────────────────────────────────────────────────

export function SEOProofStrip() {
  const stats = [
    { icon: '🦷', value: 'Dental-only', label: 'We work exclusively with dental clinics' },
    { icon: '📍', value: 'Local-first', label: 'Built around your specific neighbourhood' },
    { icon: '📅', value: 'Monthly',     label: 'Ranking reports, every month'              },
    { icon: '🔓', value: 'No lock-in',  label: 'Month to month — cancel any time'          },
  ];
  return (
    <div style={{ background: '#1A1A2E', padding: '40px 0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1rem,5vw,3rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 24, textAlign: 'center' }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 26, fontWeight: 800, color: '#E86C2F', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Two-Track GBP vs SEO ────────────────────────────────────────────────────

const TRACKS = {
  gbp: {
    icon: <MapPin size={18} color="#E86C2F" />,
    label: 'Google Maps / GBP',
    badge: 'Results in 2–4 weeks',
    badgeColor: '#22C55E',
    headline: 'Patients searching "dentist near me" right now — ready to book',
    desc: "When someone opens Google Maps and types \"dentist in Koramangala\", your GBP is the only thing that decides if they call you or your competitor. Most clinics have an unclaimed, incomplete, or photo-free profile — and wonder why the phone isn't ringing.",
    bullets: [
      'Complete profile setup — categories, services, hours, photos',
      'Weekly Google posts to signal activity',
      'Q&A management and review response strategy',
      'Competitor gap analysis for your neighbourhood',
      'Maps ranking monitoring every month',
    ],
    stat: '2–4 wks',
    statLabel: 'to see ranking movement',
    intent: 'High intent — ready to book NOW',
    intentColor: '#22C55E',
    auditLabel: 'GBP',
  },
  seo: {
    icon: <Search size={18} color="#E86C2F" />,
    label: 'Local SEO',
    badge: 'Compounds over 3–6 months',
    badgeColor: '#3B82F6',
    headline: 'Patients searching by treatment — "dental implants Indiranagar"',
    desc: "Local SEO targets patients searching for specific treatments in your area. These pages rank on Google Search (not just Maps) and keep sending you patients permanently — unlike Practo, where the moment you stop paying, you disappear.",
    bullets: [
      'Treatment-specific pages per neighbourhood',
      'Local keyword research for your exact area',
      'On-page optimisation and schema markup',
      'Local citations and directory listings',
      'Monthly ranking report and content updates',
    ],
    stat: '3–6 mo',
    statLabel: 'to top positions that compound',
    intent: 'Research intent — comparing options',
    intentColor: '#3B82F6',
    auditLabel: 'SEO',
  },
} as const;

export function TwoTrackSection() {
  const [active, setActive] = useState<'gbp' | 'seo'>('gbp');
  const t = TRACKS[active];

  return (
    <section style={{ background: '#F8F6F3', padding: '72px 0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1rem,5vw,3rem)' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ display: 'inline-block', background: '#FEE9D9', color: '#E86C2F', borderRadius: 999, padding: '4px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'Poppins,sans-serif', marginBottom: 14 }}>
            🎯 Two different problems. Two solutions.
          </p>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(24px,4.5vw,38px)', fontWeight: 800, color: '#1A1A2E', margin: '0 0 12px', lineHeight: 1.2 }}>
            GBP and SEO are not the same thing
          </h2>
          <p style={{ color: '#6B7280', fontSize: 15, margin: '0 auto', maxWidth: 520, lineHeight: 1.6 }}>
            Most agencies bundle them without explaining what each does. Here is the honest breakdown.
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 6, gap: 6, maxWidth: 460, margin: '0 auto 32px' }}>
          {(['gbp', 'seo'] as const).map(key => (
            <button key={key} onClick={() => setActive(key)} style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: 'none', background: active === key ? '#1A1A2E' : 'transparent', color: active === key ? '#fff' : '#6B7280', fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease' }}>
              {key === 'gbp' ? '📍 Google Maps / GBP' : '🔍 Local SEO'}
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 32px rgba(26,26,46,0.06)' }}>
          {/* Header */}
          <div style={{ background: '#1A1A2E', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(232,108,47,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.icon}</div>
              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 700, color: '#fff' }}>{t.label}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: `${t.badgeColor}22`, color: t.badgeColor, border: `1px solid ${t.badgeColor}44`, borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 700, fontFamily: 'Poppins,sans-serif' }}>⏱ {t.badge}</span>
              <span style={{ background: `${t.intentColor}22`, color: t.intentColor, border: `1px solid ${t.intentColor}44`, borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 600, fontFamily: 'Poppins,sans-serif' }}>{t.intent}</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: 'clamp(20px,4vw,32px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 28 }}>
            <div>
              <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, fontWeight: 700, color: '#1A1A2E', margin: '0 0 10px', lineHeight: 1.4 }}>{t.headline}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6B7280', margin: '0 0 20px' }}>{t.desc}</p>
              <div style={{ background: '#F8F6F3', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 24, fontWeight: 800, color: '#E86C2F', lineHeight: 1 }}>{t.stat}</div>
                  <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 3 }}>{t.statLabel}</div>
                </div>
                <div style={{ width: 1, height: 36, background: '#E5E7EB', flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>Unlike paid ads — results don't stop when you stop paying.</p>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 14 }}>What's included</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {t.bullets.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#FEE9D9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="#E86C2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.55 }}>{b}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 22, background: '#E86C2F', color: '#fff', borderRadius: 999, padding: '11px 20px', fontSize: 13, fontWeight: 700, fontFamily: 'Poppins,sans-serif', textDecoration: 'none' }}>
                Free {t.auditLabel} audit <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Month Timeline ───────────────────────────────────────────────────────────

const MONTHS = [
  { month: 'Month 1',   label: 'Foundations',       color: '#E86C2F', items: ['GBP fully optimised and verified', 'Categories, photos, services all added', 'Local keyword map built for your area', 'Treatment pages drafted and published', 'Review request system activated'] },
  { month: 'Month 2–3', label: 'Rankings Move',      color: '#F59E0B', items: ['Maps position actively improving', 'First page 1 keywords appearing in Search', 'Review count growing weekly automatically', 'Citations submitted to directories', 'First ranking report delivered'] },
  { month: 'Month 4–6', label: 'Rankings Stabilise',   color: '#22C55E', items: ['Rankings hold steady in your neighbourhood', 'Multiple page 1 treatment keywords', 'Organic calls and bookings increasing', 'Monthly content updates keeping rankings', 'Competitor gap closed significantly'] },
  { month: 'Month 6+',  label: 'Compounding Growth', color: '#3B82F6', items: ['Rankings self-reinforce and hold', 'New patients arrive organically daily', 'Reviews create lasting trust advantage', 'Expanding to new treatment keywords', 'Results compound — zero extra ad spend'] },
];

export function TimelineSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ background: '#fff', padding: '72px 0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 clamp(1rem,5vw,3rem)' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ display: 'inline-block', background: '#FEE9D9', color: '#E86C2F', borderRadius: 999, padding: '4px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'Poppins,sans-serif', marginBottom: 14 }}>
            📅 What to expect
          </p>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(24px,4.5vw,36px)', fontWeight: 800, color: '#1A1A2E', margin: '0 0 10px', lineHeight: 1.2 }}>
            Month-by-month — no vague promises
          </h2>
          <p style={{ color: '#6B7280', fontSize: 15, margin: '0 auto', maxWidth: 440, lineHeight: 1.6 }}>
            This is the honest timeline of what SEO actually looks like for a dental clinic in Bengaluru.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MONTHS.map((m, i) => (
            <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{ background: open === i ? '#FFFBF8' : '#F9FAFB', border: `1.5px solid ${open === i ? m.color + '55' : '#F0F0F0'}`, borderRadius: 16, overflow: 'hidden', transition: 'all 0.25s ease', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 10, fontWeight: 700, color: m.color, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{m.month}</div>
                    <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>{m.label}</div>
                  </div>
                </div>
                <ChevronDown size={15} color="#9CA3AF" style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }} />
              </div>
              {open === i && (
                <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {m.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 17, height: 17, borderRadius: '50%', background: m.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke={m.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 14 }}>Ready to start Month 1?</p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1A1A2E', color: '#fff', borderRadius: 999, padding: '13px 28px', fontSize: 14, fontWeight: 700, fontFamily: 'Poppins,sans-serif', textDecoration: 'none' }}>
            Book a free SEO audit <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── SEO FAQ ─────────────────────────────────────────────────────────────────

const SEO_FAQS = [
  {
    q: "I tried SEO before and it didn't work. How is this different?",
    a: "Most SEO failures come from one of three things: generic national keywords with no local intent, no GBP work, or agencies that set and forget. We work exclusively with dental clinics in Bengaluru — every keyword, every page, every citation is built around how patients in your specific neighbourhood actually search. You get a monthly report showing exactly what moved and what's next.",
    highlight: true,
  },
  {
    q: "My clinic is already on Practo. Do I still need SEO?",
    a: "Absolutely — and this is important. Practo is rented visibility. The moment you stop paying, you disappear. Google ranking is an asset your clinic owns permanently. A patient who finds you through Google Maps or a treatment page you rank for costs you nothing per click. Practo charges per lead or per month, forever. SEO compounds.",
    highlight: true,
  },
  {
    q: "How long before I see results?",
    a: "Google Business Profile improvements typically show ranking movement within 2–4 weeks. Local SEO for treatment pages takes 3–6 months to reach page 1. We're honest about this upfront — SEO is not an overnight fix. But by month 4–6, the results compound every month without additional spend. We send you a ranking report every month so you see exactly where things stand.",
  },
  {
    q: "What if I stop after 3 months?",
    a: "Your GBP remains optimised, your treatment pages stay live, and your reviews don't disappear. Rankings do gradually erode without ongoing signals, but you keep what was built. That said, the clinics that see the biggest results are the ones that stay consistent for 6+ months — that's when rankings self-reinforce and organic calls start arriving daily.",
  },
  {
    q: "Will I need to write content or be involved week-to-week?",
    a: "No. We handle the writing, optimisation, posting, citation building, and review system setup entirely. Your only involvement is a monthly check-in call where we walk through the report and next actions. We built this for busy clinic owners — not for people who want to manage an agency.",
  },
  {
    q: "Do you work with newly opened clinics or only established ones?",
    a: "Both — and new clinics are often easier. Starting from zero means no bad citations to fix, no history to undo. We can build the GBP, treatment pages, and review foundation correctly from day one. Established clinics with existing rankings need an audit first to identify what's holding them back.",
  },
  {
    q: "How is this different from a general digital marketing agency?",
    a: "A general agency will apply the same SEO framework they use for a plumber, a restaurant, and a dental clinic. We work only with dental clinics in Bengaluru. We know which treatments patients in Koramangala search for, how to compete against the specific clinics ranking in Indiranagar, and what a Bengaluru patient actually needs to see before they book. That specificity is the difference.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Monthly plans only, cancel any time. We don't lock you in because we don't need to — we'd rather earn it every month. The idea is that the organic calls keep coming on their own, not because a contract forces you to stay.",
  },
];

export function SEOFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ background: '#F8F6F3', padding: '72px 0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 clamp(1rem,5vw,3rem)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <p style={{ display: 'inline-block', background: '#FEE9D9', color: '#E86C2F', borderRadius: 999, padding: '4px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'Poppins,sans-serif', marginBottom: 14 }}>
            💬 Questions
          </p>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(24px,4.5vw,36px)', fontWeight: 800, color: '#1A1A2E', margin: '0 0 10px', lineHeight: 1.2 }}>
            Questions clinic owners ask before starting
          </h2>
          <p style={{ color: '#6B7280', fontSize: 15, margin: '0 auto', maxWidth: 440, lineHeight: 1.6 }}>
            Honest answers — no agency spin.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SEO_FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  background: '#fff',
                  border: `1.5px solid ${isOpen ? '#E86C2F' : faq.highlight ? '#FDDCBF' : '#E5E7EB'}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                  boxShadow: isOpen ? '0 8px 24px rgba(232,108,47,0.10)' : 'none',
                }}
              >
                <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flex: 1 }}>
                    {faq.highlight && (
                      <div style={{ background: '#FEE9D9', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, color: '#E86C2F', fontFamily: 'Poppins,sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0, marginTop: 2 }}>
                        TOP
                      </div>
                    )}
                    <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, color: '#1A1A2E', margin: 0, lineHeight: 1.45 }}>
                      {faq.q}
                    </h3>
                  </div>
                  {/* Animated +/× */}
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    background: isOpen ? '#E86C2F' : '#F3F4F6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s ease',
                    marginTop: 2,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                      <line x1="5" y1="1" x2="5" y2="9" stroke={isOpen ? '#fff' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="1" y1="5" x2="9" y2="5" stroke={isOpen ? '#fff' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Answer — animated height */}
                <div style={{
                  maxHeight: isOpen ? 400 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  <div style={{ padding: '0 20px 20px', paddingLeft: faq.highlight ? 74 : 20 }}>
                    <div style={{ width: '100%', height: 1, background: '#F0F0F0', marginBottom: 14 }} />
                    <p style={{ fontSize: 14, lineHeight: 1.75, color: '#4B5563', margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 40, background: '#1A1A2E', borderRadius: 20, padding: 'clamp(24px,4vw,36px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(232,108,47,0.1) 1px, transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(16px,3vw,20px)', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
              Still have a question?
            </p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '0 0 24px', lineHeight: 1.6 }}>
              Book a free 30-min call. No pitch — just honest answers about whether SEO makes sense for your clinic right now.
            </p>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E86C2F', color: '#fff', borderRadius: 999, padding: '13px 28px', fontSize: 14, fontWeight: 700, fontFamily: 'Poppins,sans-serif', textDecoration: 'none' }}>
              Book a free call <ArrowRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
