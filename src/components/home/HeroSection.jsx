import { NavLink } from "react-router-dom";
import Video from "../../assets/images/4919748-uhd_4096_2160_25fps.mp4";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center text-white">
      {/* Video Container */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={Video}
          type="video/mp4"
          autoPlay
          muted
          loop
        ></video>
        {/* Overlay (Bu artık tıklanmayı engellemiyor) */}
        <div className="absolute inset-0 bg-black opacity-30 pointer-events-none"></div>
      </div>

      {/* **Video Üzerindeki İçerik** */}
      <div className="z-10 flex flex-col items-center">
        <h1 className="font-light font-urbanist text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-7xl mb-10">
         {t("onlineTherapy")}
        </h1>
        <NavLink
          to="register"
          className="bg-customBlack bg-opacity-70 text-offWhite hover:bg-navy py-3 px-8 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg sm:px-8 sm:py-3 sm:text-2xl md:px-10 md:py-4 md:text-2xl lg:px-12 lg:py-5 lg:text-2xl"
        >
         {t("getStarted")}
        </NavLink>
      </div>
    </section>
  );
};

export default HeroSection;
