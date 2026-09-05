import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import SignUp from './Screens/Signup';
import Login from './Screens/Login';
import Landing from './Screens/Landing';
import Dashboard from './Screens/Dashboard';
import Admin from './Screens/Admin';
import Kiosk from './Screens/Kiosk';
import { PortalProvider } from './context/PortalContext';
import { AuthProvider } from './Screens/Auth/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import ToastContainer from './components/common/ToastContainer';
import './styles/designSystem.css';
import './styles/trail2.css';
import './App.css';

const NotFound = () => (
  <div className="t-landing" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
    <ToastContainer />
    <div className="t-card t-card-pad" style={{ maxWidth: 460, textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem' }}>Off the trail?</h1>
      <p style={{ color: 'var(--t-slate-500)', marginTop: 8 }}>That page doesn’t exist. Head back to the campus gateway — your demo data is safe.</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
        <Link to="/landing" className="t-btn t-btn-primary">Campus portal</Link>
        <Link to="/dashboard" className="t-btn t-btn-secondary">Student home</Link>
      </div>
    </div>
  </div>
);

function Chrome() {
  useEffect(() => {
    document.body.classList.add('trail2');
    return () => document.body.classList.remove('trail2');
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <PortalProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Chrome />
          </Router>
        </AuthProvider>
      </PortalProvider>
    </ErrorBoundary>
  );
}

export default App;
