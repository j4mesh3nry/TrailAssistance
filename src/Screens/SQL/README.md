# Legacy SQL Reference (Academic Origin)

These `.sql` files are preserved as academic reference from the original
school project schema (`Students`, tickets, etc.).

**Showcase builds do NOT use SQL.** The portfolio deployment is zero-config:

- `src/services/mockData.js` — preloaded demo students, tickets, ratings
- `src/services/portalStorage.js` — LocalStorage mock repository
- No backend, no env vars, fully interactive on Vercel static hosting.

If you later want cloud persistence, use the optional adapter pattern
described in `src/firebaseConfig.js`.
