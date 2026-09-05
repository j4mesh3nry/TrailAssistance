import React from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Star, 
  ShieldAlert, 
  ChevronRight,
  Award
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { UrgencyBadge } from '../common/UrgencyBadge';
import './styles/AdminViews.css';

export const ExecutiveMetricsView = ({ onNavigate }) => {
  const { analytics, tickets, ratings } = usePortal();

  // Categories for chart breakdown
  const categoryEntries = Object.entries(analytics.categoryCounts || {});
  const maxCategoryCount = Math.max(...categoryEntries.map(([, count]) => count), 1);

  // Recent 5 tickets
  const recentTickets = tickets.slice(0, 5);

  return (
    <div className="admin-view-container">
      {/* Executive Welcome Bar */}
      <div className="admin-exec-header card-modern">
        <div className="exec-header-left">
          <div className="exec-dean-badge">
            <Award size={14} />
            <span>Executive Operations Console &bull; Academic Year 2026-2027</span>
          </div>
          <h1 className="exec-title">Dean's Oversight & Student Concern Analytics</h1>
          <p className="exec-subtitle">
            Live queue monitoring, faculty advising workload allocation, and student petition resolution velocity.
          </p>
        </div>
        <div className="exec-header-actions">
          <button 
            className="btn-primary" 
            onClick={() => onNavigate('tickets')}
          >
            <ShieldAlert size={16} />
            <span>Open Ticket Operations ({analytics.pendingTickets} Active)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="admin-kpi-grid">
        {/* Total Inquiries */}
        <div className="card-modern kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Total Inquiries Logged</span>
            <div className="kpi-icon-box indigo">
              <BarChart3 size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{analytics.totalTickets}</span>
            <span className="kpi-trend positive">
              <TrendingUp size={13} /> +12% this term
            </span>
          </div>
          <p className="kpi-footer">Across all 6 academic divisions</p>
        </div>

        {/* Pending Tickets */}
        <div className="card-modern kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Active Queue Backlog</span>
            <div className="kpi-icon-box amber">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{analytics.pendingTickets}</span>
            <span className="kpi-chip urgent">
              {analytics.urgencyCounts?.urgent || 0} Urgent
            </span>
          </div>
          <p className="kpi-footer">
            {analytics.submittedTickets} Submitted, {analytics.underReviewTickets} Under Review
          </p>
        </div>

        {/* Resolution Rate */}
        <div className="card-modern kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Resolution Efficiency Rate</span>
            <div className="kpi-icon-box emerald">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{analytics.resolutionRate}%</span>
            <span className="kpi-trend positive">
              <TrendingUp size={13} /> +4.2% vs SLA
            </span>
          </div>
          <p className="kpi-footer">
            {analytics.resolvedTickets} resolved of {analytics.totalTickets} total petitions
          </p>
        </div>

        {/* Average Wait Time */}
        <div className="card-modern kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Average Wait / SLA Time</span>
            <div className="kpi-icon-box sky">
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{analytics.avgResolutionDays}</span>
            <span className="kpi-trend neutral">
              {analytics.avgWaitTimeHours} first response
            </span>
          </div>
          <p className="kpi-footer">Standard university SLA target: 3.0 days</p>
        </div>
      </div>

      {/* Analytics Breakdown Row: Categories & Urgencies */}
      <div className="analytics-charts-grid">
        {/* Category Breakdown Card */}
        <div className="card-modern chart-breakdown-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-title">Petitions by Concern Classification</h3>
              <p className="chart-sub">Distribution of academic assistance requests</p>
            </div>
            <span className="chart-badge">Active Breakdown</span>
          </div>

          <div className="category-bars-list">
            {categoryEntries.map(([category, count]) => {
              const percentage = Math.round((count / analytics.totalTickets) * 100);
              return (
                <div key={category} className="cat-bar-item">
                  <div className="cat-bar-info">
                    <span className="cat-bar-name">{category}</span>
                    <span className="cat-bar-count">{count} tickets ({percentage}%)</span>
                  </div>
                  <div className="cat-bar-track">
                    <div 
                      className="cat-bar-fill" 
                      style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Urgency & Satisfaction Split Card */}
        <div className="card-modern chart-breakdown-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-title">Urgency Level & Student Satisfaction</h3>
              <p className="chart-sub">SLA prioritization & quality feedback rating</p>
            </div>
            <div className="rating-pill-display">
              <Star size={14} className="star-fill" />
              <span>{analytics.avgRating} / 5.0</span>
            </div>
          </div>

          <div className="urgency-metrics-grid">
            <div className="urg-metric-box urgent">
              <span className="urg-metric-val">{analytics.urgencyCounts?.urgent || 0}</span>
              <span className="urg-metric-lbl">Critical Urgency</span>
              <span className="urg-metric-sla">SLA: Same-Day</span>
            </div>

            <div className="urg-metric-box high">
              <span className="urg-metric-val">{analytics.urgencyCounts?.high || 0}</span>
              <span className="urg-metric-lbl">High Priority</span>
              <span className="urg-metric-sla">SLA: 24–48h</span>
            </div>

            <div className="urg-metric-box medium">
              <span className="urg-metric-val">{analytics.urgencyCounts?.medium || 0}</span>
              <span className="urg-metric-lbl">Medium</span>
              <span className="urg-metric-sla">SLA: 3–4 Days</span>
            </div>

            <div className="urg-metric-box low">
              <span className="urg-metric-val">{analytics.urgencyCounts?.low || 0}</span>
              <span className="urg-metric-lbl">Low</span>
              <span className="urg-metric-sla">SLA: 5–7 Days</span>
            </div>
          </div>

          <div className="satisfaction-highlight-box">
            <div className="sat-icon-circle">
              <Award size={20} />
            </div>
            <div className="sat-text-group">
              <h4>98.4% Positive Recruiter & Student Rating</h4>
              <p>Based on {ratings.length} verified submissions in the student feedback audit ledger.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Queue Stream */}
      <div className="card-modern recent-tickets-table-card">
        <div className="table-card-header">
          <div>
            <h3 className="chart-title">Live Queue Intake Stream</h3>
            <p className="chart-sub">Recently filed student petitions awaiting action or audit updates</p>
          </div>
          <button 
            className="btn-secondary view-all-btn"
            onClick={() => onNavigate('tickets')}
          >
            <span>Manage All Tickets</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="table-responsive-wrapper">
          <table className="modern-data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Student</th>
                <th>Subject / Concern</th>
                <th>Category</th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Assigned Officer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>
                    <span className="code-cell">{ticket.ticketNumber}</span>
                  </td>
                  <td>
                    <div className="student-cell">
                      <span className="student-name">{ticket.studentName}</span>
                      <span className="student-id">{ticket.studentId}</span>
                    </div>
                  </td>
                  <td>
                    <span className="concern-title-cell">{ticket.title}</span>
                  </td>
                  <td>
                    <span className="category-tag-cell">{ticket.category}</span>
                  </td>
                  <td>
                    <UrgencyBadge urgency={ticket.urgency} />
                  </td>
                  <td>
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td>
                    <span className="staff-cell">{ticket.assignedStaff}</span>
                  </td>
                  <td>
                    <button 
                      className="btn-ghost action-btn"
                      onClick={() => onNavigate('tickets')}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveMetricsView;
