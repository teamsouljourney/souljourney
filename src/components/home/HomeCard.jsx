import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../helper/dateFormatter";

const HomeCard = ({ blog }) => {
  const { t } = useTranslation();

  const handleShare = async () => {
    const blogUrl = `${window.location.origin}/blogs/${blog._id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.content,
          url: blogUrl,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      alert("Paylaşım özelliği tarayıcınız tarafından desteklenmiyor.");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xs p-3 transition duration-500 bg-white shadow-2xl rounded-xl dark:bg-background-dark text-navy dark:text-offWhite-dark hover:scale-105">
      <div className="relative w-full h-64">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={blog?.image}
          alt={blog?.title}
        />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <h2 className="mb-2 text-xl font-bold">{blog?.title}</h2>
        <p className="line-clamp-2">{blog?.content}</p>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-sm font-medium">{t("homeCardDate")}:</span>
          <span className="text-sm">
            {formatDateTime(blog?.createdAt, "date")}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-4 mt-auto border-t border-gray-300">
        <FavoriteBorderIcon className="text-gray-600 transition dark:text-offWhite-dark hover:text-red-500" />
        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-gray-600 transition dark:text-offWhite-dark hover:text-seaGreen"
        >
          <ShareIcon /> {t("share")}
        </button>
        <NavLink
          to={`/blogs/${blog?._id}`}
          className="py-2 font-bold text-center transition rounded-lg w-28 sm:w-32 text-offWhite bg-seaGreen-dark hover:bg-seaGreen-light"
        >
          {t("readMore")}
        </NavLink>
      </div>
    </div>
  );
};

export default HomeCard;
