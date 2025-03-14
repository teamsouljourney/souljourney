import ServicesHeroSection from "../components/ServicesPage/ServicesHeroSection"
import ServicesDetail from "../components/ServicesPage/ServicesDetail"
// import ServicesRow from "../components/ServicesPage/ServicesRow"

const Services = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-offWhite dark:bg-background-dark text-navy dark:text-offWhite-dark">
      {/* Services Hero Section: %20 */}
      <div className="w-full h-1/5">
        <ServicesHeroSection />
      </div>

      {/* Services Details: %60 */}
      <div className="w-full max-w-screen-2xl flex justify-center h-3/5">
        <ServicesDetail />
      </div>

      {/* Services Row: %20 */}
      <div className="w-full h-1/5">
        {/* <ServicesRow /> */}
      </div>
    </div>
  )
}

export default Services