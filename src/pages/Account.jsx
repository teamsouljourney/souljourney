import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import { SignupSchema } from "../components/auth/RegisterForm";
import {
  authMainContainerGridStyle,
  authFormContainerGridStyle,
} from "../styles/globalStyle";
import AccountForm from "../components/auth/AccountForm";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation();
  return (
    <div className="container max-w-none flex grow shrink-0 basis-0 flex-col items-center gap-1 self-stretch bg-offWhite-light py-8 shadow-sm">

      {/* Profile */}

      <div className="flex w-full max-w-[576px] flex-col items-start gap-6 border-b-2">
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
                {/* <Button
              variant="neutral-secondary"
              icon="FeatherUpload"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Upload
                </Button> */}
                <span className="text-caption font-caption text-subtext-color">
                  For best results, upload an image 512x512 or larger.
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center gap-4">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label
                  for="firstName"
                  class="block text-sm/6 font-medium text-gray-900"
                >
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
                <label
                  for="lastName"
                  class="block text-sm/6 font-medium text-gray-900"
                >
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
                <label
                  for="email"
                  class="block text-sm/6 font-medium text-gray-900"
                >
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
                <label
                  for="phone"
                  class="block text-sm/6 font-medium text-gray-900"
                >
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
                <label
                  for="profession"
                  class="block text-sm/6 font-medium text-gray-900"
                >
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
                <label
                  for="address"
                  class="block text-sm/6 font-medium text-gray-900"
                >
                  Address
                </label>
                <div class="mt-2">
                  <textarea
                    type="address"
                    name="address"
                    id="address"
                    placeholder="Write your address..."
                    autocomplete="address"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* <div class="col-span-full">
                <label
                  for="about"
                  class="block text-sm/6 font-medium text-gray-900"
                >
                  About/feedback
                </label>
                <div class="mt-2">
                  <textarea
                    name="about"
                    id="about"
                    rows="3"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  ></textarea>
                </div>
                <p class="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div> */}

            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-4">
          {/* <TextField
          className="h-auto grow shrink-0 basis-0"
          label="Email"
          helpText=""
        >
          <TextField.Input
            placeholder="josef@subframe.com"
            value=""
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
          />
          </TextField> */}
        </div>
      </div>
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />

      {/* Password */}
      
      <div className="flex w-full max-w-[576px] flex-col items-start gap-4 border-b-2">
        <span className="text-heading-3 font-heading-3 text-default-font text-lg">
          Password
        </span>

        <div class="sm:col-span-4 ">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">
            Current Password
          </label>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Write your current password..."
              autocomplete="password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div class="sm:col-span-4 ">
          <label for="new-password" class="block text-sm/6 font-medium text-gray-900">
            New Password
          </label>
          <div class="mt-2">
            <input
              id="new-password"
              name="new-password"
              type="password"
              placeholder="Write your new password..."
              autocomplete="password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div class="sm:col-span-4 ">
          <label for="retype-password" class="block text-sm/6 font-medium text-gray-900">
            New Password
          </label>
          <div class="mt-2">
            <input
              id="retype-password"
              name="retype-password"
              type="password"
              placeholder="Re-write your new password..."
              autocomplete="password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* <TextField
        className="h-auto w-full flex-none"
        label="Current password"
        helpText=""
      >
        <TextField.Input
          type="password"
          placeholder="Enter current password"
          value=""
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
        />
      </TextField>
      <TextField
        className="h-auto w-full flex-none"
        label="New password"
        helpText="Your password must have at least 8 characters, include one uppercase letter, and one number."
      >
        <TextField.Input
          type="password"
          placeholder="Enter new password"
          value=""
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
        />
      </TextField>
      <TextField className="h-auto w-full flex-none" label="" helpText="">
        <TextField.Input
          type="password"
          placeholder="Re-type new password"
          value=""
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
        />
      </TextField> */}
        <div className="flex w-full flex-col items-start justify-center gap-6">
          {/* <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
          Change password
        </Button> */}
        </div>
      </div>

      {/* ------- */}
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border " />

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
