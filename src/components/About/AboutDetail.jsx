import Image2 from "../../assets/AboutImages/Image2.png";
import Image3 from "../../assets/AboutImages/Image3.png";
import Image4 from "../../assets/AboutImages/Image4.png";
import Vector1 from "../../assets/AboutImages/Vector1.png";

const AboutDetails = () => {
  const content = [
    {
      title: "Building Confidence and Enhancing Mental Well-Being",
      text: "Our expert therapists are here to help you navigate life’s challenges with confidence and resilience. We provide a supportive environment where your mental health thrives.",
      image: Image2,
    },
    {
      title: "Building Confidence and Enhancing Mental Well-Being",
      text: "Our expert therapists are here to help you navigate life’s challenges with confidence and resilience. We provide a supportive environment where your mental health thrives.",
      image: Image3,
    },
    {
      title: "Building Confidence and Enhancing Mental Well-Being",
      text: "Our expert therapists are here to help you navigate life’s challenges with confidence and resilience. We provide a supportive environment where your mental health thrives.",
      image: Image4,
    },
  ];
  

  return (
    <div className="space-y-16 p-48">
      <div>
        <h1 className="text-4xl font-bold text-center pb-5">
          Empowering Minds, Enhancing Lives
        </h1>
        <img src={Vector1} alt="Vector1" className="mx-auto" />
      </div>

      {content.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center justify-center py-12 px-6 md:px-12 space-y-8 md:space-x-16 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          } ${index % 2 === 1 ? "md:space-x-16" : ""}`}
        >
          <div
            className={`md:w-1/2 text-center md:text-left mb-8 md:mb-0 ${
              index % 2 === 1 ? "md:pl-16" : ""
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 w-[474px]">
              {section.title}
            </h2>
            <div className="w-[474px] h-[3px] bg-[#8F5B8A] my-4"></div>
            <p className="text-black opacity-80 text-lg px-4 md:px-0">
              {section.text}
            </p>
          </div>

          <div className="md:w-[439px] md:h-[366px] w-[439px] h-[366px]">
            <img
              src={section.image}
              alt="Therapist Image"
              className="w-full h-auto rounded-l-[80%] rounded-r-[80%] object-cover aspect-[439/366]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutDetails;
