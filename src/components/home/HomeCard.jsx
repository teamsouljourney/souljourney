import Card from "../../components/Card";

const HomeCard = ({ teams }) => {
  return (

    <div className="flex flex-wrap justify-center items-center w-full gap-10 p-4">
      {teams?.map((team) => (
        <Card key={team.id} team={team} variant="detailed" />
      ))}
    </div>
  );
};

export default HomeCard;
