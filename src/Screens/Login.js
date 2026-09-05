import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';
import ustplogo from '../assets/ustplogo.png';
import './styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { switchPersona } = usePortal();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.includes('dean') || email.includes('admin') || email.includes('vance')) {
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
    <div className="login-campus-page">
      <ToastContainer />
      <DemoRoleSwitcher />

      <div className="login-frosted-card card-frosted">
        <Link to="/landing" className="login-back-link">
          <ArrowLeft size={14} />
          <span>Back to Campus Portal</span>
        </Link>

        {/* USTP Logo */}
        <div className="login-brand-box">
          <img src={ustplogo} alt="USTP Logo" className="login-ustp-img" />
          <h1 className="login-main-title">Portal Sign In</h1>
          <p className="login-main-sub">University of Science and Technology of Southern Philippines</p>
        </div>

        {/* Quick Role Access */}
        <div className="recruiter-pill-strip">
          <span className="pill-strip-label">Quick Sign-In Access</span>
          <div className="pill-btn-group">
            <button type="button" className="pill-btn student" onClick={handleDemoStudent}>
              Student (Alex)
            </button>
            <button type="button" className="pill-btn dean" onClick={handleDemoAdmin}>
              Dean (Dr. Vance)
            </button>
            <button type="button" className="pill-btn kiosk" onClick={handleDemoKiosk}>
              Lobby Kiosk
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="login-compact-form">
          <div className="form-field-group">
            <label className="field-label">Institutional Email</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-inner-icon" />
              <input
                type="email"
                required
                className="input-modern"
                placeholder="student@demo.edu or dean@university.edu"
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

          <button type="submit" className="btn-primary login-submit-btn">
            <span>Sign In</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="login-bottom-links">
          <span>First time student?</span>
          <Link to="/sign-up" className="signup-text-link">Register Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;