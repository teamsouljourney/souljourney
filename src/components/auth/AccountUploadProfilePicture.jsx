import avatar from "../../assets/avatar.png"
import { useTranslation } from "react-i18next";

const AccountUploadProfilePicture = ({userInfo}) => {
    const { t } = useTranslation();
  return (
    <>
        <div className="flex w-full flex-col items-start gap-4">
                    <span className="text-2xl font-medium">
                      <i>
                        {userInfo.firstName} {userInfo.lastName}
                      </i>
                    </span>
                    <div className="flex items-center gap-4">
                      <img
                        className="h-16 w-16 rounded-full border-1 border-navy object-cover "
                        src={userInfo.image || avatar}
                      />
                      {/* Upload Profile Image Section */}
                      <div className="flex flex-col items-start gap-2">
                        <button type="button" className="account-btn">
                          Upload {/* {t("upload")} */}
                        </button>
                        <span>
                          For best results, upload an image 512x512 or larger.
                          {/* {t("")} */}
                        </span>
                      </div>
                    </div>
                  </div>
    </>
  )
}

export default AccountUploadProfilePicture