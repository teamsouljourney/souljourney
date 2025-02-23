import { useState } from "react";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";

const TeamDetailFeedbackForm = ({
  id,
  handleSubmit,
  feedback,
  setFeedback,
}) => {
  // console.log("therapistID:", id);
  const { t } = useTranslation();

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleChange = (e) => {
    console.log(e.target.value);

    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className="mt-16 bg-offWhite-light dark:bg-background-dark p-8 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Add a Comment {/* {t("addAComment")} */}</h3>

        <div className="mb-4">
          <label htmlFor="title" className="peer">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={feedback.title}
            placeholder="Enter your title"
            className="w-full peer shadow-md"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="peer">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={feedback.comment}
            placeholder="Enter your comment"
            rows="4"
            className="w-full textarea-style shadow-md"
            required
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-10">
          <label htmlFor="rating" className="peer">
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => setFeedback({ ...feedback, rating: star })}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                  star <= (hoveredRating || feedback.rating)
                    ? "text-seaGreen fill-seaGreen"
                    : "text-gray-300 fill-gray-300 hover:text-seaGreen/50 hover:fill-seaGreen/50"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {hoveredRating || feedback.rating} out of 5
            </span>
          </div>
        </div>
        <Button type="type22" className="shadow-lg" onClick={handleSubmit}>
          Post Comment
        </Button>
      </form>
    </>
  );
};

export default TeamDetailFeedbackForm;
