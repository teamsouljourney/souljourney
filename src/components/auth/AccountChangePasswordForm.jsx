import { Form } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const PasswordSchema = (t) =>
  Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required(t("requiredPasswordMessage"))
      .min(8, t("passwordMinLengthMessage"))
      .matches(/\d+/, t("passwordDigitMessage"))
      .matches(/[a-z]/, t("passwordLowerCaseMessage"))
      .matches(/[A-Z]/, t("passwordUpperCaseMessage"))
      .matches(/[@$?!%&*]+/, t("passwordSpecialCharMessage")),
    retypePassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

const AccountChangePasswordForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full max-w-[576px] flex-col items-start gap-4 border-b-2 border-b-gray-200 dark:border-b-gray-400">
      <span className="text-lg font-medium">{t("password")}</span>

      <Form onSubmit={handleSubmit}>
        {/* Current Password */}
        <div className="sm:col-span-4 relative mb-4">
          <label htmlFor="currentPassword" className="password-label">
          {t("currentPassword")} {/* Current Password */}
          </label>
          <div className="mt-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={values.currentPassword}
              placeholder={t("currentPasswordPlaceHolder")}
              autoComplete="current-password"
              className={`peer min-w-[280px] ${
                touched.currentPassword && errors.currentPassword
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <img
                src={showPassword ? "/assets/visible.svg" : "/assets/invisible.svg"}
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-4 h-4 opacity-60 hover:opacity-80 transition-opacity"
                draggable="false"
              />
            </div>
          </div>
          {touched.currentPassword && errors.currentPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div className="sm:col-span-4 relative mb-4">
          <label htmlFor="newPassword" className="password-label">
            {t("newPassword")} {/* New Password */}
          </label>
          <div className="mt-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={values.newPassword}
              placeholder={t("newPasswordPlaceHolder")}
              autoComplete="new-password"
              className={`peer min-w-[280px] ${
                touched.newPassword && errors.newPassword
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <img
                src={showPassword ? "/assets/visible.svg" : "/assets/invisible.svg"}
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-4 h-4 opacity-60 hover:opacity-80 transition-opacity"
                draggable="false"
              />
            </div>
          </div>
          {touched.newPassword && errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
          )}
        </div>

        {/* Retype Password */}
        <div className="sm:col-span-4 relative mb-4">
          <label htmlFor="retypePassword" className="password-label">
          {t("retypeNewPassword")} {/* Re-type New Password */}
          </label>
          <div className="mt-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="retypePassword"
              name="retypePassword"
              value={values.retypePassword}
              placeholder={t("retypeNewPasswordPlaceHolder")}
              autoComplete="retype-password"
              className={`peer min-w-[280px] ${
                touched.retypePassword && errors.retypePassword
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <img
                src={showPassword ? "/assets/visible.svg" : "/assets/invisible.svg"}
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-4 h-4 opacity-60 hover:opacity-80 transition-opacity"
                draggable="false"
              />
            </div>
          </div>
          {touched.retypePassword && errors.retypePassword && (
            <p className="mt-1 text-sm text-red-500">{errors.retypePassword}</p>
          )}
        </div>

        <div className="flex w-full flex-col items-start justify-center gap-6 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="account-btn mb-4 w-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("changing") + "..." : t("changePassword")}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AccountChangePasswordForm;