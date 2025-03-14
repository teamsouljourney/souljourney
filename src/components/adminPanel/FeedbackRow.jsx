import { BookOpenIcon, TrashIcon } from "@heroicons/react/24/outline";
import useFeedbackCall from "../../hooks/useFeedbackCall";
import { formatDateTime } from "../../helper/dateFormatter";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../features/feedbackSlice";

const FeedbackRow = ({ feedback }) => {
  const dispatch = useDispatch();
  const { deleteFeedback, getSingleFeedback } = useFeedbackCall();

  const handleReadFeedback = async (id) => {
    await getSingleFeedback(id);
    dispatch(toggleModal(true));
  };

  if (!feedback) return null;

  const { _id, therapistId, userId, createdAt } = feedback;

  return (
    <div className="flex flex-col py-4 space-y-2 border-b md:space-y-0 md:grid md:grid-cols-12 md:gap-4 md:items-center">
      <div className="col-span-3">
        <div className="font-medium">{_id || "N/A"}</div>
      </div>
      <div className="col-span-3">
        <div className="text-sm md:text-center">
          {therapistId
            ? `${therapistId.firstName} ${therapistId.lastName}`
            : "N/A"}
        </div>
      </div>
      <div className="col-span-3">
        <span className="text-sm">
          {userId ? `${userId.firstName} ${userId.lastName}` : "N/A"}
        </span>
      </div>
      <div className="col-span-2">
        <span className="text-sm text-gray-500 dark:text-offWhite-dark">
          {createdAt ? formatDateTime(createdAt, "date") : "N/A"}
        </span>
      </div>
      <div className="flex justify-end col-span-1">
        <button
          onClick={() => handleReadFeedback(_id)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <BookOpenIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => deleteFeedback(_id)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackRow;
