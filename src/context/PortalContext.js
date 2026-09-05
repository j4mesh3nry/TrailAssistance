import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  resetDemoData
} from '../services/portalStorage';
import { DEMO_PERSONAS } from '../services/mockData';

const PortalContext = createContext();

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};

export const PortalProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  
  // Active Persona: 'student' | 'admin' | 'kiosk'
  const [personaType, setPersonaType] = useState(() => {
    return localStorage.getItem('trail_active_persona_type') || 'student';
  });

  const [activeUser, setActiveUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEMO_PERSONAS.student;
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Reload everything from storage
  const reloadData = useCallback(() => {
    const s = getStudents();
    const t = getTickets();
    const r = getRatings();
    const a = getPortalAnalytics();
    setStudents(s);
    setTickets(t);
    setRatings(r);
    setAnalytics(a);
  }, []);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  // Persona switching
  const switchPersona = useCallback((newType) => {
    setPersonaType(newType);
    localStorage.setItem('trail_active_persona_type', newType);
    
    let personaObj;
    if (newType === 'admin') {
      personaObj = DEMO_PERSONAS.admin;
      showToast('Switched to Dean Persona: Dr. Sarah Vance', 'info');
    } else if (newType === 'kiosk') {
      personaObj = DEMO_PERSONAS.kiosk;
      showToast('Switched to Dean\'s Office Kiosk Terminal Mode', 'info');
    } else {
      personaObj = DEMO_PERSONAS.student;
      showToast('Switched to Student Persona: Alex Morgan', 'info');
    }
    setActiveUser(personaObj);
    localStorage.setItem('currentUser', JSON.stringify(personaObj));
  }, [showToast]);

  // Actions
  const handleCreateTicket = useCallback((ticketData) => {
    const created = createTicket(ticketData);
    reloadData();
    showToast(`Ticket #${created.ticketNumber} submitted successfully!`, 'success');
    return created;
  }, [reloadData, showToast]);

  const handleUpdateStatus = useCallback((ticketId, newStatus, resolutionNote, actorName) => {
    const updated = updateTicketStatus(ticketId, newStatus, resolutionNote, actorName);
    reloadData();
    showToast(`Ticket status updated to ${newStatus.replace('_', ' ').toUpperCase()}`, 'info');
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
    showToast('Administrative note added to timeline', 'success');
    return updated;
  }, [reloadData, showToast]);

  const handleAddStudentReply = useCallback((ticketId, replyText, studentName) => {
    const updated = addStudentReplyNote(ticketId, replyText, studentName);
    reloadData();
    showToast('Reply added to ticket timeline', 'success');
    return updated;
  }, [reloadData, showToast]);

  const handleDeleteTicket = useCallback((ticketId) => {
    deleteTicket(ticketId);
    reloadData();
    showToast('Ticket removed from archive', 'info');
  }, [reloadData, showToast]);

  const handleSubmitRating = useCallback((ratingData) => {
    const created = addRating(ratingData);
    reloadData();
    showToast('Thank you! Your feedback has been registered.', 'success');
    return created;
  }, [reloadData, showToast]);

  const handleResetDemoData = useCallback(() => {
    const data = resetDemoData();
    setStudents(data.students);
    setTickets(data.tickets);
    setRatings(data.ratings);
    setAnalytics(getPortalAnalytics());
    showToast('Demo dataset reset to default state!', 'success');
  }, [showToast]);

  const value = {
    students,
    tickets,
    ratings,
    analytics: analytics || getPortalAnalytics(),
    personaType,
    activeUser,
    setActiveUser,
    switchPersona,
    handleCreateTicket,
    handleUpdateStatus,
    handleAssignStaff,
    handleAddStaffNote,
    handleAddStudentReply,
    handleDeleteTicket,
    handleSubmitRating,
    handleResetDemoData,
    reloadData,
    toasts,
    showToast,
    removeToast
  };

  return (
    <PortalContext.Provider value={value}>
      {children}
    </PortalContext.Provider>
  );
};
