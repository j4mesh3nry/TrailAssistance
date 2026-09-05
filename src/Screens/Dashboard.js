import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, FilePlus2, Inbox, CalendarClock, User, Star } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import CommandPalette from '../components/common/CommandPalette';
import ToastContainer from '../components/common/ToastContainer';
import OverviewView from '../components/student/OverviewView';
import NewTicketForm from '../components/student/NewTicketForm';
import MyTicketsView from '../components/student/MyTicketsView';
import AppointmentsView from '../components/student/AppointmentsView';
import StudentProfileView from '../components/student/StudentProfileView';
import WebsiteFeedbackView from '../components/student/WebsiteFeedbackView';
import { usePortal } from '../context/PortalContext';

const TITLES = {
  home: ['Student workspace', 'Home overview'],
  new: ['Student workspace', 'New request wizard'],
  requests: ['Student workspace', 'My requests & tracking'],
  appointments: ['Student workspace', 'Appointments'],
  profile: ['Student workspace', 'Profile & clearance'],
  feedback: ['Student workspace', 'Rate your service'],
};

export const Dashboard = () => {
  const [view, setView] = useState('home');
  const [focusTicket, setFocusTicket] = useState(null);
  const { session } = usePortal();

  if (!session || session.role !== 'student') return <Navigate to="/login" replace />;

  const openTicket = (ticketNumber) => { setFocusTicket(ticketNumber); setView('requests'); };

  const sections = [
    {
      label: 'Workspace', items: [
        { key: 'home', label: 'Home', icon: LayoutDashboard },
        { key: 'new', label: 'New request', icon: FilePlus2 },
        { key: 'requests', label: 'My requests', icon: Inbox, countKey: 'studentActive' },
        { key: 'appointments', label: 'Appointments', icon: CalendarClock },
      ]
    },
    {
      label: 'Account', items: [
        { key: 'profile', label: 'Profile & record', icon: User },
        { key: 'feedback', label: 'Rate service', icon: Star },
      ]
    }
  ];

  const [crumb, title] = TITLES[view] || TITLES.home;

  return (
    <div className="t-shell">
      <a className="t-skip" href="#student-main">Skip to content</a>
      <ToastContainer />
      <CommandPalette onSelectTicket={openTicket} />
      <Sidebar
        title="Student workspace" subtitle="USTP • Student"
        sections={sections} currentView={view} onViewChange={setView}
      />
      <div className="t-main">
        <Navbar crumb={crumb} pageTitle={title} onOpenQueue={openTicket} />
        <main className="t-page" id="student-main">
          {view === 'home' && <OverviewView onNavigate={setView} onOpenTicket={openTicket} />}
          {view === 'new' && <NewTicketForm onNavigate={setView} onCreated={openTicket} />}
          {view === 'requests' && <MyTicketsView onNavigate={setView} focusTicket={focusTicket} clearFocus={() => setFocusTicket(null)} />}
          {view === 'appointments' && <AppointmentsView onNavigate={setView} />}
          {view === 'profile' && <StudentProfileView />}
          {view === 'feedback' && <WebsiteFeedbackView />}
        </main>
        <nav className="t-bottomnav" aria-label="Student">
          {[
            { key: 'home', label: 'Home', Icon: LayoutDashboard },
            { key: 'new', label: 'New', Icon: FilePlus2 },
            { key: 'requests', label: 'Requests', Icon: Inbox },
            { key: 'appointments', label: 'Visits', Icon: CalendarClock },
            { key: 'profile', label: 'Profile', Icon: User },
          ].map((b) => (
            <button key={b.key} type="button" className={view === b.key ? 'active' : ''} onClick={() => setView(b.key)} aria-current={view === b.key ? 'page' : undefined}>
              <b.Icon size={20} aria-hidden="true" /><span>{b.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
