'use client';

import Link from 'next/link';
import { Phone, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const WA_NUMBER  = '918951553531';
const WA_MESSAGE = encodeURIComponent('Hi Agastya, I run a dental clinic and would like to learn more about your services.');

const SERVICE_LINKS = [
  { href: '/dental-crm-software',          label: 'Patient CRM',           icon: '📋', desc: 'Manage patients & automate follow-ups' },
  { href: '/dental-website-development',   label: 'Clinic Website',        icon: '🌐', desc: 'Trust-building, SEO-ready websites'    },
  { href: '/dental-seo-services',          label: 'SEO & GBP',             icon: '📍', desc: 'Rank #1 on Google Maps'               },
  { href: '/dentist-appointment-software', label: 'Appointment Software',  icon: '📅', desc: 'Fill slots, kill no-shows'            },
  { href: '/dental-practice-automation',   label: 'Practice Automation',   icon: '⚡', desc: 'Automate reminders, recalls, reviews' },
];

const TOP_LINKS = [
  { href: '/blog',  label: 'Blog'  },
  { href: '/about', label: 'About' },
];

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu"
      style={{ width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 8 }}>
      <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 22, height: 22, position: 'relative' }}>
        <span style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: '#1a1a2e', position: 'absolute', top: open ? '50%' : '25%', left: 0, transform: open ? 'translateY(-50%) rotate(45deg)' : 'translateY(-50%) rotate(0deg)', transition: 'top 0.25s ease, transform 0.25s ease' }} />
        <span style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: '#1a1a2e', position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', opacity: open ? 0 : 1, transition: 'opacity 0.15s ease' }} />
        <span style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: '#1a1a2e', position: 'absolute', top: open ? '50%' : '75%', left: 0, transform: open ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-50%) rotate(0deg)', transition: 'top 0.25s ease, transform 0.25s ease' }} />
      </span>
    </button>
  );
}

/* ── Desktop dropdown ─────────────────────────────────── */
function ServicesDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120); };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const isActive = SERVICE_LINKS.some(l => l.href === pathname) || pathname === '/dental-solutions';

  return (
    <div ref={ref} style={{ position: 'relative', display: 'flex', alignItems: 'center' }} onMouseEnter={show} onMouseLeave={hide}>
      {/* trigger */}
      <button
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 14, fontWeight: 500, padding: 0, lineHeight: 1,
          color: isActive ? '#E86C2F' : '#1A1A2E',
          fontFamily: 'inherit', height: '1.5rem',
        }}
      >
        Dental Solutions
        <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      {/* dropdown panel */}
      <div style={{
        position: 'absolute', top: 'calc(100% + 10px)', left: '50%',
        width: 480,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 20px 60px rgba(26,26,46,0.14), 0 0 0 1px rgba(26,26,46,0.06)',
        padding: 12,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transform: open ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-6px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        zIndex: 100,
      }}>
        {/* see all link */}
        <Link href="/dental-solutions"
          style={{ display: 'block', padding: '8px 12px 10px', borderBottom: '1px solid #F3F4F6', marginBottom: 8, color: '#E86C2F', fontSize: 12, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          All Dental Solutions →
        </Link>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {SERVICE_LINKS.map(s => (
            <Link key={s.href} href={s.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 12px', borderRadius: 10, textDecoration: 'none',
                background: pathname === s.href ? 'rgba(232,108,47,0.06)' : 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(232,108,47,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = pathname === s.href ? 'rgba(232,108,47,0.06)' : 'transparent')}
            >
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
              <div>
                <div style={{ color: '#1A1A2E', fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{s.label}</div>
                <div style={{ color: '#9CA3AF', fontSize: 11, marginTop: 2, lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Header ──────────────────────────────────────── */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setServicesOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen]);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1.5px solid rgba(232,108,47,0.28)' : '1.5px solid transparent',
        boxShadow: scrolled ? '0 2px 16px rgba(26,26,46,0.07)' : 'none',
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          padding: '0 clamp(1rem,4vw,2.5rem)',
          height: 72,
          gap: 8,
        }}>
          {/* Logo — left, responsive size to prevent mobile overlap */}
          <Link href="/" className="font-heading font-black text-charcoal shrink-0" style={{ fontSize: 'clamp(18px, 5vw, 24px)', lineHeight: 1, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            Agastya<span className="text-saffron">One</span>
          </Link>

          {/* Desktop nav — perfectly centered */}
          <nav className="hidden items-center justify-center gap-7 text-sm font-medium text-charcoal lg:flex" style={{ alignItems: 'center' }}>
            <ServicesDropdown pathname={pathname} />
            {TOP_LINKS.map(link => (
              <Link key={link.href} href={link.href}
                style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}
                className={`nav-link transition hover:text-saffron ${pathname === link.href ? 'is-active text-saffron' : ''}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right — CTA + mobile controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, flexShrink: 0 }}>
            <Link href="/contact"
              className="hidden lg:inline-flex items-center justify-center rounded-full bg-[#E86C2F] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600">
              Book a Free Call
            </Link>
            <a href="tel:+918951553531" aria-label="Call AgastyaOne"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-charcoal transition hover:border-saffron hover:text-saffron">
              <Phone size={17} />
            </a>
            <div className="lg:hidden">
              <HamburgerButton open={menuOpen} onClick={() => setMenuOpen(p => !p)} />
            </div>
          </div>
        </div>
      </header>

      {/* Header spacer */}
      <div style={{ height: 72 }} aria-hidden="true" />

      {/* Mobile menu */}
      <div id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-white lg:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ paddingTop: 72, overflowY: 'auto' }}>

        <nav className="flex flex-col gap-1 px-5 py-4">
          {/* Dental Solutions — expandable */}
          <div>
            <button
              onClick={() => setServicesOpen(p => !p)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: 12, background: servicesOpen ? '#FFF7F3' : 'transparent',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 600, color: servicesOpen ? '#E86C2F' : '#1A1A2E' }}>Dental Solutions</span>
              <ChevronDown size={16} style={{ color: '#E86C2F', transition: 'transform 0.25s', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>

            {/* Submenu */}
            <div style={{
              overflow: 'hidden',
              maxHeight: servicesOpen ? 600 : 0,
              transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
            }}>
              {/* See all row */}
              <Link href="/dental-solutions" onClick={() => setMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px 6px 32px', textDecoration: 'none', color: '#E86C2F', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                View All Solutions →
              </Link>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, padding: '4px 12px 8px' }}>
                {SERVICE_LINKS.map(s => (
                  <Link key={s.href} href={s.href} onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 8,
                      padding: '10px 10px', borderRadius: 10, textDecoration: 'none',
                      background: pathname === s.href ? 'rgba(232,108,47,0.06)' : '#F9F9F9',
                      border: '1px solid', borderColor: pathname === s.href ? 'rgba(232,108,47,0.2)' : '#F3F4F6',
                    }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{s.icon}</span>
                    <span style={{ color: '#1A1A2E', fontSize: 11.5, fontWeight: 600, lineHeight: 1.35 }}>{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Blog + About */}
          {TOP_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className={`flex items-center rounded-xl px-4 py-3.5 text-base font-medium transition hover:bg-orange-50 hover:text-saffron ${pathname === link.href ? 'bg-orange-50 text-saffron' : 'text-charcoal'}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mx-5 border-t border-gray-100" />

        <div className="px-5 py-5 flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Get in touch</p>
          <a href="tel:+918951553531"
            className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-charcoal transition hover:border-saffron hover:text-saffron">
            <Phone size={17} className="shrink-0 text-saffron" />
            +91 89515 53531
          </a>
          <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-charcoal transition hover:border-[#25D366] hover:text-[#25D366]">
            <span className="shrink-0 text-[#25D366]"><WhatsAppIcon size={17} /></span>
            WhatsApp us
          </a>
        </div>

        <div className="mt-auto px-5 pb-10 pt-2">
          <Link href="/contact" onClick={() => setMenuOpen(false)}
            className="flex w-full items-center justify-center rounded-full bg-[#E86C2F] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-orange-600">
            Book a Free Call
          </Link>
          <p className="mt-3 text-center text-xs text-muted">Free 30-min strategy call · No commitment</p>
        </div>
      </div>
    </>
  );
}
