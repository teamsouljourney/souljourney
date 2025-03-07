import Image2 from "../../assets/ServicesPageImages/Image2.png";
import Image3 from "../../assets/ServicesPageImages/Image3.png";
import Image4 from "../../assets/ServicesPageImages/Image4.png";
import Image5 from "../../assets/ServicesPageImages/Image5.png";
import Image6 from "../../assets/ServicesPageImages/Image6.png";

const ServicesDetail = () => {
  const content = [
    {
      title: "Health Psychology",
      text: "Health psychology focuses on promoting mental and physical well-being through the development of healthier habits and self-awareness. Our sessions provide the knowledge and tools needed to manage stress, anxiety, and other mental health challenges. We aim to empower you with information that supports overall wellness and helps you make informed decisions about your health.",
      list: [
        "Stress management techniques",
        "Building emotional resilience",
        "Lifestyle adjustments for mental health",
        "Strategies for maintaining a balanced life"
      ],
      image: Image2,
    },
    {
      title: "Educational Psychology",
      text: "Educational psychology is focused on understanding how individuals learn and develop in educational settings. Our services in this area aim to support students, teachers, and parents by addressing challenges related to learning, motivation, and academic performance. Whether you're a student struggling with schoolwork, a teacher seeking effective teaching strategies, or a parent needing guidance on supporting your child's educational needs, we are here to help.",
      list: [
        "Learning difficulties assessment (e.g., ADHD, dyslexia)",
        "Academic performance enhancement",
        "Strategies for motivation and engagement",
        "Support for students with special educational needs",
        "Parenting tips for supporting educational development"
      ],
      image: Image3,
    },
    {
      title: "Neuropsychology",
      text: "Our passionate therapists are committed to helping you achieve meaningful change and personal growth, one session at a time. Neuropsychology focuses on the relationship between the brain and behavior, helping individuals understand how neurological conditions or cognitive impairments may affect their daily lives. Our neuropsychological services include assessments, counseling, and support for individuals experiencing cognitive difficulties, memory issues, and other brain-related concerns.",
      list: [
        "Cognitive assessments",
        "Managing brain injuries or neurological disorders",
        "Memory enhancement techniques",
        "Addressing mental health issues related to neurological conditions"
      ],
      image: Image4,
    },
    {
      title: "Marriage and Family Therapy",
      text: "Marriage counseling is designed to help couples improve communication, resolve conflicts, and strengthen their relationships. Whether you're facing challenges in your relationship or simply looking to enhance your partnership, our counselors are here to support you through the process. We provide a safe space for both partners to express their concerns and work together toward a healthier, more fulfilling marriage.",
      list: [
        "Effective communication skills",
        "Conflict resolution strategies",
        "Building trust and intimacy",
        "Navigating major life changes together"
      ],
      image: Image5,
    },
    {
      title: "Online Therapy Services",
      text: "Accessing professional therapy has never been easier with our online therapy services. Whether you are at home, at work, or anywhere else, you can receive confidential, effective counseling from the comfort of your own space. Our licensed therapists are here to provide you with the support you need to overcome challenges, manage stress, and improve your mental well-being—no matter where you are.",
      list: [
        "Convenient and confidential sessions via video, chat, or phone",
        "Flexible scheduling to fit your lifestyle",
        "Accessible from anywhere with an internet connection",
        "A safe, supportive environment to talk openly and heal"
      ],
      image: Image6,
    },
  ];

  return (
    <div className="space-y-4 px-4 md:px-12 lg:px-20 py-12 ">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-center pb-3">
          Empowering Minds, Enhancing Lives
        </h1>
      </div>

      {content.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row items-center justify-center py-12 px-6 space-y-8 md:space-y-0 md:space-x-8 lg:space-x-16 border-b-2 border-gray-200 ${
            index % 2 === 1 ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={section.image}
              alt="Therapist Image"
              className="w-[300px] h-auto md:w-[400px] rounded-full object-cover"
            />
          </div>
          <div className="lg:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-full text-center lg:text-left mt-4">
               <h2 className="text-2xl md:text-3xl font-bold ">{section.title}</h2>
            </div>
           
            <div className="w-128 h-1 bg-[#8F5B8A] my-2 mx-auto md:mx-0"></div>
            <p className="opacity-80 text-md md:text-lg px-2 md:px-0">
              {section.text}
            </p>
            <ul className="list-disc list-inside text-md md:text-lg font-medium text-left mt-4">
              {section.list.map((item, i) => (
                <li key={i} className="text-seaGreen-dark dark:text-seaGreen-light"><i>{item}</i></li>
              ))}
            </ul>
          </div>
          
        </div>
      ))}
      <div className="py-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center py-5">
        Embark on Your Soul’s Journey - Healing Starts Anytime, Anywhere...
      </h2>
      </div>
      
    </div>
  );
};

export default ServicesDetail;
