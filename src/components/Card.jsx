import { NavLink, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Card = ({ team, variant = "default", blog }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xs w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer flex flex-col p-3">
      {/* Resim Alanı */}
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={team ? team.image : blog.image} // Conditional image
          alt={team ? team.firstName : blog.title} // Conditional alt text
        />
      </div>

      {/* İçerik Alanı */}
      <div className="p-6 flex-grow">
        {team ? (
          <>
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {`${team.firstName} ${team.lastName}`}
            </h2>
            <p className="text-gray-600 mb-2">{team.categoryId?.name}</p>
            <p className="text-gray-600 line-clamp-2">{team.description}</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {blog.title}
            </h2>
            <p className="text-gray-600 line-clamp-2">{blog.content}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Çizgi ve Buton Alanı */}
      <div className="border-t border-gray-300 mt-auto px-6 py-4 flex justify-between items-center">
        <FavoriteBorderIcon className="text-gray-600 cursor-pointer hover:text-red-500 transition" />

        {variant !== "default" ? (
          <NavLink
            to={`/blogs/${blog._id}`}
            className="w-28 sm:w-32 text-offWhite font-bold text-center py-2 rounded-lg bg-seaGreen-dark hover:bg-seaGreen-light transition"
          >
            Read More
          </NavLink>
        ) : (
          <button
            className="w-28 sm:w-32 bg-gradient-to-r from-navy to-offWhite text-customBlack font-bold py-2 rounded-lg hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark transition"
            onClick={() => navigate(`/therapists/${team._id}`)}
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
