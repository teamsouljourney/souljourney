import {
  UsersIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const ContactInfo = () => {
  const { t } = useTranslation();

  const info = [
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: `${t("contactPersons")}`,
      description: `${t("contactPersonsDescription")}`,
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6" />,
      title: `${t("email")}`,
      description: `${t("emailDescription")}`,
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: `${t("location")}`,
      description: `${t("locationDescription")}`,
    },
  ];

  return (
    <div className="flex flex-col gap-8 py-8 md:flex-row">
      {info.map((item, index) => (
        <div key={index} className="flex items-center p-4">
          <div className="flex items-center justify-center rounded-full text-offWhite dark:text-offWhite-dark bg-navy dark:bg-background-dark w-14 h-14">
            {item.icon}
          </div>
          <div className="ml-4">
            <h6 className="text-lg tracking-wide text-navy-dark dark:text-offWhite-dark md:text-primary">
              {item.title}
            </h6>
            <p className="text-sm text-navy-light dark:text-offWhite-dark md:text-secondary">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
