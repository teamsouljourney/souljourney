import { NavLink, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Card = ({
  team,
  variant = "default", // "default" veya "detailed"
  onClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xs w-full bg-offWhite rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer">
      {/* Resim Alanı */}
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={team.image}
          alt={team.name}
        />
      </div>

      {/* İçerik Alanı */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{team.name}</h2>
        <p className="text-gray-600 mb-4">{team.description}</p>
        <div className="flex flex-wrap justify-between items-center">
          <span className="text-2xl text-gray-800">{team.area}</span>
        </div>
      </div>

      {/* Buton Alanı */}
      <div className="p-6 pt-0 flex justify-between items-center">
        <button className="px-4 py-2 opacity-80 rounded-full text-sm  flex items-center">
          <FavoriteBorderIcon className="mr-2" />
        </button>

        {variant === "default" ? (
          <NavLink
            to={`/team/${team.id}`}
            className="w-[50%] text-offWhite font-bold text-center py-2 rounded-lg hover:bg-gradient-to-r bg-seaGreen-dark hover:bg-seaGreen-light"
          >
            Read More
          </NavLink>
        ) : (
          <button
            className="w-[50%] bg-gradient-to-r from-navy to-offWhite text-customBlack font-bold py-2 rounded-lg hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark"
            onClick={() => (onClick ? onClick() : navigate(`/team/${team.id}`))}
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
