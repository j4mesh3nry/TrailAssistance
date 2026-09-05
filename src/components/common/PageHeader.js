import React from 'react';

export const PageHeader = ({ kicker, title, sub, actions, children }) => (
  <div className="t-page-head">
    <div style={{ minWidth: 0 }}>
      {kicker && <div className="t-crumb" style={{ marginBottom: 6 }}>{kicker}</div>}
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
      {children}
    </div>
    {actions && <div className="t-head-actions">{actions}</div>}
  </div>
);

export const EmptyState = ({ icon: Icon, title, body, action }) => (
  <div className="t-card t-empty">
    {Icon && <Icon size={34} aria-hidden="true" style={{ color: '#94a3b8' }} />}
    <h3>{title}</h3>
    <p>{body}</p>
    {action}
  </div>
);

export default PageHeader;
