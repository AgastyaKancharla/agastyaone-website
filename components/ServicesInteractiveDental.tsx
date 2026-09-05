'use client';

import { useState, useEffect, useRef } from 'react';
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
  id: string;
  title: string;
  href: string;
  icon: string;
  tagline: string;
  angles: Partial<Record<ProblemId, { stat: string; outcome: string }>>;
  primary: ProblemId[];
};

const SERVICES: Service[] = [
  {
    id: 'website',
    title: 'Dental Website',
    href: '/dental-website-development',
    icon: '🌐',
    tagline: 'A website that earns patient trust before they ever call.',
    angles: {
      invisible:  { stat: '< 60 sec', outcome: 'Patients judge your clinic in under a minute online — a professional site wins that moment.' },
      noshows:    { stat: '↑ 40%',    outcome: 'Clear service pages and a WhatsApp button filter serious patients from tyre-kickers.' },
      retention:  { stat: 'Top-of-mind', outcome: 'A strong doctor profile and reviews page keeps your clinic top-of-mind when patients search again.' },
      manual:     { stat: '24 / 7',   outcome: 'Your site answers patient questions and collects enquiries while your team focuses on care.' },
    },
    primary: ['invisible'],
  },
  {
    id: 'gbp',
    title: 'Google Business Profile',
    href: '/dental-seo-services',
    icon: '📍',
    tagline: 'Own your neighbourhood on Google Maps.',
    angles: {
      invisible:  { stat: '#1',       outcome: 'An optimised GBP puts your clinic at the top of Maps when patients search nearby.' },
      noshows:    { stat: 'Intent',   outcome: 'Maps searchers are already ready to book — they just need to find you first.' },
      retention:  { stat: 'Growing ★', outcome: 'More reviews on your GBP means lapsed patients trust you when they return to search.' },
      manual:     { stat: 'Passive',  outcome: 'A well-managed GBP drives calls and directions without any ongoing manual effort.' },
    },
    primary: ['invisible'],
  },
  {
    id: 'seo',
    title: 'Local SEO',
    href: '/dental-seo-services',
    icon: '🔍',
    tagline: 'Rank when patients search "dentist near me" in Bengaluru.',
    angles: {
      invisible:  { stat: 'Page 1',   outcome: 'Treatment-specific pages ranked for your neighbourhood bring patients who are already searching.' },
      noshows:    { stat: 'Quality',  outcome: 'Organic search brings high-intent patients — far fewer casual enquiries that ghost you.' },
      retention:  { stat: 'Owned',    outcome: 'Unlike Practo, your Google ranking is an asset your clinic owns permanently.' },
      manual:     { stat: 'Compound', outcome: 'Once rankings are built, they send patients every month with no extra work from you.' },
    },
    primary: ['invisible'],
  },
  {
    id: 'booking',
    title: 'Booking & Automation',
    href: '/dentist-appointment-software',
    icon: '📅',
    tagline: 'Fill your schedule. Stop chasing cancellations.',
    angles: {
      invisible:  { stat: '24 / 7',   outcome: 'Patients can book any time — even at midnight when they finally decide to act.' },
      noshows:    { stat: '↓ 60%',    outcome: 'Automated confirmation + reminder sequences cut no-shows dramatically.' },
      retention:  { stat: 'Waitlist', outcome: 'When a slot opens, the next patient on your waitlist fills it automatically.' },
      manual:     { stat: '0 calls',  outcome: 'Your front desk stops managing appointments by phone and WhatsApp manually.' },
    },
    primary: ['noshows', 'manual'],
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Automation',
    href: '/dental-practice-automation',
    icon: '💬',
    tagline: 'Stay connected with every patient — automatically.',
    angles: {
      invisible:  { stat: '98%',      outcome: 'WhatsApp messages are opened by 98% of recipients — far more than any email or SMS.' },
      noshows:    { stat: '↓ 70%',    outcome: 'Reminders sent 24h and 2h before appointments slash no-shows without a single manual call.' },
      retention:  { stat: '6 mo',     outcome: 'Recall messages fire automatically when a patient is due for their next visit.' },
      manual:     { stat: '0 calls',  outcome: 'Every reminder, follow-up and recall runs on autopilot — nothing for your team to do.' },
    },
    primary: ['manual', 'noshows', 'retention'],
  },
  {
    id: 'reviews',
    title: 'Google Review Automation',
    href: '/dental-practice-automation',
    icon: '⭐',
    tagline: 'Build your reputation while you sleep.',
    angles: {
      invisible:  { stat: 'More clicks', outcome: 'More recent, genuine reviews build the trust that gets a listing clicked over a competitor\'s.' },
      noshows:    { stat: 'Trust',     outcome: 'A strong review profile pre-qualifies patients — they arrive more committed and less likely to ghost.' },
      retention:  { stat: 'Recall',   outcome: 'A review request is also a touchpoint that reminds happy patients to book their next visit.' },
      manual:     { stat: 'Auto',     outcome: 'Review requests go out automatically after every visit — no one has to remember to ask.' },
    },
    primary: ['invisible', 'retention'],
  },
];

export function ServicesInteractiveDental() {
  const [active, setActive] = useState<ProblemId | null>(null);
  const [orderedIds, setOrderedIds] = useState(SERVICES.map(s => s.id));
  const [animating, setAnimating] = useState(false);
  const prevActive = useRef<ProblemId | null>(null);

  // When active changes, reorder: primary first, then secondary
  useEffect(() => {
    if (active === prevActive.current) return;
    prevActive.current = active;

    if (!active) {
      setAnimating(true);
      setTimeout(() => {
        setOrderedIds(SERVICES.map(s => s.id));
        setAnimating(false);
      }, 200);
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      const primary   = SERVICES.filter(s => s.primary.includes(active)).map(s => s.id);
      const secondary = SERVICES.filter(s => !s.primary.includes(active)).map(s => s.id);
      setOrderedIds([...primary, ...secondary]);
      setAnimating(false);
    }, 220);
  }, [active]);

  const orderedServices = orderedIds
    .map(id => SERVICES.find(s => s.id === id)!)
    .filter(Boolean);

  return (
    <section style={{ background: '#fff', padding: '72px 0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1rem,5vw,3rem)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <p style={{
            display: 'inline-block',
            background: '#FEE9D9', color: '#E86C2F',
            borderRadius: 999, padding: '4px 16px',
            fontSize: 13, fontWeight: 600, fontFamily: 'Poppins,sans-serif',
            marginBottom: 14,
          }}>
            🦷 What We Do
          </p>
          <h2 style={{
            fontFamily: 'Poppins,sans-serif',
            fontSize: 'clamp(26px,5vw,42px)',
            fontWeight: 800, color: '#1A1A2E',
            margin: '0 0 10px', lineHeight: 1.2,
          }}>
            What's your biggest challenge?
          </h2>
          <p style={{ color: '#6B7280', fontSize: 15, margin: 0, lineHeight: 1.5 }}>
            Pick one — we'll show you exactly how we solve it.
          </p>
        </div>

        {/* Problem pills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          gap: 10, marginBottom: 40,
          maxWidth: 560, marginLeft: 'auto', marginRight: 'auto',
        }}>
          {PROBLEMS.map((p) => {
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActive(isActive ? null : p.id)}
                style={{
                  border: `2px solid ${isActive ? '#E86C2F' : '#E5E7EB'}`,
                  background: isActive ? '#E86C2F' : '#fff',
                  color: isActive ? '#fff' : '#1A1A2E',
                  borderRadius: 999,
                  padding: '11px 16px',
                  fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Poppins,sans-serif',
                  textAlign: 'center', lineHeight: 1.3,
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Service cards — morph reorder grid */}
        <div
          className="dental-services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: 12,
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(6px)' : 'translateY(0)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {orderedServices.map((svc, idx) => {
            const angle     = active ? svc.angles[active] : null;
            const isPrimary = active ? svc.primary.includes(active) : false;
            const isSecondary = active !== null && !isPrimary;
            const totalPrimary = active ? SERVICES.filter(s => s.primary.includes(active)).length : 0;
            const isFirstSecondary = isSecondary && idx === totalPrimary;

            return (
              <DentalServiceCard
                key={svc.id}
                svc={svc}
                angle={angle ?? null}
                isPrimary={isPrimary}
                isSecondary={isSecondary}
                hasSelection={active !== null}
                isFirstSecondary={isFirstSecondary}
              />
            );
          })}
        </div>

        {/* Bottom CTA */}
        {active && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 14 }}>
              Not sure where to start?
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg,#E86C2F,#f59e0b)',
                color: '#fff', borderRadius: 999, padding: '13px 28px',
                fontSize: 15, fontWeight: 700,
                fontFamily: 'Poppins,sans-serif',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(232,108,47,0.3)',
              }}
            >
              Book a free 30-min call <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .dental-services-grid {
            grid-template-columns: repeat(3,1fr) !important;
            gap: 16px !important;
          }
        }
        @keyframes cardSlideIn {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </section>
  );
}

function DentalServiceCard({
  svc, angle, isPrimary, isSecondary, hasSelection, isFirstSecondary,
}: {
  svc: Service;
  angle: { stat: string; outcome: string } | null;
  isPrimary: boolean;
  isSecondary: boolean;
  hasSelection: boolean;
  isFirstSecondary: boolean;
}) {
  return (
    <>
      {/* Divider label before secondary cards */}
      {isFirstSecondary && (
        <div
          className="dental-services-grid-span"
          style={{
            gridColumn: '1 / -1',
            display: 'flex', alignItems: 'center', gap: 12,
            margin: '8px 0 4px',
          }}
        >
          <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
          <span style={{ color: '#9CA3AF', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>
            Also relevant
          </span>
          <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
        </div>
      )}

      <Link
        href={svc.href}
        style={{
          display: 'flex', flexDirection: 'column',
          background: '#fff',
          border: `2px solid ${isPrimary ? '#E86C2F' : isSecondary ? '#F3F4F6' : '#E5E7EB'}`,
          borderLeft: isPrimary ? '4px solid #E86C2F' : isSecondary ? '2px solid #F3F4F6' : '2px solid #E5E7EB',
          borderRadius: 16,
          padding: '18px 16px',
          textDecoration: 'none',
          opacity: isSecondary ? 0.55 : 1,
          transform: isPrimary ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: isPrimary
            ? '0 12px 40px rgba(232,108,47,0.18), inset 0 0 0 1px rgba(232,108,47,0.1)'
            : hasSelection && !isSecondary
            ? '0 4px 16px rgba(26,26,46,0.07)'
            : '0 2px 8px rgba(26,26,46,0.04)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 160,
          animation: isPrimary ? 'cardSlideIn 0.35s ease' : undefined,
        }}
      >
        {/* Recommended badge */}
        {isPrimary && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: 'linear-gradient(135deg,#E86C2F,#f59e0b)',
            color: '#fff', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.07em', textTransform: 'uppercase',
            padding: '3px 9px', borderRadius: 999,
            fontFamily: 'Poppins,sans-serif',
            boxShadow: '0 2px 8px rgba(232,108,47,0.35)',
          }}>
            Recommended
          </div>
        )}

        {/* Left accent bar for primary */}
        {isPrimary && (
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 4, background: 'linear-gradient(180deg,#E86C2F,#f59e0b)',
            borderRadius: '16px 0 0 16px',
          }} />
        )}

        {/* Icon */}
        <div style={{
          width: 38, height: 38, borderRadius: 10, marginBottom: 12,
          background: isPrimary ? 'rgba(232,108,47,0.1)' : '#F8F6F3',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, flexShrink: 0,
          border: isPrimary ? '1px solid rgba(232,108,47,0.2)' : '1px solid transparent',
        }}>
          {svc.icon}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Poppins,sans-serif',
          fontSize: 13, fontWeight: 700,
          color: isPrimary ? '#1A1A2E' : isSecondary ? '#9CA3AF' : '#1A1A2E',
          margin: '0 0 10px', lineHeight: 1.3,
        }}>
          {svc.title}
        </h3>

        {/* Body */}
        <div style={{ flex: 1 }}>
          {angle ? (
            <>
              <div style={{
                fontFamily: 'Poppins,sans-serif',
                fontSize: 26, fontWeight: 800,
                color: '#E86C2F', lineHeight: 1, marginBottom: 6,
              }}>
                {angle.stat}
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.55, color: '#6B7280', margin: 0 }}>
                {angle.outcome}
              </p>
            </>
          ) : (
            <p style={{ fontSize: 12, lineHeight: 1.55, color: '#6B7280', margin: 0 }}>
              {svc.tagline}
            </p>
          )}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 14,
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 12, fontWeight: 600,
          color: isPrimary ? '#E86C2F' : '#9CA3AF',
          fontFamily: 'Poppins,sans-serif',
        }}>
          Learn more <ArrowRight size={12} />
        </div>
      </Link>
    </>
  );
}
