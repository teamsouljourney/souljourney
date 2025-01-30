import Image2 from "../../assets/ServicesPageImages/Image2.png";
import Image3 from "../../assets/ServicesPageImages/Image3.png";
import Image4 from "../../assets/ServicesPageImages/Image4.png";
import Image5 from "../../assets/ServicesPageImages/Image5.png";
import Image6 from "../../assets/ServicesPageImages/Image6.png";
// import Vector1 from "../../assets/AboutImages/Vector1.png";

const ServicesDetail = () => {
  const content = [
    {
      title: "Health Psychology",
      text: "Health pyschology focuses on promoting mental and physical well-being through the development of healthier habits and self-awareness.Our sessions provide the knowladge and tools needed to manage stress,anxiety,and other mental health challanges.We aim to empower you with information that supports overall wellness and helps you make informed decisions about your health ",
      list: ["Stress management techniques", "Building emotional resilience", "Lifestyle adjustments for mental health","Strategies for maintaining a balanced life"],
      image: Image2,
    },
    {
      title: "Educational Psychology",
      text: "Educational psychology is focused on understanding how individuals learn and develop in educational settings. Our services in this area aim to supports students,teachers,and parents by addressing challanges related to learning, motivation, and academic performance.Wheter you're a student struggling with schoolwork, a teacher seeking effective teaching strategies, or a parent needing guidance on supporting your child's educational needs,we are here to help.",
      list: ["Learning difficulties assessment (e.g., ADHD, dyslexia)", "Academic performance enhancement", "Strategies for motivation and engagement","Support for students with special educational needs","Parenting tips for supporting educational development"],
      image: Image3,
    },
    {
      title: "Neuropyschology",
      text: "Our passionate therapists are committed to helping you achieve meaningful change and personal growth, one session at a time Neuropsychology focuses on the relationship between the brain and behavior,helping individuals understand how neurological conditions or cognitive impairments may affect their daily lives. Our neuropsychological services include assessments, counseling, and support for individuals experiencing cognitive difficulties, memory issues, and other brain-related concerns",
      list: ["Cogtnitive assessments", "Managing brain injuries or neurological disorders", "Memory enhancement techniques","Addressing mental health issues related to neurological contidions"],
      image: Image4,
    },
    {
      title: "Marriage and Family Therapy",
      text: "Marriage counseling is designed to help couples improve communication,resolve conflicts, and strengthen their relationships. Whether you're facing challanges in your relationship or simply looking to enhance your partnership, our counselors are here to support you through the process.We provide a safe space for both partners to express their concerns and work together toward a healthier,more fulfilling marriage",
      list: ["Effective communication skills", "Conflict resolation strategies", "Building trust and intimacy","Navigating major life changes together"],
      image: Image5,
    },
    {
      title: "Online Therapy Services",
      text: "Accessing professional therapy has never been easier with our online therapy services. Whether you are at home, at work, or anywhere else, you can receive confidential, effective counseling from the comfort of your own space. Our licensed therapists are here to provide you with the support you need to overcome challanges, manage stress, and improve your mental well-being-no matter where you are.",
      list: ["Conventient and confidential sessions via video,chat,or phone", "Flexible scheduling to fit your lifestyle", "Accessible from anywhere with an internet connection","A safe, supportive environment to talk openly and heal"],
      image: Image6,
    },
  ];
  

  return (
    <div className="space-y-16 p-48">
      <div>
        <h1 className="text-4xl font-bold text-center pb-5">
          Empowering Minds, Enhancing Lives
        </h1>
        {/* <img src={Vector1} alt="Vector1" className="mx-auto" /> */}
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
            <ul className="list-disc list-inside text-lg font-medium text-gray-700">
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
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

      <h2 className="text-4xl font-bold text-center pb-5">
              Embark on Your Soul`s Journey - Healing Starts Anytime, Anywhere
            </h2>
    </div>
  );
};

export default ServicesDetail;
