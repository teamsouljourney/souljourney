import { useTranslation } from "react-i18next";
import ProcessItem from "./ProcessItem";
import Foto1 from "../../assets/images/pexels-liza-summer-6347901.jpg";
import Foto2 from "../../assets/images/pexels-yankrukov-4458421.jpg";
import Foto3 from "../../assets/images/pexels-karolina-grabowska-4467687.jpg";
import Foto4 from "../../assets/images/pexels-cottonbro-4065876.jpg";

const ProcessSection = () => {
  const { t } = useTranslation();

  const processSteps = [
    {
      title: t("processSteps.0.title"),
      description: t("processSteps.0.description"),
      image: Foto1,
    },
    {
      title: t("processSteps.1.title"),
      description: t("processSteps.1.description"),
      image: Foto2,
    },
    {
      title: t("processSteps.2.title"),
      description: t("processSteps.2.description"),
      image: Foto3,
    },
    {
      title: t("processSteps.3.title"),
      description: t("processSteps.3.description"),
      image: Foto4,
    },
  ];

  return (
    <div className="flex flex-col justify-between px-4 mx-4 mb-10 sm:mx-8 md:mx-12 lg:mx-24 sm:px-6 lg:px-8">
      <div className="mt-10 text-center ">
        <h3 className="text-3xl leading-normal tracking-tight sm:text-5xl font-urbanist text-navy dark:text-offWhite-dark">
          {t("howItWorks")} ?
        </h3>
      </div>

      <div className="mt-10 sm:mt-20">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {processSteps.map((step, index) => (
            <ProcessItem
              key={index}
              title={step.title}
              description={step.description}
              image={step.image}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProcessSection;
