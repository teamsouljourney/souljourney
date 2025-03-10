import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentDetails from "./AppointmentDetails";
import AppointmentCancel from "./AppointmentCancel";
import AppointmentEdit from "./AppointmentEdit";

const AppointmentCard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isEditing } = useSelector((state) => state.calendar);
  const { singleAppointment } = useSelector((state) => state.appointments);
  const [showJoinButton, setShowJoinButton] = useState(false);

  useEffect(() => {
    // Check if appointment times are available
    if (singleAppointment?.startTime && singleAppointment?.endTime) {
      const startTime = new Date(singleAppointment.startTime);
      const endTime = new Date(singleAppointment.endTime);
      const now = new Date();

      // Initial state
      setShowJoinButton(now >= startTime && now <= endTime);

      // Calculate time until state should change
      let timeoutDelay;
      if (now < startTime) {
        // Time until button should appear
        timeoutDelay = startTime.getTime() - now.getTime();
      } else if (now <= endTime) {
        // Time until button should disappear
        timeoutDelay = endTime.getTime() - now.getTime();
      } else {
        // Past the end time, no need for timeout
        return;
      }

      // Set timeout to change button state at exactly the right time
      const timeout = setTimeout(() => {
        if (now < startTime) {
          // Button should now appear
          setShowJoinButton(true);

          // Set another timeout for when it should disappear
          const disappearTimeout = setTimeout(() => {
            setShowJoinButton(false);
          }, endTime.getTime() - startTime.getTime());

          return () => clearTimeout(disappearTimeout);
        } else {
          // Button should now disappear
          setShowJoinButton(false);
        }
      }, timeoutDelay);

      return () => clearTimeout(timeout);
    }
  }, [singleAppointment]);

  const handleJoinMeeting = () => {
    // Navigate to the video call page
    navigate("/profil/video-call");
  };

  return (
    <div className="max-w-md mx-auto mt-6 overflow-hidden bg-white shadow-md rounded-xl md:max-w-xl">
      <div className="p-6">
        <h3 className="text-lg font-bold text-navy">
          {t("appointmentDetails")}
        </h3>
        <AppointmentDetails />

        <div className="flex flex-wrap gap-2 mt-4">
          {isEditing ? (
            <AppointmentEdit />
          ) : (
            <>
              <AppointmentCancel />

              {/* Join Meeting Button - visible during appointment time window */}
              {showJoinButton && (
                <button
                  onClick={handleJoinMeeting}
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  {t("joinMeeting")}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
