import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../features/therapistSlice";
import AdminModal from "../components/adminPanel/AdminModal";
import ListToolbar from "../components/adminPanel/ListToolBar";
import Pagination from "../components/adminPanel/Pagination";
import { PlusIcon } from "@heroicons/react/24/outline";
import TherapistRow from "../components/adminPanel/TherapistRow";
import TherapistForm from "../components/adminPanel/TherapistForm";
import useTherapistCall from "../hooks/useTherapistCall";

const TherapistManagement = () => {
  const dispatch = useDispatch();
  const { getAllTherapists } = useTherapistCall();
  const { isModalOpen, therapists } = useSelector((state) => state.therapists);
  const { pagTherapists } = useSelector((state) => state.pagination);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToogleModal = (payload) => {
    dispatch(toggleModal(payload));
  };

  useEffect(() => {
    getAllTherapists();
  }, []);

  // console.log(pagTherapists);

  const displayedTherapists =
    searchTerm.trim() === ""
      ? pagTherapists
      : pagTherapists?.filter((therapist) =>
          [therapist.userName, therapist.email]
            .filter(Boolean)
            .some((name) =>
              name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

  return (
    <div className="container py-10 mx-auto ">
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-6">
          <ListToolbar
            title="Therapist List"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search therapist..."
            actions={
              <button
                onClick={() => handleToogleModal(true)}
                className="px-4 py-2 text-white transition duration-300 rounded-md bg-seaGreen hover:bg-navy"
              >
                <PlusIcon className="inline-block w-5 h-5 mr-2" />
                Add a new Therapist
              </button>
            }
          />
          <div className="space-y-4">
            <div className="hidden text-sm font-medium text-gray-500 md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-4">Therapist</div>
              <div className="col-span-4">Email</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {displayedTherapists?.map((therapist) => (
              <TherapistRow key={therapist._id} therapist={therapist} />
            ))}
          </div>
          <Pagination data={therapists} endpoint={"therapists"} slice={"pagTherapists"} />
        </div>
      </div>

      {isModalOpen && (
        <AdminModal>
          <TherapistForm />
        </AdminModal>
      )}
    </div>
  );
};

export default TherapistManagement;
