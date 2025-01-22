import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import verificationSuccess from "../assets/images/verificationSuccess.png";
import verificationFail from "../assets/images/verificationFail.png";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [statusImage, setStatusImage] = useState(verificationFail);

  const queryParams = new URLSearchParams(location.search);
  const verificationStatus = queryParams.get("status");
  const statusTypeParam = queryParams.get("statusType");

  useEffect(() => {
    const handleStatus = () => {
      setLoading(true);

      // Set statusType directly from query params
      setStatusType(statusTypeParam);

      switch (verificationStatus) {
        case "missing-token":
          setStatusMessage("Token is missing! Please check the link.");
          setStatusImage(verificationFail);
          break;
        case "invalid-token":
          setStatusMessage("Invalid token! Please check the link.");
          setStatusImage(verificationFail);
          break;
        case "user-not-found":
          setStatusMessage("User not found! Please check the link.");
          setStatusImage(verificationFail);
          break;
        case "already-verified":
          setStatusMessage("Your email is already verified.");
          setStatusImage(verificationFail);
          break;
        case "success":
          setStatusMessage("Email successfully verified! Redirecting...");
          setStatusImage(verificationSuccess);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
          break;
        default:
          setStatusMessage("Verifying your email... Please wait.");
          setStatusType("");
          setStatusImage(verificationFail);
          break;
      }

      setLoading(false);
    };

    handleStatus();
  }, [verificationStatus, statusTypeParam, navigate]);

  return (
    <div className="flex flex-col items-center max-w-xl gap-6 px-4 mx-auto">
      {/* Image */}
      <div
        className="w-full bg-center bg-no-repeat bg-contain h-96"
        style={{
          backgroundImage: `url(${statusImage})`,
        }}
      ></div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Email Verification
      </h1>

      {/* statusMessage */}
      {statusMessage && (
        <div
          className={`text-center text-offWhite text-sm font-semibold px-4 py-2 rounded-lg ${
            statusType === "success" ? "bg-seaGreen" : "bg-mauve"
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* Only show this paragraph if status is not 'success' */}
      {verificationStatus !== "success" && (
        <p className="text-sm text-center text-customBlack-light">
          If you didn&apos;t sign up for this account, please ignore this email.
        </p>
      )}

      {/* Progress Feedback or Buttons */}
      {loading ? (
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : verificationStatus !== "success" ? (
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm font-medium text-white transition duration-300 rounded-lg bg-mauve hover:bg-mauve-dark"
          >
            Go to Login Page
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm font-medium transition duration-300 border rounded-lg text-mauve border-mauve"
          >
            Back to Home
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default VerifyEmail;
