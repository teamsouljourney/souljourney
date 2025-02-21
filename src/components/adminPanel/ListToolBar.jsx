import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../features/userSlice";

const ListToolbar = ({
  title,
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  actions,
}) => {
  const dispatch = useDispatch();

  const handleToogleModal = (payload) => {
    dispatch(toggleModal(payload));
  };

  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
      <h2 className="text-lg font-bold text-navy">{title}</h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {onSearchChange && (
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => handleToogleModal(true)}
            className="px-4 py-2 text-white transition duration-300 rounded-md bg-seaGreen hover:bg-navy"
          >
            <PlusIcon className="inline-block w-5 h-5 mr-2" />
            {actions}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListToolbar;
