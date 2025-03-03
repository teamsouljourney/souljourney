import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useBlogCall from "../../hooks/useBlogCall";
import { useSelector } from "react-redux";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleBlog, loading } = useSelector((state) => state.blogs);
  const { getSingleBlog } = useBlogCall();

  useEffect(() => {
    getSingleBlog(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-navy"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl min-h-screen py-32 mx-auto bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      <div className="flex flex-col max-w-xl mx-auto overflow-hidden rounded">
        <div className="relative w-full h-80">
          <img
            className="object-cover w-full h-full"
            src={singleBlog?.image}
            alt={singleBlog?.title}
          />
        </div>

        <div className="relative px-10 pt-5 pb-16 mx-5 -mt-16 bg-white rounded-lg shadow-lg dark:bg-background-dark text-navy dark:text-offWhite-dark md:mx-10">
          <div className="flex items-center gap-2 mb-4">
            {singleBlog?.therapistId && (
              <>
                <img
                  src={singleBlog?.therapistId?.image}
                  alt={`${singleBlog?.therapistId?.firstName} ${singleBlog?.therapistId?.lastName}`}
                  className="object-cover w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">
                    {singleBlog?.therapistId?.firstName}{" "}
                    {singleBlog?.therapistId?.lastName}
                  </h3>
                  <p className="text-sm ">
                    {singleBlog?.therapistId?.description}
                  </p>
                </div>
              </>
            )}
          </div>

          <h2 className="mb-4 text-2xl font-bold">{singleBlog?.title}</h2>
          <p className="leading-relaxed ">{singleBlog?.content}</p>

          {singleBlog?.categoryId && (
            <span className="inline-block px-4 py-1 mt-6 text-sm rounded-full">
              {singleBlog?.categoryId?.name}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between px-5 mt-6">
          <div className="flex items-center gap-2">
            <button
              // onClick={handleLike}
              className="flex items-center transition-colors duration-200 focus:outline-none"
            >
              {singleBlog ? (
                <AiFillHeart className="text-2xl text-red-500" />
              ) : (
                <AiOutlineHeart className="text-2xl hover:text-red-500" />
              )}
            </button>
            <span className="font-medium text-gray-600">Count</span>
          </div>

          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-2 text-white transition-all rounded bg-navy hover:bg-navy-light"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
