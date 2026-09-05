import React from 'react';

const URGENCY_CONFIG = {
  low: {
    label: 'Low Priority',
    className: 'urgency-low',
    icon: '●'
  },
  medium: {
    label: 'Medium',
    className: 'urgency-medium',
    icon: '●'
  },
  high: {
    label: 'High Urgency',
    className: 'urgency-high',
    icon: '▲'
  },
  urgent: {
    label: 'Urgent Action',
    className: 'urgency-urgent',
    icon: '⚡'
  }
};

export const UrgencyBadge = ({ urgency }) => {
  const config = URGENCY_CONFIG[urgency?.toLowerCase()] || URGENCY_CONFIG.medium;
  return (
    <span className={`badge ${config.className}`}>
      <span style={{ fontSize: '0.65rem' }}>{config.icon}</span>
      {config.label}
    </span>
  );
};

export default UrgencyBadge;
