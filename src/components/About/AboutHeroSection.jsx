import AboutHeroSectionBackground from "../../assets/AboutImages/Image1.png";

const AboutHeroSection = () => {
  return (
    <div
      className="relative w-full h-[60vh] bg-cover bg-center pt-24"
      style={{ backgroundImage: `url(${AboutHeroSectionBackground})` }}
    >
      <div className="relative z-10 text-white text-center p-8 flex flex-col justify-center items-center h-full">
        
        <h1
          className="text-5xl md:text-[80px] font-bold w-[80%] mx-auto mb-16"
          style={{
            fontFamily: "'Source Serif Pro', serif",
          }}
        >
          About Us
        </h1>

        <p
          className="text-base md:text-lg lg:text-xl mb-4 px-4 md:px-12 w-[90%] max-w-[800px] mx-auto"
          style={{
            fontFamily: "'Urbanist', sans-serif",
          }}
        >
          Welcome to our platform. Where we connect clients with experienced therapists to provide accessible and professional online therapy sessions. Our mission is to create a safe and supportive environment for your mental well-being.
        </p>

        <button className="bg-[#2E5077] text-white py-2 px-6 rounded-md hover:bg-seaGreen-dark dark:hover:bg-offWhite-dark dark:hover:text-background-dark dark:hover:font-semibold transition-all mt-6">
          See More
        </button>
        
      </div>
    </div>
  );
};

export default AboutHeroSection;
