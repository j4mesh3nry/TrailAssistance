# TrailAssistance 2.0 &bull; USTP Academic Assistance OS

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel%20Production-black?logo=vercel)](https://trail-assistance.vercel.app)
[![React 18](https://img.shields.io/badge/Frontend-React%2018-blue?logo=react)](https://react.dev)
[![React Router 7](https://img.shields.io/badge/Navigation-React%20Router%20v7-red?logo=reactrouter)](https://reactrouter.com)
[![Lucide Icons](https://img.shields.io/badge/Design%20System-Lucide%20Icons-indigo)](https://lucide.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

A complete overhaul of the school project into a flagship **academic assistance OS**: file once, track like a flight, leave with a signature. Students file advising/clearance/aid requests with live SLA clocks; the Dean triages breach-first with templated memos and CSV ledgers; the lobby kiosk checks in walk-ins and prints thermal slips. **Zero-config showcase — fully interactive on static Vercel hosting, no database.**

> **Reviewer fast-path (no passwords):** open `/landing` → bottom-right demo switcher → **Student (Alex)** for filing/tracking, **Dean (Dr. Vance)** for triage/signing, **Kiosk** for check-in/slip. Press **Ctrl K** anywhere for global search. Bottom-right **Reset** restores pristine demo data.

---

## 🌟 Key Architecture & Capabilities

### 1. Visual & Design System Overhaul (Higher-Ed SaaS)
- **Aesthetic**: Tailwind/Shadcn-inspired clean slate & indigo palette, subtle borders, frosted glass cards (`backdrop-filter: blur(16px)`), modern typography, and smooth micro-interactions.
- **Collapsible Responsive Sidebar**: Collapsible navigation with active pills, category badge counters, user profile preview, and quick persona shortcuts.
- **Top Utility Navbar**: Breadcrumb navigation, institutional badge indicators (`Student Portal` vs. `Dean's Console`), real-time campus clock, and interactive notification drawer with unread alerts.
- **100% Fluid Responsiveness**: Designed from the ground up for desktop workstations, tablets, and mobile smartphones without clipping or hidden views.

### 2. Real-Time Student Concern & Ticket Lifecycle Tracker
- **Streamlined 3-Step Ticket Filing**:
  1. **Category & Subject**: Academic Advising, Financial Aid & Grants, Clearance & Graduation, Enrollment & Overload, Grievance & Exam Appeal, and Special Accommodation.
  2. **Urgency & Scheduling**: Low, Medium, High, and Critical / Urgent SLAs with calendar slot picker and meeting mode (In-person Room 302, Virtual Zoom, or Advising Desk).
  3. **Narrative & Records Checklist**: Rich narrative description with auto-attached SIS unofficial transcript verification.
- **Live Lifecycle Progression Bar**:
  $$\text{Submitted} \longrightarrow \text{Under Review} \longrightarrow \text{Scheduled} \longrightarrow \text{Resolved}$$
- **Full Audit Trail & Student Messaging**: Detailed timeline of administrative actions, officer reassignments, status transitions, and two-way follow-up student messaging.

### 3. Dean & Admin Operations Console
- **Executive Operations & Metrics**: Real-time KPI summaries for total inquiries, active queue backlog, resolution efficiency rates, and average wait times.
- **Visual Analytics Breakdown**: Interactive progress distribution charts by concern category and urgency levels.
- **Live Management Data Table**: Search, multi-criteria filtering (status, category, urgency), and sorting.
- **Ticket Detail & Resolution Drawer**: Dean-level resolution workflow enabling officers to change lifecycle status, assign faculty advisors, and issue signed administrative memos.
- **1-Click CSV Ledger Export**: Generate structured CSV reports of student petitions for administrative records.

### 4. Zero-Config Mock Persistence & Recruiter Demo Controls
- **LocalStorage Mock Repository**: Preloaded with **16+ realistic student records**, **18+ active and resolved tickets with full audit timelines**, and verified student feedback reviews.
- **Floating Demo Persona Switcher**: Discreet floating pill allowing recruiters and reviewers to toggle instantly between:
  - 🎓 **Student Persona** (Alex Morgan &bull; BS Computer Science, Senior, Dean's Lister)
  - 🏛️ **Dean Persona** (Dr. Sarah Vance &bull; College Dean, Executive Console)
  - 🖥️ **Lobby Kiosk Terminal** (Self-service touchscreen kiosk with thermal queue ticket slip generator)
- **1-Click "Reset Demo Data"**: Restores the pristine demo dataset at any time.

---

## 🚀 Live Demo Personas

| Role | Name | Email | Purpose |
| :--- | :--- | :--- | :--- |
| **Student** | Alex Morgan | `alex.morgan@demo.edu` | Explore ticket filing, lifecycle progress tracker, and student profile |
| **Dean** | Dr. Sarah Vance | `sarah.vance@university.edu` | Manage live queue, inspect audit logs, and sign official resolutions |
| **Kiosk** | Lobby Terminal #01 | Walk-in Mode | Express touchscreen check-in and printed thermal queue slips |

---

## 🛠️ Technical Stack

- **Core Framework**: React 18.3
- **Routing & History**: React Router DOM v7
- **Icons**: Lucide React
- **Persistence Layer**: Zero-Config LocalStorage Mock Repository (no backend required; Firebase adapter is opt-in only — see `src/firebaseConfig.js`)
- **State Management**: React Context API (`PortalContext`, `AuthContext`)
- **Styling Architecture**: “Trailblazer” Custom CSS Design System — USTP Navy `#0F2942` + Trail Gold `#F2A900`, Inter, CSS Variables, Flexbox/Grid, Frosted Glassmorphism, campus photography (`src/assets/ustp.jpg`)
- **Resilience**: ErrorBoundary + ScrollToTop, keyboard-accessible filing wizard, live ticket-driven notifications, print-ready kiosk slips

---

## 💻 Local Setup & Development

```bash
# Clone repository
git clone https://github.com/j4mesh3nry/TrailAssistance.git
cd TrailAssistance

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Run production build verification
npm run build
```

---

## 🌐 Production Deployment

Configured for continuous zero-downtime deployment on **Vercel** with client-side SPA route rewrites configured in `vercel.json`.