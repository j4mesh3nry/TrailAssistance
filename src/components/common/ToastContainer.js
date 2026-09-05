import React from 'react';
import { usePortal } from '../../context/PortalContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

const ICONS = { success: CheckCircle2, info: Info, warn: AlertTriangle, error: AlertTriangle };

export const ToastContainer = () => {
  const { toasts, removeToast } = usePortal();
  if (!toasts?.length) return null;
  return (
    <div className="t-toasts" role="status" aria-live="polite">
      {toasts.map((t) => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div key={t.id} className={`t-toast ${t.type}`}>
            <Icon size={17} aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ flex: 1 }}>{t.message}</span>
            <button
              type="button" onClick={() => removeToast(t.id)} aria-label="Dismiss notification"
              style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 2 }}
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
