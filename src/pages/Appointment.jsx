import { useSelector } from "react-redux";
import { useEffect } from "react";
import useAppointmentCall from "../hooks/useAppointmentCall";
import AppointmentCard from "../components/appointment/AppointmentCard";
import DashboardCalendar from "../components/appointment/DashboardCalendar";
import NoAppointments from "../components/appointment/NoAppointments";
import AppointmentHeader from "../components/appointment/AppointmentHeader";
import { useTranslation } from "react-i18next";
import { hasUpcomingAppointments } from "../helper/dateFormatter";

const Appointment = () => {
  const { getUserAppointments } = useAppointmentCall();
  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserAppointments, singleAppointment } = useSelector(
    (state) => state.appointments
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser?._id) {
      getUserAppointments(currentUser._id);
    }
  }, [currentUser?._id]);

  // Check if there are any upcoming appointments
  const hasUpcoming = hasUpcomingAppointments(currentUserAppointments);

  return (
    <div className="container px-4 py-16 mx-auto">
      {currentUser?.isTherapist || hasUpcoming ? (
        <div className="space-y-6">
          <AppointmentHeader />

          <div className="p-4 bg-white border rounded-lg shadow-sm dark:bg-background-dark">
            <DashboardCalendar />
          </div>
        </div>
      ) : (
        <NoAppointments />
      )}

      {singleAppointment && (
        <div className="mt-8">
          <AppointmentCard />
        </div>
      )}
    </div>
  );
};

export default Appointment;
