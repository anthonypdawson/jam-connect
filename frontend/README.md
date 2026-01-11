# Frontend (React + TypeScript)

This directory contains the JamConnect frontend application.

## Tech Stack
- React 18 + TypeScript
- Bundler (default create-react-app tooling or similar)
- Fetch API for backend communication (will be abstracted later)

## Prerequisites
- Node.js (LTS)
- Backend running at `http://localhost:4000`

## Installation
```
npm install
```

## Available Scripts
```
npm start        # Start dev server
npm run build    # Production build (if CRA or similar tooling is configured)
```
(If a build script doesn't exist yet, add one when introducing a deploy target.)

## Environment Variables
If you introduce environment-based configuration, follow naming like:
```
REACT_APP_API_BASE_URL=http://localhost:4000
```
Create a `.env` file (not committed) when needed.

## Auth & Session (Current)
- On successful login, user object stored in `localStorage` under key `jamconnect_user`.
- Presence of this key renders the `Profile` component.
- Roadmap: Replace with secure HTTP-only cookie & refresh token flow.

## Components Overview
- `App.tsx`: Orchestrates session state, renders landing vs profile.
- `SignUpModal.tsx` / `LoginModal.tsx`: Isolated modal forms for auth.
- `Profile.tsx`: Placeholder profile view with logout.

## Styling
Currently inline styles for speed. Options for evolution:
- Introduce a design system (e.g., Tailwind, CSS Modules, or styled-components).
- Extract shared button / modal primitives.

## Planned Improvements (Roadmap Alignment)
- Central API client wrapper (decouple fetch calls from UI components).
- Cookie-based auth + refresh rotation.
- Form validation layer (e.g., zod or yup) before submission.
- Error & loading state unification.
- Theming pass / design tokens.

## How to Test Auth Flow
1. Ensure backend is running (`npm run dev` in `backend/`).
2. Start frontend: `npm start`.
3. Sign up a new account (modal -> Sign Up).
4. Log in with the same credentials.
5. Observe `localStorage` key `jamconnect_user` populated.
6. Click logout to clear session.

## Troubleshooting
| Issue | Cause | Fix |
| ----- | ----- | --- |
| CORS error | Backend CORS not permitting origin | Verify CORS middleware config in backend. |
| Stale session | LocalStorage leftover | Use devtools > Application > Clear storage. |
| Network 400 on signup | Missing field validation | Ensure all fields populated. |

## Conventions
- Keep modal logic self-contained.
- Prefer functional components with hooks.
- When adding API calls, migrate toward a central `apiClient.ts` module.

## Contributing
1. Add or adjust components in `src/`.
2. Keep auth/session changes documented here.
3. If introducing a new script, update this README.

