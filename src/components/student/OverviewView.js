import React, { useMemo } from 'react';
import { FilePlus2, Inbox, CalendarClock, BadgeCheck, Clock, ArrowRight, MapPin, Activity, Star } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import StatusBadge from '../common/StatusBadge';
import UrgencyBadge from '../common/UrgencyBadge';
import LifecycleBar from '../common/LifecycleBar';
import { PageHeader } from '../common/PageHeader';
import { getSlaInfo, getUpcomingAppointments } from '../../services/portalStorage';
import campusImg from '../../assets/ustp.jpg';

export const OverviewView = ({ onNavigate, onOpenTicket }) => {
  const { activeUser, tickets, analytics, ratings } = usePortal();
  const mine = useMemo(() => tickets.filter((t) => t.studentEmail === activeUser?.email), [tickets, activeUser]);
  const active = mine.filter((t) => t.status !== 'resolved');
  const done = mine.filter((t) => t.status === 'resolved');
  const next = getUpcomingAppointments(tickets, activeUser?.email)[0] || null;
  const latest = mine[0] || null;

  const activity = useMemo(() => {
    const ev = [];
    mine.forEach((t) => (t.timeline || []).slice(-2).forEach((e) => ev.push({ ...e, ticketNumber: t.ticketNumber })));
    return ev.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 4);
  }, [mine]);

  const breaches = active.filter((t) => getSlaInfo(t).isBreach);

  return (
    <div>
      <PageHeader
        kicker="USTP CDO • A.Y. 2026–2027"
        title={`Kumusta, ${activeUser?.name?.split(' ')[0] || 'Trailblazer'} — your queue at a glance`}
        sub={`${activeUser?.program || 'BS Computer Science'} • ${activeUser?.yearOfStudy || '4th Year'} • Adviser: ${activeUser?.advisor || 'Dr. Sarah Vance'}`}
        actions={
          <>
            <button type="button" className="t-btn t-btn-gold" onClick={() => onNavigate('new')}><FilePlus2 size={16} aria-hidden="true" /> New request</button>
            <button type="button" className="t-btn t-btn-secondary" onClick={() => onNavigate('requests')}><Inbox size={16} aria-hidden="true" /> Track ({active.length})</button>
          </>
        }
      />

      {/* hero with campus */}
      <div className="t-card t-card-pad" style={{ position: 'relative', overflow: 'hidden', marginBottom: 14, borderColor: '#0a1930' }}>
        <img src={campusImg} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }} loading="lazy" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(10,25,48,0.94), rgba(20,54,92,0.72) 55%, rgba(20,54,92,0.25))' }} aria-hidden="true" />
        <div style={{ position: 'relative', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ minWidth: 240, flex: '1 1 420px' }}>
            <span className="t-badge t-status-scheduled"><MapPin size={11} aria-hidden="true" /> Dean’s Office • Rm 302B • Lapasan, CDO</span>
            <h2 style={{ color: '#fff', fontSize: '1.35rem', marginTop: 10 }}>File once. Watch it move. Leave with a signature.</h2>
            <p style={{ color: '#c6d3e8', fontSize: '0.85rem', marginTop: 6, maxWidth: 560 }}>Every request gets Submitted → Under review → Scheduled → Resolved with an SLA clock, an owner, and an audit trail you can show anyone.</p>
            {breaches.length > 0 && <p style={{ marginTop: 8 }}><span className="t-badge t-breach">{breaches.length} SLA breach — nudge the desk</span></p>}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, padding: '12px 16px', minWidth: 150 }}>
              <div style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.07em', color: '#93a5c4' }}>STANDING</div>
              <div style={{ color: '#fff', fontWeight: 800 }}>{activeUser?.academicStanding || "Dean's Lister"}</div>
              <div style={{ color: '#ffd66b', fontWeight: 800, fontSize: '1.3rem', marginTop: 4 }}>{activeUser?.gpa || '3.88'} <span style={{ fontSize: '0.7rem', color: '#93a5c4' }}>/ 4.0</span></div>
            </div>
            <div style={{ background: '#ffd66b', borderRadius: 14, padding: '12px 16px', minWidth: 150, color: '#0a1930' }}>
              <div style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.07em' }}>NEXT VISIT</div>
              <div style={{ fontWeight: 800, marginTop: 2 }}>{next ? new Date(next.preferredMeetingSlot).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'None booked'}</div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600 }}>{next ? next.meetingMode : 'Book from a request'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="t-grid-kpi">
        {[
          { label: 'In queue', num: active.length, sub: breaches.length ? `${breaches.length} breaching SLA` : 'All within SLA', trend: breaches.length ? 'SLA watch' : 'Healthy', cls: breaches.length ? 't-trend-warn' : 't-trend-up', Icon: Clock, bg: '#fffbeb', fg: '#b45309' },
          { label: 'Resolved', num: done.length, sub: 'Signed memos in archive', trend: `${analytics?.resolutionRate ?? 0}% portal-wide`, cls: 't-trend-up', Icon: BadgeCheck, bg: '#ecfdf5', fg: '#047857' },
          { label: 'Next visit', num: next ? new Date(next.preferredMeetingSlot).toLocaleDateString([], { month: 'short', day: 'numeric' }) : '—', sub: next ? next.ticketNumber : 'No appointment yet', trend: next ? 'Confirmed' : 'Book one', cls: 't-trend-up', Icon: CalendarClock, bg: '#f0f9ff', fg: '#0369a1' },
          { label: 'Satisfaction', num: `★ ${analytics?.avgRating ?? '4.8'}`, sub: `${ratings.length} verified reviews`, trend: 'Loved', cls: 't-trend-up', Icon: Star, bg: '#eef2ff', fg: '#4338ca' },
        ].map((k) => (
          <div key={k.label} className="t-card t-kpi">
            <div className="t-kpi-top"><span className="t-kpi-label">{k.label}</span><span className="t-kpi-icon" style={{ background: k.bg, color: k.fg }}><k.Icon size={18} aria-hidden="true" /></span></div>
            <div className="t-kpi-num">{k.num}</div>
            <div className="t-kpi-sub">{k.sub}</div>
            <div style={{ marginTop: 8 }}><span className={`t-kpi-trend ${k.cls}`}>{k.trend}</span></div>
          </div>
        ))}
      </div>

      <div className="t-grid-2">
        <div className="t-card t-card-pad">
          <h3 className="t-section-title">Spotlight — latest request</h3>
          <p className="t-section-sub">Your most recent filing with live lifecycle.</p>
          {!latest && <p style={{ fontSize: '0.84rem', color: 'var(--t-slate-500)' }}>No requests yet. File your first in ~3 minutes.</p>}
          {latest && (
            <>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="t-code">{latest.ticketNumber}</span>
                <StatusBadge status={latest.status} />
                <UrgencyBadge urgency={latest.urgency} />
                <span className="t-badge t-status-submitted">{getSlaInfo(latest).dueLabel}</span>
              </div>
              <h4 style={{ margin: '10px 0 4px', fontSize: '1.02rem', color: 'var(--t-navy-950)' }}>{latest.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--t-slate-500)' }}>{latest.category} • Owner: {latest.assignedStaff}</p>
              <div style={{ background: '#f8fafc', border: '1px solid var(--t-line)', borderRadius: 12, padding: '10px 14px', marginTop: 12 }}>
                <LifecycleBar status={latest.status} />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                <button type="button" className="t-btn t-btn-primary t-btn-sm" onClick={() => onOpenTicket(latest.ticketNumber)}>Open tracker <ArrowRight size={14} aria-hidden="true" /></button>
                <button type="button" className="t-btn t-btn-secondary t-btn-sm" onClick={() => onNavigate('new')}>File another</button>
              </div>
            </>
          )}
        </div>
        <div className="t-card t-card-pad">
          <h3 className="t-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Activity size={16} aria-hidden="true" /> Recent activity</h3>
          <p className="t-section-sub">Handoffs across all your requests.</p>
          {activity.length === 0 && <p style={{ fontSize: '0.82rem', color: 'var(--t-slate-500)' }}>Quiet for now — activity lands here the moment staff touch a ticket.</p>}
          <div className="t-timeline">
            {activity.map((e, i) => (
              <div key={`${e.ticketNumber}-${i}`} className="t-tl-item">
                <div className="t-tl-rail"><span className="t-tl-dot" /><span className="t-tl-line" /></div>
                <div className="t-tl-body">
                  <div className="t-tl-action">{e.action} • {e.ticketNumber}</div>
                  <div className="t-tl-meta">{e.actor} • {e.timestamp ? new Date(e.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</div>
                  <p className="t-tl-note">{e.note}</p>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="t-btn t-btn-ghost t-btn-sm" onClick={() => onNavigate('requests')}>View all requests <ArrowRight size={14} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
};

export default OverviewView;
