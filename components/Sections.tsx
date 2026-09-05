'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { CSSProperties } from 'react';

const HeroCRMPanelClient = dynamic(
  () => import('./HeroCRMPanel').then(m => m.HeroCRMPanel),
  { ssr: false }
);

const HeroDentalWebsitePanelClient = dynamic(
  () => import('./HeroDentalWebsitePanel').then(m => m.HeroDentalWebsitePanelClient),
  { ssr: false }
);

const HeroAboutPanelClient = dynamic(
  () => import('./HeroAboutPanel').then(m => m.HeroAboutPanelClient),
  { ssr: false }
);
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle,
  Clock,
  MapPin,
  MessageCircle,
  Sparkles,
  Star,
  Zap,
  type LucideIcon
} from 'lucide-react';
import { Button } from './Button';
import { Reveal } from './Reveal';

export type LinkItem = { label: string; href: string };
export type TextBlock = { title?: string; body?: string; items?: string[]; links?: LinkItem[] };

const serviceIcons: Record<string, string> = {
  Website: '🌐',
  CRM: '📊',
  SEO: '🔍',
  WhatsApp: '💬',
  Loyalty: '⭐',
  Automation: '⚡'
};

function heroEyebrow(slug: string) {
  const map: Record<string, string> = {
    'dental-crm-software': '📋 Patient Management',
    'dental-website-development': '🌐 Websites That Convert',
    'dental-seo-services': '🔍 Get Found on Google',
    'dentist-appointment-software': '📅 Smart Scheduling',
    'dental-practice-automation': '⚡ Less Manual Work',
    'dental-solutions': '🦷 Full Solutions Suite',
    'dental-solutions-bangalore': '🦷 Bangalore Clinics',
    'dental-crm-bangalore': '📋 CRM for Bangalore',
    'dental-seo-bangalore': '🔍 SEO for Bangalore',
    'dental-website-development-bangalore': '🌐 Websites for Bangalore',
    'about': '👋 Our Story',
    'blog': '📝 Insights',
    'contact': '💬 Let\'s Talk',
  };
  return map[slug] || '✨ AgastyaOne';
}

function pillForTitle(title?: string, eyebrow?: string) {
  if (eyebrow) return eyebrow;
  if (!title) return '✨ AgastyaOne';
  if (title.includes('Dental') || title.includes('Clinic')) return '🦷 For Dental Clinics';
  if (title.includes('Offer') || title.includes('Need')) return '✨ Services';
  if (title.includes('Simple') || title.includes('Started')) return '⚡ How It Works';
  if (title.includes('FAQ')) return '💬 Questions';
  if (title.includes('Person') || title.includes('Entrepreneur')) return '✨ Our Story';
  return '✨ AgastyaOne';
}

export function Section({
  eyebrow,
  title,
  body,
  children,
  tint = false,
  dark = false
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  children?: React.ReactNode;
  tint?: boolean;
  dark?: boolean;
}) {
  const sectionBg = dark ? 'dark-pattern text-white' : tint ? 'bg-[#F8F6F3]' : 'bg-white';

  return (
    <section className={`full-bleed ${sectionBg}`}>
      <div className="site-container py-20 md:py-28">
        {(eyebrow || title || body) && (
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className={`mb-4 inline-flex items-center rounded-full px-4 py-1 text-sm font-medium ${dark ? 'bg-white/10 text-white' : 'bg-orange-100 text-orange-700'}`}>
              {pillForTitle(title, eyebrow)}
            </p>
            {title && <h2 className={`font-heading text-3xl font-bold md:text-5xl ${dark ? 'text-white' : 'text-[#1A1A2E]'}`}>{title}</h2>}
            {body && <p className={`mt-4 text-base leading-7 ${dark ? 'text-white/70' : 'text-gray-600'}`}>{body}</p>}
          </Reveal>
        )}
        {children && <Reveal delay={120}>{children}</Reveal>}
      </div>
    </section>
  );
}

export function Hero({
  title,
  subtitle,
  ctas,
  imageAlt,
  showCRM = false,
  lightPanel = false,
  showWebsitePanel = false,
  showAboutPanel = false,
  slug = '',
}: {
  title: string;
  subtitle: string;
  ctas: LinkItem[];
  imageAlt: string;
  showCRM?: boolean;
  lightPanel?: boolean;
  showWebsitePanel?: boolean;
  showAboutPanel?: boolean;
  slug?: string;
}) {
  const highlightedTitle = title.split('Dental Clinics');
  const [panelIdx, setPanelIdx] = React.useState(0);
  const displaySubtitle = subtitle;

  // Hero headline — home page gets explicit line breaks + orange highlight
  // All other pages use their own page.h1, highlighting "Dental Clinics" if present
  const HeroHeadline = () => {
    if (slug === '') {
      return (
        <h1
          className="font-heading font-black leading-tight tracking-tight text-[#1A1A2E]"
          style={{ fontSize: 'clamp(1.75rem, 8vw, 4.5rem)' }}
        >
          We Help Bengaluru{' '}
          <span className="bg-gradient-to-r from-[#E86C2F] to-[#f59e0b] bg-clip-text text-transparent">
            Dental Clinics
          </span>
          <br />
          Rank Higher, Get More Reviews
          <br />
          &amp; Book More Patients
        </h1>
      );
    }
    // Service pages — highlight the first matching key term in orange
    const highlightTerms = [
      "Dental Clinic's",
      "Dental Clinics",
      "Bengaluru",
      "Bangalore",
    ];
    const matchedTerm = highlightTerms.find(term => title.includes(term));
    const parts = matchedTerm ? title.split(matchedTerm) : null;

    return (
      <h1
        className="font-heading font-black leading-tight tracking-tight text-[#1A1A2E]"
        style={{ fontSize: 'clamp(1.6rem, 6vw, 3.75rem)' }}
      >
        {parts ? (
          <>
            {parts[0]}
            <span className="bg-gradient-to-r from-[#E86C2F] to-[#f59e0b] bg-clip-text text-transparent">
              {matchedTerm}
            </span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h1>
    );
  };

  return (
    <section className="full-bleed overflow-hidden bg-gradient-to-br from-[#F8F6F3] to-white">
      <div className="dot-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div className={"site-container relative grid items-center gap-8 py-10 md:py-16 lg:py-20 " + (showCRM || ['dental-website-development','dental-seo-services','dentist-appointment-software','dental-practice-automation'].includes(slug) ? "lg:grid-cols-[1fr_.95fr]" : "lg:grid-cols-[1.05fr_.95fr]")}>
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700">
            {slug === '' ? '✨ Bengaluru growth systems' : heroEyebrow(slug)}
          </p>
          <HeroHeadline />
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg md:leading-8">
            {displaySubtitle}
          </p>

          {showCRM && (
            <div className="my-8 lg:hidden" style={{ minHeight: 420 }}>
              <HeroCRMPanelClient onPanelChange={setPanelIdx} light={lightPanel} />
            </div>
          )}
          {!showCRM && slug === 'dental-seo-services' && (
            <div className="my-8 lg:hidden" style={{ minHeight: 420 }}>
              <SEOHeroPanel />
            </div>
          )}
          {showWebsitePanel && (
            <div className="my-8 lg:hidden" style={{ minHeight: 420 }}>
              <HeroDentalWebsitePanelClient />
            </div>
          )}
          {showAboutPanel && (
            <div className="my-8 lg:hidden" style={{ minHeight: 420 }}>
              <HeroAboutPanelClient />
            </div>
          )}

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button href={ctas[0].href} variant="primary">
              {ctas[0].label}
            </Button>
            {ctas[1] && (
              <a
                href={ctas[1].href}
                className="text-sm font-semibold text-gray-500 underline-offset-4 transition hover:text-[#E86C2F] hover:underline"
              >
                {ctas[1].label} →
              </a>
            )}
          </div>
        </div>

        {showCRM && (
          <Reveal delay={160} className="hidden lg:block">
            <HeroCRMPanelClient onPanelChange={setPanelIdx} />
          </Reveal>
        )}

        {!showCRM && slug === 'dental-seo-services' && (
          <Reveal delay={160} className="hidden lg:block">
            <SEOHeroPanel />
          </Reveal>
        )}

        {showWebsitePanel && (
          <Reveal delay={160} className="hidden lg:block">
            <HeroDentalWebsitePanelClient />
          </Reveal>
        )}
        {showAboutPanel && (
          <Reveal delay={160} className="hidden lg:block">
            <HeroAboutPanelClient />
          </Reveal>
        )}

        {!showCRM && !showWebsitePanel && slug === 'dentist-appointment-software' && (
          <Reveal delay={160}>
            <WhatsAppBookingPanel />
          </Reveal>
        )}

        {!showCRM && !showWebsitePanel && !showAboutPanel && slug !== 'dental-seo-services' && slug !== 'dentist-appointment-software' && (
          <Reveal delay={160}>
            <DashboardHeroPanel alt={imageAlt} />
          </Reveal>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@keyframes subtitleFade { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:none; } }' }} />
    </section>
  );
}

function SEOHeroPanel() {
  const [step, setStep] = React.useState(0);
  const [reviews, setReviews] = React.useState(12);
  const [rank, setRank] = React.useState(7);

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 2800),
      setTimeout(() => { setStep(4); setReviews(r => r + 1); setRank(6); }, 3600),
      setTimeout(() => { setStep(5); setReviews(r => r + 1); setRank(4); }, 4400),
      setTimeout(() => { setStep(6); setReviews(r => r + 1); setRank(2); }, 5400),
      setTimeout(() => { setStep(7); setReviews(r => r + 1); setRank(1); }, 6400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const clinics = [
    { name: 'SmileCare Dental', rating: 4.8, reviews: 127, badge: null },
    { name: 'Your Clinic', rating: 4.6, reviews, badge: 'YOU' },
    { name: 'City Dental Hub', rating: 4.5, reviews: 89, badge: null },
  ];

  const sorted = rank <= 3
    ? [clinics[1], clinics[0], clinics[2]].slice(0, 3)
    : clinics;

  const tasks = [
    { label: 'GBP categories updated', done: step >= 1 },
    { label: 'Photos & services added', done: step >= 2 },
    { label: 'Local keywords mapped', done: step >= 3 },
    { label: 'Review system activated', done: step >= 4 },
    { label: 'On-page SEO complete', done: step >= 5 },
    { label: 'Citations built', done: step >= 6 },
  ];

  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      border: '1.5px solid #E5E7EB',
      boxShadow: '0 20px 60px rgba(26,26,46,0.10)',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, sans-serif',
      maxWidth: 380,
    }}>
      {/* Title bar */}
      <div style={{ background: '#1A1A2E', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ff5f57','#ffbd2e','#28c840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
          google.com/maps · dentist in Koramangala
        </div>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Maps ranking */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
            📍 Google Maps — Top 3
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sorted.map((clinic, i) => (
              <div key={clinic.name} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: clinic.badge ? '#FFFBF8' : '#F9FAFB',
                border: `1.5px solid ${clinic.badge ? '#FDDCBF' : '#F0F0F0'}`,
                borderRadius: 10, padding: '10px 12px',
                transition: 'all 0.5s ease',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  background: i === 0 ? '#E86C2F' : '#E5E7EB',
                  color: i === 0 ? '#fff' : '#6B7280',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: clinic.badge ? 700 : 500, color: clinic.badge ? '#1A1A2E' : '#374151', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {clinic.name}
                    {clinic.badge && (
                      <span style={{ background: '#E86C2F', color: '#fff', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 999 }}>YOU</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: '#F59E0B', marginTop: 2 }}>
                    {'★'.repeat(Math.floor(clinic.rating))} <span style={{ color: '#9CA3AF' }}>{clinic.reviews} reviews</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#F0F0F0' }} />

        {/* Checklist */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
            ⚡ AgastyaOne SEO in progress
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {tasks.map(task => (
              <div key={task.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                  background: task.done ? '#E86C2F' : '#F3F4F6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.4s ease',
                }}>
                  {task.done && (
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <polyline points="1.5,5 4,7.5 8.5,2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: 11, color: task.done ? '#1A1A2E' : '#9CA3AF', fontWeight: task.done ? 500 : 400, transition: 'color 0.4s ease' }}>
                  {task.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rank badge */}
        {step >= 7 && (
          <div style={{
            background: 'linear-gradient(135deg, #1A1A2E, #2d3561)',
            borderRadius: 12, padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            animation: 'fadeUp 0.4s ease',
          }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Your clinic now ranks</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 800, color: '#E86C2F' }}>#1 in Koramangala</div>
            </div>
            <div style={{ fontSize: 28 }}>🏆</div>
          </div>
        )}
      </div>
    </div>
  );
}


function DashboardHeroPanel({ alt }: { alt: string }) {
  const stats: Array<[string, string, LucideIcon]> = [
    ['Patients', 'Managed in one place', CheckCircle],
    ['Reviews', 'Requested automatically', Star],
    ['Bookings', 'Fewer manual follow-ups', Zap]
  ];

  return (
    <div
      role="img"
      aria-label={alt}
      className="rounded-2xl border border-white/20 bg-white/70 p-5 shadow-2xl backdrop-blur-sm"
    >
      <div className="rounded-2xl border border-white/40 bg-[linear-gradient(135deg,#1A1A2E_0%,#242442_58%,#11111f_100%)] p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="font-heading text-sm font-semibold text-saffron">AgastyaOne Growth OS</p>
            <p className="mt-1 text-xs text-white/55">Live pipeline dashboard</p>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-saffron" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#25D366]" />
          </div>
        </div>
        <svg viewBox="0 0 620 330" className="h-auto w-full" aria-hidden="true">
          <rect x="0" y="0" width="620" height="330" rx="22" fill="#ffffff" opacity=".08" />
          <rect x="26" y="28" width="130" height="274" rx="14" fill="#ffffff" opacity=".1" />
          <rect x="48" y="54" width="72" height="12" rx="6" fill="#E86C2F" />
          <rect x="48" y="92" width="84" height="10" rx="5" fill="#ffffff" opacity=".52" />
          <rect x="48" y="124" width="68" height="10" rx="5" fill="#ffffff" opacity=".34" />
          <rect x="48" y="156" width="92" height="10" rx="5" fill="#ffffff" opacity=".34" />
          <rect x="48" y="188" width="74" height="10" rx="5" fill="#ffffff" opacity=".34" />
          <rect x="186" y="28" width="184" height="108" rx="16" fill="#ffffff" opacity=".12" />
          <rect x="398" y="28" width="196" height="108" rx="16" fill="#ffffff" opacity=".12" />
          <rect x="186" y="166" width="408" height="136" rx="18" fill="#ffffff" opacity=".1" />
          <path className="dashboard-line dashboard-line-primary" d="M218 254 L276 214 L334 236 L392 188 L450 205 L542 178" fill="none" stroke="#E86C2F" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <path className="dashboard-line dashboard-line-secondary" d="M218 274 L276 246 L334 256 L392 232 L450 242 L542 226" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity=".85" />
          <rect x="216" y="58" width="72" height="12" rx="6" fill="#ffffff" opacity=".55" />
          <rect x="216" y="86" width="118" height="18" rx="9" fill="#E86C2F" />
          <circle cx="442" cy="82" r="30" fill="#25D366" opacity=".9" />
          <path d="M430 82 l9 9 l18 -21" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="490" y="58" width="70" height="10" rx="5" fill="#ffffff" opacity=".48" />
          <rect x="490" y="86" width="54" height="10" rx="5" fill="#ffffff" opacity=".28" />
        </svg>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {stats.map(([number, label, Icon], index) => (
            <div key={label} className="motion-card rounded-2xl border border-white/10 bg-white/10 p-4 text-center text-white" style={{ '--card-index': index } as CSSProperties}>
              <Icon className="mx-auto mb-2 text-saffron" size={20} />
              <div className="font-heading text-2xl font-black">{number}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-widest text-white/60">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhatsAppBookingPanel() {
  const [visibleCount, setVisibleCount] = React.useState(0);
  const loopRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const timersRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const startSequence = React.useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    if (loopRef.current) clearTimeout(loopRef.current);
    setVisibleCount(0);
    const t1 = setTimeout(() => setVisibleCount(1), 600);
    const t2 = setTimeout(() => setVisibleCount(2), 1600);
    const t3 = setTimeout(() => setVisibleCount(3), 2800);
    const t4 = setTimeout(() => setVisibleCount(4), 4200);
    const loop = setTimeout(() => startSequence(), 7500);
    timersRef.current = [t1, t2, t3, t4];
    loopRef.current = loop;
  }, []);

  React.useEffect(() => {
    startSequence();
    return () => {
      timersRef.current.forEach(clearTimeout);
      if (loopRef.current) clearTimeout(loopRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messages = [
    {
      from: 'clinic',
      text: 'Hi Priya! ✅ Your appointment is confirmed.',
      time: '9:01 AM',
    },
    {
      from: 'clinic',
      card: true,
      lines: [
        { icon: '📅', text: 'Tuesday, Jun 17' },
        { icon: '⏰', text: '9:00 AM' },
        { icon: '🦷', text: 'Root Canal' },
        { icon: '📍', text: 'BrightSmile Clinic, Bengaluru' },
      ],
      time: '9:01 AM',
    },
    {
      from: 'patient',
      text: 'Thank you! See you then 😊',
      time: '9:03 AM',
    },
  ];

  return (
    <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-2xl backdrop-blur-sm">
      <div className="rounded-2xl bg-[linear-gradient(135deg,#1A1A2E_0%,#242442_58%,#11111f_100%)] overflow-hidden">

        {/* WhatsApp header */}
        <div style={{ background: '#075E54', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
            🦷
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>BrightSmile Clinic</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', margin: 0 }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#25D366', marginRight: 4, verticalAlign: 'middle' }} />
              Online
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
            📞 ⋮
          </div>
        </div>

        {/* Chat area */}
        <div style={{ background: '#ECE5DD', padding: '12px 10px', minHeight: 280, position: 'relative' }}>
          {/* Wallpaper pattern */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000\' fill-opacity=\'1\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
            {/* Date chip */}
            {visibleCount >= 1 && (
              <div style={{ textAlign: 'center', marginBottom: 4, animation: 'waFadeUp 0.3s ease' }}>
                <span style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 8, padding: '3px 10px', fontSize: '0.68rem', color: '#667781', fontWeight: 600 }}>
                  Today
                </span>
              </div>
            )}

            {messages.map((msg, i) => {
              if (visibleCount < i + 1) return null;
              const isClinic = msg.from === 'clinic';
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: isClinic ? 'flex-start' : 'flex-end',
                    animation: 'waFadeUp 0.35s ease',
                  }}
                >
                  <div style={{
                    background: isClinic ? '#fff' : '#DCF8C6',
                    borderRadius: isClinic ? '0 12px 12px 12px' : '12px 0 12px 12px',
                    padding: msg.card ? '10px 12px' : '8px 10px',
                    maxWidth: '82%',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  }}>
                    {msg.card ? (
                      <div>
                        {msg.lines!.map(({ icon, text }) => (
                          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '3px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                            <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>{icon}</span>
                            <span style={{ fontSize: '0.78rem', color: '#1a1a2e', fontWeight: 600 }}>{text}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.82rem', color: '#1a1a2e', margin: 0, lineHeight: 1.45 }}>{msg.text}</p>
                    )}
                    <p style={{ fontSize: '0.62rem', color: '#667781', margin: '4px 0 0', textAlign: 'right' }}>
                      {msg.time} {isClinic ? '✓✓' : ''}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {visibleCount >= 1 && visibleCount < 4 && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'waFadeUp 0.3s ease' }}>
                <div style={{ background: '#fff', borderRadius: '0 12px 12px 12px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#667781', display: 'block', animation: `waDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stat strip */}
        <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { num: '24/7', label: 'Auto-sent' },
            { num: '0', label: 'Manual calls' },
            { num: '↓68%', label: 'No-shows' },
          ].map(({ num, label }) => (
            <div key={label} style={{ flex: 1, textAlign: 'center', padding: '10px 4px', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ color: '#E86C2F', fontSize: '0.88rem', fontWeight: 800, margin: 0 }}>{num}</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '2px 0 0' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes waFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes waDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export function TrustBar({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div className="full-bleed bg-white" id="testimonials">
      <div className="site-container grid gap-3 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item} delay={index * 70}>
            <div className="flex items-center gap-3 text-sm font-medium text-charcoal">
              <CheckCircle className="shrink-0 text-saffron" size={18} />
              {item}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function iconForCard(title?: string) {
  const key = Object.keys(serviceIcons).find((item) => title?.includes(item));
  return key ? serviceIcons[key] : '✨';
}

export function CardGrid({ cards }: { cards: TextBlock[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <Reveal key={`${card.title}-${index}`} delay={index * 70}>
          <article className="motion-card flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-card hover:border-orange-100">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl text-orange-500">
              {iconForCard(card.title)}
            </div>
            {card.title && <h3 className="font-heading text-lg font-bold text-[#1A1A2E]">{card.title}</h3>}
            {card.body && <p className="mt-2 text-sm leading-6 text-gray-500">{card.body}</p>}
            {card.items && (
              <ul className="mt-5 grid gap-3">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-gray-600">
                    <CheckCircle className="mt-0.5 shrink-0 text-saffron" size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-auto pt-5">
              {card.links ? (
                card.links.map((link) => (
                  <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 text-sm font-semibold text-saffron">
                    {link.label} <ArrowRight size={16} />
                  </Link>
                ))
              ) : (
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-saffron" aria-label={card.title ? `Learn more about ${card.title}` : 'Learn more'}>
                  Learn More <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function TextSections({ sections }: { sections: TextBlock[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {sections.map((section, index) => {
        const isAudienceCard = section.title === 'Dental Clinics';
        const isInsightCard  = section.title?.includes('60 Seconds');
        const isDarkCard     = section.title?.startsWith('DARK:');
        const isPricingCard  = section.title?.startsWith('PRICING:');
        const displayTitle   = isDarkCard ? section.title!.replace('DARK:', '') :
                               isPricingCard ? section.title!.replace('PRICING:', '') :
                               section.title;
        const isDark = isAudienceCard || isInsightCard || isDarkCard;
        return (
          <Reveal key={`${section.title}-${index}`} delay={index * 90}>
            <article className={`motion-card h-full rounded-2xl ${
              isDark        ? 'relative overflow-hidden border-0 bg-[#1A1A2E] text-white shadow-xl p-8' :
              isPricingCard ? 'relative overflow-hidden border-2 border-[#E86C2F]/20 bg-white shadow-card p-8' :
              'border border-gray-100 bg-white shadow-card p-8'
            }`}>

              {/* Audience card icon */}
              {isAudienceCard && <div className="mb-5 text-5xl">🦷</div>}

              {/* Insight card (60 seconds) decorations */}
              {isInsightCard && (
                <>
                  <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(232,108,47,0.12) 1px,transparent 1px)', backgroundSize: '18px 18px' }} />
                  <div className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg,#E86C2F,#f59e0b)' }} />
                  <div className="relative mb-5 inline-flex items-end gap-2">
                    <span className="font-heading text-6xl font-black leading-none text-[#E86C2F]">60</span>
                    <span className="mb-2 font-heading text-lg font-bold text-white/60">seconds</span>
                  </div>
                </>
              )}

              {/* Dark card (differentiation) decorations */}
              {isDarkCard && (
                <>
                  <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(232,108,47,0.08) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg,#E86C2F,#f59e0b)' }} />
                  <div className="relative mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(232,108,47,0.15)', color: '#E86C2F' }}>
                    ✦ Why AgastyaOne
                  </div>
                </>
              )}

              {/* Pricing card decorations */}
              {isPricingCard && (
                <>
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-5" style={{ background: '#E86C2F' }} />
                  <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#E86C2F]">Investment</div>
                  <div className="mb-4 flex items-end gap-1">
                    <span className="font-heading text-5xl font-black text-[#1A1A2E]">₹18,000</span>
                    <span className="mb-2 text-sm text-gray-400">starting from</span>
                  </div>
                </>
              )}

              {/* Title */}
              {displayTitle && !isPricingCard && (
                <h2 className={`relative font-heading text-xl font-semibold ${isDark ? 'text-white' : 'text-[#1A1A2E]'}`}>
                  {displayTitle}
                </h2>
              )}

              {/* Body */}
              {section.body && !isPricingCard && (
                <p className={`relative mt-4 whitespace-pre-line text-base leading-7 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  {section.body}
                </p>
              )}

              {/* Insight callout strip */}
              {isInsightCard && (
                <div className="relative mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-xl">⏱</span>
                  <p className="text-sm font-medium text-white/80">15 seconds per website. 3 websites compared. Your clinic wins or loses a patient in under a minute.</p>
                </div>
              )}

              {/* Items list */}
              {section.items && (
                <ul className={`relative mt-5 grid gap-3 ${isPricingCard ? 'gap-2' : 'gap-3'}`}>
                  {section.items.map((item) => (
                    <li key={item} className={`flex gap-3 ${isPricingCard ? 'text-sm leading-6 text-gray-700' : `leading-7 ${isDark ? 'text-white/75' : 'text-gray-600'}`}`}>
                      <CheckCircle className={`mt-0.5 shrink-0 ${isPricingCard ? 'text-[#E86C2F]' : 'text-saffron'}`} size={isPricingCard ? 16 : 18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Pricing card CTA */}
              {isPricingCard && (
                <a
                  href="/contact"
                  className="relative mt-6 inline-flex items-center justify-center rounded-full bg-[#E86C2F] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600"
                >
                  Book a Free Consultation →
                </a>
              )}
              {section.links && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${isAudienceCard ? 'border border-white text-white hover:bg-white hover:text-[#1A1A2E]' : 'border-2 border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white'}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function Steps({ steps }: { steps: string[] }) {
  const stepExtras = [
    { emoji: '📞', tag: '30 minutes', tagColor: '#E86C2F' },
    { emoji: '🔍', tag: 'Before the call', tagColor: '#f59e0b' },
    { emoji: '⚡', tag: '7 – 14 days', tagColor: '#10B981' },
    { emoji: '📈', tag: 'Every month', tagColor: '#6366f1' },
  ];

  return (
    <div>
      {/* Steps grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const [title, body] = step.split(' — ');
          const extra = stepExtras[index] ?? { emoji: '✨', tag: '', tagColor: '#E86C2F' };
          return (
            <Reveal key={step} delay={index * 90}>
              <article className="relative flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition hover:shadow-md hover:border-orange-100">
                {/* Step number badge */}
                <div className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#1A1A2E] font-heading text-xs font-black text-white shadow">
                  {index + 1}
                </div>
                {/* Emoji */}
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-sm"
                  style={{ background: `${extra.tagColor}18` }}
                >
                  {extra.emoji}
                </div>
                {/* Time tag */}
                <span
                  className="mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ background: `${extra.tagColor}15`, color: extra.tagColor }}
                >
                  {extra.tag}
                </span>
                <h3 className="font-heading text-lg font-bold text-[#1A1A2E] leading-tight">{title}</h3>
                {body && <p className="mt-2 text-sm leading-6 text-gray-500">{body}</p>}
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* CTA row */}
      <Reveal delay={400}>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#E86C2F] px-8 py-3 font-heading text-sm font-semibold text-white shadow-md transition hover:bg-orange-600"
          >
            Book My Free Call →
          </a>
          <a
            href={`https://wa.me/918951553531?text=${encodeURIComponent('Hi Agastya, I want to book a free call to discuss growing my dental clinic.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#25D366] px-8 py-3 font-heading text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us Instead
          </a>
        </div>
      </Reveal>
    </div>
  );
}

const FAQ_CATEGORIES: { label: string; emoji: string; keys: string[] }[] = [
  { label: 'Timeline & Process',   emoji: '⏱', keys: ['How long', 'What if I', 'setup take', 'take to build', 'When will', 'how soon'] },
  { label: 'Pricing & Inclusions', emoji: '💰', keys: ['Do you write', 'What about ongoing', 'cost', 'price', 'Rs ', 'cancel', 'payment', 'included', 'Investment'] },
  { label: 'Technical',            emoji: '🔧', keys: ['Will it show', 'Can I update', 'What does mobile', 'Do you build', 'WordPress', 'patient data', 'download', 'single-dentist', 'receptionist', 'safe', 'suitable'] },
];

function getFaqCategory(q: string): string {
  const lower = q.toLowerCase();
  for (const cat of FAQ_CATEGORIES) {
    if (cat.keys.some(k => lower.includes(k.toLowerCase()))) return cat.label;
  }
  return 'General';
}

function groupFaqs(items: { q: string; a: string }[]) {
  const groups: Record<string, { q: string; a: string }[]> = {};
  for (const item of items) {
    const cat = getFaqCategory(item.q);
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  }
  return groups;
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const groups = groupFaqs(items);
  const catOrder = FAQ_CATEGORIES.map(c => c.label).filter(l => groups[l]);
  if (groups['General']) catOrder.push('General');

  return (
    <div className="mx-auto max-w-3xl">
      {catOrder.map((catLabel) => {
        const cat = FAQ_CATEGORIES.find(c => c.label === catLabel);
        const catItems = groups[catLabel] || [];
        return (
          <div key={catLabel} className="mb-8">
            {/* Category header */}
            <div className="mb-3 flex items-center gap-2">
              <span className="text-base">{cat?.emoji ?? '💬'}</span>
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-gray-400">{catLabel}</span>
              <div className="flex-1 border-t border-gray-100" />
            </div>

            <div className="grid gap-2">
              {catItems.map((item, idx) => {
                const key = catLabel + idx;
                const isOpen = openKey === key;
                const isPricing = catLabel === 'Pricing & Inclusions';
                return (
                  <Reveal key={item.q} delay={idx * 40}>
                    <div className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                      isOpen && isPricing ? 'border-[#E86C2F]/30 bg-orange-50 shadow-md' :
                      isOpen ? 'border-gray-200 bg-white shadow-md' :
                      'border-gray-100 bg-white shadow-card hover:border-gray-200 hover:shadow-md'
                    }`}>
                      <button
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                      >
                        <span className={`font-heading font-semibold leading-snug ${isOpen && isPricing ? 'text-[#E86C2F]' : 'text-[#1A1A2E]'}`}>
                          {item.q}
                        </span>
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isOpen ? (isPricing ? 'bg-[#E86C2F] text-white' : 'bg-[#1A1A2E] text-white') : 'bg-gray-100 text-gray-400'
                          }`}
                          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </span>
                      </button>
                      <div style={{
                        maxHeight: isOpen ? '400px' : '0',
                        opacity: isOpen ? 1 : 0,
                        transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
                        overflow: 'hidden',
                      }}>
                        <p className={`px-5 pb-5 leading-7 text-sm ${isPricing && isOpen ? 'text-orange-900/80' : 'text-gray-600'}`}>
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ContactStrip() {
  return (
    <section className="full-bleed" id="contact-strip">
            {/* Main CTA */}
      <div className="gradient-pattern text-white">
        <div className="site-container py-20 md:py-28">
          <Reveal>
            {/* Hook question */}
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '1.25rem',
              }}
            >
              🦷 Trusted by dental clinics across Bengaluru
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              More Chairs Filled.<br />Less Chasing.
            </h2>
            <p
              style={{
                marginTop: '1.25rem',
                maxWidth: '540px',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              Right now, someone in your area is searching{' '}
              <em style={{ fontStyle: 'normal', color: '#fff', fontWeight: 600 }}>
                &ldquo;dentist near me.&rdquo;
              </em>{' '}
              Are you the one they&rsquo;re finding?
            </p>

            {/* Honesty line — no inflated numbers */}
            <p
              style={{
                marginTop: '1.5rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              Real clinics. Real systems. No inflated numbers.
            </p>
          </Reveal>

          {/* Buttons */}
          <Reveal delay={120}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="yellow">
                Book Your Free Call
              </Button>
              <a
                href="#testimonials"
                className="inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white transition"
                style={{
                  background: '#1a1a2e',
                  border: '2px solid rgba(255,255,255,0.12)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#242442';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#1a1a2e';
                }}
              >
                Talk to a Past Client
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function InfoPills() {
  const contacts = [
    {
      title: 'Call Us',
      text: '+91 89515 53531',
      sub: 'Mon–Sat, 9 AM – 7 PM',
      href: 'tel:+918951553531',
      color: '#1A1A2E',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 11.6 19.79 19.79 0 0 1 1.05 3 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
        </svg>
      ),
    },
    {
      title: 'WhatsApp',
      text: 'Message us directly',
      sub: 'Usually replies in under 1 hour',
      href: 'https://wa.me/918951553531?text=Hi%20Agastya%2C%20I%20run%20a%20dental%20clinic%20in%20Bangalore%20and%20would%20like%20to%20learn%20more.',
      color: '#25D366',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      title: 'Email',
      text: 'kancharlaagastya@gmail.com',
      sub: 'We reply within 4 hours',
      href: 'mailto:kancharlaagastya@gmail.com',
      color: '#E86C2F',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      title: 'Instagram',
      text: '@agastyaone',
      sub: 'DMs open for quick questions',
      href: 'https://instagram.com/agastyaone',
      color: '#E1306C',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      title: 'LinkedIn',
      text: 'AgastyaOne',
      sub: 'Connect for B2B conversations',
      href: 'https://linkedin.com/company/agastyaone',
      color: '#0A66C2',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      title: 'Location',
      text: 'J. P. Nagar, Bengaluru',
      sub: 'Serving clinics across Bengaluru',
      href: 'https://maps.google.com/?q=JP+Nagar+Bengaluru',
      color: '#10B981',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {contacts.map((c, index) => (
        <Reveal key={c.title} delay={index * 60}>
          <a
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="motion-card group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition hover:border-orange-100 hover:shadow-lg"
          >
            <span style={{ color: c.color }}>{c.icon}</span>
            <h3 className="mt-3 font-heading text-xl font-semibold text-[#1A1A2E] group-hover:text-[#E86C2F] transition">{c.title}</h3>
            <p className="mt-1 text-sm font-medium text-gray-700">{c.text}</p>
            <p className="mt-0.5 text-xs text-gray-400">{c.sub}</p>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

export function CheckpointList({ items }: { items: string[] }) {
  return (
    <div className="mt-8 grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-center rounded-2xl bg-white p-4 shadow-card">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Check size={18} />
          </span>
          <span className="ml-3 font-heading font-bold text-[#1A1A2E]">{item}</span>
        </div>
      ))}
    </div>
  );
}

export function WhyVisualCard() {
  return (
    <div className="rounded-2xl border border-white bg-white p-6 shadow-2xl">
      <div className="rounded-2xl bg-[#1A1A2E] p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-white/50">Growth signals</p>
            <h3 className="mt-2 font-heading text-2xl font-bold">Built from real operations</h3>
          </div>
          <BarChart3 className="text-saffron" size={34} />
        </div>
        <div className="mt-8 grid gap-4">
          {[
            ['5', 'Bengaluru neighbourhoods'],
            ['1', 'CRM built before selling'],
            ['100%', 'Operator-led strategy']
          ].map(([value, label]) => (
            <div key={label} className="flex items-center justify-between rounded-xl bg-white/10 p-4">
              <span className="text-sm text-white/65">{label}</span>
              <span className="font-heading text-2xl font-black text-saffron">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FounderCard() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col gap-6 rounded-2xl border border-white/20 bg-white/10 p-8 text-white backdrop-blur md:flex-row">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-orange-500 font-heading text-3xl font-black text-white">
          A
        </div>
        <div>
          <div className="font-heading text-6xl font-black leading-none text-saffron">&quot;</div>
          <p className="whitespace-pre-line text-base leading-7 text-white/80">
            I am Agastya. I have built a dental leads management system from scratch, worked with clinic owners across Bengaluru and sold digital solutions to dental practices across the city.

            I started AgastyaOne because every agency I encountered either did not understand how a clinic operates or did not care about results after the invoice was paid.

            At AgastyaOne, we only build what we would stake our own business on.
          </p>
          <p className="mt-6 font-heading text-lg font-semibold italic text-saffron">Agastya, Founder AgastyaOne</p>
        </div>
      </div>
    </div>
  );
}










