import Button from "../button/Button";

const TeamDetailFeedbackForm = ({id}) => {
    console.log("therapistID:", id);
    
    // const [feedback, setFeedback] = useState(initialState)    

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
                placeholder="Enter your rating"
                className="w-full peer"
                required
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
                placeholder="Enter your title"
                className="w-full peer"
                required
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
              ></textarea>
            </div>
            <Button type="type22">Post Comment</Button>
          </form>
    </>
  )
}

export default TeamDetailFeedbackForm