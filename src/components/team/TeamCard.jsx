import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTranslation } from "react-i18next";

const TeamCard = () => {
  const { t } = useTranslation();
  const { filteredTherapists, therapists, searchTerm } = useSelector(
    (state) => state.therapists
  );
  const { selectedCategory } = useSelector((state) => state.categories);

  const displayedTherapists = selectedCategory
    ? filteredTherapists.length > 0
      ? filteredTherapists
      : therapists
    : therapists;

  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-14 ">
        {displayedTherapists.map((therapist) => (
          <div
          key={therapist.id}
            className="flex flex-col w-full max-w-xs p-3 overflow-hidden transition duration-500 transform bg-white shadow-2xl cursor-pointer dark:bg-background-dark text-navy dark:text-offWhite-dark rounded-xl hover:scale-105"
            onClick={() => navigate(`/therapists/${therapist?._id}`)}
          >
            <div className="relative w-full h-64">
              <img
                className="object-cover w-full h-full rounded-lg"
                src={therapist?.image}
                alt={`${therapist?.firstName} ${therapist?.lastName}`}
              />
            </div>

            <div className="flex flex-col justify-between flex-grow p-6">
              <h2 className="mb-2 text-xl font-bold ">
                {`${therapist?.firstName} ${therapist?.lastName}`}
              </h2>
              <p className="mb-2">{therapist?.categoryId?.name}</p>
              <p className="line-clamp-2">{therapist?.description}</p>
            </div>

            <div className="flex items-center justify-center px-4 py-4 mt-auto border-t border-gray-300">
              
              <NavLink
                to={`/therapists/${therapist?._id}`}
                className="py-2 font-bold text-center transition rounded-lg w-28 sm:w-32 text-offWhite bg-seaGreen-dark hover:bg-seaGreen-light"
              >
                {t("seeMore")}
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
