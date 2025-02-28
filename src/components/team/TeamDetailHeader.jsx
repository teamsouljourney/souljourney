import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";

const TeamDetailHeader = ({ singleTherapist, currentUser, toggleCalendar }) => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const { firstName, lastName, email, image, categoryId } = singleTherapist;

  const therapistCategories = categoryId;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mx-auto w-full max-w-6xl p-8 mt-6">
        {/* Profile Pic */}
        <div className="lg:col-span-1 flex justify-center">
          <img
            className="w-48 h-48 rounded-full border-4 border-seaGreen dark:border-seaGreen-dark object-cover bg-offWhite"
            src={image || avatar}
            alt={firstName}
          />
        </div>

        {/* Identity */}
        <div className="lg:col-span-3 flex flex-col lg:justify-center lg:items-start lg:pl-5  text-center lg:text-left">
          <div className="text-2xl font-semibold">
            {/* Name */}
            <div className="text-4xl font-semibold mb-2">
              {firstName} {lastName}
              <p className="text-sm mt-1">{email}</p>
            </div>
            {/* Categories */}
            <div className="flex flex-wrap justify-center lg:justify-start mt-4 gap-2 text-lg">
              {therapistCategories.map((category) => (
                <span
                  className="inline-block px-2 py-1 bg-[#E8F5E9] dark:bg-offWhite-dark text-seaGreen dark:text-seaGreen-dark rounded-full text-sm"
                  key={category._id}
                >
                  {category.name}
                </span>
              ))}
            </div>
            {/* Services */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center mt-2 gap-x-6">
              <div className="flex flex-row items-center  justify-center gap-2">
                <span
                  style={{
                    maskImage: `url(/assets/sidebar/videoCall2.svg)`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    width: "20px",
                    height: "20px",
                  }}
                  className="inline-flex justify-center items-center  bg-navy-light dark:bg-offWhite-dark"
                ></span>

                <span className="text-[1rem] font-semibold">Video Call {/* {t("videoCall")} */}</span>
              </div>
              <div className="flex flex-row items-center  justify-center gap-2">
                <span
                  style={{
                    maskImage: `url(/assets/sidebar/chat2.svg)`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    width: "20px",
                    height: "20px",
                  }}
                  className="inline-flex justify-center items-center  bg-navy-light dark:bg-offWhite-dark"
                ></span>

                <span className="text-[1rem] font-semibold">Live Chat{/* {t("liveChat")} */}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment button */}

        {currentUser ? (
            <div className="lg:col-span-1 flex flex-col justify-center items-center lg:justify-end">
          <Button
            onClick={() => toggleCalendar(true)}
            className="capitalize"
            type="type22"
          >
            work with me {/* {t("workWithMe")} */}
          </Button>
        </div>
        ) : (
            <div className="lg:col-span-1 flex flex-col justify-center items-center lg:justify-end">
          <Button
            onClick={() => navigate("/login")}
            className="capitalize"
            type="type22"
          >
            work with me {/* {t("workWithMe")} */}
          </Button>
        </div>
        )}
        
      </div>
    </>
  );
};

export default TeamDetailHeader;
