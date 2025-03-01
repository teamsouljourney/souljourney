
import PricingHeader from "../components/pricing/PricingHeader";
import PricingForm from "../components/pricing/PricingForm";


const Pricing = () => {
    return (
      <div className="min-h-screen bg-offWhite dark:bg-background-dark text-navy dark:text-offWhite-dark px-16 py-32">
      <div className="dark:bg-background-darker">
        <PricingHeader />
        <PricingForm />
      </div>
        
      </div>
    )
  }

  export default Pricing