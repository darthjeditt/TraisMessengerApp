import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // Importing the user icon
import ProfilePopup from './profilePopup';

function UserList() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/user'
                );
                setUsers(response.data);
                axios
                    .get('/api/user/me', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`
                        }
                    })
                    .then((response) => {
                        setCurrentUser(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching current user:', error);
                    });
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.username}</li>
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
