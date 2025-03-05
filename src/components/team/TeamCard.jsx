// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TeamCard = ({therapist}) => {
  const { t } = useTranslation();

// console.log(therapist);

  return (
    <div
      className="flex flex-col w-full max-w-xs p-3 overflow-hidden transition duration-500 transform bg-white shadow-lg dark:bg-background-dark text-navy dark:text-offWhite-dark rounded-xl md:hover:scale-[1.03]"
    >
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={therapist?.image}
          alt={`${therapist?.firstName} ${therapist?.lastName}`}
        />
      </div>

      <div className="flex flex-col justify-around gap-y-2 flex-grow p-6 cursor-default">
        <h2 className="mb-2 text-xl font-bold ">
          {`${therapist?.firstName} ${therapist?.lastName}`}
        </h2>
        <div className="mb-2 text-sm md:text-base font-bold text-seaGreen-dark dark:text-seaGreen-light">
          {therapist?.categoryId?.map((category)=> (
          <i key={category._id}>{category.name}</i>
        ))}
        </div>
        
        <p className="line-clamp-2 text-xs sm:text-sm md:text-base">{therapist?.description}</p>
      </div>

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
