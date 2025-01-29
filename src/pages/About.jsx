import AboutHeroSection from '../components/About/AboutHeroSection'
import AboutDetail from '../components/About/AboutDetail';
import AboutRow from '../components/About/AboutRow';

const About = () => {
  return (
    <div className="flex flex-col">
      {/* About Hero Section: %20 */}
      <div className="w-full h-1/5">
        <AboutHeroSection />
      </div>

      {/* About Details: %60 */}
      <div className="w-full h-3/5">
        <AboutDetail />
      </div>

      {/* About Row: %20 */}
      <div className="w-full h-1/5">
        <AboutRow />
      </div>
    </div>
  );
}

export default About;
