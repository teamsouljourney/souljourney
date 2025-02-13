import { NavLink, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Card = ({ team, variant = "default", blog }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xs w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer">
      {/* Resim Alanı */}
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={team ? team.image : blog.image} // Conditional image
          alt={team ? team.firstName : blog.title} // Conditional alt text
        />
      </div>

      {/* İçerik Alanı */}
      <div className="p-6">
        {/* Conditional rendering for content */}
        {team ? (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {` ${team.firstName} ${team.lastName}`}
            </h2>
            <p className="text-gray-600 mb-4">{team.categoryId?.name}</p>
            <div className="flex flex-wrap justify-between items-center">
              <span className="text-2xl font-urbanist text-gray-800">
                {team.description}
              </span>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {blog.title}
            </h2>
            <p className="text-gray-600 mb-4">{blog.content}</p>
          </>
        )}
      </div>

      {/* Buton Alanı */}
      <div className="p-6 pt-0">
        {variant !== "default" ? (
          <>
            <FavoriteBorderIcon />
            <NavLink
              to={`/blogs/${blog._id}`} // Use blog._id for the "Read More" button link
              className="w-[50%] block mx-auto text-offWhite font-bold text-center py-2 rounded-lg hover:bg-gradient-to-r bg-seaGreen-dark hover:bg-seaGreen-light"
            >
              Read More
            </NavLink>
          </>
        ) : (
          <button
            className="w-[50%] block mx-auto bg-gradient-to-r from-navy to-offWhite text-customBlack font-bold py-2 rounded-lg hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark"
            onClick={() =>
              navigate(`/therapists/${team._id}`) // Navigate based on team._id
            }
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
