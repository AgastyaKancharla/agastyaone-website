'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PROBLEMS = [
  { id: 'invisible',  label: "Patients can't find me online" },
  { id: 'noshows',   label: 'Too many no-shows'             },
  { id: 'retention', label: "Patients don't come back"      },
  { id: 'manual',    label: 'Too much manual work'          },
] as const;

type ProblemId = typeof PROBLEMS[number]['id'];
type Service = {
  id: string; title: string; href: string; icon: string; tagline: string;
  angles: Partial<Record<ProblemId, { stat: string; outcome: string }>>;
  primary: ProblemId[];
};

const SERVICES: Service[] = [
  { id: 'website', title: 'Dental Website', href: '/dental-website-development', icon: '🌐', tagline: 'A website that earns patient trust before they ever call.',
    angles: { invisible: { stat: '< 60 sec', outcome: 'Patients judge your clinic in under a minute — a professional site wins that moment.' }, noshows: { stat: '↑ 40%', outcome: 'Clear service pages and a WhatsApp button filter serious patients from tyre-kickers.' }, retention: { stat: '3×', outcome: 'A strong doctor profile and reviews page keeps your clinic top-of-mind.' }, manual: { stat: '24/7', outcome: 'Your site answers patient questions and collects enquiries while your team focuses on care.' } },
    primary: ['invisible'] },
  { id: 'gbp', title: 'Google Business Profile', href: '/dental-seo-services', icon: '📍', tagline: 'Own your neighbourhood on Google Maps.',
    angles: { invisible: { stat: '#1', outcome: 'An optimised GBP puts your clinic at the top of Maps when patients search nearby.' }, noshows: { stat: 'Intent', outcome: 'Maps searchers are already ready to book — they just need to find you first.' }, retention: { stat: '50+ ★', outcome: 'More reviews on your GBP means lapsed patients trust you when they return to search.' }, manual: { stat: 'Passive', outcome: 'A well-managed GBP drives calls and directions without any ongoing manual effort.' } },
    primary: ['invisible'] },
  { id: 'seo', title: 'Local SEO', href: '/dental-seo-services', icon: '🔍', tagline: 'Rank when patients search "dentist near me" in Bengaluru.',
    angles: { invisible: { stat: 'Page 1', outcome: 'Treatment-specific pages ranked for your neighbourhood bring patients who are already searching.' }, noshows: { stat: 'Quality', outcome: 'Organic search brings high-intent patients — far fewer casual enquiries that ghost you.' }, retention: { stat: 'Owned', outcome: 'Unlike Practo, your Google ranking is an asset your clinic owns permanently.' }, manual: { stat: 'Compound', outcome: 'Once rankings are built, they send patients every month with no extra work from you.' } },
    primary: ['invisible'] },
  { id: 'booking', title: 'Booking & Automation', href: '/dentist-appointment-software', icon: '📅', tagline: 'Fill your schedule. Stop chasing cancellations.',
    angles: { invisible: { stat: '24/7', outcome: 'Patients can book any time — even at midnight when they finally decide to act.' }, noshows: { stat: '↓ 60%', outcome: 'Automated confirmation + reminder sequences cut no-shows dramatically.' }, retention: { stat: 'Waitlist', outcome: 'When a slot opens, the next patient on your waitlist fills it automatically.' }, manual: { stat: '0 calls', outcome: 'Your front desk stops managing appointments by phone and WhatsApp manually.' } },
    primary: ['noshows', 'manual'] },
  { id: 'whatsapp', title: 'WhatsApp Automation', href: '/dental-practice-automation', icon: '💬', tagline: 'Stay connected with every patient — automatically.',
    angles: { invisible: { stat: '98%', outcome: 'WhatsApp messages are opened by 98% of recipients — far more than any email or SMS.' }, noshows: { stat: '↓ 70%', outcome: 'Reminders sent 24h and 2h before appointments slash no-shows without a single manual call.' }, retention: { stat: '6 mo', outcome: 'Recall messages fire automatically when a patient is due for their next visit.' }, manual: { stat: '0 calls', outcome: 'Every reminder, follow-up and recall runs on autopilot — nothing for your team to do.' } },
    primary: ['manual', 'noshows', 'retention'] },
  { id: 'reviews', title: 'Google Review Automation', href: '/dental-practice-automation', icon: '⭐', tagline: 'Build your reputation while you sleep.',
    angles: { invisible: { stat: 'More clicks', outcome: 'More recent, genuine reviews build the trust that gets a listing clicked over a competitor\'s.' }, noshows: { stat: 'Trust', outcome: 'A strong review profile pre-qualifies patients — they arrive more committed and less likely to ghost.' }, retention: { stat: 'Recall', outcome: 'A review request is also a touchpoint that reminds happy patients to book their next visit.' }, manual: { stat: 'Auto', outcome: 'Review requests go out automatically after every visit — no one has to remember to ask.' } },
    primary: ['invisible', 'retention'] },
  { id: 'ai-receptionist', title: 'AI Receptionist', href: '/dental-practice-automation', icon: '🤖', tagline: 'Answers and books for you, even after hours.',
    angles: { invisible: { stat: 'Always on', outcome: 'A patient who finds you at midnight gets answered at midnight — not the next morning after the moment has passed.' }, noshows: { stat: 'Confirms', outcome: 'It confirms details on the spot instead of leaving a booking half-finished in a missed call.' }, retention: { stat: 'Consistent', outcome: 'Every patient gets the same helpful, on-brand answer — nothing depends on who happens to pick up.' }, manual: { stat: 'Handles overflow', outcome: 'It absorbs the repeat questions and after-hours enquiries so your front desk isn\'t interrupted for every one of them.' } },
    primary: ['manual'] },
  { id: 'geo', title: 'AI Search Visibility (GEO)', href: '/dental-seo-services', icon: '✨', tagline: 'Get recommended when patients ask AI tools for a dentist.',
    angles: { invisible: { stat: 'Early-mover', outcome: 'Patients are starting to ask ChatGPT and Perplexity for a dentist nearby — almost no clinic is set up to be recommended there yet.' }, noshows: { stat: 'Pre-sold', outcome: 'A patient arriving from an AI recommendation already has context on your clinic before they ever call.' }, retention: { stat: 'Compounding', outcome: 'The same structured content that helps AI engines cite you also keeps strengthening your regular Google ranking.' }, manual: { stat: 'Set up once', outcome: 'Once your site, GBP and reviews are structured for it, there\'s nothing ongoing for your team to maintain.' } },
    primary: ['invisible'] },
];

export function ServicesInteractive() {
  const [active, setActive] = useState<ProblemId | null>(null);
  const [visible, setVisible] = useState(true);
  const prevActive = useRef<ProblemId | null>(null);

  const handleSelect = (id: ProblemId) => {
    const next = active === id ? null : id;
    if (next === prevActive.current) { setActive(next); return; }
    setVisible(false);
    setTimeout(() => { setActive(next); prevActive.current = next; setVisible(true); }, 180);
  };

  const primary   = active ? SERVICES.filter(s => s.primary.includes(active)) : [];
  const secondary = active ? SERVICES.filter(s => !s.primary.includes(active)) : SERVICES;

  return (
    <section style={{ background: '#F8F6F3', padding: '72px 0', fontFamily: 'Inter,system-ui,sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1rem,5vw,3rem)' }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ display: 'inline-block', background: '#FEE9D9', color: '#E86C2F', borderRadius: 999, padding: '4px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'Poppins,sans-serif', marginBottom: 14 }}>🦷 For Dental Clinics</p>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(26px,5vw,42px)', fontWeight: 800, color: '#1A1A2E', margin: '0 0 10px', lineHeight: 1.2 }}>What's your biggest challenge?</h2>
          <p style={{ color: '#6B7280', fontSize: 15, margin: 0, lineHeight: 1.5 }}>Pick one — we'll show you exactly how we solve it.</p>
        </div>

        {/* Challenge buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 28, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          {PROBLEMS.map(p => {
            const on = active === p.id;
            return (
              <button key={p.id} onClick={() => handleSelect(p.id)} style={{ border: `2px solid ${on ? '#E86C2F' : '#E5E7EB'}`, background: on ? '#E86C2F' : '#fff', color: on ? '#fff' : '#1A1A2E', borderRadius: 999, padding: '11px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Poppins,sans-serif', textAlign: 'center', lineHeight: 1.3 }}>
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Animated cards area */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.2s ease, transform 0.2s ease' }}>

          {/* PRIMARY — swap up directly below buttons */}
          {active && primary.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 16 }} className="primary-grid">
              {primary.map(svc => <ServiceCard key={svc.id} svc={svc} angle={svc.angles[active!] ?? null} isPrimary isDimmed={false} hasSelection />)}
            </div>
          )}

          {/* DEFAULT — show all 6 when nothing selected */}
          {!active && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }} className="services-grid">
              {SERVICES.map(svc => <ServiceCard key={svc.id} svc={svc} angle={null} isPrimary={false} isDimmed={false} hasSelection={false} />)}
            </div>
          )}

          {/* SECONDARY — compact pills when active */}
          {active && secondary.length > 0 && (
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 14, marginTop: 4 }}>
              <p style={{ color: '#9CA3AF', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Also available</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {secondary.map(svc => (
                  <Link key={svc.id} href={svc.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#6B7280', textDecoration: 'none' }}>
                    <span style={{ fontSize: 13 }}>{svc.icon}</span>{svc.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {active && (
            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E86C2F', color: '#fff', borderRadius: 999, padding: '13px 28px', fontSize: 15, fontWeight: 700, fontFamily: 'Poppins,sans-serif', textDecoration: 'none' }}>
                Book a free 30-min call <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .services-grid { grid-template-columns: repeat(3,1fr) !important; gap: 16px !important; }
          .primary-grid  { grid-template-columns: repeat(3,1fr) !important; }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ svc, angle, isPrimary, isDimmed, hasSelection }: { svc: Service; angle: { stat: string; outcome: string } | null; isPrimary: boolean; isDimmed: boolean; hasSelection: boolean; }) {
  return (
    <Link href={svc.href} style={{ display: 'flex', flexDirection: 'column', background: isPrimary ? '#1A1A2E' : '#fff', border: `2px solid ${isPrimary ? '#E86C2F' : '#E5E7EB'}`, borderRadius: 16, padding: '18px 16px', textDecoration: 'none', opacity: isDimmed ? 0.35 : 1, transform: isPrimary ? 'scale(1.01)' : 'scale(1)', transition: 'all 0.25s ease', boxShadow: isPrimary ? '0 16px 48px rgba(232,108,47,0.2)' : '0 2px 8px rgba(26,26,46,0.05)', position: 'relative', overflow: 'hidden', minHeight: 150 }}>
      {isPrimary && <div style={{ position: 'absolute', top: 10, right: 10, background: '#E86C2F', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999, fontFamily: 'Poppins,sans-serif' }}>Best match</div>}
      <div style={{ width: 38, height: 38, borderRadius: 10, marginBottom: 12, background: isPrimary ? 'rgba(232,108,47,0.2)' : '#FEE9D9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{svc.icon}</div>
      <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 700, color: isPrimary ? '#fff' : '#1A1A2E', margin: '0 0 10px', lineHeight: 1.3 }}>{svc.title}</h3>
      <div style={{ flex: 1 }}>
        {angle ? (<><div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 26, fontWeight: 800, color: '#E86C2F', lineHeight: 1, marginBottom: 6 }}>{angle.stat}</div><p style={{ fontSize: 12, lineHeight: 1.55, color: isPrimary ? 'rgba(255,255,255,0.7)' : '#6B7280', margin: 0 }}>{angle.outcome}</p></>) : (<p style={{ fontSize: 12, lineHeight: 1.55, color: '#6B7280', margin: 0 }}>{svc.tagline}</p>)}
      </div>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#E86C2F', fontFamily: 'Poppins,sans-serif' }}>Learn more <ArrowRight size={12} /></div>
    </Link>
  );
}
