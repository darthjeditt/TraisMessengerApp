import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function UserList({ setCurrentChatUser }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

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
        </div>
    );
}

export default UserList;
