import AboutHeroSectionBackground from "../../assets/AboutImages/Image1.png";
import { useTranslation } from "react-i18next";

const AboutHeroSection = () => {
  const { t } = useTranslation();
  return (
    <div
      className="relative w-full min-h-[50vh] bg-cover bg-center py-24 "
      style={{ backgroundImage: `url(${AboutHeroSectionBackground})` }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center text-white md:p-8">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl">
          {t("AboutHeroSection.abt_us")}
        </h1>

        <p className="max-w-3xl px-4 mx-auto mt-4 text-lg lg:text-xl">
          {t("AboutHeroSection.abt_welcome")}
        </p>
      </div>
    </div>
  );
};

export default AboutHeroSection;
