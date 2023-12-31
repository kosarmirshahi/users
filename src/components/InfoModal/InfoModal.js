import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";

function InfoModal({ isOpen, selectedUserId, setIsOpen }) {
  const [userInformation, setUserInformation] = useState(null);
  function closeModal() {
    setIsOpen(false);
    setUserInformation(null);
  }

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(
        `https://reqres.in/api/users/${selectedUserId}`
      );
      const info = await response.json();
      setUserInformation(info.data);
    }
    fetchUserData();
  }, [selectedUserId, userInformation]);

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative z-50 w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg">
          {userInformation ? (
            <>
              <div className="bg-white p-4 flex items-center rounded-lg">
                <img
                  className="rounded-full w-30 h-30 mr-5"
                  src={userInformation.avatar}
                />
                <div>
                  <span className="text-indigo-900 flex mb-2.5 mt-2.5">
                    Name:
                    <p className="text-black">
                      {userInformation.first_name} {userInformation.last_name}
                    </p>
                  </span>
                  <span className="text-indigo-900	 flex">
                    Email: <p className="text-black">{userInformation.email}</p>
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
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
}

export default InfoModal;
