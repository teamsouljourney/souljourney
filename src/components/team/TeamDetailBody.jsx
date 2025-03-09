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

  // console.log(feedback);

  useEffect(() => {
    if (singleTherapist) {
      getSingleTherapistFeedbacks(singleTherapist?._id);
    }    
  }, [singleTherapist?._id]);

  if (loading) {
    return <div className="text-center text-navy">Loading...</div>;
  }

  if (error || !singleTherapistFeedbacks) {
    return (
      <div className="text-center text-mauve">
        Therapist' feedbacks not found!
      </div>
    );
  }

  const { description, graduation, experience, categoryId } = singleTherapist;
  // console.log(singleTherapist);
  // console.log(categoryId);
  // console.log(singleTherapistFeedbacks);

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
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">About Me{/* {t("about")} */}</h2>
          <p className="text-sm sm:text-base leading-relaxed sm:leading-relaxed md:leading-relaxed">{description}</p>
        </section>
        {/* Experience */}
        <section id="experience" ref={sectionRefs.current.experience} className="scroll-mt-[40] row-span-3 mx-auto pb-3 border-b-2 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
            Proffesional experience
          </h2>
          <div className="">
            <p className="text-sm sm:text-base mb-2 leading-relaxed sm:leading-relaxed">{experience}</p>
            <div className="flex flex-wrap justify-start my-3 sm:my-4 gap-1.5 sm:gap-2"> 
              {/* <strong>Categories: </strong> */}
              {categoryId?.map((category) => (
                <span
                  className="inline-block py-0.5 sm:py-1 px-2 bg-[#E8F5E9] dark:bg-offWhite-dark text-seaGreen-dark dark:text-seaGreen-dark rounded-full text-xs sm:text-sm"
                  key={category?._id}
                >
                  {category?.name}
                </span>
              ))}
            </div>
          </div>
          <div className="text-sm sm:text-base"><strong className="font-semibold">Bachelor's degree: </strong>{graduation}</div>
        </section>
        {/* Services */}
        <section id="services" ref={sectionRefs.current.services} className="scroll-mt-40 row-span-2 mx-auto pb-3 border-b-2 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">Services</h2>
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

              <span className="text-sm sm:text-base md:text-[1rem] font-medium sm:font-semibold">Video Call</span>
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

              <span className="text-sm sm:text-base md:text-[1rem] font-medium sm:font-semibold">Live Chat</span>
            </div>
          </div>
        </section>
        {/* Reviews */}
        <section id="reviews" ref={sectionRefs.current.reviews} className="scroll-mt-40 row-span-2 mx-auto pb-3 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">Reviews</h2>

          <p className="text-sm sm:text-base leading-relaxed sm:leading-relaxed mb-4 sm:mb-6">
            We deeply value the trust our clients place in our professionals. Every review is a reflection of real experiences, shared by individuals who have found guidance, support, and positive change in their journey. Therapy is a personal and unique process, and we appreciate those who take the time to share their insights. Your feedback not only helps others but also inspires us to continue providing compassionate and effective care.
            {/* Danışanlarımızın profesyonellerimize duyduğu güveni içtenlikle takdir ediyoruz. Her geri bildirim, rehberlik, destek ve olumlu değişim deneyimlerini yansıtan gerçek hikayelerdir. Terapi, kişisel ve benzersiz bir süreçtir ve deneyimlerini paylaşan herkese minnettarız. Geri bildirimleriniz yalnızca başkalarına yardımcı olmakla kalmaz, aynı zamanda bize şefkatli ve etkili bakım sunma konusunda ilham verir. */}
            {/* Wir schätzen das Vertrauen, das unsere Klienten in unsere Fachkräfte setzen, sehr. Jede Bewertung spiegelt echte Erfahrungen wider, die von Menschen geteilt werden, die auf ihrem Weg Unterstützung, Orientierung und positive Veränderungen erfahren haben. Therapie ist ein individueller und einzigartiger Prozess, und wir sind dankbar für alle, die ihre Erfahrungen mit uns teilen. Ihr Feedback hilft nicht nur anderen, sondern motiviert uns auch, weiterhin einfühlsame und wirksame Unterstützung zu leisten. */}
          </p>
          {/* We truly appreciate the wonderful feedback we receive about our professionals. Each review reflects the genuine experiences of those who have worked with them, shared voluntarily by individuals who found value in their journey. Everyone’s therapy experience is unique, and we are grateful for the trust placed in us. */}
          {/* Profesyonellerimiz hakkında aldığımız harika geri bildirimler için gerçekten minnettarız. Her bir yorum, onlarla çalışmış kişilerin gerçek deneyimlerini yansıtmakta olup, yolculuklarından değer bulan bireyler tarafından gönüllü olarak paylaşılmıştır. Herkesin terapi süreci kendine özgüdür ve bize duyulan güven için teşekkür ederiz. */}
          {/* Wir sind sehr dankbar für das wunderbare Feedback, das wir über unsere Fachkräfte erhalten. Jede Bewertung spiegelt die echten Erfahrungen von Menschen wider, die mit ihnen gearbeitet haben und ihren Weg freiwillig teilen. Jede Therapieerfahrung ist einzigartig, und wir schätzen das Vertrauen, das in uns gesetzt wird. */}



          {/* Review/Feedback Cards */}

          <TeamDetailFeedbackCards/>

          {/* <!-- Add Comment Form --> */}

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
