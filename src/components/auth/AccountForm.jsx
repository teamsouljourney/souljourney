import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const AccountForm = ({ handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const { singleUser } = useSelector((state) => state.users);
  return (
    <div className="flex flex-col w-full items-start gap-4">
      <span className="text-lg mt-10 font-medium">
        {t("accountPersonelInfo")} {/* Personel Info */}
      </span>
      <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4 w-full max-w-[576px]">
        {/* First Name */}
        <div className="sm:col-span-2">
          <label htmlFor="firstName" className="peer">
            {t("firstName")}
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={singleUser?.firstName}
              placeholder={t("placeholderName")}
              autoComplete="given-name"
              className="peer w-full"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Last Name */}
        <div className="sm:col-span-2">
          <label htmlFor="lastName" className="peer">
            {t("lastName")}
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={singleUser?.lastName}
              placeholder={t("placeholderLastname")}
              autoComplete="family-name"
              className="peer w-full"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* userName */}
        <div className="sm:col-span-4">
          <label htmlFor="userName" className="peer">
            {t("username")}
          </label>
          <div className="mt-2">
            <input
              id="userName"
              name="userName"
              type="userName"
              value={singleUser?.userName}
              placeholder={t("placeholderUsername")}
              autoComplete="userName"
              className="peer w-full bg-gray-50 hover:cursor-not-allowed"
              disabled
            />
          </div>
        </div>
        {/* Email */}
        <div className="sm:col-span-4">
          <label htmlFor="email" className="peer">
            {t("email")}
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={singleUser?.email}
              placeholder={t("placeholderEmail")}
              autoComplete="email"
              className="peer w-full bg-gray-50 hover:cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        {/* Contact Info Field */}
        {/* Phone */}
        <div className="sm:col-span-4">
          <label htmlFor="phone" className="peer">
            {t("phone")}
          </label>
          <div className="mt-2">
            <input
              id="phone"
              name="phone"
              type="phone"
              value={singleUser?.phone}
              placeholder={t("placeholderPhone")}
              autoComplete="phone"
              className="peer w-full"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Profession */}
        <div className="col-span-full">
          <label htmlFor="profession" className="peer">
            {t("profession")}
          </label>
          <div className="mt-2">
            <input
              id="profession"
              name="profession"
              type="text"
              value={singleUser?.profession}
              placeholder={t("placeholderProfession")}
              autoComplete="profession"
              className="peer w-full"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Address */}
        <div className="col-span-full">
          <label htmlFor="address" className="peer">
            {t("address")}
          </label>
          <div className="mt-2">
            <textarea
              type="address"
              name="address"
              id="address"
              value={singleUser?.address}
              placeholder={t("placeholderAddress")}
              autoComplete="address"
              className="textarea-style"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {/* Update Profile Button */}
      <div className="flex w-full flex-col items-start justify-center gap-6 mt-6">
        <button
          type="button"
          className="account-btn mb-4 w-1/2"
          onClick={handleSubmit}
        >
          {t("updateProfile")} {/* Update Profile */}
        </button>
      </div>
    </div>
  );
};

export default AccountForm;
