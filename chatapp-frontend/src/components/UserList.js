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
        <div className="bg-gradient-to-b from-green-400 via-purple-500 to-blue-500 flex flex-col items-center justify-start font-bold text-lg text-white p-10 w-32">
            {users.map((user) => (
                <div
                    key={user._id}
                    className={`user p-2 my-2 rounded ${
                        user._id === selectedUserId
                            ? 'bg-black'
                            : 'hover:bg-black hover:shadow-lg transform hover:scale-105 transition duration-300' // Enhanced hover effect
                    } cursor-pointer`}
                    onClick={() => handleUserClick(user._id)}
                >
                    {user.username}
                </div>
            ))}
            <div className="p-5" />
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-purple-600 font-semibold">
                <CurrentUserDisplay />
            </div>
        </div>
    );
}

export default UserList;
