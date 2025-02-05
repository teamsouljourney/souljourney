import Card from "../../components/Card";

const TeamCard = ({ teams }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-14">
      {teams?.slice(0, 4).map((team) => (
        <Card key={team.id} team={team} variant="default" />
      ))}
    </div>
  );
};

export default TeamCard;
