import React from "react";

const UserAvatar = ({ name = "User", avatarUrl, size = "md" }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl",
  };

  const getInitials = (str) => {
    return str
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`rounded-full object-cover border border-gray-200 dark:border-gray-700 ${sizes[size] || sizes.md}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-blue-600 text-white font-bold flex items-center justify-center ${sizes[size] || sizes.md}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;
