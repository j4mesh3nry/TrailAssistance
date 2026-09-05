import React from 'react';
import { usePortal } from '../../context/PortalContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = usePortal();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isAlert = toast.type === 'alert';

        return (
          <div key={toast.id} className={`toast-item toast-${toast.type}`}>
            {isSuccess && <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />}
            {isAlert && <AlertTriangle size={18} style={{ color: '#f43f5e', flexShrink: 0 }} />}
            {!isSuccess && !isAlert && <Info size={18} style={{ color: '#6366f1', flexShrink: 0 }} />}
            
            <span style={{ flex: 1 }}>{toast.message}</span>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                padding: '2px'
              }}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
