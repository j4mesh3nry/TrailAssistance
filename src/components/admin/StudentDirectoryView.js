import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  Search, 
  UserPlus, 
  X
} from 'lucide-react';
import './styles/AdminViews.css';

export const StudentDirectoryView = () => {
  const { students, tickets, showToast } = usePortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Student Form
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    program: 'BS Computer Science',
    yearOfStudy: '1st Year - Freshman',
    phone: ''
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProgram = programFilter === 'all' || student.program.includes(programFilter);

    return matchesSearch && matchesProgram;
  });

  const getStudentTicketCount = (email) => {
    return tickets.filter(t => t.studentEmail === email).length;
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email) return;

    showToast(`Registered new student profile for ${newStudent.name}`, 'success');
    setShowAddModal(false);
    setNewStudent({
      name: '',
      email: '',
      program: 'BS Computer Science',
      yearOfStudy: '1st Year - Freshman',
      phone: ''
    });
  };

  return (
    <div className="admin-view-container">
      {/* Directory Header */}
      <div className="tickets-management-header">
        <div>
          <h1 className="exec-title">Student Directory & Academic Ledgers</h1>
          <p className="exec-subtitle">
            Master roster of registered undergraduates, graduate scholars, and exchange participants.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <UserPlus size={16} />
          <span>Register Student Profile</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-modern admin-filter-bar">
        <div className="admin-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input-field"
            placeholder="Search students by name, ID (#2024-10492), or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-filter-selectors">
          <div className="select-wrapper">
            <span className="select-lbl">Program:</span>
            <select
              className="select-modern filter-sel"
              value={programFilter}
              onChange={e => setProgramFilter(e.target.value)}
            >
              <option value="all">All Programs</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Data Science">Data Science / AI</option>
              <option value="Architecture">Architecture</option>
              <option value="Accountancy">Business & Accounting</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="card-modern admin-table-card">
        <div className="table-responsive-wrapper">
          <table className="modern-data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>College & Program</th>
                <th>Year Standing</th>
                <th>Academic Standing</th>
                <th>GPA</th>
                <th>Clearance</th>
                <th>Inquiries</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => {
                const ticketCount = getStudentTicketCount(student.email);
                return (
                  <tr key={student.id}>
                    <td>
                      <div className="student-profile-cell">
                        <div className="std-avatar">{student.avatar || 'ST'}</div>
                        <div className="std-info">
                          <span className="std-name">{student.name}</span>
                          <span className="std-email">{student.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="code-cell">{student.studentId}</span>
                    </td>
                    <td>
                      <div className="program-cell">
                        <span className="program-title">{student.program}</span>
                        <span className="college-sub">{student.college}</span>
                      </div>
                    </td>
                    <td>
                      <span className="year-cell">{student.yearOfStudy}</span>
                    </td>
                    <td>
                      <span className={`standing-badge ${student.academicStanding?.includes('Dean') ? 'deans-list' : ''}`}>
                        {student.academicStanding}
                      </span>
                    </td>
                    <td>
                      <span className="gpa-cell">{student.gpa}</span>
                    </td>
                    <td>
                      <span className={`clearance-pill ${student.clearanceStatus === 'Cleared' ? 'cleared' : 'pending'}`}>
                        {student.clearanceStatus}
                      </span>
                    </td>
                    <td>
                      <span className="ticket-count-badge">
                        {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="drawer-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog-card card-modern" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Register New Student Profile</h3>
              <button className="drawer-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="modal-body-form">
              <div className="form-field-group">
                <label className="field-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="input-modern"
                  placeholder="e.g., Jonathan Mercer"
                  value={newStudent.name}
                  onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>

              <div className="form-field-group">
                <label className="field-label">University Email</label>
                <input
                  type="email"
                  required
                  className="input-modern"
                  placeholder="e.g., j.mercer@demo.edu"
                  value={newStudent.email}
                  onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                />
              </div>

              <div className="form-field-group">
                <label className="field-label">Degree Program</label>
                <select
                  className="select-modern"
                  value={newStudent.program}
                  onChange={e => setNewStudent({ ...newStudent, program: e.target.value })}
                >
                  <option value="BS Computer Science">BS Computer Science</option>
                  <option value="BS Information Technology">BS Information Technology</option>
                  <option value="BS Cybersecurity">BS Cybersecurity</option>
                  <option value="BS Electrical Engineering">BS Electrical Engineering</option>
                  <option value="BS Architecture">BS Architecture</option>
                  <option value="MS Artificial Intelligence">MS Artificial Intelligence</option>
                </select>
              </div>

              <div className="form-field-group">
                <label className="field-label">Year of Study</label>
                <select
                  className="select-modern"
                  value={newStudent.yearOfStudy}
                  onChange={e => setNewStudent({ ...newStudent, yearOfStudy: e.target.value })}
                >
                  <option value="1st Year - Freshman">1st Year - Freshman</option>
                  <option value="2nd Year - Sophomore">2nd Year - Sophomore</option>
                  <option value="3rd Year - Junior">3rd Year - Junior</option>
                  <option value="4th Year - Senior">4th Year - Senior</option>
                </select>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <UserPlus size={16} />
                  <span>Create Student Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDirectoryView;
