import Image1 from "../../assets/ServicesPageImages/Image1.png"
import { useTranslation } from 'react-i18next';


const ServicesHeroSection = () => {
  const { t } = useTranslation();

  return (
    <div
      className="relative w-full min-h-[60vh] bg-cover bg-center pt-24 pb-12"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      <div className="relative z-10 text-white text-center p-4 md:p-8 flex flex-col justify-center items-center h-full">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[90px] font-bold w-full sm:w-[90%] md:w-[80%] mx-auto mb-4 md:mb-6"
          style={{
            fontFamily: "'Source Serif Pro', serif",
          }}
        >
          {t("srvServicesHeroTitle")}
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 px-2 sm:px-4 md:px-12 w-full max-w-4xl mx-auto"
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "clamp(0.875rem, 0.8rem + 0.5vw, 1.25rem)",
          }}
        >
          {t("srvServicesHeroDescription")}
        </p>
      </div>
    </div>
  )
}

export default ServicesHeroSection

