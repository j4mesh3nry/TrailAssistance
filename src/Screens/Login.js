import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';
import './styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'admin'
  const { switchPersona } = usePortal();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (activeTab === 'admin' || email.includes('dean') || email.includes('admin') || email.includes('vance')) {
      switchPersona('admin');
      navigate('/admin');
    } else {
      switchPersona('student');
      navigate('/dashboard');
    }
  };

  const handleDemoStudent = () => {
    switchPersona('student');
    navigate('/dashboard');
  };

  const handleDemoAdmin = () => {
    switchPersona('admin');
    navigate('/admin');
  };

  const handleDemoKiosk = () => {
    switchPersona('kiosk');
    navigate('/kiosk');
  };

  return (
    <div className="login-page-wrapper">
      <ToastContainer />
      <DemoRoleSwitcher />

      <div className="login-card-box card-modern">
        {/* Header Branding */}
        <div className="login-brand-header">
          <div className="login-brand-icon">
            <GraduationCap size={28} />
          </div>
          <h1 className="login-title">TrailAssistance Portal</h1>
          <p className="login-sub">University Academic Assistance & Concern Tracking</p>
        </div>

        {/* Role Tabs */}
        <div className="login-role-tabs">
          <button
            type="button"
            className={`login-tab-btn ${activeTab === 'student' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('student');
              setEmail('alex.morgan@demo.edu');
            }}
          >
            <GraduationCap size={16} />
            <span>Student Portal</span>
          </button>
          <button
            type="button"
            className={`login-tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('admin');
              setEmail('sarah.vance@university.edu');
            }}
          >
            <ShieldCheck size={16} />
            <span>Dean's Office</span>
          </button>
        </div>

        {/* 1-Click Recruiter Quick Access Bar */}
        <div className="recruiter-quick-pill-banner">
          <div className="quick-pill-header">
            <Sparkles size={13} />
            <span>Recruiter 1-Click Demo Login</span>
          </div>
          <div className="quick-pill-actions">
            <button
              type="button"
              className="quick-demo-btn student"
              onClick={handleDemoStudent}
            >
              <span>Alex Morgan (Student)</span>
            </button>
            <button
              type="button"
              className="quick-demo-btn admin"
              onClick={handleDemoAdmin}
            >
              <span>Dr. Vance (Dean)</span>
            </button>
            <button
              type="button"
              className="quick-demo-btn kiosk"
              onClick={handleDemoKiosk}
            >
              <span>Kiosk Mode</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="login-form-body">
          <div className="form-field-group">
            <label className="field-label">Institutional Email</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-inner-icon" />
              <input
                type="email"
                required
                className="input-modern"
                placeholder={activeTab === 'admin' ? 'dean@university.edu' : 'student@demo.edu'}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-field-group">
            <label className="field-label">Password</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-inner-icon" />
              <input
                type="password"
                required
                className="input-modern"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary login-action-btn">
            <span>Sign in to {activeTab === 'admin' ? "Dean's Console" : 'Student Portal'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="login-footer-row">
          <span>Need to create a new profile?</span>
          <Link to="/sign-up" className="signup-link">Register Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;