'use client';

import Link from 'next/link';
import { Reveal } from './Reveal';

const NAP_ADDRESS = 'Nayak Layout, 8th Phase, J. P. Nagar, Bengaluru, Karnataka 560076';
const NAP_PHONE = '+91 89515 53531';
const NAP_PHONE_HREF = 'tel:+918951553531';
const WA_HREF =
  'https://wa.me/918951553531?text=' +
  encodeURIComponent(
    'Hi Agastya, I run a dental clinic in Bangalore and would like to learn more.'
  );

const solutions = [
  { label: 'Dental CRM', href: '/dental-crm-software', desc: 'Manage patients & follow-ups', icon: '🗂️' },
  { label: 'Dental Websites', href: '/dental-website-development', desc: 'Convert visitors to bookings', icon: '🌐' },
  { label: 'Dental SEO', href: '/dental-seo-services', desc: 'Rank #1 in your area', icon: '📈' },
  { label: 'Appointment Software', href: '/dentist-appointment-software', desc: 'Zero no-shows', icon: '📅' },
  { label: 'Practice Automation', href: '/dental-practice-automation', desc: 'Run your clinic on autopilot', icon: '⚙️' },
];

const company = [
  ['About', '/about'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialLinks = [
  { href: WA_HREF, label: 'WhatsApp', Icon: WhatsAppIcon },
];

export function Footer() {
  return (
    <footer className="full-bleed" style={{ background: '#111122', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle dot grid texture — pure CSS, zero JS cost */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(232,108,47,0.10) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, white 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, white 20%, transparent 75%)',
        }}
      />

      {/* Saffron top accent border */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, #E86C2F 0%, #f59e0b 60%, transparent 100%)', position: 'relative', zIndex: 2 }} />

      {/* Micro-CTA strip — tightened copy */}
      <div style={{ background: 'rgba(232,108,47,0.07)', borderBottom: '1px solid rgba(232,108,47,0.12)', position: 'relative', zIndex: 2 }}>
        <div className="site-container" style={{ padding: '13px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            💬 Still deciding? See the CRM live first.
          </p>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E86C2F', whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            WhatsApp us now →
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="site-container" style={{ paddingTop: '3.5rem', paddingBottom: '3rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>

          {/* Col 1 — Brand + contact + CTA */}
          <Reveal>
            <div>
              <div className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff' }}>
                Agastya<span style={{ color: '#E86C2F' }}>One</span>
              </div>
              <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.45)', maxWidth: 220 }}>
                Dental digital solutions built in Bengaluru — by someone who has actually sat in the dentist&rsquo;s chair too long.
              </p>

              {/* Contact */}
              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href={NAP_PHONE_HREF} style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ color: '#E86C2F' }}>📞</span>{NAP_PHONE}
                </a>
                <a href="mailto:kancharlaagastya@gmail.com" style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ color: '#E86C2F' }}>✉️</span>kancharlaagastya@gmail.com
                </a>
                <address style={{ fontStyle: 'normal', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.5, marginTop: 2 }}>
                  {NAP_ADDRESS}
                </address>
              </div>

              {/* Social */}
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem' }}>
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ display: 'inline-flex', width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#E86C2F'; (e.currentTarget as HTMLAnchorElement).style.color = '#E86C2F'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              {/* Book a Call CTA */}
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  marginTop: '1.5rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '999px',
                  background: '#E86C2F',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  gap: 6,
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#d05a1f')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#E86C2F')}
              >
                📞 Book a Free Call
              </Link>
            </div>
          </Reveal>

          {/* Col 2 — Solutions with icons + descriptions */}
          <Reveal delay={80}>
            <div>
              <h3 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E86C2F', marginBottom: '1rem' }}>
                Solutions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {solutions.map(({ label, href, desc, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: 9 }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      (el.querySelector('.sol-label') as HTMLElement).style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      (el.querySelector('.sol-label') as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', marginTop: 1, flexShrink: 0 }}>{icon}</span>
                    <span>
                      <span className="sol-label" style={{ display: 'block', fontSize: '0.83rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', transition: 'color 0.15s' }}>
                        {label}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.73rem', color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>
                        {desc}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Col 3 — Company + trust block */}
          <Reveal delay={160}>
            <div>
              <h3 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E86C2F', marginBottom: '1rem' }}>
                Company
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {company.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Trust block */}
              <div style={{ marginTop: '1.75rem', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(232,108,47,0.18)', background: 'rgba(232,108,47,0.05)' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E86C2F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
                  Why clinics choose us
                </p>
                {[
                  'Bengaluru-based, always reachable',
                  'Dental-focused, nothing else',
                  'Replies within 1 hour on WhatsApp',
                ].map(line => (
                  <p key={line} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', margin: '0.35rem 0', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <span style={{ color: '#E86C2F', marginTop: 1, flexShrink: 0 }}>✓</span>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2, background: '#111122' }}>
        <div className="site-container" style={{ padding: '1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © 2026 AgastyaOne · Built in Bengaluru 🦷
          </p>
          <Link
            href="/contact"
            style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#E86C2F')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.3)')}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
