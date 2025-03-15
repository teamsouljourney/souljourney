import { useTranslation } from 'react-i18next';
const BlogHeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="py-24 text-center bg-offWhite-dark dark:bg-background-dark">
      <h1 className="text-4xl lg:text-6xl font-bold">Soul&Journey</h1>
      <p className="max-w-3xl px-4 mx-auto mt-4 text-lg lg:text-xl">
      {t('blogHeroDescription')}
      </p>
    </div>
  );
};

export default BlogHeroSection;
