import AboutHeroSectionBackground from "../../assets/AboutImages/Image1.png";
import { useTranslation } from 'react-i18next';

const AboutHeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="about-hero-container" style={{ 
      backgroundImage: `url(${AboutHeroSectionBackground})`,
      position: "relative",
      width: "100%",
      height: "400px",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <div className="about-hero-content" style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "80%",
        maxWidth: "800px"
      }}>
        <h1 className="about-hero-title" style={{
          fontSize: "2.5rem",
          marginBottom: "1rem"
        }}>{t('About.hero.title')}</h1>
        <p className="about-hero-description" style={{
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>{t('About.hero.description')}</p>
      </div>
    </div>
  );
};

export default AboutHeroSection;
