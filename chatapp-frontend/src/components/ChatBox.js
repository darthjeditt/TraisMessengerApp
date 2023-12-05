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

    // ChatBox.js
    return (
        <div className="flex flex-col rounded-br-xl shadow-xl bg-black/40 max-h-[800px] min-h-[800px]">
            {/* This div will hold the chat messages and will be scrollable */}
            <div className="flex-grow overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
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
                                    ? 'text-pink-300'
                                    : 'text-green-300'
                            }`}
                            style={{
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            {message.content}
                            <div className="font-swurvy text-xs text-black mt-1">
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
            {/* This div is for the input area and should not scroll */}
            <div className="p-4">
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
