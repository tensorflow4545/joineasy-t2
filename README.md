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

1. Login
   <img width="602" height="853" alt="image" src="https://github.com/user-attachments/assets/4bec2bf9-bf25-4c95-b5f8-ec9c596d391e" />

2. Student dashboard
  <img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/b5add94a-0c98-4865-9574-d0b6dc0adf43" />

3. Admin/Professor dashboard
   <img width="1913" height="907" alt="image" src="https://github.com/user-attachments/assets/a6d7cd47-e0b2-47bb-8bac-7ad13b0b09e2" />

4. Assignment list
   <img width="1570" height="564" alt="image" src="https://github.com/user-attachments/assets/95caa7b6-0106-4a81-9750-65d61a418e7a" />

5. Assignment details
   <img width="1918" height="714" alt="image" src="https://github.com/user-attachments/assets/6f03768c-3270-4518-b326-5c3930b2db3d" />


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
