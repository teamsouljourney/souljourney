import Frame1 from "../../assets/AboutImages/Frame1.png";
import Frame2 from "../../assets/AboutImages/Frame2.png";
import Frame3 from "../../assets/AboutImages/Frame3.png";
import Vector2 from "../../assets/AboutImages/Vector2.png";
import RectangeBottom from "../../assets/AboutImages/RectangleBottom.png";

const AboutRow = () => {
  const content = [
    {
      title: "Personalized Therapy Sessions",
      text: "Our sessions are tailored to your unique needs, helping you progress at your own pace. Whether you're addressing immediate challenges or working on long-term goals, we're here to support you every step of the way.",
      image: Frame1,
    },
    {
      title: "Expert-Curated Guidance",
      text: "Our licensed therapists bring trusted expertise to every session, ensuring you receive high-quality care. With a focus on your well-being, we combine evidence-based practices with personalized insights.",
      image: Frame2,
    },
    {
      title: "Empowering Tools for Growth",
      text: "We provide resources and support that empower both clients and therapists. With tools to track progress, identify needs, and set achievable goals, you'll experience meaningful and measurable growth.",
      image: Frame3,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center space-y-8 px-4 md:px-0">
      <div className="w-full max-w-[1102px] h-auto mx-auto flex flex-col items-center space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold pb-2">Why it works</h1>
          <p className="text-lg pb-2 max-w-[900px] mx-auto">
            Discover why our platform is the right choice for your mental well-being
          </p>
          <img src={Vector2} alt="Vector1" className="mx-auto" />
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center w-full space-y-12 md:space-y-0 md:space-x-8 items-center">
          {content.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 w-full md:w-[30%]">
              <img src={item.image} alt="Frame" className="w-auto h-auto max-w-full" />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <img src={RectangeBottom} alt="Rectangle Bottom" className="w-full h-[10px]" />
    </div>
  );
};

export default AboutRow;