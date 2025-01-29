import ServicesHeroSection from "../components/ServicesPage/ServicesHeroSection"
import ServicesDetail from "../components/ServicesPage/ServicesDetail"
import ServicesRow from "../components/ServicesPage/ServicesRow"

const Services = () => {
  return (
    <div className="flex flex-col">
      {/* About Hero Section: %20 */}
      <div className="w-full h-1/5">
        <ServicesHeroSection />
      </div>

      {/* About Details: %60 */}
      <div className="w-full h-3/5">
        <ServicesDetail />
      </div>

      {/* About Row: %20 */}
      <div className="w-full h-1/5">
        <ServicesRow />
      </div>
    </div>
  )
}

export default Services