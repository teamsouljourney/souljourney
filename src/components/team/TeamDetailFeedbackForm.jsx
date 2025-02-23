import Button from "../button/Button";

const TeamDetailFeedbackForm = ({id, handleSubmit, feedback, setFeedback}) => {
    console.log("therapistID:", id);
    
    const handleChange = (e) => {
        console.log(e.target.value);
        
        setFeedback({ ...feedback, [e.target.name]: e.target.value})
    }

  return (
    <>
        <form className="mt-16 bg-offWhite-light dark:bg-background-dark p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
            <div className="mb-4">
              <label htmlFor="rating" className="peer">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={feedback.rating}
                placeholder="Enter your rating"
                className="w-full peer"
                required
                onChange={handleChange}
              />
            </div>
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
                className="w-full peer"
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
                placeholder="Enter your comment"
                rows="4"
                className="w-full textarea-style"
                required
                onChange={handleChange}
              ></textarea>
            </div>
            <Button type="type22" onClick={handleSubmit}>Post Comment</Button>
          </form>
    </>
  )
}

export default TeamDetailFeedbackForm