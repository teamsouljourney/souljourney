import { useState } from "react";
import avatar from "../../assets/avatar.png";
import { useTranslation } from "react-i18next";
import TeamDetailFeedbackCardsModal from "./TeamDetailFeedbackCardsModal";
import Pagination from "../adminPanel/Pagination";
import { useSelector } from "react-redux";
import {getTimeAgo} from "../../helper/dateFormatter"

const TeamDetailFeedbackCards = () => {
  const { t } = useTranslation();
  const {pagFeedbacks} = useSelector((state)=>state.pagination)
  const {singleTherapistFeedbacks} = useSelector((state)=>state.feedbacks)
  const { singleTherapist } = useSelector((state) => state.therapists);
  const therapistId = singleTherapist && singleTherapist?._id
  
  {/* {t("goBack")} */}
  
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {pagFeedbacks?.map((feedback) => (
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
              <p className="text-sm sm:text-base leading-relaxed sm:leading-relaxed mb-4 sm:mb-6 line-clamp-4">
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
                className="mt-2 px-2 py-1 text-sm font-semibold bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-offWhite-dark text-seaGreen dark:text-seaGreen-light hover:text-seaGreen-dark dark:hover:text-seaGreen-dark border border-gray-200 dark:border-gray-600 rounded-md transition-colors"
              >
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination endpoint={`feedbacks/therapists/${therapistId}`} slice={"pagFeedbacks"} data={singleTherapistFeedbacks} />
      {/* Modal */}
      {isModalOpen && selectedFeedback && (

        <TeamDetailFeedbackCardsModal selectedFeedback={selectedFeedback} getTimeAgo={getTimeAgo} setIsModalOpen={setIsModalOpen} setSelectedFeedback={setSelectedFeedback} />
        
      )}
    </>
  );
};

export default TeamDetailFeedbackCards;
