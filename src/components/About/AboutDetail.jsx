import Image2 from "../../assets/AboutImages/Image2.png";
import Image3 from "../../assets/AboutImages/Image3.png";
import Image4 from "../../assets/AboutImages/Image4.png";
import Vector1 from "../../assets/AboutImages/Vector1.png";

const AboutDetail = () => {
  const content = [
    {
      title: "Building Confidence and Enhancing Mental Well-Being",
      text: "Our expert therapists are here to help you navigate life’s challenges with confidence and resilience. We provide a supportive environment where your mental health thrives.",
      image: Image2,
    },
    {
      title: "Personalized Support for Every Journey",
      text: "Each session is tailored to your specific needs, ensuring that you receive the right guidance and resources to thrive in your personal and professional life.",
      image: Image3,
    },
    {
      title: "Proven Strategies for Growth and Stability",
      text: "We utilize evidence-based techniques to support your well-being, fostering growth and stability for a balanced and fulfilling life.",
      image: Image4,
    },
  ];

  return (
    <div className="space-y-4 px-4 md:px-12 lg:px-20 py-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold pb-3">Empowering Minds, Enhancing Lives</h1>
        <img src={Vector1} alt="Vector" className="mx-auto w-full max-w-[500px]" />
      </div>

      {content.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center justify-between gap-2 md:gap-6 border-b-2 pb-6 border-gray-200 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="w-3/4 md:w-[400px] lg:w-[450px] h-auto">
            <img
              src={section.image}
              alt="Therapist Image"
              className="w-full h-auto rounded-l-[50%] rounded-r-[50%] object-cover"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
          <div className="w-full text-center lg:text-left mt-4">
               <h2 className="text-2xl md:text-3xl font-bold ">{section.title}</h2>
            </div>
            <div className="h-[3px] bg-[#8F5B8A] my-2 mx-auto md:mx-0 w-128"></div>
            <p className="opacity-80 text-base lg:text-lg leading-relaxed">{section.text}</p>
          </div>

          
        </div>
      ))}
    </div>
  );
};

export default AboutDetail;
