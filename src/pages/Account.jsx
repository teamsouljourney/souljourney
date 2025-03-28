import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import AccountForm from "../components/auth/AccountForm";
import AccountChangePasswordForm, {
  PasswordSchema,
} from "../components/auth/AccountChangePasswordForm";
import AccountDelete from "../components/auth/AccountDelete";
import AccountUploadProfilePicture from "../components/auth/AccountUploadProfilePicture";
import useUserCall from "../hooks/useUserCall";
import { Formik } from "formik";
import { updateSingleUserSuccess } from "../features/userSlice";
import useTherapistCall from "../hooks/useTherapistCall";
import AccountTherapistForm from "../components/auth/AccountTherapistForm";

const Account = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.auth);
  const { singleUser, loading } = useSelector((state) => state.users);
  const { singleTherapist } = useSelector((state) => state.therapists);
  const { getSingleUser, updateMe, changeMyPassword } = useUserCall();
  const { getSingleTherapist, changeMyPasswordTherapist } = useTherapistCall();
  const schemaPassword = PasswordSchema(t);

  const id = currentUser?._id;
  const isActive = currentUser?.isActive;
  const isTherapist = currentUser?.isTherapist;

  useEffect(() => {
    if (isTherapist) {
      getSingleTherapist(currentUser?._id);
    } else {
      getSingleUser(currentUser?._id);
    }
  }, []);

  const handleChange = (e) => {
    dispatch(updateSingleUserSuccess({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMe(id, singleUser);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-seaGreen"></div>
      </div>
    );
  }
  return (
    <>
      <div className="container max-w-none flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch bg-offWhite-light pl-4 pr-6 py-8 shadow-sm text-navy-dark dark:text-offWhite-light dark:bg-background-darker mt">
        {/* Update Profile Section */}
        <div className="flex w-full max-w-[576px] flex-col items-start gap-10 border-b-2 border-b-gray-200 dark:border-b-gray-400 mt-10">
          {/* Header */}
          <div className="flex w-full flex-col items-start gap-2 font-semibold">
            <span className="text-5xl">{t("account")}</span>
            <span>{t("accountInfo")} {/* Update your profile and personal details here */}</span>
          </div>
          {/* Profile Section */}
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-3xl font-semibold mb-4">{t("profile")}</span>
            {/* Profile Picture Section */}
            <AccountUploadProfilePicture singleUser={singleUser} singleTherapist={singleTherapist} />
            {/* Personel Info Field */}
            {!isTherapist ? (
              <AccountForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ) : (
              <AccountTherapistForm singleTherapist={singleTherapist} id={id} />
            )}
          </div>
        </div>
        {/* Change Password Field */}
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            retypePassword: "",
          }}
          validationSchema={schemaPassword}
          onSubmit={(values, actions) => {
            isTherapist
              ? changeMyPasswordTherapist(id, values)
              : changeMyPassword(id, values);

            actions.resetForm();
            actions.setSubmitting(false);
          }}
          component={(props) => <AccountChangePasswordForm {...props} />}
        ></Formik>
        {/* Account Delete Field */}
        {!isTherapist && <AccountDelete id={id} isActive={isActive} />}
      </div>
    </>
  );
};

export default Account;
