import { TrashIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import useBlogCall from "../../hooks/useBlogCall";
import { formatDateTime } from "../../helper/dateFormatter";
import { useNavigate } from "react-router-dom";

const BlogRow = ({ blog }) => {
  const navigate = useNavigate();
  const { deleteBlog } = useBlogCall();

  return (
    <div className="flex flex-col items-start py-4 space-y-2 border-b md:flex-row md:items-center md:space-y-0 md:gap-6">
      <div className="flex items-center gap-3 md:w-5/12">
        <div>
          <div className="font-medium">{blog?.title}</div>
          <div className="text-sm text-gray-500 md:hidden">{blog?._id}</div>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-3/12 md:flex-row md:items-center">
        <span className="text-sm">
          {blog?.therapistId?.firstName + " " + blog?.therapistId?.lastName}
        </span>
      </div>
      <div className="flex flex-col w-full md:w-2/12 md:flex-row md:items-center">
        <span className="text-sm text-gray-500 dark:text-offWhite">
          {formatDateTime(blog?.createdAt, "date")}
        </span>
      </div>
      <div className="flex items-center justify-end w-full space-x-2 md:w-2/12">
        <button
          onClick={() => navigate(`/blogs/${blog?._id}`)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <BookOpenIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => deleteBlog(blog?._id)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BlogRow;
