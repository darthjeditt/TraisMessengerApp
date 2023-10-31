import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import ProfilePopup from './profilePopup';
import { getCurrentUser, getUsers } from '../utils/api';

const UserList = ({ onUserClick }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await fetchUsers();
            await fetchCurrentUser();
        };

        fetchData();
    }, []);

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
            setCurrentUser(response.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const handleProfileClick = () => {
        setShowProfilePopup(true);
    };

    const closeProfilePopup = () => {
        setShowProfilePopup(false);
    };

    return (
        <div>
            <ul>
                {users.map(user => (
                    <li className='cursor-pointer' key={user._id} onClick={() => onUserClick(user._id)}>
                        {user.username}
                    </li>
                ))}
            </ul>
            {currentUser && (
                <div className='cursor-pointer' onClick={handleProfileClick}>
                    <FaUserCircle size={40} />
                </div>
            )}
            {showProfilePopup && (
                <ProfilePopup user={currentUser} onClose={closeProfilePopup} />
            )}
        </div>
    );
};

export default UserList;
