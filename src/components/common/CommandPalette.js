import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortal } from '../../context/PortalContext';
import { searchTickets } from '../../services/portalStorage';
import { Search, Ticket, User, LayoutDashboard, Inbox, MonitorSmartphone, X } from 'lucide-react';

export const CommandPalette = ({ onSelectTicket }) => {
  const { commandOpen, setCommandOpen, tickets, students, globalQuery, setGlobalQuery } = usePortal();
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (commandOpen) { setQ(globalQuery || ''); }
  }, [commandOpen, globalQuery]);

  const results = useMemo(() => {
    const hits = searchTickets(tickets, q).slice(0, 6);
    const stHits = (students || []).filter((s) =>
      !q || `${s.name} ${s.studentId} ${s.program}`.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 3);
    return { hits, stHits };
  }, [tickets, students, q]);

  if (!commandOpen) return null;

  const close = () => { setCommandOpen(false); setGlobalQuery(q); };

  return (
    <div className="t-backdrop center" onClick={close} role="presentation">
      <div className="t-command" role="dialog" aria-modal="true" aria-label="Global search" onClick={(e) => e.stopPropagation()}>
        <div className="t-command-input">
          <Search size={17} aria-hidden="true" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ticket #, student, concern…" aria-label="Search" />
          <button type="button" className="t-icon-btn" onClick={close} aria-label="Close search" style={{ width: 32, height: 32 }}><X size={15} aria-hidden="true" /></button>
        </div>
        <div className="t-command-list">
          <button type="button" className="t-command-item" onClick={() => { close(); navigate('/dashboard'); }}><LayoutDashboard size={15} aria-hidden="true" /> Go to Student Home</button>
          <button type="button" className="t-command-item" onClick={() => { close(); navigate('/admin'); }}><Inbox size={15} aria-hidden="true" /> Go to Dean Queue</button>
          <button type="button" className="t-command-item" onClick={() => { close(); navigate('/kiosk'); }}><MonitorSmartphone size={15} aria-hidden="true" /> Go to Lobby Kiosk</button>
          {results.hits.map((t) => (
            <button key={t.id} type="button" className="t-command-item" onClick={() => { close(); if (onSelectTicket) onSelectTicket(t.ticketNumber); }}>
              <Ticket size={15} aria-hidden="true" />
              <span style={{ minWidth: 0 }}><strong>{t.ticketNumber}</strong> — {t.title}<br /><span style={{ fontWeight: 500, fontSize: '0.72rem', color: 'var(--t-slate-500)' }}>{t.studentName} • {t.status.replace('_', ' ')}</span></span>
            </button>
          ))}
          {results.stHits.map((s) => (
            <button key={s.id} type="button" className="t-command-item" onClick={close}>
              <User size={15} aria-hidden="true" />
              <span><strong>{s.name}</strong> <span style={{ fontWeight: 500, fontSize: '0.72rem', color: 'var(--t-slate-500)' }}>{s.studentId} • {s.program}</span></span>
            </button>
          ))}
          {results.hits.length === 0 && q && <p style={{ padding: '12px', fontSize: '0.8rem', color: 'var(--t-slate-500)' }}>No matches for “{q}”. Try a ticket # like TKT-8491 or a name.</p>}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
