import React, { useState, useMemo } from 'react';
import { Search, User, Trash2 } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { deleteStudent } from '../../services/portalStorage';
import { PageHeader, EmptyState } from '../common/PageHeader';

export const StudentDirectoryView = () => {
  const { students, tickets, reloadData, showToast } = usePortal();
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return students;
    return students.filter((s) => `${s.name} ${s.studentId} ${s.program} ${s.email}`.toLowerCase().includes(query));
  }, [students, q]);

  const open = students.find((s) => s.id === openId) || null;
  const openTickets = open ? tickets.filter((t) => t.studentEmail === open.email || t.studentId === open.studentId) : [];

  return (
    <div>
      <PageHeader kicker={`${students.length} enrolled in showcase`} title="Student directory" sub="360° view — record, open requests, standing. Search is instant." />
      <div className="t-card t-card-pad" style={{ marginBottom: 12 }}>
        <div className="t-input-icon">
          <Search size={16} aria-hidden="true" />
          <input className="t-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, ID, program…" aria-label="Search students" />
        </div>
      </div>
      {filtered.length === 0 && <EmptyState icon={User} title="No students match" body="Try a partial name or ID — e.g. “Alex” or “2024-”." />}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {filtered.map((s) => {
          const n = tickets.filter((t) => t.studentEmail === s.email).length;
          const openN = tickets.filter((t) => t.studentEmail === s.email && t.status !== 'resolved').length;
          return (
            <button key={s.id} type="button" onClick={() => setOpenId(s.id)} className="t-card t-card-pad t-card-hover" style={{ textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span className="t-avatar" aria-hidden="true">{s.avatar}</span>
                <div style={{ minWidth: 0 }}>
                  <strong style={{ fontSize: '0.86rem', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--t-slate-500)' }}>{s.studentId} • {s.program}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                <span className="t-badge t-status-submitted">{s.academicStanding || 'Good Standing'}</span>
                <span className={`t-badge ${openN ? 't-status-under_review' : 't-status-resolved'}`}>{openN} open • {n} total</span>
              </div>
            </button>
          );
        })}
      </div>
      {open && (
        <div className="t-backdrop center" onClick={() => setOpenId(null)}>
          <div className="t-modal" role="dialog" aria-modal="true" aria-label={`${open.name} record`} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span className="t-avatar lg" aria-hidden="true">{open.avatar}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.15rem' }}>{open.name}</h2>
                <p style={{ fontSize: '0.78rem', color: 'var(--t-slate-500)' }}>{open.studentId} • {open.program} • {open.yearOfStudy}</p>
                <p style={{ fontSize: '0.76rem', color: 'var(--t-slate-500)' }}>{open.email} • Adviser: {open.advisor} • GPA {open.gpa}</p>
              </div>
            </div>
            <h3 className="t-section-title" style={{ marginTop: 16 }}>Requests ({openTickets.length})</h3>
            {openTickets.length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--t-slate-500)' }}>No requests filed — a clean slate.</p>}
            {openTickets.map((t) => (
              <div key={t.id} style={{ padding: '9px 0', borderBottom: '1px solid var(--t-line-2)', fontSize: '0.8rem' }}>
                <strong>{t.ticketNumber}</strong> — {t.title} <span style={{ color: 'var(--t-slate-500)' }}>• {t.status.replace('_', ' ')}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                type="button" className="t-btn t-btn-danger t-btn-sm"
                onClick={() => { if (window.confirm(`Remove ${open.name} from showcase?`)) { deleteStudent(open.id); reloadData(); setOpenId(null); showToast('Student removed from showcase', 'info'); } }}
              >
                <Trash2 size={14} aria-hidden="true" /> Remove
              </button>
              <button type="button" className="t-btn t-btn-secondary t-btn-sm" onClick={() => setOpenId(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDirectoryView;
