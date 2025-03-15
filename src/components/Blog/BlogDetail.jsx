import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HiOutlineHeart, HiHeart, HiArrowLeft, HiEye } from "react-icons/hi";
import useBlogCall from "../../hooks/useBlogCall";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlogSuccess } from "../../features/blogSlice";
import { useTranslation } from "react-i18next";

const BlogDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getSingleBlog, postLike } = useBlogCall();
  const { singleBlog, loading } = useSelector((state) => state.blogs);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    getSingleBlog(id);
  }, [id]);

  useEffect(() => {
    dispatch(getSingleBlogSuccess({}));
  }, [navigate]);

  const handleLike = () => {
    postLike(id);
  };

  const isLikedByUser = singleBlog?.likes?.includes(currentUser?._id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-navy"></div>
      </div>
    );
  }
  console.log(singleBlog);
  

  return (
    <div className="min-h-screen py-32 mx-auto bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
        <div className="relative w-full h-80 lg:h-96">
          <img
            className="object-cover w-full h-full"
            src={singleBlog?.image || "/placeholder.svg"}
            alt={singleBlog?.title}
          />
        </div>

        <div className="relative px-10 pt-5 pb-16 mx-5 -mt-16 bg-white rounded-lg shadow-lg dark:bg-background-dark text-navy dark:text-offWhite-dark md:mx-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {singleBlog?.therapistId && (
                <>
                  <img
                    src={singleBlog?.therapistId?.image || "/placeholder.svg"}
                    alt={`${singleBlog?.therapistId?.firstName} ${singleBlog?.therapistId?.lastName}`}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold md:text-xl">
                      {singleBlog?.therapistId?.firstName}{" "}
                      {singleBlog?.therapistId?.lastName}
                    </h3>
                    <p className="text-sm">
                      {singleBlog?.therapistId?.description}
                    </p>
                  </div>
                </>
              )}
            </div>

            <h2 className="mb-4 text-xl md:text-2xl font-bold">
              {singleBlog?.title}
            </h2>
            <div
              className="leading-relaxed text-base md:text-xl"
              dangerouslySetInnerHTML={{ __html: singleBlog?.content || "" }}
            ></div>

            {singleBlog?.categoryId && (
              <span className="inline-block py-2 mt-6 text-sm rounded-full">
                {singleBlog?.categoryId?.name}
              </span>
            )}
          </div>

          <div className="flex justify-end items-center gap-2">
            <div className="flex justify-between gap-x-8">
              <div className="flex items-center gap-x-2">
                <button
                  onClick={handleLike}
                  className="flex items-center transition-colors duration-200 focus:outline-none"
                >
                  {isLikedByUser ? (
                    <HiHeart className="w-7 h-7 text-red-500" />
                  ) : (
                    <HiOutlineHeart className="w-6 h-6 hover:text-red-500" />
                  )}
                </button>
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {singleBlog?.likes?.length || 0}
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <HiEye className="w-7 h-7 dark:text-seaGreen-dark" />
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {singleBlog?.countOfVisitors || 0}
                </span>
              </div>
              
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-5 mt-6">
          <button
            onClick={() => navigate("/blogs")}
            className="flex items-center gap-2 px-6 py-2 text-white transition-all rounded bg-navy dark:bg-seaGreen-dark hover:bg-navy-light dark:hover:bg-seaGreen"
          >
            <HiArrowLeft className="w-4 h-4" />
            {t("blg_goback")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
