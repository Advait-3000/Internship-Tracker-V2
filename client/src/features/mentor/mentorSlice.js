import { createSlice } from "@reduxjs/toolkit";

// ============================================================
// DUMMY MENTOR DATA
// ============================================================

const DUMMY_INTERNS = [
  {
    id: "m-stu-1",
    name: "Advait Warang",
    email: "advait@aum.edu.in",
    department: "Computer Engineering",
    project: "AI Chatbot",
    status: "On Track",
    progress: 85,
    attendance: "96%",
    skills: ["React", "Python", "NLP"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "m-stu-2",
    name: "Parth Bhalala",
    email: "parth@aum.edu.in",
    department: "Information Technology",
    project: "Cloud Migration",
    status: "On Track",
    progress: 78,
    attendance: "92%",
    skills: ["AWS", "Docker", "Node.js"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "m-stu-3",
    name: "Sharvari Patil",
    email: "sharvari@aum.edu.in",
    department: "AIML",
    project: "ML Pipeline",
    status: "Needs Review",
    progress: 60,
    attendance: "88%",
    skills: ["PyTorch", "TensorFlow", "FastAPI"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "m-stu-4",
    name: "Aarav Mehta",
    email: "aarav@aum.edu.in",
    department: "EXTC",
    project: "IoT Dashboard",
    status: "At Risk",
    progress: 45,
    attendance: "75%",
    skills: ["Embedded C", "MQTT", "React"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "m-stu-5",
    name: "Vivaan Shah",
    email: "vivaan@aum.edu.in",
    department: "AIDS",
    project: "Data Analytics Platform",
    status: "On Track",
    progress: 92,
    attendance: "98%",
    skills: ["SQL", "PowerBI", "Python"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "m-stu-6",
    name: "Diya Sharma",
    email: "diya@aum.edu.in",
    department: "Computer Engineering",
    project: "AI Chatbot",
    status: "Completed",
    progress: 100,
    attendance: "99%",
    skills: ["LangChain", "React", "TypeScript"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "m-stu-7",
    name: "Arjun Nair",
    email: "arjun@aum.edu.in",
    department: "ECS",
    project: "Blockchain PoC",
    status: "On Track",
    progress: 70,
    attendance: "91%",
    skills: ["Solidity", "Web3.js", "Ethereum"],
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "m-stu-8",
    name: "Riya Verma",
    email: "riya@aum.edu.in",
    department: "Civil",
    project: "DevOps Automation",
    status: "Needs Review",
    progress: 55,
    attendance: "85%",
    skills: ["Kubernetes", "Ansible", "CI/CD"],
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  },
];

const DUMMY_PROJECTS = [
  {
    id: "proj-1",
    title: "AI-Powered Chatbot",
    status: "In Progress",
    progress: 85,
    category: "Artificial Intelligence",
    deadline: "August 30, 2026",
    description: "Building an intelligent chatbot for customer support using NLP models and RAG architecture.",
    assignedInterns: ["Advait Warang", "Diya Sharma"],
  },
  {
    id: "proj-2",
    title: "Cloud Migration",
    status: "In Progress",
    progress: 78,
    category: "Cloud Engineering",
    deadline: "September 15, 2026",
    description: "Migrating legacy infrastructure to AWS with automated CI/CD deployment pipelines.",
    assignedInterns: ["Parth Bhalala"],
  },
  {
    id: "proj-3",
    title: "ML Pipeline",
    status: "Planning",
    progress: 35,
    category: "Machine Learning",
    deadline: "October 01, 2026",
    description: "Designing an end-to-end ML pipeline for real-time predictions and model drift detection.",
    assignedInterns: ["Sharvari Patil"],
  },
  {
    id: "proj-4",
    title: "IoT Dashboard",
    status: "In Progress",
    progress: 45,
    category: "Embedded & Web",
    deadline: "August 15, 2026",
    description: "Real-time sensor telemetry visualization dashboard using React, Tailwind CSS, and WebSockets.",
    assignedInterns: ["Aarav Mehta"],
  },
  {
    id: "proj-5",
    title: "Data Analytics Platform",
    status: "Completed",
    progress: 100,
    category: "Data Science",
    deadline: "July 01, 2026",
    description: "Built an enterprise data analytics platform for automated executive reporting.",
    assignedInterns: ["Vivaan Shah"],
  },
  {
    id: "proj-6",
    title: "Blockchain PoC",
    status: "Planning",
    progress: 25,
    category: "Web3 & Security",
    deadline: "September 30, 2026",
    description: "Proof of concept for decentralized supply chain verification and audit logs.",
    assignedInterns: ["Arjun Nair"],
  },
];

const DUMMY_REVIEWS = [
  {
    id: "rev-1",
    internName: "Advait Warang",
    rating: 5,
    comment: "Outstanding performance. Proactive in solving complex problems and great team collaboration.",
    date: "2026-07-10",
  },
  {
    id: "rev-2",
    internName: "Parth Bhalala",
    rating: 4,
    comment: "Solid technical skills. Needs to improve documentation habits.",
    date: "2026-07-08",
  },
  {
    id: "rev-3",
    internName: "Sharvari Patil",
    rating: 4,
    comment: "Shows great initiative in research. Could be more consistent with deadlines.",
    date: "2026-07-05",
  },
];

// ============================================================
// SLICE
// ============================================================

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    assignedInterns: DUMMY_INTERNS,
    projects: DUMMY_PROJECTS,
    reviews: DUMMY_REVIEWS,
    loading: false,
    error: null,
  },
  reducers: {
    addReview: (state, action) => {
      state.reviews.unshift(action.payload);
    },
    updateInternStatus: (state, action) => {
      const { internName, status } = action.payload;
      const intern = state.assignedInterns.find((i) => i.name === internName);
      if (intern) {
        intern.status = status;
      }
    },
    clearMentorError: (state) => {
      state.error = null;
    },
  },
});

export const { addReview, updateInternStatus, clearMentorError } = mentorSlice.actions;
export default mentorSlice.reducer;
