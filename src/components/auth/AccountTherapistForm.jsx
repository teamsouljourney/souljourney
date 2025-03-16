import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateSingleTherapistSuccess } from "../../features/therapistSlice";
import useTherapistCall from "../../hooks/useTherapistCall";

const AccountTherapistForm = ({singleTherapist, id}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    // const { singleTherapist } = useSelector((state) => state.therapists);
    const {updateMeTherapist} = useTherapistCall()

    // console.log(singleTherapist);
    // const id = singleTherapist._id
    // console.log(id);

    const handleChange = (e) => {
        // console.log(e.target.value);
        dispatch(updateSingleTherapistSuccess({ [e.target.name]: e.target.value }));
    };    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateMeTherapist(id, singleTherapist)
    };      

    return (
      <>
        <div className="flex flex-col w-full items-start gap-4">
        <span className="text-lg mt-10 font-medium">{t("accountPersonelInfo")} {/* Personel Info */}</span>
          <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4 w-full max-w-[576px]">
            <div className="sm:col-span-2">
              <label htmlFor="firstName" className="peer">
                {t("firstName")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={singleTherapist?.firstName}
                  placeholder={t("placeholderName")}
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
                  value={singleTherapist?.lastName}
                  placeholder={t("placeholderLastname")}
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
                  value={singleTherapist?.email}
                  placeholder={t("placeholderUsername")}
                  autoComplete="email"
                  className="peer w-full bg-gray-50 hover:cursor-not-allowed"
                  // onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            {/* <div className="sm:col-span-4">
              <label htmlFor="category" className="peer">
                 Categories  */}
                 {/* {t("categories")} */}
              {/* </label>
              <div className="mt-2">
                <input
                  id="category"
                  name="category"
                  type="category"
                  value={singleTherapist?.categoryId[0].name}
                  placeholder="Enter your category"
                  autoComplete="category"
                  className="peer w-full"
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>   */}
            <div className="col-span-full">
              <label htmlFor="graduation" className="peer">
                {t("graduation")} {/* Graduation */}
              </label>
              <div className="mt-2">
                <input
                  id="graduation"
                  name="graduation"
                  type="text"
                  value={singleTherapist?.graduation}
                  placeholder={t("placeholderGraduation")}
                  autoComplete="graduation"
                  className="peer w-full"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="peer">
                {t("description")} {/* Description */}
              </label>
              <div className="mt-2">
                <textarea
                  type="description"
                  name="description"
                  id="description"
                  rows={4}
                  value={singleTherapist?.description}
                  placeholder={t("placeholderDescription")}
                  autoComplete="description"
                  className="textarea-style"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="experience" className="peer">
                {t("experiences")} {/* Experiences */}
              </label>
              <div className="mt-2">
                <textarea
                  type="experience"
                  name="experience"
                  id="experience"
                  rows={4}
                  value={singleTherapist?.experience}
                  placeholder={t("placeholderExperiences")}
                  autoComplete="experience"
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
              {t("updateProfile")} {/* Update Profile */}
            </button>
          </div>
        </div>
      </>
    );
}

export default AccountTherapistForm