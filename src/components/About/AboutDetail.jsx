import Image2 from "../../assets/AboutImages/Image2.png";
import Image3 from "../../assets/AboutImages/Image3.png";
import Image4 from "../../assets/AboutImages/Image4.png";
import Vector1 from "../../assets/AboutImages/Vector1.png";

const AboutDetail = () => {
  const content = [
    {
      title: "Building Confidence and Enhancing Mental Well-Being",
      text: "Our expert therapists are here to help you navigate life’s challenges with confidence and resilience. We provide a supportive environment where your mental health thrives. Through a variety of therapeutic techniques, we ensure that you develop the tools you need to overcome any obstacles in life. Our personalized approach fosters growth and stability, empowering you to take charge of your well-being. Whether it's managing stress, overcoming trauma, or simply finding balance, we are here to help every step of the way. Together, we can cultivate a healthier mindset that will serve you for years to come. The journey to mental clarity and emotional peace starts with a single step. Let us guide you through this process in a safe and understanding environment. No matter where you are in your mental health journey, we are committed to walking beside you. With compassion and expertise, we are here to help you become your best self.",
      image: Image2,
    },
    {
      title: "Personalized Support for Every Journey",
      text: "Each session is tailored to your specific needs, ensuring that you receive the right guidance and resources to thrive in your personal and professional life. We understand that no two journeys are the same, and that's why our approach is highly personalized. From one-on-one sessions to group support, we offer a range of options designed to meet you where you are. Together, we'll explore the challenges you face, identify your strengths, and create a path forward that feels empowering and achievable. Whether you’re working through relationship struggles, career transitions, or personal growth goals, we provide a safe and supportive environment to facilitate change. Our therapists use evidence-based practices to ensure that the strategies you learn are both effective and sustainable. By working with you in a way that respects your pace, we'll help you navigate life's obstacles with confidence. This is your journey, and we’re here to walk with you every step of the way.",
      image: Image3,
    },
    {
      title: "Proven Strategies for Growth and Stability",
      text: "We utilize evidence-based techniques to support your well-being, fostering growth and stability for a balanced and fulfilling life. Our therapists are trained in the latest practices in mental health and personal development, ensuring that you receive the best possible care. Through a combination of mindfulness, cognitive behavioral therapy (CBT), and solution-focused approaches, we help you achieve clarity and emotional balance. By integrating these strategies into your daily life, we ensure that you develop the skills needed to face life’s challenges with resilience and grace. Whether you're dealing with anxiety, depression, or life transitions, we provide tools and insights that help you thrive. We also offer ongoing support and check-ins to ensure that your progress continues long after the sessions have ended. The strategies we teach are designed not just to address immediate issues but to create long-term stability and growth. Together, we'll unlock your full potential and empower you to lead a life filled with purpose and peace.",
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
