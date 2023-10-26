import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:5000';
const socket = io(BASE_URL);

function ChatBox() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch registered users from the database
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/user`);
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchUsers();

        // Listen for incoming messages
        socket.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup listener on component unmount
        return () => {
            socket.off('receive_message');
        };
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            socket.emit('send_message', newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="chatbox-container flex p-4 bg-white rounded shadow-md">
            {/* Users List */}
            <div className="users-list w-1/4 border-r pr-4">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                {users.map((user) => (
                    <div
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                        {user.username}
                    </div>
                ))}
            </div>

            {/* Chat Area */}
            <div className="chat-area flex-grow pl-4">
                {/*  Display Selected User's Name */}
                {selectedUser && (
                    <h3 className="text-2xl font-bold mb-4">
                        Chat with {selectedUser.username}
                    </h3>
                )}
                {/* Messages Display */}
                <div className="messages-container mb-4 flex-grow">
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : messages.length > 0 ? (
                        messages.map((message, index) => (
                            <p
                                key={index}
                                className="text-gray-700 border-b p-2"
                            >
                                {message}
                            </p>
                        ))
                    ) : (
                        <p className="text-gray-500">
                            No messages to display. Start a conversation!
                        </p>
                    )}
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* Message Input */}
                <div className="input-container flex items-center">
                    <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-grow p-2 border rounded-l focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition mr-2"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
