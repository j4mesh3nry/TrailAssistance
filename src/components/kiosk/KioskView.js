import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  Ticket, 
  Search, 
  Printer, 
  Clock, 
  ArrowLeft, 
  QrCode, 
  Building2, 
  ChevronRight
} from 'lucide-react';
import { LifecycleBar } from '../common/LifecycleBar';
import { StatusBadge } from '../common/StatusBadge';
import ustplogo from '../../assets/ustplogo.png';
import './styles/KioskView.css';

export const KioskView = () => {
  const { tickets, handleCreateTicket, showToast, switchPersona } = usePortal();
  const [screen, setScreen] = useState('home'); // 'home' | 'express' | 'lookup' | 'ticketPrinted'

  // Express Walk-in form
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [category, setCategory] = useState('Academic Advising');
  const [purpose, setPurpose] = useState('');

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState(null);

  // Printed slip data
  const [printedSlip, setPrintedSlip] = useState(null);

  const handleExpressSubmit = (e) => {
    e.preventDefault();
    if (!studentId || !studentName || !purpose) return;

    const queueNum = `A-${Math.floor(10 + Math.random() * 89)}`;
    const created = handleCreateTicket({
      studentId: studentId.trim(),
      studentName: studentName.trim(),
      studentEmail: `${studentName.toLowerCase().replace(/\s+/g, '.')}@demo.edu`,
      studentProgram: 'Undergraduate Program',
      category,
      title: `Walk-in Lobby: ${purpose}`,
      purposeOfVisit: purpose,
      urgency: 'high',
      meetingMode: "Dean's Office (Room 302B)",
      preferredContact: "Dean's Desk Walk-in",
      details: `Walk-in consultation initiated at Lobby Kiosk Terminal #01 for ${purpose}. Queue ticket #${queueNum} issued to student.`
    });

    setPrintedSlip({
      queueNumber: queueNum,
      ticketId: created.ticketNumber,
      studentName: studentName.trim(),
      studentId: studentId.trim(),
      category,
      counter: `Counter ${Math.floor(1 + Math.random() * 4)} - Advising Desk`,
      estimatedWait: '8–12 Minutes',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setScreen('ticketPrinted');
  };

  const handleLookup = (e) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;

    const found = tickets.find(t => 
      t.ticketNumber.toLowerCase() === lookupQuery.trim().toLowerCase() ||
      t.studentId.toLowerCase() === lookupQuery.trim().toLowerCase()
    );

    if (found) {
      setLookupResult(found);
    } else {
      showToast('No active ticket found for this ID', 'alert');
      setLookupResult(null);
    }
  };

  return (
    <div className="kiosk-fullscreen-container">
      {/* Kiosk Top Bar */}
      <div className="kiosk-top-bar">
        <div className="kiosk-brand">
          <img src={ustplogo} alt="USTP Logo" className="kiosk-ustp-logo" />
          <div>
            <h1 className="kiosk-title">USTP Dean's Office Assistance Kiosk</h1>
            <p className="kiosk-sub">Self-Service Lobby Terminal &bull; Main Academic Complex</p>
          </div>
        </div>

        <div className="kiosk-top-right">
          <div className="kiosk-clock-pill">
            <Clock size={16} />
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <button 
            className="kiosk-exit-btn"
            onClick={() => switchPersona('student')}
            title="Exit Kiosk Mode"
          >
            Exit Terminal
          </button>
        </div>
      </div>

      {/* Main Kiosk Content */}
      <div className="kiosk-main-area">
        {/* SCREEN 1: HOME */}
        {screen === 'home' && (
          <div className="kiosk-home-view">
            <div className="kiosk-welcome-heading">
              <h2>Welcome, Scholar!</h2>
              <p>Please select an express service option to join the walk-in advising queue or track an existing concern.</p>
            </div>

            <div className="kiosk-touch-cards-grid">
              <div className="kiosk-touch-card primary" onClick={() => setScreen('express')}>
                <div className="kiosk-touch-icon-box">
                  <Ticket size={48} />
                </div>
                <h3>Walk-in Check-in & Queue Ticket</h3>
                <p>Register for same-day walk-in consultation, clearance override, or advising appointment.</p>
                <div className="touch-card-footer">
                  <span>Tap to Check In</span>
                  <ChevronRight size={20} />
                </div>
              </div>

              <div className="kiosk-touch-card secondary" onClick={() => setScreen('lookup')}>
                <div className="kiosk-touch-icon-box lookup">
                  <Search size={48} />
                </div>
                <h3>Track Active Concern Status</h3>
                <p>Lookup your filed petition by Student ID or Ticket # to see live progression and assigned officer.</p>
                <div className="touch-card-footer">
                  <span>Tap to Track Queue</span>
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>

            <div className="kiosk-info-banner">
              <Building2 size={20} />
              <span>
                Office Hours Today: <strong>8:30 AM – 5:00 PM</strong> &bull; Priority Walk-in Hours for Dean Vance: <strong>1:30 PM – 4:00 PM</strong>
              </span>
            </div>
          </div>
        )}

        {/* SCREEN 2: EXPRESS WALK-IN FORM */}
        {screen === 'express' && (
          <div className="kiosk-screen-container">
            <button className="kiosk-back-btn" onClick={() => setScreen('home')}>
              <ArrowLeft size={18} />
              <span>Back to Main Menu</span>
            </button>

            <div className="kiosk-form-card card-modern">
              <div className="kiosk-form-header">
                <h2>Express Walk-in Queue Registration</h2>
                <p>Fill out your details to receive a printed thermal queue number and counter assignment.</p>
              </div>

              <form onSubmit={handleExpressSubmit} className="kiosk-touch-form">
                <div className="kiosk-form-row">
                  <div className="form-field-group">
                    <label className="field-label">Student ID Number</label>
                    <input
                      type="text"
                      required
                      className="input-modern kiosk-input"
                      placeholder="e.g., 2024-10492"
                      value={studentId}
                      onChange={e => setStudentId(e.target.value)}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">Student Full Name</label>
                    <input
                      type="text"
                      required
                      className="input-modern kiosk-input"
                      placeholder="e.g., Alex Morgan"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label">Assistance Touchpoint</label>
                  <div className="kiosk-category-pills">
                    {[
                      'Academic Advising', 
                      'Clearance & Graduation', 
                      'Financial Aid & Scholarships', 
                      'Enrollment & Registration'
                    ].map(cat => (
                      <button
                        key={cat}
                        type="button"
                        className={`kiosk-cat-pill ${category === cat ? 'active' : ''}`}
                        onClick={() => setCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label">Reason for Walk-in Visit</label>
                  <input
                    type="text"
                    required
                    className="input-modern kiosk-input"
                    placeholder="e.g., Dean's clearance signature for senior capstone prerequisite waiver"
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-primary kiosk-submit-btn">
                  <Printer size={20} />
                  <span>Generate Queue Ticket Slip</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SCREEN 3: PRINTED THERMAL TICKET SLIP */}
        {screen === 'ticketPrinted' && printedSlip && (
          <div className="kiosk-screen-container">
            <div className="thermal-slip-wrapper">
              <div className="thermal-slip card-elevated">
                <div className="slip-top-border" />
                <div className="slip-header">
                  <h3>UNIVERSITY ACADEMIC ASSISTANCE</h3>
                  <p>Office of the Dean & Academic Counseling</p>
                  <span className="slip-divider-line">- - - - - - - - - - - - - - - - -</span>
                </div>

                <div className="slip-queue-number-block">
                  <span className="slip-queue-lbl">YOUR QUEUE NUMBER</span>
                  <span className="slip-queue-num">{printedSlip.queueNumber}</span>
                  <span className="slip-ticket-ref">Ref ID: {printedSlip.ticketId}</span>
                </div>

                <div className="slip-details-block">
                  <div className="slip-row">
                    <span>Student:</span>
                    <strong>{printedSlip.studentName}</strong>
                  </div>
                  <div className="slip-row">
                    <span>Student ID:</span>
                    <strong>{printedSlip.studentId}</strong>
                  </div>
                  <div className="slip-row">
                    <span>Service:</span>
                    <strong>{printedSlip.category}</strong>
                  </div>
                  <div className="slip-row highlight">
                    <span>Assigned Desk:</span>
                    <strong>{printedSlip.counter}</strong>
                  </div>
                  <div className="slip-row">
                    <span>Estimated Wait:</span>
                    <strong>{printedSlip.estimatedWait}</strong>
                  </div>
                  <div className="slip-row">
                    <span>Time Issued:</span>
                    <strong>{printedSlip.timestamp}</strong>
                  </div>
                </div>

                <div className="slip-qr-box">
                  <QrCode size={64} className="slip-qr-icon" />
                  <span className="slip-qr-text">Scan for Mobile Live Tracker</span>
                </div>

                <div className="slip-footer">
                  <p>Please watch the lobby display screen for your queue number.</p>
                  <p>Thank you for using TrailAssistance Self-Service.</p>
                </div>
              </div>

              <div className="slip-actions">
                <button 
                  className="btn-primary slip-btn"
                  onClick={() => {
                    showToast(`Queue ticket #${printedSlip.queueNumber} sent to printer!`, 'success');
                  }}
                >
                  <Printer size={18} />
                  <span>Simulate Print Ticket Slip</span>
                </button>
                <button 
                  className="btn-secondary slip-btn"
                  onClick={() => {
                    setScreen('home');
                    setPrintedSlip(null);
                  }}
                >
                  Done &bull; Return to Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 4: TICKET LOOKUP */}
        {screen === 'lookup' && (
          <div className="kiosk-screen-container">
            <button className="kiosk-back-btn" onClick={() => { setScreen('home'); setLookupResult(null); }}>
              <ArrowLeft size={18} />
              <span>Back to Main Menu</span>
            </button>

            <div className="kiosk-form-card card-modern">
              <div className="kiosk-form-header">
                <h2>Track Queue & Lifecycle Progression</h2>
                <p>Enter your Student ID (e.g., 2024-10492) or Ticket # (e.g., TKT-8491) to view status.</p>
              </div>

              <form onSubmit={handleLookup} className="kiosk-search-form">
                <div className="kiosk-search-input-group">
                  <input
                    type="text"
                    required
                    className="input-modern kiosk-input"
                    placeholder="Enter Student ID or Ticket #..."
                    value={lookupQuery}
                    onChange={e => setLookupQuery(e.target.value)}
                  />
                  <button type="submit" className="btn-primary kiosk-lookup-submit-btn">
                    <Search size={18} />
                    <span>Lookup</span>
                  </button>
                </div>
              </form>

              {lookupResult && (
                <div className="kiosk-lookup-result-card">
                  <div className="lookup-result-header">
                    <div>
                      <span className="lookup-result-id">{lookupResult.ticketNumber}</span>
                      <h3 className="lookup-result-title">{lookupResult.title}</h3>
                      <p className="lookup-result-student">
                        {lookupResult.studentName} &bull; {lookupResult.studentProgram}
                      </p>
                    </div>
                    <StatusBadge status={lookupResult.status} />
                  </div>

                  <div className="lookup-lifecycle-box">
                    <LifecycleBar status={lookupResult.status} />
                  </div>

                  <div className="lookup-meta-grid">
                    <div className="lookup-meta-cell">
                      <span>Assigned Staff</span>
                      <strong>{lookupResult.assignedStaff}</strong>
                    </div>
                    <div className="lookup-meta-cell">
                      <span>Scheduled Slot</span>
                      <strong>
                        {lookupResult.preferredMeetingSlot 
                          ? new Date(lookupResult.preferredMeetingSlot).toLocaleString() 
                          : 'Pending Scheduling'}
                      </strong>
                    </div>
                    <div className="lookup-meta-cell">
                      <span>Location</span>
                      <strong>{lookupResult.meetingMode}</strong>
                    </div>
                    <div className="lookup-meta-cell">
                      <span>Latest Update</span>
                      <strong>{new Date(lookupResult.updatedAt).toLocaleDateString()}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KioskView;
