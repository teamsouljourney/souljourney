import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminModal from "../components/adminPanel/AdminModal";
import ListToolbar from "../components/adminPanel/ListToolBar";
import Pagination from "../components/adminPanel/Pagination";
import { PlusIcon } from "@heroicons/react/24/outline";
import useFeedbackCall from "../hooks/useFeedbackCall";
import { toggleModal } from "../features/feedbackSlice";
import FeedbackRow from "../components/adminPanel/FeedbackRow";
import FeedbackForm from "../components/adminPanel/FeedbackForm";

const FeedbackManagement = () => {
  const dispatch = useDispatch();
  const { getAllFeedbacks } = useFeedbackCall();
  const { isModalOpen, feedbacks } = useSelector((state) => state.feedbacks);
  const { pagFeedbacks } = useSelector((state) => state.pagination);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToogleModal = (payload) => {
    dispatch(toggleModal(payload));
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  return (
    <div className="container py-10 mx-auto ">
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-6">
          <ListToolbar
            title="Feedback List"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search feedback..."
            actions={
              <button
                onClick={() => handleToogleModal(true)}
                className="px-4 py-2 text-white transition duration-300 rounded-md bg-seaGreen hover:bg-navy"
              >
                <PlusIcon className="inline-block w-5 h-5 mr-2" />
                Add a new Feedback
              </button>
            }
          />
          <div>
            <div className="hidden text-sm font-medium text-gray-500 md:grid md:grid-cols-12 md:gap-5">
              <div className="col-span-3">Feedback Id</div>
              <div className="col-span-3 md:text-center">Therapist</div>
              <div className="col-span-2">Client</div>
              <div className="col-span-2 text-right">Date</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {pagFeedbacks?.map((feedback) => (
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
          <FeedbackForm />
        </AdminModal>
      )}
    </div>
  );
};

export default FeedbackManagement;
