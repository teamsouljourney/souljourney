
import Video from '../../assets/6690024-hd_1920_1080_25fps.mp4';
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
        ></video>
      </div>
      <div className="video-content space-y-2 z-10">
        <h1 className="font-light text-6xl mb-8">Soul Journey & Online Therapy</h1>
        <a href="#" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Get Started</a>
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