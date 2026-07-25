# Internship Tracker – Frontend Developer Guide

> **Who is this for?**
> This guide is for **new frontend developers** joining the project and **backend developers** who want to understand how the frontend is structured before integrating APIs.

---

## Quick Start

```bash
cd client
npm install
npm run dev        # starts Vite dev server at http://localhost:5173
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

| Script            | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start local dev server with Hot Module Reload   |
| `npm run build`   | Compile production bundle into `dist/`          |
| `npm run lint`    | Run ESLint on all JS/JSX files                  |
| `npm run preview` | Preview the production build locally            |

---

## Tech Stack at a Glance

| Concern       | Library / Tool                    |
| ------------- | --------------------------------- |
| UI Framework  | React 19                          |
| Build Tool    | Vite 8                            |
| Styling       | TailwindCSS v4 + CSS Variables    |
| State         | Redux Toolkit + React-Redux       |
| Routing       | React Router DOM v7               |
| HTTP Client   | Axios (centralized instance)      |
| Icons         | Lucide React                      |
| Font          | Inter (Google Fonts)              |

---

## Architecture Philosophy

The frontend uses a **Feature-Sliced Design (FSD)**-inspired architecture. The core idea is:

> **Code is grouped by what it does in the business, not by what type of file it is.**

Instead of a flat `components/`, `utils/`, `pages/` layout, everything is organized into layers:

```
app  →  pages  →  features  →  entities  →  shared
```

Each layer can only depend on layers below it. For example:
- A **page** can use **features** and **shared** components.
- A **feature** can use **entities** and **shared** components.
- **shared** has zero dependencies on business logic.

---

## Complete Folder Structure with Explanations

```
client/
├── .env                        ← Environment variables (VITE_API_URL, etc.)
├── vite.config.js              ← Vite config: @ alias, plugins, build settings
├── package.json                ← Dependencies and npm scripts
├── index.html                  ← HTML shell – Vite injects JS/CSS here
│
└── src/
    ├── main.jsx                ← Entry point: mounts React app to #root
    ├── App.jsx                 ← Re-exports app/App.jsx (Vite's expected entry)
    ├── index.css               ← Imports Tailwind + shared/styles/index.css
    ├── App.css                 ← (unused legacy file, can be ignored)
    │
    ├── app/                    ← APPLICATION BOOTSTRAP ONLY
    ├── pages/                  ← FULL ROUTE SCREENS (one per URL)
    ├── features/               ← BUSINESS CAPABILITIES (actions users take)
    ├── entities/               ← BUSINESS OBJECTS (what the app is about)
    ├── shared/                 ← REUSABLE UTILITIES (zero business logic)
    └── assets/                 ← STATIC FILES (images, icons, fonts)
```

---

## Layer-by-Layer Guide

---

### `src/app/` — Application Bootstrap

> **Purpose:** Wires the whole app together. No business logic lives here.

```
src/app/
├── App.jsx               ← Root component. Sets up Provider + BrowserRouter.
├── main.jsx              ← ReactDOM.createRoot() call. Don't touch unless needed.
│
├── router/
│   ├── AppRouter.jsx     ← All <Route> definitions for every page in the app.
│   ├── ProtectedRoute.jsx← Redirects unauthenticated users to /login.
│   └── RoleRoute.jsx     ← Redirects users to /login if their role isn't allowed.
│
└── store/
    ├── store.js          ← Calls configureStore() with rootReducer.
    └── rootReducer.js    ← Calls combineReducers() with all feature slices.
```

**When to edit these files:**
- `AppRouter.jsx` → when adding a **new route/page**
- `rootReducer.js` → when adding a **new Redux slice** in a feature
- `ProtectedRoute.jsx` / `RoleRoute.jsx` → only when changing auth/RBAC logic

**Never put business logic here.** This is configuration only.

---

### `src/pages/` — Route Screens

> **Purpose:** Each file represents one full page/URL. A page composes features, entities, and shared UI together. Pages are the only layer that know about routing.

```
src/pages/
├── auth/
│   ├── Login/
│   │   └── Login.jsx         ← /login  — renders LoginForm from features/auth
│   └── Register/
│       └── Register.jsx      ← /register — renders RegisterForm from features/auth
│
├── student/
│   ├── Dashboard/
│   │   ├── Dashboard.jsx     ← /student/dashboard
│   │   └── components/
│   │       └── StudentStats.jsx  ← stat cards specific only to this dashboard
│   ├── Internships/
│   │   ├── Internships.jsx   ← /student/internships
│   │   └── components/
│   │       └── InternshipGrid.jsx  ← grid layout used only on this page
│   ├── Applications/
│   │   └── Applications.jsx  ← /student/applications
│   └── Profile/
│       └── Profile.jsx       ← /student/profile
│
├── faculty/
│   ├── Dashboard/Dashboard.jsx
│   ├── Students/Students.jsx
│   └── Evaluations/Evaluations.jsx
│
├── mentor/
│   ├── Dashboard/Dashboard.jsx
│   ├── Mentees/Mentees.jsx
│   └── Attendance/Attendance.jsx
│
├── company/
│   ├── Dashboard/Dashboard.jsx
│   ├── Internships/Internships.jsx
│   └── Applications/Applications.jsx
│
├── admin/
│   ├── Dashboard/Dashboard.jsx
│   ├── Users/Users.jsx
│   ├── Internships/Internships.jsx
│   └── Reports/Reports.jsx
│
└── superadmin/
    ├── Dashboard/Dashboard.jsx
    ├── SystemLogs/SystemLogs.jsx
    └── Settings/Settings.jsx
```

**Rules for pages:**
- A page should be thin — it composes components, it doesn't contain logic.
- The `components/` subfolder inside a page is for components **used only on that page**.
- Avoid putting reusable components inside a page's `components/` folder.
- Each page uses `DashboardLayout` from `shared/components/layout/` for the sidebar + navbar shell.

**Example page structure:**
```jsx
const StudentDashboard = () => {
  const { user, logout } = useAuth();            // ← from features/auth
  return (
    <DashboardLayout user={user} onLogout={logout}>  {/* ← shared layout */}
      <StudentStats />                           {/* ← this page's component */}
      <InternshipCard internship={...} />        {/* ← from features/internship */}
    </DashboardLayout>
  );
};
```

---

### `src/features/` — Business Capabilities

> **Purpose:** Every user action or business process lives here. Features are shared across multiple role-specific pages — you write the logic once, and all roles use it.

```
src/features/
│
├── auth/                       ← Login, register, token management
│   ├── api/
│   │   └── auth.api.js         ← POST /auth/login, POST /auth/register, GET /auth/me
│   ├── components/
│   │   ├── LoginForm.jsx       ← Reusable login form UI
│   │   └── RegisterForm.jsx    ← Reusable register form UI
│   ├── hooks/
│   │   └── useAuth.js          ← useAuth() hook: { user, login, logout, register }
│   ├── store/
│   │   └── authSlice.js        ← Redux slice: setCredentials, logout
│   └── utils/
│       └── auth.utils.js       ← getDashboardRouteForRole(role) helper
│
├── internship/                 ← Browse, create, update internships
│   ├── api/
│   │   └── internship.api.js   ← GET/POST/PUT/DELETE /internships
│   ├── components/
│   │   ├── InternshipCard.jsx  ← Card UI for one internship listing
│   │   ├── InternshipForm.jsx  ← Form to create/edit an internship
│   │   └── InternshipFilters.jsx ← Search + status filter bar
│   ├── hooks/
│   │   └── useInternships.js   ← useInternships() hook: { internships, fetch }
│   ├── store/
│   │   └── internshipSlice.js  ← Redux slice: setInternships, setSelected
│   └── validation/
│       └── internship.schema.js ← Form validation rules
│
├── application/                ← Submit, review, update applications
│   ├── api/application.api.js
│   ├── components/
│   │   ├── ApplicationForm.jsx       ← Cover letter + resume URL form
│   │   └── ApplicationStatusBadge.jsx ← Colored badge for PENDING/ACCEPTED/etc.
│   ├── hooks/useApplications.js
│   └── store/applicationSlice.js
│
├── attendance/                 ← Mark and view daily attendance
│   ├── api/attendance.api.js
│   ├── components/
│   │   └── AttendanceTracker.jsx  ← Table showing daily present/absent records
│   ├── hooks/useAttendance.js
│   └── store/attendanceSlice.js
│
├── evaluation/                 ← Submit and view intern performance evaluations
│   ├── api/evaluation.api.js
│   ├── components/
│   │   └── EvaluationForm.jsx     ← Rating + feedback form
│   ├── hooks/useEvaluation.js
│   └── store/evaluationSlice.js
│
├── notification/               ← Platform notifications
│   ├── api/notification.api.js
│   ├── components/
│   │   └── NotificationList.jsx   ← List of notifications with "Mark Read"
│   ├── hooks/useNotifications.js
│   └── store/notificationSlice.js
│
└── reports/                    ← Generate and download analytical reports
    ├── api/reports.api.js
    ├── components/
    │   └── ReportGenerator.jsx   ← Report type + format selector + generate button
    ├── hooks/useReports.js
    └── store/reportsSlice.js
```

**Rules for features:**
- One feature = one business capability (not one role).
- All roles share the same feature — a Student and a Company both use `internship.api.js`.
- Add a new API function to the feature's `api/` file, not directly in a page.
- Add Redux state to the feature's `store/` slice, not a new global file.
- The feature's hook (`useInternships`, `useAuth`, etc.) is the **interface pages use**.

---

### `src/entities/` — Business Objects

> **Purpose:** Represents the core data models of the platform. An entity provides reusable display components and API access for a domain object.

```
src/entities/
│
├── user/
│   ├── components/
│   │   ├── UserProfileCard.jsx    ← Card showing name, email, role, department
│   │   └── UserAvatar.jsx         ← Avatar with initials fallback
│   ├── user.api.js                ← GET/PUT /users/:id
│   └── user.types.js              ← USER_ROLES array constant
│
├── student/
│   ├── components/
│   │   └── StudentCard.jsx        ← Card showing roll no, CGPA, placement status
│   └── student.api.js             ← GET /students/:id
│
├── faculty/
│   ├── components/
│   │   └── FacultyCard.jsx        ← Card showing designation, assigned mentees
│   └── faculty.api.js             ← GET /faculty/:id
│
├── mentor/
│   ├── components/
│   │   └── MentorCard.jsx         ← Card showing company, active mentees count
│   └── mentor.api.js              ← GET /mentors/:id
│
├── company/
│   ├── components/
│   │   └── CompanyCard.jsx        ← Card showing industry, active postings, verified badge
│   └── company.api.js             ← GET /companies/:id
│
├── internship/
│   ├── components/
│   │   └── InternshipDetails.jsx  ← Full detail view: title, stipend, requirements
│   └── internship.api.js          ← GET /internships/:id (single record)
│
└── application/
    ├── components/
    │   └── ApplicationDetails.jsx ← Full detail: status badge, cover letter, resume link
    └── application.api.js         ← GET /applications/:id (single record)
```

**Entities vs Features — what's the difference?**

| | Entity | Feature |
|--|--------|---------|
| Example | `InternshipDetails.jsx` | `InternshipCard.jsx` |
| Purpose | *Display* a business object | *Act on* a business object (apply, create) |
| Has Redux? | No | Yes |
| Has hooks? | Rarely | Always |

> Think of entities as **nouns** and features as **verbs**.

---

### `src/shared/` — Reusable Utilities

> **Purpose:** Everything here is **domain-agnostic**. No student logic, no internship logic — just clean, reusable code that any part of the app can use.

```
src/shared/
│
├── components/
│   │
│   ├── ui/                        ← Atomic UI building blocks
│   │   ├── Button/
│   │   │   ├── Button.jsx         ← variants: primary, secondary, outline, danger
│   │   │   └── index.js           ← export { default } from './Button'
│   │   ├── Input/                 ← Label + input + error message
│   │   ├── Modal/                 ← Overlay modal with title + close button
│   │   ├── Table/                 ← Table with styled headers
│   │   ├── Card/                  ← Container card with optional title/footer
│   │   ├── Badge/                 ← Status pill: success/warning/danger/info/neutral
│   │   ├── Loader/                ← Spinning loader with optional text
│   │   └── EmptyState/            ← "No data" placeholder with optional action
│   │
│   ├── layout/                    ← Page structure components
│   │   ├── DashboardLayout/       ← Wraps every dashboard page with Navbar+Sidebar+Footer
│   │   ├── Navbar/                ← Top navigation with user name, role, logout button
│   │   ├── Sidebar/               ← Left nav with NavLink active states per role
│   │   └── Footer/                ← Bottom copyright bar
│   │
│   └── common/                    ← Slightly more complex reusable components
│       ├── ErrorBoundary/         ← React class component; catches render crashes
│       ├── ConfirmDialog/         ← "Are you sure?" modal built on Modal + Button
│       └── DataTable/             ← Table + Loader + EmptyState combined
│
├── hooks/                         ← Framework-level reusable React hooks
│   ├── useDebounce.js             ← Delays value update (useful for search inputs)
│   ├── useModal.js                ← { isOpen, openModal, closeModal, modalData }
│   └── usePagination.js           ← { currentPage, nextPage, prevPage, totalPages }
│
├── lib/                           ← Third-party library configuration
│   ├── axios.js                   ← Creates the Axios instance with baseURL + auth headers
│   └── queryClient.js             ← Simple in-memory cache helper
│
├── constants/                     ← App-wide constant values
│   ├── roles.js                   ← ROLES.STUDENT, ROLES.FACULTY, ... (use these everywhere)
│   ├── routes.js                  ← ROUTES.STUDENT.DASHBOARD, ROUTES.LOGIN, ...
│   └── status.js                  ← INTERNSHIP_STATUS, APPLICATION_STATUS, ATTENDANCE_STATUS
│
├── utils/                         ← Pure helper functions (no React, no state)
│   ├── errorUtils.js              ← getErrorMessage(error) extracts readable error text
│   ├── formatDate.js              ← formatDate("2026-07-25") → "Jul 25, 2026"
│   └── formatters.js              ← formatCurrency(25000) → "₹25,000", capitalize("hello")
│
└── styles/
    └── index.css                  ← CSS variables (--color-primary, --font-sans), base reset,
                                      typography defaults, scrollbar styling, animations
```

**Rules for shared:**
- If it contains the word "internship", "student", "application" — it does NOT belong here.
- If two different features need the same utility — it belongs here.
- Never import from `features/` or `entities/` inside `shared/`.

---

### `src/assets/` — Static Files

```
src/assets/
├── hero.png              ← Example image (legacy from Vite template)
├── react.svg             ← React logo SVG (legacy)
├── vite.svg              ← Vite logo SVG (legacy)
├── images/               ← Add PNG, JPG, WebP files here
├── icons/                ← Add custom SVG icons here
└── fonts/                ← Add .woff2/.ttf font files here (then @font-face in CSS)
```

Import images in components like this:
```js
import heroImg from '@/assets/images/hero.png';
```

---

## How to Use the `@` Import Alias

The `@` symbol maps to `src/`. Use it everywhere to avoid fragile relative imports.

```js
// ✅ Always use @ alias
import Button from '@/shared/components/ui/Button';
import { ROLES } from '@/shared/constants/roles';
import useAuth from '@/features/auth/hooks/useAuth';
import { formatDate } from '@/shared/utils/formatDate';

// ❌ Never use deep relative imports
import Button from '../../../../shared/components/ui/Button';
```

---

## Decision Guide — "Where Do I Put This?"

| What you're building | Where it goes |
|----------------------|---------------|
| A new page/screen for a URL | `pages/<role>/<PageName>/<PageName>.jsx` |
| A component used only on one page | `pages/<role>/<Page>/components/<Name>.jsx` |
| A form or action (apply, submit, evaluate) | `features/<domain>/components/` |
| An API call for a business action | `features/<domain>/api/<domain>.api.js` |
| Redux state for a business capability | `features/<domain>/store/<domain>Slice.js` |
| A React hook for a business capability | `features/<domain>/hooks/use<Name>.js` |
| A display card for a data model (User, Intern) | `entities/<domain>/components/` |
| A read-only API call for a single record | `entities/<domain>/<domain>.api.js` |
| A UI building block (Button, Modal, Input) | `shared/components/ui/<Name>/` |
| A layout component (Navbar, Sidebar) | `shared/components/layout/<Name>/` |
| A React hook with no business logic | `shared/hooks/use<Name>.js` |
| A pure utility function | `shared/utils/<name>.js` |
| A constant (status, role, route path) | `shared/constants/<name>.js` |

---

## Adding a New Feature — Step-by-Step

### Example: Adding a "Document Submission" feature

**1. Create the feature folder:**
```
features/document/
├── api/document.api.js
├── components/DocumentUploadForm.jsx
├── hooks/useDocuments.js
└── store/documentSlice.js
```

**2. Add the API functions (`document.api.js`):**
```js
import api from '@/shared/lib/axios';
export const uploadDocumentApi = async (data) => {
  const response = await api.post('/documents', data);
  return response.data;
};
```

**3. Create the Redux slice (`documentSlice.js`):**
```js
import { createSlice } from '@reduxjs/toolkit';
const documentSlice = createSlice({
  name: 'document',
  initialState: { documents: [], loading: false },
  reducers: {
    setDocuments: (state, action) => { state.documents = action.payload; },
    setLoading:   (state, action) => { state.loading = action.payload; },
  },
});
export const { setDocuments, setLoading } = documentSlice.actions;
export default documentSlice.reducer;
```

**4. Register the slice in `app/store/rootReducer.js`:**
```js
import documentReducer from '@/features/document/store/documentSlice';
const rootReducer = combineReducers({
  // ...existing slices
  document: documentReducer,
});
```

**5. Create the hook (`useDocuments.js`):**
```js
import { useSelector, useDispatch } from 'react-redux';
import { setDocuments, setLoading } from '../store/documentSlice';
export const useDocuments = () => {
  const dispatch = useDispatch();
  const { documents } = useSelector((state) => state.document);
  // fetch, upload helpers...
  return { documents };
};
```

**6. Use it in any page:**
```js
import useDocuments from '@/features/document/hooks/useDocuments';
```

---

## Adding a New Page — Step-by-Step

### Example: Adding `pages/student/Documents/Documents.jsx`

**1. Create the file:**
```jsx
import React from 'react';
import DashboardLayout from '@/shared/components/layout/DashboardLayout';
import useAuth from '@/features/auth/hooks/useAuth';

const StudentDocuments = () => {
  const { user, logout } = useAuth();
  const sidebarLinks = [
    { label: 'Dashboard',   to: '/student/dashboard' },
    { label: 'Documents',   to: '/student/documents' },
    // ...
  ];
  return (
    <DashboardLayout user={user} sidebarLinks={sidebarLinks} onLogout={logout}>
      <h1>My Documents</h1>
      {/* feature components here */}
    </DashboardLayout>
  );
};
export default StudentDocuments;
```

**2. Add the route constant to `shared/constants/routes.js`:**
```js
STUDENT: {
  // ...existing
  DOCUMENTS: '/student/documents',
}
```

**3. Register the route in `app/router/AppRouter.jsx`:**
```jsx
import StudentDocuments from '@/pages/student/Documents/Documents';
// inside the student RoleRoute block:
<Route path={ROUTES.STUDENT.DOCUMENTS} element={<StudentDocuments />} />
```

---

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| React component files | `PascalCase.jsx` | `InternshipCard.jsx` |
| Hooks | `camelCase.js` prefixed with `use` | `useInternships.js` |
| API files | `camelCase.api.js` | `internship.api.js` |
| Redux slices | `camelCase` + `Slice.js` | `internshipSlice.js` |
| Constants files | `camelCase.js` | `roles.js`, `routes.js` |
| Utility files | `camelCase.js` | `formatDate.js` |
| CSS files | `camelCase.module.css` (when needed) | `Button.module.css` |
| Folder names | `PascalCase` for components, `camelCase` for others | `Button/`, `hooks/` |

---

## Component File Pattern

Every component in `shared/components/` follows this structure:

```
ComponentName/
├── ComponentName.jsx    ← The actual component (rafce pattern)
└── index.js            ← Barrel export
```

`index.js` always contains:
```js
export { default } from './ComponentName';
```

This allows clean imports:
```js
import Button from '@/shared/components/ui/Button';  // uses index.js
```

---

## For Backend Developers

The frontend expects these API conventions:

### Base URL
Configured via `VITE_API_URL` → defaults to `http://localhost:5000/api`

### Authentication
- Login returns `{ user, token }` — token is stored in `localStorage` as `"token"`
- Every subsequent request sends `Authorization: Bearer <token>`
- On 401 response, the token is automatically cleared

### API Modules and Their Expected Endpoints

| Feature | File | Endpoints used |
|---------|------|----------------|
| Auth | `features/auth/api/auth.api.js` | `POST /auth/login`, `POST /auth/register`, `GET /auth/me` |
| Internship | `features/internship/api/internship.api.js` | `GET /internships`, `GET /internships/:id`, `POST`, `PUT`, `DELETE` |
| Application | `features/application/api/application.api.js` | `GET /applications`, `POST /applications`, `PATCH /applications/:id/status` |
| Attendance | `features/attendance/api/attendance.api.js` | `GET /attendance`, `POST /attendance` |
| Evaluation | `features/evaluation/api/evaluation.api.js` | `GET /evaluations`, `POST /evaluations` |
| Notification | `features/notification/api/notification.api.js` | `GET /notifications`, `PATCH /notifications/:id/read` |
| Reports | `features/reports/api/reports.api.js` | `POST /reports/generate`, `GET /reports` |
| User Entity | `entities/user/user.api.js` | `GET /users/:id`, `PUT /users/:id` |
| Student Entity | `entities/student/student.api.js` | `GET /students/:id` |
| Faculty Entity | `entities/faculty/faculty.api.js` | `GET /faculty/:id` |
| Mentor Entity | `entities/mentor/mentor.api.js` | `GET /mentors/:id` |
| Company Entity | `entities/company/company.api.js` | `GET /companies/:id` |

### Expected Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

For errors:
```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

The frontend's `getErrorMessage()` in `shared/utils/errorUtils.js` reads `error.response.data.message`.
