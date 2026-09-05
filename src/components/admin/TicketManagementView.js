import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  Search, 
  Download, 
  Eye, 
  Trash2, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileText
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { UrgencyBadge } from '../common/UrgencyBadge';
import { LifecycleBar } from '../common/LifecycleBar';
import './styles/AdminViews.css';

const STAFF_MEMBERS = [
  "Dr. Sarah Vance (College Dean)",
  "Prof. Marcus Thorne (Academic Advisor)",
  "Elena Rostova (Financial Aid Officer)",
  "Dr. Eleanor Wu (Science Advisor)",
  "Prof. Arthur Pendelton (Business Advisor)",
  "Dean's Office Records Clerk"
];

export const TicketManagementView = () => {
  const { 
    tickets, 
    handleUpdateStatus, 
    handleAssignStaff, 
    handleAddStaffNote, 
    handleDeleteTicket,
    showToast 
  } = usePortal();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Selected Ticket for Drawer
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // Drawer Editing Form State
  const [drawerStatus, setDrawerStatus] = useState('');
  const [drawerStaff, setDrawerStaff] = useState('');
  const [resolutionNote, setResolutionNote] = useState('');
  const [auditNoteText, setAuditNoteText] = useState('');

  // Filtering & Sorting
  const filteredTickets = tickets
    .filter(ticket => {
      const matchesSearch = 
        ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
      const matchesUrgency = urgencyFilter === 'all' || ticket.urgency === urgencyFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesUrgency;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'urgency') {
        const order = { urgent: 4, high: 3, medium: 2, low: 1 };
        return (order[b.urgency] || 0) - (order[a.urgency] || 0);
      }
      if (sortBy === 'student') return a.studentName.localeCompare(b.studentName);
      return 0;
    });

  const openDrawer = (ticket) => {
    setSelectedTicket(ticket);
    setDrawerStatus(ticket.status);
    setDrawerStaff(ticket.assignedStaff || STAFF_MEMBERS[0]);
    setResolutionNote(ticket.resolutionNotes || '');
    setAuditNoteText('');
  };

  const closeDrawer = () => {
    setSelectedTicket(null);
  };

  const handleSaveChanges = () => {
    if (!selectedTicket) return;

    // Status change
    if (drawerStatus !== selectedTicket.status || resolutionNote !== selectedTicket.resolutionNotes) {
      handleUpdateStatus(
        selectedTicket.id, 
        drawerStatus, 
        resolutionNote, 
        'Dr. Sarah Vance (Dean)'
      );
    }

    // Staff assignment change
    if (drawerStaff !== selectedTicket.assignedStaff) {
      handleAssignStaff(selectedTicket.id, drawerStaff, 'Dr. Sarah Vance (Dean)');
    }

    // Custom audit note
    if (auditNoteText.trim()) {
      handleAddStaffNote(selectedTicket.id, auditNoteText.trim(), 'Dr. Sarah Vance (Dean)');
    }

    // Refresh selectedTicket reference
    const updated = tickets.find(t => t.id === selectedTicket.id);
    setSelectedTicket(updated || null);
    closeDrawer();
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Ticket ID', 'Student Name', 'Student ID', 'Title', 'Category', 'Urgency', 'Status', 'Assigned Staff', 'Created At'];
    const rows = filteredTickets.map(t => [
      t.ticketNumber,
      `"${t.studentName}"`,
      t.studentId,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.category}"`,
      t.urgency,
      t.status,
      `"${t.assignedStaff}"`,
      new Date(t.createdAt).toLocaleDateString()
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TrailAssistance_Tickets_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported tickets ledger to CSV', 'success');
  };

  return (
    <div className="admin-view-container">
      {/* Header & Export */}
      <div className="tickets-management-header">
        <div>
          <h1 className="exec-title">Academic Ticket Operations & Resolution</h1>
          <p className="exec-subtitle">
            Centralized intake ledger. Triage, assign counselors, review student attachments, and document formal resolutions.
          </p>
        </div>
        <div className="header-action-group">
          <button className="btn-secondary" onClick={handleExportCSV}>
            <Download size={16} />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="card-modern admin-filter-bar">
        <div className="admin-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input-field"
            placeholder="Search by ticket #, student name, ID, or keywords..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-filter-selectors">
          <div className="select-wrapper">
            <span className="select-lbl">Status:</span>
            <select
              className="select-modern filter-sel"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="scheduled">Scheduled</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="select-wrapper">
            <span className="select-lbl">Category:</span>
            <select
              className="select-modern filter-sel"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Academic Advising">Academic Advising</option>
              <option value="Financial Aid & Scholarships">Financial Aid</option>
              <option value="Clearance & Graduation">Clearance & Graduation</option>
              <option value="Enrollment & Registration">Enrollment</option>
              <option value="Student Grievance & Appeal">Grievance</option>
              <option value="Special Accommodation">Accommodation</option>
            </select>
          </div>

          <div className="select-wrapper">
            <span className="select-lbl">Urgency:</span>
            <select
              className="select-modern filter-sel"
              value={urgencyFilter}
              onChange={e => setUrgencyFilter(e.target.value)}
            >
              <option value="all">All Urgencies</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="select-wrapper">
            <span className="select-lbl">Sort:</span>
            <select
              className="select-modern filter-sel"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="urgency">Urgency (Highest)</option>
              <option value="student">Student Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="card-modern admin-table-card">
        <div className="table-responsive-wrapper">
          <table className="modern-data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Student Information</th>
                <th>Subject / Purpose</th>
                <th>Category</th>
                <th>Urgency</th>
                <th>Lifecycle Status</th>
                <th>Assigned Officer</th>
                <th>Filed Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={9} className="table-empty-cell">
                    No tickets found matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredTickets.map(ticket => (
                  <tr key={ticket.id} className="interactive-row" onClick={() => openDrawer(ticket)}>
                    <td>
                      <span className="code-cell">{ticket.ticketNumber}</span>
                    </td>
                    <td>
                      <div className="student-cell">
                        <span className="student-name">{ticket.studentName}</span>
                        <span className="student-id">{ticket.studentId} &bull; {ticket.studentProgram}</span>
                      </div>
                    </td>
                    <td>
                      <div className="purpose-cell">
                        <span className="concern-title-cell">{ticket.title}</span>
                        <span className="purpose-sub">{ticket.purposeOfVisit}</span>
                      </div>
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
                      <span className="staff-cell">{ticket.assignedStaff || 'Unassigned'}</span>
                    </td>
                    <td>
                      <span className="date-cell">
                        {new Date(ticket.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions-group" onClick={e => e.stopPropagation()}>
                        <button 
                          className="btn-primary row-action-btn"
                          onClick={() => openDrawer(ticket)}
                          title="Open Resolution Drawer"
                        >
                          <Eye size={14} />
                          <span>Review</span>
                        </button>
                        <button 
                          className="btn-ghost row-action-btn delete"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ticket ${ticket.ticketNumber}?`)) {
                              handleDeleteTicket(ticket.id);
                            }
                          }}
                          title="Delete Ticket"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Detail & Resolution Drawer Modal */}
      {selectedTicket && (
        <div className="drawer-backdrop" onClick={closeDrawer}>
          <div className="drawer-panel" onClick={e => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="drawer-header">
              <div className="drawer-title-group">
                <div className="drawer-meta-top">
                  <span className="drawer-id-chip">{selectedTicket.ticketNumber}</span>
                  <StatusBadge status={selectedTicket.status} />
                  <UrgencyBadge urgency={selectedTicket.urgency} />
                </div>
                <h2 className="drawer-title">{selectedTicket.title}</h2>
                <p className="drawer-student-meta">
                  Student: <strong>{selectedTicket.studentName}</strong> ({selectedTicket.studentId}) &bull; {selectedTicket.studentProgram}
                </p>
              </div>
              <button className="drawer-close-btn" onClick={closeDrawer} aria-label="Close drawer">
                <X size={20} />
              </button>
            </div>

            {/* Lifecycle Bar */}
            <div className="drawer-lifecycle-box">
              <LifecycleBar status={drawerStatus || selectedTicket.status} />
            </div>

            {/* Drawer Body Scroll */}
            <div className="drawer-body">
              {/* Concern Narrative & Student Info */}
              <div className="drawer-section">
                <h3 className="drawer-section-title">
                  <FileText size={16} />
                  <span>Student Narrative & Request</span>
                </h3>
                <div className="drawer-narrative-card">
                  <p>{selectedTicket.details}</p>
                </div>
                
                <div className="drawer-meta-grid">
                  <div className="meta-box">
                    <span className="m-k">Purpose of Visit</span>
                    <span className="m-v">{selectedTicket.purposeOfVisit}</span>
                  </div>
                  <div className="meta-box">
                    <span className="m-k">Preferred Slot</span>
                    <span className="m-v">
                      {selectedTicket.preferredMeetingSlot 
                        ? new Date(selectedTicket.preferredMeetingSlot).toLocaleString() 
                        : 'Unspecified'}
                    </span>
                  </div>
                  <div className="meta-box">
                    <span className="m-k">Meeting Mode</span>
                    <span className="m-v">{selectedTicket.meetingMode}</span>
                  </div>
                  <div className="meta-box">
                    <span className="m-k">Preferred Contact</span>
                    <span className="m-v">{selectedTicket.preferredContact}</span>
                  </div>
                </div>
              </div>

              {/* Administrative Resolution Controls */}
              <div className="drawer-section admin-resolution-section">
                <h3 className="drawer-section-title">
                  <ShieldCheck size={16} />
                  <span>Dean's Operational Resolution & Triage Controls</span>
                </h3>

                <div className="resolution-form-grid">
                  <div className="form-field-group">
                    <label className="field-label">Transition Lifecycle Status</label>
                    <select
                      className="select-modern"
                      value={drawerStatus}
                      onChange={e => setDrawerStatus(e.target.value)}
                    >
                      <option value="submitted">Submitted (Intake Queue)</option>
                      <option value="under_review">Under Review (Officer Assigned)</option>
                      <option value="scheduled">Scheduled (Appointment Confirmed)</option>
                      <option value="resolved">Resolved (Approved / Closed)</option>
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">Responsible Administrative Officer</label>
                    <select
                      className="select-modern"
                      value={drawerStaff}
                      onChange={e => setDrawerStaff(e.target.value)}
                    >
                      {STAFF_MEMBERS.map(staff => (
                        <option key={staff} value={staff}>{staff}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field-group" style={{ marginTop: '14px' }}>
                  <label className="field-label">Official Administrative Resolution Memo</label>
                  <textarea
                    className="input-modern"
                    rows={3}
                    placeholder="Enter final resolution note, prerequisite override justification, or clearance authorization..."
                    value={resolutionNote}
                    onChange={e => setResolutionNote(e.target.value)}
                  />
                </div>

                <div className="form-field-group" style={{ marginTop: '14px' }}>
                  <label className="field-label">Append Internal Audit Note to Timeline</label>
                  <div className="input-with-action">
                    <input
                      type="text"
                      className="input-modern"
                      placeholder="e.g., Verified syllabus equivalence with Math Dept Chair..."
                      value={auditNoteText}
                      onChange={e => setAuditNoteText(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Audit Timeline */}
              <div className="drawer-section">
                <h3 className="drawer-section-title">
                  <Clock size={16} />
                  <span>Comprehensive Audit History & Log</span>
                </h3>
                <div className="drawer-timeline-stream">
                  {(selectedTicket.timeline || []).map((evt, idx) => (
                    <div key={idx} className="drawer-timeline-item">
                      <div className="drawer-dot" />
                      <div className="drawer-event-body">
                        <div className="event-top">
                          <span className="event-act">{evt.action}</span>
                          <span className="event-t">
                            {evt.timestamp ? new Date(evt.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : ''}
                          </span>
                        </div>
                        <span className="event-by">{evt.actor}</span>
                        <p className="event-txt">{evt.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="drawer-footer">
              <button className="btn-secondary" onClick={closeDrawer}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSaveChanges}>
                <CheckCircle2 size={16} />
                <span>Save Administrative Updates</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagementView;
