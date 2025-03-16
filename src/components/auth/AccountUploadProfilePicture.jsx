import avatar from "../../assets/avatar3.svg";
import { useTranslation } from "react-i18next";

const AccountUploadProfilePicture = ({ singleUser }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex w-full flex-col items-start gap-4">
        <span className="text-2xl font-medium">
          <i>
            {singleUser?.firstName} {singleUser?.lastName}
          </i>
        </span>
        <div className="flex items-center gap-4">
          <img
            className="h-16 w-16 rounded-full border-3 border-navy dark:border-offWhite  object-cover "
            src={singleUser?.image || avatar}
          />
          {/* Upload Profile Image Section */}
          <div className="flex flex-col items-start gap-2">
            <button type="button" className="account-btn">
              {t("upload")} {/* Upload */}
            </button>
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
