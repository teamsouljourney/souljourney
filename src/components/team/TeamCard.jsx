import { useSelector } from "react-redux";
import Card from "../../components/Card";

const TeamCard = () => {
  const { filteredTherapists,therapists } = useSelector((state) => state.therapists);
  console.log("filtrelenmis therapist", filteredTherapists);
  console.log("all therapists:", therapists);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-14">
      {filteredTherapists?.length >0
        ? filteredTherapists
            ?.slice(0, 4)
            .map((therapist) => (
              <Card
                key={therapist._id}
                therapist={therapist}
                variant="default"
              />
            ))
        : therapists
            ?.slice(0, 4)
            .map((therapist) => (
              <Card
                key={therapist._id}
                therapist={therapist}
                variant="default"
              />
            ))}
    </div>
  );
};

export default TeamCard;
