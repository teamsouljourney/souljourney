 
import { Link } from "react-router-dom";
import notFound  from "../assets/images/notFound.png"
import notFoundStyles from "../styles/globalStyle.js";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div style={notFoundStyles.container}>
      <img src={notFound} alt="Not Found" width="500px" style={notFoundStyles.image} />
      <h1 style={notFoundStyles.heading}>  {t("pageNotFound")}</h1>
      <p style={notFoundStyles.text}> {t("textNot")}</p>
      <Link to="/" style={notFoundStyles.link}> {t("goHome")}</Link>
    </div>
  );
};

export default NotFound;