import BlogsSection from "../components/home/BlogsSection";
import HeroSection from "../components/home/HeroSection";
import ProcessSection from "../components/home/ProcessSection";
import FAQ from "../components/home/FAQ";
import InfoSection from "../components/home/InfoSection";
import Quiz from "../components/home/Quiz";

const Home = () => {
  return (
    <div className="bg-offWhite">
      <HeroSection />
      <InfoSection />
      <ProcessSection />
      <BlogsSection />
      <FAQ />
      <Quiz />
    </div>
  );
};

export default Home;
