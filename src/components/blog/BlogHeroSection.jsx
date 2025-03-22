import { useTranslation } from "react-i18next";
const BlogHeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[45vh] lg:min-h-[50vh] pt-36 pb-12 text-center bg-offWhite-dark dark:bg-background-dark">
      <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
        Soul&Journey
      </h1>
      <p className="max-w-3xl px-4 mx-auto mt-4 text-lg lg:text-xl">
        {t("blogHeroDescription")}
      </p>
    </div>
  );
};

export default BlogHeroSection;
