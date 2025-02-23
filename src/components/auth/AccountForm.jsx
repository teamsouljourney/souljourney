import { useTranslation } from "react-i18next";

const AccountForm = ({ userInfo, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col w-full items-center gap-4">
        <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4 w-full max-w-[576px]">
          <div className="sm:col-span-2">
            <label htmlFor="firstName" className="peer">
              {t("firstName")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={userInfo.firstName}
                placeholder="Enter your name"
                autoComplete="given-name"
                className="peer w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="lastName" className="peer">
              {t("lastName")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={userInfo.lastName}
                placeholder="Enter your last name"
                autoComplete="family-name"
                className="peer w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="email" className="peer">
              {t("email")}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={userInfo.email}
                placeholder="Enter your email"
                autoComplete="email"
                className="peer w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact Info Field */}
          <div className="sm:col-span-4">
            <label htmlFor="phone" className="peer">
              {t("phone")}
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="phone"
                value={userInfo.phone}
                placeholder="Enter your phone"
                autoComplete="phone"
                className="peer w-full"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="profession" className="peer">
              {t("profession")}
            </label>
            <div className="mt-2">
              <input
                id="profession"
                name="profession"
                type="text"
                value={userInfo.profession}
                placeholder="Enter your profession (Student, Teacher.. ext.)"
                autoComplete="profession"
                className="peer w-full"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="address" className="peer">
              {t("address")}
            </label>
            <div className="mt-2">
              <textarea
                type="address"
                name="address"
                id="address"
                value={userInfo.address}
                placeholder="Enter your address"
                autoComplete="address"
                className="textarea-style"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-6 mt-6">
          <button
            type="button"
            className="account-btn mb-4 w-1/2"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountForm;
