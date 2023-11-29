import { useState, useEffect } from "react";
import InfoModal from "../InfoModal/InfoModal";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

function User() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(1);
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
  // console.log(isModalOpen);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (status === "loading") return <Loader />;
  return (
    <div className="container mx-auto py-6 w-9/12 mt-7">
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Full name</th>
            <th className="border border-gray-300 px-4 py-2">Email address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} onClick={() => openModal(user.id)}>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  className="w-16 h-16 rounded-full"
                  src={user.avatar}
                  alt="pic"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.first_name} {user.last_name}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
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
      />
    </div>
  );
}

export default User;
