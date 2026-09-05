import React, { useMemo } from 'react';
import { Inbox, Clock, BadgeCheck, Star, Siren, ArrowRight, TrendingUp } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { PageHeader } from '../common/PageHeader';
import StatusBadge from '../common/StatusBadge';
import UrgencyBadge from '../common/UrgencyBadge';
import { getSlaInfo } from '../../services/portalStorage';

export const ExecutiveMetricsView = ({ onOpenQueue, onOpenTicket }) => {
  const { analytics, tickets, ratings } = usePortal();

  const breaches = useMemo(() => tickets.filter((t) => t.status !== 'resolved' && getSlaInfo(t).isBreach), [tickets]);
  const urgentOpen = useMemo(() => tickets.filter((t) => t.status !== 'resolved' && (t.urgency === 'urgent' || t.urgency === 'high')), [tickets]);
  const recent = useMemo(() => [...tickets].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5), [tickets]);
  const cats = Object.entries(analytics?.categoryCounts || {}).sort((a, b) => b[1] - a[1]);
  const maxCat = Math.max(1, ...cats.map(([, n]) => n));

  return (
    <div>
      <PageHeader
        kicker="Live • A.Y. 2026–2027"
        title="Morning briefing for the Dean"
        sub="What needs you first, where the queue stands, and what students are saying — in one screen."
        actions={
          <>
            <button type="button" className="t-btn t-btn-primary" onClick={onOpenQueue}><Inbox size={16} aria-hidden="true" /> Open triage ({analytics?.pendingTickets ?? 0})</button>
          </>
        }
      />

      {breaches.length > 0 && (
        <div className="t-card t-card-pad" role="alert" style={{ marginBottom: 12, borderColor: '#fecdd3', background: '#fff1f2', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="t-kpi-icon" style={{ background: '#be123c', color: '#fff' }}><Siren size={18} aria-hidden="true" /></span>
          <div style={{ flex: '1 1 260px' }}>
            <strong style={{ fontSize: '0.88rem' }}>{breaches.length} SLA breach{breaches.length > 1 ? 'es' : ''} need a decision today</strong>
            <p style={{ fontSize: '0.78rem', color: '#881337' }}>{breaches.slice(0, 3).map((t) => t.ticketNumber).join(' • ')}{breaches.length > 3 ? ` +${breaches.length - 3} more` : ''}</p>
          </div>
          <button type="button" className="t-btn t-btn-danger t-btn-sm" onClick={onOpenQueue}>Triage now <ArrowRight size={14} aria-hidden="true" /></button>
        </div>
      )}

      <div className="t-grid-kpi">
        {[
          { label: 'Total requests', num: analytics?.totalTickets ?? 0, sub: 'Across 6 categories', tag: '+12% this term', cls: 't-trend-up', Icon: Inbox, bg: '#eef2ff', fg: '#4338ca' },
          { label: 'Needs triage', num: analytics?.pendingTickets ?? 0, sub: `${analytics?.submittedTickets ?? 0} new • ${analytics?.underReviewTickets ?? 0} in review`, tag: `${urgentOpen.length} urgent/high`, cls: 't-trend-warn', Icon: Clock, bg: '#fffbeb', fg: '#b45309' },
          { label: 'Resolution rate', num: `${analytics?.resolutionRate ?? 0}%`, sub: `${analytics?.resolvedTickets ?? 0} signed & closed`, tag: '+4.2 vs SLA', cls: 't-trend-up', Icon: BadgeCheck, bg: '#ecfdf5', fg: '#047857' },
          { label: 'Satisfaction', num: `★ ${analytics?.avgRating ?? '4.8'}`, sub: `${ratings.length} verified reviews`, tag: '98% positive', cls: 't-trend-up', Icon: Star, bg: '#f0f9ff', fg: '#0369a1' },
        ].map((k) => (
          <div key={k.label} className="t-card t-kpi">
            <div className="t-kpi-top"><span className="t-kpi-label">{k.label}</span><span className="t-kpi-icon" style={{ background: k.bg, color: k.fg }}><k.Icon size={18} aria-hidden="true" /></span></div>
            <div className="t-kpi-num">{k.num}</div>
            <div className="t-kpi-sub">{k.sub}</div>
            <div style={{ marginTop: 8 }}><span className={`t-kpi-trend ${k.cls}`}><TrendingUp size={11} aria-hidden="true" style={{ display: 'inline', verticalAlign: -1 }} /> {k.tag}</span></div>
          </div>
        ))}
      </div>

      <div className="t-grid-2">
        <div className="t-card t-card-pad">
          <h3 className="t-section-title">Demand by category</h3>
          <p className="t-section-sub">Where to staff office hours next week.</p>
          {cats.map(([name, n]) => (
            <div key={name} className="t-bar-row">
              <span className="t-bar-name">{name}</span>
              <span className="t-bar-track"><span className="t-bar-fill" style={{ width: `${(n / maxCat) * 100}%` }} /></span>
              <span className="t-bar-val">{n} • {Math.round((n / (analytics?.totalTickets || 1)) * 100)}%</span>
            </div>
          ))}
          <h3 className="t-section-title" style={{ marginTop: 16 }}>Urgency mix</h3>
          <div className="t-chip-row" style={{ marginTop: 8 }}>
            {['urgent', 'high', 'medium', 'low'].map((u) => (
              <span key={u} className={`t-badge t-urgent-${u}`}>{u}: {analytics?.urgencyCounts?.[u] ?? 0}</span>
            ))}
          </div>
        </div>
        <div className="t-card t-card-pad">
          <h3 className="t-section-title">Fresh intake — act or assign</h3>
          <p className="t-section-sub">Most recently touched requests.</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recent.map((t) => (
              <button key={t.id} type="button" onClick={() => onOpenTicket(t.ticketNumber)} style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'none', border: 'none', borderBottom: '1px solid var(--t-line-2)', padding: '10px 2px', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="t-code">{t.ticketNumber}</span><StatusBadge status={t.status} /><UrgencyBadge urgency={t.urgency} />
                  </span>
                  <span className="t-cell-main" style={{ marginTop: 4, fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</span>
                  <span className="t-cell-sub">{t.studentName} • {t.assignedStaff}</span>
                </span>
                <ArrowRight size={15} aria-hidden="true" style={{ color: '#94a3b8', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveMetricsView;
