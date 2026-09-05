'use client';

import { useEffect, useState, useRef } from 'react';

type Patient = {
  id: number;
  name: string;
  treatment: string;
  status: 'new' | 'confirmed' | 'visited' | 'recall';
  time?: string;
  daysAgo?: number;
};

type Notification = {
  id: number;
  type: 'whatsapp' | 'review' | 'recall';
  name: string;
  message: string;
};

const INITIAL_PATIENTS: Patient[] = [
  { id: 1, name: 'Dr. Priya Sharma', treatment: 'Root Canal', status: 'visited', daysAgo: 1 },
  { id: 2, name: 'Rahul Mehta', treatment: 'Braces Consultation', status: 'confirmed', time: '3:00 PM' },
  { id: 3, name: 'Sunita Rao', treatment: 'Teeth Cleaning', status: 'confirmed', time: '4:30 PM' },
  { id: 4, name: 'Arjun Nair', treatment: 'Implant Checkup', status: 'recall', daysAgo: 180 },
];

const SEQUENCE: Array<{
  delay: number;
  notification: Notification;
  patientId?: number;
  newStatus?: Patient['status'];
  newPatient?: Patient;
}> = [
  {
    delay: 1800,
    notification: { id: 1, type: 'whatsapp', name: 'Rahul Mehta', message: 'Reminder sent — appointment at 3:00 PM tomorrow' },
    patientId: 2,
  },
  {
    delay: 4200,
    newPatient: { id: 5, name: 'Kavya Reddy', treatment: 'Tooth Extraction', status: 'new' },
    notification: { id: 2, type: 'whatsapp', name: 'Kavya Reddy', message: 'New enquiry received — follow-up initiated' },
  },
  {
    delay: 7000,
    notification: { id: 3, type: 'review', name: 'Dr. Priya Sharma', message: 'Review request sent after root canal visit' },
  },
  {
    delay: 9800,
    notification: { id: 4, type: 'recall', name: 'Arjun Nair', message: 'Recall sent — no visit in 6 months' },
    patientId: 4,
    newStatus: 'confirmed',
  },
  {
    delay: 12500,
    patientId: 5,
    newStatus: 'confirmed',
    notification: { id: 5, type: 'whatsapp', name: 'Kavya Reddy', message: 'Appointment confirmed for tomorrow 11:00 AM' },
  },
];

const STATUS_CONFIG = {
  new:       { label: 'New Enquiry',  color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  confirmed: { label: 'Confirmed',    color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  visited:   { label: 'Visited',      color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  recall:    { label: 'Recall Due',   color: '#fb923c', bg: 'rgba(251,146,60,0.12)'  },
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}

export function CRMDemo() {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({ appointments: 8, noShows: 1, reviews: 47 });
  const ref = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSequence = (currentPatients: Patient[]) => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    SEQUENCE.forEach((step) => {
      const t = setTimeout(() => {
        // Add notification
        setNotifications(prev => {
          const next = [step.notification, ...prev].slice(0, 3);
          return next;
        });

        // Add new patient
        if (step.newPatient) {
          setPatients(prev => [step.newPatient!, ...prev]);
          setHighlightedId(step.newPatient.id);
          setTimeout(() => setHighlightedId(null), 1800);
          setStats(s => ({ ...s, appointments: s.appointments + 1 }));
        }

        // Update status
        if (step.patientId && step.newStatus) {
          setPatients(prev => prev.map(p => p.id === step.patientId ? { ...p, status: step.newStatus! } : p));
          setHighlightedId(step.patientId);
          setTimeout(() => setHighlightedId(null), 1800);
          if (step.newStatus === 'confirmed') setStats(s => ({ ...s, appointments: s.appointments + 1 }));
        }

        // Review stat
        if (step.notification.type === 'review') {
          setTimeout(() => setStats(s => ({ ...s, reviews: s.reviews + 1 })), 1200);
        }
      }, step.delay);
      timersRef.current.push(t);
    });

    // Restart after full cycle
    const lastDelay = SEQUENCE[SEQUENCE.length - 1].delay + 3500;
    cycleRef.current = setTimeout(() => {
      setPatients(INITIAL_PATIENTS);
      setNotifications([]);
      setStats({ appointments: 8, noShows: 1, reviews: 47 });
      runSequence(INITIAL_PATIENTS);
    }, lastDelay);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    runSequence(patients);
    return () => {
      timersRef.current.forEach(clearTimeout);
      if (cycleRef.current) clearTimeout(cycleRef.current);
    };
  }, [isVisible]);

  return (
    <section className="full-bleed" style={{ background: '#0d0d1a' }} ref={ref}>
      {/* top gradient border */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #E86C2F55, #E86C2F, #E86C2F55, transparent)' }} />

      <div className="site-container py-20 md:py-28">
        {/* heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(232,108,47,0.12)', border: '1px solid rgba(232,108,47,0.3)',
            color: '#E86C2F', borderRadius: 999, padding: '4px 16px',
            fontSize: 13, fontWeight: 600, marginBottom: 16
          }}>
            ⚡ Live CRM Demo
          </p>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 0 16px' }}>
            Watch Your Clinic Run<br />
            <span style={{ background: 'linear-gradient(90deg,#E86C2F,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              On Autopilot
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7 }}>
            This is exactly what happens inside AgastyaOne's dental CRM — every day, for every patient, automatically.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16, maxWidth: 1100, margin: '0 auto' }}>

          {/* LEFT — Patient Pipeline */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', gridColumn: 'span 1' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600, fontFamily: 'Poppins,sans-serif' }}>Patient Pipeline</span>
              <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999 }}>● LIVE</span>
            </div>
            <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 320 }}>
              {patients.slice(0, 5).map((p) => {
                const cfg = STATUS_CONFIG[p.status];
                const isNew = highlightedId === p.id;
                return (
                  <div key={p.id} style={{
                    background: isNew ? 'rgba(232,108,47,0.1)' : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${isNew ? 'rgba(232,108,47,0.4)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: 10, padding: '10px 14px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    transition: 'all 0.5s ease',
                    transform: isNew ? 'scale(1.01)' : 'scale(1)',
                  }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${cfg.color}33, ${cfg.color}11)`,
                      border: `1.5px solid ${cfg.color}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: cfg.color, fontWeight: 700, fontSize: 13, fontFamily: 'Poppins,sans-serif'
                    }}>
                      {p.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 2 }}>{p.treatment}</div>
                    </div>
                    <div style={{
                      background: cfg.bg, color: cfg.color,
                      fontSize: 10, fontWeight: 700, padding: '3px 9px',
                      borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0,
                      transition: 'all 0.4s ease'
                    }}>
                      {cfg.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT col — stats + notifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Stats row */}
            <div style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.3)', marginBottom: -2 }}>
              Sample data — product demo
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {[
                { label: "Today's Appts", value: stats.appointments, color: '#34d399', suffix: '' },
                { label: 'No-Shows', value: stats.noShows, color: '#fb923c', suffix: '' },
                { label: 'Google Reviews', value: stats.reviews, color: '#E86C2F', suffix: '' },
              ].map((s) => (
                <div key={s.label} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12, padding: '14px 12px', textAlign: 'center'
                }}>
                  <div style={{ color: s.color, fontSize: 26, fontWeight: 800, fontFamily: 'Poppins,sans-serif', lineHeight: 1, transition: 'all 0.4s' }}>{s.value}{s.suffix}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 5, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Automation feed */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', flex: 1 }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600, fontFamily: 'Poppins,sans-serif' }}>Automation Feed</span>
                <span style={{ background: 'rgba(96,165,250,0.15)', color: '#60a5fa', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999, marginLeft: 'auto' }}>AUTO</span>
              </div>
              <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 200 }}>
                {notifications.length === 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120, color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
                    Waiting for activity…
                  </div>
                )}
                {notifications.map((n, i) => {
                  const cfg = n.type === 'whatsapp'
                    ? { icon: <WhatsAppIcon />, color: '#25d366', bg: 'rgba(37,211,102,0.1)', border: 'rgba(37,211,102,0.2)', label: 'WhatsApp' }
                    : n.type === 'review'
                    ? { icon: <StarIcon />, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', label: 'Review' }
                    : { icon: <BellIcon />, color: '#fb923c', bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.2)', label: 'Recall' };

                  return (
                    <div key={n.id} style={{
                      background: cfg.bg, border: `1px solid ${cfg.border}`,
                      borderRadius: 10, padding: '10px 13px',
                      opacity: i === 0 ? 1 : i === 1 ? 0.65 : 0.35,
                      transition: 'opacity 0.6s ease',
                      animation: i === 0 ? 'slideIn 0.35s ease' : undefined,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                        <span style={{ color: cfg.color }}>{cfg.icon}</span>
                        <span style={{ color: cfg.color, fontSize: 10, fontWeight: 700 }}>{cfg.label}</span>
                        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, marginLeft: 'auto' }}>just now</span>
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, lineHeight: 1.5 }}>
                        <strong style={{ color: '#fff' }}>{n.name}</strong> — {n.message}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginBottom: 16 }}>
            This runs automatically for your clinic — 24/7, zero manual work
          </p>
          <a href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg,#E86C2F,#f59e0b)',
            color: '#fff', fontWeight: 700, fontSize: 14,
            padding: '13px 28px', borderRadius: 999,
            fontFamily: 'Poppins,sans-serif',
            boxShadow: '0 8px 32px rgba(232,108,47,0.35)',
            textDecoration: 'none',
          }}>
            See It Running For Your Clinic
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      {/* bottom border */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}
