import Image2 from "../../assets/ServicesPageImages/Image2.png";
import Image3 from "../../assets/ServicesPageImages/Image3.png";
import Image4 from "../../assets/ServicesPageImages/Image4.png";
import Image5 from "../../assets/ServicesPageImages/Image5.png";
import Image6 from "../../assets/ServicesPageImages/Image6.png";
import { useTranslation } from "react-i18next";

const ServicesDetail = () => {
  const { t } = useTranslation();
  
  const content = [
    {
      title: t("Services.healthPsychology.title"),
      text: t("Services.healthPsychology.text"),
      list: [
        t("Services.healthPsychology.list.item1"),
        t("Services.healthPsychology.list.item2"),
        t("Services.healthPsychology.list.item3"),
        t("Services.healthPsychology.list.item4")
      ],
      image: Image2,
    },
    {
      title: t("Services.educationalPsychology.title"),
      text: t("Services.educationalPsychology.text"),
      list: [
        t("Services.educationalPsychology.list.item1"),
        t("Services.educationalPsychology.list.item2"),
        t("Services.educationalPsychology.list.item3"),
        t("Services.educationalPsychology.list.item4"),
        t("Services.educationalPsychology.list.item5")
      ],
      image: Image3,
    },
    {
      title: t("Services.neuropsychology.title"),
      text: t("Services.neuropsychology.text"),
      list: [
        t("Services.neuropsychology.list.item1"),
        t("Services.neuropsychology.list.item2"),
        t("Services.neuropsychology.list.item3"),
        t("Services.neuropsychology.list.item4")
      ],
      image: Image4,
    },
    {
      title: t("Services.marriageTherapy.title"),
      text: t("Services.marriageTherapy.text"),
      list: [
        t("Services.marriageTherapy.list.item1"),
        t("Services.marriageTherapy.list.item2"),
        t("Services.marriageTherapy.list.item3"),
        t("Services.marriageTherapy.list.item4")
      ],
      image: Image5,
    },
    {
      title: t("Services.onlineTherapy.title"),
      text: t("Services.onlineTherapy.text"),
      list: [
        t("Services.onlineTherapy.list.item1"),
        t("Services.onlineTherapy.list.item2"),
        t("Services.onlineTherapy.list.item3"),
        t("Services.onlineTherapy.list.item4")
      ],
      image: Image6,
    },
  ];
  
  return (
    <div className="Services-detail bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {content.map((section, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } items-center mb-20 last:mb-0`}
          >
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src={section.image} 
                alt={section.title} 
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
            <div className="md:w-1/2 md:px-8">
              <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              <p className="text-lg mb-6">{section.text}</p>
              <ul className="list-disc pl-6 space-y-2">
                {section.list.map((item, i) => (
                  <li key={i} className="text-lg">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesDetail;
