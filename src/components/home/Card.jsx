import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Card = ({ teams }) => {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-14 rounded-lg">
        {teams?.slice(0, 4).map((team) => (
          <div
            key={team.id}
            className="max-w-md lg:max-w-lg bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal rounded-lg shadow-lg"
          >
            <img
              src={team.image}
              className="w-full h-48 object-cover mb-3 rounded-t-lg"
            />
            <div className="p-4 pt-2">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  ></svg>
                  {team.name}
                </p>
                <a
                  href="#"
                  className="text-gray-900 font-bold text-lg mb-2 hover:text-navy inline-block"
                >
                  {team.area}
                </a>
                <p className="text-gray-700 text-sm">{team.description}</p>
              </div>
              <div className="flex items-center">
                <button className="px-4 py-2 opacity-80 rounded-full text-sm text-black font-urbanist flex items-center">
                  <FavoriteBorderIcon />
                </button>
                <div className="text-sm">
                  <a
                    href="#"
                    className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
                  >
                    {team.name}
                  </a>
                  <p className="text-gray-600">Aug 18</p>
                </div>
                <NavLink
                  to="blogs"
                  className="w-full block mx-auto bg-gradient-to-r from-navy to-offWhite text-customBlack font-bold text-center py-2 rounded-lg hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-light"
                >
                  Read More
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
