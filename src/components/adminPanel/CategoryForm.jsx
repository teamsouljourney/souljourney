import { useDispatch, useSelector } from "react-redux";
import useCategoryCall from "../../hooks/useCategoryCall";
import {
  resetNewCategory,
  setNewCategory,
  toggleModal,
} from "../../features/categorySlice";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const { newCategory } = useSelector((state) => state.categories);
  const { createCategory, updateCategory } = useCategoryCall();

  const handleCloseModal = () => {
    dispatch(toggleModal(false));
    dispatch(resetNewCategory());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setNewCategory({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newCategory._id) {
      updateCategory(newCategory._id, newCategory);
    } else {
      createCategory(newCategory);
    }

    handleCloseModal();
  };

  return (
    <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="px-4 pt-5 pb-4 bg-white dark:bg-background-dark sm:p-6 sm:pb-4">
        <h3 className="text-lg font-medium leading-6 text-navy dark:text-offWhite-dark">
          {newCategory._id ? "Edit Category" : "Add a new Category"}
        </h3>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newCategory.name || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-background-dark sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-white duration-300 rounded-md bg-seaGreen transtiton hover:bg-navy sm:ml-3 sm:w-auto"
          onClick={handleSubmit}
        >
          {newCategory._id ? "Update Category" : "Add Category"}
        </button>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-gray-700 bg-white rounded-md hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;
