# Internship Tracker

A full-stack internship management platform supporting six user roles — **Student, Faculty, Mentor, Company, Admin, and SuperAdmin** — built with React + Vite + Redux Toolkit + Axios + TailwindCSS.

---

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | React 19 + Vite 8                   |
| Styling    | TailwindCSS v4 + Custom CSS Tokens  |
| State      | Redux Toolkit + React-Redux         |
| Routing    | React Router DOM v7                 |
| HTTP       | Axios (centralized instance)        |
| Icons      | Lucide React                        |
| Font       | Inter (Google Fonts)                |

---

## Frontend Architecture

The client follows a **Feature-Sliced Design (FSD)**-inspired architecture. The top-level structure is:

```
src/
├── app/          → Application bootstrap, routing, Redux store
├── pages/        → Role-specific route screens
├── features/     → Business capabilities and user actions
├── entities/     → Core business domain objects
├── shared/       → Reusable UI, hooks, utilities, libraries
└── assets/       → Images, icons, and fonts
```

### Folder Responsibility

| Folder       | Responsibility                                                  |
| ------------ | --------------------------------------------------------------- |
| `app`        | Application setup, routing (AppRouter), and global Redux store  |
| `pages`      | Complete route-level screens composed from features & entities  |
| `features`   | Business actions and capabilities (apply, evaluate, attend)     |
| `entities`   | Core business objects with reusable UI and API definitions      |
| `shared`     | Domain-agnostic UI components, hooks, utilities, and libraries  |
| `assets`     | Static images, SVG icons, and font files                        |

---

## Detailed Folder Structure

```
src/
│
├── app/
│   ├── App.jsx                        ← Root app with Provider + BrowserRouter
│   ├── main.jsx                       ← ReactDOM render entry
│   ├── router/
│   │   ├── AppRouter.jsx              ← All application routes
│   │   ├── ProtectedRoute.jsx         ← Auth guard (redirects to /login)
│   │   └── RoleRoute.jsx              ← Role-based access control guard
│   └── store/
│       ├── store.js                   ← Redux configureStore
│       └── rootReducer.js             ← Combined feature reducers
│
├── pages/
│   ├── auth/
│   │   ├── Login/Login.jsx
│   │   └── Register/Register.jsx
│   ├── student/
│   │   ├── Dashboard/Dashboard.jsx
│   │   ├── Internships/Internships.jsx
│   │   ├── Applications/Applications.jsx
│   │   └── Profile/Profile.jsx
│   ├── faculty/
│   │   ├── Dashboard/Dashboard.jsx
│   │   ├── Students/Students.jsx
│   │   └── Evaluations/Evaluations.jsx
│   ├── mentor/
│   │   ├── Dashboard/Dashboard.jsx
│   │   ├── Mentees/Mentees.jsx
│   │   └── Attendance/Attendance.jsx
│   ├── company/
│   │   ├── Dashboard/Dashboard.jsx
│   │   ├── Internships/Internships.jsx
│   │   └── Applications/Applications.jsx
│   ├── admin/
│   │   ├── Dashboard/Dashboard.jsx
│   │   ├── Users/Users.jsx
│   │   ├── Internships/Internships.jsx
│   │   └── Reports/Reports.jsx
│   └── superadmin/
│       ├── Dashboard/Dashboard.jsx
│       ├── SystemLogs/SystemLogs.jsx
│       └── Settings/Settings.jsx
│
├── features/
│   ├── auth/
│   │   ├── api/auth.api.js
│   │   ├── components/LoginForm.jsx
│   │   ├── components/RegisterForm.jsx
│   │   ├── hooks/useAuth.js
│   │   ├── store/authSlice.js
│   │   └── utils/auth.utils.js
│   ├── internship/
│   │   ├── api/internship.api.js
│   │   ├── components/InternshipCard.jsx
│   │   ├── components/InternshipForm.jsx
│   │   ├── components/InternshipFilters.jsx
│   │   ├── hooks/useInternships.js
│   │   ├── store/internshipSlice.js
│   │   └── validation/internship.schema.js
│   ├── application/
│   │   ├── api/application.api.js
│   │   ├── components/ApplicationStatusBadge.jsx
│   │   ├── components/ApplicationForm.jsx
│   │   ├── hooks/useApplications.js
│   │   └── store/applicationSlice.js
│   ├── attendance/
│   │   ├── api/attendance.api.js
│   │   ├── components/AttendanceTracker.jsx
│   │   ├── hooks/useAttendance.js
│   │   └── store/attendanceSlice.js
│   ├── evaluation/
│   │   ├── api/evaluation.api.js
│   │   ├── components/EvaluationForm.jsx
│   │   ├── hooks/useEvaluation.js
│   │   └── store/evaluationSlice.js
│   ├── notification/
│   │   ├── api/notification.api.js
│   │   ├── components/NotificationList.jsx
│   │   ├── hooks/useNotifications.js
│   │   └── store/notificationSlice.js
│   └── reports/
│       ├── api/reports.api.js
│       ├── components/ReportGenerator.jsx
│       ├── hooks/useReports.js
│       └── store/reportsSlice.js
│
├── entities/
│   ├── user/
│   │   ├── components/UserProfileCard.jsx
│   │   ├── components/UserAvatar.jsx
│   │   ├── user.api.js
│   │   └── user.types.js
│   ├── student/
│   │   ├── components/StudentCard.jsx
│   │   └── student.api.js
│   ├── faculty/
│   │   ├── components/FacultyCard.jsx
│   │   └── faculty.api.js
│   ├── mentor/
│   │   ├── components/MentorCard.jsx
│   │   └── mentor.api.js
│   ├── company/
│   │   ├── components/CompanyCard.jsx
│   │   └── company.api.js
│   ├── internship/
│   │   ├── components/InternshipDetails.jsx
│   │   └── internship.api.js
│   └── application/
│       ├── components/ApplicationDetails.jsx
│       └── application.api.js
│
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button/         Button.jsx + index.js
│   │   │   ├── Input/          Input.jsx + index.js
│   │   │   ├── Modal/          Modal.jsx + index.js
│   │   │   ├── Table/          Table.jsx + index.js
│   │   │   ├── Card/           Card.jsx + index.js
│   │   │   ├── Badge/          Badge.jsx + index.js
│   │   │   ├── Loader/         Loader.jsx + index.js
│   │   │   └── EmptyState/     EmptyState.jsx + index.js
│   │   ├── layout/
│   │   │   ├── DashboardLayout/  DashboardLayout.jsx + index.js
│   │   │   ├── Sidebar/          Sidebar.jsx + index.js
│   │   │   ├── Navbar/           Navbar.jsx + index.js
│   │   │   └── Footer/           Footer.jsx + index.js
│   │   └── common/
│   │       ├── ErrorBoundary/    ErrorBoundary.jsx + index.js
│   │       ├── ConfirmDialog/    ConfirmDialog.jsx + index.js
│   │       └── DataTable/        DataTable.jsx + index.js
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   ├── useModal.js
│   │   └── usePagination.js
│   ├── lib/
│   │   ├── axios.js             ← Centralized Axios instance
│   │   └── queryClient.js       ← Simple query cache helper
│   ├── constants/
│   │   ├── roles.js             ← ROLES enum (student, faculty, etc.)
│   │   ├── routes.js            ← All app route path constants
│   │   └── status.js            ← INTERNSHIP_STATUS, APPLICATION_STATUS enums
│   ├── utils/
│   │   ├── errorUtils.js        ← getErrorMessage() helper
│   │   ├── formatDate.js        ← formatDate() helper
│   │   └── formatters.js        ← formatCurrency(), capitalize()
│   └── styles/
│       └── index.css            ← CSS variables, base reset, typography
│
└── assets/
    ├── images/                  ← PNG / WebP / JPG assets
    ├── icons/                   ← SVG icon files
    └── fonts/                   ← Custom font files (woff2, ttf)
```

---

## Where Should I Put New Code?

### If it is a complete screen (a full page/route):

```
pages/<role>/<PageName>/<PageName>.jsx
```

Example:

```
pages/student/Internships/Internships.jsx
pages/company/Dashboard/Dashboard.jsx
pages/admin/Reports/Reports.jsx
```

### If it represents a business action or user capability:

```
features/<domain>/
```

Examples:

| Action                   | Location                                    |
| ------------------------ | ------------------------------------------- |
| Apply for an internship  | `features/application/`                     |
| Submit an evaluation     | `features/evaluation/`                      |
| Approve an application   | `features/application/api/application.api.js` |
| Mark attendance          | `features/attendance/`                      |
| Generate a report        | `features/reports/`                         |

### If it represents a business object (data model with UI):

```
entities/<domain>/
```

Examples:

| Entity      | Location                         |
| ----------- | -------------------------------- |
| User        | `entities/user/`                 |
| Student     | `entities/student/`              |
| Internship  | `entities/internship/`           |
| Application | `entities/application/`          |

### If it can be used anywhere (domain-agnostic):

```
shared/
```

Examples:

| Type        | Location                              |
| ----------- | ------------------------------------- |
| Button      | `shared/components/ui/Button/`        |
| Modal       | `shared/components/ui/Modal/`         |
| DataTable   | `shared/components/common/DataTable/` |
| useDebounce | `shared/hooks/useDebounce.js`         |
| formatDate  | `shared/utils/formatDate.js`          |
| Axios       | `shared/lib/axios.js`                 |

### If it is a Redux state slice for a business domain:

```
features/<domain>/store/<domain>Slice.js
```

Then register it in `app/store/rootReducer.js`.

### If it is an API call:

```
features/<domain>/api/<domain>.api.js
```

All API calls use the centralized Axios instance from `shared/lib/axios.js`.

---

## Component Naming Convention

Use **PascalCase** with descriptive, intent-revealing names:

```
✅ InternshipCard.jsx
✅ ApplicationStatusBadge.jsx
✅ StudentProfileForm.jsx
✅ UserManagementTable.jsx

❌ component.jsx
❌ test.jsx
❌ newFile.jsx
❌ card.jsx
```

---

## Component Folder Convention

Every reusable component lives in its own self-contained folder:

```
ComponentName/
├── ComponentName.jsx      ← Component implementation
└── index.js              ← Barrel export: export { default } from './ComponentName'
```

> Since the project uses TailwindCSS, CSS Module files (`.module.css`) are only added when custom CSS beyond Tailwind is necessary.

Import example using the `@` alias:

```js
// ✅ Correct — clean absolute import
import Button from '@/shared/components/ui/Button';

// ❌ Avoid — brittle deeply nested relative import
import Button from '../../../../shared/components/ui/Button';
```

---

## Redux Architecture

State is organized per-feature alongside its API and hooks:

```
features/auth/store/authSlice.js
features/internship/store/internshipSlice.js
features/application/store/applicationSlice.js
features/attendance/store/attendanceSlice.js
features/evaluation/store/evaluationSlice.js
features/notification/store/notificationSlice.js
features/reports/store/reportsSlice.js
```

All slices are combined in `app/store/rootReducer.js` and configured in `app/store/store.js`.

---

## Role-Based Access Control

Routes are protected at two levels:

| Guard              | File                              | Purpose                                |
| ------------------ | --------------------------------- | -------------------------------------- |
| `ProtectedRoute`   | `app/router/ProtectedRoute.jsx`   | Blocks unauthenticated users           |
| `RoleRoute`        | `app/router/RoleRoute.jsx`        | Restricts by user role                 |

Role constants are defined in `shared/constants/roles.js`:

```js
export const ROLES = {
  STUDENT:    'student',
  FACULTY:    'faculty',
  MENTOR:     'mentor',
  COMPANY:    'company',
  ADMIN:      'admin',
  SUPERADMIN: 'superadmin',
};
```

---

## Example Feature Flow

When a student browses and applies for an internship, the data flows like this:

```
pages/student/Internships/Internships.jsx     ← Route screen
        ↓ uses
features/internship/components/               ← InternshipCard, InternshipFilters
        ↓ powered by
features/internship/store/internshipSlice.js  ← Redux state
        ↓ fetches from
features/internship/api/internship.api.js     ← Axios calls
        ↓ uses
shared/lib/axios.js                           ← Centralized HTTP instance

features/application/components/ApplicationForm.jsx   ← Apply modal
        ↓ uses
shared/components/ui/Button, Input, Modal              ← Shared UI
        ↓ submits to
features/application/api/application.api.js            ← POST /applications

entities/internship/components/InternshipDetails.jsx  ← Detail view
entities/application/components/ApplicationDetails.jsx ← Application view
```

---

## Development Guidelines

- **Keep components small and focused.** One component = one responsibility.
- **Do not duplicate business logic.** Extract shared logic into `features/` or `shared/`.
- **Reuse shared components.** Check `shared/components/ui/` before building a new one.
- **Keep API calls close to their feature.** `features/<domain>/api/` — not scattered.
- **Keep Redux state close to its feature.** `features/<domain>/store/` — not in `app/`.
- **Do not put business logic inside shared UI.** `shared/` is domain-agnostic.
- **Use meaningful names.** Name by purpose, not by type (`InternshipCard` not `Card2`).
- **Use the `@` import alias.** Avoid `../../../../` relative paths.
- **Check existing folders before creating a new component.** Avoid duplication.
- **Do not create duplicate role-specific versions of the same feature without a real reason.**

---

## Running the Application

```bash
# Install dependencies
cd client
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Set up environment variables in `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Environment Variables

| Variable       | Description                          | Default                        |
| -------------- | ------------------------------------ | ------------------------------ |
| `VITE_API_URL` | Backend API base URL                 | `http://localhost:5000/api`    |