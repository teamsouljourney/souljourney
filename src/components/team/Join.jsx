import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Join = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full py-16 px-4 sm:px-8 bg-gradient-to-r from-seaGreen/10 to-navy/10 dark:from-seaGreen-dark/20 dark:to-navy-dark/20">
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl bg-white dark:bg-background-dark shadow-xl p-8 sm:p-10 transform transition-all duration-300 hover:shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-seaGreen/10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 bg-navy/10 rounded-full"></div>

        <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
          {/* Icon/Image Section */}
          <div className="flex-shrink-0 hidden sm:block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-seaGreen to-navy flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>

          <div className="flex-grow text-center sm:text-left">
            <h2 className="font-urbanist text-2xl sm:text-3xl font-bold mb-4 text-navy dark:text-offWhite-dark">
              🚀 Join Our Team – Make a Difference!
            </h2>
            <p className="text-base sm:text-lg mb-6 text-navy/80 dark:text-offWhite-dark/80 max-w-2xl">
              Are you passionate about helping others and making a real impact?
              Join our dynamic and supportive team, where your skills and
              dedication contribute to creating positive change.
            </p>
            <p className="text-base sm:text-lg mb-6 text-navy/80 dark:text-offWhite-dark/80 max-w-2xl text-left">
              ✨ <strong>Why Join Us?</strong>
              <br />✔ Work with a passionate and professional team
              <br />✔ Make a real difference in people's lives
              <br />✔ Grow and thrive in a supportive environment
            </p>
            <p className="text-base sm:text-lg mb-6 text-navy/80 dark:text-offWhite-dark/80 max-w-2xl">
              🔹{" "}
              <strong>
                Your journey starts here! Apply now and be part of something
                bigger.
              </strong>
            </p>
            <NavLink
              to="/contact"
              className="group inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-seaGreen-dark to-navy transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base font-semibold"
            >
              Apply Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
