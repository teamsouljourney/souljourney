"use client";

import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  createChatSuccess,
  fetchFail,
  fetchStart,
  getAllChatsSuccess,
  receiveMessage,
  setSocket,
  setSocketConnected,
} from "../features/chatSlice";
import { useEffect, useCallback } from "react";
import io from "socket.io-client";

const useChatCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { socket, isConnected } = useSelector((state) => state.chats);
  const { currentUser } = useSelector((state) => state.auth);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

  // Initialize socket connection
  const initializeSocket = useCallback(() => {
    if (!socket && currentUser?._id) {
      console.log("Initializing socket connection...");

      const newSocket = io(SOCKET_URL, {
        query: {
          userId: currentUser?._id,
          userModel: currentUser?.isTherapist ? "Therapist" : "User",
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ["websocket", "polling"], // Try websocket first, fallback to polling
      });

      newSocket.on("connect", () => {
        console.log("Socket connected successfully");
        dispatch(setSocketConnected(true));
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
        dispatch(setSocketConnected(false));
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        dispatch(setSocketConnected(false));
      });

      // Listen for new messages
      newSocket.on("receiveMessage", (newMessage) => {
        console.log("New message received via socket:", newMessage);

        // Make sure the message has the right format before dispatching
        if (newMessage && newMessage.content) {
          // Add a timestamp if it doesn't exist
          if (!newMessage.createdAt) {
            newMessage.createdAt = new Date().toISOString();
          }

          dispatch(receiveMessage(newMessage));
        } else {
          console.error("Received invalid message format:", newMessage);
        }
      });

      // Listen for message sent confirmation
      newSocket.on("messageSent", (message) => {
        console.log("Message sent confirmation received:", message);
      });

      dispatch(setSocket(newSocket));
      return newSocket;
    }
    return socket;
  }, [currentUser?._id, currentUser?.isTherapist, dispatch, socket]); // Added currentUser?.isTherapist

  // Connect to socket when component mounts
  useEffect(() => {
    const socketInstance = initializeSocket();

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      if (socketInstance) {
        console.log("Disconnecting socket on cleanup");
        socketInstance.disconnect();
        dispatch(setSocketConnected(false));
      }
    };
  }, [initializeSocket, dispatch]); // Removed unnecessary dependency

  // List all chats
  const getAllChats = async (userId, userModel, chatWithId, chatWithModel) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${BASE_URL}messages?userId=${userId}&userModel=${userModel}&chatWithId=${chatWithId}&chatWithModel=${chatWithModel}`
      );
      console.log("Fetched chat messages:", data);
      dispatch(getAllChatsSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  // Create a new chat message
  const createChat = async (messageData) => {
    dispatch(fetchStart());
    try {
      // Add a temporary ID to identify this message
      const tempMessage = {
        ...messageData,
        _id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      // Optimistically add the message to the UI
      dispatch(createChatSuccess({ data: tempMessage }));

      // Send message through socket first for real-time delivery
      if (socket && isConnected) {
        console.log("Emitting message via socket:", tempMessage);
        socket.emit("sendMessage", tempMessage);
      } else {
        console.warn("Socket not connected, message will be sent via API only");
      }

      // Then save to database
      const { data } = await axiosWithToken.post(
        `${BASE_URL}messages`,
        messageData
      );
      console.log("Message saved to database:", data);

      // Update the temporary message with the real one from the server
      dispatch(createChatSuccess({ data }));
      return data;
    } catch (error) {
      dispatch(fetchFail());
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
