import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';

function ChatMessages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div className="chat-messages overflow-y-auto p-3">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className="message p-2 mb-2 bg-gray-200 rounded"
                >
                    {msg.content}
                </div>
            ))}
        </div>
    );
}

export default ChatMessages;
