import { useState } from "react";
import { useTranslation } from "react-i18next";
import NotesModal from "./NotesModal";

const Notes = ({ therapistId, userId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  console.log("User ID:", userId);

  return (
    <div>
      <button
        className="filled bg-mauve-light text-offWhite-light px-3 py-1 rounded-lg"
        onClick={handleOpen}
      >
        {t("notes")}
      </button>
      <NotesModal open={open} onClose={handleClose} userId={userId} />
    </div>
  );
};

export default Notes;