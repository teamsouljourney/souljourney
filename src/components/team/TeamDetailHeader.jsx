import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import avatar from "../../assets/avatar3.svg";

const TeamDetailHeader = ({ singleTherapist, currentUser, toggleCalendar }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { firstName, lastName, image, categoryId } = singleTherapist;

  const therapistCategories = categoryId;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mx-auto w-full max-w-6xl p-4 sm:p-6 md:p-8 mt-4 sm:mt-6">
        {/* Profile Pic */}
        <div className="lg:col-span-1 flex justify-center">
          <img
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-seaGreen dark:border-seaGreen-dark object-cover bg-offWhite"
            src={image || avatar}
            alt={firstName}
          />
        </div>

        {/* Identity */}
        <div className="lg:col-span-3 flex flex-col lg:justify-center lg:items-start lg:pl-5 text-center lg:text-left mt-4 lg:mt-0">
          <div className="text-2xl font-semibold">
            {/* Name */}
            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
              {firstName} {lastName}
            </div>
            {/* Categories */}
            <div className="flex flex-wrap justify-center lg:justify-start mt-3 sm:mt-4 gap-1.5 sm:gap-2">
              {therapistCategories?.map((category) => (
                <span
                  className="inline-block py-0.5 sm:py-1 px-5 bg-[#dbecdd] dark:bg-offWhite-dark text-seaGreen dark:text-seaGreen-dark rounded-full text-xs sm:text-base"
                  key={category?._id}
                >
                  {category?.name}
                </span>
              ))}
            </div>
            {/* Services */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center mt-2 sm:mt-3 gap-x-4 sm:gap-x-6">
              <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-2">
                <span
                  style={{
                    maskImage: `url(/assets/sidebar/videoCall2.svg)`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    width: "16px",
                    height: "16px",
                  }}
                  className="inline-flex justify-center items-center bg-navy-light dark:bg-offWhite-dark sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]"
                ></span>

                <span className="text-sm sm:text-base md:text-[1rem] font-medium sm:font-semibold">
                  Video Call {/* {t("videoCall")} */}
                </span>
              </div>
              <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-2">
                <span
                  style={{
                    maskImage: `url(/assets/sidebar/chat2.svg)`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    width: "20px",
                    height: "20px",
                  }}
                  className="inline-flex justify-center items-center bg-navy-light dark:bg-offWhite-dark sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]"
                ></span>

                <span className="text-sm sm:text-base md:text-[1rem] font-medium sm:font-semibold">
                  Live Chat{/* {t("liveChat")} */}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment button */}

        {currentUser ? (
          <div className="lg:col-span-1 flex flex-col justify-center items-center lg:justify-end mt-4 lg:mt-0">
            <Button
              onClick={() => toggleCalendar(true)}
              className="capitalize whitespace-nowrap min-w-[160px] sm:min-w-[180px] text-sm sm:text-base py-2 sm:py-2.5"
              type="type22"
            >
              {t("createAppointment")}
            </Button>
          </div>
        ) : (
          <div className="lg:col-span-1 flex flex-col justify-center items-center lg:justify-end">
            <Button
              onClick={() => navigate("/login")}
              className="capitalize whitespace-nowrap min-w-[160px] sm:min-w-[180px] text-sm sm:text-base py-2 sm:py-2.5"
              type="type22"
            >
              {t("createAppointment")}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamDetailHeader;
