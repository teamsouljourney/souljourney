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
    <div className="container max-w-none flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch bg-offWhite-light py-8 shadow-sm text-navy-dark">
      {/* Profile */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-10 border-b-2">
        <div className="flex w-full flex-col items-start gap-1">
          <span className="w-full text-heading-2 font-heading-2 text-default-font text-2xl">
            Account
          </span>
          <span className="w-full text-body font-body text-subtext-color">
            Update your profile and personal details here
          </span>
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-heading-3 font-heading-3 text-default-font text-lg">
            Profile
          </span>
          <div className="flex w-full flex-col items-start gap-4">
            <span className="text-body-bold font-body-bold text-default-font">
              John Doe
            </span>
            <div className="flex items-center gap-4">
              <img
                className="h-16 w-16 flex-none object-cover [clip-path:circle()]"
                src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
              />
              <div className="flex flex-col items-start gap-2">
                <button
                  type="button"
                  class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  Upload
                </button>
                <span className="text-caption font-caption text-subtext-color">
                  For best results, upload an image 512x512 or larger.
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center gap-4">
            {/* Input Field */}
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="firstName" class="block text-sm/6 font-medium">
                  First name
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Write your first name..."
                    autocomplete="given-name"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navy-dark sm:text-sm/6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="lastName" class="block text-sm/6 font-medium">
                  Last name
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Write your last name..."
                    autocomplete="family-name"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-navy-light sm:text-sm/6"
                  />
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="email" class="block text-sm/6 font-medium">
                  Email
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Write your email..."
                    autocomplete="email"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* Personel Info */}
              <div class="sm:col-span-4">
                <label for="phone" class="block text-sm/6 font-medium">
                  Phone
                </label>
                <div class="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    placeholder="Write your phone..."
                    autocomplete="phone"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div class="col-span-full">
                <label for="profession" class="block text-sm/6 font-medium">
                  Profession
                </label>
                <div class="mt-2">
                  <input
                    id="profession"
                    name="profession"
                    type="text"
                    placeholder="Write your profession... (Student, Teacher.. ext.)"
                    autocomplete="profession"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div class="col-span-full">
                <label for="address" class="block text-sm/6 font-medium">
                  Address
                </label>
                <div class="mt-2">
                  <textarea
                    type="address"
                    name="address"
                    id="address"
                    placeholder="Write your address..."
                    autocomplete="address"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className="flex h-px w-full flex-none flex-col items-center bg-neutral-border" />

      {/* Password */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-4 border-b-2">
        <span className="text-heading-3 font-heading-3 text-default-font text-lg">
          Password
        </span>

        <div className="sm:col-span-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900"
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
              className="block w-full min-w-[280px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
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
                className="w-4 h-4  opacity-60 hover:opacity-100 transition-opacity"
              />
            </button>
          </div>
        </div>

        <div className="sm:col-span-4 relative">
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-900"
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
              className="block w-full min-w-[280px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
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
                className="w-4 h-4  opacity-60 hover:opacity-100 transition-opacity"
              />
            </button>
          </div>
        </div>

        <div className="sm:col-span-4 relative">
          <label
            htmlFor="retype-password"
            className="block text-sm font-medium text-gray-900"
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
              className="block w-full min-w-[280px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-xs placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
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
                className="w-4 h-4  opacity-60 hover:opacity-100 transition-opacity"
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
      <div className="flex h-px w-full flex-none flex-col items-center bg-neutral-border " />

      {/* Delete Account */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-12">
        <span className="text-heading-3 font-heading-3 text-default-font text-lg">
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
