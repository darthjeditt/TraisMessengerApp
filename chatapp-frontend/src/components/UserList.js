import React, { useState, useEffect, useRef } from 'react';
import { fetchUsers } from '../utils/api';

// Component to display a list of users
const UserList = ({ onUserSelect }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const scrollableListRef = useRef(null);

    // Fetch users and update state
    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getUsers();
    }, []);

    // Handle user selection
    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        onUserSelect(userId);
    };

    // Scroll to the bottom of the list when users are updated
    useEffect(() => {
        const scrollableList = scrollableListRef.current;
        if (scrollableList) {
            scrollableList.scrollTop = scrollableList.scrollHeight;
        }
    }, [users]);

    return (
        <div
            className="flex flex-col p-4 shadow-2xl flex-grow pb-4 min-h-[705px] max-h-[705px] bg-black/30 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500"
            ref={scrollableListRef}
        >
            {users.map((user) => (
                <UserItem
                    key={user._id}
                    user={user}
                    isSelected={user._id === selectedUserId}
                    onClick={() => handleUserClick(user._id)}
                />
            ))}
        </div>
    );
};

// Component for individual user item
const UserItem = ({ user, isSelected, onClick }) => (
    <div
        className={`font-swurvy text-center p-2 my-2 rounded-lg font-semibold text-lg ${
            isSelected ? 'bg-blue-900' : 'hover:bg-gray-600'
        } cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 text-white`}
        onClick={onClick}
    >
        {user.username}
    </div>
);

export default UserList;
