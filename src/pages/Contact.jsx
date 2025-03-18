import ContactForm from "../components/contact/ContactForm";
import ContactHeader from "../components/contact/ContactHeader";
import ContactImage from "../components/contact/ContactImage";
import ContactInfo from "../components/contact/ContactInfo";


const Contact = () => {
  return (
    <div className="min-h-screen py-36 bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Contact Header */}
        <ContactHeader />

        {/* Contact Content */}
        <div className="flex flex-col items-center justify-between px-4 py-8 bg-opacity-50 rounded-md bg-offWhite-dark dark:bg-background-dark md:py-16 md:flex-row">
          {/* Contact Form */}
          <div className="w-full mb-4 md:w-1/2 lg:w-1/2 md:pr-4 md:mb-0">
            <ContactForm />
          </div>
          {/* Contact Image */}
          <div className="hidden w-full md:block md:w-1/2 lg:w-1/2 md:pl-4">
            <ContactImage />
          </div>
        </div>
        {/* Contact Info */}
        <div className="flex items-center justify-center py-8">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default Contact;
