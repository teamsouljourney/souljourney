import TabSwitch from "../../components/TabSwitch";
import TeamCard from "./TeamCard";

const TeamTabSwitch = () => {
  return (
    <>
      <div className="w-full h-full mt-5  mx-auto">
        <TabSwitch />
        <div className="flex flex-wrap justify-center gap-4 sm:gap-2 mt-[100px] mb-[100px]">
          <TeamCard />
        </div>
      </div>
    </>
  );
};

export default TeamTabSwitch;
