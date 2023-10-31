import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import ProfilePopup from './profilePopup';
import { fetchUsers, getCurrentUser } from '../utils/api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchCurrentUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
            } catch (err) {
                setError(err.message);
            }
        };

        getUsers();
        fetchCurrentUser();
    }, []);

    const handleProfileClick = () => {
        setShowProfilePopup(!showProfilePopup);
    };

    return (
        <div className="user-list">
            {users.map((user) => (
                <div
                    className={'cursor-pointer'}
                    key={user._id}
                    onClick={() => console.log(user.username)}
                >
                    {user.username}
                </div>
            ))}
            {error && <p className="error">{error}</p>}
            {currentUser && (
                <div className="cursor-pointer" onClick={handleProfileClick}>
                    <FaUserCircle size={40} />
                    {showProfilePopup && (
                        <div className="profile-popup">
                            <ProfilePopup
                                user={currentUser}
                                onClose={setShowProfilePopup(false)}
                            ></ProfilePopup>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserList;
