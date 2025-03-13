import Calendar from "./Calendar";
import TimeSlotSelector from "./TimeSlotSelector";
import AppointmentActions from "./AppointmentActions";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AppointmentCalendar = () => {
  const { t } = useTranslation();
  const { selectedDate } = useSelector((state) => state.calendar);

  return (
    <div className="p-4 dark:text-offWhite-dark dark:bg-background-lightdark">
      <h2 className="mb-8 text-lg font-semibold ">
        {t("bookingCalendar")}
      </h2>
      <Calendar />
      {selectedDate && (
        <>
          <TimeSlotSelector />
          <AppointmentActions />
        </>
      )}
    </div>
  );
};

export default AppointmentCalendar;
