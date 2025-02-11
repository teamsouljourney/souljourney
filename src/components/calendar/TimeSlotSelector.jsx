import { useDispatch } from "react-redux";
import { setSelectedSlot } from "../../features/calendarSlice";

const TimeSlotSelector = ({
  selectedDate,
  selectedSlot,
  generateTimeSlots,
  isSlotUnavailable,
}) => {
  const dispatch = useDispatch();

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
