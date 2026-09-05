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
  Sparkles,
  GraduationCap
} from 'lucide-react';
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

  // Calculate badge counts
  const studentActiveTickets = tickets.filter(t => 
    t.studentEmail === activeUser?.email && t.status !== 'resolved'
  ).length;

  const adminPendingTickets = tickets.filter(t => 
    t.status === 'submitted' || t.status === 'under_review'
  ).length;

  const studentNavItems = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'newTicket', label: 'File New Concern', icon: PlusCircle, highlight: true },
    { 
      key: 'myTickets', 
      label: 'My Concerns & Tickets', 
      icon: Ticket, 
      badge: studentActiveTickets > 0 ? studentActiveTickets : null,
      badgeVariant: 'urgent'
    },
    { key: 'profile', label: 'Student Profile', icon: User },
    { key: 'feedback', label: 'Service Feedback', icon: Star }
  ];

  const adminNavItems = [
    { key: 'dashboard', label: 'Executive Metrics', icon: BarChart3 },
    { 
      key: 'tickets', 
      label: 'Ticket Operations', 
      icon: ShieldAlert,
      badge: adminPendingTickets > 0 ? adminPendingTickets : null,
      badgeVariant: 'warning'
    },
    { key: 'students', label: 'Student Directory', icon: Users },
    { key: 'ratings', label: 'Service Ratings', icon: Star }
  ];

  const navItems = mode === 'admin' ? adminNavItems : studentNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={onCloseMobile} />
      )}

      <aside className={`sidebar-wrapper ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand-icon">
            <GraduationCap size={22} className="brand-cap-icon" />
          </div>
          {!collapsed && (
            <div className="sidebar-brand-info">
              <span className="sidebar-brand-title">TrailAssistance</span>
              <span className="sidebar-brand-sub">University Portal</span>
            </div>
          )}
          <button 
            className="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar collapse"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Portal Role Indicator */}
        {!collapsed && (
          <div className={`sidebar-role-card ${mode}`}>
            <div className="role-card-header">
              <span className="role-tag">{mode === 'admin' ? "Dean's Console" : "Student Hub"}</span>
              <span className="role-status-dot" />
            </div>
            <p className="role-card-user">{activeUser?.name}</p>
            <p className="role-card-meta">
              {mode === 'admin' ? activeUser?.title || 'College Dean' : activeUser?.program || 'BS Computer Science'}
            </p>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <span className={`nav-section-label ${collapsed ? 'sr-only' : ''}`}>
            {mode === 'admin' ? 'Administrative Operations' : 'Academic Services'}
          </span>
          <ul className="nav-list">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.key;
              return (
                <li key={item.key}>
                  <button
                    className={`nav-item-btn ${isActive ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
                    onClick={() => {
                      onViewChange(item.key);
                      if (mobileOpen) onCloseMobile();
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon size={18} className="nav-item-icon" />
                    {!collapsed && <span className="nav-item-label">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className={`nav-item-badge ${item.badgeVariant || ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Shortcuts */}
          <span className={`nav-section-label ${collapsed ? 'sr-only' : ''}`} style={{ marginTop: '24px' }}>
            System Portals
          </span>
          <ul className="nav-list">
            {mode === 'student' ? (
              <li>
                <button
                  className="nav-item-btn switch-mode"
                  onClick={() => switchPersona('admin')}
                  title={collapsed ? "Switch to Dean's Console" : undefined}
                >
                  <ShieldAlert size={18} className="nav-item-icon" />
                  {!collapsed && <span className="nav-item-label">Dean's Console</span>}
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="nav-item-btn switch-mode"
                  onClick={() => switchPersona('student')}
                  title={collapsed ? "Switch to Student Portal" : undefined}
                >
                  <User size={18} className="nav-item-icon" />
                  {!collapsed && <span className="nav-item-label">Student Portal</span>}
                </button>
              </li>
            )}
            <li>
              <button
                className="nav-item-btn switch-mode"
                onClick={() => switchPersona('kiosk')}
                title={collapsed ? "Lobby Kiosk Mode" : undefined}
              >
                <Monitor size={18} className="nav-item-icon" />
                {!collapsed && <span className="nav-item-label">Lobby Kiosk Terminal</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {!collapsed ? (
            <div className="sidebar-footer-content">
              <button 
                className="sidebar-reset-btn"
                onClick={handleResetDemoData}
                title="Reset mock data to pristine state"
              >
                <Sparkles size={14} />
                <span>Reset Demo Data</span>
              </button>
              <div className="sidebar-version-tag">
                <span>v2.4 &bull; Flagship Portfolio Edition</span>
              </div>
            </div>
          ) : (
            <button 
              className="sidebar-icon-only-action"
              onClick={handleResetDemoData}
              title="Reset Demo Data"
            >
              <Sparkles size={16} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
