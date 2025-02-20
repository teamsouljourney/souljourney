import { useSelector } from "react-redux";
import Card from "../../components/Card";

const TeamCard = () => {
  const { filteredTherapists, therapists } = useSelector((state) => state.therapists);
  
  const displayedTherapists = filteredTherapists?.length > 0 ? filteredTherapists : therapists;
  const cardsToShow = displayedTherapists?.slice(0, 4) || [];

  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-14">
        {cardsToShow.map((therapist) => (
          <Card
            key={therapist._id}
            therapist={therapist}
            variant="default"
          />
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
