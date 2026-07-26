import { Router } from "express";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

// import departmentRoutes from "./routes/departments.routes.js";
// import branchRoutes from "./routes/branches.routes.js";
// import academicYearRoutes from "./routes/academicYears.routes.js";
// import divisionRoutes from "./routes/divisions.routes.js";
// import semesterRoutes from "./routes/semesters.routes.js";

// import studentStatusRoutes from "./routes/studentStatuses.routes.js";

// import internshipModeRoutes from "./routes/internshipModes.routes.js";
// import internshipTypeRoutes from "./routes/internshipTypes.routes.js";
// import internshipStatusRoutes from "./routes/internshipStatuses.routes.js";
// import projectStatusRoutes from "./routes/projectStatuses.routes.js";
// import documentTypeRoutes from "./routes/documentTypes.routes.js";
// import challengeTypeRoutes from "./routes/challengeTypes.routes.js";

// import companyRoutes from "./routes/companies.routes.js";
// import companyMentorRoutes from "./routes/companyMentors.routes.js";
// import facultyMentorRoutes from "./routes/facultyMentors.routes.js";

// import internshipRoutes from "./routes/internships.routes.js";
// import projectRoutes from "./routes/projects.routes.js";
// import dailyWorkLogRoutes from "./routes/dailyWorkLogs.routes.js";
// import weeklyReportRoutes from "./routes/weeklyReports.routes.js";
// import mentorReviewRoutes from "./routes/mentorReviews.routes.js";
// import finalFeedbackRoutes from "./routes/finalFeedback.routes.js";
// import studentChallengeRoutes from "./routes/studentChallenges.routes.js";
// import learningOutcomeRoutes from "./routes/learningOutcomes.routes.js";
// import documentRoutes from "./routes/documents.routes.js";
// import notificationRoutes from "./routes/notifications.routes.js";

// import dashboardRoutes from "./routes/dashboard.routes.js";
// import excelRoutes from "./routes/excel.routes.js";
// import reportRoutes from "./routes/report.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

// router.use("/departments", departmentRoutes);
// router.use("/branches", branchRoutes);
// router.use("/academic-years", academicYearRoutes);
// router.use("/divisions", divisionRoutes);
// router.use("/semesters", semesterRoutes);

// router.use("/student-statuses", studentStatusRoutes);

// router.use("/internship-modes", internshipModeRoutes);
// router.use("/internship-types", internshipTypeRoutes);
// router.use("/internship-statuses", internshipStatusRoutes);
// router.use("/project-statuses", projectStatusRoutes);
// router.use("/document-types", documentTypeRoutes);
// router.use("/challenge-types", challengeTypeRoutes);

// router.use("/companies", companyRoutes);
// router.use("/company-mentors", companyMentorRoutes);
// router.use("/faculty-mentors", facultyMentorRoutes);

// router.use("/internships", internshipRoutes);
// router.use("/projects", projectRoutes);
// router.use("/daily-work-logs", dailyWorkLogRoutes);
// router.use("/weekly-reports", weeklyReportRoutes);
// router.use("/mentor-reviews", mentorReviewRoutes);
// router.use("/final-feedbacks", finalFeedbackRoutes);
// router.use("/student-challenges", studentChallengeRoutes);
// router.use("/learning-outcomes", learningOutcomeRoutes);
// router.use("/documents", documentRoutes);
// router.use("/notifications", notificationRoutes);

// router.use("/dashboard", dashboardRoutes);
// router.use("/excel", excelRoutes);
// router.use("/reports", reportRoutes);

export default router;
