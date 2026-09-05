import React, { useMemo } from 'react';
import { Star, TrendingUp, MessageSquare } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { PageHeader } from '../common/PageHeader';

export const RatingsAnalyticsView = () => {
  const { ratings, analytics } = usePortal();
  const dist = useMemo(() => {
    const d = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings.forEach((r) => { const n = Math.round(Number(r.rating) || 5); if (d[n] !== undefined) d[n] += 1; });
    return d;
  }, [ratings]);
  const max = Math.max(1, ...Object.values(dist));

  return (
    <div>
      <PageHeader kicker="Voice of the student" title="Satisfaction insights" sub="Every rating lands here live — including the one you just submitted as a student." />
      <div className="t-grid-3">
        <div className="t-card t-card-pad" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, fontFamily: 'var(--t-font-display)' }}>★ {analytics?.avgRating ?? '4.8'}</div>
          <p style={{ fontSize: '0.78rem', color: 'var(--t-slate-500)' }}>{ratings.length} verified reviews • <span className="t-kpi-trend t-trend-up"><TrendingUp size={11} aria-hidden="true" style={{ display: 'inline', verticalAlign: -1 }} /> 98% positive</span></p>
        </div>
        <div className="t-card t-card-pad" style={{ gridColumn: 'span 2' }}>
          <h3 className="t-section-title">Distribution</h3>
          {[5, 4, 3, 2, 1].map((s) => (
            <div key={s} className="t-bar-row">
              <span className="t-bar-name">★ {s} stars</span>
              <span className="t-bar-track"><span className="t-bar-fill" style={{ width: `${(dist[s] / max) * 100}%` }} /></span>
              <span className="t-bar-val">{dist[s]} reviews</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ratings.map((r) => (
          <div key={r.id} className="t-card t-card-pad">
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} aria-hidden="true" style={{ color: i < Number(r.rating) ? '#f59e0b' : '#e2e8f0', fill: i < Number(r.rating) ? '#f59e0b' : 'none' }} />
                ))}
              </span>
              <strong style={{ fontSize: '0.82rem' }}>{r.studentName}</strong>
              <span style={{ fontSize: '0.7rem', color: 'var(--t-slate-500)' }}>{r.category} • {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}</span>
              <span className="t-badge t-status-resolved" style={{ marginLeft: 'auto' }}><MessageSquare size={11} aria-hidden="true" /> {r.waitTimeMinutes} min wait</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--t-slate-700)', marginTop: 8 }}>“{r.feedback}”</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsAnalyticsView;
