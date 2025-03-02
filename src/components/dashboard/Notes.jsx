// Notes.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NotesModal from "./NotesModal";

const Notes = ({ currentUser, userId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  return (
    <div>
      <button
        className="bg-mauve-light text-offWhite-light px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
        onClick={handleOpen}
      >
        {t("notes")}
      </button>
      <NotesModal 
        open={open} 
        onClose={handleClose} 
        userId={userId._id}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Notes;