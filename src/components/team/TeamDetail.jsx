import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useSelector } from "react-redux";
import AppointmentCalendar from "../calendar/appointmentCalendar";
import avatar from "../../assets/avatar.png";
import Button from "../button/Button";
import useFeedbackCall from "../../hooks/useFeedbackCall";

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleTherapist, getTherapistTimeTable } = useTherapistCall();
  const {getSingleTherapistFeedbacks} = useFeedbackCall()
  const { singleTherapist, loading, error } = useSelector(
    (state) => state.therapists
  );
  const {singleTherapistFeedbacks} = useSelector(state => state.feedbacks)

  const [displayCalendar, setDisplayCalendar] = useState(false);

  useEffect(() => {
    getSingleTherapist(id);
    getTherapistTimeTable(id);
    getSingleTherapistFeedbacks(id)
  }, [id]);

  if (loading) {
    return <div className="text-center text-navy">Loading...</div>;
  }

  if (error || !singleTherapist) {
    return <div className="text-center text-mauve">Therapist not found!</div>;
  }

  console.log(singleTherapist);

  const {
    firstName,
    lastName,
    email,
    image,
    categoryId,
    feedbackId,
    description,
    graduation,
    experience,
  } = singleTherapist;

  // console.log(categoryId);
  console.log(singleTherapistFeedbacks);

  const therapistCategories = categoryId;

  const toggleCalendar = (show) => {
    setDisplayCalendar(show);
  };

  const handleOutSideClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleCalendar(false);
    }
  };

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
      return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="container max-w-none min-h-screen flex flex-col justify-center items-center gap-2 py-3 bg-offWhite dark:bg-background-darker text-navy-dark dark:text-offWhite-dark">
      {/* Header */}
      <div className="w-full bg-offWhite-dark dark:bg-background-dark pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mx-auto w-full max-w-6xl p-8 mt-6">
          {/* Profile Pic */}
          <div className="lg:col-span-1 flex justify-center">
            <img
              className="w-48 h-48 rounded-full border-4 border-seaGreen object-cover bg-offWhite"
              src={image || avatar}
              alt={firstName}
            />
          </div>

          {/* Identity */}
          <div className="lg:col-span-3 flex flex-col lg:justify-center lg:items-start lg:pl-5  text-center lg:text-left">
            <div className="text-2xl font-semibold">
              {/* Name */}
              <div className="text-4xl font-semibold mb-2">
                {firstName} {lastName}
                <p className="text-sm mt-1">{email}</p>
              </div>
              {/* Categories */}
              <div className="flex flex-wrap justify-center lg:justify-start mt-4 gap-2 text-lg">
                {therapistCategories.map((category) => (
                  <span
                    className="inline-block px-2 py-1 bg-[#E8F5E9] text-seaGreen rounded-full text-sm"
                    key={category._id}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              {/* Services */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center mt-2 gap-x-6">
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
          </div>

          {/* Appointment button */}
          <div className="lg:col-span-1 flex flex-col justify-center items-center lg:justify-end">
            <Button
              onClick={() => toggleCalendar(true)}
              className="capitalize"
              type="type22"
            >
              work with me
            </Button>
          </div>
        </div>
      </div>
      {/* Decorative Wave Border */}
      {/* <div className="w-full h-24 relative overflow-hidden">
        <div
          className="absolute inset-0 w-full h-24"
          style={{
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%234DA1A9' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </div> */}
      {/* Tab Navigation */}
      {/* <div className="w-full bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button className="py-4 px-1 border-b-2 border-seaGreen text-seaGreen font-medium">About me</button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-seaGreen hover:border-seaGreen font-medium">
              Professional experience
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-seaGreen hover:border-seaGreen font-medium">
              Credentials information
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-seaGreen hover:border-seaGreen font-medium">
              Reviews
            </button>
          </div>
        </div>
      </div> */}

      {/* Body */}
      <div className="w-full px-4">
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
              We truly appreciate the wonderful feedback we receive about our professionals. Each review reflects the genuine experiences of those who have worked with them, shared voluntarily by individuals who found value in their journey. Everyone’s therapy experience is unique, and we are grateful for the trust placed in us.
            </p>
            {/* Profesyonellerimiz hakkında aldığımız harika geri bildirimler için gerçekten minnettarız. Her bir yorum, onlarla çalışmış kişilerin gerçek deneyimlerini yansıtmakta olup, yolculuklarından değer bulan bireyler tarafından gönüllü olarak paylaşılmıştır. Herkesin terapi süreci kendine özgüdür ve bize duyulan güven için teşekkür ederiz. */}
            {/* Wir sind sehr dankbar für das wunderbare Feedback, das wir über unsere Fachkräfte erhalten. Jede Bewertung spiegelt die echten Erfahrungen von Menschen wider, die mit ihnen gearbeitet haben und ihren Weg freiwillig teilen. Jede Therapieerfahrung ist einzigartig, und wir schätzen das Vertrauen, das in uns gesetzt wird. */}

            {/* <div className="mt-4">{feedbackId[0]?.comment}</div> */}

            {/* Review Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {/* Example Review Card 1 */}

              {singleTherapistFeedbacks?.map((feedback) => (
                <div key={feedback?._id} className="bg-white dark:bg-background-dark rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
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
                          {feedback?.userId?.firstName} {feedback?.userId?.lastName}
                        </h3>
                        <p className="text-sm pt-2">
                        {getTimeAgo(feedback?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-5 h-5 ${
                            index < 5
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
                  <p className="leading-relaxed">
                    {feedback?.comment}
                  </p>
                </div>
              ))}

              {/* Example Review Card 2 */}
              {/* <div className="bg-white dark:bg-background-dark rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/placeholder.svg"
                      alt="Michael R."
                      className="w-12 h-12 rounded-full object-cover border-2 border-seaGreen"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        Michael R.
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        1 month ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < 4
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
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  "The video sessions were very convenient and effective. The
                  therapist provided practical strategies that helped me manage
                  my stress better."
                </p>
              </div> */}

              {/* Example Review Card 3 */}
              {/* <div className="bg-white dark:bg-background-dark rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/placeholder.svg"
                      alt="Emma L."
                      className="w-12 h-12 rounded-full object-cover border-2 border-seaGreen"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        Emma L.
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        3 months ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < 5
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
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  "I appreciate the flexible scheduling and the thoughtful
                  approach to my concerns. The combination of video calls and
                  chat support worked perfectly for me."
                </p>
              </div> */}
            </div>

            {/* <!-- Add Comment Form --> */}
            <form class="mt-8 bg-offWhite-light dark:bg-background-dark p-4 rounded-lg shadow">
              <h3 class="text-lg font-semibold mb-2">Add a Comment</h3>
              <div class="mb-4">
                <label for="title" className="peer">
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
              <div class="mb-4">
                <label
                  for="comment"
                  className="peer"
                >
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
              <Button
                type="type22"
              >
                Post Comment
              </Button>
            </form>
          </div>
        </div>
      </div>
      {/* GoBack */}
      <div className="p-6 pt-0 mt-8 text-center w-full">
        <Button onClick={() => navigate(-1)} type="type22">
          Go Back
        </Button>
      </div>

      {/* Appointment */}
      {displayCalendar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleOutSideClick}
        >
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <AppointmentCalendar />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetail;
