import AboutHeroSectionBackground from "../../assets/AboutImages/Image1.png";

const AboutHeroSection = () => {
  return (
    <div
      className="relative w-full h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${AboutHeroSectionBackground})` }}
    >
      <div className="relative z-10 text-white text-center p-8 flex flex-col justify-center items-center h-full">
       
        <h1
          className="text-6xl md:text-[96px] font-bold w-[402px] h-[120px] mx-auto"
          style={{
            fontFamily: "'Source Serif Pro', serif",
          }}
        >
          About Us
        </h1>

        
        <p
          className="text-lg mb-6 px-4 md:px-20 w-[863px] h-[116px] mx-auto text-[24px]"
          style={{
            fontFamily: "'Urbanist', sans-serif",
          }}
        >
          Welcome to our platform. Where we connect clients with experienced
          therapists to provide accessible and professional online therapy
          sessions. Our mission is to create a safe and supportive environment
          for your mental well-being.
        </p>

        {/* See More Butonu */}
        <button className="bg-[#2E5077] text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all mt-[60px]">
          See More
        </button>
      </div>
    </div>
  );
};

export default AboutHeroSection;
