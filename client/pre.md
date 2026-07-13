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
