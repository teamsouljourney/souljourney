import Image1 from "../../assets/ServicesPageImages/Image1.png"

const ServicesHeroSection = () => {
  return (
    <div
      className="relative w-full min-h-[60vh] bg-cover bg-center pt-24 pb-12"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      <div className="relative z-10 text-white text-center p-4 md:p-8 flex flex-col justify-center items-center h-full">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[90px] font-bold w-full sm:w-[90%] md:w-[80%] mx-auto mb-4 md:mb-6"
          style={{
            fontFamily: "'Source Serif Pro', serif",
          }}
        >
          Our Services
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 px-2 sm:px-4 md:px-12 w-full max-w-[95%] sm:max-w-[90%] mx-auto"
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "clamp(0.875rem, 0.8rem + 0.5vw, 1.25rem)",
          }}
        >
          At our psychological counseling center, we offer a comprehensive range of services designed to support
          individuals in improving their emotional and mental well-being. Our team of experienced professionals works
          closely with each client to understand their unique challenges and provide personalized solutions. Whether you
          are dealing with stress, anxiety, relationship issues, or simply looking to enhance your personal growth, we
          are here to guide you through every step of the process. We are committed to creating a safe, supportive, and
          non-judgmental environment where you can openly explore your feelings and develop healthier coping strategies.
          Each category of service is carefully tailored to meet your specific needs and goals, ensuring that you
          receive the most effective support possible. Your journey toward a balanced and fulfilling life begins here,
          with the help of compassionate and expert guidance.
        </p>
      </div>
    </div>
  )
}

export default ServicesHeroSection

