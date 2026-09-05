import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Monitor, 
  ArrowRight, 
  Sparkles, 
  Layers,
  FileCheck2,
  Users
} from 'lucide-react';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';
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
    <div className="landing-enterprise-container">
      <ToastContainer />
      <DemoRoleSwitcher />

      {/* Navigation Header */}
      <header className="landing-nav">
        <div className="landing-brand">
          <div className="landing-brand-emblem">
            <GraduationCap size={22} />
          </div>
          <div>
            <span className="landing-brand-name">TrailAssistance</span>
            <span className="landing-brand-tag">Academic Portal &bull; Enterprise Higher-Ed</span>
          </div>
        </div>

        <div className="landing-nav-links">
          <button className="landing-nav-btn" onClick={handleStartStudent}>Student Portal</button>
          <button className="landing-nav-btn" onClick={handleStartAdmin}>Dean's Console</button>
          <button className="landing-nav-btn" onClick={handleStartKiosk}>Lobby Kiosk</button>
          <Link to="/login" className="btn-primary landing-cta-btn">
            <span>Sign In</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero-section">
        <div className="landing-badge">
          <Sparkles size={14} />
          <span>Flagship Portfolio Piece &bull; University Assistance & Student Concern Portal</span>
        </div>

        <h1 className="landing-main-title">
          Empowering Higher-Ed Guidance with <br className="br-desktop" />
          <span className="gradient-text">Real-Time Academic Concern Tracking</span>
        </h1>

        <p className="landing-hero-sub">
          A modern, full-lifecycle student assistance platform engineered for dean operations, 
          prerequisite overrides, financial aid triage, and graduation clearance workflows.
        </p>

        {/* Quick 1-Click Entry Cards for Recruiters */}
        <div className="landing-persona-cards-grid">
          <div className="card-modern persona-entry-card" onClick={handleStartStudent}>
            <div className="entry-icon-box student">
              <GraduationCap size={28} />
            </div>
            <div className="entry-card-badge">Student Persona</div>
            <h3>Alex Morgan</h3>
            <p className="entry-meta">BS Computer Science &bull; 4th Year Senior</p>
            <p className="entry-desc">
              File academic petitions, track visual lifecycle progression, and receive instant dean office audit updates.
            </p>
            <div className="entry-btn-link">
              <span>Launch Student Portal</span>
              <ArrowRight size={16} />
            </div>
          </div>

          <div className="card-modern persona-entry-card highlighted" onClick={handleStartAdmin}>
            <div className="entry-icon-box admin">
              <ShieldCheck size={28} />
            </div>
            <div className="entry-card-badge dean">Dean's Persona</div>
            <h3>Dr. Sarah Vance</h3>
            <p className="entry-meta">College Dean &bull; Executive Console</p>
            <p className="entry-desc">
              Triage real-time inquiry queue, assign advising faculty, and execute official signed academic resolutions.
            </p>
            <div className="entry-btn-link">
              <span>Launch Dean's Console</span>
              <ArrowRight size={16} />
            </div>
          </div>

          <div className="card-modern persona-entry-card" onClick={handleStartKiosk}>
            <div className="entry-icon-box kiosk">
              <Monitor size={28} />
            </div>
            <div className="entry-card-badge kiosk">Self-Service</div>
            <h3>Lobby Kiosk Terminal</h3>
            <p className="entry-meta">Main Academic Complex &bull; Level 3</p>
            <p className="entry-desc">
              Express touch-screen check-in with simulated thermal printed queue tickets and live barcode tracking.
            </p>
            <div className="entry-btn-link">
              <span>Launch Terminal Mode</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {/* Live Metrics Showcase */}
        <div className="landing-metrics-strip card-modern">
          <div className="metric-strip-item">
            <span className="strip-val">{analytics?.totalTickets || 18}</span>
            <span className="strip-lbl">Active Inquiries</span>
          </div>
          <div className="strip-divider" />
          <div className="metric-strip-item">
            <span className="strip-val">{analytics?.resolutionRate || 92}%</span>
            <span className="strip-lbl">Resolution SLA Rate</span>
          </div>
          <div className="strip-divider" />
          <div className="metric-strip-item">
            <span className="strip-val">{analytics?.totalStudents || 16}+</span>
            <span className="strip-lbl">Preloaded Student Profiles</span>
          </div>
          <div className="strip-divider" />
          <div className="metric-strip-item">
            <span className="strip-val">{analytics?.avgRating || '4.9'} / 5.0</span>
            <span className="strip-lbl">Student Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="landing-features-section">
        <div className="section-title-wrap">
          <h2 className="section-title">Built with Enterprise Higher-Ed Standards</h2>
          <p className="section-sub">Replacing paper queues with transparency, accountability, and real-time responsiveness.</p>
        </div>

        <div className="features-grid">
          <div className="card-modern feature-box">
            <div className="feature-icon-box">
              <Layers size={22} />
            </div>
            <h4>Visual Lifecycle Progression Bar</h4>
            <p>Track student inquiries step-by-step from Submission to Review, Scheduled Consultation, and Final Signed Resolution.</p>
          </div>

          <div className="card-modern feature-box">
            <div className="feature-icon-box">
              <FileCheck2 size={22} />
            </div>
            <h4>Immutable Administrative Audit Log</h4>
            <p>Every decision, reassignment, and advisor memo is logged with verifiable actor timestamps and notes.</p>
          </div>

          <div className="card-modern feature-box">
            <div className="feature-icon-box">
              <Users size={22} />
            </div>
            <h4>Zero-Friction Recruiter Switcher</h4>
            <p>Evaluate Student, Dean, and Kiosk roles seamlessly with persistent LocalStorage state and 1-click demo reset.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2026 TrailAssistance &bull; University Academic Assistance & Student Concern Portal.</p>
        <p className="footer-sub">Engineered as a flagship higher-education portfolio project.</p>
      </footer>
    </div>
  );
};

export default Landing;