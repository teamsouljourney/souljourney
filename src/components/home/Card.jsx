// import blogs from "../../helper/blogs.json"
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// const Card = ({teams}) => {
//   // console.log(blogs);

//   return (
//     <div className="flex flex-wrap justify-center gap-4">
//       {teams?.slice(0,4).map((team) => (
//           <div
//             key={team.id}
//             className=" w-80 p-4 bg-offWhite bg-opacity-80 rounded-2xl shadow-lg  mr-8 "
//           >
//             <img
//               src={team.image}
//               alt="Project Cover"
//               className="w-full h-[400px] object-cover rounded-t-2xl transition-all duration-500 ease-in-out hover:scale-95 hover:brightness-110 hover:contrast-110"
//             />
//             <div className=" flex flex-col items-center gap-3 mt-4 justify-center ">
//               <h2 className="text-2xl font-bold text-navy-light text-shadow-lg animate__animated animate__fadeInDown font-urbanist">
//                 {team.name}
//               </h2>
//               <p className="text-customBlack btext-sm  animate__animated animate__fadeIn font-urbanist">
//                 {team.area} {/*doktor ismi gelmesi lazim simdilik böyle ekledim.*/}
//               </p>

//               {/* Tags Section */}
//               <div className="flex gap-3 mb-6 animate__animated animate__fadeIn">
//                 <span className="px-4 py-2  opacity-4 rounded-full text-sm text-black font-urbanist flex items-center">
//                  <FavoriteBorderIcon/>

//                 </span>
//               </div>

//
//               <NavLink
//                 to="blogs"
//                 className="inline-block px-6 py-3 bg-gradient-to-r from-offWhite to-seaGreen-light text-black text-lg font-bold rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-seaGreen hover:shadow-xl relative overflow-hidden group"
//               >
//                See More

//               </NavLink>
//             </div>
//           </div>
//         ))}
//     </div>
//   )
// }

// export default Card

const Card = ({ teams }) => {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 ">
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-10 rounded-lg ">
        {teams?.slice(0, 4).map((team) => (
          <div
            key={team.id}
            className="max-w-xs lg:border-t bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal rounded-lg"
          >
            <img
              src={team.image}
              className="w-full h-48 object-cover mb-3 rounded-t-lg"
            />
            <div className="p-4 pt-2">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  ></svg>
                  {team.name}
                </p>
                <a
                  href="#"
                  className="text-gray-900 font-bold text-lg mb-2 hover:text-navy inline-block"
                >
                  {team.area}
                </a>
                <p className="text-gray-700 text-sm">{team.description}</p>
              </div>
              <div className="flex items-center">
                <span className="px-4 py-2  opacity-4 rounded-full text-sm text-black font-urbanist flex items-center">
                  <FavoriteBorderIcon />
                </span>
                <div className="text-sm">
                  <a
                    href="#"
                    className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
                  >
                    {team.name}
                  </a>
                  <p className="text-gray-600">Aug 18</p>
                </div>
                <NavLink
                  to="blogs"
                  className="inline-block w-full sm:w-auto px-2 py-2 sm:px-3 sm:py-2 bg-gradient-to-r from-offWhite to-navy-light text-black text-base font-urbanist sm:text-lg font-bold rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-navy hover:shadow-xl"
                >
                  See More
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
