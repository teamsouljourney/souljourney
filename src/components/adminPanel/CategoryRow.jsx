import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setNewCategory, toggleModal } from "../../features/categorySlice";
import useCategoryCall from "../../hooks/useCategoryCall";
import { formatDateTime } from "../../helper/dateFormatter";

const CategoryRow = ({ category }) => {
  const dispatch = useDispatch();
  const { deleteCategory } = useCategoryCall();

  const handleUpdateCategory = () => {
    dispatch(setNewCategory(category));
    dispatch(toggleModal(true));
  };

  return (
    <div className="flex flex-col items-start py-4 space-y-2 border-b md:flex-row md:items-center md:space-y-0">
      <div className="flex items-center gap-3 md:w-1/3">
        <div>
          <div className="font-medium">{category?.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{category?._id}</div>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/3 md:flex-row md:items-center">
        <span className="text-sm md:mr-4">
          Created: {formatDateTime(category?.createdAt, "date")}
        </span>
      </div>
      <div className="flex items-center justify-between w-full md:w-1/3">
        <div className="md:ml-4"></div>
        <div className="flex gap-2">
          <button
            onClick={handleUpdateCategory}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-background-dark"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteCategory(category?._id)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-background-dark"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryRow;
