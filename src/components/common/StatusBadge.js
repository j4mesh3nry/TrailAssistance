import React from 'react';

const LABELS = {
  submitted: 'Submitted',
  under_review: 'Under review',
  scheduled: 'Scheduled',
  resolved: 'Resolved'
};

export const StatusBadge = ({ status }) => (
  <span className={`t-badge t-status-${status || 'submitted'}`}>
    <span className="t-dot" aria-hidden="true" />
    {LABELS[status] || status}
  </span>
);

export default StatusBadge;
