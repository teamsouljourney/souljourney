import { useSelector } from "react-redux";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaVideo, FaUser } from "react-icons/fa";
import {
  formatDistanceToNow,
  format,
  isAfter,
  differenceInMinutes,
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

        // If not within five minutes, set a generic message
        if (minutesUntilAppointment > 5) {
          setTimeRemaining(
            formatDistanceToNow(appointmentTime, { addSuffix: true })
          );
        }
      }
    }
  }, [currentUserAppointments]);

  // Check every minute if we've reached the five-minute threshold
  useEffect(() => {
    if (!nearestAppointment || isWithinFiveMinutes) return;

    const checkInterval = setInterval(() => {
      const appointmentTime = new Date(nearestAppointment.startTime);
      const now = new Date();
      const minutesUntilAppointment = differenceInMinutes(appointmentTime, now);

      if (minutesUntilAppointment <= 5) {
        setIsWithinFiveMinutes(true);
        clearInterval(checkInterval);
      } else {
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
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">
            No Upcoming Appointments
          </h2>
          <p className="mt-1 text-gray-500">
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
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Your Next Appointment
            </h2>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isWithinFiveMinutes
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {timeRemaining}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 text-gray-600 bg-gray-200 rounded-full">
            {personInfo?.profileImage ? (
              <img
                src={personInfo.profileImage || "/placeholder.svg"}
                alt={`${personInfo.firstName} ${personInfo.lastName}`}
                className="object-cover w-12 h-12 rounded-full"
              />
            ) : (
              <FaUser className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{`${personInfo?.firstName} ${personInfo?.lastName}`}</h3>
            <p className="text-sm text-gray-500">
              {isTherapist
                ? "Patient"
                : personInfo?.specialization || "Therapist"}
            </p>
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {format(appointmentDate, "EEEE, MMMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}
            </span>
          </div>
        </div>

        {nearestAppointment.videoCallUrl ? (
          <button
            className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() =>
              window.open(nearestAppointment.videoCallUrl, "_blank")
            }
          >
            <FaVideo className="w-4 h-4 mr-2" />
            Join Video Call
          </button>
        ) : (
          <button
            className="flex items-center justify-center w-full px-4 py-2 text-gray-500 bg-gray-200 rounded-md cursor-not-allowed"
            disabled
          >
            <FaVideo className="w-4 h-4 mr-2" />
            Video Call Not Available Yet
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentInfo;
