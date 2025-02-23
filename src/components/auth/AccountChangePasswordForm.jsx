import { useState } from "react";
import { useTranslation } from "react-i18next";

const AccountChangePasswordForm = () => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
  return (
    <>
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
    </>
  )
}

export default AccountChangePasswordForm