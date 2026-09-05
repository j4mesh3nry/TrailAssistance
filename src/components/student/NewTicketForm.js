import React, { useState, useEffect, useMemo } from 'react';
import { GraduationCap, Wallet, BadgeCheck, BookOpen, LifeBuoy, HeartHandshake, ArrowRight, ArrowLeft, Send, Save, Eraser } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { PageHeader } from '../common/PageHeader';
import StatusBadge from '../common/StatusBadge';

const CATS = [
  { id: 'Academic Advising', label: 'Advising', desc: 'Waivers, degree audit, course planning', Icon: GraduationCap, bg: '#eef2ff', fg: '#4338ca' },
  { id: 'Financial Aid & Scholarships', label: 'Aid & grants', desc: 'Emergency grants, appeals, stipends', Icon: Wallet, bg: '#ecfdf5', fg: '#047857' },
  { id: 'Clearance & Graduation', label: 'Clearance', desc: 'Sign-offs, holds, diplomas', Icon: BadgeCheck, bg: '#f0f9ff', fg: '#0369a1' },
  { id: 'Enrollment & Registration', label: 'Enrollment', desc: 'Add/drop, overload, cross-enroll', Icon: BookOpen, bg: '#fffbeb', fg: '#b45309' },
  { id: 'Student Grievance & Appeal', label: 'Grievance', desc: 'Grade disputes, mediation', Icon: LifeBuoy, bg: '#fff1f2', fg: '#be123c' },
  { id: 'Special Accommodation', label: 'Accommodation', desc: 'Medical, access, lab extensions', Icon: HeartHandshake, bg: '#f5f3ff', fg: '#7c3aed' },
];

const URG = [
  { id: 'low', label: 'Low', sla: '5–7 days', desc: 'Planning ahead' },
  { id: 'medium', label: 'Medium', sla: '3–4 days', desc: 'Standard petition' },
  { id: 'high', label: 'High', sla: '24–48h', desc: 'Registration at risk' },
  { id: 'urgent', label: 'Urgent', sla: 'Same-day', desc: 'Graduation / emergency' },
];

const MODES = ["Dean's Office (Room 302B)", 'Virtual Zoom Consultation', 'Advising Center (Desk 4)', 'Records review (async)'];

const blank = {
  category: 'Academic Advising', title: '', purposeOfVisit: '',
  urgency: 'medium', preferredMeetingSlot: '', meetingMode: MODES[0], preferredContact: 'University Email',
  details: '', attachTranscript: true, attachAudit: true
};

const quickSlot = (dayOffset, h, m) => {
  const d = new Date(); d.setDate(d.getDate() + dayOffset); d.setHours(h, m, 0, 0);
  if (d < new Date()) d.setDate(d.getDate() + 1);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const NewTicketForm = ({ onNavigate, onCreated }) => {
  const { activeUser, handleCreateTicket, draft, saveDraft, showToast } = usePortal();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(draft || blank);
  const [errs, setErrs] = useState({});

  useEffect(() => { if (draft) showToast('Draft restored — pick up where you left off', 'info'); }, []); // eslint-disable-line
  useEffect(() => {
    const id = setTimeout(() => {
      const dirty = form.title || form.details || form.purposeOfVisit;
      if (dirty && step < 4) saveDraft(form);
    }, 600);
    return () => clearTimeout(id);
  }, [form, step, saveDraft]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target?.value ?? e }));
  const slaPreview = useMemo(() => URG.find((u) => u.id === form.urgency)?.sla || '', [form.urgency]);

  const valid1 = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Give it a clear subject';
    if (!form.purposeOfVisit.trim()) e.purpose = 'What should the Dean approve or decide?';
    setErrs(e); return !Object.keys(e).length;
  };
  const valid2 = () => {
    const e = {};
    if (!form.preferredMeetingSlot) e.slot = 'Pick a slot — or tap a quick window';
    setErrs(e); return !Object.keys(e).length;
  };
  const valid3 = () => {
    const e = {};
    if (!form.details.trim() || form.details.length < 20) e.details = 'Add context (min 20 chars) — courses, dates, what you need';
    setErrs(e); return !Object.keys(e).length;
  };

  const next = () => {
    if (step === 1 && valid1()) setStep(2);
    else if (step === 2 && valid2()) setStep(3);
    else if (step === 3 && valid3()) setStep(4);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!valid3()) { setStep(3); return; }
    const created = handleCreateTicket({
      studentId: activeUser?.studentId, studentName: activeUser?.name,
      studentEmail: activeUser?.email, studentProgram: activeUser?.program,
      ...form,
      additionalInfo: {
        year: activeUser?.yearOfStudy, sla: slaPreview,
        docs: [form.attachTranscript && 'Unofficial transcript', form.attachAudit && 'Degree-audit sheet'].filter(Boolean).join(' + ') || 'None'
      }
    });
    if (onCreated) onCreated(created.ticketNumber);
    else onNavigate('requests');
  };

  return (
    <div>
      <PageHeader
        kicker="Wizard • autosaves as draft"
        title="File a request the Dean can act on"
        sub="Four short steps. We show the SLA up front so you know exactly how fast to expect movement."
        actions={draft ? <button type="button" className="t-btn t-btn-ghost t-btn-sm" onClick={() => { saveDraft(null); setForm(blank); setStep(1); }}><Eraser size={14} aria-hidden="true" /> Discard draft</button> : null}
      />

      <div className="t-card t-card-pad" style={{ marginBottom: 14 }}>
        <div className="t-steps" aria-label={`Step ${step} of 4`}>
          {['Category', 'Schedule', 'Narrative', 'Review'].map((label, i) => {
            const n = i + 1;
            return (
              <React.Fragment key={label}>
                <div className={`t-step ${step === n ? 'active' : step > n ? 'done' : ''}`}>
                  <span className="t-step-num">{step > n ? '✓' : n}</span> {label}
                </div>
                {n < 4 && <div className={`t-step-line ${step > n ? 'done' : ''}`} />}
              </React.Fragment>
            );
          })}
        </div>

        {step === 1 && (
          <div>
            <span className="t-label" id="cat-label">What’s this about?</span>
            <div className="t-pick-grid" role="radiogroup" aria-labelledby="cat-label">
              {CATS.map((c) => (
                <button key={c.id} type="button" role="radio" aria-checked={form.category === c.id} className={`t-pick ${form.category === c.id ? 'selected' : ''}`} onClick={() => setForm((f) => ({ ...f, category: c.id }))}>
                  <span className="t-pick-icon" style={{ background: c.bg, color: c.fg }}><c.Icon size={22} aria-hidden="true" /></span>
                  <span className="t-pick-text"><strong>{c.label}</strong><span>{c.desc}</span></span>
                </button>
              ))}
            </div>
            <div className="t-form-2col" style={{ marginTop: 14 }}>
              <div className="t-field" style={{ margin: 0 }}>
                <label className="t-label" htmlFor="f-title">Subject <span className="t-req">*</span></label>
                <input id="f-title" className="t-input" value={form.title} onChange={set('title')} placeholder="e.g. Capstone II prerequisite override" />
                {errs.title && <span className="t-err">{errs.title}</span>}
              </div>
              <div className="t-field" style={{ margin: 0 }}>
                <label className="t-label" htmlFor="f-purpose">Decision needed <span className="t-req">*</span></label>
                <input id="f-purpose" className="t-input" value={form.purposeOfVisit} onChange={set('purposeOfVisit')} placeholder="e.g. Approve concurrent CS-499 + CS-408" />
                {errs.purpose && <span className="t-err">{errs.purpose}</span>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <span className="t-label">Urgency → SLA <span className="t-badge t-status-scheduled" style={{ marginLeft: 6 }}>{slaPreview}</span></span>
            <div className="t-chip-row" role="radiogroup" aria-label="Urgency">
              {URG.map((u) => (
                <button key={u.id} type="button" role="radio" aria-checked={form.urgency === u.id} className={`t-chip ${form.urgency === u.id ? 'selected' : ''}`} onClick={() => setForm((f) => ({ ...f, urgency: u.id }))} title={u.desc}>
                  {u.label} • {u.sla}
                </button>
              ))}
            </div>
            <div className="t-field" style={{ marginTop: 14 }}>
              <span className="t-label">Quick windows — Dean’s priority hours</span>
              <div className="t-chip-row">
                {[
                  { label: 'Today • 1:30 PM walk-in', v: quickSlot(0, 13, 30) },
                  { label: 'Tomorrow • 9:00 AM', v: quickSlot(1, 9, 0) },
                  { label: 'Tomorrow • 3:00 PM', v: quickSlot(1, 15, 0) },
                ].map((s) => (
                  <button key={s.label} type="button" className="t-chip" onClick={() => setForm((f) => ({ ...f, preferredMeetingSlot: s.v }))}>{s.label}</button>
                ))}
              </div>
            </div>
            <div className="t-form-2col">
              <div className="t-field" style={{ margin: 0 }}>
                <label className="t-label" htmlFor="f-slot">Preferred slot <span className="t-req">*</span></label>
                <input id="f-slot" type="datetime-local" className="t-input" value={form.preferredMeetingSlot} onChange={set('preferredMeetingSlot')} />
                {errs.slot && <span className="t-err">{errs.slot}</span>}
              </div>
              <div className="t-field" style={{ margin: 0 }}>
                <label className="t-label" htmlFor="f-mode">How should we meet?</label>
                <select id="f-mode" className="t-select" value={form.meetingMode} onChange={set('meetingMode')}>
                  {MODES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div className="t-field" style={{ marginTop: 10, marginBottom: 0 }}>
              <label className="t-label" htmlFor="f-contact">Notify me via</label>
              <select id="f-contact" className="t-select" value={form.preferredContact} onChange={set('preferredContact')}>
                <option>University Email</option>
                <option>SMS Notification</option>
                <option>Dean’s Desk Walk-in</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="t-field">
              <label className="t-label" htmlFor="f-details">Tell the story — background, impact, ask <span className="t-req">*</span></label>
              <textarea id="f-details" className="t-textarea" value={form.details} onChange={set('details')} placeholder="Courses affected, deadlines, documents you have, exact relief you’re requesting…" />
              <span className="t-hint">{form.details.length} chars (min 20) • Autosaved <Save size={11} aria-hidden="true" style={{ display: 'inline', verticalAlign: -1 }} /></span>
              {errs.details && <span className="t-err">{errs.details}</span>}
            </div>
            <div className="t-card" style={{ padding: 14, background: '#f8fafc' }}>
              <strong style={{ fontSize: '0.8rem' }}>Attach from SIS (one tap)</strong>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8, fontSize: '0.8rem' }}>
                <input type="checkbox" checked={form.attachTranscript} onChange={(e) => setForm((f) => ({ ...f, attachTranscript: e.target.checked }))} /> Unofficial transcript — {activeUser?.name}
              </label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6, fontSize: '0.8rem' }}>
                <input type="checkbox" checked={form.attachAudit} onChange={(e) => setForm((f) => ({ ...f, attachAudit: e.target.checked }))} /> Degree-audit equivalence sheet
              </label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="t-card" style={{ padding: 16, background: '#f4f7ff', borderColor: '#c7d2fe' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                <span className="t-code">{form.category}</span>
                <span className="t-badge t-urgent-high">{form.urgency} • {slaPreview}</span>
                <StatusBadge status="submitted" />
              </div>
              <h3 style={{ fontSize: '1.05rem' }}>{form.title || '(untitled)'}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--t-slate-600)', marginTop: 4 }}>{form.purposeOfVisit}</p>
              <dl className="t-kv" style={{ marginTop: 12, fontSize: '0.8rem' }}>
                <dt style={{ color: 'var(--t-slate-500)' }}>Student</dt><dd><strong>{activeUser?.name} ({activeUser?.studentId})</strong></dd>
                <dt style={{ color: 'var(--t-slate-500)' }}>Slot</dt><dd><strong>{form.preferredMeetingSlot ? new Date(form.preferredMeetingSlot).toLocaleString() : '—'}</strong> • {form.meetingMode}</dd>
                <dt style={{ color: 'var(--t-slate-500)' }}>Contact</dt><dd>{form.preferredContact}</dd>
                <dt style={{ color: 'var(--t-slate-500)' }}>Docs</dt><dd>{[form.attachTranscript && 'Transcript', form.attachAudit && 'Audit sheet'].filter(Boolean).join(' + ') || 'None'}</dd>
              </dl>
              <p style={{ fontSize: '0.8rem', color: 'var(--t-slate-700)', marginTop: 10, background: '#fff', border: '1px solid var(--t-line)', borderRadius: 10, padding: 10 }}>{form.details}</p>
            </div>
          </div>
        )}

        <form onSubmit={submit}>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', marginTop: 18, flexWrap: 'wrap' }}>
            <button type="button" className="t-btn t-btn-secondary" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
              <ArrowLeft size={15} aria-hidden="true" /> Back
            </button>
            {step < 4
              ? <button type="button" className="t-btn t-btn-primary" onClick={next}>Continue <ArrowRight size={15} aria-hidden="true" /></button>
              : <button type="submit" className="t-btn t-btn-gold"><Send size={15} aria-hidden="true" /> Submit to Dean’s queue</button>}
          </div>
        </form>
      </div>
      <p style={{ fontSize: '0.74rem', color: 'var(--t-slate-500)' }}>Drafts never leave this browser. Submitting creates a live ticket with an audit trail staff can act on immediately.</p>
    </div>
  );
};

export default NewTicketForm;



