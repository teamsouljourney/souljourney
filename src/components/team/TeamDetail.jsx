import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useSelector } from "react-redux";
import AppointmentCalendar from "../calendar/appointmentCalendar";
import avatar from "../../assets/avatar.png";
import Button from "../button/Button";

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleTherapist, getTherapistTimeTable } = useTherapistCall();
  const { singleTherapist, loading, error } = useSelector(
    (state) => state.therapists
  );

  const [displayCalendar, setDisplayCalendar] = useState(false);

  useEffect(() => {
    getSingleTherapist(id);
    getTherapistTimeTable(id);
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

  const therapistCategories = categoryId;

  const toggleCalendar = (show) => {
    setDisplayCalendar(show);
  };

  const handleOutSideClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleCalendar(false);
    }
  };

  return (
    <div className="container max-w-none min-h-screen flex flex-col justify-center items-center gap-2 py-3 bg-offWhite dark:bg-background-darker text-navy-dark dark:text-offWhite">
      {/* Header */}
      <div className="w-full bg-offWhite-light dark:bg-background-dark pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mx-auto w-full max-w-7xl p-8 mt-6">
          {/* Profile Pic */}
          <div className="lg:col-span-3 flex justify-center">
            <img
              className="w-48 h-48 rounded-full border-4 border-seaGreen object-cover"
              src={image || avatar}
              alt={firstName}
            />
          </div>

          {/* Identity */}
          <div className="lg:col-span-6 flex flex-col text-center lg:text-left">
            <div className="text-2xl font-semibold">
              {/* Name */}
              <div className="text-4xl font-semibold mb-2">
                {firstName} {lastName}
                <p className="text-sm mt-1">{email}</p>
              </div>
              {/* Categories */}
              <div className="flex sm:flex-wrap lg:flex-nowrap justify-center lg:justify-start mt-4 gap-2 text-lg">
                {therapistCategories.map((category) => (
                  <span
                    className="px-4 py-1 bg-[#E8F5E9] text-seaGreen rounded-full text-sm"
                    key={category._id}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              {/* Services */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center mt-2 gap-x-6">
                <div className="flex flex-row items-center  justify-center lg:justify-start gap-2">
                  <span
                    style={{
                      maskImage: `url(/assets/sidebar/videoCall2.svg)`,
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                      width: "30px",
                      height: "30px",
                    }}
                    className="inline-flex justify-center items-center  bg-navy-light "
                  ></span>

                  <span className="text-[1rem] font-semibold">Video Call</span>
                </div>
                <div className="flex flex-row items-center  justify-center lg:justify-start gap-2">
                  <span
                    style={{
                      maskImage: `url(/assets/sidebar/chat2.svg)`,
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                      width: "30px",
                      height: "30px",
                    }}
                    className="inline-flex justify-center items-center  bg-navy-light "
                  ></span>

                  <span className="text-[1rem] font-semibold">Live Chat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment button */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end items-center">
            <button
              onClick={() => toggleCalendar(true)}
              className="px-6 py-3 text-lg leading-none text-white rounded-lg bg-gradient-to-r from-navy to-seaGreen hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark transition-transform duration-150 ease-in-out active:scale-95 capitalize"
            >
              work with me
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-4">
        <div className="grid grid-cols-1 gap-6 mx-auto w-full max-w-6xl p-8">
          <div className="row-span-4 mx-auto pb-3 border-b-2">
            <h2 className="text-2xl font-semibold mb-4 ">About</h2>
            <p className=" leading-relaxed">{description}</p>
          </div>
          <div className="row-span-3 mx-auto pb-3 border-b-2 w-full">
            <h2 className="text-2xl font-semibold mb-4 ">
              Proffesional experience
            </h2>
            <div className="">{experience}</div>
            <div className="">{graduation}</div>
          </div>          
          <div className="row-span-2 mx-auto pb-3 border-b-2 w-full">
            <h2 className="text-2xl font-semibold mb-4 ">Services</h2>
            <div className="flex flex-wrap justify-center lg:justify-start items-center mt-2 gap-x-6">
                <div className="flex flex-row items-center  justify-center lg:justify-start gap-2">
                  <span
                    style={{
                      maskImage: `url(/assets/sidebar/videoCall2.svg)`,
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                      width: "30px",
                      height: "30px",
                    }}
                    className="inline-flex justify-center items-center  bg-navy-light "
                  ></span>

                  <span className="text-[1rem] font-semibold">Video Call</span>
                </div>
                <div className="flex flex-row items-center  justify-center lg:justify-start gap-2">
                  <span
                    style={{
                      maskImage: `url(/assets/sidebar/chat2.svg)`,
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                      width: "30px",
                      height: "30px",
                    }}
                    className="inline-flex justify-center items-center  bg-navy-light "
                  ></span>

                  <span className="text-[1rem] font-semibold">Live Chat</span>
                </div>
              </div>
          </div>
          <div className="row-span-2 mx-auto pb-3 border-b-2 w-full">
            <h2 className="text-2xl font-semibold mb-4 ">Reviews</h2>
            <div className="">{feedbackId.comment}</div>
            <p className=" leading-relaxed">We truly appreciate the wonderful feedback we receive about our professionals. Each review reflects the genuine experiences of those who have worked with them, shared voluntarily by individuals who found value in their journey. Everyone’s therapy experience is unique, and we are grateful for the trust placed in us.</p>
            
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
