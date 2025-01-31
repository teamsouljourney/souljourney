import HeroSection from "../components/team/HeroSection";
import Join from "../components/team/Join";
import TabSwitch from "../components/team/TabSwitch";

const Team = () => {
  return (
    <div className=" bg-offWhite min-h-screen ">
      <HeroSection />
      <TabSwitch />
      <Join/>
    </div>
  );
};

export default Team;
