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
    <div className="container max-w-none flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch bg-offWhite-light px-4 py-8 shadow-sm text-navy-dark">

      {/* Update Profile Section */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-10 border-b-2">
        {/* Header */}
        <div className="flex w-full flex-col items-start gap-2 font-semibold">
          <span className="text-3xl">
            {t("account")}
          </span>
          <span>
            Update your profile and personal details here
          </span>
        </div>
        {/* Profile Section */}
        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-lg font-medium">
            {t("profile")}
          </span>
          <div className="flex w-full flex-col items-start gap-4">
            <span>
              John Doe
            </span>
            <div className="flex items-center gap-4">
              <img
                className="h-16 w-16 flex-none object-cover [clip-path:circle()]"
                src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
              />
              {/* Upload Profile Image Section */}
              <div className="flex flex-col items-start gap-2">
                <button
                  type="button"
                  class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 hover:shadow-lg"
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
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="firstName" class="block text-sm/6 font-medium">
                  {t("firstName")}
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter your name"
                    autocomplete="given-name"
                    class="block w-full rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navy-light/60 sm:text-sm/6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="lastName" class="block text-sm/6 font-medium">
                {t("lastName")}
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter your last name"
                    autocomplete="family-name"
                    class="block w-full rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navy-light/60 sm:text-sm/6"
                  />
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="email" class="block text-sm/6 font-medium">
                  {t("email")}
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email..."
                    autocomplete="email"
                    class="block w-full rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navy-light/60 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* Contact Info Field */}
              <div class="sm:col-span-4">
                <label for="phone" class="block text-sm/6 font-medium">
                  {t("phone")}
                </label>
                <div class="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    placeholder="Enter your phone"
                    autocomplete="phone"
                    class="block w-full rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navy-light/60 sm:text-sm/6"
                  />
                </div>
              </div>
              <div class="col-span-full">
                <label for="profession" class="block text-sm/6 font-medium">
                  {t("profession")}
                </label>
                <div class="mt-2">
                  <input
                    id="profession"
                    name="profession"
                    type="text"
                    placeholder="Enter your profession (Student, Teacher.. ext.)"
                    autocomplete="profession"
                    class="block w-full rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navy-light/600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div class="col-span-full">
                <label for="address" class="block text-sm/6 font-medium">
                  {t("address")}
                </label>
                <div class="mt-2">
                  <textarea
                    type="address"
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                    autocomplete="address"
                    class="block w-full rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-navy-light/60 sm:text-sm/6 mb-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      {/* ------- */}
      {/* <div className="flex h-px w-full flex-none flex-col items-center bg-neutral-border" /> */}

      {/* Reset Password Field */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-4 border-b-2">
        <span className="text-lg font-medium">
          Password
        </span>
        {/* Password input */}
        <div className="sm:col-span-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium"
          >
            Current Password
          </label>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter current password"
              autoComplete="current-password"
              className="block w-full min-w-[280px] rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navy-light/60 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700"
            >
              <img
                src={
                  showPassword
                    ? "/assets/visible1.svg"
                    : "/assets/invisible1.svg"
                }
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-4 h-4  opacity-60 hover:opacity-80 transition-opacity"
                draggable="false"
              />
            </button>
          </div>
        </div>

        <div className="sm:col-span-4 relative">
          <label
            htmlFor="new-password"
            className="block text-sm font-medium"
          >
            New Password
          </label>
          <div className="mt-2 relative">
            <input
              id="new-password"
              name="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              autoComplete="current-password"
              className="block w-full min-w-[280px] rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navy-light/60 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700"
            >
              <img
                src={
                  showPassword
                    ? "/assets/visible1.svg"
                    : "/assets/invisible1.svg"
                }
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-4 h-4  opacity-60 hover:opacity-80 transition-opacity"
                draggable="false"
              />
            </button>
          </div>
        </div>

        <div className="sm:col-span-4 relative">
          <label
            htmlFor="retype-password"
            className="block text-sm font-medium"
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
              className="block w-full min-w-[280px] rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navy-light/60 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700"
            >
              <img
                src={
                  showPassword
                    ? "/assets/visible1.svg"
                    : "/assets/invisible1.svg"
                }
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-4 h-4  opacity-60 hover:opacity-80 transition-opacity"
                draggable="false"
              />
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-center gap-6">
          {/* <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
          Change password
        </Button> */}
        </div>
      </div>

      {/* ------- */}
      {/* <div className="flex h-px w-full flex-none flex-col items-center bg-neutral-border " /> */}

      {/* Delete Account Field */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-12">
        <span className="text-lg font-medium">
          Danger zone/Delete Account
        </span>
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
