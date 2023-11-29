import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/api';
import CurrentUserDisplay from './CurrentUser';

function UserList({ onUserSelect }) {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then((fetchedUsers) => {
                setUsers(fetchedUsers);
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        onUserSelect(userId);
    };

    return (
        <div className="flex flex-col  p-4 shadow-lg flex-grow pb-4">
            {users.map((user) => (
                <div
                    key={user._id}
                    className={`font-swurvy text-center p-2 my-2 rounded-lg font-semibold text-lg ${
                        user._id === selectedUserId
                            ? 'bg-blue-900'
                            : 'hover:bg-gray-600'
                    } cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 text-white`}
                    onClick={() => handleUserClick(user._id)}
                >
                    {user.username}
                </div>
            ))}
            <div className="mt-auto">
                <CurrentUserDisplay />
            </div>
        </div>
    );
}

export default UserList;
