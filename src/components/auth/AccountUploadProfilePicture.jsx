import { useSelector } from "react-redux";
import avatar from "../../assets/avatar3.svg";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useUserCall from "../../hooks/useUserCall";
import useTherapistCall from "../../hooks/useTherapistCall";

const AccountUploadProfilePicture = ({ singleUser, singleTherapist }) => {
  const { t } = useTranslation();
  const { uploadProfilePicture } = useUserCall();
  const { uploadProfilePictureTherapist } = useTherapistCall();

  const { currentUser } = useSelector((state) => state.auth);
  const [isUploading, setIsUploading] = useState(false);

  const { isTherapist } = currentUser;

  const id = isTherapist ? singleTherapist?._id : singleUser?._id;

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    if (isTherapist) {
      await uploadProfilePictureTherapist(id, file);
    } else {
      await uploadProfilePicture(id, file);
    }

    setIsUploading(false);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return avatar;

    const cleanPath = imagePath.startsWith("/")
      ? imagePath.substring(1)
      : imagePath;

    const baseUrl = import.meta.env.VITE_BASE_URL || "";
    const baseUrlWithSlash = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

    return `${baseUrlWithSlash}${cleanPath}`;
  };

  return (
    <>
      <div className="flex flex-col items-start w-full gap-4">
        <span className="text-2xl font-medium">
          {isTherapist ? (
            <i>
              {singleTherapist?.firstName} {singleTherapist?.lastName}
            </i>
          ) : (
            <i>
              {singleUser?.firstName} {singleUser?.lastName}
            </i>
          )}
        </span>
        <div className="flex items-center gap-4">
          <img
            className="object-cover w-16 h-16 rounded-full border-3 border-navy dark:border-offWhite"
            src={
              isTherapist
                ? getImageUrl(singleTherapist?.image)
                : getImageUrl(singleUser?.image)
            }
            alt="Profile"
          />
          {/* Upload Profile Image Section */}
          <div className="flex flex-col items-start gap-2">
            <label className="account-btn" htmlFor="profile-image-upload">
              {isUploading ? t("uploading") : t("upload")}
            </label>
            <input
              type="file"
              id="profile-image-upload"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
            <span>
              {t("uploadInfo")}
              {/* For best results, upload an image 512x512 or larger. */}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountUploadProfilePicture;
