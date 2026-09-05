import React, { useState } from 'react';
import { Award, BookOpen, ShieldCheck, Save, Phone, MapPin } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { PageHeader } from '../common/PageHeader';

export const StudentProfileView = () => {
  const { activeUser, showToast, tickets } = usePortal();
  const [contact, setContact] = useState({
    phone: activeUser?.phone || '+63 912 345 6789',
    emergency: 'M. Morgan (Guardian) — +63 922 111 2233',
    address: 'CDO Campus Dorm, Block C Rm 412',
    goals: 'Finish Capstone II, clear graduation audit, ship portfolio.'
  });

  const mine = tickets.filter((t) => t.studentEmail === activeUser?.email);
  const cleared = mine.filter((t) => t.status === 'resolved').length;
  const active = mine.filter((t) => t.status !== 'resolved');
  const clearance = [
    { name: 'Advising & curriculum check', state: active.length ? 'In review' : 'Cleared', ok: !active.length },
    { name: 'Library clearance', state: 'Cleared', ok: true },
    { name: 'Accounts ledger', state: 'Cleared', ok: true },
    { name: 'Laboratory safety', state: 'Cleared', ok: true },
    { name: 'Registrar diploma audit', state: cleared ? 'On track' : 'Pending filing', ok: !!cleared },
  ];

  return (
    <div>
      <PageHeader kicker="SIS record • editable contact block" title="Profile & academic record" sub="Credentials on the left, clearance and contact preferences on the right." />
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 14 }} className="t-profile-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="t-card t-card-pad" style={{ textAlign: 'center' }}>
            <span className="t-avatar lg" aria-hidden="true">{activeUser?.avatar || 'AM'}</span>
            <h2 style={{ fontSize: '1.2rem', marginTop: 10 }}>{activeUser?.name}</h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--t-slate-500)' }}>{activeUser?.studentId} • {activeUser?.email}</p>
            <p style={{ marginTop: 8 }}><span className="t-badge t-status-resolved"><Award size={12} aria-hidden="true" /> {activeUser?.academicStanding || "Dean's Lister"}</span></p>
            <dl style={{ textAlign: 'left', marginTop: 14, fontSize: '0.8rem', display: 'grid', gridTemplateColumns: '110px 1fr', gap: '7px 10px' }}>
              <dt style={{ color: 'var(--t-slate-500)' }}>Program</dt><dd><strong>{activeUser?.program}</strong></dd>
              <dt style={{ color: 'var(--t-slate-500)' }}>College</dt><dd>{activeUser?.college}</dd>
              <dt style={{ color: 'var(--t-slate-500)' }}>Year</dt><dd>{activeUser?.yearOfStudy}</dd>
              <dt style={{ color: 'var(--t-slate-500)' }}>Adviser</dt><dd>{activeUser?.advisor}</dd>
              <dt style={{ color: 'var(--t-slate-500)' }}>GPA</dt><dd><strong>{activeUser?.gpa || '3.88'} / 4.0</strong></dd>
            </dl>
          </div>
          <div className="t-card t-card-pad">
            <h3 className="t-section-title" style={{ display: 'flex', gap: 8, alignItems: 'center' }}><BookOpen size={15} aria-hidden="true" /> Degree audit</h3>
            <p className="t-section-sub">118 / 132 units • 89% complete</p>
            <div className="t-bar-track"><div className="t-bar-fill" style={{ width: '89%' }} /></div>
            <p style={{ fontSize: '0.75rem', color: 'var(--t-slate-500)', marginTop: 8 }}>14 capstone + elective units to June 2027 commencement.</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
          <div className="t-card t-card-pad">
            <h3 className="t-section-title" style={{ display: 'flex', gap: 8, alignItems: 'center' }}><ShieldCheck size={16} aria-hidden="true" /> Graduation clearance</h3>
            <p className="t-section-sub">{clearance.filter((c) => c.ok).length} of {clearance.length} cleared</p>
            {clearance.map((c) => (
              <div key={c.name} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 12px', border: '1px solid var(--t-line)', borderRadius: 10, marginBottom: 8, background: c.ok ? '#f0fdf4' : '#fffbeb' }}>
                <span style={{ flex: 1, fontSize: '0.82rem', fontWeight: 600 }}>{c.name}</span>
                <span className={`t-badge ${c.ok ? 't-status-resolved' : 't-status-under_review'}`}>{c.state}</span>
              </div>
            ))}
          </div>
          <div className="t-card t-card-pad">
            <h3 className="t-section-title">Contact & emergency</h3>
            <p className="t-section-sub">Saved on this device.</p>
            <form onSubmit={(e) => { e.preventDefault(); showToast('Contact preferences saved', 'success'); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="t-field" style={{ margin: 0 }}>
                  <label className="t-label" htmlFor="p-phone">Mobile</label>
                  <div className="t-input-icon"><Phone size={15} aria-hidden="true" /><input id="p-phone" className="t-input" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></div>
                </div>
                <div className="t-field" style={{ margin: 0 }}>
                  <label className="t-label" htmlFor="p-em">Emergency contact</label>
                  <input id="p-em" className="t-input" value={contact.emergency} onChange={(e) => setContact({ ...contact, emergency: e.target.value })} />
                </div>
              </div>
              <div className="t-field" style={{ marginTop: 10 }}>
                <label className="t-label" htmlFor="p-addr">Campus address</label>
                <div className="t-input-icon"><MapPin size={15} aria-hidden="true" /><input id="p-addr" className="t-input" value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} /></div>
              </div>
              <div className="t-field">
                <label className="t-label" htmlFor="p-goals">Goals & bio</label>
                <textarea id="p-goals" className="t-textarea" rows={3} value={contact.goals} onChange={(e) => setContact({ ...contact, goals: e.target.value })} />
              </div>
              <button type="submit" className="t-btn t-btn-primary"><Save size={15} aria-hidden="true" /> Save changes</button>
            </form>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 980px){ .t-profile-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

export default StudentProfileView;

