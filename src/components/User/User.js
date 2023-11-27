import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";

function User() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch("https://reqres.in/api/users?page=2");
      const data = await response.json();
      setStatus("ready");
      setData(data.data);
    }
    fetchUserData();
  }, []);
  console.log(status);
  if (status === "loading") return <Loader />;
  return (
    <tbody>
      {data.map((user) => (
        <tr key={user.id}>
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
    </tbody>
  );
}

export default User;
