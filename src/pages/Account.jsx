import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AccountForm from "../components/auth/AccountForm";
import AccountChangePasswordForm from "../components/auth/AccountChangePasswordForm";
import AccountDelete from "../components/auth/AccountDelete";
import AccountUploadProfilePicture from "../components/auth/AccountUploadProfilePicture";

const Account = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);

  const [userInfo, setUserInfo] = useState(currentUser);
  console.log(userInfo);

  const handleChange = (e) => {
    // console.log(e.target.value);
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
  };

  return (
    <div className="container max-w-none flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch bg-offWhite-light pl-4 pr-6 py-8 shadow-sm text-navy-dark dark:text-offWhite-light dark:bg-background-darker mt">
      {/* Update Profile Section */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-10 border-b-2 border-b-gray-200 dark:border-b-gray-400 mt-10">
        {/* Header */}
        <div className="flex w-full flex-col items-start gap-2 font-semibold">
          <span className="text-5xl">{t("account")}</span>
          <span>Update your profile and personal details here</span>
        </div>
        {/* Profile Section */}
        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-3xl font-semibold mb-4">{t("profile")}</span>
          {/* Profile Picture Section */}
          <AccountUploadProfilePicture userInfo={userInfo} />
          {/* Personel Info Field */}
          <AccountForm
            userInfo={userInfo}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      {/* Change Password Field */}
      <AccountChangePasswordForm />
      {/* Account Delete Field */}
      <AccountDelete />
    </div>
  );
};

export default Account;
