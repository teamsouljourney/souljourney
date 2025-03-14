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
              <span
                style={{
                  maskImage: `url(/assets/jointeam.svg)`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  width: "45px",
                  height: "45px",
                }}
                className="inline-flex justify-center items-center mx-3.5 bg-white"
              ></span>
            </div>
          </div>

          <div className="flex-grow text-center sm:text-left">
            <h2 className="font-urbanist text-2xl md:text-3xl font-bold mb-4 text-navy dark:text-offWhite-dark">
              {t('joinOurTeamTitle')}
            </h2>
            <p className="text-base md:text-lg mb-6 text-navy/80 dark:text-offWhite-dark/80 max-w-2xl">
              {t('joinOurTeamDescription')}

            </p>
            <p className="text-base md:text-lg mb-6 text-navy/80 dark:text-offWhite-dark/80 max-w-2xl text-left">
              ✨ <strong>        {t('whyJoinUsTitle')}
              </strong>
              <br />{t('whyJoinUsList.0')}
              <br />{t('whyJoinUsList.1')}
              <br />{t('whyJoinUsList.2')}
            </p>
            <p className="text-base md:text-lg mb-6 text-navy/80 dark:text-offWhite-dark/80 max-w-2xl">
              🔹{" "}
              <strong>
                {t('applyNowDescription')}

              </strong>
            </p>
            <NavLink
              to="/contact"
              className="group inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-seaGreen-dark to-navy transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base font-semibold"
            >
              {t('applyNowButton')}
              <span
                style={{
                  maskImage: `url(/assets/arrow-right.svg)`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  width: "30px",
                  height: "30px",
                }}
                className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300 bg-white"
              ></span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
