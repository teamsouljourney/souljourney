import { useSelector } from "react-redux";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import useVideoCall from "../../hooks/useVideoCall";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import {
  getNearestAppointment,
  isWithinAppointmentTime,
  getAppointmentTimeStatus,
  formatDateTime,
  formatAppointmentTimeRange,
} from "../../helper/dateFormatter";

const AppointmentInfo = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );
  const { callStatus } = useSelector((state) => state.video);
  const { getUserAppointments } = useAppointmentCall();
  const { initiateCall, acceptCall } = useVideoCall();
  const [timeRemaining, setTimeRemaining] = useState("");
  const [nearestAppointment, setNearestAppointment] = useState(null);
  const [isWithinTime, setIsWithinTime] = useState(false);
  const isTherapist = currentUser?.isTherapist === true;

  useEffect(() => {
    if (currentUser?._id) {
      getUserAppointments(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUserAppointments?.length > 0) {
      // Find the nearest upcoming or current appointment
      const nearest = getNearestAppointment(currentUserAppointments);
      setNearestAppointment(nearest);

      if (nearest) {
        // Check if current time is within appointment time
        const withinTime = isWithinAppointmentTime(
          nearest.startTime,
          nearest.endTime
        );
        setIsWithinTime(withinTime);

        // Set time remaining
        setTimeRemaining(
          getAppointmentTimeStatus(nearest.startTime, nearest.endTime)
        );
      }
    }
  }, [currentUserAppointments]);

  // Update time remaining every minute
  useEffect(() => {
    if (!nearestAppointment) return;

    const timer = setInterval(() => {
      const withinTime = isWithinAppointmentTime(
        nearestAppointment.startTime,
        nearestAppointment.endTime
      );
      setIsWithinTime(withinTime);
      setTimeRemaining(
        getAppointmentTimeStatus(
          nearestAppointment.startTime,
          nearestAppointment.endTime
        )
      );

      // Clear interval if appointment has ended
      if (
        getAppointmentTimeStatus(
          nearestAppointment.startTime,
          nearestAppointment.endTime
        ) === "Appointment ended"
      ) {
        clearInterval(timer);
      }
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [nearestAppointment]);

  const handleInitiateCall = () => {
    if (nearestAppointment && isTherapist && isWithinTime) {
      initiateCall(nearestAppointment._id, nearestAppointment.userId._id);
    }
  };

  const handleAcceptCall = () => {
    if (nearestAppointment && !isTherapist && isWithinTime) {
      acceptCall(nearestAppointment._id);
    }
  };

  if (!nearestAppointment) {
    return (
      <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-background-lightdark dark:text-offWhite-dark">
        <div className="p-3">
          <h2 className="text-lg font-bold text-gray-800">
            No Upcoming Appointments
          </h2>
          <p className="text-sm text-gray-500">
            You dont have any upcoming appointments scheduled.
          </p>
        </div>
      </div>
    );
  }

  const appointmentDate = new Date(nearestAppointment.appointmentDate);
  const startTime = new Date(nearestAppointment.startTime);
  const endTime = new Date(nearestAppointment.endTime);

  // Determine which person's info to display based on user role
  const personInfo = isTherapist
    ? nearestAppointment.userId // Show patient info if user is therapist
    : nearestAppointment.therapistId; // Show therapist info if user is patient

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-background-lightdark dark:text-offWhite-dark">
      <div className="p-3 md:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-600 bg-gray-200 rounded-full">
              {personInfo?.profileImage ? (
                <img
                  src={personInfo.profileImage || "/placeholder.svg"}
                  alt={`${personInfo.firstName} ${personInfo.lastName}`}
                  className="object-cover w-10 h-10 rounded-full"
                />
              ) : (
                <FaUser className="w-5 h-5" />
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-800 dark:text-offWhite-dark md:text-base">
                {`${personInfo?.firstName} ${personInfo?.lastName}`}
                <span className="ml-2 text-xs text-gray-500 dark:text-offWhite-dark">
                  {isTherapist
                    ? "Client"
                    : personInfo?.specialization || "Therapist"}
                </span>
              </h3>

              <div className="flex items-center mt-1 text-xs text-gray-600 dark:text-offWhite-dark">
                <FaCalendarAlt className="w-3 h-3 mr-1" />
                <span className="mr-3">
                  {formatDateTime(appointmentDate, "appointmentDate")}
                </span>
                <FaClock className="w-3 h-3 mr-1" />
                <span>{formatAppointmentTimeRange(startTime, endTime)}</span>
              </div>
            </div>
          </div>

          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isWithinTime
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {timeRemaining}
          </div>
        </div>

        {/* Call status and action buttons */}
        <div className="mt-4 ">
          {callStatus === "idle" &&
            isWithinTime &&
            (isTherapist ? (
              <button
                onClick={handleInitiateCall}
                className="flex items-center justify-center w-full px-4 py-2 text-white transition duration-300 rounded-md bg-navy hover:bg-navy-dark"
              >
                <FaPhone className="w-4 h-4 mr-2" />
                Start Call
              </button>
            ) : (
              <div className="text-center text-gray-600 dark:text-offWhite-dark">
                Waiting for therapist to start the call...
              </div>
            ))}

          {callStatus === "incoming" && !isTherapist && isWithinTime && (
            <button
              onClick={handleAcceptCall}
              className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
            >
              <FaPhone className="w-4 h-4 mr-2" />
              Accept Call
            </button>
          )}

          {callStatus === "outgoing" && isTherapist && (
            <div className="text-center text-navy dark:text-offWhite-dark">
              Calling patient...
            </div>
          )}

          {callStatus === "connected" && (
            <div className="text-center text-green-600">Call in progress</div>
          )}

          {!isWithinTime && (
            <button
              disabled
              className="flex items-center justify-center w-full px-4 py-2 mt-3 text-gray-500 bg-gray-100 rounded-md cursor-not-allowed"
            >
              <FaVideo className="w-4 h-4 mr-2" />
              {new Date() < startTime
                ? "Video Call Available at Start Time"
                : "Appointment Ended"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentInfo;
