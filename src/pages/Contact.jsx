import ContactForm from "../components/Contact/ContactForm";
import ContactHeader from "../components/Contact/ContactHeader";
import ContactImage from "../components/Contact/ContactImage";

const Contact = () => {
  return (
    <div>
      <ContactHeader />
      <div className="flex flex-col items-center justify-between px-4 py-32 md:flex-row">
        {/* Contact Form */}
        <div className="w-full mb-4 md:w-1/2 lg:w-1/2 md:pr-4 md:mb-0">
          <ContactForm />
        </div>
        {/* Contact Image */}
        <div className="w-full md:w-1/2 lg:w-1/2 md:pl-4">
          <ContactImage />
        </div>
      </div>
    </div>
  );
};

export default Contact;
