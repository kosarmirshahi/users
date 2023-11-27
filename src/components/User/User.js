import { useState, useEffect } from "react";
import InfoModal from "../InfoModal/InfoModal";
import Loader from "../Loader/Loader";

function User() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(2);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch("https://reqres.in/api/users?page=1");
      const data = await response.json();
      setStatus("ready");
      setData(data.data);
    }
    fetchUserData();
  }, []);
  function openModal(userId) {
    setIsModalOpen(true);
    setSelectedUserId(userId);
  }
  function getSelectedPerson() {
    return data.find((person) => person.id === selectedUserId);
  }

  const selectedPerson = getSelectedPerson();

  function closeModal() {
    setIsModalOpen(false);
  }
  if (status === "loading") return <Loader />;
  return (
    <tbody>
      {data.map((user) => (
        <tr key={user.id} onClick={() => openModal(user.id)}>
          <td class="border border-gray-300 px-4 py-2">
            <img
              className="w-16 h-16 rounded-full"
              src={user.avatar}
              alt="pic"
            />
          </td>
          <td class="border border-gray-300 px-4 py-2">
            {user.first_name} {user.last_name}
          </td>
          <td class="border border-gray-300 px-4 py-2">{user.email}</td>
        </tr>
      ))}
      <InfoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedPerson={selectedPerson}
      />
    </tbody>
  );
}

export default User;
