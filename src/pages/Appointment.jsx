import { useSelector } from "react-redux";
import { useEffect } from "react";
import useAppointmentCall from "../hooks/useAppointmentCall";
import AppointmentCard from "../components/appointment/AppointmentCard";
import DashboardCalendar from "../components/appointment/DashboardCalendar";
import NoAppointments from "../components/appointment/NoAppointments";

const Appointment = () => {
  const { getUserAppointments } = useAppointmentCall();
  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserAppointments, singleAppointment } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    if (currentUser?._id) {
      getUserAppointments(currentUser._id);
    }
  }, [currentUser?._id]);

  return (
    <div className="py-16">
      {currentUser?.isTherapist || currentUserAppointments?.length > 0 ? (
        <DashboardCalendar />
      ) : (
        <NoAppointments />
      )}

      {singleAppointment && <AppointmentCard />}
    </div>
  );
};

export default Appointment;
