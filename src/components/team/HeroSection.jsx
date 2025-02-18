import heroFoto from "../../assets/images/papaioannou-kostas-tysecUm5HJA-unsplash.jpg";

const HeroSection = () => {
  return (
    <>
      <main
        className="flex flex-1 w-full flex-col  items-center  justify-center text-center px-4 "
        style={{
          backgroundImage: `url(${heroFoto})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          height: "60vh",
          opacity: 0.8,
        }}
      >
        {/* <h1 className="mx-auto max-w-4xl font-display text-5xl font-italic tracking-normal text-offWhite sm:text-5xl font-urbanist"
    >Soul&Journey
       
    </h1> */}

        <h1
          className="text-5xl md:text-[80px] font-bold text-white  w-[80%] mx-auto mb-16"
          style={{
            fontFamily: "'Source Serif Pro', serif",
          }}
        >
          Soul&Journey
        </h1>

        <p className="mx-auto max-w-xl text-lg text-offWhite  sm:text-sm md:text-lg lg:text-xl xl:text-xl font-urbanist">
          Our Psychological Counseling team is dedicated to supporting your
          mental well-being with personalized care. With diverse expertise in
          counseling and guidance, our professionals are here to help you on
          your journey to emotional balance.
        </p>
      </main>
    </>
  );
};

export default HeroSection;
