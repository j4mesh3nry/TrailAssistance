import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  getStudents,
  getTickets,
  getRatings,
  getPortalAnalytics,
  createTicket,
  updateTicketStatus,
  assignStaffToTicket,
  addStaffAuditNote,
  addStudentReplyNote,
  deleteTicket,
  addRating,
  getSlaInfo
} from '../services/portalStorage';
import { DEMO_PERSONAS } from '../services/mockData';

const PortalContext = createContext();

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) throw new Error('usePortal must be used within a PortalProvider');
  return context;
};

const SESSION_KEY = 'trail_session';
const USER_KEY = 'currentUser';
const DRAFT_KEY = 'trail_request_draft_v2';

const initials = (name) => (name || 'ST').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

const buildUser = (role, { name, email }) => {
  const cleanName = (name || '').trim();
  if (role === 'staff') {
    return {
      ...DEMO_PERSONAS.admin,
      name: cleanName || 'Dean’s Office',
      email: (email || '').trim() || 'dean.office@ustp.edu.ph',
      avatar: initials(cleanName || 'DO')
    };
  }
  if (role === 'kiosk') {
    return { ...DEMO_PERSONAS.kiosk, operator: cleanName || 'Lobby staff' };
  }
  return {
    ...DEMO_PERSONAS.student,
    name: cleanName || 'Student',
    email: (email || '').trim() || 'student@ustp.edu.ph',
    avatar: initials(cleanName || 'ST')
  };
};

export const roleHome = (role) => (role === 'staff' ? '/admin' : role === 'kiosk' ? '/kiosk' : '/dashboard');

export const PortalProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');

  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  const [activeUser, setActiveUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* fresh session */ }
    return null;
  });

  // Role consumed by UI: 'student' | 'staff' | 'kiosk' (null when signed out)
  const personaType = session?.role || null;

  const [draft, setDraft] = useState(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const reloadData = useCallback(() => {
    setStudents(getStudents());
    setTickets(getTickets());
    setRatings(getRatings());
    setAnalytics(getPortalAnalytics());
  }, []);

  useEffect(() => { reloadData(); }, [reloadData]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
      if (e.key === 'Escape') setCommandOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const saveDraft = useCallback((d) => {
    setDraft(d);
    try {
      if (!d) localStorage.removeItem(DRAFT_KEY);
      else localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch { /* private mode */ }
  }, []);

  const signInAs = useCallback((role, { name, email } = {}) => {
    const user = buildUser(role, { name, email });
    const nextSession = { role, name: user.name, email: user.email || '', at: new Date().toISOString() };
    setSession(nextSession);
    setActiveUser(user);
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem('trail_active_persona_type', role);
    } catch { /* private mode */ }
    const first = (user.name || '').split(' ')[0];
    showToast(first ? `Welcome, ${first} — signed in.` : 'Signed in successfully.', 'success');
    return { user, session: nextSession };
  }, [showToast]);

  const signOut = useCallback(() => {
    setSession(null);
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(USER_KEY);
    } catch { /* noop */ }
    showToast('Signed out. See you soon.', 'info');
  }, [showToast]);

  const handleCreateTicket = useCallback((ticketData) => {
    const created = createTicket(ticketData);
    saveDraft(null);
    reloadData();
    showToast(`Request ${created.ticketNumber} filed — track it live`, 'success');
    return created;
  }, [reloadData, showToast, saveDraft]);

  const handleUpdateStatus = useCallback((ticketId, newStatus, resolutionNote, actorName) => {
    const updated = updateTicketStatus(ticketId, newStatus, resolutionNote, actorName);
    reloadData();
    showToast(`Status → ${newStatus.replace('_', ' ')}`, 'info');
    return updated;
  }, [reloadData, showToast]);

  const handleAssignStaff = useCallback((ticketId, staffName, actorName) => {
    const updated = assignStaffToTicket(ticketId, staffName, actorName);
    reloadData();
    showToast(`Assigned to ${staffName}`, 'info');
    return updated;
  }, [reloadData, showToast]);

  const handleAddStaffNote = useCallback((ticketId, noteText, staffName) => {
    const updated = addStaffAuditNote(ticketId, noteText, staffName);
    reloadData();
    showToast('Note added to audit trail', 'success');
    return updated;
  }, [reloadData, showToast]);

  const handleAddStudentReply = useCallback((ticketId, replyText, studentName) => {
    const updated = addStudentReplyNote(ticketId, replyText, studentName);
    reloadData();
    showToast('Reply posted', 'success');
    return updated;
  }, [reloadData, showToast]);

  const handleDeleteTicket = useCallback((ticketId) => {
    deleteTicket(ticketId);
    reloadData();
    showToast('Request archived', 'info');
  }, [reloadData, showToast]);

  const handleSubmitRating = useCallback((ratingData) => {
    const created = addRating(ratingData);
    reloadData();
    showToast('Thanks — feedback recorded', 'success');
    return created;
  }, [reloadData, showToast]);

  const notifications = useMemo(() => {
    if (!session) return [];
    const pool = (tickets || []).filter((t) =>
      session.role === 'staff' ? t.status !== 'resolved' : t.studentEmail === activeUser?.email
    );
    return pool.slice(0, 5).map((t, i) => {
      const last = (t.timeline || [])[(t.timeline || []).length - 1];
      const sla = getSlaInfo(t);
      return {
        id: t.id,
        ticketNumber: t.ticketNumber,
        title: `${t.ticketNumber} • ${t.status.replace('_', ' ')}${sla.isBreach ? ' • SLA breach' : ''}`,
        detail: last ? `${last.action} — ${last.note}` : t.title,
        time: t.updatedAt ? new Date(t.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' }) : '',
        unread: i < 2,
        breach: sla.isBreach
      };
    });
  }, [tickets, session, activeUser]);

  const value = {
    students, tickets, ratings,
    analytics: analytics || { totalTickets: 0, pendingTickets: 0, resolutionRate: 0, avgRating: '4.8', categoryCounts: {}, urgencyCounts: {} },
    session, personaType, activeUser, setActiveUser,
    signInAs, signOut,
    handleCreateTicket, handleUpdateStatus, handleAssignStaff, handleAddStaffNote,
    handleAddStudentReply, handleDeleteTicket, handleSubmitRating,
    reloadData, toasts, showToast, removeToast,
    commandOpen, setCommandOpen, globalQuery, setGlobalQuery,
    notifications, draft, saveDraft
  };

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
};
