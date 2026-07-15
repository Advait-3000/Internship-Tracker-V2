import { createSlice } from "@reduxjs/toolkit";

// ============================================================
// localStorage helpers (security: no sensitive data stored)
// ============================================================

const LS_PROFILE_KEY = "student_portal_profile";
const LS_TASKS_KEY = "student_portal_tasks";

function loadFromLS(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or private mode — silently ignore
  }
}

// ============================================================
// DEFAULT PROFILE (Parth Bhalala — matches authSlice)
// ============================================================

const DEFAULT_PROFILE = {
  displayName: "Parth Bhalala",
  title: "Cloud Intern at TCS · Information Technology",
  bio: "Third Year Engineering Student at Atharva College of Engineering. Passionate about Cloud Technologies, DevOps, and Open-Source. AWS Certified Cloud Practitioner.",
  phone: "+91 98210 00001",
  email: "parth@aum.edu.in",
  avatarUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  skills: ["AWS", "Docker", "Node.js", "Linux", "CI/CD", "Kubernetes"],
  department: "Information Technology",
  year: "Third Year",
  college: "Atharva College of Engineering",
};

// ============================================================
// DUMMY TASKS
// ============================================================

const DEFAULT_TASKS = [
  {
    id: "task-1",
    title: "Set up AWS S3 buckets for file storage",
    description:
      "Configure S3 buckets with proper IAM policies and versioning for the Cloud Migration project.",
    status: "Done",
    priority: "High",
    deadline: "2026-07-10",
    project: "Cloud Migration",
    tags: ["AWS", "DevOps"],
  },
  {
    id: "task-2",
    title: "Dockerize Node.js microservices",
    description:
      "Write Dockerfiles and docker-compose for all Node.js services. Ensure local dev environment matches prod.",
    status: "Done",
    priority: "High",
    deadline: "2026-07-14",
    project: "Cloud Migration",
    tags: ["Docker", "Node.js"],
  },
  {
    id: "task-3",
    title: "Implement CI/CD pipeline with GitHub Actions",
    description:
      "Create automated deploy pipelines that run tests on PR and deploy to staging on merge to main.",
    status: "In Progress",
    priority: "High",
    deadline: "2026-07-22",
    project: "Cloud Migration",
    tags: ["CI/CD", "GitHub Actions"],
  },
  {
    id: "task-4",
    title: "Migrate PostgreSQL database to RDS",
    description:
      "Move on-premise Postgres to AWS RDS with read replicas. Ensure zero-downtime migration plan.",
    status: "In Progress",
    priority: "Medium",
    deadline: "2026-07-28",
    project: "Cloud Migration",
    tags: ["AWS", "PostgreSQL"],
  },
  {
    id: "task-5",
    title: "Write weekly progress report",
    description:
      "Submit internship weekly report documenting tasks completed, blockers, and next week plan.",
    status: "In Progress",
    priority: "Medium",
    deadline: "2026-07-19",
    project: "General",
    tags: ["Reporting"],
  },
  {
    id: "task-6",
    title: "Set up CloudWatch monitoring dashboards",
    description:
      "Configure metrics and alarms in CloudWatch for all migrated services. Include latency, error rate, and CPU.",
    status: "Todo",
    priority: "Medium",
    deadline: "2026-08-05",
    project: "Cloud Migration",
    tags: ["AWS", "Monitoring"],
  },
  {
    id: "task-7",
    title: "Load testing with k6",
    description:
      "Run k6 load tests against the API gateway. Target: 1000 concurrent users with <200ms p99 latency.",
    status: "Todo",
    priority: "Low",
    deadline: "2026-08-10",
    project: "Cloud Migration",
    tags: ["Testing", "k6"],
  },
  {
    id: "task-8",
    title: "Documentation — Architecture Decision Records",
    description:
      "Write ADRs for key architectural decisions made during the cloud migration project.",
    status: "Todo",
    priority: "Low",
    deadline: "2026-08-15",
    project: "Cloud Migration",
    tags: ["Docs"],
  },
];

// ============================================================
// INITIAL STATE (hydrate from localStorage if available)
// ============================================================

const savedProfile = loadFromLS(LS_PROFILE_KEY);
const savedTasks = loadFromLS(LS_TASKS_KEY);

const initialState = {
  profile: savedProfile || DEFAULT_PROFILE,
  tasks: savedTasks || DEFAULT_TASKS,
};

// ============================================================
// SLICE
// ============================================================

const studentPortalSlice = createSlice({
  name: "studentPortal",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      saveToLS(LS_PROFILE_KEY, state.profile);
    },
    resetProfile: (state) => {
      state.profile = DEFAULT_PROFILE;
      saveToLS(LS_PROFILE_KEY, DEFAULT_PROFILE);
    },
    updateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = status;
        saveToLS(LS_TASKS_KEY, state.tasks);
      }
    },
    addTask: (state, action) => {
      state.tasks.unshift({
        id: `task-${Date.now()}`,
        ...action.payload,
        status: action.payload.status || "Todo",
      });
      saveToLS(LS_TASKS_KEY, state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveToLS(LS_TASKS_KEY, state.tasks);
    },
  },
});

export const {
  updateProfile,
  resetProfile,
  updateTaskStatus,
  addTask,
  deleteTask,
} = studentPortalSlice.actions;
export default studentPortalSlice.reducer;
