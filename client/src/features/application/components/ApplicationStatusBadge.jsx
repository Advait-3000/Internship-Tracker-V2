import React from "react";
import Badge from "@/shared/components/ui/Badge";
import { APPLICATION_STATUS } from "@/shared/constants/status";

const ApplicationStatusBadge = ({ status }) => {
  const getVariant = (st) => {
    switch (st) {
      case APPLICATION_STATUS.ACCEPTED:
        return "success";
      case APPLICATION_STATUS.PENDING:
      case APPLICATION_STATUS.UNDER_REVIEW:
        return "warning";
      case APPLICATION_STATUS.REJECTED:
        return "danger";
      case APPLICATION_STATUS.COMPLETED:
        return "info";
      default:
        return "neutral";
    }
  };

  return <Badge variant={getVariant(status)}>{status || "PENDING"}</Badge>;
};

export default ApplicationStatusBadge;
