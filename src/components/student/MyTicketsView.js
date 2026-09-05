import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Send, X, Star, Clock } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import StatusBadge from '../common/StatusBadge';
import UrgencyBadge from '../common/UrgencyBadge';
import LifecycleBar from '../common/LifecycleBar';
import { PageHeader, EmptyState } from '../common/PageHeader';
import { getSlaInfo } from '../../services/portalStorage';

const STATUSES = ['all', 'submitted', 'under_review', 'scheduled', 'resolved'];

export const MyTicketsView = ({ onNavigate, focusTicket, clearFocus }) => {
  const { tickets, activeUser, handleAddStudentReply, handleSubmitRating } = usePortal();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [openId, setOpenId] = useState(null);
  const [reply, setReply] = useState('');
  const [rate, setRate] = useState(0);

  const mine = useMemo(() => tickets.filter((t) => t.studentEmail === activeUser?.email), [tickets, activeUser]);
  const filtered = useMemo(() => mine.filter((t) => {
    const hay = `${t.ticketNumber} ${t.title} ${t.details} ${t.category}`.toLowerCase();
    return (!q || hay.includes(q.toLowerCase())) && (status === 'all' || t.status === status);
  }), [mine, q, status]);

  useEffect(() => {
    if (focusTicket) {
      const hit = mine.find((t) => t.ticketNumber === focusTicket || t.id === focusTicket);
      if (hit) { setOpenId(hit.id); setQ(''); setStatus('all'); }
      if (clearFocus) clearFocus();
    }
  }, [focusTicket]); // eslint-disable-line

  const open = filtered.find((t) => t.id === openId) || null;

  const sendReply = () => {
    if (!reply.trim() || !open) return;
    handleAddStudentReply(open.id, reply.trim(), activeUser?.name);
    setReply('');
  };

  const submitRating = () => {
    if (!rate || !open) return;
    handleSubmitRating({ studentName: activeUser?.name, studentEmail: activeUser?.email, studentId: activeUser?.studentId, rating: rate, category: open.category, feedback: `Rated ${open.ticketNumber} — ${open.title}` });
    setRate(0);
  };

  return (
    <div>
      <PageHeader
        kicker={`${mine.length} total • ${mine.filter((t) => t.status !== 'resolved').length} active`}
        title="My requests & live tracking"
        sub="Every handoff, owner change and memo — timestamped. Reply inline; rate when resolved."
        actions={<button type="button" className="t-btn t-btn-gold" onClick={() => onNavigate('new')}><Plus size={16} aria-hidden="true" /> New request</button>}
      />

      <div className="t-card t-card-pad" style={{ marginBottom: 12 }}>
        <div className="t-input-icon">
          <Search size={16} aria-hidden="true" />
          <input className="t-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ticket #, course, keyword…" aria-label="Search my requests" />
        </div>
        <div className="t-chip-row" style={{ marginTop: 10 }} role="group" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <button key={s} type="button" className={`t-chip ${status === s ? 'selected' : ''}`} onClick={() => setStatus(s)}>
              {s === 'all' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <EmptyState
          icon={Search} title="Nothing matches"
          body="Clear the search or file a fresh request — it takes about three minutes."
          action={<button type="button" className="t-btn t-btn-secondary" onClick={() => { setQ(''); setStatus('all'); }}>Reset filters</button>}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((t) => {
          const sla = getSlaInfo(t);
          return (
            <button key={t.id} type="button" onClick={() => setOpenId(t.id)} className="t-card t-card-pad t-card-hover" style={{ textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="t-code">{t.ticketNumber}</span>
                <StatusBadge status={t.status} />
                <UrgencyBadge urgency={t.urgency} />
                <span className={`t-badge ${sla.isBreach ? 't-breach' : 't-status-submitted'}`}><Clock size={11} aria-hidden="true" /> {sla.dueLabel}</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--t-slate-500)' }}>{new Date(t.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
              </div>
              <h3 style={{ margin: '8px 0 2px', fontSize: '1rem' }}>{t.title}</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--t-slate-500)' }}>{t.category} • {t.assignedStaff}</p>
              <div style={{ background: '#f8fafc', border: '1px solid var(--t-line)', borderRadius: 10, padding: '8px 12px', marginTop: 10 }}>
                <LifecycleBar status={t.status} />
              </div>
            </button>
          );
        })}
      </div>

      {open && (
        <div className="t-backdrop" onClick={() => setOpenId(null)}>
          <div className="t-drawer" role="dialog" aria-modal="true" aria-label={`${open.ticketNumber} detail`} onClick={(e) => e.stopPropagation()}>
            <div className="t-drawer-head">
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="t-code">{open.ticketNumber}</span>
                  <StatusBadge status={open.status} />
                  <UrgencyBadge urgency={open.urgency} />
                </div>
                <h2 style={{ fontSize: '1.1rem', marginTop: 8 }}>{open.title}</h2>
                <p style={{ fontSize: '0.76rem', color: 'var(--t-slate-500)', marginTop: 2 }}>{open.studentName} • {open.category} • Owner: {open.assignedStaff}</p>
              </div>
              <button type="button" className="t-icon-btn" onClick={() => setOpenId(null)} aria-label="Close detail"><X size={17} aria-hidden="true" /></button>
            </div>
            <div className="t-drawer-body">
              <LifecycleBar status={open.status} />
              <h3 className="t-section-title" style={{ marginTop: 14 }}>Concern statement</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--t-slate-700)', background: '#f8fafc', border: '1px solid var(--t-line)', borderRadius: 10, padding: 12 }}>{open.details}</p>
              <dl className="t-kv" style={{ marginTop: 12, fontSize: '0.78rem' }}>
                <dt style={{ color: 'var(--t-slate-500)' }}>Decision needed</dt><dd><strong>{open.purposeOfVisit || '—'}</strong></dd>
                <dt style={{ color: 'var(--t-slate-500)' }}>Slot</dt><dd>{open.preferredMeetingSlot ? new Date(open.preferredMeetingSlot).toLocaleString() : 'Pending'} • {open.meetingMode}</dd>
                <dt style={{ color: 'var(--t-slate-500)' }}>SLA</dt><dd>{getSlaInfo(open).dueLabel}</dd>
              </dl>
              {open.resolutionNotes && (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 10, padding: 12, marginTop: 12 }}>
                  <strong style={{ fontSize: '0.78rem', color: '#065f46' }}>Official resolution</strong>
                  <p style={{ fontSize: '0.82rem', color: '#064e3b', marginTop: 4 }}>{open.resolutionNotes}</p>
                </div>
              )}
              <h3 className="t-section-title" style={{ marginTop: 16 }}>Audit trail</h3>
              <div className="t-timeline" style={{ marginTop: 8 }}>
                {(open.timeline || []).map((e, i) => (
                  <div key={e.id || i} className="t-tl-item">
                    <div className="t-tl-rail"><span className="t-tl-dot" />{i < open.timeline.length - 1 && <span className="t-tl-line" />}</div>
                    <div className="t-tl-body">
                      <div className="t-tl-action">{e.action}</div>
                      <div className="t-tl-meta">{e.actor} • {e.timestamp ? new Date(e.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : ''}</div>
                      <p className="t-tl-note">{e.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              {(open.studentNotes || []).length > 0 && (
                <>
                  <h3 className="t-section-title" style={{ marginTop: 14 }}>My follow-ups</h3>
                  {(open.studentNotes || []).map((r) => (
                    <p key={r.id} style={{ fontSize: '0.8rem', background: '#fff', border: '1px solid var(--t-line)', borderRadius: 10, padding: 10, marginTop: 8 }}>
                      <strong>{r.author}</strong> <span style={{ color: 'var(--t-slate-500)', fontSize: '0.7rem' }}>{new Date(r.timestamp).toLocaleString()}</span><br />{r.text}
                    </p>
                  ))}
                </>
              )}
              {open.status === 'resolved' && (
                <div style={{ marginTop: 14, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 12 }}>
                  <strong style={{ fontSize: '0.82rem' }}>How was the service?</strong>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setRate(n)} aria-label={`Rate ${n} stars`} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                        <Star size={24} aria-hidden="true" style={{ color: n <= rate ? '#f59e0b' : '#e2e8f0', fill: n <= rate ? '#f59e0b' : 'none' }} />
                      </button>
                    ))}
                  </div>
                  <button type="button" className="t-btn t-btn-primary t-btn-sm" style={{ marginTop: 8 }} disabled={!rate} onClick={submitRating}>Submit rating</button>
                </div>
              )}
            </div>
            <div className="t-drawer-foot">
              {open.status !== 'resolved' && (
                <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                  <input className="t-input" value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendReply()} placeholder="Add a follow-up…" aria-label="Add follow-up" />
                  <button type="button" className="t-btn t-btn-primary" onClick={sendReply} aria-label="Send reply"><Send size={15} aria-hidden="true" /></button>
                </div>
              )}
              <button type="button" className="t-btn t-btn-secondary" onClick={() => setOpenId(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTicketsView;

