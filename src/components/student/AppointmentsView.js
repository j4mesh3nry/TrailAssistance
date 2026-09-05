import React, { useMemo } from 'react';
import { CalendarClock, MapPin, User, ArrowRight } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { PageHeader, EmptyState } from '../common/PageHeader';
import StatusBadge from '../common/StatusBadge';
import { getUpcomingAppointments } from '../../services/portalStorage';

export const AppointmentsView = ({ onNavigate }) => {
  const { tickets, activeUser } = usePortal();
  const upcoming = useMemo(() => getUpcomingAppointments(tickets, activeUser?.email), [tickets, activeUser]);
  const past = useMemo(() => tickets.filter((t) => t.studentEmail === activeUser?.email && t.status === 'resolved').slice(0, 4), [tickets, activeUser]);

  return (
    <div>
      <PageHeader
        kicker="Synced from your scheduled requests"
        title="Appointments & visits"
        sub="Confirmed Dean and advising slots. Show the ticket # at the desk — or pull it up on the lobby kiosk."
        actions={<button type="button" className="t-btn t-btn-secondary" onClick={() => onNavigate('requests')}>Find a slot <ArrowRight size={14} aria-hidden="true" /></button>}
      />
      {upcoming.length === 0 && (
        <EmptyState icon={CalendarClock} title="No visits booked" body="When staff schedule your request, the appointment lands here with room, owner and time." action={<button type="button" className="t-btn t-btn-gold" onClick={() => onNavigate('new')}>File a request</button>} />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {upcoming.map((t) => (
          <div key={t.id} className="t-card t-card-pad" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ background: '#0f2942', color: '#ffd66b', borderRadius: 12, padding: '10px 14px', textAlign: 'center', minWidth: 86 }}>
              <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{new Date(t.preferredMeetingSlot).toLocaleDateString([], { day: 'numeric' })}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>{new Date(t.preferredMeetingSlot).toLocaleDateString([], { month: 'short' })} • {new Date(t.preferredMeetingSlot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
            <div style={{ flex: '1 1 260px', minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="t-code">{t.ticketNumber}</span><StatusBadge status={t.status} />
              </div>
              <h3 style={{ margin: '6px 0 2px', fontSize: '0.98rem' }}>{t.title}</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--t-slate-500)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><MapPin size={13} aria-hidden="true" /> {t.meetingMode}</span>
                <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><User size={13} aria-hidden="true" /> {t.assignedStaff}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {past.length > 0 && (
        <>
          <h3 className="t-section-title" style={{ marginTop: 18 }}>Recent history</h3>
          <div className="t-card" style={{ overflow: 'hidden', marginTop: 8 }}>
            {past.map((t) => (
              <div key={t.id} style={{ padding: '11px 16px', borderBottom: '1px solid var(--t-line-2)', fontSize: '0.8rem', display: 'flex', gap: 10, justifyContent: 'space-between' }}>
                <span><strong>{t.ticketNumber}</strong> — {t.title}</span>
                <span style={{ color: 'var(--t-slate-500)', whiteSpace: 'nowrap' }}>{t.resolvedAt ? new Date(t.resolvedAt).toLocaleDateString() : ''}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentsView;
