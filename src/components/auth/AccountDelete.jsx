import { useTranslation } from "react-i18next";
import useUserCall from "../../hooks/useUserCall";

const AccountDelete = ({ id, isActive }) => {
  const { t } = useTranslation();
  const { changeMyStatus } = useUserCall();

  return (
    <div className="flex w-full max-w-[576px] flex-col items-start gap-6 mt-4">
      <span className="text-lg font-medium">
        {t("dangerZone")} {/* Danger zone/Delete Account */}
      </span>
      <div className="w-full p-4 border-[3px] border-red-700 bg-red-100 dark:bg-red-200/90 dark:border-red-700 rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="text-base font-semibold text-red-700 dark:text-red-900">
              {t("deleteAccount")}
              {/* Delete account */}
            </h4>
            <p className="text-sm text-red-700 dark:text-red-800">
              {t("deleteAccountInfo")}{" "}
              {/*Permanently remove your account and all of your content. This action is not reversible.  */}
            </p>
          </div>
          <div className="flex justify-start">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-offWhite bg-red-700 border-2 border-red-700 rounded-md hover:bg-offWhite hover:text-red-700 hover:font-bold hover:border-red-700   dark:bg-red-700 dark:border-red-700 dark:text-offWhite dark:hover:text-red-700 dark:hover:bg-offWhite transition-colors"
              onClick={() => changeMyStatus(id)}
            >
              {t("deleteAccount")} {/* Delete account */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDelete;
