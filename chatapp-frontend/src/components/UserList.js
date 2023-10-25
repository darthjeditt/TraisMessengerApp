import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import axios from 'axios';

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

    axios
        .get('http://localhost:5000/api/users')
        .then((response) => {
            // Handle the response data
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl mb-4">Online Users</h2>
            <ul>
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="text-gray-700 border-b p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => setCurrentChatUser(user)}
                    >
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
