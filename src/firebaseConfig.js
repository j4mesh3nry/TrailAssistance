// TrailAssistance — Zero-Config Showcase Mode (default)
// ---------------------------------------------------------------------------
// Production portfolio builds run fully offline on static hosting (Vercel)
// using the LocalStorage mock repository in `src/services/portalStorage.js`.
// No external database setup is required to review all student/admin/kiosk flows.
//
// Optional Firebase adapter:
// - If you later want cloud persistence, provide env vars and lazy-import
//   this module from your own service layer.
// - Never hardcode API keys in a portfolio repo. Use:
//     REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, ...
// - This file intentionally exports `null` adapters so static builds never
//   attempt a network init and never leak credentials.
//
// Example (opt-in only):
//   import { initializeApp } from 'firebase/app';
//   const app = initializeApp({ apiKey: process.env.REACT_APP_FIREBASE_API_KEY, ... });

export const auth = null;
export const db = null;
export const isCloudPersistenceEnabled = false;

export default { auth, db, isCloudPersistenceEnabled };
