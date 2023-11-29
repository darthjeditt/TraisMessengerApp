import React, { useState, useEffect } from 'react';
import { getCurrentUser, fetchChatHistory, sendMessage } from '../utils/api';

const ChatBox = ({ selectedUserId }) => {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setCurrentUserId(currentUser._id);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        loadCurrentUser();
    }, []);

    useEffect(() => {
        const loadChatHistory = async () => {
            if (currentUserId && selectedUserId) {
                try {
                    const response = await fetchChatHistory(
                        currentUserId,
                        selectedUserId
                    );
                    setMessages(response.data || []);
                } catch (error) {
                    console.error('Error fetching chat history:', error);
                    setMessages([]);
                }
            }
        };

        loadChatHistory();
    }, [currentUserId, selectedUserId]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                await sendMessage(newMessage, currentUserId, selectedUserId);
                setMessages([
                    ...messages,
                    {
                        content: newMessage,
                        sender: currentUserId,
                        timestamp: new Date().toISOString()
                    }
                ]);
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const isLatestMessageFromCurrentUser = (index) => {
        for (let i = messages.length - 1; i > index; i--) {
            if (messages[i].sender === currentUserId) {
                return false;
            }
        }
        return true;
    };

    return (
        <div className="flex flex-col h-full bg-[url('https://i.pinimg.com/564x/6b/de/a3/6bdea3557da87eb2a3e10b53d3df19d4.jpg')] bg-cover backdrop-blur-md rounded-br-xl">
            <div className="flex-grow overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex my-2 ${
                            message.sender === currentUserId
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        <div
                            className={`font-swurvy px-4 py-2 ${
                                message.sender === currentUserId
                                    ? 'text-white'
                                    : 'text-gray-800'
                            }`}
                        >
                            {message.content}
                            <div className="font-swurvy text-xs text-gray-500 mt-1">
                                {message.sender === currentUserId &&
                                isLatestMessageFromCurrentUser(index)
                                    ? 'Sent'
                                    : new Date(
                                          message.timestamp
                                      ).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-gray-900 bg-opacity-90 backdrop-blur-md">
                <div className="flex rounded-lg border-2 border-gray-600 overflow-hidden">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow p-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 transition duration-300"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
