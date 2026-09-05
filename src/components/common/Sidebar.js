import React from 'react';
import { usePortal } from '../../context/PortalContext';
import {
  LayoutDashboard,
  PlusCircle,
  Ticket,
  User,
  Star,
  ShieldAlert,
  Users,
  BarChart3,
  Monitor,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import ustplogo from '../../assets/ustplogo.png';
import './styles/Sidebar.css';

export const Sidebar = ({ 
  currentView, 
  onViewChange, 
  collapsed, 
  onToggleCollapse, 
  mobileOpen, 
  onCloseMobile,
  mode = 'student' // 'student' or 'admin'
}) => {
  const { tickets, activeUser, switchPersona, handleResetDemoData } = usePortal();

  const studentActiveTickets = tickets.filter(t => 
    t.studentEmail === activeUser?.email && t.status !== 'resolved'
  ).length;

  const adminPendingTickets = tickets.filter(t => 
    t.status === 'submitted' || t.status === 'under_review'
  ).length;

  const studentNavItems = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'newTicket', label: 'File Concern', icon: PlusCircle },
    { 
      key: 'myTickets', 
      label: 'My Concerns', 
      icon: Ticket, 
      badge: studentActiveTickets > 0 ? studentActiveTickets : null 
    },
    { key: 'profile', label: 'Student Record', icon: User },
    { key: 'feedback', label: 'Service Rating', icon: Star }
  ];

  const adminNavItems = [
    { key: 'dashboard', label: 'Executive Metrics', icon: BarChart3 },
    { 
      key: 'tickets', 
      label: 'Ticket Queue', 
      icon: ShieldAlert,
      badge: adminPendingTickets > 0 ? adminPendingTickets : null 
    },
    { key: 'students', label: 'Student Directory', icon: Users },
    { key: 'ratings', label: 'Service Reviews', icon: Star }
  ];

  const navItems = mode === 'admin' ? adminNavItems : studentNavItems;

  return (
    <>
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={onCloseMobile} />
      )}

      <aside className={`sidebar-wrapper ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand-group">
            <img src={ustplogo} alt="USTP Logo" className="sidebar-logo-img" />
            {!collapsed && (
              <div className="sidebar-brand-text">
                <span className="sidebar-brand-title">TrailAssistance</span>
                <span className="sidebar-brand-sub">USTP Dean's Office</span>
              </div>
            )}
          </div>
          <button 
            className="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label="Toggle sidebar collapse"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Minimalist User Pill */}
        {!collapsed && (
          <div className="sidebar-user-pill">
            <div className="pill-dot" />
            <div className="pill-text">
              <span className="pill-name">{activeUser?.name}</span>
              <span className="pill-role">
                {mode === 'admin' ? "Dean of College" : activeUser?.program || "Undergraduate"}
              </span>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.key;
              return (
                <li key={item.key}>
                  <button
                    className={`nav-item-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onViewChange(item.key);
                      if (mobileOpen) onCloseMobile();
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon size={17} className="nav-item-icon" />
                    {!collapsed && <span className="nav-item-label">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="nav-item-badge">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="sidebar-nav-divider" />

          {/* Quick Persona Switcher Links */}
          <ul className="nav-list">
            {mode === 'student' ? (
              <li>
                <button
                  className="nav-item-btn secondary"
                  onClick={() => switchPersona('admin')}
                  title={collapsed ? "Dean's Console" : undefined}
                >
                  <ShieldAlert size={17} className="nav-item-icon" />
                  {!collapsed && <span className="nav-item-label">Dean's Console</span>}
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="nav-item-btn secondary"
                  onClick={() => switchPersona('student')}
                  title={collapsed ? "Student Portal" : undefined}
                >
                  <User size={17} className="nav-item-icon" />
                  {!collapsed && <span className="nav-item-label">Student Portal</span>}
                </button>
              </li>
            )}
            <li>
              <button
                className="nav-item-btn secondary"
                onClick={() => switchPersona('kiosk')}
                title={collapsed ? "Lobby Kiosk" : undefined}
              >
                <Monitor size={17} className="nav-item-icon" />
                {!collapsed && <span className="nav-item-label">Lobby Kiosk</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {!collapsed ? (
            <button 
              className="sidebar-reset-btn"
              onClick={handleResetDemoData}
              title="Reset mock data to initial state"
            >
              <RotateCcw size={13} />
              <span>Reset Demo Data</span>
            </button>
          ) : (
            <button 
              className="sidebar-icon-reset"
              onClick={handleResetDemoData}
              title="Reset Demo Data"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
