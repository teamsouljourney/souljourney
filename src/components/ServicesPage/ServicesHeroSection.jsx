import Image1 from "../../assets/ServicesPageImages/Image1.png";
import { useTranslation } from "react-i18next";

const ServicesHeroSection = () => {
  const { t } = useTranslation();

  return (
    <div
      className="w-full min-h-[55vh] bg-cover bg-center pt-36"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      <div className="text-center text-offWhite">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl">
          {t("srvServicesHeroTitle")}
        </h1>

        <p className="max-w-3xl px-4 mx-auto mt-4 text-lg lg:text-xl">
          {t("srvServicesHeroDescription")}
        </p>
      </div>
    </div>
  );
};

export default ServicesHeroSection;
