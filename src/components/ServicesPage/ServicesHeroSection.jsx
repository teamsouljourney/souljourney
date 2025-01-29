import Image1 from "../../assets/ServicesPageImages/Image1.png";

const ServicesHeroSection = () => {
  return (
    <div
      className="relative w-full h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      <div className="relative z-10 text-white text-center p-8 flex flex-col justify-center items-center h-full">
       
        <h1
          className="text-6xl md:text-[90px] font-bold w-[700px] h-[120px] mx-auto"
          style={{
            fontFamily: "'Source Serif Pro', serif",
          }}
        >
          Our Services
        </h1>

        
        <p
          className="text-lg mb-6 px-4 md:px-20 w-[863px] h-[116px] mx-auto text-[24px]"
          style={{
            fontFamily: "'Urbanist', sans-serif",
          }}
        >
         At our psychological counseling center, we offer a wide range of services designed to help individuals improve their emotional and mental well-being. Each category is tailored to meet your specific needs and goals. We listen to you and provide solutions that work best for you.
        </p>

       
      </div>
    </div>
  );
};

export default ServicesHeroSection;
