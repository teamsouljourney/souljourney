import BlogsSection from "../components/home/BlogsSection";
import HeroSection from "../components/home/HeroSection";
import ProcessSection from "../components/home/ProcessSection";
import FAQ from "../components/home/FAQ"
import Quiz from "../components/home/Quiz"

const Home = () => {
  return (
    <>
      <HeroSection />
      <ProcessSection/>
      <BlogsSection/>
      <FAQ/>
      <Quiz/>

    </>
  );
};

export default Home;
