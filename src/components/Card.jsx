import { NavLink, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import Buttons from "./button/Button";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../helper/dateFormatter";

const Card = ({ therapist, variant = "default", blog }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Web Share API ile paylaşım fonksiyonu
  const handleShare = async () => {
    if (!blog) return;
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
    <div
      className="flex flex-col w-full max-w-xs p-3 overflow-hidden transition duration-500 transform bg-white shadow-2xl cursor-pointer dark:bg-background-dark text-navy dark:text-offWhite-dark rounded-xl hover:scale-105"
      onClick={() => navigate(`/therapists/${therapist?._id}`)}
    >
      <div className="relative w-full h-64">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={therapist ? therapist?.image : blog?.image}
          alt={therapist ? therapist?.firstName : blog?.title}
        />
      </div>

      <div className="flex flex-col justify-between flex-grow p-6">
        {therapist ? (
          <>
            <h2 className="mb-2 text-xl font-bold ">
              {`${therapist?.firstName} ${therapist?.lastName}`}
            </h2>
            <p className="mb-2 ">{therapist?.categoryId?.name}</p>
            <p className=" line-clamp-2">{therapist?.description}</p>
          </>
        ) : (
          <>
            <h2 className="mb-2 text-xl font-bold ">{blog?.title}</h2>
            <p className=" line-clamp-2">{blog?.content}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm font-medium">{t("homeCardDate")}:</span>
              <span className="text-sm ">
                {formatDateTime(blog?.createdAt, "date")}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-4 mt-auto border-t border-gray-300">
        <FavoriteBorderIcon className="text-gray-600 transition dark:text-offWhite-dark hover:text-red-500" />

        {blog && (
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-gray-600 transition dark:text-offWhite-dark hover:text-seaGreen"
          >
            <ShareIcon /> {t("share")}
          </button>
        )}

        {variant !== "default" ? (
          <NavLink
            to={`/blogs/${blog?._id}`}
            className="py-2 font-bold text-center transition rounded-lg w-28 sm:w-32 text-offWhite bg-seaGreen-dark hover:bg-seaGreen-light"
          >
            {t("readMore")}
          </NavLink>
        ) : (
          <Buttons
            type="type7"
            // onClick={() => navigate(`/therapists/${therapist?._id}`)}
          >
            {t("seeMore")}
          </Buttons>
        )}
      </div>
    </div>
  );
};

export default Card;
