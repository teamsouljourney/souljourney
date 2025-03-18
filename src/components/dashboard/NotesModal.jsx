import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useNoteCall from "../../hooks/useNoteCall";
import { useTranslation } from "react-i18next";

const NotesModal = ({ open, onClose, userId, currentUser }) => {
  const { t } = useTranslation();
  const { singleUserNotes } = useSelector((state) => state.notes);
  const { getSingleUserNotes, postUserNotes, deleteNote, putUserNote } =
    useNoteCall();

  const initialNote = {
    userId: userId,
    content: "",
  };

  const [note, setNote] = useState(initialNote);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (open && userId) {
      getSingleUserNotes(userId);
    }
  }, [open, userId]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note._id) {
      await putUserNote(note._id, note);
    } else {
      await postUserNotes(note);
    }

    getSingleUserNotes(userId);
    setNote(initialNote);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-[600px] max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {t("NotesModal.patientNotes")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Notes List */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {singleUserNotes?.length === 0 ? (
            <p className="text-center text-gray-500">{t("NotesModal.noNotes")}</p>
          ) : (
            singleUserNotes?.map((note) => (
              <div
                key={note._id}
                className="flex items-start justify-between p-4 rounded-lg bg-gray-50 group"
              >
                <p className="flex-1 text-gray-700">{note.content}</p>
                <div className="flex gap-2 ml-4 transition-opacity opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => {setNote({ ...note }), setEdit(true)}}
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    <img
                      src="/assets/sidebar/edit.svg"
                      alt="Edit"
                      className="w-4 h-4"
                    />
                  </button>
                  <button
                    onClick={() => deleteNote(note._id, userId)}
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    <img
                      src="/assets/sidebar/delete1.svg"
                      alt="Delete"
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Note Form */}
        <div className="p-4 border-t bg-gray-50">
          <form className="space-y-4">
            <div className="mb-4">
              <label htmlFor="content" className="peer">
                {t("NotesModal.newNote")}
              </label>
              <textarea
                id="content"
                name="content"
                value={note.content}
                placeholder={t("NotesModal.newNotePlaceholder")}
                rows="4"
                className="w-full shadow-md textarea-style"
                required
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 text-white transition-all rounded-lg bg-mauve-light hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!note.content.trim()}
              >
                {edit ? t("NotesModal.editNote") : t("NotesModal.addNote")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
