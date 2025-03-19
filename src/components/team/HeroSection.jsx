import heroFoto from "../../assets/images/papaioannou-kostas-tysecUm5HJA-unsplash.jpg";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col min-h-[55vh]  items-center justify-center flex-1 w-full bg-bottom bg-cover opacity-80 "
      style={{
        backgroundImage: `url(${heroFoto})`,
      }}
    >
      <div className="text-center text-offWhite">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl">
          Soul&Journey
        </h1>
        <p className="max-w-3xl px-4 mx-auto mt-4 text-lg lg:text-xl">
          {t("OurPsychologicalCounselingTeam")}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
