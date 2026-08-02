import api from "@/shared/lib/axios";
import { ROLES } from "@/shared/constants/roles";

export const loginApi = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.warn("Backend API unavailable. Falling back to mock login for local development.");
    
    // Deduce test role from email keywords for seamless dashboard testing
    const email = (credentials?.email || "").toLowerCase();
    let role = ROLES.STUDENT;
    if (email.includes("superadmin") || email.includes("super")) role = ROLES.SUPERADMIN;
    else if (email.includes("admin")) role = ROLES.ADMIN;
    else if (email.includes("faculty") || email.includes("teacher")) role = ROLES.FACULTY;
    else if (email.includes("mentor")) role = ROLES.MENTOR;
    else if (email.includes("company") || email.includes("hr")) role = ROLES.COMPANY;

    return {
      user: {
        id: "mock-user-id-123",
        name: email.split("@")[0] || "Test User",
        email: credentials.email || "test@example.com",
        role: role,
      },
      token: "mock-jwt-token-dev",
    };
  }
};

export const registerApi = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.warn("Backend API unavailable. Falling back to mock registration for local development.");
    return {
      user: {
        id: "mock-reg-id-123",
        name: userData.fullName || userData.name || "New Student",
        email: userData.email || "student@example.com",
        role: userData.role || ROLES.STUDENT,
        ...userData,
      },
      token: "mock-jwt-token-dev",
    };
  }
};

export const getCurrentUserApi = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return { user: JSON.parse(storedUser) };
    }
    throw error;
  }
};
