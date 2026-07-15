import { createSlice } from "@reduxjs/toolkit";

// ============================================================
// localStorage helpers
// ============================================================
const LS_LISTINGS_KEY = "company_listings";
const LS_APPLICATIONS_KEY = "company_applications";

function loadLS(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveLS(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

// ============================================================
// COMPANIES — static company profiles
// ============================================================
const COMPANIES = [
  {
    id: "comp-1",
    name: "TCS",
    industry: "Information Technology",
    location: "Mumbai, India",
    website: "https://tcs.com",
    email: "tcs@company.com",
    rating: 4.8,
    logoText: "TCS",
    gradient: "from-blue-600 to-cyan-600",
    founded: "1968",
    employees: "600,000+",
    description:
      "Tata Consultancy Services is an Indian multinational information technology services and consulting company. Part of the Tata Group, TCS operates in 150 locations across 46 countries.",
    specialties: ["Cloud Solutions", "AI/ML", "Consulting", "Digital Transformation", "Cybersecurity"],
  },
  {
    id: "comp-2",
    name: "Infosys",
    industry: "Software Services",
    location: "Bengaluru, India",
    website: "https://infosys.com",
    email: "infosys@company.com",
    rating: 4.6,
    logoText: "INF",
    gradient: "from-indigo-600 to-blue-600",
    founded: "1981",
    employees: "340,000+",
    description:
      "Infosys Limited is an Indian multinational corporation providing business consulting, technology, engineering, and outsourcing services.",
    specialties: ["Enterprise Software", "Cloud", "Data Analytics", "Engineering Services", "BPM"],
  },
  {
    id: "comp-3",
    name: "Google",
    industry: "Internet & Technology",
    location: "Hyderabad, India",
    website: "https://google.com",
    email: "google@company.com",
    rating: 4.9,
    logoText: "G",
    gradient: "from-red-500 to-yellow-500",
    founded: "1998",
    employees: "180,000+",
    description:
      "Google LLC is an American multinational technology company focusing on online advertising, search engine technology, cloud computing, and AI.",
    specialties: ["Search", "Cloud Platform", "Android", "AI/ML", "Ads Technology"],
  },
  {
    id: "comp-4",
    name: "Microsoft",
    industry: "Software & Cloud",
    location: "Hyderabad, India",
    website: "https://microsoft.com",
    email: "microsoft@company.com",
    rating: 4.8,
    logoText: "MS",
    gradient: "from-blue-500 to-indigo-500",
    founded: "1975",
    employees: "220,000+",
    description:
      "Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, and cloud services.",
    specialties: ["Azure Cloud", "Office 365", "Windows", "LinkedIn", "Gaming"],
  },
  {
    id: "comp-5",
    name: "Amazon",
    industry: "E-commerce & Cloud",
    location: "Bengaluru, India",
    website: "https://amazon.com",
    email: "amazon@company.com",
    rating: 4.5,
    logoText: "AMZ",
    gradient: "from-orange-500 to-amber-500",
    founded: "1994",
    employees: "1,500,000+",
    description:
      "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing (AWS), digital streaming, and artificial intelligence.",
    specialties: ["AWS", "E-commerce", "Alexa", "Prime Video", "Logistics"],
  },
  {
    id: "comp-6",
    name: "Wipro",
    industry: "Information Technology",
    location: "Pune, India",
    website: "https://wipro.com",
    email: "wipro@company.com",
    rating: 4.4,
    logoText: "W",
    gradient: "from-teal-500 to-emerald-500",
    founded: "1945",
    employees: "250,000+",
    description:
      "Wipro Limited is an Indian multinational corporation that provides IT, consulting, and business process services.",
    specialties: ["Digital Strategy", "Cybersecurity", "Cloud Infra", "IoT", "Engineering"],
  },
];

// ============================================================
// SEED LISTINGS — pre-loaded job postings
// ============================================================
const SEED_LISTINGS = [
  {
    id: "listing-1",
    companyId: "comp-1",
    title: "Full Stack Developer Intern",
    description:
      "Join TCS's digital innovation lab to build scalable web applications using React, Node.js, and cloud services. You'll work alongside senior engineers on real client projects.",
    requirements: ["React", "Node.js", "MongoDB", "Git"],
    location: "Mumbai, India",
    type: "Hybrid",
    stipend: "₹25,000/month",
    duration: "6 months",
    deadline: "2026-08-15",
    postedAt: "2026-07-01",
    status: "Active",
  },
  {
    id: "listing-2",
    companyId: "comp-1",
    title: "Cloud Engineering Intern",
    description:
      "Work on AWS infrastructure migration projects. Help design and implement cloud-native architectures for enterprise clients.",
    requirements: ["AWS", "Docker", "Linux", "Python"],
    location: "Pune, India",
    type: "On-site",
    stipend: "₹30,000/month",
    duration: "3 months",
    deadline: "2026-08-01",
    postedAt: "2026-07-05",
    status: "Active",
  },
  {
    id: "listing-3",
    companyId: "comp-3",
    title: "Software Engineer Intern — Android",
    description:
      "Build and ship features for Google's Android platform used by billions. Focus on performance optimization and new Jetpack Compose components.",
    requirements: ["Kotlin", "Android Studio", "Jetpack Compose", "Git"],
    location: "Bengaluru, India",
    type: "On-site",
    stipend: "₹80,000/month",
    duration: "4 months",
    deadline: "2026-09-01",
    postedAt: "2026-07-10",
    status: "Active",
  },
  {
    id: "listing-4",
    companyId: "comp-3",
    title: "ML Research Intern",
    description:
      "Conduct cutting-edge machine learning research with Google Brain. Publish papers and prototype new model architectures.",
    requirements: ["Python", "TensorFlow", "PyTorch", "Linear Algebra"],
    location: "Hyderabad, India",
    type: "Hybrid",
    stipend: "₹90,000/month",
    duration: "6 months",
    deadline: "2026-09-15",
    postedAt: "2026-07-08",
    status: "Active",
  },
  {
    id: "listing-5",
    companyId: "comp-5",
    title: "Backend Developer Intern — AWS",
    description:
      "Build serverless microservices on AWS Lambda, API Gateway, and DynamoDB for Amazon's retail platform.",
    requirements: ["Java", "AWS Lambda", "DynamoDB", "REST APIs"],
    location: "Bengaluru, India",
    type: "On-site",
    stipend: "₹60,000/month",
    duration: "6 months",
    deadline: "2026-08-20",
    postedAt: "2026-07-03",
    status: "Active",
  },
  {
    id: "listing-6",
    companyId: "comp-5",
    title: "Data Analyst Intern",
    description:
      "Analyze customer behavior data to drive product decisions. Build dashboards and automated reporting pipelines.",
    requirements: ["SQL", "Python", "Tableau", "Statistics"],
    location: "Hyderabad, India",
    type: "Remote",
    stipend: "₹45,000/month",
    duration: "3 months",
    deadline: "2026-08-10",
    postedAt: "2026-07-06",
    status: "Active",
  },
  {
    id: "listing-7",
    companyId: "comp-2",
    title: "DevOps Intern",
    description:
      "Automate CI/CD pipelines and infrastructure provisioning using Terraform, Jenkins, and Kubernetes for enterprise clients.",
    requirements: ["Jenkins", "Kubernetes", "Terraform", "Shell Scripting"],
    location: "Bengaluru, India",
    type: "Hybrid",
    stipend: "₹28,000/month",
    duration: "6 months",
    deadline: "2026-08-25",
    postedAt: "2026-07-02",
    status: "Active",
  },
  {
    id: "listing-8",
    companyId: "comp-4",
    title: "Azure Cloud Intern",
    description:
      "Help enterprise customers migrate to Azure. Work on IaC templates, monitoring dashboards, and cost optimization strategies.",
    requirements: ["Azure", "PowerShell", "ARM Templates", "Networking"],
    location: "Hyderabad, India",
    type: "Hybrid",
    stipend: "₹55,000/month",
    duration: "4 months",
    deadline: "2026-09-05",
    postedAt: "2026-07-09",
    status: "Active",
  },
  {
    id: "listing-9",
    companyId: "comp-6",
    title: "UI/UX Design Intern",
    description:
      "Design intuitive user interfaces for Wipro's digital products. Conduct user research, create wireframes and high-fidelity prototypes in Figma.",
    requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    location: "Pune, India",
    type: "Hybrid",
    stipend: "₹20,000/month",
    duration: "3 months",
    deadline: "2026-08-30",
    postedAt: "2026-07-04",
    status: "Active",
  },
  {
    id: "listing-10",
    companyId: "comp-4",
    title: "Frontend Engineer Intern — Teams",
    description:
      "Build new features for Microsoft Teams using React and TypeScript. Collaborate with PMs and designers to ship high-quality UI.",
    requirements: ["React", "TypeScript", "CSS", "Jest"],
    location: "Bengaluru, India",
    type: "On-site",
    stipend: "₹65,000/month",
    duration: "6 months",
    deadline: "2026-09-10",
    postedAt: "2026-07-11",
    status: "Active",
  },
];

// ============================================================
// INITIAL STATE
// ============================================================
const savedListings = loadLS(LS_LISTINGS_KEY);
const savedApplications = loadLS(LS_APPLICATIONS_KEY);

const initialState = {
  companies: COMPANIES,
  listings: savedListings || SEED_LISTINGS,
  applications: savedApplications || [],
};

// ============================================================
// SLICE
// ============================================================
const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    // ── Listings CRUD ──
    addListing: (state, action) => {
      const newListing = {
        id: `listing-${Date.now()}`,
        postedAt: new Date().toISOString().split("T")[0],
        status: "Active",
        ...action.payload,
      };
      state.listings.unshift(newListing);
      saveLS(LS_LISTINGS_KEY, state.listings);
    },
    updateListing: (state, action) => {
      const { id, ...updates } = action.payload;
      const idx = state.listings.findIndex((l) => l.id === id);
      if (idx !== -1) {
        state.listings[idx] = { ...state.listings[idx], ...updates };
        saveLS(LS_LISTINGS_KEY, state.listings);
      }
    },
    removeListing: (state, action) => {
      state.listings = state.listings.filter((l) => l.id !== action.payload);
      // Also remove related applications
      state.applications = state.applications.filter(
        (a) => a.listingId !== action.payload
      );
      saveLS(LS_LISTINGS_KEY, state.listings);
      saveLS(LS_APPLICATIONS_KEY, state.applications);
    },

    // ── Applications ──
    applyToListing: (state, action) => {
      const { studentName, studentEmail, listingId } = action.payload;
      // Prevent duplicate applications
      const exists = state.applications.find(
        (a) => a.studentEmail === studentEmail && a.listingId === listingId
      );
      if (!exists) {
        state.applications.push({
          id: `app-${Date.now()}`,
          studentName,
          studentEmail,
          listingId,
          status: "Applied",
          appliedAt: new Date().toISOString().split("T")[0],
        });
        saveLS(LS_APPLICATIONS_KEY, state.applications);
      }
    },
    updateApplicationStatus: (state, action) => {
      const { applicationId, status } = action.payload;
      const app = state.applications.find((a) => a.id === applicationId);
      if (app) {
        app.status = status;
        saveLS(LS_APPLICATIONS_KEY, state.applications);
      }
    },
  },
});

export const {
  addListing,
  updateListing,
  removeListing,
  applyToListing,
  updateApplicationStatus,
} = companySlice.actions;
export default companySlice.reducer;
