## Overview

Joineazy Dashboard is a Next.js (App Router) single-page experience for managing assignments for students and instructors. It uses Tailwind CSS v4 (via `@tailwindcss/postcss`) and lightweight component composition with React server/client components.

### Frontend design choices

- **Tech stack**: Next.js 16 (App Router), React 19, Tailwind v4 with PostCSS plugin.
- **Styling approach**: Pure Tailwind utility classes; no UI kit dependency. Global CSS only for fonts and root CSS variables in `src/app/globals.css`.
- **Color system**: Brand shifted to an **orange + white** theme. All previous blue/indigo accents updated to orange/amber. Text set to black for maximum contrast. Neutral grays are retained only for backgrounds and borders.
- **Typography**: Geist Sans and Geist Mono through `next/font` for performance and consistency.
- **Componentization**: Small, focused components in `src/components` with clear data flow via props and mock storage for demo purposes.
- **Accessibility**: High-contrast buttons, large targets, and consistent focus rings (orange).

### Feature summary (demo)

- Admin/Professor dashboards to view courses and their assignments
- Student dashboard to view enrolled courses and assignments
- Assignment list and details, with acknowledge/submission simulation


## Setup instructions

### Prerequisites

- Node.js 18+ recommended
- PNPM/NPM/Yarn/Bun (any one)

### Install

```bash
npm install
# or: pnpm install | yarn | bun install
```

### Run dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

### Build & start

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```


## Screenshots / UI flow

Place images or GIFs under `docs/screenshots/` and reference them here. Suggested flow:

1. Login
   - `docs/screenshots/01-login.png`
2. Student dashboard
   - `docs/screenshots/02-student-dashboard.png`
3. Admin/Professor dashboard
   - `docs/screenshots/03-admin-dashboard.png`
4. Assignment list
   - `docs/screenshots/04-assignment-list.png`
5. Assignment details
   - `docs/screenshots/05-assignment-details.png`

Example embedding:

```markdown
![Login](docs/screenshots/01-login.png)
![Student Dashboard](docs/screenshots/02-student-dashboard.png)
```


## Component structure (simplified)

```text
src/
  app/
    layout.js            # Fonts + global CSS
    page.js              # Entry – chooses dashboard view
    globals.css          # Root variables (background/foreground), Tailwind v4 entry
  components/
    Navbar.js
    LoginPage.js
    AdminDashboard.js
    StudentDashboard.js
    AssignmentList.js
    AssignmentDetails.js
    Assignment.js
  lib/
    mockData.js          # Mock users, courses, assignments
    storage.js           # LocalStorage helpers for demo state
    jwt.js               # Demo token util
```


## Solution notes (what was changed)

- Updated the entire UI from a blue/indigo scheme to an **orange + white** theme.
  - Gradients and accents now use `from-orange-500 to-amber-600` and `bg-orange-600` variants.
  - Replaced all icon/text utility colors from indigo/blue to orange.
- Standardized text color to **black** for body and labels where appropriate.
- Preserved grays for backgrounds and borders to maintain depth separation.
- Confirmed no linter issues after the refactor.


## Notes

- This is a demo app using mock storage; replace mocks with real APIs for production.
- Tailwind v4 is configured through `@tailwindcss/postcss` (see `postcss.config.mjs`).
