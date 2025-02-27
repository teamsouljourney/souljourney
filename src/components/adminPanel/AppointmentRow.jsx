import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { formatDateTime } from "../../helper/dateFormatter";
import {
  setNewAppointment,
  toggleModal,
} from "../../features/appointmentSlice";

const AppointmentRow = ({ appointment }) => {
  const dispatch = useDispatch();
  const { deleteAppointment } = useAppointmentCall();

  if (!appointment) return null;

  const { _id, therapistId, userId, appointmentDate, startTime, endTime } =
    appointment;

  const handleUpdateAppointment = () => {
    dispatch(setNewAppointment(appointment));
    dispatch(toggleModal(true));
  };

  return (
    <div className="flex flex-col py-4 space-y-2 border-b md:space-y-0 md:grid md:grid-cols-12 md:gap-4 md:items-center">
      <div className="col-span-3">
        <div className="font-medium">
          {therapistId
            ? `${therapistId.firstName} ${therapistId.lastName}`
            : "N/A"}
        </div>
        <div className="text-sm text-gray-500 md:hidden">{_id || "N/A"}</div>
      </div>
      <div className="col-span-3">
        <span className="text-sm">
          {userId ? `${userId.firstName} ${userId.lastName}` : "N/A"}
        </span>
      </div>
      <div className="col-span-2">
        <span className="text-sm text-gray-500">
          {appointmentDate ? formatDateTime(appointmentDate, "date") : "N/A"}
        </span>
      </div>
      <div className="col-span-2">
        <span className="text-sm text-gray-500">
          {startTime && endTime
            ? formatDateTime(startTime, "timeRange", endTime)
            : "N/A"}
        </span>
      </div>
      <div className="flex justify-end col-span-2">
        <div className="flex gap-2">
          <button
            onClick={handleUpdateAppointment}
            className="p-1 rounded hover:bg-gray-100"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteAppointment(_id)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRow;
