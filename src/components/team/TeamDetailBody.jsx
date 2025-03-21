import { useSelector } from "react-redux";
import useFeedbackCall from "../../hooks/useFeedbackCall";
import { useEffect, useState } from "react";
import TeamDetailFeedbackCards from "./TeamDetailFeedbackCards";
import TeamDetailFeedbackForm from "./TeamDetailFeedbackForm";
import { useTranslation } from "react-i18next";

const TeamDetailBody = ({sectionRefs}) => {
  const { t } = useTranslation();
  const { getSingleTherapistFeedbacks, postTherapistFeedback } = useFeedbackCall();
  const { singleTherapistFeedbacks, loading, error } = useSelector( (state) => state.feedbacks );
  const { singleTherapist } = useSelector((state) => state.therapists);
  const { currentUser } = useSelector((state) => state.auth);
  const id = singleTherapist && singleTherapist?._id
  
  const initialFeedback = {
    userId: currentUser?._id,
    therapistId: id,
    title: "",
    comment: "",
    rating: 5,
  };

  const [feedback, setFeedback] = useState(initialFeedback);

  useEffect(() => {
    if (singleTherapist) {
      getSingleTherapistFeedbacks(singleTherapist?._id);
    }    
  }, [singleTherapist?._id]);

  if (loading) {
    return <div className="text-center text-navy">{t(loading)}...</div>;
  }

  if (error || !singleTherapistFeedbacks) {
    return (
      <div className="text-center text-mauve">
        {t("TD-feedbacksNotFound")} {/* Therapist' feedbacks not found! */}
      </div>
    );
  }

  const { description, graduation, experience, categoryId } = singleTherapist;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postTherapistFeedback(feedback);
    getSingleTherapistFeedbacks(id);
    setFeedback(initialFeedback);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 mx-auto w-full max-w-6xl p-4 sm:p-6 md:p-8">
        {/* About */}
        <section id="about" ref={sectionRefs.current.about}  className="scroll-mt-40 row-span-4 mx-auto pb-3 border-b-2 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">{/* About Me */} {t("TD-aboutMe-title")}</h2>
          <p className="text-sm sm:text-base leading-relaxed sm:leading-relaxed md:leading-relaxed">{description}</p>
        </section>
        {/* Experience */}
        <section id="experience" ref={sectionRefs.current.experience} className="scroll-mt-[40] row-span-3 mx-auto pb-3 border-b-2 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
            {/* Proffesional experience */} {t("TD-ProExperience-title")}
          </h2>
          <div>
            <p className="text-sm sm:text-base mb-2 leading-relaxed sm:leading-relaxed">{experience}</p>
            <div className="flex flex-wrap justify-start my-3 sm:my-4 gap-1.5 sm:gap-2"> 
              {/* <strong>Categories: </strong> */}
              {categoryId?.map((category) => (
                <span
                  className="inline-block py-0.5 sm:py-1 px-5 bg-[#dbecdd] dark:bg-offWhite-dark text-seaGreen-dark dark:text-seaGreen-dark rounded-full text-md sm:text-md  "
                  key={category?._id}
                >
                  <strong>{category?.name}</strong>
                </span>
              ))}
            </div>
          </div>
          <div className="text-sm sm:text-base"><strong className="font-semibold">{t("TD-BachelorsDegree")}{/* Bachelor's degree */}: </strong>{graduation}</div>
        </section>
        {/* Services */}
        <section id="services" ref={sectionRefs.current.services} className="scroll-mt-40 row-span-2 mx-auto pb-3 border-b-2 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">{/* Services */} {t("TD-services-title")}</h2>
          <div className="flex flex-wrap justify-start items-center mt-2 gap-x-4 sm:gap-x-6">
            <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-2">
              <span
                style={{
                  maskImage: `url(/assets/sidebar/videoCall2.svg)`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  width: "16px",
                  height: "16px",
                }}
                className="inline-flex justify-center items-center bg-navy-light dark:bg-offWhite-dark sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]"
              ></span>

              <span className="text-sm sm:text-base md:text-[1rem] font-medium sm:font-semibold">{t("videoCall")}  {/* Video Call*/}</span>
            </div>
            <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-2">
              <span
                style={{
                  maskImage: `url(/assets/sidebar/chat2.svg)`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  width: "16px",
                  height: "16px",
                }}
                className="inline-flex justify-center items-center bg-navy-light dark:bg-offWhite-dark sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]"
              ></span>

              <span className="text-sm sm:text-base md:text-[1rem] font-medium sm:font-semibold">{t("liveChat")} {/* Live Chat */}</span>
            </div>
          </div>
        </section>
        {/* Reviews */}
        <section id="reviews" ref={sectionRefs.current.reviews} className="scroll-mt-40 row-span-2 mx-auto pb-3 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">{/* Reviews */} {t("TD-reviews-title")}</h2>

          <p className="text-sm sm:text-base leading-relaxed sm:leading-relaxed mb-4 sm:mb-6">
            {t("TD-reviews-info")} 
            {/*We deeply value the trust our clients place in our professionals. Every review is a reflection of real experiences, shared by individuals who have found guidance, support, and positive change in their journey. Therapy is a personal and unique process, and we appreciate those who take the time to share their insights. Your feedback not only helps others but also inspires us to continue providing compassionate and effective care.*/}
          </p>
          {/* We truly appreciate the wonderful feedback we receive about our professionals. Each review reflects the genuine experiences of those who have worked with them, shared voluntarily by individuals who found value in their journey. Everyone’s therapy experience is unique, and we are grateful for the trust placed in us. */}
          {/* Profesyonellerimiz hakkında aldığımız harika geri bildirimler için gerçekten minnettarız. Her bir yorum, onlarla çalışmış kişilerin gerçek deneyimlerini yansıtmakta olup, yolculuklarından değer bulan bireyler tarafından gönüllü olarak paylaşılmıştır. Herkesin terapi süreci kendine özgüdür ve bize duyulan güven için teşekkür ederiz. */}
          {/* Wir sind sehr dankbar für das wunderbare Feedback, das wir über unsere Fachkräfte erhalten. Jede Bewertung spiegelt die echten Erfahrungen von Menschen wider, die mit ihnen gearbeitet haben und ihren Weg freiwillig teilen. Jede Therapieerfahrung ist einzigartig, und wir schätzen das Vertrauen, das in uns gesetzt wird. */}

          {/* Review/Feedback Cards */}

          {singleTherapistFeedbacks.length > 0 && <TeamDetailFeedbackCards/>}          

          {/* <!-- Add Comment Form --> Only for logged in users */}
          {currentUser && (
            <TeamDetailFeedbackForm
              id={id}
              handleSubmit={handleSubmit}
              feedback={feedback}
              setFeedback={setFeedback}
              currentUser={currentUser}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default TeamDetailBody;
