import React, { useState, useEffect, useRef } from 'react';
import { fetchUsers } from '../utils/api';

function UserList({ onUserSelect }) {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const scrollableListRef = useRef(null);

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

    // Effect to scroll to the bottom of the list every time the users array changes
    useEffect(() => {
        if (scrollableListRef.current) {
            scrollableListRef.current.scrollTop =
                scrollableListRef.current.scrollHeight;
        }
    }, [users]);

    return (
        <div
            className="flex flex-col p-4 shadow-2xl flex-grow pb-4 min-h-[705px] max-h-[705px] bg-black/30 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500"
            ref={scrollableListRef}
        >
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
        </div>
    );
}

export default UserList;
