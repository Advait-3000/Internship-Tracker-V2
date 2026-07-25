import React from "react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";
import UserAvatar from "./UserAvatar";

const UserProfileCard = ({ user }) => {
  const { name, email, role, department, avatarUrl } = user || {};

  return (
    <Card className="flex items-center space-x-4">
      <UserAvatar name={name || "John Doe"} avatarUrl={avatarUrl} size="lg" />
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name || "John Doe"}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{email || "john.doe@example.com"}</p>
        <div className="mt-2 flex items-center space-x-2">
          <Badge variant="info">{role ? role.toUpperCase() : "STUDENT"}</Badge>
          {department && <span className="text-xs text-gray-400 font-medium">• {department}</span>}
        </div>
      </div>
    </Card>
  );
};

export default UserProfileCard;
