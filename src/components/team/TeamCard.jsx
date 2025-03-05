// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TeamCard = ({therapist}) => {
  const { t } = useTranslation();


  return (
    <div
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
  );
};

export default TeamCard;
