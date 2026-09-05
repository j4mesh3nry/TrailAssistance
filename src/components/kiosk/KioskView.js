import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Search, Printer, Clock, ArrowLeft, QrCode, MapPin, CheckCircle2, MonitorSmartphone } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import StatusBadge from '../common/StatusBadge';
import LifecycleBar from '../common/LifecycleBar';
import ustplogo from '../../assets/ustplogo.png';
import campusImg from '../../assets/ustp.jpg';

const CATS = ['Academic Advising', 'Clearance & Graduation', 'Financial Aid & Scholarships', 'Enrollment & Registration'];

export const KioskView = () => {
  const { tickets, handleCreateTicket, showToast } = usePortal();
  const navigate = useNavigate();
  const [screen, setScreen] = useState('home');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [category, setCategory] = useState(CATS[0]);
  const [purpose, setPurpose] = useState('');
  const [lookup, setLookup] = useState('');
  const [found, setFound] = useState(null);
  const [slip, setSlip] = useState(null);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  const queueAhead = tickets.filter((t) => t.status !== 'resolved').length;

  const checkin = (e) => {
    e.preventDefault();
    if (!studentId.trim() || !studentName.trim() || !purpose.trim()) { showToast('Complete name, ID and reason — large keys, no rush', 'warn'); return; }
    const queueNo = `A-${Math.floor(10 + Math.random() * 89)}`;
    const created = handleCreateTicket({
      studentId: studentId.trim(), studentName: studentName.trim(),
      studentEmail: `${studentName.trim().toLowerCase().replace(/\s+/g, '.')}@ustp.edu.ph`,
      studentProgram: 'Walk-in (Kiosk)', category,
      title: `Walk-in: ${purpose.trim()}`, purposeOfVisit: purpose.trim(), urgency: 'high',
      meetingMode: "Dean's Office (Room 302B)", preferredContact: 'Lobby display',
      details: `Kiosk walk-in at Terminal #01 • Queue ${queueNo} • ${purpose.trim()}`
    });
    setSlip({
      queueNo, ticketId: created.ticketNumber, name: studentName.trim(), sid: studentId.trim(),
      category, desk: `Counter ${1 + Math.floor(Math.random() * 3)} — Advising`, wait: queueAhead > 6 ? '15–20 min' : '8–12 min', time: clock
    });
    setScreen('slip');
  };

  const doLookup = (e) => {
    e.preventDefault();
    const hit = tickets.find((t) => t.ticketNumber.toLowerCase() === lookup.trim().toLowerCase() || t.studentId.toLowerCase() === lookup.trim().toLowerCase());
    if (!hit) { showToast('No match — try TKT-8491 or 2024-10492', 'warn'); setFound(null); return; }
    setFound(hit);
  };

  return (
    <div className="t-kiosk">
      <img className="t-kiosk-bg" src={campusImg} alt="" aria-hidden="true" />
      <div className="t-kiosk-scrim" aria-hidden="true" />
      <div className="t-kiosk-inner">
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <img src={ustplogo} alt="USTP seal" style={{ width: 46, height: 46, objectFit: 'contain', background: '#fff', borderRadius: 12, padding: 5 }} />
          <div style={{ flex: '1 1 240px' }}>
            <h1 style={{ fontSize: '1.2rem' }}>Dean’s Office • Self-service kiosk</h1>
            <p style={{ fontSize: '0.78rem', color: '#aebdd6' }}>Terminal #01 • Main Academic Complex <MapPin size={11} aria-hidden="true" style={{ display: 'inline', verticalAlign: -1 }} /> Lapasan, CDO</p>
          </div>
          <span className="t-badge t-status-scheduled" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}><Clock size={12} aria-hidden="true" /> {clock} • {queueAhead} ahead</span>
          <button type="button" onClick={() => navigate('/landing')} className="t-btn t-btn-secondary t-btn-sm">Exit</button>
        </header>

        {screen === 'home' && (
          <>
            <div style={{ textAlign: 'center', margin: '26px 0 18px' }}>
              <p style={{ display: 'inline-flex', gap: 8, alignItems: 'center', background: 'rgba(255,184,28,0.16)', border: '1px solid rgba(255,184,28,0.4)', color: '#ffd66b', borderRadius: 999, padding: '7px 14px', fontSize: '0.78rem', fontWeight: 800 }}>
                <span className="t-live-dot" aria-hidden="true" /> NOW SERVING • Walk-ins 1:30–4:00 PM
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginTop: 12 }}>Maayong adlaw, Trailblazer.<br />What brings you in?</h2>
              <p style={{ color: '#aebdd6', marginTop: 8 }}>Touch a card — everything is big on purpose.</p>
            </div>
            <div className="t-kiosk-touch">
              <button type="button" className="t-kiosk-card" onClick={() => setScreen('checkin')}>
                <Ticket size={44} aria-hidden="true" style={{ color: '#0f2942' }} />
                <h3>Get a queue number</h3>
                <p>Same-day walk-in for advising, clearance, aid. Prints your slip in seconds.</p>
                <strong style={{ marginTop: 'auto', color: '#1a4a86' }}>Tap to check in →</strong>
              </button>
              <button type="button" className="t-kiosk-card" onClick={() => setScreen('lookup')}>
                <Search size={44} aria-hidden="true" style={{ color: '#047857' }} />
                <h3>Track my request</h3>
                <p>Enter ticket # (TKT-8491) or student ID (2024-10492) for live status.</p>
                <strong style={{ marginTop: 'auto', color: '#047857' }}>Tap to track →</strong>
              </button>
            </div>
            <p style={{ textAlign: 'center', color: '#7d90b3', fontSize: '0.78rem', marginTop: 16 }}>Office today 8:30–5:00 • Bring ID • Watch the lobby screen for your number</p>
          </>
        )}

        {screen === 'checkin' && (
          <div className="t-card t-card-pad" style={{ marginTop: 18 }}>
            <button type="button" className="t-btn t-btn-ghost t-btn-sm" onClick={() => setScreen('home')}><ArrowLeft size={15} aria-hidden="true" /> Main menu</button>
            <h2 style={{ fontSize: '1.3rem', marginTop: 8, color: 'var(--t-navy-950)' }}>Walk-in check-in</h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--t-slate-500)' }}>Large keys, instant slip. Nothing is sent off-campus.</p>
            <form onSubmit={checkin} style={{ marginTop: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="t-field" style={{ margin: 0 }}>
                  <label className="t-label" htmlFor="k-id">Student ID</label>
                  <input id="k-id" className="t-input" style={{ fontSize: '1.05rem', padding: '14px' }} value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="2024-10492" inputMode="numeric" />
                </div>
                <div className="t-field" style={{ margin: 0 }}>
                  <label className="t-label" htmlFor="k-name">Full name</label>
                  <input id="k-name" className="t-input" style={{ fontSize: '1.05rem', padding: '14px' }} value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Juan Dela Cruz" autoComplete="name" />
                </div>
              </div>
              <div className="t-field" style={{ marginTop: 10 }}>
                <span className="t-label">I’m here for</span>
                <div className="t-chip-row">
                  {CATS.map((c) => (
                    <button key={c} type="button" className={`t-chip ${category === c ? 'selected' : ''}`} onClick={() => setCategory(c)} style={{ minHeight: 48, fontSize: '0.85rem' }}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="t-field">
                <label className="t-label" htmlFor="k-why">Reason in a few words</label>
                <input id="k-why" className="t-input" style={{ fontSize: '1.05rem', padding: '14px' }} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Clearance signature" />
              </div>
              <button type="submit" className="t-btn t-btn-gold t-btn-lg" style={{ width: '100%' }}><Printer size={19} aria-hidden="true" /> Print my queue slip</button>
            </form>
          </div>
        )}

        {screen === 'slip' && slip && (
          <div style={{ marginTop: 18 }}>
            <div className="t-slip" role="status" aria-label="Queue slip">
              <p style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.8rem' }}>USTP • DEAN’S OFFICE<br /><span style={{ fontWeight: 400 }}>Academic Assistance — Kiosk #01</span></p>
              <p style={{ textAlign: 'center', margin: '6px 0' }}>------------------------------</p>
              <p style={{ textAlign: 'center', fontSize: '0.7rem' }}>YOUR NUMBER</p>
              <p style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 800 }}>{slip.queueNo}</p>
              <p style={{ textAlign: 'center', fontSize: '0.72rem' }}>Ref {slip.ticketId}</p>
              <div style={{ fontSize: '0.74rem', marginTop: 10 }}>
                <p>Student: <strong>{slip.name} ({slip.sid})</strong></p>
                <p>Service: <strong>{slip.category}</strong></p>
                <p>Desk: <strong>{slip.desk}</strong></p>
                <p>Wait: <strong>{slip.wait}</strong> • Issued {slip.time}</p>
              </div>
              <div style={{ textAlign: 'center', marginTop: 10 }}>
                <QrCode size={58} aria-hidden="true" />
                <p style={{ fontSize: '0.66rem' }}>Scan for live tracker</p>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.66rem', marginTop: 8 }}>Watch the lobby screen • Salamat!</p>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
              <button type="button" className="t-btn t-btn-gold" onClick={() => { showToast(`Slip ${slip.queueNo} sent to printer`, 'success'); window.print(); }}><Printer size={17} aria-hidden="true" /> Print again</button>
              <button type="button" className="t-btn t-btn-secondary" onClick={() => { setScreen('home'); setSlip(null); setStudentId(''); setStudentName(''); setPurpose(''); }}>Done — main menu</button>
            </div>
          </div>
        )}

        {screen === 'lookup' && (
          <div className="t-card t-card-pad" style={{ marginTop: 18 }}>
            <button type="button" className="t-btn t-btn-ghost t-btn-sm" onClick={() => { setScreen('home'); setFound(null); }}><ArrowLeft size={15} aria-hidden="true" /> Main menu</button>
            <h2 style={{ fontSize: '1.3rem', marginTop: 8, color: 'var(--t-navy-950)' }}>Track your request</h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--t-slate-500)' }}>Try <strong>TKT-8491</strong> or <strong>2024-10492</strong> — to see live tracking.</p>
            <form onSubmit={doLookup} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <input className="t-input" style={{ fontSize: '1.05rem', padding: '14px' }} value={lookup} onChange={(e) => setLookup(e.target.value)} placeholder="Ticket # or Student ID" aria-label="Ticket or student ID" />
              <button type="submit" className="t-btn t-btn-primary t-btn-lg"><Search size={18} aria-hidden="true" /> Find</button>
            </form>
            {found && (
              <div style={{ marginTop: 14, border: '1px solid var(--t-line)', borderRadius: 12, padding: 14 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="t-code">{found.ticketNumber}</span><StatusBadge status={found.status} />
                </div>
                <h3 style={{ marginTop: 8 }}>{found.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--t-slate-500)' }}>{found.studentName} • {found.assignedStaff}</p>
                <div style={{ background: '#f8fafc', borderRadius: 10, padding: '8px 12px', marginTop: 10 }}><LifecycleBar status={found.status} /></div>
                <p style={{ fontSize: '0.78rem', marginTop: 8, display: 'flex', gap: 6, alignItems: 'center' }}><CheckCircle2 size={14} aria-hidden="true" style={{ color: '#059669' }} /> {(found.timeline || []).slice(-1)[0]?.note || 'In queue'}</p>
              </div>
            )}
          </div>
        )}

        <footer style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 22, color: '#7d90b3', fontSize: '0.72rem', alignItems: 'center' }}>
          <MonitorSmartphone size={13} aria-hidden="true" /> Touch-first • High contrast • Private to this terminal
        </footer>
      </div>
    </div>
  );
};

export default KioskView;



