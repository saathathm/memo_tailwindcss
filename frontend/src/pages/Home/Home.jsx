import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import {
  deleteSelectedNote,
  getNotes,
  PinSelectedNote,
  searchQueryNote,
} from "../../actions/noteActions";

import Loader from "../../components/Layout/Loader.jsx";
import { Toast } from "../../components/ToastMessage/Toast.jsx";
import { EmptyCard } from "../../components/Empty Card/EmptyCard.jsx";
import noNoteImg from "../../assets/images/noNoteimg.svg";
import noData from "../../assets/images/noData.webp";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authState);
  const { loading, notes, note } = useSelector((state) => state.noteState);
  const [isSearch, setIsSearch] = useState(false);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      data: noteDetails,
      type: "edit",
    });
  };

  const showToastMsg = (message, type) => {
    setShowToastMessage({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMessage({
      isShown: false,
      message: "",
    });
  };

  const deleteNote = async (data) => {
    const noteId = data?._id;
    dispatch(deleteSelectedNote(noteId));
  };

  const pinNote = async (data) => {
    const noteId = data?._id;
    dispatch(PinSelectedNote(noteId));
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    dispatch(getNotes);
  };

  useEffect(() => {
    if (note === "Deleted" && !isSearch) {
      showToastMsg("Note Successfully Deleted", "delete");
    }

    if (!notes || note === "Pin") {
      dispatch(getNotes);
    }
  }, [note, notes]);
  return (
    <>
      <Navbar
        userInfo={user}
        searchQueryNote={searchQueryNote}
        handleClearSearch={handleClearSearch}
        setIsSearch={setIsSearch}
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto">
          {notes.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-8">
              {notes &&
                notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    title={note.title}
                    date={note.createdAt}
                    content={note.content}
                    tags={note.tags}
                    isPinned={note.isPinned}
                    onEdit={() => handleEdit(note)}
                    onDelete={() => deleteNote(note)}
                    onPinNote={() => pinNote(note)}
                  />
                ))}
            </div>
          ) : (
            <EmptyCard
              imgSrc={isSearch ? noData : noNoteImg}
              message={
                isSearch
                  ? `Oops! No memos found matching your search.`
                  : `Start creating your first memo! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`
              }
            />
          )}
        </div>
      )}

      {!isSearch && (
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 sticky bottom-10 left-full mr-10"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>
      )}

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          showToastMsg={showToastMsg}
        />
      </Modal>

      <Toast
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
