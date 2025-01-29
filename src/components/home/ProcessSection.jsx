import Foto1 from "../../assets/images/pexels-liza-summer-6347901.jpg";
import Foto2 from "../../assets/images/pexels-yankrukov-4458421.jpg";
import Foto3 from "../../assets/images/pexels-karolina-grabowska-4467687.jpg";
import Foto4 from "../../assets/images/pexels-cottonbro-4065876.jpg";

const ProcessSection = () => {
  return (
    <>
      <div className=" mx-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-between mb-10 ">
        <div className="text-center mt-10">
          <h3 className="text-3xl sm:text-5xl leading-normal font-extrabold tracking-tight text-gray-900">
            How it <span className="text-seaGreen">Works?</span>
          </h3>
        </div>

        <div className="mt-20">
          <ul className="md:grid md:grid-cols-4 md:col-gap-10 md:row-gap-10">
            <li className=" bg-offWhite p-5 pb-10 text-center">
              <div className="flex flex-col items-center">
                <div className=" flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-30 md:h-34 md:w-34 rounded-full bg-gradient-to-r from-offWhite to-seaGreen-light text-customBlack border-4 border-white text-xl font-semibold transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer mt-4">
                    Register or Login
                  </div>
                  <img
                    src={Foto1}
                    alt=""
                    className="w-full h-64  object-cover mt-4 rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  
                  <p className="mt-2 text-base leading-6 text-gray-500 mb-6">
                    Register or Login - Create an account or log in to your
                    existing account to get started.
                  </p>
                </div>
              </div>
            </li>
            <li className=" bg-offWhite p-5 pb-10 text-center">
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div
                    className="flex items-center justify-center h-20 w-30 md:h-34 md:w-34 rounded-full bg-gradient-to-r from-offWhite to-seaGreen-light  text-customBlack border-4 border-white text-xl font-semibold transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer mt-4"
                  >
                    Determine Your Preferences
                  </div>
                  <img
                    src={Foto2}
                    alt=""
                    className="w-full h-64 object-cover mt-4 rounded-lg"
                  />
                </div>
                <div className="mt-4">
                
                  <p className="mt-2 text-base leading-6 text-gray-500">
                    Specify your preferences regarding therapy type, session
                    frequency, and goals.
                  </p>
                </div>
              </div>
            </li>
            <li className=" bg-offWhite p-5 pb-10 text-center">
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-30 md:h-34 md:w-34 rounded-full bg-gradient-to-r from-offWhite to-seaGreen-light  text-customBlack border-4 border-white text-xl font-semibold transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer mt-4">
                    Choose Your Therapist
                  </div>
                  <img
                    src={Foto3}
                    alt=""
                    className="w-full h-64 object-cover mt-4 rounded-lg"
                  />
                </div>
                <div className="mt-4">
                 
                  <p className="mt-2 text-base leading-6 text-gray-500 mt">
                    Browse through a list of qualified therapists and select the
                    one that best fits your needs.
                  </p>
                </div>
              </div>
            </li>
            <li className=" bg-offWhite p-5 pb-10 text-center">
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-30 md:h-34 md:w-34 rounded-full bg-gradient-to-r from-offWhite to-seaGreen-light  text-customBlack border-4 border-white text-xl font-semibold transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer mt-4">
                    Join the Session
                  </div>
                  <img
                    src={Foto4}
                    alt=""
                    className="w-full h-64 object-cover mt-4 rounded-lg"
                  />
                </div>
                <div className="mt-4">
              
                  <p className="mt-2 text-base leading-6 text-gray-500">
                    Start your therapy session at the scheduled time through a
                    secure video call or chat platform.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProcessSection;
