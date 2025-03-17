import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  createNotificationSuccess,
  fetchFail,
  fetchStart,
  getAllNotificationSuccess,
  getNotificationSuccess,
  receiveNewNotification,
  removeNotification,
} from "../features/notificationSlice";
import useAxios from "./useAxios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { toastErrorNotify } from "../helper/ToastNotify";

const useNotificationCall = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
  const socketRef = useRef(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    if (!socketRef.current) {
      // Connect to socket server
      socketRef.current = io(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // Socket event listeners
      socketRef.current.on("connect", () => {
        // console.log("Notification socket connected:", socketRef.current.id);
        setIsSocketConnected(true);
      });

      socketRef.current.on("disconnect", () => {
        // console.log("Notification socket disconnected");
        setIsSocketConnected(false);
      });

      // Listen for "receiveNotification" event from server
      socketRef.current.on("receiveNotification", (notification) => {
        // console.log("New notification received via socket:", notification);
        if (notification && notification._id) {
          dispatch(receiveNewNotification(notification));
        } else {
          // console.error("Received invalid notification format:", notification);
        }
      });

      socketRef.current.on("notificationSent", (notification) => {
        // console.log("Notification sent confirmation:", notification);
      });
    }

    // Clean up socket connection when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [dispatch, SOCKET_URL]);

  // Join user-specific notification room
  const joinNotificationRoom = (userId) => {
    if (!userId) return;

    if (socketRef.current && isSocketConnected) {
      socketRef.current.emit("joinNotificationRoom", userId);
      // console.log("Joined notification room for user:", userId);
    } else {
      // console.log("Socket not connected, will try to join room when connected");
      // Try to reconnect if not connected
      if (socketRef.current) {
        socketRef.current.connect();

        // Set up a one-time event handler to join room after connection
        socketRef.current.once("connect", () => {
          socketRef.current.emit("joinNotificationRoom", userId);
          // console.log("Joined notification room after reconnection for user:", userId);
        });
      }
    }
  };

  const getAllNotifications = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`${BASE_URL}notifications`);
      // Ensure data is an array and filter to only include unread notifications
      const notificationsArray = Array.isArray(data)
        ? data.filter((n) => !n.isRead)
        : Array.isArray(data.data)
        ? data.data.filter((n) => !n.isRead)
        : [];
      dispatch(getAllNotificationSuccess(notificationsArray));
    } catch (error) {
      // console.error("Error fetching notifications:", error);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("notificationCall.fetchFailed")
      );
    }
  };

  const getNotifications = async (id, recieverId, recieverModel) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${BASE_URL}notifications/${id}?recieverId=${recieverId}&recieverModel=${recieverModel}`
      );
      // Filter to only include unread notifications
      const notificationsArray = Array.isArray(data)
        ? data.filter((n) => !n.isRead)
        : Array.isArray(data.data)
        ? data.data.filter((n) => !n.isRead)
        : [];
      dispatch(getNotificationSuccess(notificationsArray));
    } catch (error) {
      // console.error("Error fetching specific notifications:", error);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message ||
          t("notificationCall.fetchSpecificFailed")
      );
    }
  };

  const createNotification = async (notificationData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(
        `${BASE_URL}notifications`,
        notificationData
      );

      // Get the actual notification data from the response
      const notificationResult = data.data || data;
      dispatch(createNotificationSuccess(notificationResult));

      // Emit socket event to notify server about new notification
      if (socketRef.current && isSocketConnected) {
        socketRef.current.emit("sendNotification", {
          ...notificationData,
          _id: notificationResult._id,
          createdAt: notificationResult.createdAt || new Date().toISOString(),
        });
      }

      return notificationResult;
    } catch (error) {
      // console.error("Error creating notification:", error);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("notificationCall.createFailed")
      );
      throw error;
    }
  };

  const markAsRead = async (notificationId) => {
    dispatch(fetchStart());
    try {
      // First mark as read
      await axiosWithToken.put(`${BASE_URL}notifications/${notificationId}`);

      // Then delete the notification
      await deleteNotification(notificationId);

      // Remove from Redux state
      dispatch(removeNotification(notificationId));

      return { success: true };
    } catch (error) {
      // console.error("Error marking notification as read:", error);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("notificationCall.markAsReadFailed")
      );
      throw error;
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axiosWithToken.delete(`${BASE_URL}notifications/${notificationId}`);

      // Remove from Redux state
      dispatch(removeNotification(notificationId));

      return { success: true };
    } catch (error) {
      // console.error("Error deleting notification:", error);
      toastErrorNotify(
        error.response?.data?.message || t("notificationCall.deleteFailed")
      );
      throw error;
    }
  };

  return {
    getNotifications,
    getAllNotifications,
    createNotification,
    markAsRead,
    deleteNotification,
    joinNotificationRoom,
    socket: socketRef.current,
    isSocketConnected,
  };
};

export default useNotificationCall;
