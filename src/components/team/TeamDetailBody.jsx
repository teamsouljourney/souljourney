import { useSelector } from "react-redux";
import useFeedbackCall from "../../hooks/useFeedbackCall";
import { useEffect } from "react";
import Button from "../button/Button";
import avatar from "../../assets/avatar.png";
import TeamDetailFeedbackCards from "./TeamDetailFeedbackCards";

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

  const { categoryId, description, graduation, experience } = singleTherapist;

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMilliseconds = now - created;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
      return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} ${
        diffInMinutes === 1 ? "minute" : "minutes"
      } ago`;
    } else {
      return "Just now";
    }
  };

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
          <form className="mt-8 bg-offWhite-light dark:bg-background-dark p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
            <div className="mb-4">
              <label htmlFor="title" className="peer">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter your title"
                className="w-full peer"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="peer">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                placeholder="Enter your comment"
                rows="4"
                className="w-full textarea-style"
                required
              ></textarea>
            </div>
            <Button type="type22">Post Comment</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TeamDetailBody;
