import React from 'react';

const LABELS = { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent' };

export const UrgencyBadge = ({ urgency }) => (
  <span className={`t-badge t-urgent-${urgency || 'medium'}`}>
    <span className="t-dot" aria-hidden="true" />
    {LABELS[urgency] || urgency}
  </span>
);

export default UrgencyBadge;
