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
      title: t('AboutRowContent.abt_personalized_therapy_sessions_title'),
      text: t('AboutRowContent.abt_personalized_therapy_sessions_text'),
      image: Frame1,
    },
    {
      title: t('AboutRowContent.abt_expert_curated_guidance_title'),
      text: t('AboutRowContent.abt_expert_curated_guidance_text'),
      image: Frame2,
    },
    {
      title: t('AboutRowContent.abt_empowering_tools_for_growth_title'),
      text: t('AboutRowContent.abt_empowering_tools_for_growth_text'),
      image: Frame3,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center space-y-8 px-4 md:px-0">
      <div className="w-full max-w-[1102px] h-auto mx-auto flex flex-col items-center space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold pb-2">{t('AboutRow.abt_whyItWorks')}?{/*Why it works*/}</h1>
          <p className="text-lg pb-2 max-w-[900px] mx-auto">
          {t('AboutRow.abt_discover')}
          </p>
          <img src={Vector2} alt="Vector1" className="mx-auto" />
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center w-full space-y-12 md:space-y-0 md:space-x-8 items-center">
          {content.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 w-full md:w-[30%]">
              <img src={item.image} alt="Frame" className="w-auto h-auto max-w-full" />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <img src={RectangeBottom} alt="Rectangle Bottom" className="w-full h-[10px]" />
    </div>
  );
};

export default AboutRow;