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
            toastSuccessNotify(t("messageSentSuccess"));
            form.current?.reset();
          },
          (error) => {
            toastErrorNotify(t("messageSentError"));
            console.log(error.text);
          }
        );
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-navy dark:text-offWhite-dark">{t("getStarted")}</h2>
        <p className="text-sm font-semibold text-navy-light dark:text-offWhite-dark">
          {t("contactFormText")}
        </p>
      </div>

      <div className="mb-6">
        <div className="mx-0 mb-1 sm:mb-4">
          <div className="mx-0 mb-1 sm:mb-4">
            <label
              htmlFor="user_name"
              className="pb-1 text-xs tracking-wider uppercase"
            ></label>
            <input
              type="text"
              id="user_name"
              autoComplete="given-name"
              placeholder={t("namePlaceholder")}
              className="w-full peer "
              name="user_name"
            />
          </div>
          <div className="mx-0 mb-1 sm:mb-4">
            <label
              htmlFor="user_email"
              className="pb-1 text-xs tracking-wider uppercase"
            ></label>
            <input
              type="email"
              id="user_email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              className="w-full  peer"
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
            placeholder={t("messagePlaceholder")}
            className="w-full textarea-style"
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
