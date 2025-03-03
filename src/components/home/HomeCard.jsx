import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../helper/dateFormatter";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";

const HomeCard = ({ blog }) => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
      alert("Sharing feature is not supported by your browser.");
    }
  };

  const isLiked = blog?.likes?.includes(currentUser?._id);
  const likeCount = blog?.likes?.length || 0;

  const handleCardClick = () => {
    navigate(`/blogs/${blog?._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col w-full max-w-xs p-3 transition duration-500 bg-white shadow-2xl cursor-pointer rounded-xl dark:bg-background-dark text-navy dark:text-offWhite-dark hover:scale-105"
    >
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

      <div
        className="flex items-center justify-between px-4 py-4 mt-auto border-t border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1 text-gray-600 dark:text-offWhite-dark">
          {isLiked ? (
            <HiHeart className="w-6 h-6 text-red-500" />
          ) : (
            <HiOutlineHeart className="w-6 h-6 text-gray-600" />
          )}
          <span className="text-sm">{likeCount}</span>
        </div>

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
