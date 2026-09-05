import React, { useState } from 'react';
import { LayoutDashboard, Inbox, Users, Star, Download, RotateCcw } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import CommandPalette from '../components/common/CommandPalette';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';
import ExecutiveMetricsView from '../components/admin/ExecutiveMetricsView';
import TicketManagementView from '../components/admin/TicketManagementView';
import StudentDirectoryView from '../components/admin/StudentDirectoryView';
import RatingsAnalyticsView from '../components/admin/RatingsAnalyticsView';
import { usePortal } from '../context/PortalContext';
import { downloadCsv, exportTicketsCsv } from '../services/portalStorage';

const TITLES = {
  command: ['Dean console', 'Command overview'],
  queue: ['Dean console', 'Triage queue'],
  students: ['Dean console', 'Student directory'],
  insights: ['Dean console', 'Satisfaction insights'],
};

export const Admin = () => {
  const [view, setView] = useState('command');
  const [focusTicket, setFocusTicket] = useState(null);
  const { tickets, showToast, handleResetDemoData } = usePortal();

  const openTicket = (ticketNumber) => { setFocusTicket(ticketNumber); setView('queue'); };
  const exportAll = () => {
    downloadCsv(`TrailAssistance_ledger_${new Date().toISOString().slice(0, 10)}.csv`, exportTicketsCsv(tickets));
    showToast('Ledger exported — CSV downloaded', 'success');
  };

  const sections = [
    {
      label: 'Operations', items: [
        { key: 'command', label: 'Command', icon: LayoutDashboard },
        { key: 'queue', label: 'Triage queue', icon: Inbox, countKey: 'adminActive' },
      ]
    },
    {
      label: 'People & proof', items: [
        { key: 'students', label: 'Students', icon: Users },
        { key: 'insights', label: 'Insights', icon: Star },
      ]
    }
  ];

  const [crumb, title] = TITLES[view];

  return (
    <div className="t-shell">
      <a className="t-skip" href="#admin-main">Skip to content</a>
      <ToastContainer />
      <DemoRoleSwitcher />
      <CommandPalette onSelectTicket={openTicket} />
      <Sidebar
        title="Dean console" subtitle="USTP • Operations"
        sections={sections} currentView={view} onViewChange={setView}
        footer={
          <>
            <button type="button" className="t-nav-btn" onClick={exportAll}><Download size={16} aria-hidden="true" /><span>Export ledger</span></button>
            <button type="button" className="t-nav-btn" onClick={handleResetDemoData}><RotateCcw size={16} aria-hidden="true" /><span>Reset demo</span></button>
          </>
        }
      />
      <div className="t-main">
        <Navbar crumb={crumb} pageTitle={title} onOpenQueue={openTicket} />
        <main className="t-page" id="admin-main">
          {view === 'command' && <ExecutiveMetricsView onOpenQueue={() => setView('queue')} onOpenTicket={openTicket} />}
          {view === 'queue' && <TicketManagementView focusTicket={focusTicket} clearFocus={() => setFocusTicket(null)} />}
          {view === 'students' && <StudentDirectoryView />}
          {view === 'insights' && <RatingsAnalyticsView />}
        </main>
        <nav className="t-bottomnav" aria-label="Dean">
          {[
            { key: 'command', label: 'Command', Icon: LayoutDashboard },
            { key: 'queue', label: 'Queue', Icon: Inbox },
            { key: 'students', label: 'Students', Icon: Users },
            { key: 'insights', label: 'Insights', Icon: Star },
          ].map((b) => (
            <button key={b.key} type="button" className={view === b.key ? 'active' : ''} onClick={() => setView(b.key)}>
              <b.Icon size={20} aria-hidden="true" /><span>{b.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Admin;
