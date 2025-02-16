import Image1 from "../../assets/ServicesPageImages/Image1.png";

const ServicesHeroSection = () => {
  return (
    <div
      className="relative w-full h-[60vh] bg-cover bg-center flex flex-col justify-center items-center px-4 text-center"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      <div className="relative z-10 text-white max-w-4xl mx-auto">
        <h1
          className="text-4xl md:text-6xl lg:text-[90px] font-bold mx-auto"
          style={{ fontFamily: "'Source Serif Pro', serif" }}
        >
          Our Services
        </h1>
        <p
          className="text-lg md:text-xl lg:text-2xl mt-4 px-2 md:px-8 lg:px-20"
          style={{ fontFamily: "'Urbanist', sans-serif" }}
        >
          At our psychological counseling center, we offer a wide range of services
          designed to help individuals improve their emotional and mental well-being.
          Each category is tailored to meet your specific needs and goals.
        </p>
      </div>
    </div>
  );
};

export default ServicesHeroSection;
