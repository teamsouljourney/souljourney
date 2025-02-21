import { useSelector } from "react-redux";

const Pagination = () => {
  const { users } = useSelector((state) => state.users);

  return (
    <div className="flex items-center justify-between px-2 mt-4">
      <div className="text-sm text-gray-500">
        Showing {users.length} users from 1 to {users.length}
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
          Previous
        </button>
        <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded">
          1
        </button>
        <button className="px-3 py-1 text-sm rounded hover:bg-gray-50">
          2
        </button>
        <button className="px-3 py-1 text-sm rounded hover:bg-gray-50">
          3
        </button>
        <span className="px-2">...</span>
        <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
