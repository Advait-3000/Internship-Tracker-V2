import { ROLES } from "@/shared/constants/roles";

export const getDashboardRouteForRole = (role) => {
  switch (role) {
    case ROLES.STUDENT:
      return "/student/dashboard";
    case ROLES.FACULTY:
      return "/faculty/dashboard";
    case ROLES.MENTOR:
      return "/mentor/dashboard";
    case ROLES.COMPANY:
      return "/company/dashboard";
    case ROLES.ADMIN:
      return "/admin/dashboard";
    case ROLES.SUPERADMIN:
      return "/superadmin/dashboard";
    default:
      return "/";
  }
};
