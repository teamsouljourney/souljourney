import { useDispatch, useSelector } from "react-redux";
import { setSelectedSlot } from "../../features/calendarSlice";

const TimeSlotSelector = () => {
  const dispatch = useDispatch();
  const { therapistTimeTable } = useSelector((state) => state.therapists);
  const { selectedDate, selectedSlot } = useSelector((state) => state.calendar);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(
        `${String(hour).padStart(2, "0")}:00 - ${String(hour).padStart(
          2,
          "0"
        )}:50`
      );
    }
    return slots;
  };

  const isSlotUnavailable = (date, slot) => {
    const slotStartTime = new Date(`${date}T${slot.split(" ")[0]}:00`);
    // console.log(slotStartTime);
    const now = new Date();

    if (new Date(date).toDateString() === now.toDateString()) {
      if (slotStartTime < now) {
        return true;
      }
    }

    return therapistTimeTable?.some(
      (entry) => new Date(entry.startTime).getTime() === slotStartTime.getTime()
    );
  };

  const handleSlotSelect = (slot) => {
    if (!isSlotUnavailable(selectedDate, slot)) {
      dispatch(setSelectedSlot(slot));
    }
  };

  return (
    <div className="p-4 mt-4 border rounded bg-offWhite">
      <h3 className="font-semibold text-mauve text-md">
        Selected Date: {selectedDate}
      </h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {generateTimeSlots().map((slot, index) => {
          const unavailable = isSlotUnavailable(selectedDate, slot);
          return (
            <button
              key={index}
              onClick={() => handleSlotSelect(slot)}
              disabled={unavailable}
              className={`px-[.5rem] py-[.3rem] rounded-lg ${
                unavailable
                  ? "bg-mauve text-white cursor-not-allowed"
                  : selectedSlot === slot
                  ? "bg-seaGreen text-white"
                  : "bg-navy text-white"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
