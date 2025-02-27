import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminModal from "../components/adminPanel/AdminModal";
import ListToolbar from "../components/adminPanel/ListToolBar";
import Pagination from "../components/adminPanel/Pagination";
import { PlusIcon } from "@heroicons/react/24/outline";
import useAppointmentCall from "../hooks/useAppointmentCall";
import { toggleModal } from "../features/appointmentSlice";
import AppointmentRow from "../components/adminPanel/AppointmentRow";
import AppointmentForm from "../components/adminPanel/AppointmentForm";

const AppointmentManagement = () => {
  const dispatch = useDispatch();
  const { getAllAppointments } = useAppointmentCall();
  const { isModalOpen, appointments } = useSelector(
    (state) => state.appointments
  );
  const { pagAppointments } = useSelector((state) => state.pagination);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToogleModal = (payload) => {
    dispatch(toggleModal(payload));
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <div className="container py-10 mx-auto ">
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-6">
          <ListToolbar
            title="Appointment List"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search appointment..."
            actions={
              <button
                onClick={() => handleToogleModal(true)}
                className="px-4 py-2 text-white transition duration-300 rounded-md bg-seaGreen hover:bg-navy"
              >
                <PlusIcon className="inline-block w-5 h-5 mr-2" />
                Add a new Appointment
              </button>
            }
          />
          <div>
            <div className="hidden text-sm font-medium text-gray-500 md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-3">Therapist</div>
              <div className="col-span-3">Client</div>
              <div className="col-span-2 ">Date</div>
              <div className="col-span-2 ">Time</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {pagAppointments?.map((appointment) => (
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

      {isModalOpen && (
        <AdminModal>
          <AppointmentForm />
        </AdminModal>
      )}
    </div>
  );
};

export default AppointmentManagement;
