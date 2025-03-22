import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { setEditStatus } from "../../features/calendarSlice";

const AppointmentCancel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { deleteAppointment } = useAppointmentCall();

  const { currentUser } = useSelector((state) => state.auth);
  const { singleAppointment } = useSelector((state) => state.appointments);

  const handleCancel = () => {
    deleteAppointment(singleAppointment._id, currentUser._id);
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => dispatch(setEditStatus(true))}
        className="px-2 py-1 text-sm transition duration-300 rounded-lg sm:text-base text-offWhite bg-seaGreen hover:bg-navy"
      >
        {t("editAppointment")}
      </button>
      <button
        onClick={handleCancel}
        className="px-2 py-1 text-sm text-white transition duration-300 rounded-lg sm:text-base bg-mauve hover:bg-mauve-dark"
      >
        {t("cancelAppointment")}
      </button>
    </div>
  );
};

export default AppointmentCancel;
