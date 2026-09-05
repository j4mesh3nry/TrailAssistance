import React from 'react';
import { usePortal } from '../../context/PortalContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Monitor, RotateCcw } from 'lucide-react';

export const DemoRoleSwitcher = () => {
  const { personaType, switchPersona, handleResetDemoData } = usePortal();
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    switchPersona(role);
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'kiosk') {
      navigate('/kiosk');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="floating-role-switcher" role="region" aria-label="Recruiter Demo Controls">
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '4px' }}>
        <span style={{ fontSize: '0.675rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Recruiter Demo:
        </span>
      </div>

      <button
        className={`floating-pill-btn ${personaType === 'student' ? 'active' : ''}`}
        onClick={() => handleRoleChange('student')}
        title="Switch to Student Persona (Alex Morgan)"
      >
        <GraduationCap size={14} />
        <span>Student</span>
      </button>

      <button
        className={`floating-pill-btn ${personaType === 'admin' ? 'active' : ''}`}
        onClick={() => handleRoleChange('admin')}
        title="Switch to Admin Persona (Dr. Sarah Vance - Dean)"
      >
        <ShieldCheck size={14} />
        <span>Dean</span>
      </button>

      <button
        className={`floating-pill-btn ${personaType === 'kiosk' ? 'active' : ''}`}
        onClick={() => handleRoleChange('kiosk')}
        title="Switch to Kiosk Mode (Lobby Self-Service)"
      >
        <Monitor size={14} />
        <span>Kiosk</span>
      </button>

      <div className="floating-pill-divider" />

      <button
        className="floating-reset-btn"
        onClick={handleResetDemoData}
        title="Reset all demo data to initial state"
        aria-label="Reset demo data"
      >
        <RotateCcw size={14} />
      </button>
    </div>
  );
};

export default DemoRoleSwitcher;
