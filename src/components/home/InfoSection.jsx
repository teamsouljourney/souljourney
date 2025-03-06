import { NavLink } from "react-router-dom";
import foto from "../../assets/images/pexels-yankrukov-6818303.jpg";
import { useTranslation } from "react-i18next";

const InfoSection = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center mt-16 h-full overflow-y-hidden bg-no-repeat bg-cover">
      <div className="xl:w-[70%] lg:w-[80%] md:w-[90%] mx-auto relative md:px-0 px-4 md:my-10 md:bg-gradient-to-l md:from-offWhite dark:from-background-lightdark md:to-seaGreen-light rounded-xl overflow-hidden">
        <div className="w-full h-full flex flex-col items-center">
          <section className="w-full relative flex items-center flex-col lg:flex-row">
            <img className="lg:w-1/2 " src={foto} alt="port image" />
            <div className="lg:absolute lg:left-[40%] md:left-[30%] h-5/6 lg:p-12 sm:p-10 p-6 flex flex-col justify-center bg-offWhite dark:bg-background-dark rounded-sm">
              <h2 className=" md:text-2xl text-xl font-bold mb-2 pt-6 mt-2">
                Soul Journey
              </h2>
              <p className=" text-xs md:text-[0.7rem] mb-4">{t("infoText")}</p>
              <div className="mb-4">
                <button className="md:px-6 px-4 py-2 font-semibold text-sm text-offWhite dark:text-offWhite-dark bg-seaGreen rounded-full hover:bg-seaGreen-light transform trasition delay-100">
                  <NavLink to="/register">{t("nowFreeRegister")}</NavLink>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
