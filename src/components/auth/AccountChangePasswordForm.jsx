import { useState } from "react";
import { useTranslation } from "react-i18next";

const AccountChangePasswordForm = ({singleUser}) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    console.log(singleUser);

    const initialState = {
      currentPassword: "",
      newPassword: "",
      retypePassword: ""
    }
    const [passwordInfo, setPasswordInfo] = useState(initialState);

    console.log(passwordInfo);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setPasswordInfo({ ...passwordInfo, [name]: value });
    }
    

    const changePassword = (e) => {
      e.preventDefault()

      if (singleUser?.password !== passwordInfo?.currentPassword) {
        console.log("Your current password is wrong!");
        
      }

      if (passwordInfo.newPassword !== passwordInfo.retypePassword) {
        console.log("Please check your confirm password");
        
      }

      // singleUser.

    }

  return (
    <>
        <div className="flex w-full max-w-[576px] flex-col items-start gap-4 border-b-2 border-b-gray-200 dark:border-b-gray-400">
        <span className="text-lg font-medium">{t("password")}</span>
        {/* Password input */}

        <div className="sm:col-span-4 relative">
          <label htmlFor="currentPassword" className="password-label">
            Current Password
          </label>
          <div className="mt-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={passwordInfo.currentPassword}
              placeholder="Enter current password"
              autoComplete="current-password"
              className="peer min-w-[280px]"
              onChange={handleChange}
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
          <label htmlFor="newPassword" className="password-label">
            New Password
          </label>
          <div className="mt-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={passwordInfo.newPassword}
              placeholder="Enter new password"
              autoComplete="current-password"
              className="peer min-w-[280px]"
              onChange={handleChange}
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
          <label htmlFor="retypePassword" className="password-label">
            Re-type New Password
          </label>
          <div className="mt-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="retypePassword"
              name="retypePassword"
              value={passwordInfo.retypePassword}
              placeholder="Re-type new password"
              autoComplete="retype-password"
              className="peer min-w-[280px]"
              onChange={handleChange}
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