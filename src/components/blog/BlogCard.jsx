import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogsCard = ({ blog, index }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isEven = index % 2 === 0;

  return (
    <div className="w-full max-w-full px-0 py-8 border-b-2 border-gray-100 dark:border-gray-800">
      <div className="flex flex-col items-center w-full gap-4 sm:flex-row sm:gap-6">
        {/* Text Content */}
        <div
          className={`w-full sm:w-1/2 flex flex-col ${
            isEven ? "sm:order-1" : "sm:order-2"
          }`}
        >
          <div className="flex flex-col mb-6 space-y-4">
            <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl line-clamp-2">
              {blog.title}
            </h2>
            <div className="h-auto sm:h-[120px] md:h-[150px] overflow-hidden">
              <p
                className="text-sm text-gray-700 sm:text-base lg:text-lg dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></p>
            </div>
          </div>

          <div
            className={`flex mt-4 ${isEven ? "justify-start" : "justify-end"}`}
          >
            <button
              onClick={() => navigate(`/blogs/${blog._id}`)}
              className="px-4 py-2 text-white transition-all rounded-lg bg-navy hover:bg-navy-light dark:bg-background-lightdark dark:hover:bg-gray-500"
            >
              {t("readMore")}
            </button>
          </div>
        </div>

        {/* Image */}
        <div
          className={`w-full sm:w-1/2 ${
            isEven ? "sm:order-2" : "sm:order-1"
          } mb-6 sm:mb-0`}
        >
          <div className="aspect-[4/3] w-full h-auto overflow-hidden rounded-2xl sm:rounded-3xl">
            <img
              src={blog.image || "/placeholder.svg?height=400&width=600"}
              alt={blog.title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
