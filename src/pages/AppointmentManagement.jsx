import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListToolbar from "../components/adminPanel/ListToolBar";
import Pagination from "../components/adminPanel/Pagination";
import useAppointmentCall from "../hooks/useAppointmentCall";
import AppointmentRow from "../components/adminPanel/AppointmentRow";

const AppointmentManagement = () => {
  const { getAllAppointments } = useAppointmentCall();
  const { appointments } = useSelector((state) => state.appointments);
  const { pagAppointments } = useSelector((state) => state.pagination);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllAppointments();
  }, []);

  const displayedAppointments =
    searchTerm.trim() === ""
      ? pagAppointments
      : pagAppointments?.filter((appointment) =>
          [
            appointment.therapistId?.firstName,
            appointment.therapistId?.lastName,
            appointment.userId?.firstName,
            appointment.userId?.lastName,
          ]
            .filter(Boolean)
            .some((name) =>
              name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

  return (
    <div className="container py-10 mx-auto ">
      <div className="bg-white dark:bg-background-lightdark text-navy dark:text-offWhite-dark border rounded-lg shadow-sm">
        <div className="p-6">
          <ListToolbar
            title="Appointment List"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search appointment..."
          />
          <div>
            <div className="hidden text-sm font-medium text-gray-500 dark:text-seaGreen md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-3">Therapist</div>
              <div className="col-span-3">Client</div>
              <div className="col-span-2 ">Date</div>
              <div className="col-span-3 md:text-center">Time</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            {displayedAppointments?.map((appointment) => (
              <AppointmentRow key={appointment._id} appointment={appointment} />
            ))}
          </div>
          <Pagination
            data={appointments}
            endpoint={"appointments"}
            slice={"pagAppointments"}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;
