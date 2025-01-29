import { NavLink } from "react-router-dom";
import Video from '../../assets/images/4919748-uhd_4096_2160_25fps.mp4';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center text-white">
      <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          className="min-w-full min-h-full absolute object-cover"
          src={Video}
          type="video/mp4"
          autoPlay
          muted
          loop
          // style={{ height: '20vh' }}
        ></video>
      </div>
      <div className="video-content space-y-2 z-10">
        <h1 className="font-light font-urbanist   sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl mb-8">Soul Journey & Online Therapy</h1>
        <NavLink to="register" className="bg-seaGreen text-gray-900 hover:bg-pastelGreen-light py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Get Started</NavLink>
      </div>
      <style>{`
        .video-docker video {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .video-docker::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.2); /* Arka planı transparan yaparak video tamamen görünür */
          z-index: 1;
        }
      `}</style>
    </section>
  );
};
export default HeroSection;