import Image2 from "../../assets/ServicesPageImages/Image2.png";
import Image3 from "../../assets/ServicesPageImages/Image3.png";
import Image4 from "../../assets/ServicesPageImages/Image4.png";
import Image5 from "../../assets/ServicesPageImages/Image5.png";
import Image6 from "../../assets/ServicesPageImages/Image6.png";
import { useTranslation } from 'react-i18next';


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
    <div className="space-y-4 px-4 md:px-12 lg:px-20 py-12 ">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-center pb-3">
        {t("srvEmpoweringMindsEnhancingLives")}        </h1>
      </div>

      {content.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row items-center justify-center py-12 px-6 space-y-8 md:space-y-0 md:space-x-8 lg:space-x-16 border-b-2 border-gray-200 ${
            index % 2 === 1 ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={section.image}
              alt="Therapist Image"
              className="w-[300px] h-auto md:w-[400px] rounded-full object-cover"
            />
          </div>
          <div className="lg:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-full text-center lg:text-left mt-4">
               <h2 className="text-2xl md:text-3xl font-bold ">{section.title}</h2>
            </div>
           
            <div className="w-128 h-1 bg-[#8F5B8A] my-2 mx-auto md:mx-0"></div>
            <p className="opacity-80 text-md md:text-lg px-2 md:px-0">
              {section.text}
            </p>
            <ul className="list-disc list-inside text-md md:text-lg font-medium text-left mt-4">
              {section.list.map((item, i) => (
                <li key={i} className="text-seaGreen-dark dark:text-seaGreen-light"><i>{item}</i></li>
              ))}
            </ul>
          </div>
          
        </div>
      ))}
      <div className="py-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center py-5">
        {t("srvEmbarkOnYourSoulsJourney")}       </h2>
      </div>
      
    </div>
  );
};

export default ServicesDetail;
