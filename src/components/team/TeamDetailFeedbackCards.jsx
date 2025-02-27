import { useState } from "react";
import avatar from "../../assets/avatar.png";
import { useTranslation } from "react-i18next";

const TeamDetailFeedbackCards = ({ singleTherapistFeedbacks }) => {
  const { t } = useTranslation();
  {
    /* {t("goBack")} */
  }
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMilliseconds = now - created;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
      return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} ${
        diffInMinutes === 1 ? "minute" : "minutes"
      } ago`;
    } else {
      return "Just now";
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {singleTherapistFeedbacks?.map((feedback) => (
          <div
            key={feedback?._id}
            className="bg-white dark:bg-background-dark rounded-lg shadow-md p-6 transition-all hover:shadow-lg flex flex-col min-h-[300px]"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={feedback?.userId?.image || avatar}
                  alt={feedback?.userId?.userName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-seaGreen bg-inherit"
                />
                <div>
                  <h3 className="font-semibold leading-tight">
                    {feedback?.userId?.firstName} {feedback?.userId?.lastName}
                  </h3>
                  <p className="text-sm pt-2">
                    {getTimeAgo(feedback?.createdAt)}
                  </p>
                </div>
              </div>
              {/* Rating */}
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < feedback?.rating
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
            {/* Card Body */}
            <div className="flex-1">
              <h4 className="leading-relaxed font-semibold line-clamp-1">
                <i>{feedback?.title}</i>
              </h4>
              <p className="leading-relaxed line-clamp-4">
                {feedback?.comment}
              </p>
            </div>
            {/* Read More Button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSelectedFeedback(feedback);
                  setIsModalOpen(true);
                }}
                className="mt-2 px-2 py-1 text-sm bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 text-seaGreen hover:text-seaGreen-dark border border-gray-200 dark:border-gray-600 rounded-md transition-colors"
              >
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-background-dark rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={selectedFeedback?.userId?.image || avatar}
                  alt={selectedFeedback?.userId?.userName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-seaGreen bg-inherit"
                />
                <div>
                  <h3 className="text-xl font-semibold leading-tight">
                    {selectedFeedback?.userId?.firstName}{" "}
                    {selectedFeedback?.userId?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getTimeAgo(selectedFeedback?.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-6 h-6 ${
                      index < selectedFeedback?.rating
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
            {/* Modal Body */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">
                <i>{selectedFeedback?.title}</i>
              </h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedFeedback?.comment}
              </p>
            </div>
            {/* Modal Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedFeedback(null);
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamDetailFeedbackCards;
