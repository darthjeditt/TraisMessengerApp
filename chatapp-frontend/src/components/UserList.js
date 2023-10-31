import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importing the user icon
import ProfilePopup from './profilePopup';
import { getCurrentUser, getUsers } from '../utils/api';

function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        const fetchCurrentUser = async () => {
            try {
                const response = await getCurrentUser();
                if (response && response.data) {
                    setCurrentUser(response.data);
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };
        fetchUsers();
        fetchCurrentUser();
    }, []);

    const handleUserClick = (userId) => {
        try {
            if (navigate) {
                navigate(`chat/${userId}`);
            }
        } catch (err) {
            console.error('Couldnt get chat history', err);
        }
    };

    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li
                        key={user._id}
                        onClick={() => handleUserClick(user._id)}
                    >
                        {user.username}
                    </li>
                ))}
            </ul>
            {currentUser && (
                <div onClick={() => setShowProfilePopup(true)}>
                    <FaUserCircle size={40} />
                </div>
            )}
            {showProfilePopup && (
                <ProfilePopup
                    user={currentUser}
                    onClose={() => setShowProfilePopup(false)}
                />
            )}
        </div>
    );
}

export default UserList;
