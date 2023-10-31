import React, { useState, useEffect } from 'react';
import { fetchChatHistory } from '../utils/api';

const ChatBox = ({ selectedUser }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const currentUser = localStorage.getItem('currentUser'); // Assuming you store the current user in local storage

    useEffect(() => {
        if (currentUser && selectedUser) {
            const getHistory = async () => {
                try {
                    const history = await fetchChatHistory(currentUser._id, selectedUser._id);
                    setChatHistory(history);
                } catch (err) {
                    setError(err.message);
                }
            };

            getHistory();
        }
    }, [currentUser, selectedUser]);

    const handleSendMessage = async () => {
        // Logic to send the message to the backend and update the chat history
    };

    return (
        <div className="chat-box">
            {error && <p className="error">{error}</p>}
            {chatHistory.map(message => (
                <div key={message._id}>
                    <strong>{message.sender.username}</strong>: {message.content}
                </div>
            ))}
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatBox;
