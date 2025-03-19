import React from "react";
import CookieConsent, { getCookieConsentValue, resetCookieConsentValue } from "react-cookie-consent";
import { useTranslation } from "react-i18next";

const CookieConsentComponent = () => {
  const { t } = useTranslation();
  const handleDecline = () => {
   // Decline if someone reject.
    document.cookie.split(";").forEach((c) => {  // user-cookie-consent-true; -- I'll test 
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);  // Cookies maybe has a space, I'll test it.
    });

    resetCookieConsentValue(); // reset cookie permission/ Test / react-cookie-consent function.
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Reject"
      enableDeclineButton
      onDecline={handleDecline}
      cookieName="user-cookie-consent"
      style={{ background: "#222", color: "#fff", textAlign: "center" }}
      buttonStyle={{ background: "#459198", color: "#fff", fontSize: "14px", borderRadius: "10px" }}
      declineButtonStyle={{ background: "#9a6b96", color: "#fff", fontSize: "14px", borderRadius: "10px" }}
    >
      🍪 {t("CookieConsentComponent")} {/* Our website uses cookies to improve your experience. You can accept or decline to continue. */}
    </CookieConsent>
  );
};

export default CookieConsentComponent;
