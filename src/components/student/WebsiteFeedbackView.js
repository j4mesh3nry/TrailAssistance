import React, { useState } from 'react';
import { Star, Send, BadgeCheck } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { PageHeader } from '../common/PageHeader';

const TAGS = ['Fast triage', 'Clear updates', 'Kind staff', 'Easy booking', 'Signed memo'];

export const WebsiteFeedbackView = () => {
  const { activeUser, handleSubmitRating, ratings } = usePortal();
  const [score, setScore] = useState(5);
  const [category, setCategory] = useState('Dean’s Office Visit');
  const [text, setText] = useState('');
  const [tags, setTags] = useState(['Fast triage']);
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    handleSubmitRating({
      studentName: activeUser?.name, studentEmail: activeUser?.email, studentId: activeUser?.studentId,
      rating: score, category, feedback: `${text || 'Great service.'} [${tags.join(', ')}]`
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="t-card t-empty">
        <span className="t-kpi-icon" style={{ background: '#ecfdf5', color: '#047857', width: 56, height: 56 }}><BadgeCheck size={28} aria-hidden="true" /></span>
        <h3>Salamat — feedback recorded</h3>
        <p>Your rating feeds the live satisfaction board.</p>
        <button type="button" className="t-btn t-btn-secondary" onClick={() => setDone(false)}>Rate again</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <PageHeader kicker="Closes the loop" title="Rate your service" sub="Takes 20 seconds. Powers the public satisfaction proof on the landing page." />
      <form onSubmit={submit} className="t-card t-card-pad">
        <div style={{ textAlign: 'center', background: '#f8fafc', border: '1px solid var(--t-line)', borderRadius: 14, padding: 18 }}>
          <strong style={{ fontSize: '0.86rem' }}>Overall — how did we do?</strong>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 10 }} role="radiogroup" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" role="radio" aria-checked={score === n} onClick={() => setScore(n)} aria-label={`${n} stars`} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <Star size={32} aria-hidden="true" style={{ color: n <= score ? '#f59e0b' : '#e2e8f0', fill: n <= score ? '#f59e0b' : 'none' }} />
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--t-slate-500)', marginTop: 6 }}>{score} / 5 — {score >= 4 ? 'Loved it' : score === 3 ? 'It was okay' : 'Needs work'}</p>
        </div>
        <div className="t-field" style={{ marginTop: 14 }}>
          <label className="t-label" htmlFor="fb-cat">Service touched</label>
          <select id="fb-cat" className="t-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Dean’s Office Visit</option>
            <option>Enrollment & Overload</option>
            <option>Clearance & Graduation</option>
            <option>Financial Aid</option>
            <option>Lobby Kiosk</option>
          </select>
        </div>
        <div className="t-field">
          <span className="t-label">What stood out? (tap all that apply)</span>
          <div className="t-chip-row">
            {TAGS.map((t) => (
              <button key={t} type="button" className={`t-chip ${tags.includes(t) ? 'selected' : ''}`} onClick={() => setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])}>{t}</button>
            ))}
          </div>
        </div>
        <div className="t-field">
          <label className="t-label" htmlFor="fb-text">Tell us more</label>
          <textarea id="fb-text" className="t-textarea" value={text} onChange={(e) => setText(e.target.value)} placeholder="What helped? What should be faster next time?" />
        </div>
        <button type="submit" className="t-btn t-btn-gold" style={{ width: '100%' }}><Send size={15} aria-hidden="true" /> Submit feedback</button>
        <p style={{ fontSize: '0.72rem', color: 'var(--t-slate-500)', textAlign: 'center', marginTop: 10 }}>{ratings.length} verified student reviews</p>
      </form>
    </div>
  );
};

export default WebsiteFeedbackView;


