# TrailAssistance &bull; Student Trail Guidance & Support Portal

[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel%20Ready-black?logo=vercel)](https://vercel.com)
[![React 18](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![React Router 7](https://img.shields.io/badge/React%20Router-v7-red?logo=reactrouter)](https://reactrouter.com)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?logo=firebase)](https://firebase.google.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A web portal engineered for university orientation trails, student assistance, and administrator coordination. Provides interactive student check-in, personal information management, incident and concern reporting, and a comprehensive administrator analytics panel.

---

## Key Capabilities

- **Interactive Orientation & Check-in**: Streamlined personal profile setup with real-time validation and checkpoint logging.
- **Concern & Incident Reporting**: Direct channel for students and participants to submit route assistance requests, medical notices, or trail feedback.
- **Administrator Hub**: Centralized oversight interface displaying registered students, check-in status timestamps, and submitted incident logs.
- **Zero-Friction Demo Mode**: Embedded 1-click Demo credentials on the login screen allow reviewers and evaluators to explore both Student and Administrator dashboards without requiring Firebase authentication keys.
- **Responsive Layout**: Designed for seamless access across mobile handsets, tablets, and desktop workstations.

---

## Technical Stack

- **Framework**: React 18
- **Navigation**: React Router DOM v7
- **State Management**: React Context API (`AuthContext`, `DashboardContext`)
- **Backend / Storage**: Firebase Firestore & LocalStorage fallback
- **Styling**: Modular CSS

---

## Local Setup & Development

```bash
# Clone the repository
git clone https://github.com/your-username/trailassistance.git
cd trailassistance

# Install dependencies
npm install --legacy-peer-deps

# Start local development server
npm run start

# Build production bundle
npm run build
```

---

## Deployment to Vercel

Configured for zero-config Vercel deployment with `vercel.json`:
- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`