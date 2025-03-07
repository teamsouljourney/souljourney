import Frame1 from "../../assets/AboutImages/Frame1.png";
import Frame2 from "../../assets/AboutImages/Frame2.png";
import Frame3 from "../../assets/AboutImages/Frame3.png";
import Vector2 from "../../assets/AboutImages/Vector2.png";
import RectangeBottom from "../../assets/AboutImages/RectangleBottom.png";
import { useTranslation } from 'react-i18next';

const AboutRow = () => {
  const { t } = useTranslation();
  
  const content = [
    {
      title: t('About.row.sessions.title'),
      text: t('About.row.sessions.text'),
      image: Frame1,
    },
    {
      title: t('About.row.guidance.title'),
      text: t('About.row.guidance.text'),
      image: Frame2,
    },
    {
      title: t('About.row.tools.title'),
      text: t('About.row.tools.text'),
      image: Frame3,
    },
  ];

  return (
    <div className="about-row-container">
      <h2 className="about-row-heading">{t('About.row.discover')}</h2>
      <div className="about-row-content">
        {content.map((item, index) => (
          <div key={index} className="about-row-item">
            <div className="about-row-item-content">
              <h3 className="about-row-item-title">{item.title}</h3>
              <p className="about-row-item-text">{item.text}</p>
            </div>
            <div className="about-row-item-image-container">
              <img src={item.image} alt={item.title} className="about-row-item-image" />
            </div>
          </div>
        ))}
      </div>
      <img src={Vector2} alt="Vector" className="about-row-vector" />
      <img src={RectangeBottom} alt="Rectangle" className="about-row-rectangle-bottom" />
    </div>
  );
};

export default AboutRow;
