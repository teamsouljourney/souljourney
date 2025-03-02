import { NavLink, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share"; 
import Buttons from "./button/Button"; 
import { useTranslation } from "react-i18next";

const Card = ({ therapist, variant = "default", blog }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Web Share API ile paylaşım fonksiyonu
  const handleShare = async () => {
    if (!blog) return; // Eğer blog yoksa paylaşma
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
    <div className="max-w-xs w-full bg-white dark:bg-background-dark text-navy dark:text-offWhite-dark rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer flex flex-col p-3" onClick={() => navigate(`/therapists/${therapist?._id}`)}>
      {/* Resim Alanı */}
      <div className="relative">
        <img
          className="w-full h-64 object-contain"
          src={therapist ? therapist?.image : blog?.image}
          alt={therapist ? therapist?.firstName : blog?.title}
        />
      </div>

      {/* İçerik Alanı */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        {therapist ? (
          <>
            <h2 className="text-xl font-bold mb-2 ">
              {`${therapist?.firstName} ${therapist?.lastName}`}
            </h2>
            <p className=" mb-2">{therapist?.categoryId?.name}</p>
            <p className=" line-clamp-2">{therapist?.description}</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2 ">
              {blog?.title}
            </h2>
            <p className=" line-clamp-2">{blog?.content}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm  font-medium">{t("homeCardDate")}:</span>
              <span className="text-sm ">
                {new Date(blog?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Çizgi ve Buton Alanı */}
      <div className="border-t border-gray-300 mt-auto px-4 py-4 flex justify-between items-center">
        <FavoriteBorderIcon className="text-gray-600 dark:text-offWhite-dark cursor-pointer hover:text-red-500 transition" />

        {/* Paylaş Butonu Sadece Bloglar İçin */}
        {blog && (
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-gray-600 dark:text-offWhite-dark hover:text-seaGreen transition"
          >
            <ShareIcon /> {t('share')}
          </button>
        )}

        {variant !== "default" ? (
          <NavLink
            to={`/blogs/${blog?._id}`}
            className="w-28 sm:w-32 text-offWhite font-bold text-center py-2 rounded-lg bg-seaGreen-dark hover:bg-seaGreen-light transition"
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
