import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useNoteCall from "../../hooks/useNoteCall";

const NotesModal = ({ open, onClose, userId }) => {
  const { notes } = useSelector((state) => state.notes);
  const { getAllNotes, createNote } = useNoteCall();
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (open) {
      console.log("Hasta ID:", userId); // Kontrol
      getAllNotes(userId); // Direkt userId
    }
  }, [open, getAllNotes, userId]);

  const handleCreate = () => {
    if (noteText) {
      createNote({ content: noteText, userId });
      setNoteText("");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Hastanın Notları</h2>
        {notes.map((note) => (
          <div key={note._id}>{note.content}</div>
        ))}
        <textarea
          className="w-full h-32 p-2 border rounded-lg mb-4"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Not yaz..."
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={handleCreate}
        >
          Ekle
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={onClose}
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

export default NotesModal;