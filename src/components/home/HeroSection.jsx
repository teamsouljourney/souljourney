import { NavLink } from "react-router-dom";
import Video from "../../assets/images/4919748-uhd_4096_2160_25fps.mp4";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          className="object-cover w-full h-full"
          src={Video}
          type="video/mp4"
          autoPlay
          muted
          loop
        ></video>
        <div className="absolute inset-0 bg-black pointer-events-none opacity-30"></div>
      </div>

      <div className="z-10 flex flex-col items-center">
        <h1 className="mb-10 text-4xl font-light font-urbanist sm:text-5xl md:text-5xl lg:text-5xl xl:text-7xl">
          {t("onlineTherapy")}
        </h1>
        {currentUser ? null : (
          <NavLink
            to="register"
            className="px-8 py-3 text-lg font-semibold transition duration-300 ease-in-out transform rounded-full bg-customBlack bg-opacity-70 text-offWhite hover:bg-navy hover:scale-105 hover:shadow-lg sm:px-8 sm:py-3 sm:text-2xl md:px-10 md:py-4 md:text-2xl lg:px-12 lg:py-5 lg:text-2xl"
          >
            {t("getStarted")}
          </NavLink>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
