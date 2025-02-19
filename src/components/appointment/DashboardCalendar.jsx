import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../features/calendarSlice";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useEffect } from "react";
import { getSingleAppointmentSuccess } from "../../features/appointmentSlice";
import { useNavigate } from "react-router-dom";

const DashboardCalendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getSingleAppointment } = useAppointmentCall();
  const { getTherapistTimeTable } = useTherapistCall();

  const { currentUser } = useSelector((state) => state.auth);
  const { singleAppointment } = useSelector((state) => state.appointments);
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );

  const handleEventClick = (info) => {
    getSingleAppointment(info.event?._def.publicId);
  };

  useEffect(() => {
    return () => {
      dispatch(getSingleAppointmentSuccess(null));
    };
  }, [navigate]);

  useEffect(() => {
    if (singleAppointment?.therapistId?._id) {
      getTherapistTimeTable(singleAppointment.therapistId._id);
    }
  }, [singleAppointment]);

  const handleDateSelect = (date) => {
    dispatch(setSelectedDate(date));
  };

  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  const formattedEvents = currentUserAppointments?.map((appointment) => ({
    id: appointment._id,
    title: currentUser?.isTherapist
      ? `${appointment.userId.firstName} ${appointment.userId.lastName}`
      : `${appointment.therapistId.firstName} ${appointment.therapistId.lastName}`,
    start: appointment.startTime,
    end: appointment.endTime,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={formattedEvents}
      eventClick={handleEventClick}
      select={(info) => handleDateSelect(info.startStr)}
      validRange={{ start: todayFormatted }}
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
  );
};

export default DashboardCalendar;
