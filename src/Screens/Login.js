import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { Mail, Lock, ArrowRight, GraduationCap, ShieldCheck, MonitorSmartphone, BadgeCheck } from 'lucide-react';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';
import ustplogo from '../assets/ustplogo.png';
import campusImg from '../assets/ustp.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { switchPersona, showToast } = usePortal();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const v = email.toLowerCase();
    if (v.includes('dean') || v.includes('admin') || v.includes('vance')) { switchPersona('admin'); navigate('/admin'); }
    else { switchPersona('student'); navigate('/dashboard'); }
    showToast('Signed in to showcase workspace', 'success');
  };

  const quick = (role, path) => { switchPersona(role); navigate(path); };

  return (
    <div className="t-auth">
      <a className="t-skip" href="#login-form">Skip to sign in</a>
      <ToastContainer />
      <DemoRoleSwitcher />
      <aside className="t-auth-panel" aria-label="Campus">
        <img className="bg" src={campusImg} alt="USTP campus academic complex" />
        <div className="t-auth-panel-content">
          <img src={ustplogo} alt="USTP seal" style={{ width: 52, height: 52, objectFit: 'contain', background: '#fff', borderRadius: 12, padding: 6 }} />
          <h1 style={{ fontSize: '1.9rem', marginTop: 14, lineHeight: 1.1 }}>One queue.<br />Every office.<br /><span style={{ color: '#ffd66b' }}>Zero paper.</span></h1>
          <p style={{ color: '#c6d3e8', marginTop: 10, maxWidth: 420 }}>Sign in to file, track and resolve academic requests with a live audit trail. Showcase mode — pick a demo door, no password needed.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <span className="t-badge t-status-resolved"><BadgeCheck size={12} aria-hidden="true" /> 92% resolved</span>
            <span className="t-badge t-status-scheduled">1.4d avg turnaround</span>
          </div>
        </div>
      </aside>
      <main className="t-auth-form-wrap">
        <div className="t-card t-auth-card" id="login-form">
          <Link to="/landing" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--t-slate-500)' }}>← Back to campus portal</Link>
          <h2 style={{ fontSize: '1.5rem', marginTop: 10, color: 'var(--t-navy-950)' }}>Welcome back, Trailblazer</h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--t-slate-500)', marginTop: 4 }}>Use any email — routing is by role keyword. Or one-tap a demo.</p>
          <div className="t-demo-grid" role="group" aria-label="One-tap demo">
            <button type="button" className="t-demo-btn" onClick={() => quick('student', '/dashboard')}><GraduationCap size={14} aria-hidden="true" /> Alex (Student)</button>
            <button type="button" className="t-demo-btn" onClick={() => quick('admin', '/admin')}><ShieldCheck size={14} aria-hidden="true" /> Dean Vance</button>
            <button type="button" className="t-demo-btn" onClick={() => quick('kiosk', '/kiosk')}><MonitorSmartphone size={14} aria-hidden="true" /> Kiosk</button>
          </div>
          <form onSubmit={submit}>
            <div className="t-field">
              <label className="t-label" htmlFor="login-email">Institutional email</label>
              <div className="t-input-icon">
                <Mail size={16} aria-hidden="true" />
                <input id="login-email" className="t-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex.morgan@demo.edu — try dean@… for Dean" autoComplete="email" />
              </div>
            </div>
            <div className="t-field">
              <label className="t-label" htmlFor="login-pass">Password</label>
              <div className="t-input-icon">
                <Lock size={16} aria-hidden="true" />
                <input id="login-pass" className="t-input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="•••••••• (anything works in demo)" autoComplete="current-password" />
              </div>
              <span className="t-hint">Hint: include “dean” in the email to land in the Dean console.</span>
            </div>
            <button type="submit" className="t-btn t-btn-primary" style={{ width: '100%' }}>Sign in <ArrowRight size={16} aria-hidden="true" /></button>
          </form>
          <p style={{ marginTop: 14, fontSize: '0.8rem', color: 'var(--t-slate-500)', textAlign: 'center' }}>New here? <Link to="/sign-up" style={{ fontWeight: 800, color: 'var(--t-navy-900)' }}>Create a student profile</Link></p>
        </div>
      </main>
    </div>
  );
};

export default Login;
