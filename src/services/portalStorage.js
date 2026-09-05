import { INITIAL_STUDENTS, INITIAL_TICKETS, INITIAL_RATINGS, DEMO_PERSONAS } from './mockData';

const STORAGE_KEYS = {
  STUDENTS: 'trail_academic_students_v2',
  TICKETS: 'trail_academic_tickets_v2',
  RATINGS: 'trail_academic_ratings_v2',
  ACTIVE_PERSONA: 'trail_active_persona_v2',
  NOTIFICATIONS: 'trail_notifications_v2'
};

// Ensure localStorage is populated with realistic demo dataset
export const initStorage = () => {
  try {
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TICKETS)) {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(INITIAL_TICKETS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RATINGS)) {
      localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(INITIAL_RATINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_PERSONA)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, JSON.stringify(DEMO_PERSONAS.student));
    }
  } catch (err) {
    console.warn('Storage initialization fallback warning:', err);
  }
};

// Reset demo data to pristine initial state
export const resetDemoData = () => {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(INITIAL_TICKETS));
  localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(INITIAL_RATINGS));
  localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, JSON.stringify(DEMO_PERSONAS.student));
  return {
    students: INITIAL_STUDENTS,
    tickets: INITIAL_TICKETS,
    ratings: INITIAL_RATINGS,
    persona: DEMO_PERSONAS.student
  };
};

// Students repository
export const getStudents = () => {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return raw ? JSON.parse(raw) : INITIAL_STUDENTS;
  } catch {
    return INITIAL_STUDENTS;
  }
};

export const addStudent = (studentData) => {
  const students = getStudents();
  const nextId = `STD-2024-${String(students.length + 1).padStart(3, '0')}`;
  const newStudent = {
    id: nextId,
    studentId: studentData.studentId || `2024-${Math.floor(10000 + Math.random() * 90000)}`,
    name: studentData.name,
    email: studentData.email,
    avatar: (studentData.name || 'ST').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
    role: studentData.role || 'undergraduate',
    college: studentData.college || 'College of Information Technology & Computing',
    program: studentData.program || 'BS Computer Science',
    yearOfStudy: studentData.yearOfStudy || '1st Year - Freshman',
    academicStanding: 'Good Standing',
    gpa: '3.50',
    phone: studentData.phone || '+1 (555) 000-0000',
    advisor: studentData.advisor || 'Dr. Sarah Vance',
    enrolledUnits: 15,
    clearanceStatus: 'Cleared',
    createdAt: new Date().toISOString()
  };
  const updated = [newStudent, ...students];
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updated));
  return newStudent;
};

export const deleteStudent = (id) => {
  const students = getStudents().filter(s => s.id !== id && s.studentId !== id);
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  return students;
};

// Tickets repository
export const getTickets = () => {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return raw ? JSON.parse(raw) : INITIAL_TICKETS;
  } catch {
    return INITIAL_TICKETS;
  }
};

export const getTicketById = (id) => {
  const tickets = getTickets();
  return tickets.find(t => t.id === id || t.ticketNumber === id) || null;
};

export const createTicket = (payload) => {
  const tickets = getTickets();
  const randNum = Math.floor(8500 + Math.random() * 1400);
  const ticketId = `TKT-${randNum}`;
  const now = new Date().toISOString();

  const newTicket = {
    id: ticketId,
    ticketNumber: ticketId,
    studentId: payload.studentId || '2024-10492',
    studentName: payload.studentName || 'Alex Morgan',
    studentEmail: payload.studentEmail || 'alex.morgan@demo.edu',
    studentProgram: payload.studentProgram || 'BS Computer Science',
    title: payload.title || payload.purposeOfVisit || 'Academic Inquiry',
    category: payload.category || 'Academic Advising',
    urgency: payload.urgency || 'medium',
    status: 'submitted',
    purposeOfVisit: payload.purposeOfVisit || payload.title || '',
    preferredMeetingSlot: payload.preferredMeetingSlot || '',
    meetingMode: payload.meetingMode || "Dean's Office (Room 302)",
    preferredContact: payload.preferredContact || 'University Email',
    assignedStaff: 'Advising Intake Desk',
    details: payload.details || '',
    additionalInfo: payload.additionalInfo || {},
    resolutionNotes: '',
    createdAt: now,
    updatedAt: now,
    resolvedAt: null,
    timeline: [
      {
        id: `TL-${Date.now()}-1`,
        action: 'Ticket Created',
        actor: `${payload.studentName || 'Student'} (Student)`,
        note: `Submitted inquiry: ${payload.title || 'Academic concern'} via portal.`,
        timestamp: now,
        statusBadge: 'submitted'
      }
    ],
    studentNotes: []
  };

  const updated = [newTicket, ...tickets];
  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
  return newTicket;
};

export const updateTicketStatus = (ticketId, newStatus, resolutionNote = '', actorName = 'Dr. Sarah Vance (Dean)') => {
  const tickets = getTickets();
  const now = new Date().toISOString();

  const updated = tickets.map(ticket => {
    if (ticket.id === ticketId || ticket.ticketNumber === ticketId) {
      const isResolved = newStatus === 'resolved';
      const statusLabels = {
        submitted: 'Submitted',
        under_review: 'Under Review',
        scheduled: 'Scheduled',
        resolved: 'Resolved'
      };

      const timelineEntry = {
        id: `TL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        action: `Status Updated: ${statusLabels[newStatus] || newStatus}`,
        actor: actorName,
        note: resolutionNote || `Ticket progression transitioned to ${statusLabels[newStatus] || newStatus}.`,
        timestamp: now,
        statusBadge: newStatus
      };

      return {
        ...ticket,
        status: newStatus,
        resolutionNotes: resolutionNote ? resolutionNote : ticket.resolutionNotes,
        updatedAt: now,
        resolvedAt: isResolved ? (ticket.resolvedAt || now) : null,
        timeline: [...ticket.timeline, timelineEntry]
      };
    }
    return ticket;
  });

  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
  return updated.find(t => t.id === ticketId || t.ticketNumber === ticketId);
};

export const assignStaffToTicket = (ticketId, staffName, actorName = 'Dean Sarah Vance') => {
  const tickets = getTickets();
  const now = new Date().toISOString();

  const updated = tickets.map(ticket => {
    if (ticket.id === ticketId || ticket.ticketNumber === ticketId) {
      const timelineEntry = {
        id: `TL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        action: 'Staff Reassigned',
        actor: actorName,
        note: `Responsible officer assigned: ${staffName}.`,
        timestamp: now,
        statusBadge: ticket.status
      };
      return {
        ...ticket,
        assignedStaff: staffName,
        updatedAt: now,
        timeline: [...ticket.timeline, timelineEntry]
      };
    }
    return ticket;
  });

  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
  return updated.find(t => t.id === ticketId);
};

export const addStaffAuditNote = (ticketId, noteText, staffName = 'Dr. Sarah Vance (Dean)') => {
  const tickets = getTickets();
  const now = new Date().toISOString();

  const updated = tickets.map(ticket => {
    if (ticket.id === ticketId || ticket.ticketNumber === ticketId) {
      const timelineEntry = {
        id: `TL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        action: 'Administrative Note Added',
        actor: staffName,
        note: noteText,
        timestamp: now,
        statusBadge: ticket.status
      };
      return {
        ...ticket,
        updatedAt: now,
        timeline: [...ticket.timeline, timelineEntry]
      };
    }
    return ticket;
  });

  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
  return updated.find(t => t.id === ticketId);
};

export const addStudentReplyNote = (ticketId, replyText, studentName = 'Alex Morgan') => {
  const tickets = getTickets();
  const now = new Date().toISOString();

  const updated = tickets.map(ticket => {
    if (ticket.id === ticketId || ticket.ticketNumber === ticketId) {
      const newReply = {
        id: `SN-${Date.now()}`,
        author: studentName,
        text: replyText,
        timestamp: now
      };
      const timelineEntry = {
        id: `TL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        action: 'Student Response Filed',
        actor: `${studentName} (Student)`,
        note: replyText.length > 80 ? `${replyText.slice(0, 80)}...` : replyText,
        timestamp: now,
        statusBadge: ticket.status
      };
      return {
        ...ticket,
        updatedAt: now,
        studentNotes: [...(ticket.studentNotes || []), newReply],
        timeline: [...ticket.timeline, timelineEntry]
      };
    }
    return ticket;
  });

  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(updated));
  return updated.find(t => t.id === ticketId);
};

export const deleteTicket = (id) => {
  const tickets = getTickets().filter(t => t.id !== id && t.ticketNumber !== id);
  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  return tickets;
};

// Ratings & Feedback repository
export const getRatings = () => {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RATINGS);
    return raw ? JSON.parse(raw) : INITIAL_RATINGS;
  } catch {
    return INITIAL_RATINGS;
  }
};

export const addRating = (ratingData) => {
  const ratings = getRatings();
  const newRating = {
    id: `RTG-${Date.now()}`,
    studentName: ratingData.studentName || 'Alex Morgan',
    studentEmail: ratingData.studentEmail || 'alex.morgan@demo.edu',
    studentId: ratingData.studentId || '2024-10492',
    rating: Number(ratingData.rating) || 5,
    category: ratingData.category || 'General Academic Assistance',
    feedback: ratingData.feedback || 'Great assistance provided by Dean office.',
    responseQuality: Number(ratingData.rating) >= 4 ? 'Outstanding' : 'Satisfactory',
    waitTimeMinutes: Math.floor(5 + Math.random() * 12),
    createdAt: new Date().toISOString()
  };
  const updated = [newRating, ...ratings];
  localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(updated));
  return newRating;
};

// ---------- TrailAssistance 2.0 helpers (additive, zero-config) ----------
export const SLA_DAYS = { urgent: 0.5, high: 2, medium: 4, low: 7 };

export const getTicketAgeDays = (ticket) => {
  try {
    const created = new Date(ticket.createdAt).getTime();
    const end = ticket.resolvedAt ? new Date(ticket.resolvedAt).getTime() : Date.now();
    return Math.max(0, (end - created) / (1000 * 60 * 60 * 24));
  } catch { return 0; }
};

export const getSlaInfo = (ticket) => {
  const sla = SLA_DAYS[ticket.urgency] ?? 4;
  const age = getTicketAgeDays(ticket);
  const remaining = sla - age;
  const isBreach = ticket.status !== 'resolved' && remaining < 0;
  const dueLabel = ticket.status === 'resolved'
    ? `Resolved in ${age < 1 ? `${Math.max(1, Math.round(age * 24))}h` : `${age.toFixed(1)}d`}`
    : remaining < 0
      ? `${Math.abs(remaining).toFixed(1)}d overdue`
      : remaining < 1
        ? `${Math.max(1, Math.round(remaining * 24))}h left`
        : `${remaining.toFixed(1)}d left`;
  return { slaDays: sla, ageDays: age, remainingDays: remaining, isBreach, dueLabel };
};

export const searchTickets = (tickets, query) => {
  const q = (query || '').trim().toLowerCase();
  if (!q) return tickets;
  return tickets.filter((t) =>
    [t.ticketNumber, t.title, t.studentName, t.studentId, t.category, t.details, t.purposeOfVisit, t.assignedStaff]
      .filter(Boolean).join(' ').toLowerCase().includes(q)
  );
};

export const getUpcomingAppointments = (tickets, email) => {
  const list = tickets.filter((t) =>
    (!email || t.studentEmail === email) &&
    t.status === 'scheduled' && t.preferredMeetingSlot
  );
  return list.sort((a, b) => new Date(a.preferredMeetingSlot) - new Date(b.preferredMeetingSlot)).slice(0, 5);
};

export const exportTicketsCsv = (tickets) => {
  const headers = ['Ticket ID', 'Student', 'Student ID', 'Title', 'Category', 'Urgency', 'Status', 'SLA', 'Officer', 'Filed'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = tickets.map((t) => [
    t.ticketNumber, esc(t.studentName), t.studentId, esc(t.title), esc(t.category),
    t.urgency, t.status, getSlaInfo(t).dueLabel, esc(t.assignedStaff),
    t.createdAt ? new Date(t.createdAt).toLocaleDateString() : ''
  ]);
  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

export const downloadCsv = (filename, csvText) => {
  const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename;
  document.body.appendChild(link); link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 800);
};

// Comprehensive Analytics calculation
export const getPortalAnalytics = () => {
  const tickets = getTickets();
  const students = getStudents();
  const ratings = getRatings();

  const totalTickets = tickets.length;
  const submittedTickets = tickets.filter(t => t.status === 'submitted').length;
  const underReviewTickets = tickets.filter(t => t.status === 'under_review').length;
  const scheduledTickets = tickets.filter(t => t.status === 'scheduled').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const pendingTickets = submittedTickets + underReviewTickets;

  const resolutionRate = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;

  // Category breakdown
  const categoryCounts = {};
  tickets.forEach(t => {
    categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
  });

  // Urgency breakdown
  const urgencyCounts = { urgent: 0, high: 0, medium: 0, low: 0 };
  tickets.forEach(t => {
    if (urgencyCounts[t.urgency] !== undefined) {
      urgencyCounts[t.urgency] += 1;
    }
  });

  // Average rating
  const avgRating = ratings.length > 0 
    ? (ratings.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / ratings.length).toFixed(1)
    : '4.8';

  return {
    totalTickets,
    submittedTickets,
    underReviewTickets,
    scheduledTickets,
    resolvedTickets,
    pendingTickets,
    resolutionRate,
    avgWaitTimeHours: '3.2 hrs',
    avgResolutionDays: '1.4 days',
    categoryCounts,
    urgencyCounts,
    avgRating,
    totalRatings: ratings.length,
    totalStudents: students.length
  };
};
