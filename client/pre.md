# Project Context: Internship Tracker Website

## Architecture & Goals

- **Objective:** Refactor an existing, non-modular React dashboard into a highly modular, component-based architecture.
- **State Management:** Redux Toolkit (RTK). All global state, API caching, and user sessions must be managed via RTK slices.
- **Styling:** Clean, modern UI (assuming TailwindCSS or standard styled-components/CSS modules based on project setup). Keep UI components decoupled from business logic.
- **Reference:** https://github.com/Advait-3000/Internship-Tracker/tree/feature/Dashboard

## Role Hierarchy & Access Control

There are 6 distinct user roles. The frontend must implement strict Role-Based Access Control (RBAC) for routing and component rendering.

1. **Super Admin:** Manages Admins and the global list of Companies.
2. **Admin:** Manages Faculties, views the global Dashboard, and has read access to all Student profiles.
3. **Faculty:** Manages assigned subsets of Students. Responsible for reviewing certificate proofs and flagging students as "Approved Interns".
4. **Company:** Manages job listings/openings and assigns Mentors to those openings.
5. **Mentor:** Manages specific projects, views their assigned intern list, and submits performance reviews for interns.
6. **Student:** Views their profile, assigned tasks, project details, and reviews left by their Mentor. Submits certificate proof for Faculty approval.

## Coding Standards for Agent

1. **Chunked Delivery:** Do not write the entire application at once. Wait for specific feature requests.
2. **Component Modularity:** Container components handle RTK state; Presentational components only receive props.
3. **Strict Typing (if TypeScript):** Define explicit interfaces for all User roles and API responses.

# Project Context: Internship Tracker Website (Updated)

## Architecture & Goals

- **Frameworks:** React, Redux Toolkit (RTK) for state, Tailwind CSS for styling, React Router DOM for routing.
- **Libraries:** Recharts (visualizations), Lucide React (icons).
- **Component Rules:** Highly modular. Container components handle RTK state; Presentational components receive props. Do NOT use plain CSS files; strictly use Tailwind utility classes.

## Role Hierarchy & Access Control (Dummy Auth Phase)

Currently using dummy local data and RTK state for authentication.

1. **Admin:** Manages Faculties, views the Dashboard, and has read access to all Student profiles. Can assign Faculties to Students.
2. **Mentor:** Manages specific projects, views their assigned intern list, and submits performance reviews for interns.
3. **Student:** Views their profile, assigned tasks, project details, and reviews left by their Mentor. Submits certificate proof for Faculty approval.

## Strict Architectural Rules

1. **URL Routing by Name:** Student routes must use name slugs (e.g., `/students/john-doe`), NOT generic IDs (e.g., `/students/1`).
2. **Component Reuse:** The `StudentProfile` component must be universally reusable. When an Admin clicks a student, they should see the exact same `StudentProfile` component that the student sees when logging in themselves, just with conditional Admin actions (like "Assign Faculty") rendered via RBAC checks.
