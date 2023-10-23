import React from 'react';

function UserList({ users }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl mb-4">Online Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="text-gray-700 border-b p-2">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
