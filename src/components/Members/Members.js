import Pagination from "../Pagination/Pagination";
import User from "../User/User";

function Members() {
  return (
    <div class="container mx-auto py-6 w-9/12 mt-7">
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2">Image</th>
            <th class="border border-gray-300 px-4 py-2">Full name</th>
            <th class="border border-gray-300 px-4 py-2">Email address</th>
          </tr>
        </thead>
        <User />
      </table>
      <Pagination />
    </div>
  );
}

export default Members;
