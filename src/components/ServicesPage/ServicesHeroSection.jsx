import Image1 from "../../assets/ServicesPageImages/Image1.png";
import { useTranslation } from "react-i18next";

const ServicesHeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="services-hero-section">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-6">{t("Services.heroTitle")}</h1>
          <p className="text-lg mb-8">{t("Services.heroDescription")}</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            {t("getStarted")}
          </button>
        </div>
        <div className="md:w-1/2">
          <img src={Image1} alt="Psychological Services" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default ServicesHeroSection;
