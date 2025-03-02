import HeroSection from "../components/team/HeroSection";
import Join from "../components/team/Join";
// import TabSwitch from "../components/team/TabSwitch";
import TeamTabSwitch from "../components/team/TeamTabSwitch";

const Team = () => {
  return (
    <div className="min-h-screen bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      <HeroSection />
      <TeamTabSwitch/>
      <Join/>
    </div>
  );
};

export default Team;
