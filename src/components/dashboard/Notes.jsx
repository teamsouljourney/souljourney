import { useState } from "react";
import NotesModal from "./NotesModal";

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
      {/* <NotesModal
        open={open}
        handleClose={handleClose}
        currentUser={currentUser}
      /> */}
    </div>
  );
};

export default Notes;
