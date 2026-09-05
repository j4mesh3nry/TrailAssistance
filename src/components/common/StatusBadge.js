import React from 'react';

const STATUS_CONFIG = {
  submitted: {
    label: 'Submitted',
    className: 'badge-submitted',
    dotColor: '#64748b'
  },
  under_review: {
    label: 'Under Review',
    className: 'badge-under_review',
    dotColor: '#f59e0b'
  },
  scheduled: {
    label: 'Scheduled',
    className: 'badge-scheduled',
    dotColor: '#0ea5e9'
  },
  resolved: {
    label: 'Resolved',
    className: 'badge-resolved',
    dotColor: '#10b981'
  }
};

export const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.submitted;
  return (
    <span className={`badge ${config.className}`}>
      <span className="badge-dot" style={{ backgroundColor: config.dotColor }} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
