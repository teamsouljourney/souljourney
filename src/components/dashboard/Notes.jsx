import { useState } from "react";

const Notes = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <button
        className="filled bg-mauve-light text-offWhite-light px-3 py-1 rounded-lg"
        onClick={handleOpen}
      >
        Notes
      </button>
    </div>
  );
};

export default Notes;
