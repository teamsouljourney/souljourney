import React from "react";
import CookieConsent, { getCookieConsentValue, resetCookieConsentValue } from "react-cookie-consent";

const CookieConsentComponent = () => {
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
      buttonStyle={{ background: "#4CAF50", color: "#fff", fontSize: "14px" }}
      declineButtonStyle={{ background: "#f44336", color: "#fff", fontSize: "14px" }}
    >
      🍪 Our website uses cookies to improve your experience. You can accept or decline to continue.
    </CookieConsent>
  );
};

export default CookieConsentComponent;
