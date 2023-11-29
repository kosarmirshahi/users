import { useState, useEffect } from "react";
import InfoModal from "../InfoModal/InfoModal";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

function User() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(
        `https://reqres.in/api/users?page=${currentPage}`
      );
      const data = await response.json();
      setStatus("ready");
      setData(data.data);
      setTotalPages(data.total_pages);
    }
    fetchUserData();
  }, [currentPage]);
  function openModal(userId) {
    setIsModalOpen(true);
    setSelectedUserId(userId);
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (status === "loading") return <Loader />;
  return (
    <div className="container mx-auto py-6 w-11/12 mt-7">
      <table class="w-10/12 m-auto border-collapse border border-gray-300 shadow-lg mt-5">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Full name</th>
            <th className="border border-gray-300 px-4 py-2">Email address</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr
              key={user.id}
              onClick={() => openModal(user.id)}
              className="text-center h-20 text-slate-600"
            >
              <td className="border border-gray-300 px-4 py-2 w-13">
                <img
                  className="w-16 h-16 rounded-full m-auto"
                  src={user.avatar}
                  alt="pic"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 w-20">
                {user.first_name} {user.last_name}
              </td>
              <td className="border border-gray-300 px-4 py-2 w-30 ">
                {user.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">Ceo</td>
              <td className="border border-gray-300 px-4 py-2">20$</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="w-16 h-10 bg-green-500 rounded-xl text-white">
                  online
                </button>
              </td>
            </tr>
          ))}
          <InfoModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            selectedUserId={selectedUserId}
          />
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default User;
