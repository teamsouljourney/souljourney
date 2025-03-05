import AboutHeroSectionBackground from "../../assets/AboutImages/Image1.png"

const AboutHeroSection = () => {
  return (
    <div
      className="relative w-full min-h-[60vh] bg-cover bg-center pt-24 pb-12"
      style={{ backgroundImage: `url(${AboutHeroSectionBackground})` }}
    >
      <div className="relative z-10 text-white text-center p-4 md:p-8 flex flex-col justify-center items-center h-full">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold w-full sm:w-[90%] md:w-[80%] mx-auto mb-4 md:mb-6"
          style={{
            fontFamily: "'Source Serif Pro', serif",
          }}
        >
          About Us
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 px-2 sm:px-4 md:px-12 w-full max-w-[95%] sm:max-w-[90%] mx-auto"
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "clamp(0.875rem, 0.8rem + 0.5vw, 1.25rem)",
          }}
        >
          Welcome to our platform, where we aim to connect you with skilled and compassionate therapists for accessible
          online therapy sessions. Our mission is to create a safe and supportive space that prioritizes your mental
          well-being. We understand that seeking help can be challenging, so we are here to provide a professional and
          non-judgmental environment to support you through life is struggles. Whether you are managing stress, anxiety,
          or personal challenges, we are committed to helping you find the guidance you need. Our platform offers
          flexibility, ensuring that mental health care is both convenient and effective, no matter where you are. We
          are dedicated to making therapy accessible to everyone, fostering growth and resilience in your journey toward
          well-being
        </p>
      </div>
    </div>
  )
}

export default AboutHeroSection

