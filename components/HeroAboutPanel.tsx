'use client';

import { useEffect, useRef, useState } from 'react';

const TIMELINE = [
  {
    year: '2022',
    color: '#E86C2F',
    title: 'Went inside the clinics',
    body: 'Spent months inside dental clinics in Bengaluru learning how they actually operate — not how software assumes they do.',
  },
  {
    year: '2023',
    color: '#f59e0b',
    title: 'Built the CRM first',
    body: 'Built a dental leads CRM from scratch before selling anything. Designed around how Indian clinic receptionists actually work.',
  },
  {
    year: '2024',
    color: '#10B981',
    title: 'Spoke with real clinic owners',
    body: 'Across Koramangala, Indiranagar, HSR Layout, Jayanagar and Whitefield — before writing a single line of product code.',
  },
  {
    year: '2024',
    color: '#6366f1',
    title: 'Launched AgastyaOne',
    body: 'Website, CRM, SEO and automation built as one compounding system — not four separate tools from four different vendors.',
  },
];

const STATS = [
  { number: '0', label: 'Templates used — every build is custom' },
  { number: '6 mo', label: 'Learning clinic ops before building' },
  { number: '1', label: 'Person you always speak to — Agastya' },
  { number: '100%', label: 'Dental focused — we do nothing else' },
];

export function HeroAboutPanel() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          // Animate timeline items in
          TIMELINE.forEach((_, i) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i]);
            }, i * 300);
          });
          // Animate stats in after timeline
          STATS.forEach((_, i) => {
            setTimeout(() => {
              setVisibleStats(prev => [...prev, i]);
            }, TIMELINE.length * 300 + i * 120);
          });
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={panelRef}
      style={{
        background: 'linear-gradient(135deg,#1A1A2E 0%,#242442 60%,#11111f 100%)',
        borderRadius: 20, padding: 3,
        boxShadow: '0 32px 80px rgba(26,26,46,0.22), 0 0 0 1px rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ borderRadius: 17, overflow: 'hidden', background: '#13132a', position: 'relative' }}>

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(232,108,47,0.07) 1px,transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        {/* Top accent bar */}
        <div style={{ height: 3, background: 'linear-gradient(90deg,#E86C2F,#f59e0b,#10B981)' }} />

        {/* Titlebar */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '10px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 11, color: '#E86C2F' }}>
              AgastyaOne
            </span>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10.5 }}>The Story</span>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
              <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            ))}
          </div>
        </div>

        <div style={{ padding: '18px 16px' }}>

          {/* Timeline */}
          <p style={{
            fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)',
            margin: '0 0 14px',
            fontFamily: 'Poppins,sans-serif',
          }}>
            How We Got Here
          </p>

          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: 9, top: 8, bottom: 8,
              width: 2, borderRadius: 2,
              background: 'rgba(255,255,255,0.08)',
            }} />

            {TIMELINE.map((item, i) => (
              <div
                key={i}
                style={{
                  position: 'relative', marginBottom: i < TIMELINE.length - 1 ? 14 : 0,
                  opacity: visibleItems.includes(i) ? 1 : 0,
                  transform: visibleItems.includes(i) ? 'translateX(0)' : 'translateX(-8px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: -22, top: 4,
                  width: 10, height: 10, borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}60`,
                }} />

                {/* Year badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: `${item.color}20`,
                  color: item.color,
                  borderRadius: 20, padding: '1px 7px',
                  fontSize: 9, fontWeight: 700,
                  fontFamily: 'Poppins,sans-serif',
                  marginBottom: 3,
                }}>
                  {item.year}
                </div>

                <p style={{
                  margin: '2px 0 2px',
                  fontSize: 11, fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'Poppins,sans-serif',
                  lineHeight: 1.3,
                }}>
                  {item.title}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: 10, color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.5,
                }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            margin: '16px 0',
            height: 1,
            background: 'rgba(255,255,255,0.06)',
          }} />

          {/* Stats grid */}
          <p style={{
            fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)',
            margin: '0 0 12px',
            fontFamily: 'Poppins,sans-serif',
          }}>
            By the Numbers
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 6,
          }}>
            {STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10,
                  padding: '8px 6px',
                  textAlign: 'center',
                  opacity: visibleStats.includes(i) ? 1 : 0,
                  transform: visibleStats.includes(i) ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
              >
                <p style={{
                  margin: 0,
                  fontFamily: 'Poppins,sans-serif',
                  fontSize: 15, fontWeight: 900,
                  color: '#E86C2F',
                  lineHeight: 1.1,
                }}>
                  {stat.number}
                </p>
                <p style={{
                  margin: '3px 0 0',
                  fontSize: 8, color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.4,
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export function HeroAboutPanelClient() {
  return <HeroAboutPanel />;
}
