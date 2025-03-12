import React, { useEffect, useRef, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

const ViewNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const dropdownRef = useRef(null);

  const notifications = [
    { id: 1, message: "Yeni bir mesajınız var", time: "5 dakika önce" },
    { id: 2, message: "Siparişiniz kargoya verildi", time: "1 saat önce" },
    { id: 3, message: "Ödemeniz onaylandı", time: "3 saat önce" },
  ];

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

  const markAsRead = () => {
    setNotificationCount(0);
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="relative p-1 rounded-full bg-navy text-offWhite hover:text-white hover:bg-navy-dark focus:outline-none focus:ring-2  focus:ring-navy"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />

        <span className="absolute -top-1 -right-1 bg-red-500 text-white min-w-4 h-4 flex items-center justify-center rounded-full text-xs">
          {notificationCount}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
          {/* Dropdown Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Bildirimler</h3>
            {notificationCount > 0 && (
              <button
                onClick={markAsRead}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                Tümünü okundu işaretle
              </button>
            )}
          </div>

          {/* Bildirim Listesi */}
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="px-4 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          notificationCount > 0 ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      ></span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-center text-gray-500">
                Bildiriminiz bulunmuyor
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNotifications;
