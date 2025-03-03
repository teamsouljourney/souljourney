import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, index }) => {
  const navigate = useNavigate();
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col-reverse sm:flex-row items-center justify-center py-8 gap-6 w-full`}
    >
      <div
        className={`w-full sm:w-1/2 flex flex-col h-full ${
          isEven ? "sm:pr-4 lg:pr-8" : "sm:pl-4 lg:pl-8 sm:order-2"
        }`}
      >
        <div className="min-h-[120px] flex flex-col text-center sm:text-left">
          <h2 className="mb-3 text-2xl font-bold line-clamp-2">{blog.title}</h2>
          <p className="text-base text-left line-clamp-4">{blog.content}</p>
        </div>

        <div
          className={`flex mt-4 justify-end w-full sm:${
            isEven ? "justify-start" : "justify-end"
          }`}
        >
          <button
            onClick={() => navigate(`/blogs/${blog._id}`)}
            className="px-4 py-2 text-white transition-all rounded bg-navy hover:bg-navy-light"
          >
            Read More
          </button>
        </div>
      </div>

      <div
        className={`w-full sm:w-1/2 h-[250px] sm:h-[366px] ${
          isEven ? "sm:pl-4 lg:pl-8 sm:order-2" : "sm:pr-4 lg:pr-8"
        }`}
      >
        <img
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          className="w-full h-full rounded-[40px] sm:rounded-l-[80%] sm:rounded-r-[80%] object-cover"
        />
      </div>
    </div>
  );
};

export default BlogCard;
