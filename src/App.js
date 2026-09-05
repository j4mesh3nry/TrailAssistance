import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './Screens/Signup';
import Login from './Screens/Login';
import Landing from './Screens/Landing';
import Dashboard from './Screens/Dashboard';
import Admin from './Screens/Admin';
import Kiosk from './Screens/Kiosk';
import { PortalProvider } from './context/PortalContext';
import { AuthProvider } from './Screens/Auth/AuthContext';
import './styles/designSystem.css';
import './App.css';

function App() {
  return (
    <PortalProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/landing" replace />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/kiosk" element={<Kiosk />} />
              <Route path="*" element={<Navigate to="/landing" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </PortalProvider>
  );
}

export default App;