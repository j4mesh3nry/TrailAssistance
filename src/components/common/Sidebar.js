import React from 'react';
import { usePortal } from '../../context/PortalContext';
import ustplogo from '../../assets/ustplogo.png';

const ROLE_LABEL = { student: 'Student', staff: 'Dean & Staff', kiosk: 'Lobby Kiosk' };

export const Sidebar = ({ title, subtitle, sections, currentView, onViewChange, footer }) => {
  const { tickets, activeUser, session } = usePortal();
  const personaType = session?.role || 'student';

  const withCounts = (items) => items.map((item) => {
    if (item.countKey === 'studentActive') {
      const n = tickets.filter((t) => t.studentEmail === activeUser?.email && t.status !== 'resolved').length;
      return { ...item, count: n || null };
    }
    if (item.countKey === 'adminActive') {
      const n = tickets.filter((t) => t.status === 'submitted' || t.status === 'under_review').length;
      return { ...item, count: n || null };
    }
    return item;
  });

  return (
    <aside className="t-sidebar" aria-label={title}>
      <div className="t-brand">
        <img src={ustplogo} alt="USTP seal" />
        <div>
          <div className="t-brand-name">TrailAssistance</div>
          <div className="t-brand-sub">{subtitle || 'USTP Dean\u2019s Office'}</div>
        </div>
      </div>
      <nav className="t-nav">
        {sections.map((sec, si) => (
          <div key={si}>
            {sec.label && <div className="t-nav-label">{sec.label}</div>}
            {withCounts(sec.items).map((item) => {
              const Icon = item.icon;
              const active = currentView === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`t-nav-btn ${active ? 'active' : ''}`}
                  onClick={() => onViewChange(item.key)}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                  {item.count != null && <span className="t-nav-count">{item.count}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="t-side-foot">
        <div className="t-user-chip">
          <span className="t-avatar sm" aria-hidden="true">{activeUser?.avatar || (activeUser?.name || 'U').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
          <div style={{ minWidth: 0 }}>
            <span className="t-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeUser?.name || session?.name || 'Signed in'}</span>
            <span className="t-role">{personaType === 'staff' ? 'Dean & Staff' : personaType === 'kiosk' ? 'Lobby terminal' : activeUser?.program || ROLE_LABEL[session?.role] || 'Student'}</span>
          </div>
        </div>
        {footer}
      </div>
    </aside>
  );
};

export default Sidebar;
