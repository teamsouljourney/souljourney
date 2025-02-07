import { NavLink } from "react-router-dom";
import soulJourney from "../../assets/souljourney_Logo.png";

const SoulJourneyLogo = () => {
  return (
    <div className="flex items-center">
      <NavLink to="/">
        <img
          alt="Soul Journey"
          src={soulJourney}
          className="h-[50px] min-h-[3rem] min-w-[3rem] w-auto sm:h-[50px] md:h-[80px] object-contain"
        />
      </NavLink>
    </div>
  );
};

export default SoulJourneyLogo;
