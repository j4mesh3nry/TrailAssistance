import React from 'react';
import { Check, Clock, Search, CalendarCheck, BadgeCheck } from 'lucide-react';

const STAGES = [
  { key: 'submitted', label: 'Submitted', desc: 'Logged in queue', Icon: Clock },
  { key: 'under_review', label: 'Under review', desc: 'Officer triage', Icon: Search },
  { key: 'scheduled', label: 'Scheduled', desc: 'Visit confirmed', Icon: CalendarCheck },
  { key: 'resolved', label: 'Resolved', desc: 'Signed & closed', Icon: BadgeCheck }
];

const order = { submitted: 0, under_review: 1, scheduled: 2, resolved: 3 };

export const LifecycleBar = ({ status }) => {
  const idx = order[status] ?? 0;
  return (
    <div className="t-life" role="list" aria-label={`Lifecycle: ${status}`}>
      {STAGES.map((s, i) => {
        const cls = i < idx ? 'done' : i === idx ? 'now' : '';
        const Icon = i < idx ? Check : s.Icon;
        return (
          <div key={s.key} role="listitem" aria-current={i === idx ? 'step' : undefined} className={`t-life-step ${cls}`}>
            <span className="t-life-dot"><Icon size={16} aria-hidden="true" /></span>
            <span className="t-life-name">{s.label}</span>
            <span className="t-life-desc">{s.desc}</span>
          </div>
        );
      })}
    </div>
  );
};

export default LifecycleBar;
