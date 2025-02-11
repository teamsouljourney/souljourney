import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useAppointmentCall from "../hooks/useAppointmentCall";
import AppointmentCard from "../components/appointment/AppointmentCard";

const Appointment = () => {
  const { getAllAppointments, getSingleAppointment } = useAppointmentCall();
  const { appointments, singleAppointment } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    getAllAppointments();
  }, []);

  const formattedEvents = appointments?.map((appointment) => ({
    id: appointment._id,
    title: `${appointment.userId.firstName} ${appointment.userId.lastName}`,
    start: appointment.startTime,
    end: appointment.endTime,
  }));

  const handleEventClick = (info) => {
    getSingleAppointment(info.event?._def.publicId);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Appointments</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        hiddenDays={[0, 6]}
        height="auto"
      />

      {singleAppointment && <AppointmentCard />}
    </div>
  );
};

export default Appointment;
