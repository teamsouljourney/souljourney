const ContactForm = () => {
  return (
    <form id="contactForm">
      <div className="mb-6">
        <div className="mx-0 mb-1 sm:mb-4">
          <div className="mx-0 mb-1 sm:mb-4">
            <label
              htmlFor="name"
              className="pb-1 text-xs tracking-wider uppercase"
            ></label>
            <input
              type="text"
              id="name"
              autoComplete="given-name"
              placeholder="Your name"
              className="w-full py-2 pl-2 pr-4 mb-2 border border-gray-400 rounded-md shadow-md dark:text-gray-300 sm:mb-0"
              name="name"
            />
          </div>
          <div className="mx-0 mb-1 sm:mb-4">
            <label
              htmlFor="email"
              className="pb-1 text-xs tracking-wider uppercase"
            ></label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Your email address"
              className="w-full py-2 pl-2 pr-4 mb-2 border border-gray-400 rounded-md shadow-md dark:text-gray-300 sm:mb-0"
              name="email"
            />
          </div>
        </div>
        <div className="mx-0 mb-1 sm:mb-4">
          <label
            htmlFor="textarea"
            className="pb-1 text-xs tracking-wider uppercase"
          ></label>
          <textarea
            id="textarea"
            name="textarea"
            cols="30"
            rows="5"
            placeholder="Write your message..."
            className="w-full py-2 pl-2 pr-4 mb-2 border border-gray-400 rounded-md shadow-md dark:text-gray-300 sm:mb-0"
          ></textarea>
        </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="w-full px-6 py-3 text-white transition-all duration-200 rounded-md bg-mauve hover:bg-mauve-dark font-xl sm:mb-0"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};
export default ContactForm;
