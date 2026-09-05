import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Monitor, 
  ArrowRight
} from 'lucide-react';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';
import ustplogo from '../assets/ustplogo.png';
import './styles/Landing.css';

const Landing = () => {
  const { switchPersona, analytics } = usePortal();
  const navigate = useNavigate();

  const handleStartStudent = () => {
    switchPersona('student');
    navigate('/dashboard');
  };

  const handleStartAdmin = () => {
    switchPersona('admin');
    navigate('/admin');
  };

  const handleStartKiosk = () => {
    switchPersona('kiosk');
    navigate('/kiosk');
  };

  return (
    <div className="landing-campus-page">
      <ToastContainer />
      <DemoRoleSwitcher />

      {/* Clean Navbar */}
      <header className="landing-clean-nav">
        <div className="nav-brand-group">
          <img src={ustplogo} alt="USTP Emblem" className="nav-ustp-logo" />
          <div className="nav-brand-text">
            <span className="brand-primary-name">TrailAssistance</span>
            <span className="brand-school-sub">USTP Dean's Office Assistance Portal</span>
          </div>
        </div>

        <nav className="nav-action-links">
          <button className="nav-text-btn" onClick={handleStartStudent}>Student</button>
          <button className="nav-text-btn" onClick={handleStartAdmin}>Dean</button>
          <button className="nav-text-btn" onClick={handleStartKiosk}>Kiosk</button>
          <Link to="/login" className="btn-primary nav-signin-btn">
            <span>Login</span>
            <ArrowRight size={14} />
          </Link>
        </nav>
      </header>

      {/* Hero Section with Campus Background */}
      <main className="landing-hero-center">
        <div className="hero-concise-wrapper">
          <div className="campus-badge">
            <span>USTP &bull; Academic Year 2026–2027</span>
          </div>

          <h1 className="hero-concise-title">
            Academic Assistance & <br />
            Student Concern Portal
          </h1>

          <p className="hero-concise-sub">
            Welcome to the Dean's Office Assistance Portal. We're here to help you with all your academic needs &bull; 
            real-time lifecycle tracking for USTP scholars.
          </p>

          {/* Minimalist 3-Persona Cards */}
          <div className="persona-trio-grid">
            <div className="card-frosted persona-trio-card" onClick={handleStartStudent}>
              <div className="trio-icon-box student">
                <GraduationCap size={22} />
              </div>
              <span className="trio-tag">Student Persona</span>
              <h3>Alex Morgan</h3>
              <p className="trio-meta">BS Computer Science &bull; 4th Year</p>
              <div className="trio-link">
                <span>Enter Portal</span>
                <ArrowRight size={14} />
              </div>
            </div>

            <div className="card-frosted persona-trio-card highlighted" onClick={handleStartAdmin}>
              <div className="trio-icon-box dean">
                <ShieldCheck size={22} />
              </div>
              <span className="trio-tag dean">Dean's Persona</span>
              <h3>Dr. Sarah Vance</h3>
              <p className="trio-meta">College Dean &bull; Executive Console</p>
              <div className="trio-link">
                <span>Enter Console</span>
                <ArrowRight size={14} />
              </div>
            </div>

            <div className="card-frosted persona-trio-card" onClick={handleStartKiosk}>
              <div className="trio-icon-box kiosk">
                <Monitor size={22} />
              </div>
              <span className="trio-tag kiosk">Lobby Terminal</span>
              <h3>Self-Service Kiosk</h3>
              <p className="trio-meta">Lobby Walk-in &bull; Queue Slip</p>
              <div className="trio-link">
                <span>Launch Kiosk</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Minimalist Stats Strip */}
          <div className="concise-stats-bar card-frosted">
            <div className="c-stat-item">
              <span className="c-stat-val">{analytics?.totalTickets || 18}</span>
              <span className="c-stat-lbl">Active Inquiries</span>
            </div>
            <div className="c-stat-line" />
            <div className="c-stat-item">
              <span className="c-stat-val">{analytics?.resolutionRate || 92}%</span>
              <span className="c-stat-lbl">Resolution Rate</span>
            </div>
            <div className="c-stat-line" />
            <div className="c-stat-item">
              <span className="c-stat-val">1.4 Days</span>
              <span className="c-stat-lbl">Average SLA</span>
            </div>
            <div className="c-stat-line" />
            <div className="c-stat-item">
              <span className="c-stat-val">USTP CDO</span>
              <span className="c-stat-lbl">Lapasan Campus</span>
            </div>
          </div>
        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="landing-clean-footer">
        <span>&copy; 2026 University of Science and Technology of Southern Philippines (USTP). All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Landing;