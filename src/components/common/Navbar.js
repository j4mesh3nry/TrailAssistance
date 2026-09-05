import React, { useState, useEffect, useRef } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  Bell, 
  ChevronDown, 
  LogOut, 
  Menu, 
  ShieldCheck, 
  GraduationCap, 
  Monitor, 
  Clock, 
  RotateCcw
} from 'lucide-react';
import ustplogo from '../../assets/ustplogo.png';
import './styles/Navbar.css';

export const Navbar = ({ pageTitle = 'Dashboard', onToggleSidebar }) => {
  const { activeUser, personaType, switchPersona, handleResetDemoData } = usePortal();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Prerequisite Waiver In Review',
      detail: 'Dr. Sarah Vance reviewed your transcript for CS-499.',
      time: '15m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Library Hold Released',
      detail: 'Clearance desk verified textbook return #LIB-REC-9921.',
      time: '2h ago',
      unread: false
    }
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <button 
          className="navbar-mobile-menu-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>

        <div className="navbar-brand-badge">
          <img src={ustplogo} alt="USTP Logo" className="navbar-ustp-img" />
          <span className="navbar-current-page">{pageTitle}</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-clock-pill">
          <Clock size={13} />
          <span>{currentTime} &bull; USTP</span>
        </div>

        {/* Notifications */}
        <div className="navbar-item-wrapper" ref={notifRef}>
          <button 
            className={`navbar-icon-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span className="navbar-notif-ping" />
          </button>

          {showNotifications && (
            <div className="navbar-dropdown notif-dropdown">
              <div className="notif-header">
                <h3>Notifications</h3>
                <span className="notif-count-badge">1 New</span>
              </div>
              <div className="notif-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notif-card ${n.unread ? 'unread' : ''}`}>
                    <div className="notif-content">
                      <div className="notif-title-row">
                        <span className="notif-title">{n.title}</span>
                        <span className="notif-time">{n.time}</span>
                      </div>
                      <p className="notif-detail">{n.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown */}
        <div className="navbar-item-wrapper" ref={userMenuRef}>
          <button 
            className="navbar-profile-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User profile"
          >
            <div className="navbar-avatar">
              {activeUser?.avatar || 'AM'}
            </div>
            <div className="navbar-user-text">
              <span className="navbar-user-name">{activeUser?.name}</span>
              <span className="navbar-user-sub">
                {personaType === 'admin' ? "Dean" : "Student"}
              </span>
            </div>
            <ChevronDown size={13} className="chevron-icon" />
          </button>

          {showUserMenu && (
            <div className="navbar-dropdown user-dropdown">
              <div className="user-dropdown-header">
                <p className="user-dropdown-name">{activeUser?.name}</p>
                <p className="user-dropdown-email">{activeUser?.email}</p>
              </div>

              <div className="dropdown-divider" />

              <div className="user-dropdown-section">
                <span className="dropdown-section-title">Switch Persona</span>
                <button 
                  className={`dropdown-item ${personaType === 'student' ? 'selected' : ''}`}
                  onClick={() => { switchPersona('student'); setShowUserMenu(false); }}
                >
                  <GraduationCap size={15} />
                  <span>Student (Alex Morgan)</span>
                </button>
                <button 
                  className={`dropdown-item ${personaType === 'admin' ? 'selected' : ''}`}
                  onClick={() => { switchPersona('admin'); setShowUserMenu(false); }}
                >
                  <ShieldCheck size={15} />
                  <span>Dean (Dr. Sarah Vance)</span>
                </button>
                <button 
                  className={`dropdown-item ${personaType === 'kiosk' ? 'selected' : ''}`}
                  onClick={() => { switchPersona('kiosk'); setShowUserMenu(false); }}
                >
                  <Monitor size={15} />
                  <span>Lobby Kiosk</span>
                </button>
              </div>

              <div className="dropdown-divider" />

              <div className="user-dropdown-section">
                <button 
                  className="dropdown-item"
                  onClick={() => { handleResetDemoData(); setShowUserMenu(false); }}
                >
                  <RotateCcw size={14} />
                  <span>Reset Demo Data</span>
                </button>
                <button 
                  className="dropdown-item logout"
                  onClick={() => {
                    localStorage.removeItem('currentUser');
                    window.location.href = '/landing';
                  }}
                >
                  <LogOut size={14} />
                  <span>Exit Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
