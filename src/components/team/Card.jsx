// import teams from "../../helper/team.json"

const Card = ({teamsFilter,teams}) => {
  console.log(teams);
  
  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen gap-10 w-full p-4 ">
    {teams?.map((team)=>(
      <div key={team.id} className="flex flex-wrap justify-center items-center ">
  <div
    className="max-w-xs w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer">
    <div className="relative">
      <img className="w-full h-64 object-cover" src={team.image}/>
     
    </div>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{team.name}</h2>
      <p className="text-gray-600 mb-4">{team.description}.</p>
    
      <div className="flex justify-between items-center">
        <span className="text-2xl font-urbanist text-gray-800">{team.area}</span>
      
      </div>
    </div>
  </div>
</div>
    ))}

    </div>
  )
}

export default Card