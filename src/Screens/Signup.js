import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortal } from '../context/PortalContext';
import { addStudent } from '../services/portalStorage';
import { Mail, Lock, User, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';
import ustplogo from '../assets/ustplogo.png';
import './styles/Login.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('BS Computer Science');
  const [yearOfStudy, setYearOfStudy] = useState('1st Year - Freshman');
  const [password, setPassword] = useState('');
  const { showToast, reloadData, switchPersona } = usePortal();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const studentObj = addStudent({
      name,
      email,
      program,
      yearOfStudy,
      role: 'undergraduate'
    });

    reloadData();
    showToast(`Account registered for ${studentObj.name}!`, 'success');
    switchPersona('student');
    navigate('/dashboard');
  };

  return (
    <div className="login-campus-page">
      <ToastContainer />
      <DemoRoleSwitcher />

      <div className="login-frosted-card card-frosted">
        <Link to="/login" className="login-back-link">
          <ArrowLeft size={14} />
          <span>Back to Sign In</span>
        </Link>

        <div className="login-brand-box">
          <img src={ustplogo} alt="USTP Logo" className="login-ustp-img" />
          <h1 className="login-main-title">Register Account</h1>
          <p className="login-main-sub">USTP Student Academic Assistance</p>
        </div>

        <form onSubmit={handleSignUp} className="login-compact-form">
          <div className="form-field-group">
            <label className="field-label">Full Name</label>
            <div className="input-with-icon">
              <User size={16} className="input-inner-icon" />
              <input
                type="text"
                required
                className="input-modern"
                placeholder="e.g., Alex Morgan"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-field-group">
            <label className="field-label">Institutional Email</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-inner-icon" />
              <input
                type="email"
                required
                className="input-modern"
                placeholder="student@demo.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-field-group">
            <label className="field-label">Degree Program</label>
            <div className="input-with-icon">
              <BookOpen size={16} className="input-inner-icon" />
              <select
                className="select-modern"
                style={{ paddingLeft: '36px' }}
                value={program}
                onChange={e => setProgram(e.target.value)}
              >
                <option value="BS Computer Science">BS Computer Science</option>
                <option value="BS Information Technology">BS Information Technology</option>
                <option value="BS Cybersecurity">BS Cybersecurity</option>
                <option value="BS Electrical Engineering">BS Electrical Engineering</option>
                <option value="BS Architecture">BS Architecture</option>
                <option value="MS Artificial Intelligence">MS Artificial Intelligence</option>
              </select>
            </div>
          </div>

          <div className="form-field-group">
            <label className="field-label">Year of Study</label>
            <select
              className="select-modern"
              value={yearOfStudy}
              onChange={e => setYearOfStudy(e.target.value)}
            >
              <option value="1st Year - Freshman">1st Year - Freshman</option>
              <option value="2nd Year - Sophomore">2nd Year - Sophomore</option>
              <option value="3rd Year - Junior">3rd Year - Junior</option>
              <option value="4th Year - Senior">4th Year - Senior</option>
            </select>
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
            <span>Create Profile</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="login-bottom-links">
          <span>Already registered?</span>
          <Link to="/login" className="signup-text-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;