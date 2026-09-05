import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePortal } from '../../context/PortalContext';
import { GraduationCap, ShieldCheck, MonitorSmartphone, RotateCcw } from 'lucide-react';

export const DemoRoleSwitcher = () => {
  const { personaType, switchPersona, handleResetDemoData } = usePortal();
  const navigate = useNavigate();
  const location = useLocation();

  const go = (role) => {
    switchPersona(role);
    const target = role === 'admin' ? '/admin' : role === 'kiosk' ? '/kiosk' : '/dashboard';
    if (location.pathname !== target) navigate(target);
  };

  return (
    <div className="t-demo-switcher" role="region" aria-label="Demo controls">
      <span className="t-visually-hidden">Showcase demo controls</span>
      <button type="button" className={personaType === 'student' ? 'active' : ''} onClick={() => go('student')} title="Student demo">
        <GraduationCap size={14} aria-hidden="true" /> Student
      </button>
      <button type="button" className={personaType === 'admin' ? 'active' : ''} onClick={() => go('admin')} title="Dean demo">
        <ShieldCheck size={14} aria-hidden="true" /> Dean
      </button>
      <button type="button" className={personaType === 'kiosk' ? 'active' : ''} onClick={() => go('kiosk')} title="Kiosk demo">
        <MonitorSmartphone size={14} aria-hidden="true" /> Kiosk
      </button>
      <button type="button" onClick={handleResetDemoData} title="Reset demo data" aria-label="Reset demo data">
        <RotateCcw size={14} aria-hidden="true" />
      </button>
    </div>
  );
};

export default DemoRoleSwitcher;
