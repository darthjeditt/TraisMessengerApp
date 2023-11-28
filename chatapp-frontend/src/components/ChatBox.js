import React, { useState, useEffect } from 'react';
import { getCurrentUser, fetchChatHistory, sendMessage } from '../utils/api'; // Adjust the import path as needed

const ChatBox = ({ selectedUserId }) => {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Load current user ID
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
                    setMessages(response.data || []); // Set to empty array if no data
                } catch (error) {
                    console.error('Error fetching chat history:', error);
                    setMessages([]); // Set to empty array on error
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

    // Function to determine if the message is the latest sent by the current user
    const isLatestMessageFromCurrentUser = (index) => {
        for (let i = messages.length - 1; i > index; i--) {
            if (messages[i].sender === currentUserId) {
                return false;
            }
        }
        return true;
    };

    return (
        <div className="flex flex-col h-full">
            <div className="chat-box overflow-y-auto flex-grow">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`my-2 p-2 rounded-lg max-w-2xl ${
                            message.sender === currentUserId
                                ? 'bg-green-200 ml-auto text-right'
                                : 'bg-gray-200 mr-auto text-left'
                        }`}
                    >
                        <div className="message-content">{message.content}</div>
                        <div className="message-timestamp text-xs text-gray-500 mt-1">
                            {message.sender === currentUserId &&
                            isLatestMessageFromCurrentUser(index)
                                ? 'Sent'
                                : new Date(message.timestamp).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
            <div className="message-input mt-4 flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="border p-2 rounded flex-grow"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white p-2 rounded ml-2"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
