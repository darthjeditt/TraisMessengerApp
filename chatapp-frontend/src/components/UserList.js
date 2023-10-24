import React from 'react';

function UserList({ users }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl mb-4">Online Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="text-gray-700 border-b p-2 cursor-pointer hover:bg-gray-200">
            {user}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center">
        <img src="/path_to_profile_icon.png" alt="Profile Icon" className="w-8 h-8 rounded-full" />
        <span className="ml-2">Your Name</span>
      </div>
    </div>
  );
}

export default UserList;
