import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { fetchChatHistory, sendMessage, getCurrentUser } from '../utils/api';

const ENDPOINT = "http://localhost:5000"; // Your server endpoint
const socket = socketIOClient(ENDPOINT);

function ChatBox({ selectedUserId }) {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        getCurrentUser().then(user => {
            setCurrentUserId(user._id);
            getChatHistory(user._id, selectedUserId);
        }).catch(error => console.error('Error fetching current user:', error));

        socket.on("newMessage", (newMessage) => {
            setMessages(messages => [...messages, newMessage]);
        });

        return () => socket.off("newMessage");
    }, [selectedUserId]);

    const getChatHistory = async (userId, selectedUserId) => {
        try {
            const chatHistory = await fetchChatHistory(userId, selectedUserId);
            setMessages(chatHistory);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    const handleSendMessage = async () => {
        if (currentMessage.trim()) {
            try {
                const message = await sendMessage(currentMessage, currentUserId, selectedUserId);
                socket.emit("sendMessage", message);
                setCurrentMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === currentUserId ? 'sent' : 'received'}`}>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatBox;
