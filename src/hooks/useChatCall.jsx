import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useAxios from "./useAxios";
import {
  createChatSuccess,
  fetchFail,
  fetchStart,
  getAllChatsSuccess,
  receiveMessage,
  setSocket,
  setSocketConnected,
  setUserConnected,
  updateOnlineUsers,
} from "../features/chatSlice";
import { useEffect, useCallback } from "react";
import io from "socket.io-client";
import { toastErrorNotify } from "../helper/ToastNotify";

const useChatCall = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { socket, isConnected } = useSelector((state) => state.chats);
  const { currentUser } = useSelector((state) => state.auth);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

  // Socket event handler configurations
  const configureSocketEvents = useCallback(
    (socket) => {
      const eventHandlers = {
        connect: (userId) => {
          dispatch(setSocketConnected(true));
          dispatch(setUserConnected({ userId, isOnline: true }));
        },
        disconnect: (userId) => {
          dispatch(setSocketConnected(false));
          dispatch(setUserConnected({ userId, isOnline: false }));
        },
        connect_error: (error) => {
          console.error("Socket connection error:", error);
          dispatch(setSocketConnected(false));
        },
        receiveMessage: (newMessage) => {
          if (newMessage && newMessage.content) {
            if (!newMessage.createdAt) {
              newMessage.createdAt = new Date().toISOString();
            }

            dispatch(receiveMessage(newMessage));
          } else {
            console.error("Received invalid message format:", newMessage);
          }
        },
        messageSent: (message) => {
          // console.log("Message sent confirmation received:", message);
        },
        userStatusUpdate: (users) => {
          dispatch(updateOnlineUsers(users));
        },
        userConnected: (userId) => {
          dispatch(setUserConnected({ userId, isOnline: true }));
        },
        userDisconnected: (userId) => {
          dispatch(setUserConnected({ userId, isOnline: false }));
        },
      };

      // Attach all event handlers
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        socket.on(event, handler);
      });

      return socket;
    },
    [dispatch]
  );

  // Initialize socket connection
  const initializeSocket = useCallback(() => {
    if (!socket && currentUser?._id) {
      const socketConfig = {
        query: {
          userId: currentUser._id,
          userModel: currentUser?.isTherapist ? "Therapist" : "User",
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ["websocket", "polling"],
      };

      const newSocket = configureSocketEvents(io(SOCKET_URL, socketConfig));
      dispatch(setSocket(newSocket));
      return newSocket;
    }
    return socket;
  }, [
    currentUser?._id,
    currentUser?.isTherapist,
    dispatch,
    socket,
    configureSocketEvents,
    SOCKET_URL,
  ]);

  useEffect(() => {
    const socketInstance = initializeSocket();

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        dispatch(setSocketConnected(false));
      }
    };
  }, [initializeSocket, dispatch]);

  // API functions
  const getAllChats = async (userId, userModel, chatWithId, chatWithModel) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${BASE_URL}messages?userId=${userId}&userModel=${userModel}&chatWithId=${chatWithId}&chatWithModel=${chatWithModel}`
      );
      dispatch(getAllChatsSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("chatCall.fetchFailed")
      );
    }
  };

  const createChat = async (messageData) => {
    dispatch(fetchStart());
    try {
      // Create temp message with ID for optimistic updates
      const tempMessage = {
        ...messageData,
        _id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      // Optimistically add the message to the UI
      dispatch(createChatSuccess({ data: tempMessage }));

      // Send through socket if connected
      if (socket && isConnected) {
        socket.emit("sendMessage", tempMessage);
      } else {
        console.warn("Socket not connected, message will be sent via API only");
      }

      // Save to database
      const { data } = await axiosWithToken.post(
        `${BASE_URL}messages`,
        messageData
      );

      // Replace temp message with server response
      dispatch(createChatSuccess({ data }));
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("chatCall.sendFailed")
      );
      throw error;
    }
  };

  return {
    getAllChats,
    createChat,
    initializeSocket,
  };
};

export default useChatCall;
