import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Use the correct backend URL for socket initialization
const BASE_URL = 'http://localhost:5000';
const socket = io(BASE_URL);

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
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
        <div>
            <div>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
            <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatBox;
