import {
  UserIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const info = [
  {
    icon: <UserIcon className="w-6 h-6" />,
    title: "Contact Person",
    description: "Soul Journey Developer Team",
  },
  {
    icon: <EnvelopeIcon className="w-6 h-6" />,
    title: "Email",
    description: "team.souljourney@gmail.com",
  },
  {
    icon: <MapPinIcon className="w-6 h-6" />,
    title: "Location",
    description: "Anywhere, Anytime",
  },
];

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-8 py-8 md:flex-row">
      {info.map((item, index) => (
        <div key={index} className="flex items-center p-4">
          <div className="flex items-center justify-center rounded-full text-customBlack bg-mauve-dark w-14 h-14">
            {item.icon}
          </div>
          <div className="ml-4">
            <h6 className="text-lg text-offWhite md:text-primary">
              {item.title}
            </h6>
            <p className="text-sm text-offWhite md:text-secondary">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
