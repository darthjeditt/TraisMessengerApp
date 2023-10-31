import React, { useState, useEffect } from 'react';
import { fetchChatHistory, sendMessage, getCurrentUser } from '../utils/api';

function ChatBox({ selectedUserId }) {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const user = await getCurrentUser();
                setCurrentUserId(user._id);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        }

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUserId) {
            getChatHistory(currentUserId, selectedUserId);
        }
    }, [currentUserId, selectedUserId]);

    const getChatHistory = async (currentUserId, selectedUserId) => {
        try {
            const chatHistory = await fetchChatHistory(currentUserId, selectedUserId);
            setMessages(chatHistory);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    const handleSendMessage = async () => {
        try {
            await sendMessage(currentMessage, currentUserId);
            setCurrentMessage('');
            getChatHistory(currentUserId, selectedUserId);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <div>
                {messages.map((message) => (
                    <div key={message._id}>
                        <span>{message.sender.username}: </span>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
            <input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatBox;
