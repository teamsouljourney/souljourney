import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/paginationSlice";

const Pagination = ({ data }) => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const pageButtons = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setPage(page));
    }
  };

  return (
    <div className="flex items-center justify-between px-2 mt-6">
      <div className="text-sm text-gray-500">
        Showing {data.length} users from 1 to {data.length}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>

        {pageButtons.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === page
                ? "bg-mauve hover:bg-mauve-dark text-white"
                : "hover:bg-mauve opacity-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
