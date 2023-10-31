import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { fetchChatHistory } from '../utils/api';

const BASE_URL = 'http://localhost:5000';
const socket = io(BASE_URL);

function ChatBox({ selectedUserId, currentUser }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const getChatHistory = async () => {
            if (selectedUserId && currentUser) {
                try {
                    const response = await fetchChatHistory(
                        currentUser.id,
                        selectedUserId
                    );
                    setMessages(response.data);
                } catch (err) {
                    console.error('Error fetching chat history: ', err);
                }
            }
        };

            getChatHistory();
    }, [selectedUserId, currentUser]);

    useEffect(() => {
        socket.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

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
        <div className="flex">
            <div className="chatbox-container p-4 bg-white rounded shadow-md">
                <div className="messages-container mb-4">
                    {messages.length > 0 ? (
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
