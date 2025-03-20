import React, { useEffect, useRef, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import useNotificationCall from "../hooks/useNotificationCall";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ViewNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, loading } = useSelector(
    (state) => state.notifications
  );
  const {
    getAllNotifications,
    markAsRead,
    joinNotificationRoom,
    isSocketConnected,
  } = useNotificationCall();
  const { currentUser } = useSelector((state) => state.auth);
  const [notificationCount, setNotificationCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser?._id) {
      getAllNotifications();
      joinNotificationRoom(currentUser._id);
    }
  }, [currentUser?._id, isSocketConnected]);

  // Update notification count when notifications change
  useEffect(() => {
    if (Array.isArray(notifications) && currentUser?._id) {
      const unreadNotifications = notifications.filter(
        (notify) => notify.recieverId === currentUser._id
      );
      setNotificationCount(unreadNotifications.length);
    } else {
      setNotificationCount(0);
    }
  }, [notifications, currentUser]);

  // Filter notifications for current user
  const filteredNotifications = React.useMemo(() => {
    if (Array.isArray(notifications) && currentUser?._id) {
      return notifications.filter(
        (notify) => notify.recieverId === currentUser._id
      );
    }
    return [];
  }, [notifications, currentUser]);

  // Format date to relative time
  const formatNotificationTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Just now";
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMarkAllAsRead = async () => {
    // Mark all notifications as read and delete them
    for (const notification of filteredNotifications) {
      await markAsRead(notification._id);
    }
    // Refresh notifications
    getAllNotifications();
    setNotificationCount(0);
  };

  // Handle notification click - navigate to chat if it's a message notification
  const handleNotificationClick = async (notification) => {
    // Mark notification as read and delete it
    await markAsRead(notification._id);

    // Check if it's a message notification
    if (notification.notificationType === "message") {
      // Close the notification dropdown
      setIsOpen(false);

      // Navigate to the chat page
      navigate("/profile/chat");
    }
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        type="button"
        className="relative p-1 rounded-full bg-navy text-offWhite hover:text-white hover:bg-navy-dark focus:outline-none focus:ring-2 focus:ring-navy"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        {notificationCount > 0 && (
          <span className="absolute flex items-center justify-center h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1 min-w-4">
            {notificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 bg-white rounded-md shadow-lg w-80">
          {/* Dropdown Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {t("notifications")}
            </h3>
            {notificationCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                {t("markAsRead")}
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="px-4 py-3 text-center text-gray-500">
                {t("loading")}
              </div>
            ) : filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`px-4 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 
                    ${
                      notification.notificationType === "message"
                        ? "bg-blue-50 cursor-pointer"
                        : "bg-gray-50"
                    }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span
                        className={`inline-block h-2 w-2 rounded-full 
                        ${
                          notification.notificationType === "message"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                      ></span>
                    </div>
                    <div className="flex-1 ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.content}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatNotificationTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-center text-gray-500">
                {t("noNotification")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNotifications;
