// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import avatar from "../../assets/avatar3.svg";

const TeamCard = ({ therapist }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full max-w-xs  overflow-hidden transition duration-500 transform bg-white shadow-lg dark:bg-background-dark text-navy dark:text-offWhite-dark rounded-xl md:hover:scale-[1.03]">
      {/* Card Header Image */}
      <div className="relative w-full h-56 md:h-64">
        <img
          className="object-cover w-full h-full "
          src={therapist?.image || avatar}
          alt={`${therapist?.firstName} ${therapist?.lastName}`}
        />
      </div>
      {/* Card Body */}
      <div className="flex flex-col justify-around gap-y-1 flex-grow px-6 py-3 cursor-default">
        <h2 className="mb-1 text-xl lg:text-2xl font-bold">
          {`${therapist?.firstName} ${therapist?.lastName}`}
        </h2>
        <div className="mb-1 text-sm md:text-base font-bold text-seaGreen-dark dark:text-seaGreen-light line-clamp-2">
          {therapist?.categoryId?.map((category) => (
            <i key={category._id}>{category.name}</i>
          ))}
        </div>
        <p className="line-clamp-2 text-xs sm:text-sm md:text-base">
          {therapist?.description}
        </p>
      </div>
      {/* Card Footer See More Button */}
      <div className="flex items-center justify-center px-4 py-3 md:py-4 mt-auto border-t border-gray-300">
        <NavLink
          to={`/therapists/${therapist?._id}`}
          className="py-1.5 sm:py-2 text-sm sm:text-base font-bold text-center transition rounded-lg w-24 sm:w-28 md:w-32 text-offWhite bg-seaGreen-dark hover:bg-seaGreen-light"
        >
          {t("seeMore")}
        </NavLink>
      </div>
    </div>
  );
};

export default TeamCard;
