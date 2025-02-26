import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminModal from "../components/adminPanel/AdminModal";
import ListToolbar from "../components/adminPanel/ListToolBar";
import Pagination from "../components/adminPanel/Pagination";
import useCategoryCall from "../hooks/useCategoryCall";
import CategoryRow from "../components/adminPanel/CategoryRow";
import CategoryForm from "../components/adminPanel/CategoryForm";
import { toggleModal } from "../features/categorySlice";
import { PlusIcon } from "@heroicons/react/24/outline";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { getAllCategories } = useCategoryCall();
  const { isModalOpen, categories } = useSelector((state) => state.categories);
  const { pagCategories } = useSelector((state) => state.pagination);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToogleModal = (payload) => {
    dispatch(toggleModal(payload));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="container py-10 mx-auto ">
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-6">
          <ListToolbar
            title="Category List"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search category..."
            actions={
              <button
                onClick={() => handleToogleModal(true)}
                className="px-4 py-2 text-white transition duration-300 rounded-md bg-seaGreen hover:bg-navy"
              >
                <PlusIcon className="inline-block w-5 h-5 mr-2" />
                Add a new Category
              </button>
            }
          />
          <div>
            <div className="hidden text-sm font-medium text-gray-500 md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-4">Category</div>
              <div className="col-span-4">Created At</div>
              <div className="col-span-4 text-right">Actions</div>
            </div>
            {pagCategories?.map((category) => (
              <CategoryRow key={category._id} category={category} />
            ))}
          </div>
          <Pagination
            data={categories}
            endpoint={"categories"}
            slice={"pagCategories"}
          />
        </div>
      </div>

      {isModalOpen && (
        <AdminModal>
          <CategoryForm />
        </AdminModal>
      )}
    </div>
  );
};

export default CategoryManagement;
