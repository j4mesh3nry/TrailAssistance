import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { addStudent } from '../services/portalStorage';
import { User, Mail, BookOpen, Lock, ArrowRight } from 'lucide-react';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';
import ustplogo from '../assets/ustplogo.png';
import campusImg from '../assets/ustp.jpg';

const PROGRAMS = ['BS Computer Science', 'BS Information Technology', 'BS Cybersecurity', 'BS Electrical Engineering', 'BS Architecture', 'MS Artificial Intelligence'];
const YEARS = ['1st Year - Freshman', '2nd Year - Sophomore', '3rd Year - Junior', '4th Year - Senior'];

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', program: PROGRAMS[0], yearOfStudy: YEARS[0], password: '' });
  const { reloadData, switchPersona } = usePortal();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    addStudent({ name: form.name, email: form.email, program: form.program, yearOfStudy: form.yearOfStudy, role: 'undergraduate' });
    reloadData();
    switchPersona('student');
    navigate('/dashboard');
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="t-auth">
      <ToastContainer />
      <DemoRoleSwitcher />
      <aside className="t-auth-panel" aria-label="Campus">
        <img className="bg" src={campusImg} alt="USTP campus" />
        <div className="t-auth-panel-content">
          <img src={ustplogo} alt="USTP seal" style={{ width: 52, height: 52, objectFit: 'contain', background: '#fff', borderRadius: 12, padding: 6 }} />
          <h1 style={{ fontSize: '1.9rem', marginTop: 14 }}>Join the queue<br />in <span style={{ color: '#ffd66b' }}>30 seconds.</span></h1>
          <p style={{ color: '#c6d3e8', marginTop: 10 }}>Profiles are stored locally for the showcase — no email verification, no waiting. You’ll land straight in the student workspace.</p>
        </div>
      </aside>
      <main className="t-auth-form-wrap">
        <div className="t-card t-auth-card">
          <Link to="/login" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--t-slate-500)' }}>← Back to sign in</Link>
          <h2 style={{ fontSize: '1.5rem', marginTop: 10, color: 'var(--t-navy-950)' }}>Create student profile</h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--t-slate-500)', marginTop: 4 }}>Showcase-only. Saved to this browser.</p>
          <form onSubmit={submit} style={{ marginTop: 14 }}>
            <div className="t-field">
              <label className="t-label" htmlFor="su-name">Full name <span className="t-req">*</span></label>
              <div className="t-input-icon"><User size={16} aria-hidden="true" /><input id="su-name" className="t-input" required value={form.name} onChange={set('name')} placeholder="e.g. Alex Morgan" /></div>
            </div>
            <div className="t-field">
              <label className="t-label" htmlFor="su-email">Institutional email <span className="t-req">*</span></label>
              <div className="t-input-icon"><Mail size={16} aria-hidden="true" /><input id="su-email" className="t-input" type="email" required value={form.email} onChange={set('email')} placeholder="you@demo.edu" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div className="t-field">
                <label className="t-label" htmlFor="su-prog">Program</label>
                <div className="t-input-icon"><BookOpen size={16} aria-hidden="true" />
                  <select id="su-prog" className="t-select" style={{ paddingLeft: 38 }} value={form.program} onChange={set('program')}>
                    {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="t-field">
                <label className="t-label" htmlFor="su-year">Year</label>
                <select id="su-year" className="t-select" value={form.yearOfStudy} onChange={set('yearOfStudy')}>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div className="t-field">
              <label className="t-label" htmlFor="su-pass">Password <span className="t-req">*</span></label>
              <div className="t-input-icon"><Lock size={16} aria-hidden="true" /><input id="su-pass" className="t-input" type="password" required value={form.password} onChange={set('password')} placeholder="Anything works in demo" /></div>
            </div>
            <button type="submit" className="t-btn t-btn-gold" style={{ width: '100%' }}>Create & enter workspace <ArrowRight size={16} aria-hidden="true" /></button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
