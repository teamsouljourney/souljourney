import Image2 from "../../assets/AboutImages/Image2.png";
import Image3 from "../../assets/AboutImages/Image3.png";
import Image4 from "../../assets/AboutImages/Image4.png";
import Vector1 from "../../assets/AboutImages/Vector1.png";
import { useTranslation } from 'react-i18next';

const AboutDetail = () => {
  const { t } = useTranslation();
  
  const content = [
    {
      title: t('About.detail.confidence.title'),
      text: t('About.detail.confidence.text'),
      image: Image2,
    },
    {
      title: t('About.detail.personalized.title'),
      text: t('About.detail.personalized.text'),
      image: Image3,
    },
    {
      title: t('About.detail.strategies.title'),
      text: t('About.detail.strategies.text'),
      image: Image4,
    },
  ];

  return (
    <div className="about-detail-container">
      <img src={Vector1} alt="Vector" className="about-detail-vector" />
      {content.map((section, index) => (
        <div key={index} className="about-detail-section">
          <div className="about-detail-content">
            <h3 className="about-detail-title">{section.title}</h3>
            <p className="about-detail-text">{section.text}</p>
          </div>
          <div className="about-detail-image-container">
            <img src={section.image} alt={section.title} className="about-detail-image" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutDetail;
