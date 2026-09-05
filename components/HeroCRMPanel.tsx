'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

/* ─── shared ─────────────────────────────────────────── */

function WaIcon({ size = 11 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const PANEL_DURATION = 5500; // ms each panel stays

/* ─── Panel 1: CRM ───────────────────────────────────── */

const CRM_PATIENTS = [
  { id: 1, ini: 'PS', name: 'Priya Sharma',  tx: 'Root Canal',        st: 'visited'   as const },
  { id: 2, ini: 'RM', name: 'Rahul Mehta',   tx: 'Braces Check',      st: 'confirmed' as const },
  { id: 3, ini: 'SR', name: 'Sunita Rao',    tx: 'Teeth Cleaning',    st: 'confirmed' as const },
  { id: 4, ini: 'AN', name: 'Arjun Nair',    tx: 'Implant Follow-up', st: 'recall'    as const },
];
const ST = {
  new:       { l: 'New',       c: '#60a5fa' },
  confirmed: { l: 'Confirmed', c: '#34d399' },
  visited:   { l: 'Visited',   c: '#a78bfa' },
  recall:    { l: 'Recall',    c: '#fb923c' },
};


function getTheme(light: boolean) {
  return {
    cardBg:       light ? 'rgba(0,0,0,0.03)'        : 'rgba(255,255,255,0.025)',
    cardBorder:   light ? 'rgba(0,0,0,0.07)'        : 'rgba(255,255,255,0.05)',
    cardBgOn:     light ? 'rgba(232,108,47,0.07)'   : 'rgba(232,108,47,0.08)',
    cardBorderOn: light ? 'rgba(232,108,47,0.25)'   : 'rgba(232,108,47,0.3)',
    rowBg:        light ? 'rgba(0,0,0,0.02)'        : 'rgba(255,255,255,0.02)',
    rowBorder:    light ? 'rgba(0,0,0,0.05)'        : 'rgba(255,255,255,0.05)',
    statBg:       light ? '#F3F4F6'                 : 'rgba(0,0,0,0.2)',
    statBorder:   light ? '1px solid #E5E7EB'       : '1px solid rgba(255,255,255,0.05)',
    statLabel:    light ? '#9CA3AF'                 : 'rgba(255,255,255,0.35)',
    textPrimary:  light ? '#1A1A2E'                 : '#fff',
    textSub:      light ? '#6B7280'                 : 'rgba(255,255,255,0.38)',
    textMuted:    light ? '#9CA3AF'                 : 'rgba(255,255,255,0.3)',
    textFaint:    light ? '#D1D5DB'                 : 'rgba(255,255,255,0.2)',
    inputBg:      light ? '#F3F4F6'                 : 'rgba(255,255,255,0.07)',
    inputText:    light ? '#6B7280'                 : 'rgba(255,255,255,0.5)',
    sectionBg:    light ? 'rgba(0,0,0,0.02)'        : 'rgba(255,255,255,0.04)',
    sectionBorder:light ? '1px solid #E5E7EB'       : '1px solid rgba(255,255,255,0.06)',
    divider:      light ? '1px solid #F3F4F6'       : '1px solid rgba(255,255,255,0.04)',
    progressBg:   light ? '#E5E7EB'                 : 'rgba(255,255,255,0.06)',
    searchBg:     light ? '#F9FAFB'                 : 'rgba(255,255,255,0.03)',
    searchBorder: light ? '1px solid #E5E7EB'       : '1px solid rgba(255,255,255,0.06)',
  };
}


function CRMPanel({ active, light = false }: { active: boolean; light?: boolean }) {
  const T = getTheme(light);
  type P = typeof CRM_PATIENTS[0];
  const [rows, setRows] = useState<P[]>(CRM_PATIENTS);
  const [lit, setLit]   = useState<number | null>(null);
  const [toast, setToast] = useState<{ text: string; color: string; icon: 'wa' | 'star' | 'bell' } | null>(null);
  const [reviews, setReviews] = useState(47);
  const ts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reset = useCallback(() => {
    ts.current.forEach(clearTimeout);
    setRows(CRM_PATIENTS);
    setLit(null);
    setToast(null);
    setReviews(47);
  }, []);

  useEffect(() => {
    if (!active) { reset(); return; }
    let mounted = true;
    const show = (text: string, color: string, icon: 'wa'|'star'|'bell', delay: number) => {
      const t = setTimeout(() => {
        if (!mounted) return;
        setToast({ text, color, icon });
        setTimeout(() => { if (mounted) setToast(null); }, 2400);
      }, delay);
      ts.current.push(t);
    };
    const highlight = (id: number, delay: number, newSt?: P['st']) => {
      const t = setTimeout(() => {
        if (!mounted) return;
        if (newSt) setRows(prev => prev.map(p => p.id === id ? { ...p, st: newSt } : p));
        setLit(id);
        setTimeout(() => { if (mounted) setLit(null); }, 1400);
      }, delay);
      ts.current.push(t);
    };
    show('Reminder sent → Rahul Mehta, 3 PM tomorrow', '#25D366', 'wa',   800);
    highlight(2, 1000);
    show('Review request → Priya Sharma ⭐⭐⭐⭐⭐',     '#f59e0b', 'star', 2800);
    const rv = setTimeout(() => { if (mounted) setReviews(r => r + 1); }, 3600);
    show('Recall sent → Arjun Nair (6 months gap)',    '#60a5fa', 'bell', 4400);
    highlight(4, 4600, 'confirmed');
    ts.current.push(rv);
    return () => { mounted = false; ts.current.forEach(clearTimeout); };
  }, [active, reset]);

  const toastBg   = toast?.icon === 'wa' ? 'rgba(37,211,102,0.12)' : toast?.icon === 'star' ? 'rgba(245,158,11,0.12)' : 'rgba(96,165,250,0.12)';
  const toastBdr  = toast?.icon === 'wa' ? 'rgba(37,211,102,0.3)'  : toast?.icon === 'star' ? 'rgba(245,158,11,0.3)'  : 'rgba(96,165,250,0.3)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* toast row */}
      <div style={{ height: 38, display: 'flex', alignItems: 'center', padding: '0 12px', overflow: 'hidden' }}>
        {toast ? (
          <div key={toast.text} style={{ display: 'flex', alignItems: 'center', gap: 6, background: toastBg, border: `1px solid ${toastBdr}`, borderRadius: 99, padding: '3px 10px', animation: 'toastIn .28s ease', maxWidth: '100%' }}>
            <span style={{ color: toast.color, flexShrink: 0 }}>
              {toast.icon === 'wa' ? <WaIcon /> : toast.icon === 'star' ? <span style={{ fontSize: 9 }}>⭐</span> : <span style={{ fontSize: 9 }}>🔔</span>}
            </span>
            <span style={{ color: T.textPrimary, fontSize: 10.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{toast.text}</span>
          </div>
        ) : <span style={{ color: T.textMuted, fontSize: 10.5 }}>Automation running…</span>}
      </div>
      {/* rows */}
      <div style={{ padding: '2px 10px 8px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {rows.slice(0, 4).map(p => {
          const cfg = ST[p.st]; const on = lit === p.id;
          return (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 9, background: on ? T.cardBgOn : T.cardBg, border: `1px solid ${on ? T.cardBorderOn : T.cardBorder}`, borderRadius: 9, padding: '7px 10px', transition: 'all .4s' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: `${cfg.c}22`, border: `1.5px solid ${cfg.c}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cfg.c, fontWeight: 700, fontSize: 9, fontFamily: 'Poppins,sans-serif' }}>{p.ini}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: T.textPrimary, fontSize: 11.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                <div style={{ color: T.textSub, fontSize: 9.5, marginTop: 1 }}>{p.tx}</div>
              </div>
              <div style={{ background: `${cfg.c}18`, color: cfg.c, fontSize: 8.5, fontWeight: 700, padding: '2px 7px', borderRadius: 99, whiteSpace: 'nowrap', flexShrink: 0, border: `1px solid ${cfg.c}33`, transition: 'all .4s' }}>{cfg.l}</div>
            </div>
          );
        })}
      </div>
      {/* stat strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: T.statBorder, background: T.statBg }}>
        {[['Managed','Patients','#34d399'],['Automated','Reviews','#f59e0b'],['Fewer calls','Bookings','#E86C2F']].map(([v,l,c],i) => (
          <div key={l} style={{ padding: '9px 6px', textAlign: 'center', borderRight: i < 2 ? T.statBorder : 'none' }}>
            <div style={{ color: c, fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 15, transition: 'all .4s' }}>{v}</div>
            <div style={{ color: T.statLabel, fontSize: 8.5, marginTop: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Panel 2: SEO + GBP ─────────────────────────────── */

function SEOPanel({ active, light = false }: { active: boolean; light?: boolean }) {
  const T = getTheme(light);
  const [rank, setRank]       = useState(4);
  const [reviews, setReviews] = useState(31);
  const [lit, setLit]         = useState<number | null>(null);
  const ts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!active) { ts.current.forEach(clearTimeout); setRank(4); setReviews(31); setLit(null); return; }
    let mounted = true;
    const t1 = setTimeout(() => { if (mounted) setRank(3); },      900);
    const t2 = setTimeout(() => { if (mounted) setRank(2); },      2000);
    const t3 = setTimeout(() => { if (!mounted) return; setRank(1); setLit(1); setTimeout(() => { if (mounted) setLit(null); }, 1200); }, 3200);
    const t4 = setTimeout(() => { if (mounted) setReviews(r => r + 1); }, 1400);
    const t5 = setTimeout(() => { if (mounted) setReviews(r => r + 1); }, 3000);
    const t6 = setTimeout(() => { if (mounted) setReviews(r => r + 1); }, 4600);
    ts.current = [t1,t2,t3,t4,t5,t6];
    return () => { mounted = false; ts.current.forEach(clearTimeout); };
  }, [active]);

  const results = [
    { pos: rank === 1 ? 1 : rank === 2 ? 2 : rank === 3 ? 3 : 4, title: 'Dr. Priya Dental Clinic', sub: 'Koramangala · 4.9 ★ · dentist near me', yours: true },
    { pos: 2, title: 'SmileCare Dental',     sub: 'HSR Layout · 4.6 ★',  yours: false },
    { pos: 3, title: 'CitySmile Dentistry',  sub: 'Indiranagar · 4.4 ★', yours: false },
  ].sort((a, b) => a.pos - b.pos);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* GBP card */}
      <div style={{ margin: '8px 10px', background: T.sectionBg, border: T.sectionBorder, borderRadius: 10, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(232,108,47,0.15)', border: '1px solid rgba(232,108,47,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>📍</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: T.textPrimary, fontSize: 11.5, fontWeight: 700 }}>Dr. Priya Dental Clinic</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
            {'★★★★★'.split('').map((s,i) => <span key={i} style={{ color: '#f59e0b', fontSize: 10 }}>{s}</span>)}
            <span style={{ color: T.inputText, fontSize: 9.5, marginLeft: 2 }}>{reviews} reviews</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ color: '#34d399', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 20, lineHeight: 1, transition: 'all 0.5s' }}>#{rank}</div>
          <div style={{ color: T.statLabel, fontSize: 8.5, marginTop: 2 }}>Maps rank</div>
        </div>
      </div>
      {/* search results */}
      <div style={{ padding: '0 10px 8px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ color: T.textMuted, fontSize: 9.5, marginBottom: 2, paddingLeft: 2 }}>Google Search · "dentist near me Koramangala"</div>
        {results.map((r, i) => (
          <div key={r.title} style={{ display: 'flex', alignItems: 'center', gap: 8, background: r.yours && lit === 1 ? 'rgba(52,211,153,0.1)' : r.yours ? 'rgba(52,211,153,0.06)' : T.rowBg, border: `1px solid ${r.yours ? 'rgba(52,211,153,0.25)' : T.rowBorder}`, borderRadius: 8, padding: '7px 10px', transition: 'all 0.5s' }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: r.yours ? 'rgba(52,211,153,0.2)' : T.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.yours ? '#34d399' : T.textMuted, fontSize: 9, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: r.yours ? '#34d399' : T.textSub, fontSize: 11, fontWeight: r.yours ? 700 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title} {r.yours && '✓'}</div>
              <div style={{ color: T.textMuted, fontSize: 9.5 }}>{r.sub}</div>
            </div>
          </div>
        ))}
      </div>
      {/* stat strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: T.statBorder, background: T.statBg }}>
        {[['#1','Maps Rank','#34d399'],['5x','More Calls','#E86C2F'],['90d','To Results','#f59e0b']].map(([v,l,c],i) => (
          <div key={l} style={{ padding: '9px 6px', textAlign: 'center', borderRight: i < 2 ? T.statBorder : 'none' }}>
            <div style={{ color: c, fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 15 }}>{v}</div>
            <div style={{ color: T.statLabel, fontSize: 8.5, marginTop: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Panel 3: Website ───────────────────────────────── */

function WebsitePanel({ active, light = false }: { active: boolean; light?: boolean }) {
  const T = getTheme(light);
  const [loaded, setLoaded]   = useState(false);
  const [barW, setBarW]       = useState(0);
  const [visits, setVisits]   = useState(124);
  const ts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!active) { ts.current.forEach(clearTimeout); setLoaded(false); setBarW(0); setVisits(124); return; }
    let mounted = true;
    const t1 = setTimeout(() => { if (mounted) setBarW(60); },   400);
    const t2 = setTimeout(() => { if (mounted) setBarW(85); },   900);
    const t3 = setTimeout(() => { if (!mounted) return; setBarW(100); setLoaded(true); }, 1500);
    const t4 = setTimeout(() => { if (mounted) setVisits(v => v + 3); },  2200);
    const t5 = setTimeout(() => { if (mounted) setVisits(v => v + 5); },  3400);
    const t6 = setTimeout(() => { if (mounted) setVisits(v => v + 4); },  4600);
    ts.current = [t1,t2,t3,t4,t5,t6];
    return () => { mounted = false; ts.current.forEach(clearTimeout); };
  }, [active]);

  const trust = ['⭐ 4.9 Google Rating','🦷 10+ Years Experience','✓ Same-Day Appointments'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* browser bar */}
      <div style={{ margin: '8px 10px 4px', background: T.sectionBg, borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
        </div>
        <div style={{ flex: 1, background: T.inputBg, borderRadius: 4, padding: '3px 8px', fontSize: 9.5, color: T.inputText, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: '#34d399', fontSize: 9 }}>🔒</span> drpriya-dental.com
        </div>
      </div>
      {/* load bar */}
      {!loaded && (
        <div style={{ height: 2, margin: '0 10px 4px', background: T.progressBg, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${barW}%`, background: 'linear-gradient(90deg,#E86C2F,#f59e0b)', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>
      )}
      {/* site mockup */}
      <div style={{ margin: '0 10px', background: T.searchBg, border: T.searchBorder, borderRadius: 8, padding: '10px', opacity: loaded ? 1 : 0.4, transition: 'opacity 0.5s' }}>
        <div style={{ background: 'rgba(232,108,47,0.15)', borderRadius: 6, padding: '8px 10px', marginBottom: 8 }}>
          <div style={{ color: T.textPrimary, fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 12 }}>Dr. Priya Dental Clinic</div>
          <div style={{ color: T.inputText, fontSize: 9.5, marginTop: 2 }}>Koramangala, Bengaluru</div>
          <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 5, background: '#E86C2F', borderRadius: 99, padding: '3px 10px' }}>
            <WaIcon size={9} />
            <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>Book Appointment</span>
          </div>
        </div>
        {trust.map(t => (
          <div key={t} style={{ color: T.textSub, fontSize: 9.5, padding: '3px 0', borderBottom: T.divider }}>{t}</div>
        ))}
      </div>
      {/* stat strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: T.statBorder, background: T.statBg, marginTop: 8 }}>
        {[[`${visits}`,'Visitors/mo','#34d399'],['1.2s','Load Time','#E86C2F'],['SEO','Ready','#f59e0b']].map(([v,l,c],i) => (
          <div key={l} style={{ padding: '9px 6px', textAlign: 'center', borderRight: i < 2 ? T.statBorder : 'none' }}>
            <div style={{ color: c, fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 15, transition: 'all .4s' }}>{v}</div>
            <div style={{ color: T.statLabel, fontSize: 8.5, marginTop: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Panel 4: Booking System ────────────────────────── */

const SLOTS = [
  { time: '9:00 AM',  name: 'Priya S.',   tx: 'Root Canal',   filled: true  },
  { time: '10:30 AM', name: 'Rahul M.',   tx: 'Braces',       filled: true  },
  { time: '12:00 PM', name: '',           tx: '',              filled: false },
  { time: '2:00 PM',  name: 'Sunita R.',  tx: 'Cleaning',     filled: true  },
  { time: '3:30 PM',  name: '',           tx: '',              filled: false },
];

function BookingPanel({ active, light = false }: { active: boolean; light?: boolean }) {
  const T = getTheme(light);
  const [slots, setSlots]   = useState(SLOTS);
  const [flash, setFlash]   = useState<string | null>(null);
  const [noShows, setNoShows] = useState(3);
  const ts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!active) { ts.current.forEach(clearTimeout); setSlots(SLOTS); setFlash(null); setNoShows(3); return; }
    let mounted = true;
    const fill = (time: string, name: string, tx: string, delay: number) => {
      const t = setTimeout(() => {
        if (!mounted) return;
        setSlots(prev => prev.map(s => s.time === time ? { ...s, name, tx, filled: true } : s));
        setFlash(time);
        setTimeout(() => { if (mounted) setFlash(null); }, 1200);
      }, delay);
      ts.current.push(t);
    };
    fill('12:00 PM', 'Arjun N.', 'Implant', 1200);
    fill('3:30 PM',  'Kavya R.', 'Whitening', 3000);
    const t = setTimeout(() => { if (mounted) setNoShows(0); }, 4000);
    ts.current.push(t);
    return () => { mounted = false; ts.current.forEach(clearTimeout); };
  }, [active]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ padding: '6px 10px 4px', color: T.textMuted, fontSize: 9.5 }}>Today's Schedule · Tuesday, Jun 17</div>
      <div style={{ padding: '0 10px 8px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {slots.map(s => (
          <div key={s.time} style={{ display: 'flex', alignItems: 'center', gap: 8, background: flash === s.time ? 'rgba(52,211,153,0.12)' : s.filled ? T.cardBg : T.rowBg, border: `1px solid ${flash === s.time ? 'rgba(52,211,153,0.35)' : s.filled ? T.cardBorder : T.rowBorder}`, borderRadius: 8, padding: '7px 10px', transition: 'all 0.4s' }}>
            <div style={{ color: T.textSub, fontSize: 9.5, fontWeight: 600, width: 48, flexShrink: 0 }}>{s.time}</div>
            {s.filled ? (
              <>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: T.textPrimary, fontSize: 11, fontWeight: 600 }}>{s.name}</div>
                  <div style={{ color: T.statLabel, fontSize: 9 }}>{s.tx}</div>
                </div>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', flexShrink: 0 }} />
              </>
            ) : (
              <div style={{ color: T.textFaint, fontSize: 10, fontStyle: 'italic' }}>Open slot</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: T.statBorder, background: T.statBg }}>
        {[['5/5','Slots Filled','#34d399'],[String(noShows),'No-Shows','#fb923c'],['24/7','Online Book','#E86C2F']].map(([v,l,c],i) => (
          <div key={l} style={{ padding: '9px 6px', textAlign: 'center', borderRight: i < 2 ? T.statBorder : 'none' }}>
            <div style={{ color: c, fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 15, transition: 'all .4s' }}>{v}</div>
            <div style={{ color: T.statLabel, fontSize: 8.5, marginTop: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Panel 5: WhatsApp Automation ───────────────────── */

const WA_MSGS = [
  { id: 1, name: 'Rahul Mehta',  msg: '📅 Reminder: Your appointment is tomorrow at 3 PM. Reply YES to confirm.',    time: '9:00 AM',  status: 'delivered' as const, delay: 0 },
  { id: 2, name: 'Sunita Rao',   msg: '⭐ Hi Sunita! Hope your cleaning went well. Would you leave us a Google review?', time: '9:15 AM',  status: 'pending'   as const, delay: 1400 },
  { id: 3, name: 'Arjun Nair',   msg: '🦷 Arjun, it\'s been 6 months since your checkup. Book your recall today!',     time: '9:30 AM',  status: 'pending'   as const, delay: 2800 },
  { id: 4, name: 'Kavya Reddy',  msg: '🎉 Welcome to Dr. Priya Dental! Your appointment is confirmed for tomorrow.',   time: '9:45 AM',  status: 'pending'   as const, delay: 4200 },
];

function WhatsAppPanel({ active, light = false }: { active: boolean; light?: boolean }) {
  const T = getTheme(light);
  const [msgs, setMsgs] = useState([WA_MSGS[0]]);
  const [sent, setSent] = useState(1);
  const ts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!active) { ts.current.forEach(clearTimeout); setMsgs([WA_MSGS[0]]); setSent(1); return; }
    let mounted = true;
    WA_MSGS.slice(1).forEach((m) => {
      const t = setTimeout(() => {
        if (!mounted) return;
        setMsgs(prev => [...prev, { ...m, status: 'delivered' as const }].slice(-4));
        setSent(s => s + 1);
      }, m.delay);
      ts.current.push(t);
    });
    return () => { mounted = false; ts.current.forEach(clearTimeout); };
  }, [active]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ margin: '6px 10px 4px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><WaIcon size={12} /></div>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9.5 }}>AgastyaOne Automation · Sending now</span>
        <span style={{ marginLeft: 'auto', background: 'rgba(37,211,102,0.15)', color: '#25D366', fontSize: 8.5, fontWeight: 700, padding: '2px 7px', borderRadius: 99 }}>● LIVE</span>
      </div>
      <div style={{ height: 176, overflow: 'hidden', padding: '0 10px 8px', display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'flex-end' }}>
        {msgs.map((m, i) => (
          <div key={m.id} style={{ background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.15)', borderRadius: 9, padding: '8px 10px', animation: i === msgs.length - 1 && msgs.length > 1 ? 'toastIn 0.3s ease' : undefined, flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: '#fff', fontSize: 10.5, fontWeight: 700 }}>{m.name}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9 }}>{m.time}</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, lineHeight: 1.45 }}>{m.msg}</div>
            <div style={{ marginTop: 4, color: '#25D366', fontSize: 8.5 }}>✓✓ Delivered</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: T.statBorder, background: T.statBg }}>
        {[[String(sent),'Sent Today','#25D366'],['98%','Open Rate','#34d399'],['0','Manual Work','#E86C2F']].map(([v,l,c],i) => (
          <div key={l} style={{ padding: '9px 6px', textAlign: 'center', borderRight: i < 2 ? T.statBorder : 'none' }}>
            <div style={{ color: c, fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 15, transition: 'all .4s' }}>{v}</div>
            <div style={{ color: T.statLabel, fontSize: 8.5, marginTop: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Tab config ─────────────────────────────────────── */

export const PANEL_SUBTITLES = [
  'Manage every patient, automate reminders and never lose a lead again',
  'Rank #1 on Google Maps when patients search for a dentist near them',
  'A professional clinic website that converts visitors into booked patients',
  'Fill your appointment slots automatically with zero manual follow-up',
  'Stay connected with every patient on WhatsApp — completely automated',
];

const TABS = [
  { label: 'Patient CRM',      icon: '📋' },
  { label: 'Google Visibility', icon: '📍' },
  { label: 'Clinic Website',   icon: '🌐' },
  { label: 'Appointments',     icon: '📅' },
  { label: 'WhatsApp',         icon: '💬' },
];

/* ─── Main export ────────────────────────────────────── */

export function HeroCRMPanel({ onPanelChange, light = false }: { onPanelChange?: (idx: number) => void; light?: boolean }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const switchTo = useCallback((idx: number) => {
    setActive(idx);
    setProgress(0);
    onPanelChange?.(idx);
  }, [onPanelChange]);

  useEffect(() => {
    // progress bar ticks independently
    progRef.current = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + (100 / (PANEL_DURATION / 80))));
    }, 80);
    // auto-advance panels
    autoRef.current = setInterval(() => {
      setActive(a => {
        const next = (a + 1) % TABS.length;
        onPanelChange?.(next);
        setProgress(0);
        return next;
      });
    }, PANEL_DURATION);
    return () => {
      if (autoRef.current)  clearInterval(autoRef.current);
      if (progRef.current) clearInterval(progRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bg = light
    ? 'linear-gradient(135deg,#F8F6F3 0%,#fff 60%,#f0ede8 100%)'
    : 'linear-gradient(135deg,#1A1A2E 0%,#242442 60%,#11111f 100%)';
  const innerBg = light ? '#ffffff' : '#13132a';
  const shadow  = light
    ? '0 24px 60px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)'
    : '0 32px 80px rgba(26,26,46,0.22), 0 0 0 1px rgba(255,255,255,0.07)';

  return (
    <div style={{
      background: bg,
      borderRadius: 20, padding: 3,
      boxShadow: shadow,
    }}>
      <div style={{ borderRadius: 17, overflow: 'hidden', background: innerBg }}>

        {/* titlebar */}
        <div style={{ background: light ? '#F8F6F3' : 'rgba(255,255,255,0.04)', borderBottom: light ? '1px solid #E5E7EB' : '1px solid rgba(255,255,255,0.06)', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ color: '#E86C2F', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 12 }}>AgastyaOne</span>
            <span style={{ color: light ? '#9CA3AF' : 'rgba(255,255,255,0.35)', fontSize: 10.5, marginLeft: 6 }}>{TABS[active].label}</span>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#E86C2F','#f59e0b','#25D366'].map(c => <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
          </div>
        </div>

        {/* tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: light ? '1px solid #E5E7EB' : '1px solid rgba(255,255,255,0.06)', overflowX: 'auto', scrollbarWidth: 'none' }} className="hero-crm-panel">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => switchTo(i)}
              style={{
                flex: '1 0 auto', padding: '7px 6px', fontSize: 9, fontWeight: 600,
                color: active === i ? '#E86C2F' : (light ? '#9CA3AF' : 'rgba(255,255,255,0.35)'),
                background: active === i ? 'rgba(232,108,47,0.08)' : 'transparent',
                borderBottom: active === i ? '2px solid #E86C2F' : '2px solid transparent',
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                fontFamily: 'Poppins,sans-serif', whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: 13 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* progress bar */}
        <div style={{ height: 2, background: light ? '#F3F4F6' : 'rgba(255,255,255,0.04)' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#E86C2F,#f59e0b)', transition: 'width 0.08s linear' }} />
        </div>

        {/* panel content — all panels rendered, opacity controls visibility, NO layout shift */}
        <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
          {[CRMPanel, SEOPanel, WebsitePanel, BookingPanel, WhatsAppPanel].map((Panel, i) => (
            <div
              key={i}
              style={{
                position: i === active ? 'relative' : 'absolute',
                top: 0, left: 0, right: 0,
                opacity: i === active ? 1 : 0,
                pointerEvents: i === active ? 'auto' : 'none',
                transition: 'opacity 0.3s ease',
                zIndex: i === active ? 1 : 0,
              }}
            >
              <Panel active={i === active} light={light} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes toastIn  { from { opacity:0; transform:translateY(-5px) scale(.97); } to { opacity:1; transform:none; } }
        @keyframes panelFade { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:none; } }
        .hero-crm-panel::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}


