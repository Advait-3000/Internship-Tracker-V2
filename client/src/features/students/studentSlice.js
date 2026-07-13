import { createSlice } from "@reduxjs/toolkit";

// ============================================================
// DUMMY STUDENT DATA
// Every student in the system is an intern.
// ============================================================

const COMPANIES = [
  "TCS", "Infosys", "Deloitte", "Wipro", "KPMG", "Amazon",
  "Accenture", "Capgemini", "Siemens", "IBM", "Microsoft", "Nvidia",
];

const ROLES = [
  "Software Intern", "Data Analyst Intern", "Cloud Intern",
  "ML Engineer Intern", "Frontend Intern", "DevOps Intern",
  "Cybersecurity Intern", "Product Intern", "QA Intern", "UX Intern",
];

const DEPARTMENTS = [
  "Computer Engineering", "Information Technology", "EXTC",
  "AIML", "AIDS", "Civil", "ECS", "ELEC",
];

const STATUSES = ["On Track", "Needs Review", "Completed", "At Risk"];

const NAMES = [
  "Advait Warang", "Yashwant Singh", "Parth Bhalala", "Sharvari Patil",
  "Dnyaneshwar K.", "Aarav Mehta", "Vivaan Shah", "Aditya Deshmukh",
  "Vihaan Reddy", "Arjun Nair", "Sai Kulkarni", "Ayaan Patel",
  "Krishna Iyer", "Ishaan Gupta", "Shaurya Rao", "Aaradhya Joshi",
  "Ananya Pillai", "Diya Sharma", "Riya Verma", "Myra Kapoor",
  "Kiara Singh", "Kriti Bhat", "Pari Menon", "Sia Das", "Zara Khan",
  "Rohan Mishra", "Rahul Tiwari", "Karan Malhotra", "Siddharth Ghosh",
  "Vikram Saxena",
];

const DEFAULT_AVATAR =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23e2e8f0"/><path d="M12 12.5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%2394a3b8"/></svg>';

// Pre-assign some students to faculty members
const FACULTY_IDS = [
  "fac-1", "fac-2", "fac-3", "fac-4", "fac-5",
  "fac-7", "fac-9", "fac-10", "fac-11", "fac-12",
];

const generateInterns = () => {
  const interns = [];
  for (let i = 0; i < 30; i++) {
    interns.push({
      id: `intern-${i + 1}`,
      name: NAMES[i % NAMES.length],
      department: DEPARTMENTS[i % DEPARTMENTS.length],
      companyName: COMPANIES[i % COMPANIES.length],
      internshipRole: ROLES[i % ROLES.length],
      status: STATUSES[i % STATUSES.length],
      workHours: `${Math.floor(Math.random() * 30) + 10} h/week`,
      avatar: DEFAULT_AVATAR,
      assignedFacultyId: i < 20 ? FACULTY_IDS[i % FACULTY_IDS.length] : null,
    });
  }
  return interns;
};

// ============================================================
// SLICE
// ============================================================

const studentSlice = createSlice({
  name: "interns",
  initialState: {
    list: generateInterns(),
    loading: false,
    error: null,
  },
  reducers: {
    assignFaculty: (state, action) => {
      const { studentId, facultyId } = action.payload;
      const student = state.list.find((s) => s.id === studentId);
      if (student) {
        student.assignedFacultyId = facultyId;
      }
    },
    clearInternError: (state) => {
      state.error = null;
    },
  },
});

export const { assignFaculty, clearInternError } = studentSlice.actions;
export default studentSlice.reducer;
