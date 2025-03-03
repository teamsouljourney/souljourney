import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, index }) => {
  const navigate = useNavigate();

  return (
    <div
      key={blog._id}
      className={`flex flex-col-reverse md:flex-row items-center ${
        index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="mt-4 sm:ml-6 sm:mt-0 sm:w-1/2">
        <h2 className="mb-2 text-xl font-bold">{blog.title}</h2>
        <p className="">{blog.content}</p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate(`/blogs/${blog._id}`)}
            className="px-4 py-2 mt-4 mb-5 text-white transition-all rounded bg-navy hover:bg-navy-light"
          >
            Read More
          </button>
        </div>
      </div>

      <div className="md:w-[439px] md:h-[366px] w-[439px] h-[366px]">
        <img
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          className="w-full h-auto rounded-l-[80%] rounded-r-[80%] object-cover aspect-[439/366]"
        />
      </div>
    </div>
  );
};

export default BlogCard;
