import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortal } from '../../context/PortalContext';
import { Bell, ChevronDown, LogOut, Search, Repeat } from 'lucide-react';
import ustplogo from '../../assets/ustplogo.png';

const ROLE_LABEL = { student: 'Student', staff: 'Dean & Staff', kiosk: 'Kiosk' };

export const Navbar = ({ crumb = 'Workspace', pageTitle = 'Overview', onOpenQueue }) => {
  const { session, activeUser, signOut, notifications, setCommandOpen } = usePortal();
  const [openNotif, setOpenNotif] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [time, setTime] = useState('');
  const notifRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onDown = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setOpenNotif(false);
      if (userRef.current && !userRef.current.contains(e.target)) setOpenUser(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const unread = notifications.filter((n) => n.unread).length;
  const displayName = activeUser?.name || session?.name || 'Account';
  const roleLabel = ROLE_LABEL[session?.role] || 'Account';

  const handleSignOut = () => { setOpenUser(false); signOut(); navigate('/landing'); };
  const handleSwitch = () => { setOpenUser(false); signOut(); navigate('/login'); };

  return (
    <header className="t-topbar">
      <img src={ustplogo} alt="" aria-hidden="true" style={{ width: 30, height: 30, objectFit: 'contain' }} />
      <div>
        <div className="t-crumb">{crumb} • {time} PHT</div>
        <div className="t-page-title">{pageTitle}</div>
      </div>
      <div className="t-top-actions">
        <button type="button" className="t-search-trigger" onClick={() => setCommandOpen(true)} aria-label="Search (Ctrl K)">
          <Search size={15} aria-hidden="true" />
          <span>Search tickets, students…</span>
          <kbd>Ctrl K</kbd>
        </button>
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button type="button" className="t-icon-btn" onClick={() => setOpenNotif((v) => !v)} aria-label={`Notifications, ${unread} unread`} aria-expanded={openNotif}>
            <Bell size={18} aria-hidden="true" />
            {unread > 0 && <span className="t-ping" aria-hidden="true" />}
          </button>
          {openNotif && (
            <div className="t-card" role="dialog" aria-label="Notifications" style={{ position: 'absolute', right: 0, top: 48, width: 330, zIndex: 120, overflow: 'hidden' }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--t-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.84rem' }}>Live updates</strong>
                <span className="t-badge t-status-scheduled">{unread} new</span>
              </div>
              <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                {notifications.length === 0 && <p style={{ padding: 16, fontSize: '0.8rem', color: 'var(--t-slate-500)' }}>Queue is clear. You&apos;re all caught up.</p>}
                {notifications.map((n) => (
                  <button key={n.id} type="button" onClick={() => { setOpenNotif(false); if (onOpenQueue) onOpenQueue(n.ticketNumber); }} style={{ display: 'block', width: '100%', textAlign: 'left', background: n.unread ? '#f8fafc' : '#fff', border: 'none', borderBottom: '1px solid var(--t-line-2)', padding: '11px 14px', cursor: 'pointer' }}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <strong style={{ fontSize: '0.76rem' }}>{n.title}</strong>
                      <span style={{ fontSize: '0.68rem', color: 'var(--t-slate-500)', whiteSpace: 'nowrap' }}>{n.time}</span>
                    </span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--t-slate-600)', marginTop: 3, overflow: 'hidden', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflowWrap: 'anywhere' }}>{n.detail}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ position: 'relative' }} ref={userRef}>
          <button type="button" className="t-profile-btn" onClick={() => setOpenUser((v) => !v)} aria-expanded={openUser} aria-label="Account menu">
            <span className="t-avatar sm" aria-hidden="true">{activeUser?.avatar || (displayName || 'A').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
            <span className="t-profile-meta">
              <strong>{displayName.split(' ').slice(0, 2).join(' ')}</strong>
              <span>{roleLabel}</span>
            </span>
            <ChevronDown size={14} aria-hidden="true" />
          </button>
          {openUser && (
            <div className="t-card" role="menu" style={{ position: 'absolute', right: 0, top: 48, width: 250, zIndex: 120, padding: 8 }}>
              <div style={{ padding: '10px 12px 8px' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 800 }}>{displayName}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--t-slate-500)' }}>{activeUser?.email || session?.email || roleLabel}</p>
              </div>
              <div style={{ height: 1, background: 'var(--t-line-2)', margin: '4px 0' }} />
              <button type="button" role="menuitem" className="t-command-item" onClick={handleSwitch}><Repeat size={14} aria-hidden="true" /> Switch account</button>
              <button type="button" role="menuitem" className="t-command-item" onClick={handleSignOut}><LogOut size={14} aria-hidden="true" /> Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
