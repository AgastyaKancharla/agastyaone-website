'use client';

import Link from 'next/link';

const BELIEFS = [
  { icon: '🔨', title: 'Built Before Sold', body: 'Every service we offer we built and tested ourselves first. We do not sell what we have not made.' },
  { icon: '🎯', title: 'One Industry Deep', body: 'We are not a generalist agency. We are building specifically for dental clinics. That focus is intentional and permanent.' },
  { icon: '🇮🇳', title: 'Built for India', body: 'The tools we build are designed for how Indian clinics operate — WhatsApp-first, receptionist-friendly, affordable.' },
  { icon: '📐', title: 'Simple Over Clever', body: 'A system your receptionist cannot use on a busy Monday is a failed system. Simplicity is the hardest thing to build.' },
  { icon: '📊', title: 'Results Over Reports', body: 'We measure success by patient enquiries, filled appointments and returning patients. Not impressions or reach.' },
  { icon: '🤝', title: 'Partner Not Vendor', body: 'We disappear when the invoice is paid is the agency model we are explicitly building against.' },
];

const STATS = [
  { value: '1', label: 'Dental CRM built from scratch', color: '#E86C2F' },
  { value: '5', label: 'Bengaluru neighbourhoods active', color: '#34d399' },
  { value: '100%', label: 'Dental focused — no generalist work', color: '#f59e0b' },
];

export function AboutPage() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── Founder quote section ── */}
      <section style={{ background: '#1A1A2E', padding: '64px 0' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 24 }}>From the founder</p>
          <blockquote style={{ margin: 0, padding: 0 }}>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 700, color: '#fff', lineHeight: 1.5, marginBottom: 32 }}>
              "Most technology built for dental clinics was designed for the US market, sold by agencies that have never sat inside a clinic. I wanted to build something from scratch — purpose-built for how Indian clinics actually operate. That became AgastyaOne."
            </p>
            <footer style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#E86C2F,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 18, color: '#fff', flexShrink: 0 }}>A</div>
              <div>
                <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>Agastya</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 }}>Founder, AgastyaOne · Bengaluru</div>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Story sections ── */}
      <section style={{ background: '#F8F6F3', padding: '64px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>

            {/* Why dental */}
            <div style={{ background: '#fff', borderRadius: 18, padding: '28px', borderTop: '4px solid #E86C2F', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>🦷</div>
              <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 17, fontWeight: 700, color: '#1A1A2E', margin: '0 0 12px' }}>Why We Started With Dental</h3>
              <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                AgastyaOne was built with a clear long-term goal — to become a technology company that solves every digital problem a business has. We started with dental clinics because the gap is enormous. Clinics in Bengaluru are running on WhatsApp groups and paper registers. The opportunity to build something genuinely useful was obvious.
              </p>
            </div>

            {/* What we built */}
            <div style={{ background: '#fff', borderRadius: 18, padding: '28px', borderTop: '4px solid #6366f1', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>🔨</div>
              <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 17, fontWeight: 700, color: '#1A1A2E', margin: '0 0 12px' }}>What We Actually Built</h3>
              <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                We did not start by selling services. We started by building. A dental CRM from scratch — designed around how Indian clinic receptionists actually work. Then websites. Then SEO. Then automation. Everything we sell we built and tested ourselves first.
              </p>
            </div>

            {/* Where we are */}
            <div style={{ background: '#1A1A2E', borderRadius: 18, padding: '28px', borderTop: '4px solid #34d399', boxShadow: '0 4px 20px rgba(26,26,46,0.15)' }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>📍</div>
              <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>Where We Are Right Now</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                We are early. We are building. We are selective about the clinics we work with because every early client shapes what AgastyaOne becomes. If you want to be part of building something from the ground up — not buying an off-the-shelf product — this is for you.
              </p>
              <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: 99, padding: '4px 14px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                <span style={{ color: '#34d399', fontSize: 11, fontWeight: 700 }}>Actively taking on new clinics</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(22px,4vw,34px)', fontWeight: 800, color: '#1A1A2E', margin: '0 0 10px' }}>Where We Stand Today</h2>
            <p style={{ color: '#9CA3AF', fontSize: 14, margin: 0 }}>No inflated numbers. No fake results. Just what we have actually built.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background: '#F8F6F3', borderRadius: 16, padding: '24px 20px', textAlign: 'center', border: `2px solid ${s.color}20` }}>
                <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 40, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: '#6B7280', fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we believe ── */}
      <section style={{ background: '#F8F6F3', padding: '64px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(22px,4vw,34px)', fontWeight: 800, color: '#1A1A2E', margin: '0 0 10px' }}>What We Believe</h2>
            <p style={{ color: '#9CA3AF', fontSize: 14, margin: 0 }}>The principles behind every decision we make.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
            {BELIEFS.map(b => (
              <div key={b.title} style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', border: '1px solid #F3F4F6', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{b.icon}</span>
                <div>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>{b.title}</div>
                  <div style={{ color: '#6B7280', fontSize: 13, lineHeight: 1.65 }}>{b.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: '#1A1A2E', padding: '64px 0' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(22px,4vw,34px)', fontWeight: 800, color: '#fff', margin: '0 0 14px', lineHeight: 1.3 }}>
            Want to Be One of the First Clinics We Grow?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            We are selective. We take on clinics we can genuinely help. Book a free 30 minute call and we will tell you honestly whether we are the right fit.
          </p>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg,#E86C2F,#f59e0b)',
            color: '#fff', borderRadius: 999, padding: '14px 30px',
            fontSize: 15, fontWeight: 700, fontFamily: 'Poppins,sans-serif',
            textDecoration: 'none', boxShadow: '0 8px 28px rgba(232,108,47,0.3)',
          }}>
            Book a Free 30 Min Call →
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 14 }}>
            No sales pressure. No jargon. Just an honest conversation.
          </p>
        </div>
      </section>

    </div>
  );
}
