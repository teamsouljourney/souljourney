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
import { useTranslation } from "react-i18next";

const CategoryManagement = () => {
  const { t } = useTranslation();
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

  const displayedCategories =
    searchTerm.trim() === ""
      ? pagCategories
      : pagCategories?.filter((category) =>
          [category.name]
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
            title={t("AP-categoryList")}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder={t("searchCategoryPlaceholder")}
            actions={
              <button
                onClick={() => handleToogleModal(true)}
                className="px-4 py-2 text-white transition duration-300 rounded-md bg-seaGreen hover:bg-navy"
              >
                <PlusIcon className="inline-block w-5 h-5 mr-2" />
                {t("addNewCategory")} {/* Add a new Category */}
              </button>
            }
          />
          <div>
            <div className="hidden text-sm font-medium text-gray-500 dark:text-seaGreen md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-4">{t("AP-category")} {/* Category */}</div>
              <div className="col-span-4">{t("AP-createdAt")} {/* Created At */}</div>
              <div className="col-span-4 text-right">{t("AP-actions")} {/* Actions */}</div>
            </div>
            {displayedCategories?.map((category) => (
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
