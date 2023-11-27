import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/api';

function UserList({ onUserSelect }) {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchUsers().then(fetchedUsers => {
            setUsers(fetchedUsers);
        }).catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        onUserSelect(userId);
    };

    return (
        <div className="user-list">
            {users.map(user => (
                <div
                    key={user._id}
                    className={`user ${user._id === selectedUserId ? 'selected' : ''}`}
                    onClick={() => handleUserClick(user._id)}
                >
                    {user.username}
                </div>
            ))}
        </div>
    );
}

export default UserList;
