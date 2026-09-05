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
  CheckCircle2, 
  Clock, 
  Sparkles
} from 'lucide-react';
import './styles/Navbar.css';

export const Navbar = ({ pageTitle = 'Dashboard', onToggleSidebar }) => {
  const { activeUser, personaType, switchPersona, handleResetDemoData } = usePortal();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  // Live university clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close menus on click outside
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
      unread: true,
      icon: Clock,
      color: 'amber'
    },
    {
      id: 2,
      title: 'Library Hold Released',
      detail: 'Clearance desk verified textbook return #LIB-REC-9921.',
      time: '2h ago',
      unread: true,
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      id: 3,
      title: 'Dean’s Office Fall Hours',
      detail: 'Academic counseling walk-ins are active 8:30 AM - 4:30 PM.',
      time: '1d ago',
      unread: false,
      icon: Sparkles,
      color: 'indigo'
    }
  ];

  const getPersonaBadge = () => {
    if (personaType === 'admin') {
      return (
        <span className="navbar-role-badge admin">
          <ShieldCheck size={14} />
          Dean's Operations Console
        </span>
      );
    }
    if (personaType === 'kiosk') {
      return (
        <span className="navbar-role-badge kiosk">
          <Monitor size={14} />
          Lobby Kiosk Terminal
        </span>
      );
    }
    return (
      <span className="navbar-role-badge student">
        <GraduationCap size={14} />
        Student Portal &bull; Senior CS
      </span>
    );
  };

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <button 
          className="navbar-mobile-menu-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="navbar-breadcrumbs">
          <span className="navbar-brand-name">TrailAssistance</span>
          <span className="navbar-divider">/</span>
          <span className="navbar-current-page">{pageTitle}</span>
        </div>
        <div className="navbar-badge-container">
          {getPersonaBadge()}
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-time-indicator">
          <Clock size={13} className="time-icon" />
          <span>{currentTime} &bull; Main Campus</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="navbar-item-wrapper" ref={notifRef}>
          <button 
            className={`navbar-icon-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => setShowNotifications(!showNotifications)}
            title="System Notifications"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="navbar-notif-ping" />
          </button>

          {showNotifications && (
            <div className="navbar-dropdown notif-dropdown">
              <div className="notif-header">
                <h3>Campus Notifications</h3>
                <span className="notif-count-badge">2 New</span>
              </div>
              <div className="notif-list">
                {notifications.map(n => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className={`notif-card ${n.unread ? 'unread' : ''}`}>
                      <div className={`notif-icon-box ${n.color}`}>
                        <Icon size={14} />
                      </div>
                      <div className="notif-content">
                        <div className="notif-title-row">
                          <span className="notif-title">{n.title}</span>
                          <span className="notif-time">{n.time}</span>
                        </div>
                        <p className="notif-detail">{n.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="notif-footer">
                <button 
                  className="notif-action-btn"
                  onClick={() => setShowNotifications(false)}
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Menu */}
        <div className="navbar-item-wrapper" ref={userMenuRef}>
          <button 
            className="navbar-profile-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User Profile"
          >
            <div className="navbar-avatar">
              {activeUser?.avatar || 'AM'}
            </div>
            <div className="navbar-user-text">
              <span className="navbar-user-name">{activeUser?.name || 'Alex Morgan'}</span>
              <span className="navbar-user-sub">
                {personaType === 'admin' ? 'College Dean' : 'Student (4th Year)'}
              </span>
            </div>
            <ChevronDown size={14} className="chevron-icon" />
          </button>

          {showUserMenu && (
            <div className="navbar-dropdown user-dropdown">
              <div className="user-dropdown-header">
                <p className="user-dropdown-name">{activeUser?.name}</p>
                <p className="user-dropdown-email">{activeUser?.email}</p>
                <div className="user-role-chip">{personaType.toUpperCase()}</div>
              </div>

              <div className="dropdown-divider" />

              <div className="user-dropdown-section">
                <span className="dropdown-section-title">Switch Persona (Recruiter Demo)</span>
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
                  <span>Kiosk Self-Service</span>
                </button>
              </div>

              <div className="dropdown-divider" />

              <div className="user-dropdown-section">
                <button 
                  className="dropdown-item reset"
                  onClick={() => { handleResetDemoData(); setShowUserMenu(false); }}
                >
                  <Sparkles size={15} />
                  <span>Reset Demo Dataset</span>
                </button>
                <button 
                  className="dropdown-item logout"
                  onClick={() => {
                    localStorage.removeItem('currentUser');
                    window.location.href = '/landing';
                  }}
                >
                  <LogOut size={15} />
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
