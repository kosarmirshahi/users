import { useState } from "react";

function InfoModal({ isOpen, onClose, selectedPerson }) {
  const [modalOpen, setModalOpen] = useState(isOpen);
  function closeModal() {
    setModalOpen(false);
    // onClose();
  }
  if (modalOpen) {
    // console.log(selectedPerson);
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative z-50 w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg">
            <div className="bg-white p-4 flex">
              <img
                className="rounded-xl w-24 h-24 mr-5"
                src={selectedPerson.avatar}
              />
              <div>
                <span className="text-indigo-900 flex mb-2.5 mt-2.5">
                  Name:
                  <p className="text-black">
                    {selectedPerson.first_name} {selectedPerson.last_name}
                  </p>
                </span>
                <span className="text-indigo-900	 flex">
                  Email: <p className="text-black">{selectedPerson.email}</p>
                </span>
              </div>
            </div>
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default InfoModal;
