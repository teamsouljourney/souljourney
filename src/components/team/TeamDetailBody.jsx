import { useSelector } from "react-redux";
import useFeedbackCall from "../../hooks/useFeedbackCall";
import { useEffect } from "react";
import Button from "../button/Button";
import TeamDetailFeedbackCards from "./TeamDetailFeedbackCards";
import TeamDetailFeedbackForm from "./TeamDetailFeedbackForm";

const TeamDetailBody = ({ singleTherapist, id }) => {
  const { getSingleTherapistFeedbacks } = useFeedbackCall();
  const { singleTherapistFeedbacks, loading, error } = useSelector((state) => state.feedbacks);

  useEffect(() => {
    getSingleTherapistFeedbacks(id);
  }, [id]);

  if (loading) {
    return <div className="text-center text-navy">Loading...</div>;
  }

  if (error || !singleTherapistFeedbacks) {
    return <div className="text-center text-mauve">Therapist' feedbacks not found!</div>;
  }

  const { description, graduation, experience } = singleTherapist;
  // console.log(singleTherapist);
  // console.log(categoryId);
  // console.log(singleTherapistFeedbacks);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 mx-auto w-full max-w-6xl p-8">
        {/* About */}
        <div className="row-span-4 mx-auto pb-3 border-b-2 w-full">
          <h2 className="text-2xl font-semibold mb-4 ">About</h2>
          <p className=" leading-relaxed">{description}</p>
        </div>
        {/* Experience */}
        <div className="row-span-3 mx-auto pb-3 border-b-2 w-full">
          <h2 className="text-2xl font-semibold mb-4 ">
            Proffesional experience
          </h2>
          <div className="">{experience}</div>
          <div className="">{graduation}</div>
        </div>
        {/* Services */}
        <div className="row-span-2 mx-auto pb-3 border-b-2 w-full">
          <h2 className="text-2xl font-semibold mb-4 ">Services</h2>
          <div className="flex flex-wrap justify-start items-center mt-2 gap-x-6">
            <div className="flex flex-row items-center  justify-center gap-2">
              <span
                style={{
                  maskImage: `url(/assets/sidebar/videoCall2.svg)`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  width: "20px",
                  height: "20px",
                }}
                className="inline-flex justify-center items-center  bg-navy-light "
              ></span>

              <span className="text-[1rem] font-semibold">Video Call</span>
            </div>
            <div className="flex flex-row items-center  justify-center gap-2">
              <span
                style={{
                  maskImage: `url(/assets/sidebar/chat2.svg)`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  width: "20px",
                  height: "20px",
                }}
                className="inline-flex justify-center items-center  bg-navy-light "
              ></span>

              <span className="text-[1rem] font-semibold">Live Chat</span>
            </div>
          </div>
        </div>
        {/* Reviews */}
        <div className="row-span-2 mx-auto pb-3 w-full">
          <h2 className="text-2xl font-semibold mb-4 ">Reviews</h2>

          <p className=" leading-relaxed">
            We truly appreciate the wonderful feedback we receive about our
            professionals. Each review reflects the genuine experiences of those
            who have worked with them, shared voluntarily by individuals who
            found value in their journey. Everyone’s therapy experience is
            unique, and we are grateful for the trust placed in us.
          </p>
          {/* Profesyonellerimiz hakkında aldığımız harika geri bildirimler için gerçekten minnettarız. Her bir yorum, onlarla çalışmış kişilerin gerçek deneyimlerini yansıtmakta olup, yolculuklarından değer bulan bireyler tarafından gönüllü olarak paylaşılmıştır. Herkesin terapi süreci kendine özgüdür ve bize duyulan güven için teşekkür ederiz. */}
          {/* Wir sind sehr dankbar für das wunderbare Feedback, das wir über unsere Fachkräfte erhalten. Jede Bewertung spiegelt die echten Erfahrungen von Menschen wider, die mit ihnen gearbeitet haben und ihren Weg freiwillig teilen. Jede Therapieerfahrung ist einzigartig, und wir schätzen das Vertrauen, das in uns gesetzt wird. */}

          {/* Review/Feedback Cards */}

          <TeamDetailFeedbackCards singleTherapistFeedbacks={singleTherapistFeedbacks}/>

          {/* <!-- Add Comment Form --> */}
          
          <TeamDetailFeedbackForm id={id}/>
          
        </div>
      </div>
    </>
  );
};

export default TeamDetailBody;
