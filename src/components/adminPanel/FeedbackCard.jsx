import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import { getTimeAgo } from "../../helper/dateFormatter";
import { toggleModal } from "../../features/feedbackSlice";

const FeedbackCard = () => {
  const dispatch = useDispatch();
  const { singleFeedback } = useSelector((state) => state.feedbacks);

  const handleToogleModal = (payload) => {
    dispatch(toggleModal(payload));
  };

  return (
    <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-background-dark sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="px-4 pt-5 pb-4 bg-white dark:bg-background-dark sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={singleFeedback?.userId?.image || avatar}
                  alt={singleFeedback?.userId?.userName}
                  className="object-cover w-16 h-16 border-2 rounded-full border-seaGreen bg-inherit"
                />
                <div>
                  <h3 className="text-xl font-semibold leading-tight">
                    {singleFeedback?.userId?.firstName}{" "}
                    {singleFeedback?.userId?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getTimeAgo(singleFeedback?.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-6 h-6 ${
                      index < singleFeedback?.rating
                        ? "text-seaGreen fill-seaGreen"
                        : "text-gray-300 fill-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">
                <i>{singleFeedback?.title}</i>
              </h4>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {singleFeedback?.comment}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          onClick={() => handleToogleModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
