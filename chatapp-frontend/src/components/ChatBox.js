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
                console.error("Error fetching current user:", error);
            }
        };

        loadCurrentUser();
    }, []);

    useEffect(() => {
        const loadChatHistory = async () => {
            if (currentUserId && selectedUserId) {
                try {
                    const response = await fetchChatHistory(currentUserId, selectedUserId);
                    setMessages(response.data || []); // Set to empty array if no data
                } catch (error) {
                    console.error("Error fetching chat history:", error);
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
                setMessages([...messages, { content: newMessage, sender: currentUserId }]);
                setNewMessage('');
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <div>
            <div className="chat-box">
                {messages.map((message, index) => (
                    <div key={index}>{message.content}</div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
