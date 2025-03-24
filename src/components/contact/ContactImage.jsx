import contactPage from "../../assets/images/contactPage.jpg"

const ContactImage = () => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={contactPage}
          alt="Contact Illustration"
          className="object-cover w-full rounded-md h-[25rem]"
        />
      </div>
    );
  };
  
  export default ContactImage;
  