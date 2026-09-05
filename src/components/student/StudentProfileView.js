import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  User, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Award, 
  ShieldCheck, 
  Save 
} from 'lucide-react';
import './styles/StudentViews.css';

export const StudentProfileView = () => {
  const { activeUser, showToast } = usePortal();
  const [profile, setProfile] = useState({
    phone: activeUser?.phone || '+1 (555) 342-8910',
    emergencyContact: 'Robert Morgan (Father) - +1 (555) 902-1133',
    address: 'University Dormitory Block C, Room 412',
    bio: 'Senior computer science student focusing on distributed systems and cloud infrastructure. Preparing for Capstone II and graduation.'
  });

  const clearanceItems = [
    { name: 'Academic Advising & Curriculum Check', status: 'In Review', color: 'amber', icon: Clock },
    { name: 'University Central Library Clearance', status: 'Cleared', color: 'emerald', icon: CheckCircle2 },
    { name: 'Financial Aid & Student Accounts Ledger', status: 'Cleared', color: 'emerald', icon: CheckCircle2 },
    { name: 'CIS Networking & Hardware Laboratory', status: 'Cleared', color: 'emerald', icon: CheckCircle2 },
    { name: 'Office of the Registrar Diploma Audit', status: 'Pending Filing', color: 'slate', icon: Clock }
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Contact preferences updated successfully in SIS!', 'success');
  };

  return (
    <div className="student-view-container">
      <div className="profile-page-header">
        <h1 className="tickets-page-title">Student Profile & Academic Record</h1>
        <p className="tickets-page-sub">
          Official student record, curriculum completion milestones, and graduation clearance tracking.
        </p>
      </div>

      <div className="profile-layout-grid">
        {/* Left Column: Academic Credentials Card */}
        <div className="profile-left-col">
          <div className="card-modern profile-identity-card">
            <div className="profile-avatar-circle">
              {activeUser?.avatar || 'AM'}
            </div>
            <h2 className="profile-full-name">{activeUser?.name || 'Alex Morgan'}</h2>
            <p className="profile-id-tag">Student ID: {activeUser?.studentId || '2024-10492'}</p>
            <div className="profile-badge-pill">
              <Award size={14} />
              <span>{activeUser?.academicStanding || "Dean's Lister"}</span>
            </div>

            <div className="profile-info-divider" />

            <div className="profile-field-list">
              <div className="profile-info-row">
                <span className="p-label">Academic Program:</span>
                <span className="p-value">{activeUser?.program || 'BS Computer Science'}</span>
              </div>
              <div className="profile-info-row">
                <span className="p-label">College:</span>
                <span className="p-value">{activeUser?.college || 'College of Information Technology'}</span>
              </div>
              <div className="profile-info-row">
                <span className="p-label">Year of Study:</span>
                <span className="p-value">{activeUser?.yearOfStudy || '4th Year - Senior'}</span>
              </div>
              <div className="profile-info-row">
                <span className="p-label">Faculty Advisor:</span>
                <span className="p-value">{activeUser?.advisor || 'Dr. Sarah Vance'}</span>
              </div>
              <div className="profile-info-row">
                <span className="p-label">Cumulative GPA:</span>
                <span className="p-value highlight">{activeUser?.gpa || '3.88'} / 4.00</span>
              </div>
              <div className="profile-info-row">
                <span className="p-label">Institutional Email:</span>
                <span className="p-value">{activeUser?.email || 'alex.morgan@demo.edu'}</span>
              </div>
            </div>
          </div>

          {/* Degree Audit Progress Card */}
          <div className="card-modern degree-progress-card">
            <h3 className="card-subheading">
              <BookOpen size={16} />
              <span>Degree Audit Completion</span>
            </h3>
            <div className="progress-metrics-box">
              <div className="prog-bar-header">
                <span className="prog-text">118 / 132 Units Completed</span>
                <span className="prog-pct">89.4%</span>
              </div>
              <div className="prog-bar-track">
                <div className="prog-bar-fill" style={{ width: '89.4%' }} />
              </div>
            </div>
            <p className="prog-helper-note">
              14 elective & capstone units remaining for June 2027 commencement.
            </p>
          </div>
        </div>

        {/* Right Column: Clearance & Contact Preferences */}
        <div className="profile-right-col">
          {/* Clearance Status Card */}
          <div className="card-modern clearance-checklist-card">
            <div className="card-header-with-badge">
              <h3 className="card-subheading">
                <ShieldCheck size={18} />
                <span>Graduation Clearance Checklist</span>
              </h3>
              <span className="clearance-summary-pill">3 of 5 Cleared</span>
            </div>

            <div className="clearance-items-list">
              {clearanceItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className={`clearance-item-row ${item.color}`}>
                    <div className="clearance-icon-box">
                      <Icon size={16} />
                    </div>
                    <span className="clearance-name">{item.name}</span>
                    <span className={`clearance-badge ${item.color}`}>{item.status}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Details Form */}
          <div className="card-modern profile-edit-card">
            <h3 className="card-subheading">
              <User size={18} />
              <span>Contact & Emergency Information</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="form-input-row">
                <div className="form-field-group">
                  <label className="field-label">Mobile Contact Number</label>
                  <div className="input-with-icon">
                    <Phone size={16} className="input-inner-icon" />
                    <input
                      type="text"
                      className="input-modern"
                      value={profile.phone}
                      onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label">Emergency Contact & Relationship</label>
                  <input
                    type="text"
                    className="input-modern"
                    value={profile.emergencyContact}
                    onChange={e => setProfile({ ...profile, emergencyContact: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label className="field-label">Campus / Mailing Address</label>
                <input
                  type="text"
                  className="input-modern"
                  value={profile.address}
                  onChange={e => setProfile({ ...profile, address: e.target.value })}
                />
              </div>

              <div className="form-field-group">
                <label className="field-label">Academic Goals & Bio Statement</label>
                <textarea
                  className="input-modern"
                  rows={3}
                  value={profile.bio}
                  onChange={e => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary profile-save-btn">
                <Save size={16} />
                <span>Save Contact Changes</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileView;
