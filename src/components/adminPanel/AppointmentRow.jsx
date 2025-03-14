import { TrashIcon } from "@heroicons/react/24/outline";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { formatDateTime } from "../../helper/dateFormatter";

const AppointmentRow = ({ appointment }) => {
  const { deleteAppointmentByAdmin } = useAppointmentCall();

  if (!appointment) return null;

  const { _id, therapistId, userId, appointmentDate, startTime, endTime } =
    appointment;

  return (
    <div className="flex flex-col py-4 space-y-2 border-b md:space-y-0 md:grid md:grid-cols-12 md:gap-4 md:items-center">
      <div className="col-span-3">
        <div className="font-medium">
          {therapistId
            ? `${therapistId.firstName} ${therapistId.lastName}`
            : "N/A"}
        </div>
        <div className="text-sm text-gray-500 dark:text-offWhite md:hidden">{_id || "N/A"}</div>
      </div>
      <div className="col-span-3">
        <span className="text-sm">
          {userId ? `${userId.firstName} ${userId.lastName}` : "N/A"}
        </span>
      </div>
      <div className="col-span-2">
        <span className="text-sm text-gray-500 dark:text-offWhite">
          {appointmentDate ? formatDateTime(appointmentDate, "date") : "N/A"}
        </span>
      </div>
      <div className="col-span-3 md:text-center">
        <span className="text-sm text-gray-500 dark:text-offWhite">
          {startTime && endTime
            ? formatDateTime(startTime, "timeRange", endTime)
            : "N/A"}
        </span>
      </div>
      <div className="flex justify-end col-span-1 md:justify-center">
        <div>
          <button
            onClick={() => deleteAppointmentByAdmin(_id)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-background-dark"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRow;
