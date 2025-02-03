import { NavLink } from "react-router-dom";
import foto from "../../assets/images/pexels-yankrukov-6818303.jpg";

const InfoSection = () => {
  return (
    <div className="text-center mt-16 h-full overflow-y-hidden bg-no-repeat bg-cover">
      <div className="xl:w-[70%] lg:w-[80%] md:w-[90%] mx-auto relative md:px-0 px-4 md:my-10 bg-gradient-to-l from-offWhite to-seaGreen-light rounded-xl overflow-hidden">
        <div className="w-full h-full flex flex-col items-center">
          <section className="w-full relative flex items-center flex-col lg:flex-row">
            <img className="lg:w-1/2 " src={foto} alt="port image" />
            <div className="lg:absolute lg:left-[40%] md:left-[30%] lg:w-[55%] lg:p-12 sm:p-6 p-4 flex flex-col justify-center bg-offWhite dark:bg-customBlack-dark">
              <h2 className="text-customBlack-light dark:text-offWhite-light md:text-3xl text-2xl font-bold mb-2">
                Soul Journey
              </h2>
              <p className="text-customBlack dark:text-offWhite-light text-sm md:text-xs xl:text-sm mb-6 ">
                At Soul Journey, we offer online counseling that supports your
                path to healing and personal growth. Our professional therapists
                provide a safe, confidential space for you to explore your
                emotions, find clarity, and overcome life challenges—all from
                the comfort of your home. Why Soul Journey? Flexible Sessions:
                Access therapy anytime, anywhere. Personalized Support: Tailored
                guidance for your unique journey. Confidential & Safe: Your
                privacy is our priority. Start your journey today—healing begins
                within.
              </p>
              <div>
                <button className="md:px-6 px-4 py-2 text-customBlack-light font-semibold bg-gradient-to-l from-offWhite to-seaGreen-light rounded-full hover:shadow-lg hover:shadow-offWhite-dark transform trasition delay-100">
                  <NavLink to="/register">Now Free Register</NavLink>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
