import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import {
  GraduationCap, ShieldCheck, MonitorSmartphone, ArrowRight, BookOpen, Award,
  CalendarCheck, MapPin, Clock, BadgeCheck, Search, CalendarClock, MessagesSquare,
  Star, CheckCircle2, Sparkles, ChevronRight
} from 'lucide-react';
import ToastContainer from '../components/common/ToastContainer';
import ustplogo from '../assets/ustplogo.png';
import campusImg from '../assets/ustp.jpg';

const SERVICES = [
  { Icon: BookOpen, tint: '#eef2ff', color: '#4338ca', title: 'Prerequisite & overload petitions', body: 'Waivers, cross-enrollment, 21-unit loads with transcript auto-check.' },
  { Icon: BadgeCheck, tint: '#ecfdf5', color: '#047857', title: 'Clearance & graduation', body: 'Library, lab and registrar holds resolved with signed memos.' },
  { Icon: Award, tint: '#fffbeb', color: '#b45309', title: 'Aid & scholarships', body: 'Emergency grants and endorsements with clear turnaround times.' },
  { Icon: CalendarCheck, tint: '#f0f9ff', color: '#0369a1', title: 'Dean advising', body: '1-on-1s in Room 302B or secure video — pick a live slot.' },
];

const FAQS = [
  { q: 'How do I get started?', a: 'Create your student profile or sign in, then file your first request in about three minutes. Every step is tracked.' },
  { q: 'Where does my request go?', a: 'Into the Dean’s triage queue with Submitted → Under review → Scheduled → Resolved tracking and a full audit trail.' },
  { q: 'How do I track progress?', a: 'Open My Requests to see the live lifecycle, the officer handling it, and every memo — plus reply inline.' },
  { q: 'Can staff export records?', a: 'Yes — the Dean console exports a CSV ledger, and each kiosk visit prints a queue slip with your number and desk.' },
];

const Landing = () => {
  const { analytics, ratings } = usePortal();
  const navigate = useNavigate();
  const signIn = () => navigate('/login');
  const featured = ratings?.find((r) => Number(r.rating) === 5) || ratings?.[0];

  return (
    <div className="t-landing">
      <a className="t-skip" href="#gateway">Skip to gateway</a>
      <ToastContainer />

      <div className="t-landing-nav">
        <div className="t-landing-nav-inner">
          <img src={ustplogo} alt="USTP seal" style={{ width: 38, height: 38, objectFit: 'contain' }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ font: "800 0.82rem var(--t-font-display)", color: 'var(--t-navy-950)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>University of Science and Technology of Southern Philippines</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--t-slate-500)', fontWeight: 600 }}>Office of the College Dean • TrailAssistance</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link to="/sign-up" className="t-btn t-btn-ghost t-btn-sm">Create account</Link>
            <Link to="/login" className="t-btn t-btn-primary t-btn-sm">Sign in <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>

      <main id="gateway">
        <section className="t-hero" aria-label="Portal gateway">
          <div className="t-hero-copy">
            <span className="t-badge t-status-scheduled"><Sparkles size={12} aria-hidden="true" /> Official portal • A.Y. 2026–2027</span>
            <h1 style={{ marginTop: 12 }}>Academic help, <span className="gold">tracked like a flight</span> — not lost in paper.</h1>
            <p className="lead">File advising, clearance, aid and enrollment requests in minutes. Watch every handoff live, book the Dean, and leave with a signed resolution.</p>
            <div className="t-hero-ctas">
              <button type="button" className="t-btn t-btn-gold t-btn-lg" onClick={signIn}>
                Sign in to continue <ArrowRight size={18} aria-hidden="true" />
              </button>
              <Link to="/sign-up" className="t-btn t-btn-secondary t-btn-lg">
                Create student account
              </Link>
            </div>
            <dl className="t-hero-stats" aria-label="Live proof">
              <div className="t-hero-stat"><dt>Active queue</dt><dd>{analytics?.pendingTickets ?? '—'} live</dd></div>
              <div className="t-hero-stat"><dt>Resolved</dt><dd>{analytics?.resolutionRate ?? '—'}% • 1.4d avg</dd></div>
              <div className="t-hero-stat"><dt>Student rating</dt><dd>★ {analytics?.avgRating ?? '4.8'} / 5</dd></div>
            </dl>
            <p style={{ marginTop: 10, fontSize: '0.74rem', color: 'var(--t-slate-500)' }}>Students, Dean & staff, and the lobby kiosk all enter through sign-in. Press <kbd style={{ background: '#fff', border: '1px solid var(--t-line)', borderRadius: 6, padding: '1px 6px' }}>Ctrl K</kbd> anywhere to search once inside.</p>
          </div>
          <div>
            <figure className="t-campus-frame" style={{ margin: 0 }}>
              <img src={campusImg} alt="USTP Cagayan de Oro main campus academic complex" fetchpriority="high" />
              <figcaption className="t-campus-caption">
                <div className="t-float">
                  <CheckCircle2 size={18} aria-hidden="true" style={{ color: '#059669', flexShrink: 0 }} />
                  <div><strong>{analytics?.resolutionRate ?? 92}% resolved</strong><span>Live queue health today</span></div>
                </div>
                <div className="t-float">
                  <span className="t-live-dot" aria-hidden="true" />
                  <div><strong>Dean on duty — Rm 302B</strong><span>Walk-ins 1:30–4:00 PM • CDO campus</span></div>
                </div>
              </figcaption>
            </figure>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <span className="t-badge t-status-submitted"><MapPin size={11} aria-hidden="true" /> C.M. Recto Ave, Lapasan, CDO</span>
              <span className="t-badge t-status-scheduled"><Clock size={11} aria-hidden="true" /> Mon–Fri 8:30–5:00</span>
            </div>
          </div>
        </section>

        <section className="t-section" aria-label="Who it's for">
          <h2 className="t-section-title" style={{ fontSize: '1.15rem' }}>One account, every office</h2>
          <p className="t-section-sub">Sign in once — your workspace opens for your role.</p>
          <div className="t-grid-3">
            {[
              { Icon: GraduationCap, title: 'Students', body: 'File concerns, track the lifecycle live, message your officer, rate the service.' },
              { Icon: ShieldCheck, title: 'Dean & Staff', body: 'Triage the queue breach-first, assign officers, sign memos, export records.' },
              { Icon: MonitorSmartphone, title: 'Lobby Kiosk', body: 'Walk-in check-in and queue slips at Terminal #01, synced to the same queue.' },
            ].map((c) => (
              <button key={c.title} type="button" onClick={signIn} className="t-card t-card-pad t-card-hover" style={{ textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
                <span className="t-kpi-icon" style={{ background: '#0f2942', color: '#ffd66b' }}><c.Icon size={19} aria-hidden="true" /></span>
                <h3 style={{ marginTop: 12, fontSize: '1rem' }}>{c.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--t-slate-500)', marginTop: 4 }}>{c.body}</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, fontWeight: 800, fontSize: '0.8rem', color: 'var(--t-navy-900)' }}>Sign in <ChevronRight size={15} aria-hidden="true" /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="t-section" aria-label="Services">
          <h2 className="t-section-title" style={{ fontSize: '1.15rem' }}>What you can file</h2>
          <p className="t-section-sub">Six categories, one consistent lifecycle — no more guessing which office owns your paper.</p>
          <div className="t-bento">
            {SERVICES.map((s) => (
              <div key={s.title} className="t-card t-bento-card t-card-hover">
                <span className="t-kpi-icon" style={{ background: s.tint, color: s.color }}><s.Icon size={19} aria-hidden="true" /></span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="t-section" aria-label="How it works">
          <h2 className="t-section-title" style={{ fontSize: '1.15rem' }}>File → track → signed</h2>
          <p className="t-section-sub">The journey every request takes, visible to both sides.</p>
          <div className="t-journey">
            {[
              { Icon: Search, t: '1. File in ~3 minutes', s: 'Category, urgency + live slot, narrative. Transcript auto-attached. Draft autosaves.' },
              { Icon: CalendarClock, t: '2. Track the lifecycle', s: 'Submitted → Under review → Scheduled → Resolved with turnaround estimates.' },
              { Icon: MessagesSquare, t: '3. Talk + close the loop', s: 'Message the officer, get a signed memo, rate the service. Nothing gets lost.' },
            ].map((j) => (
              <div key={j.t} className="t-journey-card">
                <span className="t-kpi-icon" style={{ background: 'rgba(255,184,28,0.16)', color: '#ffd66b' }}><j.Icon size={19} aria-hidden="true" /></span>
                <strong>{j.t}</strong>
                <span>{j.s}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="t-section" aria-label="Student proof">
          <div className="t-grid-2">
            <div className="t-review">
              <div style={{ display: 'flex', gap: 2 }} aria-label={`${featured?.rating || 5} stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} aria-hidden="true" style={{ color: i < Number(featured?.rating || 5) ? '#f59e0b' : '#e2e8f0', fill: i < Number(featured?.rating || 5) ? '#f59e0b' : 'none' }} />
                ))}
              </div>
              <blockquote>“{featured?.feedback || 'Overload approved in 48 hours. The tracker told me exactly who had my paper.'}”</blockquote>
              <cite style={{ fontStyle: 'normal', fontWeight: 700, fontSize: '0.78rem' }}>— {featured?.studentName || 'Verified student'} • {featured?.category || 'Enrollment'}</cite>
            </div>
            <div className="t-card t-card-pad">
              <h3 style={{ fontSize: '1rem' }}>Office hours & queue truth</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--t-slate-500)', marginTop: 4 }}>Dean consults Mon–Fri 8:30–5:00. Priority walk-ins 1:30 PM. Queue slips at the lobby kiosk show your number, desk, and wait.</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                <button type="button" className="t-btn t-btn-primary t-btn-sm" onClick={signIn}>Sign in</button>
                <Link to="/sign-up" className="t-btn t-btn-secondary t-btn-sm">Create account</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="t-section" aria-label="FAQ">
          <h2 className="t-section-title" style={{ fontSize: '1.15rem' }}>Common questions</h2>
          <div className="t-faq" style={{ marginTop: 12 }}>
            {FAQS.map((f) => (
              <div key={f.q} className="t-card t-faq-item">
                <strong>{f.q}</strong>
                <span>{f.a}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="t-footer">
        <div className="t-footer-inner">
          <span>© 2026 USTP • Office of the College Dean • TrailAssistance</span>
          <span>Cagayan de Oro City • C.M. Recto Ave, Lapasan</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
