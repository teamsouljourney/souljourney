import avatar from "../../assets/avatar.png";
import { useTranslation } from "react-i18next";

const TeamDetailFeedbackCardsModal = ({
  singleFeedback,
  getTimeAgo,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-background-dark rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src={singleFeedback?.userId?.image || avatar}
              alt={singleFeedback?.userId?.userName}
              className="w-16 h-16 rounded-full object-cover border-2 border-seaGreen bg-inherit"
            />
            <div>
              <h3 className="text-xl font-semibold leading-tight">
                {singleFeedback?.userId?.firstName}{" "}
                {singleFeedback?.userId?.lastName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getTimeAgo(singleFeedback?.createdAt, t)}
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
        {/* Modal Body */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold">
            <i>{singleFeedback?.title}</i>
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {singleFeedback?.comment}
          </p>
        </div>
        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailFeedbackCardsModal;
