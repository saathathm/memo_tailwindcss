import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { getNotes } from "../../actions/NoteActions";

import Loader from "../../components/Layout/Loader.jsx";

const Home = () => {
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const { loading, notes } = useSelector((state) => state.noteState);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    dispatch(getNotes);
  }, [dispatch, getNotes]);
  return (
    <>
      <Navbar userInfo={user} />

      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto">
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
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onPinNote={() => {}}
                />
              ))}
          </div>
        </div>
      )}

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

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
        />
      </Modal>
    </>
  );
};

export default Home;
