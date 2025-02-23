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
          <div className="flex w-full flex-col items-start gap-4">
            <span className="text-2xl font-medium">
              <i>
                {userInfo.firstName} {userInfo.lastName}
              </i>
            </span>
            <div className="flex items-center gap-4">
              <img
                className="h-16 w-16 flex-none object-cover [clip-path:circle()]"
                src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
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
      {/* ------- */}
      {/* <div className="flex h-px w-full flex-none flex-col items-center bg-neutral-border" /> */}

      {/* Reset Password Field */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-4 border-b-2 border-b-gray-200 dark:border-b-gray-400">
        <span className="text-lg font-medium">{t("password")}</span>
        {/* Password input */}

        <div className="sm:col-span-4 relative">
          <label htmlFor="password" className="password-label">
            Current Password
          </label>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter current password"
              autoComplete="current-password"
              className="peer min-w-[280px]"
            />
            <div
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <img
                src={
                  showPassword ? "/assets/visible.svg" : "/assets/invisible.svg"
                }
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-4 h-4  opacity-60 hover:opacity-80 transition-opacity"
                draggable="false"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-4 relative">
          <label htmlFor="new-password" className="password-label">
            New Password
          </label>
          <div className="mt-2 relative">
            <input
              id="new-password"
              name="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              autoComplete="current-password"
              className="peer min-w-[280px]"
            />
            <div
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <img
                src={
                  showPassword ? "/assets/visible.svg" : "/assets/invisible.svg"
                }
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-4 h-4  opacity-60 hover:opacity-80 transition-opacity"
                draggable="false"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-4 relative">
          <label htmlFor="retype-password" className="password-label">
            Re-type New Password
          </label>
          <div className="mt-2 relative">
            <input
              id="retype-password"
              name="retype-password"
              type={showPassword ? "text" : "password"}
              placeholder="Re-type new password"
              autoComplete="retype-password"
              className="peer min-w-[280px]"
            />
            <div
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <img
                src={
                  showPassword ? "/assets/visible.svg" : "/assets/invisible.svg"
                }
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-4 h-4  opacity-60 hover:opacity-80 transition-opacity"
                draggable="false"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-center gap-6 mt-6">
          <button type="button" className="account-btn mb-4 w-1/2">
            Change Password
          </button>
        </div>
      </div>

      {/* ------- */}
      {/* <div className="flex h-px w-full flex-none flex-col items-center bg-neutral-border " /> */}

      {/* Delete Account Field */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-12">
        <span className="text-lg font-medium">Danger zone/Delete Account</span>
        {/* Delete Account Alert */}
        <div className="w-full p-4 border-2 border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30 rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-semibold text-red-700 dark:text-red-400">
                Delete account
              </h4>
              <p className="text-sm text-red-600/90 dark:text-red-300/90">
                Permanently remove your account and all of your content. This
                action is not reversible.
              </p>
            </div>
            <div className="flex justify-start">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-md hover:bg-red-200 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                onClick={() => {
                  //? Modal for delete?
                  if (
                    window.confirm(
                      "Are you sure you want to delete your account? This action cannot be undone."
                    )
                  ) {
                    //? Delete?
                    console.log("Account deletion triggered");
                  }
                }}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
