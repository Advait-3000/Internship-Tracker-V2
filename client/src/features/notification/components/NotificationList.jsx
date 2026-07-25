import React from "react";

const NotificationList = ({ notifications = [], onMarkRead }) => {
  if (notifications.length === 0) {
    return <div className="p-4 text-center text-sm text-gray-500">No notifications available.</div>;
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {notifications.map((item) => (
        <div
          key={item.id}
          className={`p-3 flex items-start justify-between text-sm ${
            item.read ? "opacity-60" : "bg-blue-50/50 dark:bg-blue-900/20"
          }`}
        >
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.message}</p>
          </div>
          {!item.read && onMarkRead && (
            <button
              onClick={() => onMarkRead(item.id)}
              className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline ml-2"
            >
              Mark Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
