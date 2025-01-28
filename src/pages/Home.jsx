import BlogsSection from "../components/home/BlogsSection";
import HeroSection from "../components/home/HeroSection";
import ProcessSection from "../components/home/ProcessSection";
import FAQ from "../components/home/FAQ";
import InfoSection from "../components/home/InfoSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <InfoSection />
      <ProcessSection />
      <BlogsSection />
      <FAQ />
    </>
  );
};

export default Home;
