import AboutHeroSection from '../components/About/AboutHeroSection';
import AboutDetail from '../components/About/AboutDetail';
import AboutRow from '../components/About/AboutRow';

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-offWhite dark:bg-background-dark text-navy dark:text-offWhite-dark">
      {/* About Hero Section */}
      <section className="w-full min-h-[60vh]">
        <AboutHeroSection />
      </section>

      {/* About Details */}
      <section className="w-full max-w-screen-2xl flex justify-center px-4 md:px-8 lg:px-16 py-8">
        <AboutDetail />
      </section>

      {/* About Row */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <AboutRow />
      </section>
    </div>
  );
};

export default About;
