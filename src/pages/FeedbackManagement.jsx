import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminModal from "../components/adminPanel/AdminModal";
import ListToolbar from "../components/adminPanel/ListToolBar";
import Pagination from "../components/adminPanel/Pagination";
import useFeedbackCall from "../hooks/useFeedbackCall";
import FeedbackRow from "../components/adminPanel/FeedbackRow";
import FeedbackCard from "../components/adminPanel/FeedbackCard";

const FeedbackManagement = () => {
  const { getAllFeedbacks } = useFeedbackCall();
  const { isModalOpen, feedbacks } = useSelector((state) => state.feedbacks);
  const { pagFeedbacks } = useSelector((state) => state.pagination);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  const displayedFeedbacks =
    searchTerm.trim() === ""
      ? pagFeedbacks
      : pagFeedbacks?.filter((feedback) =>
          [
            feedback.therapistId?.firstName,
            feedback.therapistId?.lastName,
            feedback.userId?.firstName,
            feedback.userId?.lastName,
          ]
            .filter(Boolean)
            .some((name) =>
              name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

  return (
    <div className="container py-10 mx-auto ">
      <div className="bg-white dark:bg-background-lightdark text-navy dark:text-offWhite-dark border rounded-lg shadow-sm">
        <div className="p-6">
          <ListToolbar
            title="Feedback List"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search feedback..."
          />
          <div>
            <div className="hidden text-sm font-medium text-gray-500 dark:text-seaGreen-light md:grid md:grid-cols-12 md:gap-5">
              <div className="col-span-3">Feedback Id</div>
              <div className="col-span-3 md:text-center">Therapist</div>
              <div className="col-span-2">Client</div>
              <div className="col-span-2 text-right">Date</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {displayedFeedbacks?.map((feedback) => (
              <FeedbackRow key={feedback._id} feedback={feedback} />
            ))}
          </div>
          <Pagination
            data={feedbacks}
            endpoint={"feedbacks"}
            slice={"pagFeedbacks"}
          />
        </div>
      </div>

      {isModalOpen && (
        <AdminModal>
          <FeedbackCard />
        </AdminModal>
      )}
    </div>
  );
};

export default FeedbackManagement;
