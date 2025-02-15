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

const Account = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
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
            <span className="text-2xl font-medium"><i>John Doe</i></span>
            <div className="flex items-center gap-4">
              <img
                className="h-16 w-16 flex-none object-cover [clip-path:circle()]"
                src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
              />
              {/* Upload Profile Image Section */}
              <div className="flex flex-col items-start gap-2">
                <button
                  type="button"
                  className="account-btn"
                >
                  Upload
                </button>
                <span>
                  For best results, upload an image 512x512 or larger.
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center gap-4">
            {/* Personel Info Field */}
            <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4 w-full max-w-[576px]">
              <div className="sm:col-span-2">
                <label for="firstName" className="peer">
                  {t("firstName")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter your name"
                    autocomplete="given-name"
                    className="peer w-full"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label for="lastName" className="peer">
                  {t("lastName")}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter your last name"
                    autocomplete="family-name"
                    className="peer w-full"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label for="email" className="peer">
                  {t("email")}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autocomplete="email"
                    className="peer w-full"
                  />
                </div>
              </div>

              {/* Contact Info Field */}
              <div className="sm:col-span-4">
                <label for="phone" className="peer">
                  {t("phone")}
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    placeholder="Enter your phone"
                    autocomplete="phone"
                    className="peer w-full"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label for="profession" className="peer">
                  {t("profession")}
                </label>
                <div className="mt-2">
                  <input
                    id="profession"
                    name="profession"
                    type="text"
                    placeholder="Enter your profession (Student, Teacher.. ext.)"
                    autocomplete="profession"
                    className="peer w-full"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label for="address" className="peer">
                  {t("address")}
                </label>
                <div className="mt-2">
                  <textarea
                    type="address"
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                    autocomplete="address"
                    className="textarea-style"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start justify-center gap-6 mt-6">
            <button
              type="button"
              className="account-btn mb-4 w-1/2"
            >
              Update Profile
            </button>
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
          <label
            htmlFor="retype-password"
            className="password-label"
          >
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
          <button
            type="button"
            className="account-btn mb-4 w-1/2"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* ------- */}
      {/* <div className="flex h-px w-full flex-none flex-col items-center bg-neutral-border " /> */}

      {/* Delete Account Field */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-12">
        <span className="text-lg font-medium">Danger zone/Delete Account</span>
        {/* <Alert
        variant="error"
        icon={null}
        title="Delete account"
        description="Permanently remove your account. This action is not reversible."
        actions={
          <Button
            variant="destructive-secondary"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Delete account
          </Button>
        }
      /> */}
      </div>
    </div>
  );
};

export default Account;
