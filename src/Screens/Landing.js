import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Monitor, 
  ArrowRight,
  BookOpen,
  Award,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2
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

      {/* Official University Institutional Header */}
      <header className="landing-univ-nav">
        <div className="univ-nav-brand">
          <img src={ustplogo} alt="USTP Official Seal" className="univ-seal-img" />
          <div className="univ-nav-text">
            <span className="univ-system-title">University of Science and Technology of Southern Philippines</span>
            <span className="univ-portal-sub">Office of the College Dean &bull; Student Academic Assistance Portal</span>
          </div>
        </div>

        <div className="univ-nav-actions">
          <button className="univ-nav-link" onClick={handleStartStudent}>Student Portal</button>
          <button className="univ-nav-link" onClick={handleStartAdmin}>Dean's Console</button>
          <button className="univ-nav-link" onClick={handleStartKiosk}>Lobby Kiosk</button>
          <Link to="/login" className="univ-signin-btn">
            <span>Sign In</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero Welcome Container with Campus Photography */}
      <main className="landing-main-wrapper">
        <div className="portal-gateway-card">
          <div className="gateway-header">
            <div className="gateway-kicker">
              <span className="kicker-pill">Official Academic Portal &bull; A.Y. 2026–2027</span>
            </div>
            <h1 className="gateway-title">
              Dean's Office Academic Assistance &amp; Student Concern Portal
            </h1>
            <p className="gateway-description">
              Welcome to the centralized portal for academic inquiries, prerequisite waivers, 
              graduation clearances, and official dean consultations.
            </p>
          </div>

          {/* Primary Action Gateways */}
          <div className="gateway-action-row">
            <button className="btn-primary gateway-btn" onClick={handleStartStudent}>
              <GraduationCap size={18} />
              <span>Enter Student Portal</span>
              <ArrowRight size={16} />
            </button>
            <Link to="/login" className="btn-secondary gateway-btn">
              <span>Account Sign In</span>
            </Link>
            <button className="gateway-text-btn" onClick={handleStartAdmin}>
              <ShieldCheck size={16} />
              <span>Dean &amp; Faculty Access</span>
            </button>
            <button className="gateway-text-btn" onClick={handleStartKiosk}>
              <Monitor size={16} />
              <span>Lobby Kiosk Terminal</span>
            </button>
          </div>

          {/* Academic Services Touchpoint Grid */}
          <div className="academic-services-section">
            <div className="services-section-heading">
              <h2>Key Academic Touchpoints</h2>
              <span className="heading-line" />
            </div>

            <div className="academic-services-grid">
              <div className="service-tile" onClick={handleStartStudent}>
                <div className="tile-icon-wrap">
                  <BookOpen size={20} />
                </div>
                <div className="tile-content">
                  <h3>Prerequisite &amp; Overload Inquiries</h3>
                  <p>Submit formal petitions for subject waivers, credit cross-enrollment, and maximum unit loads.</p>
                </div>
              </div>

              <div className="service-tile" onClick={handleStartStudent}>
                <div className="tile-icon-wrap">
                  <CheckCircle2 size={20} />
                </div>
                <div className="tile-content">
                  <h3>Graduation &amp; Subject Clearance</h3>
                  <p>Track department clearance sign-offs, resolve library or laboratory holds, and verify degree audits.</p>
                </div>
              </div>

              <div className="service-tile" onClick={handleStartStudent}>
                <div className="tile-icon-wrap">
                  <Award size={20} />
                </div>
                <div className="tile-content">
                  <h3>Scholarships &amp; Financial Aid</h3>
                  <p>Request Dean's certification and institutional endorsements for CHED and university assistance.</p>
                </div>
              </div>

              <div className="service-tile" onClick={handleStartStudent}>
                <div className="tile-icon-wrap">
                  <Calendar size={20} />
                </div>
                <div className="tile-content">
                  <h3>Dean &amp; Faculty Advising</h3>
                  <p>Book formal 1-on-1 consultations with Dr. Sarah Vance at the Dean's Office (Room 302B).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Operating Info & Realtime Metrics */}
          <div className="portal-notice-bar">
            <div className="notice-item">
              <MapPin size={16} className="notice-icon" />
              <div>
                <span className="notice-lbl">Main Campus Location</span>
                <span className="notice-val">C.M. Recto Ave, Lapasan, Cagayan de Oro City</span>
              </div>
            </div>

            <div className="notice-divider" />

            <div className="notice-item">
              <Clock size={16} className="notice-icon" />
              <div>
                <span className="notice-lbl">Dean's Consultation Hours</span>
                <span className="notice-val">Mon–Fri: 8:30 AM – 5:00 PM &bull; Priority Walk-in: 1:30 PM</span>
              </div>
            </div>

            <div className="notice-divider" />

            <div className="notice-item">
              <CheckCircle2 size={16} className="notice-icon" />
              <div>
                <span className="notice-lbl">Queue Efficiency Rate</span>
                <span className="notice-val">{analytics?.resolutionRate || 92}% Resolved &bull; 1.4 Days Avg Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Official Institutional Footer */}
      <footer className="landing-univ-footer">
        <div className="footer-content">
          <span>&copy; 2026 University of Science and Technology of Southern Philippines (USTP). Office of the College Dean.</span>
          <span className="footer-meta">TrailAssistance Portal &bull; Cagayan de Oro City &bull; All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;