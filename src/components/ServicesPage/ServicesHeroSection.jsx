import Image1 from "../../assets/ServicesPageImages/Image1.png";
import { useTranslation } from "react-i18next";

const ServicesHeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="services-hero-container" style={{ 
      backgroundImage: `url(${Image1})`,
      position: "relative",
      width: "100%",
      height: "400px",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <div className="services-hero-content" style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "80%",
        maxWidth: "800px"
      }}>
        <h1 className="services-hero-title" style={{
          fontSize: "2.5rem",
          marginBottom: "1rem"
        }}>{t("Services.heroTitle")}</h1>
        <p className="services-hero-description" style={{
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>{t("Services.heroDescription")}</p>
      </div>
    </div>
  );
};

export default ServicesHeroSection;
