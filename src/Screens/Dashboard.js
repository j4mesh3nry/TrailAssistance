import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';
import OverviewView from '../components/student/OverviewView';
import NewTicketForm from '../components/student/NewTicketForm';
import MyTicketsView from '../components/student/MyTicketsView';
import StudentProfileView from '../components/student/StudentProfileView';
import WebsiteFeedbackView from '../components/student/WebsiteFeedbackView';

export const Dashboard = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getPageTitle = () => {
    switch (currentView) {
      case 'overview': return 'Student Overview';
      case 'newTicket': return 'File Academic Concern';
      case 'myTickets': return 'My Concerns & Tickets';
      case 'profile': return 'Student Profile';
      case 'feedback': return 'Service Feedback';
      default: return 'Student Portal';
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
        mode="student"
      />

      {/* Main Content Area */}
      <div className="app-portal-main">
        <Navbar
          pageTitle={getPageTitle()}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        <main style={{ flex: 1, paddingBottom: '80px' }}>
          {currentView === 'overview' && (
            <OverviewView onNavigate={setCurrentView} />
          )}
          {currentView === 'newTicket' && (
            <NewTicketForm onNavigate={setCurrentView} />
          )}
          {currentView === 'myTickets' && (
            <MyTicketsView onNavigate={setCurrentView} />
          )}
          {currentView === 'profile' && (
            <StudentProfileView />
          )}
          {currentView === 'feedback' && (
            <WebsiteFeedbackView />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;