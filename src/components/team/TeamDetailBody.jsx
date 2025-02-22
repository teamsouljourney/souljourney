import { useSelector } from "react-redux";
import useFeedbackCall from "../../hooks/useFeedbackCall";
import { useEffect } from "react";
import Button from "../button/Button";
import avatar from "../../assets/avatar.png";

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            
            {singleTherapistFeedbacks?.map((feedback) => (
              <div
                key={feedback?._id}
                className="bg-white dark:bg-background-dark rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={feedback?.userId?.image || avatar}
                      alt={feedback?.userId?.userName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-seaGreen bg-inherit"
                    />
                    <div>
                      <h3 className="font-semibold leading-tight">
                        {feedback?.userId?.firstName}{" "}
                        {feedback?.userId?.lastName}
                      </h3>
                      <p className="text-sm pt-2">
                        {getTimeAgo(feedback?.createdAt)}
                      </p>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < feedback?.rating
                            ? "text-seaGreen fill-seaGreen"
                            : "text-gray-300 fill-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                {/* Card Body */}
                <h4 className="leading-relaxed font-semibold">
                  <i>{feedback?.title}</i>
                </h4>
                <p className="leading-relaxed">{feedback?.comment}</p>
              </div>
            ))}
          </div>

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
