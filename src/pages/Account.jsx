// import { Box, Container, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { Formik } from "formik";
// import { SignupSchema } from "../components/auth/RegisterForm";
// import {
//   authMainContainerGridStyle,
//   authFormContainerGridStyle,
// } from "../styles/globalStyle";
// import AccountForm from "../components/auth/AccountForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AccountForm from "../components/auth/AccountForm";
import AccountChangePasswordForm from "../components/auth/AccountChangePasswordForm";
import avatar from "../assets/avatar.png"
import AccountDelete from "../components/auth/AccountDelete";

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
                  Upload
                </button>
                <span>
                  For best results, upload an image 512x512 or larger.
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-center gap-4">
            {/* Personel Info Field */}

            <AccountForm
              userInfo={userInfo}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      

      {/* Change Password Field */}

      <AccountChangePasswordForm/>

      {/* Delete Account Field */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-12">
        <span className="text-lg font-medium">Danger zone/Delete Account</span>
        {/* Delete Account Alert */}

        <AccountDelete/>

      </div>
    </div>
  );
};

export default Account;
