import { createSlice } from "@reduxjs/toolkit";

// ============================================================
// DUMMY STUDENT GENERATOR (assigned to faculty)
// ============================================================

const STUDENT_NAMES = [
  "Advait Warang", "Yashwant Singh", "Parth Bhalala", "Sharvari Patil", "Dnyaneshwar K.",
  "Aarav Mehta", "Vivaan Shah", "Aditya Deshmukh", "Vihaan Reddy", "Arjun Nair",
  "Sai Kulkarni", "Ayaan Patel", "Krishna Iyer", "Ishaan Gupta", "Shaurya Rao",
  "Aaradhya Joshi", "Ananya Pillai", "Diya Sharma", "Riya Verma", "Myra Kapoor",
  "Kiara Singh", "Kriti Bhat", "Pari Menon", "Sia Das", "Zara Khan",
  "Rohan Mishra", "Rahul Tiwari", "Karan Malhotra", "Siddharth Ghosh", "Vikram Saxena",
];

const PROJECTS = [
  "AI-Powered Chatbot @ TCS",
  "Cloud Migration @ Infosys",
  "Data Analytics @ Deloitte",
  "Mobile App Dev @ Wipro",
  "Cybersecurity Audit @ KPMG",
  "ML Pipeline @ Amazon",
  "Full-Stack Web App @ Accenture",
  "DevOps Automation @ Capgemini",
  "IoT Dashboard @ Siemens",
  "Blockchain PoC @ IBM",
  "NLP Research @ Microsoft",
  "Computer Vision @ Nvidia",
];

const STUDENT_STATUSES = ["On Track", "Needs Review", "Completed", "At Risk"];

const generateStudents = (count, seed) => {
  const students = [];
  for (let i = 0; i < count; i++) {
    const idx = (seed + i) % STUDENT_NAMES.length;
    students.push({
      id: `stu-${seed}-${i}`,
      name: STUDENT_NAMES[idx],
      project: PROJECTS[(seed + i) % PROJECTS.length],
      status: STUDENT_STATUSES[(seed + i) % STUDENT_STATUSES.length],
      internshipLetter: {
        status: (seed + i) % 3 === 0 ? "Pending" : (seed + i) % 3 === 1 ? "Approved" : "Not Uploaded",
        url: "https://example.com/dummy-letter.pdf",
      }
    });
  }
  return students;
};

// ============================================================
// DUMMY FACULTY DATA
// ============================================================

const DUMMY_FACULTY = [
  {
    id: "fac-1",
    name: "Prof. Omkar",
    email: "omkar@aum.edu.in",
    department: "Computer Engineering",
    studentQuota: 50,
    assignedStudents: generateStudents(42, 1),
    status: "Active",
  },
  {
    id: "fac-2",
    name: "Prof. Meera Kulkarni",
    email: "meera.kulkarni@aum.edu.in",
    department: "Information Technology",
    studentQuota: 45,
    assignedStudents: generateStudents(38, 5),
    status: "Active",
  },
  {
    id: "fac-3",
    name: "Dr. Rajesh Patil",
    email: "rajesh.patil@aum.edu.in",
    department: "EXTC",
    studentQuota: 40,
    assignedStudents: generateStudents(35, 10),
    status: "Active",
  },
  {
    id: "fac-4",
    name: "Prof. Anita Sharma",
    email: "anita.sharma@aum.edu.in",
    department: "Computer Engineering",
    studentQuota: 40,
    assignedStudents: generateStudents(28, 15),
    status: "Active",
  },
  {
    id: "fac-5",
    name: "Dr. Vikram Joshi",
    email: "vikram.joshi@aum.edu.in",
    department: "AIML",
    studentQuota: 50,
    assignedStudents: generateStudents(45, 20),
    status: "Active",
  },
  {
    id: "fac-6",
    name: "Prof. Kavita Desai",
    email: "kavita.desai@aum.edu.in",
    department: "Information Technology",
    studentQuota: 40,
    assignedStudents: generateStudents(30, 3),
    status: "Inactive",
  },
  {
    id: "fac-7",
    name: "Dr. Amit Naik",
    email: "amit.naik@aum.edu.in",
    department: "AIDS",
    studentQuota: 30,
    assignedStudents: generateStudents(22, 7),
    status: "Active",
  },
  {
    id: "fac-8",
    name: "Prof. Sneha Ghosh",
    email: "sneha.ghosh@aum.edu.in",
    department: "EXTC",
    studentQuota: 25,
    assignedStudents: generateStudents(18, 12),
    status: "Inactive",
  },
  {
    id: "fac-9",
    name: "Dr. Pradeep Verma",
    email: "pradeep.verma@aum.edu.in",
    department: "Civil",
    studentQuota: 30,
    assignedStudents: generateStudents(15, 17),
    status: "Active",
  },
  {
    id: "fac-10",
    name: "Prof. Lakshmi Iyer",
    email: "lakshmi.iyer@aum.edu.in",
    department: "ECS",
    studentQuota: 30,
    assignedStudents: generateStudents(20, 22),
    status: "Active",
  },
  {
    id: "fac-11",
    name: "Dr. Sanjay Mane",
    email: "sanjay.mane@aum.edu.in",
    department: "Computer Engineering",
    studentQuota: 45,
    assignedStudents: generateStudents(33, 25),
    status: "Active",
  },
  {
    id: "fac-12",
    name: "Prof. Ritu Agarwal",
    email: "ritu.agarwal@aum.edu.in",
    department: "AIML",
    studentQuota: 50,
    assignedStudents: generateStudents(40, 28),
    status: "Active",
  },
];

// ============================================================
// SLICE
// ============================================================

const facultySlice = createSlice({
  name: "faculty",
  initialState: {
    list: DUMMY_FACULTY,
    loading: false,
    error: null,
  },
  reducers: {
    addFaculty: (state, action) => {
      state.list.unshift(action.payload);
    },
    updateFaculty: (state, action) => {
      const idx = state.list.findIndex((f) => f.id === action.payload.id);
      if (idx !== -1) {
        // Merge updated fields while preserving assignedStudents
        state.list[idx] = { ...state.list[idx], ...action.payload };
      }
    },
    deleteFaculty: (state, action) => {
      state.list = state.list.filter((f) => f.id !== action.payload);
    },
    clearFacultyError: (state) => {
      state.error = null;
    },
    updateInternshipLetterStatus: (state, action) => {
      const { facultyId, studentId, status } = action.payload;
      const faculty = state.list.find((f) => f.id === facultyId);
      if (faculty) {
        const student = faculty.assignedStudents.find((s) => s.id === studentId);
        if (student) {
          student.internshipLetter.status = status;
        }
      }
    }
  },
});

export const { addFaculty, updateFaculty, deleteFaculty, clearFacultyError, updateInternshipLetterStatus } =
  facultySlice.actions;
export default facultySlice.reducer;
