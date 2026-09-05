import React, { useState, useMemo, useEffect } from 'react';
import { Search, Download, X, ShieldCheck, Clock, Trash2, SlidersHorizontal } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import StatusBadge from '../common/StatusBadge';
import UrgencyBadge from '../common/UrgencyBadge';
import LifecycleBar from '../common/LifecycleBar';
import { PageHeader, EmptyState } from '../common/PageHeader';
import { getSlaInfo, downloadCsv, exportTicketsCsv } from '../../services/portalStorage';

const STAFF = [
  'Dr. Sarah Vance (College Dean)', 'Prof. Marcus Thorne (Academic Advisor)',
  'Elena Rostova (Financial Aid Officer)', 'Dr. Eleanor Wu (Science Advisor)',
  'Prof. Arthur Pendelton (Business Advisor)', "Dean's Office Records Clerk", 'Advising Intake Desk'
];

const TEMPLATES = [
  'Approved — registrar notified, clearance updated.',
  'Scheduled — see room/time above; bring ID + printed slip.',
  'Needs document — please attach transcript/audit sheet and reply.',
  'Denied with path — see note for alternative steps and re-file window.',
];

export const TicketManagementView = ({ focusTicket, clearFocus }) => {
  const { tickets, activeUser, handleUpdateStatus, handleAssignStaff, handleAddStaffNote, handleDeleteTicket, showToast } = usePortal();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [urgency, setUrgency] = useState('all');
  const [sort, setSort] = useState('sla');
  const [breachOnly, setBreachOnly] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [dStatus, setDStatus] = useState('');
  const [dStaff, setDStaff] = useState('');
  const [memo, setMemo] = useState('');
  const [note, setNote] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return tickets
      .filter((t) => (!query || `${t.ticketNumber} ${t.studentName} ${t.studentId} ${t.title} ${t.details}`.toLowerCase().includes(query)))
      .filter((t) => status === 'all' || t.status === status)
      .filter((t) => urgency === 'all' || t.urgency === urgency)
      .filter((t) => !breachOnly || (t.status !== 'resolved' && getSlaInfo(t).isBreach))
      .sort((a, b) => {
        if (sort === 'sla') return getSlaInfo(a).remainingDays - getSlaInfo(b).remainingDays;
        if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
        if (sort === 'student') return a.studentName.localeCompare(b.studentName);
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [tickets, q, status, urgency, sort, breachOnly]);

  useEffect(() => {
    if (focusTicket) {
      const hit = tickets.find((t) => t.ticketNumber === focusTicket || t.id === focusTicket);
      if (hit) openTicket(hit);
      if (clearFocus) clearFocus();
    }
  }, [focusTicket]); // eslint-disable-line

  const openTicket = (t) => { setOpenId(t.id); setDStatus(t.status); setDStaff(t.assignedStaff || STAFF[0]); setMemo(t.resolutionNotes || ''); setNote(''); };
  const open = tickets.find((t) => t.id === openId) || null;

  const actorName = activeUser?.name ? `${activeUser.name} (Dean's Office)` : "Dean's Office";
  const save = () => {
    if (!open) return;
    if (dStatus !== open.status || memo !== open.resolutionNotes) handleUpdateStatus(open.id, dStatus, memo, actorName);
    if (dStaff !== open.assignedStaff) handleAssignStaff(open.id, dStaff, actorName);
    if (note.trim()) handleAddStaffNote(open.id, note.trim(), actorName);
    setOpenId(null);
  };

  const exportCsv = () => {
    downloadCsv(`TrailAssistance_queue_${new Date().toISOString().slice(0, 10)}.csv`, exportTicketsCsv(filtered));
    showToast(`Exported ${filtered.length} rows to CSV`, 'success');
  };

  return (
    <div>
      <PageHeader
        kicker={`${filtered.length} shown • sorted by SLA risk`}
        title="Triage queue"
        sub="Breach-first sorting, one-click assign, templated memos. Click any row for the full workspace."
        actions={<button type="button" className="t-btn t-btn-secondary" onClick={exportCsv}><Download size={15} aria-hidden="true" /> Export CSV</button>}
      />

      <div className="t-card t-card-pad" style={{ marginBottom: 12 }}>
        <div className="t-input-icon">
          <Search size={16} aria-hidden="true" />
          <input className="t-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ticket #, student, ID, keyword…" aria-label="Search queue" />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10, alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--t-slate-500)' }}><SlidersHorizontal size={12} aria-hidden="true" style={{ display: 'inline', verticalAlign: -1 }} /> FILTER</span>
          <div className="t-chip-row" role="group" aria-label="Status">
            {['all', 'submitted', 'under_review', 'scheduled', 'resolved'].map((s) => (
              <button key={s} type="button" className={`t-chip ${status === s ? 'selected' : ''}`} onClick={() => setStatus(s)}>{s === 'all' ? 'All' : s.replace('_', ' ')}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8, alignItems: 'center' }}>
          <div className="t-chip-row" role="group" aria-label="Urgency">
            {['all', 'urgent', 'high', 'medium', 'low'].map((u) => (
              <button key={u} type="button" className={`t-chip ${urgency === u ? 'selected' : ''}`} onClick={() => setUrgency(u)}>{u === 'all' ? 'All urgencies' : u}</button>
            ))}
          </div>
          <label style={{ display: 'inline-flex', gap: 7, alignItems: 'center', fontSize: '0.78rem', fontWeight: 700 }}>
            <input type="checkbox" checked={breachOnly} onChange={(e) => setBreachOnly(e.target.checked)} /> Breaches only
          </label>
          <select className="t-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort queue" style={{ width: 'auto', marginLeft: 'auto' }}>
            <option value="sla">Sort: SLA risk</option>
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="student">Sort: Student A–Z</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 && <EmptyState icon={Search} title="Queue is clear for these filters" body="Loosen a filter — or celebrate. A clear queue is the goal." action={<button type="button" className="t-btn t-btn-secondary" onClick={() => { setQ(''); setStatus('all'); setUrgency('all'); setBreachOnly(false); }}>Clear all filters</button>} />}

      <div className="t-card t-table-wrap">
        <table className="t-table">
          <thead><tr><th>Ticket</th><th>Student</th><th>Request</th><th>SLA</th><th>Status</th><th>Owner</th><th><span className="t-visually-hidden">Actions</span></th></tr></thead>
          <tbody>
            {filtered.map((t) => {
              const sla = getSlaInfo(t);
              return (
                <tr key={t.id} className="clickable" onClick={() => openTicket(t)}>
                  <td><span className="t-code">{t.ticketNumber}</span><span className="t-cell-sub">{new Date(t.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span></td>
                  <td><span className="t-cell-main">{t.studentName}</span><span className="t-cell-sub">{t.studentId} • {t.studentProgram}</span></td>
                  <td style={{ maxWidth: 280 }}><span className="t-cell-main" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', maxWidth: 260 }}>{t.title}</span><span className="t-cell-sub">{t.category} • <UrgencyBadge urgency={t.urgency} /></span></td>
                  <td><span className={`t-badge ${sla.isBreach ? 't-breach' : 't-status-submitted'}`}>{sla.dueLabel}</span></td>
                  <td><StatusBadge status={t.status} /></td>
                  <td><span className="t-cell-sub" style={{ maxWidth: 150, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.assignedStaff}</span></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button type="button" className="t-btn t-btn-primary t-btn-sm" onClick={() => openTicket(t)}>Review</button>
                      <button type="button" className="t-icon-btn" style={{ width: 36, height: 36 }} aria-label={`Archive ${t.ticketNumber}`} onClick={() => { if (window.confirm(`Archive ${t.ticketNumber}?`)) handleDeleteTicket(t.id); }}><Trash2 size={15} aria-hidden="true" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="t-backdrop" onClick={() => setOpenId(null)}>
          <div className="t-drawer" role="dialog" aria-modal="true" aria-label={`${open.ticketNumber} workspace`} onClick={(e) => e.stopPropagation()}>
            <div className="t-drawer-head">
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span className="t-code">{open.ticketNumber}</span><StatusBadge status={dStatus} /><UrgencyBadge urgency={open.urgency} />
                </div>
                <h2 style={{ fontSize: '1.05rem', marginTop: 8 }}>{open.title}</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--t-slate-500)' }}>{open.studentName} ({open.studentId}) • {open.studentProgram}</p>
              </div>
              <button type="button" className="t-icon-btn" onClick={() => setOpenId(null)} aria-label="Close"><X size={17} aria-hidden="true" /></button>
            </div>
            <div className="t-drawer-body">
              <LifecycleBar status={dStatus} />
              <p style={{ fontSize: '0.83rem', background: '#f8fafc', border: '1px solid var(--t-line)', borderRadius: 10, padding: 12, marginTop: 12 }}>{open.details}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                <div className="t-field" style={{ margin: 0 }}>
                  <label className="t-label" htmlFor="dq-status">Move lifecycle to</label>
                  <select id="dq-status" className="t-select" value={dStatus} onChange={(e) => setDStatus(e.target.value)}>
                    <option value="submitted">Submitted — intake</option>
                    <option value="under_review">Under review — triaged</option>
                    <option value="scheduled">Scheduled — visit set</option>
                    <option value="resolved">Resolved — signed</option>
                  </select>
                </div>
                <div className="t-field" style={{ margin: 0 }}>
                  <label className="t-label" htmlFor="dq-staff">Owner</label>
                  <select id="dq-staff" className="t-select" value={dStaff} onChange={(e) => setDStaff(e.target.value)}>
                    {STAFF.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="t-field" style={{ marginTop: 12 }}>
                <label className="t-label" htmlFor="dq-memo">Resolution memo (students see this)</label>
                <textarea id="dq-memo" className="t-textarea" rows={3} value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Decision, next steps, reference #…" />
                <div className="t-chip-row" style={{ marginTop: 8 }}>
                  {TEMPLATES.map((tpl) => (
                    <button key={tpl} type="button" className="t-chip" onClick={() => setMemo(tpl)}>{tpl.slice(0, 26)}…</button>
                  ))}
                </div>
              </div>
              <div className="t-field">
                <label className="t-label" htmlFor="dq-note">Internal audit note (staff only in timeline)</label>
                <input id="dq-note" className="t-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Verified syllabus with Math chair…" />
              </div>
              <h3 className="t-section-title" style={{ marginTop: 6 }}><Clock size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: -2 }} /> Audit trail</h3>
              <div className="t-timeline" style={{ marginTop: 8 }}>
                {(open.timeline || []).map((e, i) => (
                  <div key={e.id || i} className="t-tl-item">
                    <div className="t-tl-rail"><span className="t-tl-dot" />{i < open.timeline.length - 1 && <span className="t-tl-line" />}</div>
                    <div className="t-tl-body"><div className="t-tl-action">{e.action}</div><div className="t-tl-meta">{e.actor} • {e.timestamp ? new Date(e.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : ''}</div><p className="t-tl-note">{e.note}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="t-drawer-foot">
              <button type="button" className="t-btn t-btn-secondary" onClick={() => setOpenId(null)}>Cancel</button>
              <button type="button" className="t-btn t-btn-primary" onClick={save}><ShieldCheck size={15} aria-hidden="true" /> Save updates</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagementView;

