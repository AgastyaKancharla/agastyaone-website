'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ── feature definitions ──────────────────────────── */
const FEATURES = [
  {
    id: 'database',
    icon: '👥', title: 'Patient Database', tag: 'Core', tagColor: '#6366f1',
    stat: '500+', statLabel: 'patients per clinic',
    pitch: 'Every patient. Every visit. Every detail — in one place.',
  },
  {
    id: 'enquiries',
    icon: '📥', title: 'New Patient Enquiries', tag: 'Conversion', tagColor: '#E86C2F',
    stat: '0', statLabel: 'enquiries lost',
    pitch: 'No lead falls through. Every call, WhatsApp, DM — tracked.',
  },
  {
    id: 'reminders',
    icon: '🔔', title: 'Appointment Reminders', tag: 'Automation', tagColor: '#25D366',
    stat: '↓70%', statLabel: 'no-show rate',
    pitch: 'Reminders go out 24h and 2h before. Zero manual calls.',
  },
  {
    id: 'followups',
    icon: '💬', title: 'Treatment Follow-ups', tag: 'Retention', tagColor: '#f59e0b',
    stat: '3×', statLabel: 'patient retention',
    pitch: 'After every procedure — a WhatsApp checking on recovery.',
  },
  {
    id: 'recall',
    icon: '🔁', title: 'Recall System', tag: 'Revenue', tagColor: '#34d399',
    stat: '₹3.7L', statLabel: 'est. recoverable/year',
    pitch: 'Patients due for checkup get recalled automatically.',
  },
  {
    id: 'reviews',
    icon: '⭐', title: 'Review Requests', tag: 'Reputation', tagColor: '#f59e0b',
    stat: '5–10', statLabel: 'new reviews/month',
    pitch: 'Review request fires when satisfaction is highest.',
  },
  {
    id: 'dashboard',
    icon: '📊', title: 'Clinic Dashboard', tag: 'Visibility', tagColor: '#6366f1',
    stat: '1 view', statLabel: 'everything in one place',
    pitch: 'Pipeline, appointments, reviews — one live view.',
  },
] as const;

type FeatureId = typeof FEATURES[number]['id'];

/* ── preview panels ───────────────────────────────── */
function WaMsg({ name, msg, time, show }: { name: string; msg: string; time: string; show: boolean }) {
  return (
    <div style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.4s ease', marginBottom: 8 }}>
      <div style={{ fontSize: 9.5, color: '#6B7280', marginBottom: 3, fontWeight: 600 }}>{name} · {time}</div>
      <div style={{ background: '#DCF8C6', borderRadius: '0 10px 10px 10px', padding: '8px 11px', maxWidth: '88%' }}>
        <div style={{ color: '#1A1A2E', fontSize: 12, lineHeight: 1.5 }}>{msg}</div>
        <div style={{ color: '#25D366', fontSize: 9, marginTop: 3, textAlign: 'right' }}>✓✓ Delivered</div>
      </div>
    </div>
  );
}

function DatabasePreview() {
  const patients = [
    { ini: 'PS', name: 'Priya Sharma',  tx: 'Root Canal',  last: '12 Jan',  next: '12 Jul', color: '#6366f1' },
    { ini: 'RM', name: 'Rahul Mehta',   tx: 'Braces',      last: '3 Mar',   next: 'Due now', color: '#E86C2F' },
    { ini: 'SR', name: 'Sunita Rao',    tx: 'Cleaning',    last: '5 May',   next: '5 Nov',  color: '#34d399' },
    { ini: 'AN', name: 'Arjun Nair',    tx: 'Implant',     last: '8 Dec',   next: 'Overdue',color: '#fb923c' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, padding: '0 2px 6px', borderBottom: '1px solid #F3F4F6' }}>
        {['Patient', 'Last Visit', 'Next Due'].map(h => (
          <div key={h} style={{ color: '#9CA3AF', fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
        ))}
      </div>
      {patients.map(p => (
        <div key={p.ini} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, alignItems: 'center', padding: '7px 4px', borderRadius: 8, background: p.next === 'Overdue' || p.next === 'Due now' ? `${p.color}08` : 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${p.color}20`, border: `1.5px solid ${p.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: p.color, flexShrink: 0 }}>{p.ini}</div>
            <div>
              <div style={{ color: '#1A1A2E', fontSize: 11, fontWeight: 600 }}>{p.name.split(' ')[0]}</div>
              <div style={{ color: '#9CA3AF', fontSize: 9.5 }}>{p.tx}</div>
            </div>
          </div>
          <div style={{ color: '#6B7280', fontSize: 10.5 }}>{p.last}</div>
          <div style={{ color: p.next === 'Overdue' || p.next === 'Due now' ? p.color : '#6B7280', fontSize: 10.5, fontWeight: p.next === 'Overdue' || p.next === 'Due now' ? 700 : 400 }}>{p.next}</div>
        </div>
      ))}
    </div>
  );
}

function EnquiriesPreview() {
  const stages = [
    { label: 'New Enquiry', count: 3, color: '#60a5fa' },
    { label: 'Followed Up', count: 5, color: '#f59e0b' },
    { label: 'Demo Booked', count: 2, color: '#a78bfa' },
    { label: 'Confirmed',   count: 7, color: '#34d399' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {stages.map(s => (
        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 80, color: '#6B7280', fontSize: 10.5, flexShrink: 0 }}>{s.label}</div>
          <div style={{ flex: 1, height: 8, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(s.count / 10) * 100}%`, background: s.color, borderRadius: 99, transition: 'width 0.8s ease' }} />
          </div>
          <div style={{ width: 20, color: s.color, fontSize: 12, fontWeight: 700, textAlign: 'right' }}>{s.count}</div>
        </div>
      ))}
      <div style={{ marginTop: 6, padding: '10px', background: 'rgba(232,108,47,0.06)', border: '1px solid rgba(232,108,47,0.15)', borderRadius: 10 }}>
        <div style={{ color: '#E86C2F', fontSize: 11, fontWeight: 700 }}>📥 New enquiry just came in</div>
        <div style={{ color: '#6B7280', fontSize: 10.5, marginTop: 2 }}>Kavya R. · WhatsApp · "braces consultation"</div>
      </div>
    </div>
  );
}

function RemindersPreview({ active }: { active: boolean }) {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const ts = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    if (!active) { ts.current.forEach(clearTimeout); setShow1(false); setShow2(false); return; }
    const t1 = setTimeout(() => setShow1(true), 400);
    const t2 = setTimeout(() => setShow2(true), 1800);
    ts.current = [t1, t2];
    return () => ts.current.forEach(clearTimeout);
  }, [active]);
  return (
    <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '12px', border: '1px solid rgba(37,211,102,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </div>
        <span style={{ color: '#075E54', fontSize: 11, fontWeight: 700 }}>AgastyaOne Automation</span>
        <span style={{ marginLeft: 'auto', color: '#25D366', fontSize: 9, fontWeight: 700 }}>● LIVE</span>
      </div>
      <WaMsg name="Rahul Mehta" msg="📅 Reminder: Your appointment is tomorrow at 3 PM. Reply YES to confirm." time="9:00 AM" show={show1} />
      <WaMsg name="Sunita Rao"  msg="📅 Hi Sunita! Your cleaning is at 4:30 PM today. We look forward to seeing you." time="10:00 AM" show={show2} />
    </div>
  );
}

function FollowupsPreview({ active }: { active: boolean }) {
  const [show, setShow] = useState(false);
  const ts = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    if (!active) { ts.current.forEach(clearTimeout); setShow(false); return; }
    const t = setTimeout(() => setShow(true), 500);
    ts.current = [t];
    return () => ts.current.forEach(clearTimeout);
  }, [active]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ padding: '10px 12px', background: '#F9FAFB', borderRadius: 10, border: '1px solid #F3F4F6' }}>
        <div style={{ color: '#9CA3AF', fontSize: 9.5, marginBottom: 4 }}>YESTERDAY · Procedure completed</div>
        <div style={{ color: '#1A1A2E', fontSize: 12, fontWeight: 600 }}>Priya Sharma — Root Canal ✓</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9CA3AF', fontSize: 10 }}>
        <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
        <span>24 hrs later — auto sent</span>
        <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
      </div>
      <WaMsg name="Priya Sharma" msg="💙 Hi Priya! Hope you're feeling better after yesterday's root canal. Any discomfort? Your next review is in 7 days." time="10:00 AM" show={show} />
    </div>
  );
}

function RecallPreview({ active }: { active: boolean }) {
  const [flagged, setFlagged] = useState(false);
  const [sent, setSent] = useState(false);
  const ts = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    if (!active) { ts.current.forEach(clearTimeout); setFlagged(false); setSent(false); return; }
    const t1 = setTimeout(() => setFlagged(true), 600);
    const t2 = setTimeout(() => setSent(true), 1800);
    ts.current = [t1, t2];
    return () => ts.current.forEach(clearTimeout);
  }, [active]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ padding: '10px 12px', background: flagged ? 'rgba(251,146,60,0.08)' : '#F9FAFB', border: `1px solid ${flagged ? 'rgba(251,146,60,0.25)' : '#F3F4F6'}`, borderRadius: 10, transition: 'all 0.4s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#1A1A2E', fontSize: 12, fontWeight: 600 }}>Arjun Nair</div>
            <div style={{ color: '#9CA3AF', fontSize: 10, marginTop: 1 }}>Last visit: 8 Dec 2024 · Implant checkup</div>
          </div>
          {flagged && <span style={{ background: 'rgba(251,146,60,0.15)', color: '#fb923c', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>6 MONTHS</span>}
        </div>
      </div>
      {sent && (
        <WaMsg name="Arjun Nair" msg="🦷 Hi Arjun! It's been 6 months since your last checkup. Book your recall today — slots filling fast." time="9:30 AM" show={sent} />
      )}
    </div>
  );
}

function ReviewPreview({ active }: { active: boolean }) {
  const [show, setShow] = useState(false);
  const [stars, setStars] = useState(47);
  const ts = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    if (!active) { ts.current.forEach(clearTimeout); setShow(false); setStars(47); return; }
    const t1 = setTimeout(() => setShow(true), 500);
    const t2 = setTimeout(() => setStars(48), 2200);
    ts.current = [t1, t2];
    return () => ts.current.forEach(clearTimeout);
  }, [active]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <WaMsg name="Priya Sharma" msg="⭐ Hi Priya! Glad your cleaning went well. Would you take 30 seconds to leave us a Google review? It means the world to us." time="11:00 AM" show={show} />
      <div style={{ padding: '10px 12px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', gap: 2 }}>{'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#f59e0b', fontSize: 14 }}>{s}</span>)}</div>
          <div style={{ color: '#9CA3AF', fontSize: 10, marginTop: 2 }}>Google Reviews</div>
        </div>
        <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 28, color: '#f59e0b', transition: 'all 0.4s' }}>{stars}</div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  const metrics = [
    { label: 'Appointments today', value: '8/10', color: '#34d399' },
    { label: 'No-shows',           value: '1',    color: '#fb923c' },
    { label: 'Recalls pending',    value: '12',   color: '#f59e0b' },
    { label: 'Google reviews',     value: '47',   color: '#E86C2F' },
    { label: 'Enquiries open',     value: '3',    color: '#6366f1' },
    { label: 'Retention rate',     value: '78%',  color: '#34d399' },
  ];
  return (
    <div>
      <div style={{ color: '#9CA3AF', fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Dr. Priya Dental · Live Dashboard</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 20, color: m.color, lineHeight: 1 }}>{m.value}</div>
            <div style={{ color: '#9CA3AF', fontSize: 9.5, marginTop: 3 }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── preview router ───────────────────────────────── */
function FeaturePreview({ id, active }: { id: FeatureId; active: boolean }) {
  if (id === 'database')  return <DatabasePreview />;
  if (id === 'enquiries') return <EnquiriesPreview />;
  if (id === 'reminders') return <RemindersPreview active={active} />;
  if (id === 'followups') return <FollowupsPreview active={active} />;
  if (id === 'recall')    return <RecallPreview    active={active} />;
  if (id === 'reviews')   return <ReviewPreview    active={active} />;
  if (id === 'dashboard') return <DashboardPreview />;
  return null;
}

/* ── main component ───────────────────────────────── */
export function CRMFeaturesSection() {
  const [selected, setSelected] = useState<FeatureId>('database');
  const [previewing, setPreviewing] = useState(false);
  const feat = FEATURES.find(f => f.id === selected)!;

  // auto advance every 5s
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resetAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setSelected(prev => {
        const idx = FEATURES.findIndex(f => f.id === prev);
        return FEATURES[(idx + 1) % FEATURES.length].id;
      });
      setPreviewing(false);
      setTimeout(() => setPreviewing(true), 80);
    }, 5000);
  };

  useEffect(() => {
    setPreviewing(true);
    resetAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const handleSelect = (id: FeatureId) => {
    setSelected(id);
    setPreviewing(false);
    setTimeout(() => setPreviewing(true), 80);
    resetAuto();
  };

  return (
    <section style={{ background: '#F8F6F3', padding: '72px 0', width: '100%' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(1rem,5vw,3rem)' }}>

        {/* heading */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ display: 'inline-block', background: '#FEE9D9', color: '#E86C2F', borderRadius: 999, padding: '4px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'Poppins,sans-serif', marginBottom: 14 }}>
            ⚡ Interactive Demo
          </p>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(22px,4vw,36px)', fontWeight: 800, color: '#1A1A2E', margin: '0 0 10px', lineHeight: 1.2 }}>
            Tap a feature — see it working live
          </h2>
          <p style={{ color: '#6B7280', fontSize: 14, margin: '0 auto', maxWidth: 460, lineHeight: 1.6 }}>
            7 systems that run your clinic growth. Each one animated so you can see exactly what happens.
          </p>
        </div>

        {/* ── MOBILE: horizontal tab switcher ── */}
        <div className="crm-mobile-layout">
          {/* scrollable icon tabs */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', marginBottom: 12 }}>
            {FEATURES.map(f => {
              const isActive = selected === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => handleSelect(f.id)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '8px 10px', borderRadius: 12, flexShrink: 0,
                    background: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                    border: `2px solid ${isActive ? feat.tagColor : 'transparent'}`,
                    boxShadow: isActive ? `0 4px 16px ${feat.tagColor}25` : 'none',
                    cursor: 'pointer', transition: 'all 0.2s ease', minWidth: 60,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{f.icon}</span>
                  <span style={{ fontSize: 8.5, fontWeight: 700, color: isActive ? feat.tagColor : '#9CA3AF', fontFamily: 'Poppins,sans-serif', textAlign: 'center', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                    {f.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* full width preview panel */}
          <div style={{ background: '#fff', borderRadius: 18, padding: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: `1.5px solid ${feat.tagColor}30` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #F3F4F6' }}>
              <span style={{ fontSize: 16 }}>{feat.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>{feat.title}</div>
                <div style={{ color: '#9CA3AF', fontSize: 10, marginTop: 1 }}>{feat.pitch}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 18, color: feat.tagColor, lineHeight: 1 }}>{feat.stat}</div>
                <div style={{ color: '#9CA3AF', fontSize: 8.5, marginTop: 1 }}>{feat.statLabel}</div>
              </div>
            </div>
            <div key={selected + '-mobile'} style={{ animation: 'previewFadeIn 0.3s ease' }}>
              <FeaturePreview id={selected} active={previewing} />
            </div>
          </div>
        </div>

        {/* ── DESKTOP: list left, preview right ── */}
        <div className="crm-desktop-layout" style={{ display: 'none', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
          {/* feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {FEATURES.map(f => {
              const isActive = selected === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => handleSelect(f.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px', borderRadius: 12,
                    background: isActive ? '#fff' : 'transparent',
                    border: `1.5px solid ${isActive ? f.tagColor + '40' : 'transparent'}`,
                    borderLeft: isActive ? `4px solid ${f.tagColor}` : '4px solid transparent',
                    boxShadow: isActive ? '0 4px 20px rgba(0,0,0,0.07)' : 'none',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.25s ease',
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 700, color: isActive ? '#1A1A2E' : '#6B7280', lineHeight: 1.2 }}>{f.title}</div>
                    {isActive && <div style={{ color: '#9CA3AF', fontSize: 11, marginTop: 2 }}>{f.pitch}</div>}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: 16, color: isActive ? f.tagColor : '#D1D5DB', lineHeight: 1 }}>{f.stat}</div>
                    {isActive && <div style={{ color: '#9CA3AF', fontSize: 9, marginTop: 1 }}>{f.statLabel}</div>}
                  </div>
                </button>
              );
            })}
          </div>
          {/* preview panel */}
          <div style={{ background: '#fff', borderRadius: 18, padding: '28px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: `1.5px solid ${feat.tagColor}25`, minHeight: 420 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #F3F4F6' }}>
              <span style={{ fontSize: 18 }}>{feat.icon}</span>
              <div>
                <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>{feat.title}</div>
                <div style={{ color: '#9CA3AF', fontSize: 10, marginTop: 1 }}>{feat.pitch}</div>
              </div>
              <span style={{ marginLeft: 'auto', background: `${feat.tagColor}12`, color: feat.tagColor, fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{feat.tag}</span>
            </div>
            <div key={selected + '-desktop'} style={{ animation: 'previewFadeIn 0.3s ease' }}>
              <FeaturePreview id={selected} active={previewing} />
            </div>
          </div>
        </div>

        {/* bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg,#E86C2F,#f59e0b)',
            color: '#fff', borderRadius: 999, padding: '14px 28px',
            fontSize: 15, fontWeight: 700, fontFamily: 'Poppins,sans-serif',
            textDecoration: 'none', boxShadow: '0 8px 28px rgba(232,108,47,0.3)',
          }}>
            Book a Free Demo — See All 7 Live →
          </Link>
          <p style={{ color: '#9CA3AF', fontSize: 12, marginTop: 10 }}>30 minutes · No commitment · We show you everything</p>
        </div>
      </div>

      <style>{`
        @keyframes previewFadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        .crm-mobile-layout  { display: block; }
        .crm-desktop-layout { display: none !important; }
        @media (min-width: 768px) {
          .crm-mobile-layout  { display: none !important; }
          .crm-desktop-layout { display: grid !important; }
        }
        .crm-mobile-layout ::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
