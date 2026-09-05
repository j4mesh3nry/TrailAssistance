import React from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  Sparkles, 
  PlusCircle, 
  Ticket, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  GraduationCap,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { LifecycleBar } from '../common/LifecycleBar';
import { StatusBadge } from '../common/StatusBadge';
import { UrgencyBadge } from '../common/UrgencyBadge';
import './styles/StudentViews.css';

export const OverviewView = ({ onNavigate }) => {
  const { activeUser, tickets } = usePortal();

  // Filter user's tickets
  const userTickets = tickets.filter(t => t.studentEmail === activeUser?.email);
  const activeTickets = userTickets.filter(t => t.status !== 'resolved');
  const resolvedTickets = userTickets.filter(t => t.status === 'resolved');
  const latestTicket = userTickets[0] || null;

  return (
    <div className="student-view-container">
      {/* Welcome Hero Banner */}
      <div className="student-hero-card">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Academic Year 2026–2027 &bull; Fall Term</span>
          </div>
          <h1 className="hero-title">Welcome back, {activeUser?.name || 'Alex Morgan'}</h1>
          <p className="hero-desc">
            You are enrolled in <span className="highlight-text">{activeUser?.program || 'BS Computer Science'}</span> &bull; {activeUser?.yearOfStudy || '4th Year Senior'}. 
            Academic Advisor: <strong>{activeUser?.advisor || 'Dr. Sarah Vance'}</strong>.
          </p>
          <div className="hero-actions">
            <button 
              className="btn-primary hero-btn"
              onClick={() => onNavigate('newTicket')}
            >
              <PlusCircle size={16} />
              <span>File Academic Concern</span>
            </button>
            <button 
              className="btn-secondary hero-btn"
              onClick={() => onNavigate('myTickets')}
            >
              <Ticket size={16} />
              <span>Track Active Inquiries ({activeTickets.length})</span>
            </button>
          </div>
        </div>
        <div className="hero-stat-badge">
          <div className="standing-chip">
            <GraduationCap size={16} />
            <span>{activeUser?.academicStanding || "Dean's Lister"}</span>
          </div>
          <div className="gpa-pill">
            <span className="gpa-label">Cumulative GPA</span>
            <span className="gpa-val">{activeUser?.gpa || '3.88'}</span>
          </div>
        </div>
      </div>

      {/* Quick KPI Stat Cards */}
      <div className="student-stats-grid">
        <div className="card-modern stat-card">
          <div className="stat-icon-wrapper amber">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{activeTickets.length}</span>
            <span className="stat-label">In-Queue Concerns</span>
          </div>
          <div className="stat-footer-text">
            {activeTickets.length > 0 ? 'Awaiting staff evaluation' : 'Queue cleared'}
          </div>
        </div>

        <div className="card-modern stat-card">
          <div className="stat-icon-wrapper emerald">
            <CheckCircle2 size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{resolvedTickets.length}</span>
            <span className="stat-label">Resolved Petitions</span>
          </div>
          <div className="stat-footer-text">Archived in clearance log</div>
        </div>

        <div className="card-modern stat-card">
          <div className="stat-icon-wrapper sky">
            <Calendar size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">
              {latestTicket?.preferredMeetingSlot ? 'Sept 8' : 'None'}
            </span>
            <span className="stat-label">Upcoming Consultation</span>
          </div>
          <div className="stat-footer-text">Dean's Office Room 302B</div>
        </div>

        <div className="card-modern stat-card">
          <div className="stat-icon-wrapper indigo">
            <ShieldAlert size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">94%</span>
            <span className="stat-label">Graduation Readiness</span>
          </div>
          <div className="stat-footer-text">1 Deficiency Pending Review</div>
        </div>
      </div>

      {/* Featured Active Tracker Preview */}
      {latestTicket && (
        <div className="card-modern active-ticket-tracker-card">
          <div className="tracker-header">
            <div className="tracker-title-group">
              <span className="tracker-badge-id">Ticket #{latestTicket.ticketNumber}</span>
              <h2 className="tracker-title">{latestTicket.title}</h2>
              <div className="tracker-meta-row">
                <StatusBadge status={latestTicket.status} />
                <UrgencyBadge urgency={latestTicket.urgency} />
                <span className="tracker-category-tag">{latestTicket.category}</span>
                <span className="tracker-time-tag">Updated {new Date(latestTicket.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <button 
              className="btn-secondary tracker-view-btn"
              onClick={() => onNavigate('myTickets')}
            >
              <span>View Full Audit Timeline</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="tracker-lifecycle-box">
            <LifecycleBar status={latestTicket.status} />
          </div>

          <div className="tracker-notes-preview">
            <div className="notes-box-header">
              <AlertCircle size={15} className="notes-alert-icon" />
              <span>Latest Administrative Note &bull; Assigned: {latestTicket.assignedStaff}</span>
            </div>
            <p className="notes-box-text">
              {latestTicket.timeline[latestTicket.timeline.length - 1]?.note || 'Processing under standard advising protocol.'}
            </p>
          </div>
        </div>
      )}

      {/* Quick Access Grid */}
      <div className="quick-access-grid">
        <div className="card-modern quick-card" onClick={() => onNavigate('newTicket')}>
          <div className="quick-card-icon-box">
            <PlusCircle size={24} />
          </div>
          <div className="quick-card-content">
            <h3>File a New Academic Concern</h3>
            <p>Request course waivers, submit financial aid appeals, clearance sign-offs, or schedule dean advising.</p>
          </div>
          <ArrowRight size={18} className="quick-card-arrow" />
        </div>

        <div className="card-modern quick-card" onClick={() => onNavigate('profile')}>
          <div className="quick-card-icon-box profile">
            <GraduationCap size={24} />
          </div>
          <div className="quick-card-content">
            <h3>Academic Standing & Record</h3>
            <p>Review completed credit units, degree checklist, and verify pending clearance checklist holds.</p>
          </div>
          <ArrowRight size={18} className="quick-card-arrow" />
        </div>
      </div>
    </div>
  );
};

export default OverviewView;
