import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';
import ExecutiveMetricsView from '../components/admin/ExecutiveMetricsView';
import TicketManagementView from '../components/admin/TicketManagementView';
import StudentDirectoryView from '../components/admin/StudentDirectoryView';
import RatingsAnalyticsView from '../components/admin/RatingsAnalyticsView';

export const Admin = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard': return "Executive Metrics & Triage";
      case 'tickets': return "Academic Ticket Operations";
      case 'students': return "Student Directory";
      case 'ratings': return "Service Satisfaction";
      default: return "Dean's Console";
    }
  };

  return (
    <div className="app-portal-layout">
      <ToastContainer />
      <DemoRoleSwitcher />

      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        mode="admin"
      />

      {/* Main Operations Area */}
      <div className="app-portal-main">
        <Navbar
          pageTitle={getPageTitle()}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        <main style={{ flex: 1, paddingBottom: '80px' }}>
          {currentView === 'dashboard' && (
            <ExecutiveMetricsView onNavigate={setCurrentView} />
          )}
          {currentView === 'tickets' && (
            <TicketManagementView />
          )}
          {currentView === 'students' && (
            <StudentDirectoryView />
          )}
          {currentView === 'ratings' && (
            <RatingsAnalyticsView />
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;