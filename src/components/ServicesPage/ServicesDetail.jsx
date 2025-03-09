import { useTranslation } from 'react-i18next';
import Image2 from "../../assets/ServicesPageImages/Image2.png";
import Image3 from "../../assets/ServicesPageImages/Image3.png";
import Image4 from "../../assets/ServicesPageImages/Image4.png";
import Image5 from "../../assets/ServicesPageImages/Image5.png";
import Image6 from "../../assets/ServicesPageImages/Image6.png";

const ServicesDetail = () => {
  const { t } = useTranslation();

  const content = [
    {
      title: t("srvHealthPsychologyTitle"),
      text: t("srvHealthPsychologyText"),
      list: t("srvHealthPsychologyList", { returnObjects: true }),
      image: Image2,
    },
    {
      title: t("srvEducationalPsychologyTitle"),
      text: t("srvEducationalPsychologyText"),
      list: t("srvEducationalPsychologyList", { returnObjects: true }),
      image: Image3,
    },
    {
      title: t("srvNeuropsychologyTitle"),
      text: t("srvNeuropsychologyText"),
      list: t("srvNeuropsychologyList", { returnObjects: true }),
      image: Image4,
    },
    {
      title: t("srvMarriageAndFamilyTherapyTitle"),
      text: t("srvMarriageAndFamilyTherapyText"),
      list: t("srvMarriageAndFamilyTherapyList", { returnObjects: true }),
      image: Image5,
    },
    {
      title: t("srvOnlineTherapyServicesTitle"),
      text: t("srvOnlineTherapyServicesText"),
      list: t("srvOnlineTherapyServicesList", { returnObjects: true }),
      image: Image6,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      {content.map((section, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <img
            src={section.image}
            alt={section.title}
            className="rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{section.title}</h2>
            <p className="text-gray-600 mb-4">{section.text}</p>
            <ul className="list-disc list-inside text-gray-600">
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesDetail;
