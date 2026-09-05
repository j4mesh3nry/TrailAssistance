import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { usePortal, roleHome } from '../context/PortalContext';
import { Mail, Lock, ArrowRight, User, GraduationCap, ShieldCheck, MonitorSmartphone, BadgeCheck } from 'lucide-react';
import ToastContainer from '../components/common/ToastContainer';
import ustplogo from '../assets/ustplogo.png';
import campusImg from '../assets/ustp.jpg';

const ROLES = [
  { id: 'student', label: 'Student', desc: 'File & track requests', Icon: GraduationCap, bg: '#eef2ff', fg: '#4338ca', dy: 1.5 },
  { id: 'staff', label: 'Dean & Staff', desc: 'Triage & resolve queue', Icon: ShieldCheck, bg: '#ecfdf5', fg: '#047857' },
  { id: 'kiosk', label: 'Lobby Kiosk', desc: 'Walk-in terminal', Icon: MonitorSmartphone, bg: '#fffbeb', fg: '#b45309' },
];

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { session, signInAs } = usePortal();
  const navigate = useNavigate();

  if (session) return <Navigate to={roleHome(session.role)} replace />;

  const submit = (e) => {
    e.preventDefault();
    signInAs(role, { name, email });
    navigate(roleHome(role));
  };

  return (
    <div className="t-auth">
      <a className="t-skip" href="#login-form">Skip to sign in</a>
      <ToastContainer />
      <aside className="t-auth-panel" aria-label="Campus">
        <img className="bg" src={campusImg} alt="USTP campus academic complex" />
        <div className="t-auth-panel-content">
          <img src={ustplogo} alt="USTP seal" style={{ width: 52, height: 52, objectFit: 'contain', background: '#fff', borderRadius: 12, padding: 6 }} />
          <h1 style={{ fontSize: '1.9rem', marginTop: 14, lineHeight: 1.1 }}>One queue.<br />Every office.<br /><span style={{ color: '#ffd66b' }}>Zero paper.</span></h1>
          <p style={{ color: '#c6d3e8', marginTop: 10, maxWidth: 420 }}>Sign in to file, track and resolve academic requests with a live audit trail — from first filing to signed resolution.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <span className="t-badge t-status-resolved"><BadgeCheck size={12} aria-hidden="true" /> 92% resolved</span>
            <span className="t-badge t-status-scheduled">1.4d avg turnaround</span>
          </div>
        </div>
      </aside>
      <main className="t-auth-form-wrap">
        <div className="t-card t-auth-card" id="login-form">
          <Link to="/landing" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--t-slate-500)' }}>← Back to campus portal</Link>
          <h2 style={{ fontSize: '1.5rem', marginTop: 10, color: 'var(--t-navy-950)' }}>Sign in to TrailAssistance</h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--t-slate-500)', marginTop: 4 }}>Enter your details and choose where you&apos;re headed.</p>
          <form onSubmit={submit} style={{ marginTop: 14 }}>
            <div className="t-field">
              <span className="t-label" id="role-label">I am signing in as</span>
              <div className="t-pick-grid t-role-grid" role="radiogroup" aria-labelledby="role-label">
                {ROLES.map((r) => (
                  <button key={r.id} type="button" role="radio" aria-checked={role === r.id} className={`t-pick t-role-opt ${role === r.id ? 'selected' : ''}`} onClick={() => setRole(r.id)}>
                    <span className="t-pick-icon" style={{ background: r.bg, color: r.fg, width: 38, height: 38 }}><r.Icon size={19} aria-hidden="true" style={r.dy ? { transform: `translateY(${r.dy}px)` } : undefined} /></span>
                    <span className="t-pick-text"><strong style={{ fontSize: '0.8rem' }}>{r.label}</strong><span style={{ fontSize: '0.68rem' }}>{r.desc}</span></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="t-field">
              <label className="t-label" htmlFor="login-name">Full name</label>
              <div className="t-input-icon">
                <User size={16} aria-hidden="true" />
                <input id="login-name" className="t-input" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Juan Dela Cruz" autoComplete="name" />
              </div>
            </div>
            <div className="t-field">
              <label className="t-label" htmlFor="login-email">Institutional email</label>
              <div className="t-input-icon">
                <Mail size={16} aria-hidden="true" />
                <input id="login-email" className="t-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. juan.delacruz@ustp.edu.ph" autoComplete="email" />
              </div>
            </div>
            <div className="t-field">
              <label className="t-label" htmlFor="login-pass">Password</label>
              <div className="t-input-icon">
                <Lock size={16} aria-hidden="true" />
                <input id="login-pass" className="t-input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" />
              </div>
            </div>
            <button type="submit" className="t-btn t-btn-primary" style={{ width: '100%' }}>Sign in <ArrowRight size={16} aria-hidden="true" /></button>
          </form>
          <p style={{ marginTop: 14, fontSize: '0.8rem', color: 'var(--t-slate-500)', textAlign: 'center' }}>New student? <Link to="/sign-up" style={{ fontWeight: 800, color: 'var(--t-navy-900)' }}>Create your profile</Link></p>
        </div>
      </main>
    </div>
  );
};

export default Login;
