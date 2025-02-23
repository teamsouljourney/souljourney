import { useState } from "react";
import { useTranslation } from "react-i18next";

const Notes = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  return (
    <div>
      <button
        className="filled bg-mauve-light text-offWhite-light px-3 py-1 rounded-lg"
        onClick={handleOpen}
      >
        {t("notes")}
      </button>
    </div>
  );
};

export default Notes;
