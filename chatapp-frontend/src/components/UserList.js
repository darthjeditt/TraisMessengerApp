import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ProfilePopup from './profilePopup'; // Import the new component

function UserList({ setCurrentChatUser, currentUser }) { // Add currentUser prop
    const [users, setUsers] = useState([]);
    const [showProfile, setShowProfile] = useState(false); // State to manage popup visibility

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/user');
                setUsers([...response.data, currentUser]); // Add current user to the list
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [currentUser]);

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl mb-4">Users</h2>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li
                            key={user._id}
                            className="text-gray-700 border-b p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => setCurrentChatUser(user)}
                        >
                            {user.username}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No users available.</p>
                )}
            </ul>
            <div onClick={() => setShowProfile(true)}> 
                {/* Profile Icon - Replace with your icon */}
                🚹 
            </div>
            {showProfile && <ProfilePopup user={currentUser} onClose={() => setShowProfile(false)} />}
        </div>
    );
}

export default UserList;
