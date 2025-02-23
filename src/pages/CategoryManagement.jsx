import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminModal from "../components/adminPanel/AdminModal";
import ListToolbar from "../components/adminPanel/ListToolBar";
import Pagination from "../components/adminPanel/Pagination";
import useCategoryCall from "../hooks/useCategoryCall";
import CategoryRow from "../components/adminPanel/CategoryRow";
import CategoryForm from "../components/adminPanel/CategoryForm";

const CategoryManagement = () => {
  const { getAllCategories } = useCategoryCall();
  const { isModalOpen, categories } = useSelector((state) => state.categories);
  const { pagCategories } = useSelector((state) => state.pagination);
  const [searchTerm, setSearchTerm] = useState("");

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
            actions="Add a new Category"
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
