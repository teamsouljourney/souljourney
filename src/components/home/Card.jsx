// import blogs from "../../helper/blogs.json"
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Card = ({teams}) => {
  // console.log(blogs);
  
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {teams?.slice(0,4).map((team) => (
          <div
            key={team.id}
            className=" w-80 p-4 bg-offWhite bg-opacity-80 rounded-2xl shadow-lg  mr-8 "
          >
            <img
              src={team.image}
              alt="Project Cover"
              className="w-full h-[400px] object-cover rounded-t-2xl transition-all duration-500 ease-in-out hover:scale-95 hover:brightness-110 hover:contrast-110"
            />
            <div className=" flex flex-col items-center gap-3 mt-4 justify-center ">
              <h2 className="text-2xl font-bold text-navy-light text-shadow-lg animate__animated animate__fadeInDown font-urbanist">
                {team.name}
              </h2>
              <p className="text-customBlack btext-sm  animate__animated animate__fadeIn font-urbanist">
                {team.area} {/*doktor ismi gelmesi lazim simdilik böyle ekledim.*/}
              </p>

              {/* Tags Section */}
              <div className="flex gap-3 mb-6 animate__animated animate__fadeIn">
                <span className="px-4 py-2  opacity-4 rounded-full text-sm text-black font-urbanist flex items-center">
                 <FavoriteBorderIcon/>
                
                </span>
              </div>

              {/* GitHub Link */}
              <NavLink
                to="blogs"
                className="inline-block px-6 py-3 bg-gradient-to-r from-offWhite to-seaGreen-light text-black text-lg font-bold rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-seaGreen hover:shadow-xl relative overflow-hidden group"
              >
               See More
                
              </NavLink>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Card