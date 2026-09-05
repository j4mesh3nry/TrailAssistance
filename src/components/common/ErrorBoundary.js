import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Zero-config showcase: log locally, never crash the demo
    // eslint-disable-next-line no-console
    console.warn('TrailAssistance recovered from a view error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    try {
      window.location.href = '/landing';
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="card-modern" style={{ maxWidth: 480, padding: 28, textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.25rem', marginBottom: 8 }}>Something didn&apos;t load</h1>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.875rem', marginBottom: 16 }}>
              The demo recovered safely. Your local showcase data is intact.
            </p>
            <button type="button" className="btn-primary" onClick={this.handleReset}>
              Return to Campus Portal
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
