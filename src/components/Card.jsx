import { NavLink, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share"; 
import Buttons from "./button/Button"; 

const Card = ({ therapist, variant = "default", blog }) => {
  const navigate = useNavigate();

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
    <div className="max-w-xs w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer flex flex-col p-3">
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
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {`${therapist?.firstName} ${therapist?.lastName}`}
            </h2>
            <p className="text-gray-600 mb-2">{therapist?.categoryId?.name}</p>
            <p className="text-gray-600 line-clamp-2">{therapist?.description}</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {blog?.title}
            </h2>
            <p className="text-gray-600 line-clamp-2">{blog?.content}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm text-gray-700 font-medium">Date:</span>
              <span className="text-sm text-gray-500">
                {new Date(blog?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Çizgi ve Buton Alanı */}
      <div className="border-t border-gray-300 mt-auto px-4 py-4 flex justify-between items-center">
        <FavoriteBorderIcon className="text-gray-600 cursor-pointer hover:text-red-500 transition" />

        {/* Paylaş Butonu Sadece Bloglar İçin */}
        {blog && (
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-gray-600 hover:text-seaGreen transition"
          >
            <ShareIcon /> Share
          </button>
        )}

        {variant !== "default" ? (
          <NavLink
            to={`/blogs/${blog?._id}`}
            className="w-28 sm:w-32 text-offWhite font-bold text-center py-2 rounded-lg bg-seaGreen-dark hover:bg-seaGreen-light transition"
          >
            Read More
          </NavLink>
        ) : (
          <Buttons
            type="type7"
            onClick={() => navigate(`/therapists/${therapist?._id}`)}
          >
            See More
          </Buttons>
        )}
      </div>
    </div>
  );
};

export default Card;
