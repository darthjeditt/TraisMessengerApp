import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ProfilePopup from './profilePopup';
import {FaUser} from 'react-icons/fa';

function UserList({ setCurrentChatUser, currentUser }) {
    // Add currentUser prop
    const [users, setUsers] = useState([]);
    const [showProfile, setShowProfile] = useState(false);

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
            {users && users.length > 0 ? (
                users.map((user, index) => {
                    if (!user) return null; // Check if user is defined before accessing its properties
                    return (
                        <div
                            key={index}
                            onClick={() => setCurrentChatUser(user)}
                        >
                            {user.username}
                        </div>
                    );
                })
            ) : (
                <p>No users available</p>
            )}
            {showProfile && (
                <ProfilePopup
                    user={currentUser}
                    onClose={() => setShowProfile(false)}
                />
            )}
            <div onClick={() => setShowProfile(true)}>
                <FaUser size={32} style={{ cursor: 'pointer' }} />
            </div>
        </div>
    );
}

export default UserList;
