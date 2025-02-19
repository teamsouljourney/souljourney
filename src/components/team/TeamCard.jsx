import { useSelector } from "react-redux";
import Card from "../../components/Card";

const TeamCard = () => {
  const {filteredTherapists}=useSelector((state)=>state.therapists)
  console.log(filteredTherapists);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-14">
      {filteredTherapists?.slice(0, 4).map((therapist) => (
        <Card key={therapist._id} therapist={therapist} variant="default" />
      ))}
    </div>
  );
};

export default TeamCard;
