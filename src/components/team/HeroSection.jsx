import heroFoto from "../../assets/images/papaioannou-kostas-tysecUm5HJA-unsplash.jpg"

const HeroSection = () => {
  return (
    <>
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 "
      style={{
          backgroundImage: `url(${heroFoto})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',    
          height: '60vh',
          opacity: 0.8, 
        }}
      >
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-italic tracking-normal text-offWhite sm:text-7xl font-urbanist"
    >Soul&Journey
       
    </h1>
    
   
    <p className="mx-auto mt-6 max-w-xl text-lg text-offWhite  sm:text-base md:text-lg lg:text-xl xl:text-xl font-urbanist">Our Psychological Counseling team is composed of passionate professionals dedicated to helping you achieve mental well-being and emotional balance. With a broad range of expertise in counseling, guidance, and support, our team is committed to providing you with personalized care tailored to your unique needs. Get to know the experts behind our success and discover how they can make a positive impact on your journey towards better mental health.</p>
   
</main>
    </>
  )
}

export default HeroSection