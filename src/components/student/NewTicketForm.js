import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  GraduationCap, 
  DollarSign, 
  CheckSquare, 
  BookOpen, 
  AlertTriangle, 
  HeartHandshake,
  Send,
  ArrowRight,
  ArrowLeft,
  Info,
  CheckCircle2
} from 'lucide-react';
import './styles/StudentViews.css';

const CATEGORIES = [
  {
    id: 'Academic Advising',
    label: 'Academic Advising',
    desc: 'Prerequisite overrides, degree audit, double majors & course planning',
    icon: GraduationCap,
    color: 'indigo'
  },
  {
    id: 'Financial Aid & Scholarships',
    label: 'Financial Aid & Grants',
    desc: 'Emergency tuition grants, scholarship appeals, stipend disbursements',
    icon: DollarSign,
    color: 'emerald'
  },
  {
    id: 'Clearance & Graduation',
    label: 'Clearance & Graduation',
    desc: 'Department sign-offs, library holds, diploma requests, credentials',
    icon: CheckSquare,
    color: 'sky'
  },
  {
    id: 'Enrollment & Registration',
    label: 'Enrollment & Overload',
    desc: 'Late section add petitions, 21+ unit overload approvals, cross-enrollment',
    icon: BookOpen,
    color: 'amber'
  },
  {
    id: 'Student Grievance & Appeal',
    label: 'Grievance & Exam Appeal',
    desc: 'Grade disputes, rubric reviews, faculty consultation mediation',
    icon: AlertTriangle,
    color: 'rose'
  },
  {
    id: 'Special Accommodation',
    label: 'Accommodation & Wellness',
    desc: 'Medical absence waivers, accessibility needs, thesis lab extensions',
    icon: HeartHandshake,
    color: 'purple'
  }
];

const URGENCIES = [
  {
    id: 'low',
    label: 'Low Priority',
    sla: '5–7 Business Days',
    desc: 'General inquiry or prospective planning',
    color: 'var(--slate-500)'
  },
  {
    id: 'medium',
    label: 'Medium Priority',
    sla: '3–4 Business Days',
    desc: 'Standard curricular or clearance petition',
    color: 'var(--indigo-600)'
  },
  {
    id: 'high',
    label: 'High Priority',
    sla: '24–48 Hours',
    desc: 'Urgent deadline for upcoming semester registration',
    color: 'var(--amber-600)'
  },
  {
    id: 'urgent',
    label: 'Critical / Urgent',
    sla: 'Same-Day / Expedited',
    desc: 'Immediate graduation hold or severe academic emergency',
    color: 'var(--rose-600)'
  }
];

export const NewTicketForm = ({ onNavigate }) => {
  const { activeUser, handleCreateTicket } = usePortal();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    category: 'Academic Advising',
    title: '',
    purposeOfVisit: '',
    urgency: 'medium',
    preferredMeetingSlot: '',
    meetingMode: "Dean's Office (Room 302B)",
    preferredContact: 'University Email',
    details: '',
    hasPrerequisiteDoc: true,
    hasTranscript: true,
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Concern title is required';
    if (!formData.purposeOfVisit.trim()) errs.purposeOfVisit = 'Purpose of visit is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.preferredMeetingSlot) errs.preferredMeetingSlot = 'Please select a preferred meeting slot';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!formData.details.trim() || formData.details.length < 20) {
      errs.details = 'Please provide a detailed description (at least 20 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    handleCreateTicket({
      studentId: activeUser?.studentId || '2024-10492',
      studentName: activeUser?.name || 'Alex Morgan',
      studentEmail: activeUser?.email || 'alex.morgan@demo.edu',
      studentProgram: activeUser?.program || 'BS Computer Science',
      category: formData.category,
      title: formData.title,
      purposeOfVisit: formData.purposeOfVisit,
      urgency: formData.urgency,
      preferredMeetingSlot: formData.preferredMeetingSlot,
      meetingMode: formData.meetingMode,
      preferredContact: formData.preferredContact,
      details: formData.details,
      additionalInfo: {
        academicYear: activeUser?.yearOfStudy || '4th Year - Senior',
        advisingHold: 'Active',
        documentsAttached: formData.hasTranscript ? 'Unofficial Transcript Attached' : 'None'
      }
    });

    onNavigate('myTickets');
  };

  return (
    <div className="student-view-container">
      <div className="form-header-banner">
        <h1 className="form-page-title">File an Academic Concern / Assistance Request</h1>
        <p className="form-page-sub">
          Submit your petition directly to the Office of the Dean & Academic Advising Center.
        </p>

        {/* Multi-step progress indicator */}
        <div className="form-steps-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>
            <span className="dot-number">1</span>
            <span className="dot-text">Category & Purpose</span>
          </div>
          <div className={`step-connector ${step >= 2 ? 'active' : ''}`} />
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>
            <span className="dot-number">2</span>
            <span className="dot-text">Urgency & Scheduling</span>
          </div>
          <div className={`step-connector ${step >= 3 ? 'active' : ''}`} />
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>
            <span className="dot-number">3</span>
            <span className="dot-text">Narrative & Review</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="ticket-filing-card card-modern">
        {/* STEP 1: Category & Purpose */}
        {step === 1 && (
          <div className="form-step-content">
            <h2 className="step-section-heading">
              <span>Step 1:</span> Select Concern Classification
            </h2>

            <div className="category-selection-grid">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isSelected = formData.category === cat.id;
                return (
                  <div
                    key={cat.id}
                    className={`category-select-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                  >
                    <div className={`cat-icon-bubble ${cat.color}`}>
                      <Icon size={20} />
                    </div>
                    <div className="cat-card-body">
                      <h4>{cat.label}</h4>
                      <p>{cat.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="cat-check-badge">
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="form-input-row" style={{ marginTop: '24px' }}>
              <div className="form-field-group">
                <label className="field-label">
                  Subject / Concern Title <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className={`input-modern ${errors.title ? 'error' : ''}`}
                  placeholder="e.g., Senior Capstone II Prerequisite Override"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
                {errors.title && <span className="field-error-msg">{errors.title}</span>}
              </div>

              <div className="form-field-group">
                <label className="field-label">
                  Purpose of Visit <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className={`input-modern ${errors.purposeOfVisit ? 'error' : ''}`}
                  placeholder="e.g., Dean's Approval for Concurrent Course Registration"
                  value={formData.purposeOfVisit}
                  onChange={e => setFormData({ ...formData, purposeOfVisit: e.target.value })}
                />
                {errors.purposeOfVisit && <span className="field-error-msg">{errors.purposeOfVisit}</span>}
              </div>
            </div>

            <div className="form-actions-bar right-only">
              <button type="button" className="btn-primary" onClick={handleNext}>
                <span>Continue to Scheduling</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Urgency & Scheduling */}
        {step === 2 && (
          <div className="form-step-content">
            <h2 className="step-section-heading">
              <span>Step 2:</span> Urgency Level & Preferred Appointment Slot
            </h2>

            <div className="form-field-group">
              <label className="field-label">Select Urgency Level & Expected SLA</label>
              <div className="urgency-selection-grid">
                {URGENCIES.map(urg => {
                  const isSelected = formData.urgency === urg.id;
                  return (
                    <div
                      key={urg.id}
                      className={`urgency-select-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, urgency: urg.id })}
                    >
                      <div className="urg-header">
                        <span className="urg-title">{urg.label}</span>
                        <span className="urg-sla">{urg.sla}</span>
                      </div>
                      <p className="urg-desc">{urg.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="form-input-row" style={{ marginTop: '20px' }}>
              <div className="form-field-group">
                <label className="field-label">
                  Preferred Appointment Date & Time <span className="req">*</span>
                </label>
                <input
                  type="datetime-local"
                  className={`input-modern ${errors.preferredMeetingSlot ? 'error' : ''}`}
                  value={formData.preferredMeetingSlot}
                  onChange={e => setFormData({ ...formData, preferredMeetingSlot: e.target.value })}
                />
                {errors.preferredMeetingSlot && (
                  <span className="field-error-msg">{errors.preferredMeetingSlot}</span>
                )}
              </div>

              <div className="form-field-group">
                <label className="field-label">Consultation Delivery Mode</label>
                <select
                  className="select-modern"
                  value={formData.meetingMode}
                  onChange={e => setFormData({ ...formData, meetingMode: e.target.value })}
                >
                  <option value="Dean's Office (Room 302B)">In-Person &bull; Dean's Office (Room 302B)</option>
                  <option value="Virtual Zoom Consultation">Virtual &bull; Secure Zoom Consultation</option>
                  <option value="Academic Advising Center">In-Person &bull; Advising Center (Desk 4)</option>
                  <option value="Asynchronous Records Review">Asynchronous &bull; Official Records Sign-off Only</option>
                </select>
              </div>
            </div>

            <div className="form-input-row">
              <div className="form-field-group">
                <label className="field-label">Preferred Contact Channel</label>
                <select
                  className="select-modern"
                  value={formData.preferredContact}
                  onChange={e => setFormData({ ...formData, preferredContact: e.target.value })}
                >
                  <option value="University Email">University Email (Instant Portal Notification)</option>
                  <option value="SMS Notification">SMS Mobile Notification</option>
                  <option value="Dean's Desk Walk-in">Dean's Office Reception Call</option>
                </select>
              </div>
            </div>

            <div className="form-actions-bar">
              <button type="button" className="btn-secondary" onClick={handlePrev}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button type="button" className="btn-primary" onClick={handleNext}>
                <span>Continue to Narrative</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Narrative & Review */}
        {step === 3 && (
          <div className="form-step-content">
            <h2 className="step-section-heading">
              <span>Step 3:</span> Concern Narrative & Supplementary Records
            </h2>

            <div className="form-field-group">
              <label className="field-label">
                Detailed Explanation & Justification <span className="req">*</span>
              </label>
              <textarea
                className={`input-modern form-textarea ${errors.details ? 'error' : ''}`}
                rows={5}
                placeholder="Explain the background of your academic concern, courses impacted, and specific relief requested from the Dean's Office..."
                value={formData.details}
                onChange={e => setFormData({ ...formData, details: e.target.value })}
              />
              <div className="char-counter">
                {formData.details.length} characters (min 20)
              </div>
              {errors.details && <span className="field-error-msg">{errors.details}</span>}
            </div>

            {/* Simulated Document Checklist */}
            <div className="document-checklist-box">
              <h4 className="checklist-title">
                <Info size={16} />
                <span>Verified Student Record Attachments</span>
              </h4>
              <div className="checklist-items">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.hasTranscript}
                    onChange={e => setFormData({ ...formData, hasTranscript: e.target.checked })}
                  />
                  <span>Attach Unofficial SIS Academic Transcript (Auto-pulled for {activeUser?.name})</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.hasPrerequisiteDoc}
                    onChange={e => setFormData({ ...formData, hasPrerequisiteDoc: e.target.checked })}
                  />
                  <span>Include Prerequisite Degree Audit Syllabus Equivalence Sheet</span>
                </label>
              </div>
            </div>

            {/* Summary Preview Box */}
            <div className="submission-summary-preview">
              <div className="summary-row">
                <span className="summary-label">Student:</span>
                <span className="summary-val">{activeUser?.name} ({activeUser?.studentId})</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Category:</span>
                <span className="summary-val">{formData.category}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Urgency & SLA:</span>
                <span className="summary-val" style={{ textTransform: 'capitalize' }}>
                  {formData.urgency} Priority
                </span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Preferred Slot:</span>
                <span className="summary-val">
                  {formData.preferredMeetingSlot ? new Date(formData.preferredMeetingSlot).toLocaleString() : 'Pending'}
                </span>
              </div>
            </div>

            <div className="form-actions-bar">
              <button type="button" className="btn-secondary" onClick={handlePrev}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button type="submit" className="btn-primary submit-ticket-btn">
                <Send size={16} />
                <span>Submit Ticket to Dean's Queue</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewTicketForm;
