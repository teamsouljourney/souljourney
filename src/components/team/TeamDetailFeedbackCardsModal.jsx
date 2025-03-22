import avatar from "../../assets/avatar3.svg";
import { useTranslation } from "react-i18next";

const TeamDetailFeedbackCardsModal = ({
  selectedFeedback,
  getTimeAgo,
  setIsModalOpen,
  setSelectedFeedback,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-background-dark rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src={selectedFeedback?.userId?.image || avatar}
                alt={selectedFeedback?.userId?.userName}
                className="object-cover w-16 h-16 border-2 rounded-full border-seaGreen bg-inherit"
              />
              <div>
                <h3 className="text-xl font-semibold leading-tight">
                  {selectedFeedback?.userId?.firstName}{" "}
                  {selectedFeedback?.userId?.lastName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedFeedback?.createdAt &&
                    getTimeAgo(selectedFeedback?.createdAt, t)}
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
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              {selectedFeedback?.comment}
            </p>
          </div>
          {/* Modal Footer */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedFeedback(null);
              }}
              className="px-4 py-2 transition-colors bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {t("close")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDetailFeedbackCardsModal;
