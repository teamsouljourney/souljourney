import ProcessItem from "./ProcessItem"; // `ProcessItem` bileşenini import ediyoruz
import Foto1 from "../../assets/images/pexels-liza-summer-6347901.jpg";
import Foto2 from "../../assets/images/pexels-yankrukov-4458421.jpg";
import Foto3 from "../../assets/images/pexels-karolina-grabowska-4467687.jpg";
import Foto4 from "../../assets/images/pexels-cottonbro-4065876.jpg";

const processSteps = [
  {
    title: "Register or Login",
    description:
      "Create an account or log in to your existing account to get started.",
    image: Foto1,
  },
  {
    title: "Determine Your Preferences",
    description:
      "Specify your preferences regarding therapy type, session frequency, and goals.",
    image: Foto2,
  },
  {
    title: "Choose Your Therapist",
    description:
      "Browse through a list of qualified therapists and select the one that best fits your needs.",
    image: Foto3,
  },
  {
    title: "Join the Session",
    description:
      "Start your therapy session at the scheduled time through a secure video call or chat platform.",
    image: Foto4,
  },
];

const ProcessSection = () => {
  return (
    <div className="mx-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-between mb-10">
      <div className="text-center mt-10">
        <h3 className="text-3xl sm:text-5xl leading-normal font-urbanist tracking-tight text-gray-900">
          How it <span className="text-navy">Works?</span>
        </h3>
      </div>

      <div className="mt-20">
        <ul className="md:grid md:grid-cols-2 sm:grid-cols-4 md:gap-4 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <ProcessItem
              key={index} // React için benzersiz anahtar
              title={step.title}
              description={step.description}
              image={step.image}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProcessSection;
