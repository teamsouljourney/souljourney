import { useParams, useNavigate } from "react-router-dom";
import teams from "../../helper/team.json";  // Takım verilerinizi içeren JSON dosyası

const TeamDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Yönlendirme için useNavigate kullanıyoruz
  const team = teams.find((team) => team.id === parseInt(id)); 
  
  if (!team) {
    return (
      <div className="text-center text-red-500">
        <h1>Team not found!</h1>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 bg-offWhite">
      <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto">
        <a href="#">
          {/* Takımın resmini dinamik olarak yüklüyoruz */}
          <img className="w-full" src="https://media.istockphoto.com/id/1346944001/de/foto/nahaufnahme-von-kollegen-die-ihre-h%C3%A4nde-stapeln.jpg?s=612x612&w=0&k=20&c=nz6p6DhsiCWg5H8R7UlnGmAVxpFjNMCwfuqIRI6k0-o=" alt={team.name} />
        </a>
        <div className="relative -mt-16 px-10 pt-5 pb-16 bg-white m-10">
          <a
            href="#"
            className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
          >
            {/* Takım adını dinamik olarak yüklüyoruz */}
            {team.name}
          </a>
          <p className="text-gray-500 text-sm">
            {/* Takım açıklamasını dinamik olarak yüklüyoruz */}
            {team.description}
          </p>
          <p className="mt-5 text-gray-600 text-xs">
            {/* Takım alanı bilgisi */}
            By{" "}
            <a
              href="#"
              className="text-xs text-indigo-600 transition duration-500 ease-in-out"
            >
              {team.name}
            </a>{" "}
            | in{" "}
            <a
              href="#"
              className="text-xs text-indigo-600 transition duration-500 ease-in-out"
            >
              {team.area}
            </a>
          </p>
        </div>
      </div>

      {/* Sayfanın en altında Geri Butonu */}
      <div className="text-center mt-8 p-6 pt-0">
        <button 
          onClick={() => navigate(-1)}  // Geri gitmek için -1 kullanıyoruz
          className="bg-gradient-to-r from-navy to-seaGreen text-white py-3 px-6 rounded-lg hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark text-lg"
  
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default TeamDetail;
