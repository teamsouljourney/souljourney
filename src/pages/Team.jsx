import HeroSection from "../components/team/HeroSection";
import Join from "../components/team/Join";
// import TabSwitch from "../components/team/TabSwitch";
import TeamTabSwitch from "../components/team/TeamTabSwitch";

const Team = () => {
  return (
    <div className=" bg-offWhite min-h-screen ">
      <HeroSection />
      <TeamTabSwitch/>
      <Join/>
    </div>
  );
};

export default Team;
