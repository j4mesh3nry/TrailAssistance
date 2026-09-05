import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  Search, 
  Clock, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  FileText, 
  ShieldCheck, 
  CheckCircle2,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { LifecycleBar } from '../common/LifecycleBar';
import { StatusBadge } from '../common/StatusBadge';
import { UrgencyBadge } from '../common/UrgencyBadge';
import './styles/StudentViews.css';

export const MyTicketsView = ({ onNavigate }) => {
  const { tickets, activeUser, handleAddStudentReply } = usePortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTicketId, setExpandedTicketId] = useState(null);
  const [replyTextMap, setReplyTextMap] = useState({});

  // Filter student tickets
  const myTickets = tickets.filter(t => t.studentEmail === activeUser?.email);

  const filteredTickets = myTickets.filter(ticket => {
    const matchesSearch = 
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const toggleExpand = (id) => {
    setExpandedTicketId(prev => (prev === id ? null : id));
  };

  const handleSendReply = (ticketId) => {
    const text = replyTextMap[ticketId];
    if (!text || !text.trim()) return;

    handleAddStudentReply(ticketId, text.trim(), activeUser?.name || 'Alex Morgan');
    setReplyTextMap(prev => ({ ...prev, [ticketId]: '' }));
  };

  return (
    <div className="student-view-container">
      {/* Top Header */}
      <div className="tickets-page-header">
        <div>
          <h1 className="tickets-page-title">My Concerns & Academic Petitions</h1>
          <p className="tickets-page-sub">
            Real-time lifecycle tracking, administrative audit history, and direct messaging with the Dean's Office.
          </p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => onNavigate('newTicket')}
        >
          <PlusCircle size={16} />
          <span>New Concern</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="tickets-filter-card card-modern">
        <div className="search-input-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input-field"
            placeholder="Search by ticket number (#TKT-8491), keyword, or course..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls-row">
          <div className="filter-group">
            <span className="filter-label">Status:</span>
            <div className="filter-pills">
              {['all', 'submitted', 'under_review', 'scheduled', 'resolved'].map(status => (
                <button
                  key={status}
                  className={`filter-pill ${selectedStatus === status ? 'active' : ''}`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status === 'all' ? 'All Inquiries' : status.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="category-dropdown-box">
            <select
              className="select-modern filter-select"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Academic Advising">Academic Advising</option>
              <option value="Financial Aid & Scholarships">Financial Aid & Scholarships</option>
              <option value="Clearance & Graduation">Clearance & Graduation</option>
              <option value="Enrollment & Registration">Enrollment & Registration</option>
              <option value="Student Grievance & Appeal">Student Grievance & Appeal</option>
              <option value="Special Accommodation">Special Accommodation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="tickets-stream-list">
        {filteredTickets.length === 0 ? (
          <div className="card-modern empty-tickets-state">
            <HelpCircle size={40} className="empty-icon" />
            <h3>No Concerns Match Your Filters</h3>
            <p>Try clearing your search query or submit a new academic assistance request.</p>
            <button 
              className="btn-secondary" 
              onClick={() => { setSearchTerm(''); setSelectedStatus('all'); setSelectedCategory('all'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredTickets.map(ticket => {
            const isExpanded = expandedTicketId === ticket.id;
            const timelineEvents = ticket.timeline || [];
            const studentReplies = ticket.studentNotes || [];

            return (
              <div key={ticket.id} className="ticket-card card-modern">
                {/* Ticket Card Header */}
                <div className="ticket-card-header" onClick={() => toggleExpand(ticket.id)}>
                  <div className="ticket-header-main">
                    <div className="ticket-top-meta">
                      <span className="ticket-badge-code">{ticket.ticketNumber}</span>
                      <StatusBadge status={ticket.status} />
                      <UrgencyBadge urgency={ticket.urgency} />
                      <span className="ticket-cat-badge">{ticket.category}</span>
                    </div>
                    <h3 className="ticket-headline">{ticket.title}</h3>
                    <p className="ticket-purpose-snippet">
                      <strong>Purpose:</strong> {ticket.purposeOfVisit || ticket.title}
                    </p>
                  </div>

                  <div className="ticket-header-right">
                    <div className="ticket-date-info">
                      <Clock size={14} />
                      <span>Filed {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button 
                      className="ticket-toggle-chevron-btn"
                      aria-label="Toggle ticket details"
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* Visual Lifecycle Progression Bar */}
                <div className="ticket-lifecycle-section">
                  <LifecycleBar status={ticket.status} />
                </div>

                {/* Collapsible Expanded Details Drawer */}
                {isExpanded && (
                  <div className="ticket-expanded-drawer">
                    <div className="ticket-details-grid">
                      <div className="detail-pane">
                        <h4 className="detail-pane-title">
                          <FileText size={16} />
                          <span>Concern Statement</span>
                        </h4>
                        <div className="detail-narrative-box">
                          {ticket.details}
                        </div>

                        {ticket.resolutionNotes && (
                          <div className="resolution-official-box">
                            <div className="res-header">
                              <CheckCircle2 size={16} />
                              <span>Official Dean's Office Resolution</span>
                            </div>
                            <p className="res-body">{ticket.resolutionNotes}</p>
                          </div>
                        )}

                        <div className="detail-metadata-table">
                          <div className="meta-row">
                            <span className="meta-k">Assigned Officer:</span>
                            <span className="meta-v">{ticket.assignedStaff || "Dean's Office Staff"}</span>
                          </div>
                          <div className="meta-row">
                            <span className="meta-k">Consultation Mode:</span>
                            <span className="meta-v">{ticket.meetingMode || "Dean's Office Room 302B"}</span>
                          </div>
                          <div className="meta-row">
                            <span className="meta-k">Preferred Slot:</span>
                            <span className="meta-v">
                              {ticket.preferredMeetingSlot 
                                ? new Date(ticket.preferredMeetingSlot).toLocaleString() 
                                : 'Pending Confirmation'}
                            </span>
                          </div>
                          <div className="meta-row">
                            <span className="meta-k">Notification Channel:</span>
                            <span className="meta-v">{ticket.preferredContact || 'University Email'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Audit Timeline Column */}
                      <div className="timeline-pane">
                        <h4 className="detail-pane-title">
                          <ShieldCheck size={16} />
                          <span>Audit Trail & Administrative History</span>
                        </h4>

                        <div className="timeline-event-stream">
                          {timelineEvents.map((evt, idx) => (
                            <div key={evt.id || idx} className="timeline-event-item">
                              <div className="event-marker">
                                <span className="marker-dot" />
                                {idx < timelineEvents.length - 1 && <span className="marker-line" />}
                              </div>
                              <div className="event-content">
                                <div className="event-title-line">
                                  <span className="event-action-text">{evt.action}</span>
                                  <span className="event-time-text">
                                    {evt.timestamp ? new Date(evt.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : ''}
                                  </span>
                                </div>
                                <div className="event-actor-tag">{evt.actor}</div>
                                <p className="event-note-text">{evt.note}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Student Replies Section */}
                        <div className="student-conversation-box">
                          <h5 className="convo-title">
                            <MessageSquare size={14} />
                            <span>Student Responses & Follow-up</span>
                          </h5>

                          {studentReplies.length > 0 && (
                            <div className="reply-bubbles-list">
                              {studentReplies.map(r => (
                                <div key={r.id} className="reply-bubble">
                                  <div className="reply-bubble-author">{r.author} &bull; Student</div>
                                  <p className="reply-bubble-text">{r.text}</p>
                                  <span className="reply-bubble-time">
                                    {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {ticket.status !== 'resolved' && (
                            <div className="reply-input-bar">
                              <input
                                type="text"
                                className="input-modern reply-field"
                                placeholder="Add a follow-up note or document update..."
                                value={replyTextMap[ticket.id] || ''}
                                onChange={e => setReplyTextMap({ ...replyTextMap, [ticket.id]: e.target.value })}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') handleSendReply(ticket.id);
                                }}
                              />
                              <button
                                className="btn-primary reply-send-btn"
                                onClick={() => handleSendReply(ticket.id)}
                              >
                                <Send size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyTicketsView;
