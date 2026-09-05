import React from 'react';
import { Check, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import './styles/LifecycleBar.css';

const STAGES = [
  { key: 'submitted', label: 'Submitted', description: 'Ticket logged in queue', icon: Clock },
  { key: 'under_review', label: 'Under Review', description: 'Advising evaluation', icon: AlertCircle },
  { key: 'scheduled', label: 'Scheduled', description: 'Consultation confirmed', icon: Calendar },
  { key: 'resolved', label: 'Resolved', description: 'Action signed & archived', icon: CheckCircle2 }
];

export const LifecycleBar = ({ status, compact = false }) => {
  const getStageIndex = (s) => {
    switch (s) {
      case 'submitted': return 0;
      case 'under_review': return 1;
      case 'scheduled': return 2;
      case 'resolved': return 3;
      default: return 0;
    }
  };

  const currentIndex = getStageIndex(status);

  return (
    <div className={`lifecycle-wrapper ${compact ? 'compact' : ''}`}>
      <div className="lifecycle-track">
        {/* Progress Line */}
        <div 
          className="lifecycle-progress-line"
          style={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
        />
        
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;
          const Icon = stage.icon;

          return (
            <div 
              key={stage.key} 
              className={`lifecycle-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isUpcoming ? 'upcoming' : ''}`}
            >
              <div className="step-circle">
                {isCompleted ? (
                  <Check size={compact ? 12 : 16} strokeWidth={2.8} />
                ) : (
                  <Icon size={compact ? 12 : 16} strokeWidth={2} />
                )}
                {isCurrent && <span className="step-pulse-ring" />}
              </div>
              
              {!compact && (
                <div className="step-label-group">
                  <span className="step-label">{stage.label}</span>
                  <span className="step-desc">{stage.description}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LifecycleBar;
