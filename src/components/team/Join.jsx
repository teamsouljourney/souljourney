import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";


 
const Join = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10 px-4 sm:px-8 bg-offWhite dark:bg-background-dark text-navy dark:text-offWhite-dark py-12">
      <div className="flex flex-col justify-center items-center sm:items-start sm:w-1/2">
      <h1 className="font-urbanist text-xl sm:text-2xl lg:text-2xl font-bold text-navy mb-4 text-center sm:text-left">
  {t("JOIN")}
</h1>
<p className="text-base sm:text-sm md:text-base lg:text-lg text-customBlack mb-4 text-center sm:text-left">
  {t("joinOurTeam")}
</p>
<NavLink to="/contact" className="bg-navy text-offWhite px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition duration-300 hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark transform hover:scale-105 w-full sm:w-auto">
  {t("applyNow")}
</NavLink>
      </div>

      {/* <div className="bg-offWhite sm:w-1/2 p-6 rounded-lg shadow-lg">
        <h2 className="text-navy text-xl sm:text-2xl mb-4 font-semibold">Contact Us</h2>
        
        <div className="mb-3">
          <h3 className="text-sm sm:text-base text-navy font-semibold">Phone</h3>
          <p className="text-sm sm:text-base text-gray-700"> <LocalPhoneIcon/> +1 (555) 123-4567</p>
        </div>

        <div className="mb-3">
          <h3 className="text-sm sm:text-base text-navy font-semibold">Email</h3>
          <p className="text-sm sm:text-base text-gray-700"><EmailIcon/> team.souljourney@gmail.com </p>
        </div>

        <div className="mb-3">
          <h3 className="text-sm sm:text-base text-navy font-semibold">Follow Us</h3>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" className="text-black hover:text-seaGreen transition duration-300 text-xs sm:text-sm"> <FacebookIcon/> </a>
            <a href="https://twitter.com" target="_blank" className="text-black hover:text-seaGreen transition duration-300 text-xs sm:text-sm"> <XIcon/> </a>
            <a href="https://instagram.com" target="_blank" className="text-black hover:text-seaGreen transition duration-300 text-xs sm:text-sm"> <InstagramIcon/> </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Join;
