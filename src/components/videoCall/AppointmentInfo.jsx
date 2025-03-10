import { useSelector } from "react-redux";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaVideo, FaUser } from "react-icons/fa";
import {
  formatDistanceToNow,
  format,
  isAfter,
  differenceInMinutes,
  isSameMinute,
  isAfter as isDateAfter,
} from "date-fns";

const AppointmentInfo = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );
  const { getUserAppointments } = useAppointmentCall();
  const [timeRemaining, setTimeRemaining] = useState("");
  const [nearestAppointment, setNearestAppointment] = useState(null);
  const [isWithinFiveMinutes, setIsWithinFiveMinutes] = useState(false);
  const [isAppointmentStarted, setIsAppointmentStarted] = useState(false);
  const isTherapist = currentUser?.isTherapist === true;

  useEffect(() => {
    if (currentUser?._id) {
      getUserAppointments(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUserAppointments?.length > 0) {
      // Find the nearest upcoming appointment
      const now = new Date();
      const upcomingAppointments = currentUserAppointments.filter(
        (appointment) => isAfter(new Date(appointment.startTime), now)
      );

      // Sort by date (nearest first)
      upcomingAppointments.sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      );

      const nearest = upcomingAppointments[0];
      setNearestAppointment(nearest);

      // Check if appointment is within five minutes
      if (nearest) {
        const appointmentTime = new Date(nearest.startTime);
        const minutesUntilAppointment = differenceInMinutes(
          appointmentTime,
          now
        );
        setIsWithinFiveMinutes(minutesUntilAppointment <= 5);

        // Check if appointment has started
        setIsAppointmentStarted(
          isDateAfter(now, appointmentTime) ||
            isSameMinute(now, appointmentTime)
        );

        // If not within five minutes, set a generic message
        if (minutesUntilAppointment > 5) {
          setTimeRemaining(
            formatDistanceToNow(appointmentTime, { addSuffix: true })
          );
        }
      }
    }
  }, [currentUserAppointments]);

  // Check every minute if we've reached the five-minute threshold or if appointment has started
  useEffect(() => {
    if (!nearestAppointment) return;

    const checkInterval = setInterval(() => {
      const appointmentTime = new Date(nearestAppointment.startTime);
      const now = new Date();
      const minutesUntilAppointment = differenceInMinutes(appointmentTime, now);

      // Update appointment started status
      const hasStarted =
        isDateAfter(now, appointmentTime) || isSameMinute(now, appointmentTime);
      setIsAppointmentStarted(hasStarted);

      if (minutesUntilAppointment <= 5 && !isWithinFiveMinutes) {
        setIsWithinFiveMinutes(true);
      } else if (!isWithinFiveMinutes) {
        // Update the general time remaining message
        setTimeRemaining(
          formatDistanceToNow(appointmentTime, { addSuffix: true })
        );
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInterval);
  }, [nearestAppointment, isWithinFiveMinutes]);

  // Only start the countdown when within five minutes
  useEffect(() => {
    if (!nearestAppointment || !isWithinFiveMinutes) return;

    const timer = setInterval(() => {
      const appointmentTime = new Date(nearestAppointment.startTime);
      const now = new Date();

      // Calculate time difference
      const diff = appointmentTime.getTime() - now.getTime();

      // Update appointment started status
      const hasStarted =
        isDateAfter(now, appointmentTime) || isSameMinute(now, appointmentTime);
      setIsAppointmentStarted(hasStarted);

      if (diff <= 0) {
        setTimeRemaining("Appointment is now!");
        clearInterval(timer);
        return;
      }

      // Calculate minutes and seconds when within five minutes
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [nearestAppointment, isWithinFiveMinutes]);

  if (!nearestAppointment) {
    return (
      <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="p-3">
          <h2 className="text-lg font-bold text-gray-800">
            No Upcoming Appointments
          </h2>
          <p className="text-sm text-gray-500">
            You don't have any upcoming appointments scheduled.
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
    <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-md">
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
              <h3 className="text-sm font-medium text-gray-800 md:text-base">
                {`${personInfo?.firstName} ${personInfo?.lastName}`}
                <span className="ml-2 text-xs text-gray-500">
                  {isTherapist
                    ? "Patient"
                    : personInfo?.specialization || "Therapist"}
                </span>
              </h3>

              <div className="flex items-center mt-1 text-xs text-gray-600">
                <FaCalendarAlt className="w-3 h-3 mr-1" />
                <span className="mr-3">
                  {format(appointmentDate, "MMM d, yyyy")}
                </span>
                <FaClock className="w-3 h-3 mr-1" />
                <span>
                  {format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isAppointmentStarted
                ? "bg-green-100 text-green-600"
                : isWithinFiveMinutes
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isAppointmentStarted ? "In Progress" : timeRemaining}
          </div>
        </div>

        {nearestAppointment.videoCallUrl && isAppointmentStarted ? (
          <button
            onClick={() =>
              window.open(nearestAppointment.videoCallUrl, "_blank")
            }
            className="flex items-center justify-center w-full px-4 py-2 mt-3 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <FaVideo className="w-4 h-4 mr-2" />
            Join Video Call
          </button>
        ) : (
          <button
            disabled
            className="flex items-center justify-center w-full px-4 py-2 mt-3 text-gray-500 bg-gray-100 rounded-md cursor-not-allowed"
          >
            <FaVideo className="w-4 h-4 mr-2" />
            {nearestAppointment.videoCallUrl
              ? "Video Call Available at Start Time"
              : "Video Call Not Available Yet"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentInfo;
