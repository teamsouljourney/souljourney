import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toastErrorNotify, toastSuccessNotify } from "../../helper/ToastNotify";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            toastSuccessNotify("Message sent successfully!");
            form.current?.reset();
          },
          (error) => {
            toastErrorNotify("Failed to send message!");
            console.log(error.text);
          }
        );
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-navy">{t("getStarted")}</h2>
        <p className="text-sm font-semibold text-navy-light dark:text-offWhite">
          {t("contactFormText")}
        </p>
      </div>

      <div className="mb-6">
        <div className="mx-0 mb-1 sm:mb-4">
          <div className="mx-0 mb-1 sm:mb-4">
            <label
              htmlFor="name"
              className="pb-1 text-xs tracking-wider uppercase"
            ></label>
            <input
              type="text"
              id="user_name"
              autoComplete="given-name"
              placeholder="Your name"
              className="w-full py-2 pl-2 pr-4 mb-2 border border-gray-400 rounded-md shadow-md dark:text-gray-300 sm:mb-0 focus:outline-none focus:ring focus:ring-navy-light "
              name="user_name"
            />
          </div>
          <div className="mx-0 mb-1 sm:mb-4">
            <label
              htmlFor="email"
              className="pb-1 text-xs tracking-wider uppercase"
            ></label>
            <input
              type="email"
              id="user_email"
              autoComplete="email"
              placeholder="Your email address"
              className="w-full py-2 pl-2 pr-4 mb-2 border border-gray-400 rounded-md shadow-md dark:text-gray-300 sm:mb-0 focus:outline-none focus:ring focus:ring-navy-light"
              name="user_email"
            />
          </div>
        </div>
        <div className="mx-0 mb-1 sm:mb-4">
          <label
            htmlFor="message"
            className="pb-1 text-xs tracking-wider uppercase"
          ></label>
          <textarea
            id="message"
            cols="30"
            rows="5"
            placeholder="Write your message..."
            className="w-full resize-none h-[8rem] py-2 pl-2 pr-4 mb-2 border border-gray-400 rounded-md shadow-md dark:text-gray-300 sm:mb-0  focus:outline-none focus:ring focus:ring-navy-light"
            name="message"
          ></textarea>
        </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          value="Send"
          className="w-full px-6 py-3 transition-all duration-300 rounded-md text-offWhite bg-seaGreen hover:bg-navy-dark font-xl sm:mb-0"
        >
          {t("sendMessage")}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
